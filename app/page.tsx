export default function Home() {
  const personas = [
    'Corporate Heckler',
    'Burned-Out VC',
    'Glam Assassin',
    'Operations Dad',
    'Chaos Goblin'
  ]

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-4">
            AI Truth Layer
          </p>
          <h1 className="text-6xl font-bold leading-tight max-w-4xl">
            Most people won’t tell you the truth about your idea. We will.
          </h1>
          <p className="text-zinc-400 text-xl mt-6 max-w-3xl">
            Paste your pitch, startup, resume, LinkedIn post, campaign, or product concept and get roasted by AI comic executives with real C-suite judgment.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Roast My Idea</h2>
            <textarea
              className="w-full h-52 bg-black border border-zinc-700 rounded-2xl p-4 text-zinc-200"
              placeholder="Paste your startup idea here..."
            />

            <div className="mt-6">
              <p className="text-sm uppercase tracking-wider text-zinc-500 mb-3">
                Choose your panel
              </p>
              <div className="flex flex-wrap gap-2">
                {personas.map((persona) => (
                  <button
                    key={persona}
                    className="px-4 py-2 rounded-full border border-cyan-500/40 text-sm hover:bg-cyan-500/10"
                  >
                    {persona}
                  </button>
                ))}
              </div>
            </div>

            <button className="mt-8 bg-cyan-400 text-black font-semibold px-6 py-3 rounded-2xl hover:opacity-90 transition">
              Roast My Idea
            </button>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Truth Score</h2>
              <span className="text-cyan-400 text-4xl font-bold">72</span>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-pink-400 font-semibold">Corporate Heckler</p>
                <p className="text-zinc-300 mt-2">
                  “You used the phrase AI-powered ecosystem three times and I still have no idea what your product does.”
                </p>
              </div>

              <div>
                <p className="text-yellow-400 font-semibold">Burned-Out VC</p>
                <p className="text-zinc-300 mt-2">
                  TAM assumptions unrealistic. Strong niche opportunity if repositioned toward operational healthcare workflows.
                </p>
              </div>

              <div>
                <p className="text-cyan-400 font-semibold">Biggest Risk</p>
                <p className="text-zinc-300 mt-2">
                  Weak differentiation and unclear customer retention strategy.
                </p>
              </div>

              <div>
                <p className="text-green-400 font-semibold">Suggested Next Move</p>
                <p className="text-zinc-300 mt-2">
                  Narrow ICP, simplify messaging, and validate pricing with 10 customer interviews.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border border-zinc-800 rounded-3xl p-6 bg-zinc-950">
          <h3 className="text-2xl font-semibold mb-4">Private by design.</h3>
          <div className="grid md:grid-cols-2 gap-4 text-zinc-400">
            <p>• No permanent storage</p>
            <p>• No public AI training</p>
            <p>• No selling your ideas</p>
            <p>• Public sharing only if you choose it</p>
          </div>
        </div>
      </div>
    </main>
  )
}
