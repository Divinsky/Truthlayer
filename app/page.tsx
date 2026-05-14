'use client'

import { useState } from 'react'
import LoadingState from '@/components/LoadingState'
import ShareCard from '@/components/ShareCard'
import { personas } from '@/lib/personas'
import { presets } from '@/lib/presets'

const intensities = ['Light', 'Boardroom Honest', 'Brutal', 'Boardroom Bloodbath']
const tickerItems = [
  'No permanent storage',
  'No public AI training',
  'Fictional personas only',
  'Founder-safe feedback',
  'Public sharing is opt-in',
  'C-suite critique with teeth'
]

export default function Home() {
  const [idea, setIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([
    'Corporate Heckler',
    'Burned-Out VC',
    'Glam Assassin'
  ])
  const [intensity, setIntensity] = useState('Boardroom Honest')
  const [result, setResult] = useState<any>(null)
  const [showShareCard, setShowShareCard] = useState(false)

  function togglePersona(persona: string) {
    if (selectedPersonas.includes(persona)) {
      setSelectedPersonas(selectedPersonas.filter((p) => p !== persona))
    } else if (selectedPersonas.length < 3) {
      setSelectedPersonas([...selectedPersonas, persona])
    }
  }

  async function handleRoast() {
    if (!idea.trim()) return
    setLoading(true)
    setShowShareCard(false)

    try {
      const res = await fetch('/api/roast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, personas: selectedPersonas, intensity })
      })
      setResult(await res.json())
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  return (
    <main className="bg-grain min-h-screen overflow-hidden">
      <div className="bg-aurora" />
      <div className="bg-grid" />

      <nav className="shell sticky top-0 z-30 py-5">
        <div className="card flex items-center justify-between rounded-none px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="dot" />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-white">
              AI Truth Layer
            </span>
          </div>
          <div className="desktop-nav flex items-center gap-6 text-xs uppercase tracking-[0.18em] text-[color:var(--text-3)]">
            <span>Roast Room</span>
            <span>Private By Design</span>
            <span>Founder Intel</span>
          </div>
          <button onClick={() => document.getElementById('roast-room')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-primary py-3">Enter Boardroom</button>
        </div>
      </nav>

      <section className="shell pt-16 pb-10">
        <div className="hero-grid grid grid-cols-[1.05fr_0.95fr] gap-12 items-end">
          <div>
            <div className="eyebrow mb-6 flex items-center gap-3">
              <span className="dot dot-magenta" /> The Roast Room / Friends & Founder Preview
            </div>
            <h1 className="font-display text-[clamp(64px,10vw,150px)] leading-[0.86] text-[color:var(--bone)]">
              Your idea needs a boardroom roast.
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[color:var(--text-2)]">
              Paste a pitch, resume, campaign, LinkedIn post, or startup concept. AI comic executives roast it, score it, and tell you what is actually broken.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <button onClick={() => document.getElementById('roast-room')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-primary">
                Roast My Idea
              </button>
              <button onClick={() => document.getElementById('trust-layer')?.scrollIntoView({ behavior: 'smooth' })} className="btn">View Trust Layer</button>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between border-b border-[color:var(--line-1)] pb-4">
              <span className="eyebrow">Live Diagnostics</span>
              <span className="kbd">PRIVATE MODE</span>
            </div>
            <div className="py-8">
              <p className="font-display text-5xl leading-none text-white">74</p>
              <p className="eyebrow mt-3">Average truth score</p>
              <div className="mt-7 space-y-4">
                {['Virality pressure', 'Monetization realism', 'Founder delusion risk'].map((label, index) => (
                  <div key={label}>
                    <div className="mb-2 flex justify-between text-xs text-[color:var(--text-3)]">
                      <span>{label}</span>
                      <span>{[81, 58, 72][index]}%</span>
                    </div>
                    <div className="h-px bg-[color:var(--line-2)]">
                      <div className="h-px bg-[color:var(--cyan)]" style={{ width: `${[81, 58, 72][index]}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="border-t border-[color:var(--line-1)] pt-5 text-sm leading-relaxed text-[color:var(--text-3)] caret">
              Most people protect your feelings. We protect your runway.
            </p>
          </div>
        </div>
      </section>

      <div className="relative z-20 overflow-hidden border-y border-[color:var(--line-1)] bg-[color:var(--glass-1)] py-3">
        <div className="flex w-[200%] animate-[marquee_24s_linear_infinite] gap-8 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--text-3)]">
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-${index}`} className="whitespace-nowrap">✦ {item}</span>
          ))}
        </div>
      </div>

      <section id="roast-room" className="shell py-16">
        <div className="app-grid grid grid-cols-[0.95fr_1.05fr] gap-8">
          <div className="card p-7">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <p className="eyebrow mb-2">Input Chamber</p>
                <h2 className="font-display text-5xl text-white">The Roast Room</h2>
              </div>
              <span className="kbd">No storage</span>
            </div>

            <div className="mb-6">
              <p className="eyebrow mb-3">Try a sample</p>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.title}
                    onClick={() => { setIdea(preset.idea); setResult(null); setShowShareCard(false) }}
                    className="border border-[color:var(--line-1)] bg-[color:var(--glass-1)] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--text-2)] transition hover:border-[color:var(--cyan)] hover:text-white"
                  >
                    {preset.title}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              className="field min-h-[220px] resize-none"
              placeholder="Paste the idea you are brave enough to test..."
            />

            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <p className="eyebrow">Choose your panel</p>
                <p className="font-mono text-xs text-[color:var(--text-4)]">Select up to 3</p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {personas.map((persona) => {
                  const active = selectedPersonas.includes(persona.name)
                  return (
                    <button
                      key={persona.name}
                      onClick={() => togglePersona(persona.name)}
                      className={`flex items-start justify-between border px-4 py-3 text-left transition ${active ? 'border-[color:var(--cyan)] bg-[color:var(--cyan-soft)]' : 'border-[color:var(--line-1)] bg-[color:var(--glass-1)] hover:border-[color:var(--line-hot)]'}`}
                    >
                      <span>
                        <span className="block text-sm font-semibold text-white">{persona.name}</span>
                        <span className="mt-1 block text-xs text-[color:var(--text-3)]">{persona.specialty}</span>
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-4)]">{persona.tone}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-7">
              <p className="eyebrow mb-3">Roast intensity</p>
              <div className="grid grid-cols-2 gap-2">
                {intensities.map((level) => (
                  <button
                    key={level}
                    onClick={() => setIntensity(level)}
                    className={`border px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] transition ${intensity === level ? 'border-[color:var(--magenta)] bg-[color:var(--magenta-soft)] text-white' : 'border-[color:var(--line-1)] text-[color:var(--text-3)] hover:border-[color:var(--magenta)] hover:text-white'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleRoast} disabled={!idea.trim() || loading} className="btn btn-primary mt-8 w-full disabled:cursor-not-allowed disabled:opacity-40">
              {loading ? 'Running Diagnostics' : 'Roast My Idea'}
            </button>
          </div>

          <div className="card min-h-[760px] p-7">
            {loading ? (
              <LoadingState />
            ) : !result ? (
              <div className="flex h-full min-h-[620px] flex-col justify-between">
                <div>
                  <p className="eyebrow mb-4">Executive Boardroom</p>
                  <h2 className="font-display text-6xl leading-[0.92] text-white">The verdict appears here.</h2>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--text-3)]">
                    A fictional panel of AI comic executives will roast the submission, score the business fundamentals, and recommend the next move.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['Virality', 'Monetization', 'Scalability', 'Investor Appeal'].map((label) => (
                    <div key={label} className="border border-[color:var(--line-1)] bg-[color:var(--glass-1)] p-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-4)]">{label}</p>
                      <p className="mt-4 font-display text-4xl text-[color:var(--text-2)]">—</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-8 flex items-start justify-between border-b border-[color:var(--line-1)] pb-7">
                  <div>
                    <p className="eyebrow mb-2">Truth Score</p>
                    <h2 className="font-display text-8xl leading-none text-[color:var(--cyan)]">{result.truthScore}</h2>
                  </div>
                  <div className="text-right">
                    <span className="kbd">{result.mode === 'live' ? 'LIVE AI' : 'MOCK MODE'}</span>
                    <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--text-3)]">{result.intensity}</p>
                  </div>
                </div>

                <div className="mb-8 grid grid-cols-2 gap-3">
                  {Object.entries(result.analysis.scores).map(([key, value]) => (
                    <div key={key} className="border border-[color:var(--line-1)] bg-[color:var(--glass-1)] p-4">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--text-4)]">{key.replace(/([A-Z])/g, ' $1')}</p>
                        <p className="font-mono text-xs text-white">{String(value)}</p>
                      </div>
                      <div className="h-px bg-[color:var(--line-2)]">
                        <div className="h-px bg-[color:var(--cyan)]" style={{ width: `${value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  {result.roasts.map((roast: any) => (
                    <div key={roast.persona} className="border border-[color:var(--line-1)] bg-black/20 p-5">
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--magenta)]">{roast.persona}</p>
                      <p className="mt-3 text-xl leading-relaxed text-white">“{roast.text}”</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border border-[color:var(--line-2)] bg-[color:var(--cyan-soft)] p-6">
                  <p className="eyebrow mb-3 text-[color:var(--cyan)]">Executive Verdict</p>
                  <p className="text-lg leading-relaxed text-white">{result.analysis.executiveVerdict}</p>
                </div>

                <div className="mt-3 grid md:grid-cols-2 gap-3">
                  <div className="border border-[color:var(--line-1)] bg-[color:var(--glass-1)] p-5">
                    <p className="eyebrow mb-3 text-[color:var(--magenta)]">Biggest Risk</p>
                    <p className="text-[color:var(--text-2)]">{result.analysis.biggestRisk}</p>
                  </div>
                  <div className="border border-[color:var(--line-1)] bg-[color:var(--glass-1)] p-5">
                    <p className="eyebrow mb-3 text-[color:var(--amber)]">Next Move</p>
                    <p className="text-[color:var(--text-2)]">{result.analysis.nextMove}</p>
                  </div>
                </div>

                <div className="mt-3 border border-[color:var(--line-1)] bg-[color:var(--glass-1)] p-5">
                  <p className="eyebrow mb-3">Better Positioning</p>
                  <p className="text-[color:var(--text-2)]">{result.analysis.improvedPositioning}</p>
                </div>

                <div className="mt-3 border border-[color:var(--line-1)] bg-[color:var(--glass-1)] p-5">
                  <p className="eyebrow mb-3">Suggested Partner Routes</p>
                  <div className="flex flex-wrap gap-2">
                    {result.analysis.partnerRoutes.map((route: string) => (
                      <span key={route} className="border border-[color:var(--line-2)] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--text-2)]">{route}</span>
                    ))}
                  </div>
                </div>

                <button onClick={() => setShowShareCard(!showShareCard)} className="btn mt-6 w-full">
                  {showShareCard ? 'Hide Share Card' : 'Generate Share Card'}
                </button>
                {showShareCard && (
                  <div className="mt-6">
                    <ShareCard truthScore={result.truthScore} verdict={result.analysis.executiveVerdict} topRoast={result.roasts[0]?.text || 'Your idea survived. Barely.'} />
                    <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--text-4)]">Screenshot this card for now. Export button coming next.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="trust-layer" className="shell pb-20">
        <div className="card grid gap-8 p-8 md:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="eyebrow mb-4 text-[color:var(--cyan)]">Private By Design</p>
            <h3 className="font-display text-6xl leading-[0.95] text-white">Your ideas go in. The truth comes out. Nothing stays behind.</h3>
          </div>
          <div className="grid gap-3 text-sm text-[color:var(--text-2)]">
            <p>✦ No permanent storage of submissions</p>
            <p>✦ No public AI training on user uploads</p>
            <p>✦ No selling raw ideas or pitch content</p>
            <p>✦ Public sharing only if the user chooses it</p>
            <p>✦ Fictional AI personas only — no celebrity impersonation</p>
          </div>
        </div>
      </section>
    </main>
  )
}
