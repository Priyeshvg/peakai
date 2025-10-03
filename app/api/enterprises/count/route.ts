import { NextResponse } from 'next/server'
import { getDatabase } from '@/lib/documentdb'

export async function GET() {
  try {
    const db = await getDatabase()
    const collection = db.collection('records')

    const count = await collection.countDocuments()

    return NextResponse.json({ count })
  } catch (error) {
    console.error('Count error:', error)
    return NextResponse.json(
      { error: 'Failed to get enterprise count', count: 0 },
      { status: 500 }
    )
  }
}
