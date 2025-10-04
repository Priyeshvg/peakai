import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Building2, MapPin } from 'lucide-react'
import type { Enterprise } from '@/lib/types'

interface PageProps {
  params: Promise<{
    state: string
    city: string
  }>
}

async function getCityEnterprises(state: string, city: string): Promise<Enterprise[] | null> {
  try {
    const EC2_API_URL = process.env.EC2_API_URL || 'http://3.108.55.217:3000'
    const res = await fetch(
      `${EC2_API_URL}/api/enterprises/city/${state}/${city}?limit=50`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    if (!res.ok) return null
    const data = await res.json()
    return data.enterprises || []
  } catch (error) {
    console.error('Failed to fetch enterprises:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city } = await params
  const cityTitle = city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const stateTitle = state.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

  return {
    title: `MSME Businesses in ${cityTitle}, ${stateTitle} | PeakAI Directory`,
    description: `Browse MSME enterprises in ${cityTitle}, ${stateTitle}. Find local businesses and contact information.`,
  }
}

export default async function CityPage({ params }: PageProps) {
  const { state, city } = await params
  const enterprises = await getCityEnterprises(state, city)

  if (!enterprises || enterprises.length === 0) {
    notFound()
  }

  const cityTitle = city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const stateTitle = state.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

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
            <Link href={`/${state}`} className="hover:text-accent-600">{stateTitle}</Link>
            <span>/</span>
            <span className="text-brand-900">{cityTitle}</span>
          </nav>
          <div className="flex items-center gap-3">
            <MapPin className="w-8 h-8 text-accent-600" />
            <div>
              <h1 className="text-4xl font-bold text-brand-900">
                {cityTitle}
              </h1>
              <p className="text-brand-700 mt-1">
                {stateTitle} • {enterprises.length} enterprises
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enterprises List */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-4">
          {enterprises.map((enterprise) => (
            <Link
              key={enterprise._id}
              href={enterprise.slugs.canonical_url}
              className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-brand-200 hover:border-accent-500"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-accent-600 hover:text-accent-800">
                    {enterprise.enterprise_name}
                  </h2>
                  <p className="text-sm text-brand-500 mt-1 font-mono">
                    {enterprise.registration_number}
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-accent-50 text-accent-700 rounded-lg text-sm">
                  <Building2 className="w-4 h-4" />
                  <span>{enterprise.classification.organisation_type}</span>
                </div>
              </div>

              <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-brand-600">Business Activity</p>
                  <p className="text-brand-900 font-medium">{enterprise.classification.major_activity}</p>
                </div>
                <div>
                  <p className="text-brand-600">Location</p>
                  <p className="text-brand-900 font-medium">{enterprise.address.district}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Notice */}
        {enterprises.length >= 50 && (
          <div className="mt-8 text-center">
            <p className="text-brand-600">
              Showing first 50 enterprises. Use the <Link href="/msme" className="text-accent-600 hover:underline">search page</Link> to find more.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
