import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/documentdb'
import type { Enterprise, SearchResult } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    if (!query.trim()) {
      return NextResponse.json({
        enterprises: [],
        total: 0,
        page,
        limit,
      })
    }

    const db = await getDatabase()
    const collection = db.collection('records')

    // Smart search - prepare variations
    const searchLower = query.toLowerCase().replace(/\s+/g, '-')
    const searchRaw = query.toLowerCase()
    const searchUpper = query.toUpperCase()

    // Return all data for now (no projection)
    const projection = undefined

    // Try fast indexed queries first
    let enterprises = await collection
      .find({
        $or: [
          { 'address.state_slug': searchLower },
          { 'address.city_slug': searchLower },
          { 'address.state_slug': { $regex: `^${searchLower}` } },
          { 'address.city_slug': { $regex: `^${searchLower}` } },
        ],
      })
      .limit(limit)
      .toArray()

    // If no results, try UDYAM number
    if (enterprises.length === 0 && searchUpper.includes('UDYAM')) {
      enterprises = await collection
        .find({
          registration_number: { $regex: searchUpper.replace(/-/g, '.*') },
        })
        .limit(limit)
        .toArray()
    }

    // If still no results and 5+ chars, try company name (with timeout)
    if (enterprises.length === 0 && searchRaw.length >= 5) {
      try {
        enterprises = await collection
          .find({
            enterprise_name_lower: { $regex: searchRaw },
          })
          .limit(limit)
          .maxTimeMS(3000)
          .toArray()
      } catch (timeoutError) {
        // Timeout - return empty results instead of error
        console.log('Company name search timed out for:', query)
        enterprises = []
      }
    }

    const total = enterprises.length

    const result: SearchResult = {
      enterprises: enterprises as unknown as Enterprise[],
      total,
      page,
      limit,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Search error:', error)
    // Return empty results instead of error
    return NextResponse.json({
      enterprises: [],
      total: 0,
      page: 1,
      limit: 20,
    })
  }
}
