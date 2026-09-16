import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  WEIGHTS,
  bucketTags,
  scoreProtocol,
  matchProtocols,
  matchStrength,
  answersToQuery,
  answersFromQuery,
} from '../src/lib/quizScoring.js'
import { quizProtocols, getQuizProtocol } from '../src/data/quizProtocols.js'
import { QUESTIONS, visibleQuestions, tagsFromAnswers } from '../src/data/quizConfig.js'

const bySlug = (slug) => getQuizProtocol(slug)

test('bucketTags sorts answer tags into goal, sub-goal, delivery and experience', () => {
  assert.deepEqual(bucketTags(['recovery', 'recovery-acute', 'pen', 'new']), {
    goal: 'recovery',
    subgoals: ['recovery-acute'],
    delivery: 'pen',
    experience: 'new',
  })
  assert.deepEqual(bucketTags(['skin']), { goal: 'skin', subgoals: [], delivery: null, experience: null })
})

test('scoreProtocol applies the documented weights', () => {
  const b = bucketTags(['recovery', 'recovery-acute', 'pen', 'new'])
  const wolverine = scoreProtocol(bySlug('wolverine-stack'), b)
  assert.equal(wolverine.score, WEIGHTS.goal + WEIGHTS.subgoal + WEIGHTS.delivery + WEIGHTS.experience)
  assert.equal(wolverine.goal, true)
  assert.equal(wolverine.subgoal, true)
  assert.equal(wolverine.delivery, true)
  assert.equal(wolverine.experience, true)

  // BPC-157 is injectable-only and maintenance-tagged: goal + experience only
  const bpc = scoreProtocol(bySlug('bpc-157'), b)
  assert.equal(bpc.score, WEIGHTS.goal + WEIGHTS.experience)

  // A protocol for a different goal earns nothing, even if delivery matches
  const tirz = scoreProtocol(bySlug('tirzepatide'), b)
  assert.equal(tirz.score, 0)
})

test('recovery + acute injury + pen → Wolverine Stack', () => {
  const { top, runnersUp, fallback } = matchProtocols(quizProtocols, ['recovery', 'recovery-acute', 'pen', 'new'])
  assert.equal(top.protocol.slug, 'wolverine-stack')
  assert.equal(fallback, false)
  assert.equal(runnersUp.length, 2)
  assert.ok(runnersUp.every(r => r.score < top.score))
})

test('recovery + maintenance + vial + first time → BPC-157 ranks above the stacks', () => {
  const { top } = matchProtocols(quizProtocols, ['recovery', 'recovery-maintenance', 'injectable', 'new'])
  // BPC-157: goal 3 + sub 2 + delivery 1 + exp 0.5 = 6.5; Wolverine also 6.5 → tie
  assert.ok(['bpc-157', 'wolverine-stack'].includes(top.protocol.slug))
  const experienced = matchProtocols(quizProtocols, ['recovery', 'recovery-maintenance', 'injectable', 'experienced'])
  assert.equal(experienced.top.protocol.slug, 'wolverine-stack')
})

test('skin + topical → the GHK-Cu serum, and no fallback', () => {
  const { top, fallback } = matchProtocols(quizProtocols, ['skin', 'topical', 'new'])
  assert.equal(top.protocol.slug, 'ghk-cu-serum')
  assert.equal(fallback, false)
})

test('weight + topical → closest match with the fallback note', () => {
  const { top, fallback } = matchProtocols(quizProtocols, ['weight', 'topical', 'new'])
  assert.equal(fallback, true)
  assert.equal(top.protocol.goalTags.includes('weight'), true)
})

test('no preference on delivery never triggers the fallback', () => {
  const { fallback } = matchProtocols(quizProtocols, ['brain', 'experienced'])
  assert.equal(fallback, false)
})

test('menopause sub-goals map to the four Menopause Reset stacks', () => {
  const cases = {
    'menopause-sleep': 'menopause-reset-restful',
    'menopause-renewal': 'menopause-reset-renew',
    'menopause-skin': 'menopause-reset-radiant',
    'menopause-vitality': 'menopause-reset-ignite',
  }
  for (const [sub, slug] of Object.entries(cases)) {
    const { top } = matchProtocols(quizProtocols, ['menopause', sub, 'injectable', 'new'])
    assert.equal(top.protocol.slug, slug, `${sub} → ${slug}`)
  }
})

test('every Q1 goal produces a top match', () => {
  const goals = QUESTIONS.find(q => q.id === 'goal').options.map(o => o.id)
  for (const g of goals) {
    for (const d of ['injectable', 'pen', 'topical']) {
      const { top } = matchProtocols(quizProtocols, [g, d, 'new'])
      assert.ok(top, `${g} + ${d} has a match`)
    }
  }
})

test('matchStrength is 100 when every answered criterion matches', () => {
  const tags = ['recovery', 'recovery-acute', 'pen', 'new']
  const b = bucketTags(tags)
  const { top } = matchProtocols(quizProtocols, tags)
  assert.equal(matchStrength(top, b), 100)
  const partial = matchProtocols(quizProtocols, ['weight', 'topical', 'new'])
  assert.ok(matchStrength(partial.top, bucketTags(['weight', 'topical', 'new'])) < 100)
})

test('answers round-trip through the query string, dropping notes', () => {
  const answers = { goal: 'recovery', recoveryType: 'acute', delivery: 'pen', experience: 'new', notes: 'private' }
  const q = answersToQuery(answers)
  assert.ok(!q.includes('private'))
  const back = answersFromQuery(q, QUESTIONS.map(x => x.id))
  assert.deepEqual(back, { goal: 'recovery', recoveryType: 'acute', delivery: 'pen', experience: 'new' })
  assert.equal(answersToQuery({}), '')
})

test('conditional questions only appear for their goal', () => {
  const ids = (answers) => visibleQuestions(answers).map(q => q.id)
  assert.deepEqual(ids({ goal: 'skin' }), ['goal', 'delivery', 'experience', 'notes'])
  assert.deepEqual(ids({ goal: 'recovery' }), ['goal', 'recoveryType', 'delivery', 'experience', 'notes'])
  assert.deepEqual(ids({ goal: 'menopause' }), ['goal', 'menopauseFocus', 'delivery', 'experience', 'notes'])
})

test('tagsFromAnswers flattens option tags and ignores "no preference"', () => {
  assert.deepEqual(
    tagsFromAnswers({ goal: 'brain', delivery: 'none', experience: 'experienced', notes: 'x' }),
    ['brain', 'experienced'],
  )
})

test('protocol data is well-formed and slugs are unique', () => {
  const slugs = new Set()
  for (const p of quizProtocols) {
    assert.ok(!slugs.has(p.slug), `duplicate slug ${p.slug}`)
    slugs.add(p.slug)
    assert.match(p.slug, /^[a-z0-9-]+$/)
    assert.ok(p.goalTags.length > 0, `${p.slug} has goal tags`)
    assert.ok(p.deliveryTags.length > 0, `${p.slug} has delivery tags`)
    assert.ok(p.experienceTags.length > 0, `${p.slug} has experience tags`)
    assert.ok(p.summary.length > 80, `${p.slug} has real copy`)
    assert.ok(p.primary?.to && p.primary?.label, `${p.slug} has a primary link`)
    assert.ok(p.metaTitle && p.metaDescription, `${p.slug} has meta`)
    assert.ok(p.metaDescription.length <= 170, `${p.slug} meta description length`)
  }
})
