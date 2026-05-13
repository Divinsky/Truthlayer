'use client'

import { useState } from 'react'

const personas = [
  'Corporate Heckler',
  'Burned-Out VC',
  'Glam Assassin',
  'Operations Dad',
  'Chaos Goblin',
  'Deadpan CFO',
  'Legal Buzzkill',
  'Product Therapist'
]

const intensities = [
  'Light',
  'Boardroom Honest',
  'Brutal',
  'Boardroom Bloodbath'
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

  function togglePersona(persona: string) {
    if (selectedPersonas.includes(persona)) {
      setSelectedPersonas(selectedPersonas.filter((p) => p !== persona))
    } else if (selectedPersonas.length < 3) {
      setSelectedPersonas([...selectedPersonas, persona])
    }
  }

  async function handleRoast() {
    setLoading(true)

    try {
      const res = await fetch('/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idea,
          personas: selectedPersonas,
          intensity
        })
      })

      const data = await res.json()
      setResult(data)
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-300 text-sm mb-6">
            AI Truth Layer • Private By Design
          </div>

          <h1 className="text-6xl lg:text-7xl font-black leading-[0.95] max-w-5xl tracking-tight">
            Most people won’t tell you the truth about your idea.
            <span className="text-cyan-400"> We will.</span>
          </h1>

          <p className="text-zinc-400 text-xl mt-8 max-w-3xl leading-relaxed">
            Paste your startup, pitch, resume, LinkedIn post, campaign, or product concept and get roasted by AI comic executives with real C-suite judgment.
          </p>
        </div>

        <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="bg-zinc-950/80 backdrop-blur border border-zinc-800 rounded-[32px] p-8 shadow-2xl shadow-cyan-500/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">The Roast Room</h2>
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Ephemeral Analysis
              </span>
            </div>

            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              className="w-full h-56 bg-black/70 border border-zinc-700 rounded-3xl p-5 text-zinc-200 text-lg resize-none focus:outline-none focus:border-cyan-500"
              placeholder="Paste your startup idea, pitch, or LinkedIn post here..."
            />

            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                  Choose Your Panel
                </p>
                <p className="text-sm text-zinc-500">
                  Select up to 3
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {personas.map((persona) => {
                  const active = selectedPersonas.includes(persona)

                  return (
                    <button
                      key={persona}
                      onClick={() => togglePersona(persona)}
                      className={`px-4 py-3 rounded-2xl text-sm border transition-all ${
                        active
                          ? 'bg-cyan-400 text-black border-cyan-300'
                          : 'border-zinc-700 text-zinc-300 hover:border-cyan-500/40 hover:bg-cyan-500/5'
                      }`}
                    >
                      {persona}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 mb-4">
                Roast Intensity
              </p>

              <div className="flex flex-wrap gap-3">
                {intensities.map((level) => (
                  <button
                    key={level}
                    onClick={() => setIntensity(level)}
                    className={`px-4 py-2 rounded-full border text-sm transition ${
                      intensity === level
                        ? 'border-pink-400 bg-pink-400 text-black'
                        : 'border-zinc-700 text-zinc-300 hover:border-pink-500/50'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleRoast}
              className="mt-10 w-full bg-cyan-400 text-black font-bold text-lg px-6 py-4 rounded-3xl hover:opacity-90 transition"
            >
              {loading ? 'Analyzing Truth...' : 'Roast My Idea'}
            </button>
          </div>

          <div className="bg-zinc-950/80 backdrop-blur border border-zinc-800 rounded-[32px] p-8 shadow-2xl shadow-pink-500/5">
            {!result ? (
              <div className="h-full flex flex-col justify-center">
                <div className="mb-8">
                  <p className="text-sm uppercase tracking-[0.3em] text-pink-400 mb-3">
                    Executive Boardroom
                  </p>

                  <h2 className="text-4xl font-black leading-tight">
                    Your brutally honest AI evaluation appears here.
                  </h2>
                </div>

                <p className="text-zinc-500 text-lg leading-relaxed">
                  Get roasted by AI comic executives while receiving real business intelligence, investor-style critique, and strategic next steps.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 mb-2">
                      Truth Score
                    </p>
                    <h2 className="text-6xl font-black text-cyan-400">
                      {result.truthScore}
                    </h2>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-zinc-500">Intensity</p>
                    <p className="text-pink-400 font-semibold">
                      {result.intensity}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {Object.entries(result.analysis.scores).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-black/40 border border-zinc-800 rounded-2xl p-4"
                    >
                      <p className="text-zinc-500 text-xs uppercase tracking-wide mb-2">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </p>
                      <p className="text-3xl font-bold text-white">{String(value)}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  {result.roasts.map((roast: any) => (
                    <div
                      key={roast.persona}
                      className="border border-zinc-800 rounded-3xl p-5 bg-black/30"
                    >
                      <p className="text-pink-400 font-semibold mb-3">
                        {roast.persona}
                      </p>
                      <p className="text-zinc-200 text-lg leading-relaxed">
                        {roast.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border border-cyan-500/20 bg-cyan-500/5 rounded-3xl p-6">
                  <p className="text-cyan-400 font-semibold mb-3">
                    Executive Verdict
                  </p>
                  <p className="text-zinc-200 leading-relaxed">
                    {result.analysis.executiveVerdict}
                  </p>
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <div className="border border-zinc-800 rounded-3xl p-5 bg-black/30">
                    <p className="text-red-400 font-semibold mb-2">
                      Biggest Risk
                    </p>
                    <p className="text-zinc-300 leading-relaxed">
                      {result.analysis.biggestRisk}
                    </p>
                  </div>

                  <div className="border border-zinc-800 rounded-3xl p-5 bg-black/30">
                    <p className="text-green-400 font-semibold mb-2">
                      Suggested Next Move
                    </p>
                    <p className="text-zinc-300 leading-relaxed">
                      {result.analysis.nextMove}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border border-zinc-800 rounded-3xl p-5 bg-black/30">
                  <p className="text-yellow-400 font-semibold mb-3">
                    Suggested Partner Routes
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {result.analysis.partnerRoutes.map((route: string) => (
                      <span
                        key={route}
                        className="px-3 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-200 text-sm"
                      >
                        {route}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 border border-zinc-800 rounded-[32px] p-8 bg-zinc-950/80 backdrop-blur">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 mb-3">
                Private By Design
              </p>
              <h3 className="text-3xl font-black max-w-2xl leading-tight">
                Your ideas go in. The truth comes out. Nothing stays behind.
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 text-zinc-400 text-sm">
              <p>• No permanent storage</p>
              <p>• No public AI training</p>
              <p>• No selling your ideas</p>
              <p>• Public sharing is opt-in only</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
