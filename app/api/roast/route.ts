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

function mockResponse(idea: string, selectedPersonas: string[], intensity: string) {
  return {
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
    privacyNote: 'This prototype is designed around ephemeral analysis: no permanent storage, no public training, no selling user ideas.',
    mode: 'mock'
  }
}

function buildPrompt(idea: string, selectedPersonas: string[], intensity: string) {
  return `You are AI Truth Layer, a privacy-first AI boardroom roast engine.

Analyze this user-submitted idea with two simultaneous goals:
1. Roast it in a funny, sharp, memorable way using fictional AI comic-executive personas.
2. Evaluate it with serious C-suite judgment.

Do not impersonate real comedians, celebrities, living people, deceased people, or public figures.
Do not copy catchphrases or known routines.
Keep jokes clever, not hateful. Do not attack protected classes.

User idea:
${idea}

Selected fictional personas:
${selectedPersonas.join(', ')}

Roast intensity:
${intensity}

Return ONLY valid JSON with this exact shape:
{
  "truthScore": number from 0 to 100,
  "category": "short category label",
  "intensity": "${intensity}",
  "ideaPreview": "short sanitized summary under 160 characters",
  "roasts": [
    { "persona": "persona name", "text": "one sharp roast line" }
  ],
  "analysis": {
    "executiveVerdict": "serious executive evaluation in 1-2 sentences",
    "biggestRisk": "single biggest risk",
    "nextMove": "specific recommended next step",
    "improvedPositioning": "stronger positioning statement",
    "partnerRoutes": ["3-5 possible partner categories"],
    "scores": {
      "virality": number from 0 to 100,
      "monetization": number from 0 to 100,
      "scalability": number from 0 to 100,
      "brandStrength": number from 0 to 100,
      "investorAppeal": number from 0 to 100,
      "operationalRisk": number from 0 to 100,
      "productMarketFit": number from 0 to 100,
      "differentiation": number from 0 to 100
    }
  },
  "privacyNote": "This analysis is designed for ephemeral processing. Do not include confidential details beyond the user's summary.",
  "mode": "live"
}`
}

export async function POST(req: Request) {
  const body = (await req.json()) as RoastRequest
  const idea = body.idea?.trim() || 'Unknown idea'
  const selectedPersonas = body.personas?.length ? body.personas.slice(0, 3) : fallbackPersonas
  const intensity = body.intensity || 'Boardroom Honest'

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(mockResponse(idea, selectedPersonas, intensity))
  }

  try {
    const openAiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        input: buildPrompt(idea, selectedPersonas, intensity),
        temperature: 0.9
      })
    })

    if (!openAiResponse.ok) {
      console.error('OpenAI API error', await openAiResponse.text())
      return NextResponse.json(mockResponse(idea, selectedPersonas, intensity))
    }

    const data = await openAiResponse.json()
    const text = data.output_text

    if (!text) {
      return NextResponse.json(mockResponse(idea, selectedPersonas, intensity))
    }

    const parsed = JSON.parse(text)
    return NextResponse.json(parsed)
  } catch (error) {
    console.error('Roast generation failed', error)
    return NextResponse.json(mockResponse(idea, selectedPersonas, intensity))
  }
}
