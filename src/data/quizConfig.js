/**
 * Copy and structure for the "Which protocol is right for you?" quiz.
 *
 * Everything a marketer might want to reword lives here: question text,
 * answer options, the tags each answer contributes, and the result-screen
 * and email-capture copy. Scoring lives in lib/quizScoring.js and never
 * needs to change when this file does.
 *
 * Tag vocabulary (must line up with quizProtocols.js):
 *   goal        recovery · skin · weight · body · energy · brain · menopause · wellness · cellular
 *   subgoal     recovery-acute · recovery-maintenance · menopause-sleep · menopause-renewal
 *               · menopause-skin · menopause-vitality
 *   delivery    injectable · pen · topical
 *   experience  new · experienced
 */

export const QUIZ_URL = '/quiz'
export const RESULT_BASE = '/quiz/result'

export const LANDING = {
  eyebrow: 'Sixty-second quiz',
  title: 'Which Protocol Is Right For You?',
  intro:
    'Three or four quick questions about your goal and the format you prefer, and we will point you to the STRIATA stack or peptide people most commonly choose for it. Results show immediately. No sign-up needed.',
  bullets: [
    'Matches you to one of 30 protocols and peptides from the live catalogue',
    'Takes into account whether you want a vial, a pre-filled pen or the topical serum',
    'Every result links straight to the product and the reading behind it',
  ],
  start: 'Start the quiz',
  restart: 'Start again',
}

export const QUESTIONS = [
  {
    id: 'goal',
    type: 'single',
    title: 'What is your main goal right now?',
    hint: 'Pick the one that matters most. You can retake the quiz for another.',
    options: [
      { id: 'recovery', label: 'Recovery & injury healing', hint: 'Tendons, joints, soft tissue, gut', tags: ['recovery'] },
      { id: 'skin', label: 'Skin, hair & anti-aging', hint: 'Collagen, texture, hair, visible aging', tags: ['skin'] },
      { id: 'weight', label: 'Weight loss & appetite control', hint: 'GLP-1 class and fat-burning support', tags: ['weight'] },
      { id: 'body', label: 'Body composition & GH support', hint: 'Lean mass, visceral fat, growth-hormone axis', tags: ['body'] },
      { id: 'energy', label: 'Energy & metabolic support', hint: 'Mitochondria, exercise capacity, fatigue', tags: ['energy'] },
      { id: 'brain', label: 'Focus, mood & sleep', hint: 'Cognition, calm, deep sleep', tags: ['brain'] },
      { id: 'menopause', label: 'Menopause & hormonal symptoms', hint: 'Sleep, skin, drive, fast-forward aging', tags: ['menopause'] },
      { id: 'wellness', label: 'General wellness & immune support', hint: 'Inflammation, immunity, resilience', tags: ['wellness'] },
      { id: 'cellular', label: 'Cellular & antioxidant support', hint: 'NAD+, glutathione, longevity', tags: ['cellular'] },
    ],
  },
  {
    id: 'recoveryType',
    type: 'single',
    showIf: { goal: 'recovery' },
    title: 'Is this a specific injury, or general maintenance?',
    hint: 'This mostly changes what we say, not what we recommend.',
    options: [
      { id: 'acute', label: 'A specific injury I am healing from', hint: 'Recent strain, tear, surgery or flare-up', tags: ['recovery-acute'] },
      { id: 'maintenance', label: 'Ongoing joint & tissue maintenance', hint: 'Training hard, staying ahead of niggles', tags: ['recovery-maintenance'] },
    ],
  },
  {
    id: 'menopauseFocus',
    type: 'single',
    showIf: { goal: 'menopause' },
    title: 'Which symptom cluster matters most right now?',
    hint: 'The Menopause Reset has four stacks. We will highlight the one that fits.',
    options: [
      { id: 'sleep', label: 'Sleep & restfulness', hint: '3 a.m. wake-ups, wired-but-tired', tags: ['menopause-sleep'] },
      { id: 'renewal', label: 'Renewal & energy', hint: 'Fatigue, fat gain, aging in fast-forward', tags: ['menopause-renewal'] },
      { id: 'skin', label: 'Skin & radiance', hint: 'Collagen loss, crepey texture', tags: ['menopause-skin'] },
      { id: 'vitality', label: 'Drive & vitality', hint: 'Desire, arousal, intimacy', tags: ['menopause-vitality'] },
    ],
  },
  {
    id: 'delivery',
    type: 'single',
    // The Menopause Reset stacks only come as vials, so the question would
    // have one real answer; skip it.
    skipIf: { goal: ['menopause'] },
    title: 'Which format would you like?',
    hint: 'Pens come ready to use. Vials are the most economical.',
    options: [
      { id: 'injectable', label: 'Vial', hint: 'Powder you mix with bacteriostatic water', tags: ['injectable'] },
      { id: 'pen', label: 'Pre-filled pen', hint: 'Ready to use, no mixing', tags: ['pen'] },
      // Only the skin goal has a topical product.
      { id: 'topical', label: 'Topical serum', hint: 'A GHK-Cu serum for the skin', tags: ['topical'], goals: ['skin'] },
      { id: 'none', label: 'No preference', hint: 'Show me the best match in any format', tags: [] },
    ],
  },
  {
    id: 'experience',
    type: 'single',
    title: 'Are peptides new to you?',
    hint: 'If they are, we lean towards simpler single-compound matches.',
    options: [
      { id: 'new', label: 'Yes, keep it simple', hint: 'Single compounds where possible', tags: ['new'] },
      { id: 'experienced', label: 'No, show me stacks too', hint: 'Multi-compound blends included', tags: ['experienced'] },
    ],
  },
]

