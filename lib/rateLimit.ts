// Best-effort, per-instance rate limiter. Serverless platforms run several
// instances, so treat this as a speed bump; add a platform firewall rule
// (for example Vercel WAF rate limiting) for a hard limit.
const hits = new Map<string, number[]>()

export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; retryAfter: number } {
  const now = Date.now()
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return { ok: false, retryAfter: Math.ceil((windowMs - (now - recent[0])) / 1000) }
  }
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) {
    hits.forEach((v, k) => {
      if (!v.length || now - v[v.length - 1] > windowMs) hits.delete(k)
    })
  }
  return { ok: true, retryAfter: 0 }
}

export function clientKey(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for') || ''
  return req.headers.get('x-real-ip') || fwd.split(',').pop()?.trim() || 'unknown'
}
