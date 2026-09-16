import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUESTIONS, LANDING, RESULT_BASE, visibleQuestions, tagsFromAnswers } from '../data/quizConfig'
import { quizProtocols } from '../data/quizProtocols'
import { matchProtocols, answersToQuery } from '../lib/quizScoring'
import { trackEvent } from '../lib/analytics'
import { prefersReducedMotion } from '../lib/motion'

/*
 * The interactive stepper. Lazy-loaded by the /quiz page after the visitor
 * presses Start, so the landing page's prerendered copy never waits on it.
 *
 * One question per screen. Single-select answers advance automatically
 * after a short beat so a phone user never hunts for a Next button; the
 * optional free-text step ends with an explicit "See my match".
 */

export const NOTES_STORAGE_KEY = 'striata-quiz-notes'

const H = { fontFamily: 'var(--font-heading)' }

const BACK = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M15 19l-7-7 7-7" />
  </svg>
)

const CHECK = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export default function QuizFlow({ onRestart }) {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState({})
  const [step, setStep] = useState(0)
  const [pending, setPending] = useState(null) // option id mid-advance
  const [notes, setNotes] = useState('')
  const timer = useRef(null)
  const headingRef = useRef(null)

  const questions = visibleQuestions(answers)
  const question = questions[step]
  const total = questions.length
  const progress = Math.round((step / total) * 100)

  useEffect(() => {
    trackEvent('quiz_start')
  }, [])

  useEffect(() => {
    trackEvent('quiz_step', { step: step + 1, question: question?.id })
    headingRef.current?.focus({ preventScroll: true })
  }, [step, question?.id])

  useEffect(() => () => clearTimeout(timer.current), [])

  const finish = (finalAnswers) => {
    const tags = tagsFromAnswers(finalAnswers)
    const { top } = matchProtocols(quizProtocols, tags)
    if (!top) return
    try {
      if (notes.trim()) sessionStorage.setItem(NOTES_STORAGE_KEY, notes.trim())
      else sessionStorage.removeItem(NOTES_STORAGE_KEY)
    } catch { /* storage unavailable: notes are simply not carried over */ }
    trackEvent('quiz_complete', { result: top.protocol.slug, goal: finalAnswers.goal })
    navigate(`${RESULT_BASE}/${top.protocol.slug}${answersToQuery(finalAnswers)}`)
  }

  const choose = (optionId) => {
    if (pending) return
    const next = { ...answers, [question.id]: optionId }
    // Changing Q1 invalidates any conditional answer given for another goal.
    if (question.id === 'goal') {
      delete next.recoveryType
      delete next.menopauseFocus
    }
    setAnswers(next)
    setPending(optionId)
    const delay = prefersReducedMotion() ? 0 : 260
    timer.current = setTimeout(() => {
      setPending(null)
      const upcoming = visibleQuestions(next)
      if (step + 1 < upcoming.length) setStep(step + 1)
      else finish(next)
    }, delay)
  }

  const back = () => {
    if (step === 0) { onRestart?.(); return }
    setStep(step - 1)
  }

  if (!question) return null

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between text-xs text-white/45 mb-3 tabular-nums" style={H}>
        <span>Question {step + 1} of {total}</span>
        <span>{progress}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-10" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Quiz progress">
        <div className="h-full bg-[#00B4B4] rounded-full transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <div key={question.id} className="quiz-step">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-3 outline-none"
          style={H}
        >
          {question.title}
        </h2>
        <p className="text-white/50 text-base mb-8">{question.hint}</p>

        {question.type === 'single' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="group" aria-label={question.title}>
            {question.options.map(opt => {
              const selected = answers[question.id] === opt.id
              const isPending = pending === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => choose(opt.id)}
                  aria-pressed={selected}
                  className={`group text-left rounded-2xl border px-5 py-4 transition-all duration-200 cursor-pointer min-h-[72px] flex items-center justify-between gap-3 ${
                    selected || isPending
                      ? 'border-[#00B4B4] bg-[#00B4B4]/12 shadow-lg shadow-[#00B4B4]/10'
                      : 'border-white/10 bg-[#0d1e35] hover:border-[#00B4B4]/50 hover:bg-[#0f2340]'
                  }`}
                >
                  <span>
                    <span className="block text-white font-bold text-base leading-snug" style={H}>{opt.label}</span>
                    {opt.hint && <span className="block text-white/45 text-sm mt-1">{opt.hint}</span>}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      selected || isPending ? 'bg-[#00B4B4] border-[#00B4B4] text-white' : 'border-white/15 text-transparent group-hover:border-[#00B4B4]/50'
                    }`}
                    aria-hidden="true"
                  >
                    {CHECK}
                  </span>
                </button>
              )
            })}
          </div>
        ) : (
          <div>
            <label htmlFor="quiz-notes" className="sr-only">{question.title}</label>
            <textarea
              id="quiz-notes"
              rows={4}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder={question.placeholder}
              className="w-full bg-[#0d1e35] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/25 text-base focus:outline-none focus:border-[#00B4B4]/60 transition-colors resize-none"
            />
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <button type="button" onClick={() => finish(answers)} className="btn btn-primary btn-lg">
                See my match
              </button>
              {!notes.trim() && (
                <button type="button" onClick={() => finish(answers)} className="btn btn-ghost btn-lg">
                  Skip this step
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <button type="button" onClick={back} className="inline-flex items-center gap-1.5 text-white/45 hover:text-[#00B4B4] text-sm transition-colors cursor-pointer">
          {BACK}
          {step === 0 ? LANDING.restart : 'Back'}
        </button>
        <span className="text-white/25 text-xs">Nothing is stored unless you email yourself the result.</span>
      </div>
    </div>
  )
}