/**
 * Questions with `showIf` are only asked when that earlier answer matches;
 * `skipIf` drops a question when an earlier answer is one of the listed ids.
 */
export function visibleQuestions(answers) {
  return QUESTIONS.filter(
    q =>
      (!q.showIf || Object.entries(q.showIf).every(([k, v]) => answers[k] === v)) &&
      (!q.skipIf || !Object.entries(q.skipIf).some(([k, ids]) => ids.includes(answers[k]))),
  )
}

/** Options with `goals` are only offered for those goals (the serum is skin-only). */
export function visibleOptions(question, answers) {
  return question.options.filter(o => !o.goals || o.goals.includes(answers.goal))
}

/** Flatten chosen options into the tag list scoring consumes. */
export function tagsFromAnswers(answers) {
  const tags = []
  for (const q of QUESTIONS) {
    if (q.type !== 'single') continue
    const opt = q.options.find(o => o.id === answers[q.id])
    if (opt) tags.push(...opt.tags)
  }
  return tags
}

/** Human-readable label for an answer, for the result page and lead payload. */
export function answerLabel(questionId, optionId) {
  const q = QUESTIONS.find(x => x.id === questionId)
  return q?.options?.find(o => o.id === optionId)?.label ?? optionId
}

export const RESULT_COPY = {
  eyebrow: 'Your match',
  runnersUp: 'Also worth a look',
  fallbackNote: 'Closest match. Nothing for this goal comes in the format you chose, so ask us about delivery options.',
  whyTitle: 'Why this matched',
  disclaimer:
    'For informational purposes only and not medical advice. This quiz matches your stated goals to what people commonly use STRIATA products for; it does not diagnose or prescribe. All products are sold for research purposes. Consult product literature and a qualified practitioner as appropriate.',
}

export const LEAD_CAPTURE = {
  title: 'Email me this result',
  body: 'Optional. We will send you a link to this page plus the reading behind it. Nothing is sent unless you submit.',
  placeholder: 'you@example.com',
  button: 'Send it to me',
  sending: 'Sending…',
  success: 'Sent. Check your inbox in the next few minutes.',
  error: 'That did not go through. Message us on WhatsApp instead and we will send it over.',
  consent: 'By submitting you agree to receive this result and occasional STRIATA updates by email. Unsubscribe any time.',
}
