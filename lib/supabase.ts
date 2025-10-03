import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing Supabase environment variables - using demo mode')
}

// Use placeholder values if not configured
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key'
)

export interface Blog {
  id: number
  title: string
  slug: string
  content: string
  meta_description: string | null
  category: string | null
  keywords: string[] | null
  status: string
  featured: boolean
  author: string | null
  reading_time: number | null
  views: number
  featured_image: string | null
  created_at: string
  updated_at: string
}

export interface Enterprise {
  id: number
  enterprise_name: string
  slug: string
  state_name: string
  district_name: string
  pincode: number | null
  registration_date: string | null
  communication_address: string | null
  created_at: string
}

export async function getBlogs(limit?: number, category?: string) {
  let query = supabase
    .from('blogs')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (category && category !== 'General') {
    query = query.eq('category', category)
  }

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching blogs:', error)
    return []
  }

  return data as Blog[]
}

export async function getBlogBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching blog:', error)
    return null
  }

  // Increment views
  await supabase
    .from('blogs')
    .update({ views: data.views + 1 })
    .eq('id', data.id)

  return data as Blog
}

export async function getBlogCategories() {
  const { data, error } = await supabase
    .from('blogs')
    .select('category')
    .eq('status', 'published')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  // Count categories
  const categoryCounts: { [key: string]: number } = {}
  data.forEach(blog => {
    if (blog.category) {
      categoryCounts[blog.category] = (categoryCounts[blog.category] || 0) + 1
    }
  })

  // Convert to array and sort by count
  return Object.entries(categoryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export async function searchEnterprises(searchTerm: string, limit = 20) {
  let query = supabase
    .from('enterprises')
    .select('*')
    .order('enterprise_name', { ascending: true })
  
  if (searchTerm) {
    query = query.or(`enterprise_name.ilike.%${searchTerm}%,district_name.ilike.%${searchTerm}%,state_name.ilike.%${searchTerm}%`)
  }
  
  query = query.limit(limit)
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error searching enterprises:', error)
    return []
  }
  
  return data as Enterprise[]
}

export async function getTotalEnterpriseCount() {
  const { count, error } = await supabase
    .from('enterprises')
    .select('*', { count: 'exact', head: true })
  
  if (error) {
    console.error('Error getting enterprise count:', error)
    return 0
  }
  
  return count || 0
}

export async function getEnterpriseBySlug(stateName: string, slug: string) {
  // Normalize state name to proper case
  const normalizedStateName = stateName
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
  
  const { data, error } = await supabase
    .from('enterprises')
    .select('*')
    .eq('state_name', normalizedStateName)
    .eq('slug', slug)
    .single()
  
  if (error) {
    console.error('Error fetching enterprise:', error)
    return null
  }
  
  return data as Enterprise
}
