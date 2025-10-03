import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Building2, MapPin, Calendar, Users, Briefcase } from 'lucide-react'
import type { Enterprise } from '@/lib/types'
import { generateMetadata as genMeta, generateStructuredData } from '@/lib/metadata'

interface PageProps {
  params: Promise<{
    state: string
    city: string
    slug: string
  }>
}

async function getEnterprise(state: string, city: string, slug: string): Promise<Enterprise | null> {
  try {
    const EC2_API_URL = process.env.EC2_API_URL || 'http://3.108.55.217:3000'
    const res = await fetch(
      `${EC2_API_URL}/api/enterprises/by-slug/${state}/${city}/${slug}`,
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
    console.error('Failed to fetch enterprise:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city, slug } = await params
  const enterprise = await getEnterprise(state, city, slug)

  if (!enterprise) {
    return {
      title: 'Enterprise Not Found',
      description: 'The requested enterprise could not be found.',
    }
  }

  return genMeta({
    title: enterprise.seo.title,
    description: enterprise.seo.description,
    url: enterprise.slugs.canonical_url,
    type: 'business',
    keywords: enterprise.seo.keywords,
    businessInfo: {
      name: enterprise.enterprise_name,
      address: enterprise.contact?.email,
      state: enterprise.address.state,
      district: enterprise.address.district,
    },
  })
}

export default async function EnterpriseDetailPage({ params }: PageProps) {
  const { state, city, slug } = await params
  const enterprise = await getEnterprise(state, city, slug)

  if (!enterprise) {
    notFound()
  }

  const { defaultStructuredData, businessStructuredData } = generateStructuredData({
    title: enterprise.seo.title,
    description: enterprise.seo.description,
    url: enterprise.slugs.canonical_url,
    type: 'business',
    businessInfo: {
      name: enterprise.enterprise_name,
      address: enterprise.contact?.email,
      state: enterprise.address.state,
      district: enterprise.address.district,
    },
  })

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(defaultStructuredData) }}
      />
      {businessStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessStructuredData) }}
        />
      )}

      <div className="min-h-screen bg-brand-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="flex items-center space-x-2 text-sm text-brand-600">
              <Link href="/" className="hover:text-accent-600">Home</Link>
              <span>/</span>
              <Link href="/msme" className="hover:text-accent-600">MSME</Link>
              <span>/</span>
              <Link href={`/${state}`} className="hover:text-accent-600 capitalize">
                {state.replace(/-/g, ' ')}
              </Link>
              <span>/</span>
              <Link href={`/${state}/${city}`} className="hover:text-accent-600 capitalize">
                {city.replace(/-/g, ' ')}
              </Link>
              <span>/</span>
              <span className="text-brand-900">{enterprise.enterprise_name}</span>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Enterprise Name */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-brand-900">
                  {enterprise.enterprise_name}
                </h1>
                <p className="text-lg text-brand-600 mt-2">
                  {enterprise.registration_number}
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-accent-50 text-accent-700 rounded-lg">
                <Building2 className="w-5 h-5" />
                <span className="font-medium">{enterprise.classification.organisation_type}</span>
              </div>
            </div>

            {/* Location */}
            <div className="mt-8 flex items-start gap-3">
              <MapPin className="w-6 h-6 text-accent-600 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-brand-900">Location</h2>
                <p className="text-brand-700 mt-2">
                  {enterprise.address.city}, {enterprise.address.district}
                </p>
                <p className="text-brand-600">
                  {enterprise.address.state} - {enterprise.address.pin}
                </p>
              </div>
            </div>

            {/* Business Details */}
            <div className="mt-8 grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-3">
                <Briefcase className="w-6 h-6 text-accent-600 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-brand-900">Business Activity</h2>
                  <p className="text-brand-700 mt-2">
                    {enterprise.classification.major_activity}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-accent-600 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-brand-900">Category</h2>
                  <p className="text-brand-700 mt-2">
                    {enterprise.classification.social_category}
                  </p>
                  <p className="text-brand-600">
                    Gender: {enterprise.classification.gender}
                  </p>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="mt-8 flex items-start gap-3">
              <Calendar className="w-6 h-6 text-accent-600 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-brand-900">Important Dates</h2>
                <div className="mt-2 space-y-1">
                  <p className="text-brand-700">
                    <span className="font-medium">Registration:</span> {enterprise.dates.registration}
                  </p>
                  <p className="text-brand-700">
                    <span className="font-medium">Incorporation:</span> {enterprise.dates.incorporation}
                  </p>
                  <p className="text-brand-700">
                    <span className="font-medium">Commencement:</span> {enterprise.dates.commencement}
                  </p>
                </div>
              </div>
            </div>

            {/* Back to Search */}
            <div className="mt-12 pt-8 border-t border-brand-200">
              <Link
                href="/msme"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
              >
                ← Back to Search
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
