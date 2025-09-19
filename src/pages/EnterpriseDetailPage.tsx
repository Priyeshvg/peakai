import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Calendar, Building } from 'lucide-react'
import { getEnterpriseBySlug, type Enterprise } from '../lib/supabase'
import { LLMOptimizedSEO } from '../components/LLMOptimizedSEO'
import { LLMBusinessContent } from '../components/LLMBusinessContent'

export default function EnterpriseDetailPage() {
  const { state, slug } = useParams<{ state: string; slug: string }>()
  const [enterprise, setEnterprise] = useState<Enterprise | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (state && slug) {
      fetchEnterprise()
    }
  }, [state, slug])

  const fetchEnterprise = async () => {
    if (!state || !slug) return

    setLoading(true)
    setError(null)

    try {
      const data = await getEnterpriseBySlug(state, slug)
      if (data) {
        setEnterprise(data)
      } else {
        setError('Enterprise not found')
      }
    } catch (err) {
      setError('Failed to load enterprise details')
      console.error('Error fetching enterprise:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading enterprise details...</p>
        </div>
      </div>
    )
  }

  if (error || !enterprise) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Enterprise Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The requested enterprise could not be found.'}</p>
          <Link
            to="/msme"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not available'
    
    // Handle DD/MM/YYYY format from database
    const parts = dateString.split('/')
    if (parts.length === 3) {
      const [day, month, year] = parts
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    
    // Fallback for other formats
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      {enterprise && (
        <LLMOptimizedSEO
          title={`${enterprise.enterprise_name} - MSME Enterprise in ${enterprise.district_name}, ${enterprise.state_name} | PeakAI`}
          description={`${enterprise.enterprise_name} is a registered MSME enterprise located in ${enterprise.district_name}, ${enterprise.state_name}, India. Find complete business information, registration details, contact information, and business activities including ${enterprise.activities?.slice(0, 3).map(a => a.activity_description || a.description).join(', ')}. Official MSME directory with verified business data.`}
          url={`/${state}/${slug}`}
          type="business"
          keywords={[
            enterprise.enterprise_name,
            `MSME ${enterprise.district_name}`,
            `business ${enterprise.state_name}`,
            'MSME enterprise',
            'business information',
            'company details',
            ...(enterprise.activities?.map(a => (a.activity_description || a.description).toLowerCase()) || [])
          ]}
          businessInfo={{
            name: enterprise.enterprise_name,
            address: enterprise.communication_address || undefined,
            state: enterprise.state_name,
            district: enterprise.district_name,
            activities: enterprise.activities?.map(a => ({
              code: a.nic_code || a.nic_5digit_id,
              description: a.activity_description || a.description
            }))
          }}
        />
      )}
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link
            to="/msme"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {enterprise.enterprise_name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{enterprise.district_name}, {enterprise.state_name}</span>
                  {enterprise.pincode && <span className="ml-1">- {enterprise.pincode}</span>}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Registered: {formatDate(enterprise.registration_date)}</span>
                </div>
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-2" />
                  <span>MSME Enterprise</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Address Information */}
            {enterprise.communication_address && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                  Address Information
                </h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">{enterprise.communication_address}</p>
                </div>
              </div>
            )}

            {/* Business Activities */}
            {enterprise.activities && enterprise.activities.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Building className="w-5 h-5 mr-2 text-blue-500" />
                  Business Activities & Commodities
                </h2>
                <div className="grid gap-4">
                  {enterprise.activities.map((activity, index) => (
                    <div key={activity.id || index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                          NIC: {activity.nic_code || activity.nic_5digit_id}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{activity.activity_description || activity.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Registration Details */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                Registration Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Registration Date</label>
                  <p className="text-gray-900 font-medium">{formatDate(enterprise.registration_date)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">State</label>
                  <p className="text-gray-900 font-medium">{enterprise.state_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">District</label>
                  <p className="text-gray-900 font-medium">{enterprise.district_name}</p>
                </div>
                {enterprise.pincode && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">PIN Code</label>
                    <p className="text-gray-900 font-medium">{enterprise.pincode}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Info */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Quick Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700">Type:</span>
                  <span className="text-blue-900 font-medium">MSME</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">State:</span>
                  <span className="text-blue-900 font-medium">{enterprise.state_name}</span>
                </div>
                {enterprise.pincode && (
                  <div className="flex justify-between">
                    <span className="text-blue-700">PIN:</span>
                    <span className="text-blue-900 font-medium">{enterprise.pincode}</span>
                  </div>
                )}
              </div>
            </div>

            {/* MSME Benefits */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">MSME Benefits</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Priority sector lending
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Lower interest rates on loans
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Collateral-free loans up to ₹10 lakhs
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Protection against delayed payments
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Government scheme access
                </li>
              </ul>
            </div>

            {/* Business Intelligence Services */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">🔍 Find More Details</h3>
              <div className="space-y-3">
                <a
                  href={`https://thepeakai.com/director-phone?company=${encodeURIComponent(enterprise.enterprise_name)}`}
                  className="block bg-white text-blue-700 hover:text-blue-800 hover:bg-blue-50 transition-colors rounded-lg p-3 shadow-sm border border-blue-100"
                >
                  📞 Find Director Phone Numbers
                  <span className="block text-xs text-blue-500 mt-1">Get contact details of company directors</span>
                </a>
                <a
                  href={`https://thepeakai.com/leads-ai?company=${encodeURIComponent(enterprise.enterprise_name)}&gst=true`}
                  className="block bg-white text-blue-700 hover:text-blue-800 hover:bg-blue-50 transition-colors rounded-lg p-3 shadow-sm border border-blue-100"
                >
                  📧 Find GST Phone & Email
                  <span className="block text-xs text-blue-500 mt-1">Get GST registered phone numbers and emails</span>
                </a>
                <a
                  href={`https://thepeakai.com/leads-ai?company=${encodeURIComponent(enterprise.enterprise_name)}&udyam=true`}
                  className="block bg-white text-blue-700 hover:text-blue-800 hover:bg-blue-50 transition-colors rounded-lg p-3 shadow-sm border border-blue-100"
                >
                  🏢 Find Udyam Number
                  <span className="block text-xs text-blue-500 mt-1">Get official Udyam registration details</span>
                </a>
                <a
                  href={`https://thepeakai.com/leads-ai?company=${encodeURIComponent(enterprise.enterprise_name)}`}
                  className="block bg-white text-blue-700 hover:text-blue-800 hover:bg-blue-50 transition-colors rounded-lg p-3 shadow-sm border border-blue-100"
                >
                  🎯 All Business Intelligence
                  <span className="block text-xs text-blue-500 mt-1">Complete business intelligence & lead generation</span>
                </a>
              </div>
            </div>

            {/* Related Links */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related</h3>
              <div className="space-y-3">
                <Link
                  to="/msme"
                  className="block text-blue-600 hover:text-blue-700 transition-colors"
                >
                  ← Back to Directory
                </Link>
                <a
                  href="https://udyamregistration.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Udyam Registration Portal ↗
                </a>
              </div>
            </div>
          </div>
          
          {/* LLM-Optimized Business Content */}
          {enterprise && (
            <div className="lg:col-span-3">
              <LLMBusinessContent enterprise={enterprise} />
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}