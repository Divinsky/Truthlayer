type ShareCardProps = {
  truthScore: number
  verdict: string
  topRoast: string
}

export default function ShareCard({
  truthScore,
  verdict,
  topRoast
}: ShareCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-zinc-800 bg-black p-8 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-pink-500/10" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-cyan-400 text-xs uppercase tracking-[0.3em] mb-2">
              AI Truth Layer
            </p>
            <h3 className="text-4xl font-black">Truth Score</h3>
          </div>

          <div className="text-7xl font-black text-cyan-400">
            {truthScore}
          </div>
        </div>

        <div className="border border-zinc-800 rounded-3xl p-6 bg-white/5 mb-6">
          <p className="text-pink-400 font-semibold mb-3">
            Top Roast
          </p>

          <p className="text-2xl leading-relaxed font-medium">
            {topRoast}
          </p>
        </div>

        <div className="border border-zinc-800 rounded-3xl p-6 bg-white/5">
          <p className="text-cyan-400 font-semibold mb-3">
            Executive Verdict
          </p>

          <p className="text-zinc-200 text-lg leading-relaxed">
            {verdict}
          </p>
        </div>
      </div>
    </div>
  )
}
