import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/documentdb'
import type { Enterprise } from '@/lib/types'

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

    const db = await getDatabase()
    const collection = db.collection('records')

    // Build the canonical URL to match
    const canonicalUrl = `/${state}/${city}/${slug}`

    const enterprise = await collection.findOne({
      'slugs.canonical_url': canonicalUrl,
    })

    if (!enterprise) {
      return NextResponse.json(
        { error: 'Enterprise not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(enterprise as unknown as Enterprise)
  } catch (error) {
    console.error('Get enterprise error:', error)
    return NextResponse.json(
      { error: 'Failed to get enterprise' },
      { status: 500 }
    )
  }
}
