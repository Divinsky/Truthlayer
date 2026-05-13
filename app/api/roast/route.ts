import { NextResponse } from 'next/server'

type RoastRequest = {
  idea?: string
  personas?: string[]
  intensity?: string
}

const fallbackPersonas = ['Corporate Heckler', 'Burned-Out VC', 'Glam Assassin']

const personaRoasts: Record<string, string> = {
  'Corporate Heckler': 'This pitch has so much synergy I expected it to expense a Patagonia vest.',
  'Burned-Out VC': 'The idea has a pulse, but the business model is currently being kept alive by vibes and a TAM slide.',
  'Glam Assassin': 'The concept could be hot, but the positioning is dressed like it got rejected by a B2B webinar.',
  'Operations Dad': 'Before we disrupt an industry, can we please figure out who fulfills the order and who answers support tickets?',
  'Chaos Goblin': 'This could go viral, but right now it sounds like five TikToks fighting inside a pitch deck.',
  'Deadpan CFO': 'I see revenue optimism, margin denial, and a suspicious absence of customer acquisition costs.',
  'Legal Buzzkill': 'Fun idea. Now explain the data rights, liability exposure, IP position, and why nobody sues you by lunch.',
  'Product Therapist': 'Your user pain is real, but your product promise is trying to heal childhood wounds and automate procurement.',
  'Agency Savage': 'The hook is hiding. The audience is confused. The campaign is giving “we made the logo before the strategy.”',
  'Enterprise Whisperer': 'Procurement will not buy “revolutionary.” They buy risk reduction with a PDF and someone to blame.'
}

export async function POST(req: Request) {
  const body = (await req.json()) as RoastRequest
  const idea = body.idea?.trim() || 'Unknown idea'
  const selectedPersonas = body.personas?.length ? body.personas.slice(0, 3) : fallbackPersonas
  const intensity = body.intensity || 'Boardroom Honest'

  const response = {
    truthScore: 74,
    category: 'Early-stage concept / AI-enabled business idea',
    intensity,
    ideaPreview: idea.length > 140 ? `${idea.slice(0, 140)}...` : idea,
    roasts: selectedPersonas.map((persona) => ({
      persona,
      text: personaRoasts[persona] || 'This idea has potential, but it needs sharper positioning and fewer mystery assumptions.'
    })),
    analysis: {
      executiveVerdict: 'Promising wedge, but the pitch needs a tighter customer, clearer monetization, and proof that this is not just another AI wrapper.',
      biggestRisk: 'Weak differentiation in an overcrowded AI category.',
      nextMove: 'Narrow the ICP, define one painful use case, and validate willingness to pay with 10 real customer interviews.',
      improvedPositioning: 'A private, executive-grade feedback engine that helps founders pressure-test ideas before they waste time, money, or reputation.',
      partnerRoutes: ['Startup accelerators', 'Founder communities', 'Innovation labs', 'VC scout programs'],
      scores: {
        virality: 81,
        monetization: 58,
        scalability: 72,
        brandStrength: 77,
        investorAppeal: 67,
        operationalRisk: 61,
        productMarketFit: 64,
        differentiation: 55
      }
    },
    privacyNote: 'This prototype is designed around ephemeral analysis: no permanent storage, no public training, no selling user ideas.'
  }

  return NextResponse.json(response)
}
