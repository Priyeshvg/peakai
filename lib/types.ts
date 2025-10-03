export interface Enterprise {
  _id: string
  registration_number: string
  enterprise_name: string
  enterprise_name_lower: string

  dates: {
    commencement: string
    incorporation: string
    registration: string
  }

  classification: {
    major_activity: string
    organisation_type: string
    social_category: string
    gender: string
  }

  address: {
    city: string
    city_normalized: string
    city_slug: string
    state: string
    state_code: string
    state_slug: string
    district: string
    pin: string
  }

  contact: {
    mobile: string
    email: string
  }

  slugs: {
    primary: string
    canonical_url: string
  }

  seo: {
    title: string
    description: string
    keywords: string[]
    priority: number
    changefreq: string
    last_modified?: string
  }

  indexing?: {
    submitted_to_google: boolean
    batch_number: number | null
    submission_date: Date | null
    priority: number
    state_rank?: number
  }
}

export interface SearchResult {
  enterprises: Enterprise[]
  total: number
  page: number
  limit: number
}
