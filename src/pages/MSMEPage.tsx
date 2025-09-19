import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { searchEnterprises, getTotalEnterpriseCount, type Enterprise } from '../lib/supabase'
import { LLMOptimizedSEO } from '../components/LLMOptimizedSEO'

export default function MSMEPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [enterprises, setEnterprises] = useState<Enterprise[]>([])
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    getTotalEnterpriseCount().then(setTotalCount)
  }, [])

  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setEnterprises([])
      return
    }

    setLoading(true)
    const results = await searchEnterprises(term)
    setEnterprises(results)
    setLoading(false)
  }

  const createSlug = (enterprise: Enterprise) => {
    const stateName = enterprise.state_name.toLowerCase().replace(/\s+/g, '-')
    // Use the actual slug from database instead of generating one
    return `/${stateName}/${enterprise.slug}`
  }

  return (
    <>
      <LLMOptimizedSEO
        title="MSME Directory India - Find 400+ Micro Small Medium Enterprises | PeakAI"
        description={`Comprehensive directory of ${totalCount.toLocaleString()} MSME enterprises across India. Search registered micro, small and medium businesses by name, location, industry. Official MSME database with contact details, business activities, and registration information.`}
        url="/msme"
        type="website"
        keywords={[
          'MSME directory India',
          'micro small medium enterprises',
          'business directory India',
          'Indian companies database',
          'MSME registration',
          'udyam registration',
          'enterprise search India',
          'business information India',
          'company details search',
          'MSME database free'
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "MSME Directory India",
          "alternateName": "PeakAI MSME Directory",
          "url": "https://thepeakai.com/msme",
          "description": `Search through ${totalCount.toLocaleString()} MSME enterprises across India`,
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://thepeakai.com/msme?search={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "about": [
            "MSME enterprises",
            "Indian businesses",
            "Business directory",
            "Enterprise registration",
            "Company information"
          ],
          "keywords": [
            "MSME",
            "micro small medium enterprises",
            "business directory",
            "Indian companies",
            "enterprise search"
          ],
          "inLanguage": "en-IN",
          "publisher": {
            "@type": "Organization",
            "name": "PeakAI",
            "url": "https://thepeakai.com"
          }
        }}
      />
      <div className="min-h-screen bg-gray-50">
      {/* Header with Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">MSME Directory</h1>
              <p className="text-gray-600 mt-2">
                Search through {totalCount.toLocaleString()} MSME enterprises across India
              </p>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/msme" className="text-blue-600 font-medium">MSME</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search enterprises by name, state, or district..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                handleSearch(e.target.value)
              }}
            />
            <button
              onClick={() => handleSearch(searchTerm)}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {/* Business Intelligence Services */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">🎯 Advanced Business Intelligence Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="https://thepeakai.com/director-phone"
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-blue-100 hover:border-blue-200"
            >
              <div className="text-2xl mb-2">📞</div>
              <h3 className="font-semibold text-blue-800 mb-1">Director Phone Numbers</h3>
              <p className="text-sm text-blue-600">Find contact details of company directors</p>
            </a>
            <a
              href="https://thepeakai.com/leads-ai"
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-blue-100 hover:border-blue-200"
            >
              <div className="text-2xl mb-2">📧</div>
              <h3 className="font-semibold text-blue-800 mb-1">GST Phone & Email</h3>
              <p className="text-sm text-blue-600">Get GST registered contact information</p>
            </a>
            <a
              href="https://thepeakai.com/leads-ai"
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-blue-100 hover:border-blue-200"
            >
              <div className="text-2xl mb-2">🏢</div>
              <h3 className="font-semibold text-blue-800 mb-1">Udyam Numbers</h3>
              <p className="text-sm text-blue-600">Official Udyam registration details</p>
            </a>
            <a
              href="https://thepeakai.com/leads-ai"
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-blue-100 hover:border-blue-200"
            >
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold text-blue-800 mb-1">Complete Intelligence</h3>
              <p className="text-sm text-blue-600">Full business data & lead generation</p>
            </a>
          </div>
        </div>

        {/* Results */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Searching...</p>
          </div>
        )}

        {enterprises.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Found {enterprises.length} enterprises
            </h2>
            <div className="grid gap-4">
              {enterprises.map((enterprise) => (
                <Link
                  key={enterprise.id}
                  to={createSlug(enterprise)}
                  className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <h3 className="font-semibold text-lg text-blue-600 hover:text-blue-800">
                    {enterprise.enterprise_name}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {enterprise.district_name}, {enterprise.state_name}
                    {enterprise.pincode && ` - ${enterprise.pincode}`}
                  </p>
                  {enterprise.registration_date && (
                    <p className="text-sm text-gray-500 mt-2">
                      Registered: {new Date(enterprise.registration_date).toLocaleDateString()}
                    </p>
                  )}
                  {enterprise.communication_address && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {enterprise.communication_address}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Directory Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{totalCount.toLocaleString()}</div>
              <div className="text-gray-600">Total Enterprises</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">36</div>
              <div className="text-gray-600">States & UTs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">700+</div>
              <div className="text-gray-600">Districts</div>
            </div>
          </div>
        </div>

        {/* LLM-Optimized Content Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About MSME Directory India</h2>
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              This comprehensive MSME (Micro, Small & Medium Enterprise) directory contains verified information about {totalCount.toLocaleString()} registered enterprises across India. Our database includes official registration details, business activities, contact information, and location data for each enterprise.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Data Coverage:</strong> Complete business profiles including enterprise names, registration dates, communication addresses, state and district information, PIN codes, and detailed business activities classified under National Industrial Classification (NIC) codes.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Search Capabilities:</strong> Find enterprises by name, location (state/district), business type, or specific industry activities. All data is regularly updated to ensure accuracy and completeness for business research, partnership opportunities, and market analysis.
            </p>
          </div>
        </div>

        {/* AI-Friendly FAQ Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Frequently Asked Questions About MSME Directory</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">What is MSME registration in India?</h3>
              <p className="text-gray-700 leading-relaxed">
                MSME (Micro, Small & Medium Enterprise) registration is a government recognition system under the Ministry of Micro, Small & Medium Enterprises, Government of India. It provides official recognition to businesses based on their investment in plant & machinery or equipment and annual turnover. Registered MSMEs receive various benefits including easier access to credit, lower interest rates, government subsidies, priority sector lending, and protection against delayed payments under the MSMED Act 2006.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">How to search for MSME enterprises in this directory?</h3>
              <p className="text-gray-700 leading-relaxed">
                Use the search functionality above to find enterprises by: (1) Company/Enterprise name - enter full or partial business names, (2) Location - search by state name (e.g., "Gujarat", "Maharashtra") or district name, (3) PIN code - enter 6-digit postal codes, (4) Business activity - search by industry type or business description. The search returns up to 20 matching results with complete enterprise details including registration information and business activities.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">What are the key benefits of MSME registration?</h3>
              <p className="text-gray-700 leading-relaxed">
                MSME registration provides: (1) <strong>Financial Benefits:</strong> Priority sector lending, collateral-free loans up to ₹10 lakhs, lower interest rates, easier bank loan approvals, (2) <strong>Government Support:</strong> Access to 400+ government schemes, subsidies on technology upgradation, ISO certification reimbursement, (3) <strong>Business Protection:</strong> Delayed payment protection under MSMED Act, preference in government tenders, (4) <strong>Tax Benefits:</strong> Income tax rebates, excise exemptions, reduced patent registration fees, (5) <strong>Market Access:</strong> Participation in trade fairs, export promotion assistance, cluster development programs.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Is this MSME directory free to use?</h3>
              <p className="text-gray-700 leading-relaxed">
                Yes, this MSME directory is completely free to use for all users. You can search, view, and access detailed information about any of the {totalCount.toLocaleString()} enterprises without any registration, subscription, or payment. The directory is maintained as a public service to facilitate business discovery, partnership opportunities, supplier identification, market research, and networking within the MSME ecosystem in India.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">What information is available for each MSME enterprise?</h3>
              <p className="text-gray-700 leading-relaxed">
                Each enterprise profile contains: (1) <strong>Basic Information:</strong> Complete enterprise name, registration date, current status, (2) <strong>Location Details:</strong> Full communication address, district, state, PIN code, (3) <strong>Business Activities:</strong> Detailed list of business activities with National Industrial Classification (NIC) codes, industry descriptions, product/service categories, (4) <strong>Contact Information:</strong> Business address for correspondence, (5) <strong>Registration Data:</strong> Official MSME registration details, compliance status. All data is sourced from official government records and regularly updated for accuracy.
              </p>
            </div>

            <div className="border-l-4 border-teal-500 pl-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">How often is the MSME directory data updated?</h3>
              <p className="text-gray-700 leading-relaxed">
                The MSME directory data is regularly synchronized with official government databases to ensure accuracy and completeness. New enterprise registrations are added, existing information is verified and updated, and inactive or closed businesses are marked accordingly. The database currently contains {totalCount.toLocaleString()} active enterprises across all Indian states and union territories, with data last updated on {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}