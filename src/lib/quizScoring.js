/**
 * Transparent tag-overlap scoring for the protocol quiz. Pure functions, no
 * React, unit-tested in tests/quizScoring.test.mjs.
 *
 *   score = 3   × goal match          (Q1)
 *         + 2   × sub-goal match      (Q2, when asked)
 *         + 1   × delivery match      (Q3, unless "no preference")
 *         + 0.5 × experience match    (Q4)
 *
 * A protocol with no goal or sub-goal match scores 0 and is never shown.
 */

export const WEIGHTS = { goal: 3, subgoal: 2, delivery: 1, experience: 0.5 }

/** Highest score a protocol could earn, for the "match strength" display. */
export const MAX_SCORE = WEIGHTS.goal + WEIGHTS.subgoal + WEIGHTS.delivery + WEIGHTS.experience

const GOAL_TAGS = new Set(['recovery', 'skin', 'weight', 'body', 'energy', 'brain', 'menopause', 'wellness', 'cellular'])
const DELIVERY_TAGS = new Set(['injectable', 'pen', 'topical'])
const EXPERIENCE_TAGS = new Set(['new', 'experienced'])

/** Split a flat answer-tag list into the buckets scoring cares about. */
export function bucketTags(tags) {
  const b = { goal: null, subgoals: [], delivery: null, experience: null }
  for (const t of tags) {
    if (GOAL_TAGS.has(t)) b.goal = t
    else if (DELIVERY_TAGS.has(t)) b.delivery = t
    else if (EXPERIENCE_TAGS.has(t)) b.experience = t
    else b.subgoals.push(t)
  }
  return b
}

/**
 * Score one protocol against the answer buckets.
 * Returns { score, goal, subgoal, delivery, experience } so the UI can
 * explain the match.
 */
export function scoreProtocol(protocol, buckets) {
  const goal = Boolean(buckets.goal && protocol.goalTags.includes(buckets.goal))
  const subgoal = buckets.subgoals.some(s => protocol.goalTags.includes(s))
  const delivery = Boolean(buckets.delivery && protocol.deliveryTags.includes(buckets.delivery))
  const experience = Boolean(buckets.experience && protocol.experienceTags.includes(buckets.experience))

  let score = 0
  if (goal) score += WEIGHTS.goal
  if (subgoal) score += WEIGHTS.subgoal
  if (goal || subgoal) {
    if (delivery) score += WEIGHTS.delivery
    if (experience) score += WEIGHTS.experience
  }
  return { score, goal, subgoal, delivery, experience }
}

/**
 * Rank every protocol for a set of answer tags.
 *
 * @returns {{
 *   top: object|null,          protocol + match breakdown
 *   runnersUp: object[],       up to `runnersUpCount`, all scoring below top
 *   fallback: boolean,         true when the delivery preference matched nothing
 * }}
 */
export function matchProtocols(protocols, tags, { runnersUpCount = 2 } = {}) {
  const buckets = bucketTags(tags)
  const ranked = protocols
    .map(p => ({ protocol: p, ...scoreProtocol(p, buckets) }))
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)

  if (ranked.length === 0) return { top: null, runnersUp: [], fallback: false }

  const top = ranked[0]
  // Runners-up must be visibly weaker than the top match; ties with the top
  // are still shown, but only after strictly-lower candidates run out.
  const lower = ranked.slice(1).filter(r => r.score < top.score)
  const tied = ranked.slice(1).filter(r => r.score === top.score)
  const runnersUp = [...lower, ...tied].slice(0, runnersUpCount)

  const fallback = Boolean(buckets.delivery) && !top.delivery

  return { top, runnersUp, fallback }
}

/** 0–100 for a progress-style "match strength" indicator. */
export function matchStrength(result, buckets) {
  // Only count the criteria the user actually answered.
  let possible = WEIGHTS.goal
  if (buckets.subgoals.length) possible += WEIGHTS.subgoal
  if (buckets.delivery) possible += WEIGHTS.delivery
  if (buckets.experience) possible += WEIGHTS.experience
  return Math.round((result.score / possible) * 100)
}

/** Answers → compact query string, so a result URL can carry them. */
export function answersToQuery(answers) {
  const p = new URLSearchParams()
  for (const [k, v] of Object.entries(answers)) {
    if (k === 'notes' || v == null || v === '') continue
    p.set(k, v)
  }
  const s = p.toString()
  return s ? `?${s}` : ''
}

/** Query string → answers (only known single-select keys). */
export function answersFromQuery(search, questionIds) {
  const p = new URLSearchParams(search)
  const out = {}
  for (const id of questionIds) {
    const v = p.get(id)
    if (v) out[id] = v
  }
  return out
}
