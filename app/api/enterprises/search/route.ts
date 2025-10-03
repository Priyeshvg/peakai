import { NextRequest, NextResponse } from 'next/server'

const EC2_API_URL = process.env.EC2_API_URL || 'http://3.108.55.217:3000'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '20'

    // Forward request to EC2 API
    const ec2Url = `${EC2_API_URL}/api/enterprises/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`

    const response = await fetch(ec2Url, {
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
    console.error('Search error:', error)
    return NextResponse.json({
      enterprises: [],
      total: 0,
      page: 1,
      limit: 20,
    })
  }
}
