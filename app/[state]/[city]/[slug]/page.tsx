import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Building2, MapPin, Calendar, Users, Briefcase, Mail, Phone, FileText } from 'lucide-react'
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
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-brand-900 mb-2">Location</h2>
                <div className="bg-brand-50 rounded-lg p-4">
                  {enterprise.address.flat && <p className="text-brand-700">{enterprise.address.flat}</p>}
                  {enterprise.address.building && <p className="text-brand-700">{enterprise.address.building}</p>}
                  {enterprise.address.village && <p className="text-brand-700">{enterprise.address.village}</p>}
                  {enterprise.address.block && <p className="text-brand-700">{enterprise.address.block}</p>}
                  {enterprise.address.road && <p className="text-brand-700">{enterprise.address.road}</p>}
                  <p className="text-brand-900 font-medium mt-2">
                    {enterprise.address.city}, {enterprise.address.district}
                  </p>
                  <p className="text-brand-700">
                    {enterprise.address.state} - {enterprise.address.pin}
                  </p>
                </div>
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
                    <span className="font-medium">Registration:</span> {enterprise.dates.registration || 'N/A'}
                  </p>
                  <p className="text-brand-700">
                    <span className="font-medium">Incorporation:</span> {enterprise.dates.incorporation || 'N/A'}
                  </p>
                  {enterprise.dates.commencement && (
                    <p className="text-brand-700">
                      <span className="font-medium">Commencement:</span> {enterprise.dates.commencement}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            {enterprise.contact && (enterprise.contact.email || enterprise.contact.mobile) && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-brand-900 mb-4">Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {enterprise.contact.email && (
                    <div className="flex items-center gap-3 bg-brand-50 rounded-lg p-4">
                      <Mail className="w-5 h-5 text-accent-600" />
                      <div>
                        <p className="text-sm text-brand-600">Email</p>
                        <p className="text-brand-900 font-medium">{enterprise.contact.email}</p>
                      </div>
                    </div>
                  )}
                  {enterprise.contact.mobile && (
                    <div className="flex items-center gap-3 bg-brand-50 rounded-lg p-4">
                      <Phone className="w-5 h-5 text-accent-600" />
                      <div>
                        <p className="text-sm text-brand-600">Mobile</p>
                        <p className="text-brand-900 font-medium">{enterprise.contact.mobile}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Government Details */}
            {enterprise.government && (enterprise.government.dic || enterprise.government.msme_dfo) && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-brand-900 mb-4">Government Office Details</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {enterprise.government.dic && (
                    <div className="flex items-center gap-3 bg-brand-50 rounded-lg p-4">
                      <FileText className="w-5 h-5 text-accent-600" />
                      <div>
                        <p className="text-sm text-brand-600">DIC</p>
                        <p className="text-brand-900 font-medium">{enterprise.government.dic}</p>
                      </div>
                    </div>
                  )}
                  {enterprise.government.msme_dfo && (
                    <div className="flex items-center gap-3 bg-brand-50 rounded-lg p-4">
                      <FileText className="w-5 h-5 text-accent-600" />
                      <div>
                        <p className="text-sm text-brand-600">MSME DFO</p>
                        <p className="text-brand-900 font-medium">{enterprise.government.msme_dfo}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Navigation Links */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/msme"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
            >
              ← Back to Search
            </Link>
            <Link
              href={`/${state}/${city}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-100 text-brand-900 rounded-lg hover:bg-brand-200 transition-colors border border-brand-300"
            >
              More in {city.replace(/-/g, ' ')}
            </Link>
            <Link
              href={`/${state}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-100 text-brand-900 rounded-lg hover:bg-brand-200 transition-colors border border-brand-300"
            >
              Browse {state.replace(/-/g, ' ')}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
