import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const idea = body.idea || 'Unknown idea'

  const response = {
    truthScore: 74,
    idea,
    roasts: [
      {
        persona: 'Corporate Heckler',
        text: 'This startup uses more buzzwords than an AI conference bathroom conversation.'
      },
      {
        persona: 'Burned-Out VC',
        text: 'Interesting concept, but your monetization strategy currently feels emotionally optimistic.'
      },
      {
        persona: 'Glam Assassin',
        text: 'Your branding says enterprise software. Your pitch says caffeine hallucination.'
      }
    ],
    analysis: {
      biggestRisk: 'Weak differentiation in an overcrowded AI category.',
      nextMove: 'Narrow your ICP and validate willingness to pay with real customer interviews.',
      scores: {
        virality: 81,
        monetization: 58,
        scalability: 72,
        investorAppeal: 67
      }
    }
  }

  return NextResponse.json(response)
}
