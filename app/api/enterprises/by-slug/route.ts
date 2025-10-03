import { NextRequest, NextResponse } from 'next/server'

const EC2_API_URL = process.env.EC2_API_URL || 'http://3.108.55.217:3000'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const state = searchParams.get('state')
    const city = searchParams.get('city')
    const slug = searchParams.get('slug')

    if (!state || !city || !slug) {
      return NextResponse.json(
        { error: 'Missing required parameters: state, city, slug' },
        { status: 400 }
      )
    }

    // Call EC2 API with separate path parameters
    const response = await fetch(`${EC2_API_URL}/api/enterprises/by-slug/${state}/${city}/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Enterprise not found' },
          { status: 404 }
        )
      }
      throw new Error('Failed to fetch from EC2 API')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Get enterprise error:', error)
    return NextResponse.json(
      { error: 'Failed to get enterprise' },
      { status: 500 }
    )
  }
}
