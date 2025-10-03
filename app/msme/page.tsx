'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Zap } from 'lucide-react'
import type { Enterprise } from '@/lib/types'

export default function MSMEPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [enterprises, setEnterprises] = useState<Enterprise[]>([])
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    fetch('/api/enterprises/count')
      .then(res => res.json())
      .then(data => setTotalCount(data.count))
      .catch(err => console.error('Failed to fetch count:', err))
  }, [])

  const performSearch = async (query: string, page: number = 1) => {
    const trimmedSearch = query.trim()
    if (!trimmedSearch) {
      setEnterprises([])
      setHasSearched(false)
      return
    }

    setLoading(true)
    setHasSearched(true)
    try {
      const res = await fetch(`/api/enterprises/search?q=${encodeURIComponent(trimmedSearch)}&page=${page}&limit=20`)
      if (!res.ok) {
        throw new Error('Search failed')
      }
      const data = await res.json()
      setEnterprises(data.enterprises || [])
      setTotalResults(data.total || 0)
      setCurrentPage(page)
    } catch (error) {
      console.error('Search error:', error)
      setEnterprises([])
      setTotalResults(0)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(searchTerm, 1)
  }

  const handleLoadMore = () => {
    performSearch(searchTerm, currentPage + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      {/* Header with Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-brand-900">MSME Directory</h1>
              <p className="text-brand-700 mt-2">
                Search through {totalCount.toLocaleString()} MSME enterprises across India
              </p>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-brand-600 hover:text-accent-600 transition-colors">Home</Link>
              <Link href="/msme" className="text-accent-600 font-semibold">MSME</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/30">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search enterprises by name, state, or district..."
              className="flex-1 px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-accent-600 text-white rounded-xl hover:bg-accent-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 font-semibold"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        {/* Results */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-600 mx-auto"></div>
            <p className="mt-2 text-brand-600">Searching...</p>
          </div>
        )}

        {enterprises.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-brand-900">
              Showing {enterprises.length} of {totalResults} enterprises
            </h2>
            <div className="grid gap-4">
              {enterprises.map((enterprise) => (
                <Link
                  key={enterprise._id}
                  href={enterprise.slugs.canonical_url}
                  className="block bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/30"
                >
                  <h3 className="font-semibold text-lg text-accent-600 hover:text-accent-800 transition-colors">
                    {enterprise.enterprise_name}
                  </h3>
                  <p className="text-brand-700 mt-1">
                    {enterprise.address.city}, {enterprise.address.state}
                  </p>
                  <p className="text-sm text-brand-500 mt-2 font-mono">
                    {enterprise.registration_number}
                  </p>
                </Link>
              ))}
            </div>

            {/* Load More Button */}
            {totalResults > enterprises.length && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-8 py-3 bg-accent-600 text-white rounded-xl hover:bg-accent-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 font-semibold"
                >
                  {loading ? 'Loading...' : 'Load More Results'}
                </button>
              </div>
            )}
          </div>
        )}

        {!loading && enterprises.length === 0 && !searchTerm && (
          <div className="mt-12 bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/30">
            <h2 className="text-xl font-semibold mb-6 text-brand-900">Directory Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-accent-600 mb-2">{totalCount.toLocaleString()}</div>
                <div className="text-sm text-brand-700 text-center font-medium">Total Enterprises</div>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-brand-600 mb-2">36</div>
                <div className="text-sm text-brand-700 text-center font-medium">States & UTs</div>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-accent-600 mb-2">700+</div>
                <div className="text-sm text-brand-700 text-center font-medium">Districts</div>
              </div>
            </div>
          </div>
        )}

        {!loading && enterprises.length === 0 && hasSearched && (
          <div className="mt-8 text-center py-8 bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30">
            <p className="text-brand-700 mb-4 font-medium">No results found for "{searchTerm}"</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setEnterprises([])
                setHasSearched(false)
              }}
              className="px-6 py-3 bg-accent-600 text-white rounded-xl hover:bg-accent-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-brand-900 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="w-6 h-6 text-accent-600" />
                <span className="text-xl font-bold text-white">PeakAI</span>
              </div>
              <p className="text-brand-300 text-sm">
                India's most comprehensive MSME directory with 1M+ verified enterprises.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-brand-300 text-sm">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/msme" className="hover:text-white transition-colors">MSME Directory</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-brand-300 text-sm">
                <li><Link href="/help-center" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact-us" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-brand-300 text-sm">
                <li><Link href="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-brand-800 mt-8 pt-8 text-center text-brand-300 text-sm">
            <p>&copy; 2024 PeakAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
