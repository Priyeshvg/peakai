import { NextResponse } from 'next/server'

const EC2_API_URL = process.env.EC2_API_URL || 'http://3.108.55.217:3000'

export async function GET() {
  try {
    const response = await fetch(`${EC2_API_URL}/api/enterprises/count`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch from EC2 API')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Count error:', error)
    return NextResponse.json(
      { error: 'Failed to get enterprise count', count: 0 },
      { status: 500 }
    )
  }
}
