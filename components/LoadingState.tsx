export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full border border-cyan-500/20" />
        <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin" />
      </div>

      <p className="text-cyan-400 text-sm uppercase tracking-[0.3em] mb-4">
        AI Executive Boardroom
      </p>

      <h3 className="text-3xl font-black mb-4 max-w-xl leading-tight">
        Pressure testing your idea against artificial intelligence and emotionally damaged executives.
      </h3>

      <p className="text-zinc-500 max-w-lg leading-relaxed">
        Evaluating monetization, virality, scalability, positioning, investor appeal, and survivability.
      </p>
    </div>
  )
}
