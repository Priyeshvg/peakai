import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Building2 } from 'lucide-react'

interface PageProps {
  params: Promise<{
    state: string
  }>
}

interface CityData {
  city_slug: string
  city: string
  count: number
}

async function getStateCities(state: string): Promise<CityData[] | null> {
  try {
    const EC2_API_URL = process.env.EC2_API_URL || 'http://3.108.55.217:3000'
    const res = await fetch(
      `${EC2_API_URL}/api/enterprises/cities/${state}`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error('Failed to fetch cities:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params
  const stateTitle = state.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

  return {
    title: `MSME Businesses in ${stateTitle} | PeakAI Directory`,
    description: `Browse MSME enterprises across cities in ${stateTitle}. Find businesses by location.`,
  }
}

export default async function StatePage({ params }: PageProps) {
  const { state } = await params
  const cities = await getStateCities(state)

  if (!cities || cities.length === 0) {
    notFound()
  }

  const stateTitle = state.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const totalEnterprises = cities.reduce((sum, city) => sum + city.count, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <nav className="flex items-center space-x-2 text-sm text-brand-600 mb-4">
            <Link href="/" className="hover:text-accent-600">Home</Link>
            <span>/</span>
            <Link href="/msme" className="hover:text-accent-600">MSME</Link>
            <span>/</span>
            <span className="text-brand-900">{stateTitle}</span>
          </nav>
          <h1 className="text-4xl font-bold text-brand-900">
            MSME Businesses in {stateTitle}
          </h1>
          <p className="text-brand-700 mt-2">
            {totalEnterprises.toLocaleString()} enterprises across {cities.length} cities
          </p>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link
              key={city.city_slug}
              href={`/${state}/${city.city_slug}`}
              className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-brand-200 hover:border-accent-500"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-accent-600" />
                  <div>
                    <h2 className="text-xl font-semibold text-brand-900">
                      {city.city}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-brand-600">
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {city.count.toLocaleString()} Enterprises
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
