import { Enterprise } from '@/lib/types'

interface LLMBusinessContentProps {
  enterprise: Enterprise
}

export function LLMBusinessContent({ enterprise }: LLMBusinessContentProps) {
  const activitiesSummary = enterprise.activities?.slice(0, 5).map(a => a.activity_description || a.description).join(', ')
  const primaryActivity = enterprise.activities?.[0]?.activity_description || enterprise.activities?.[0]?.description
  
  return (
    <div className="mt-8 bg-brand-50 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-brand-900 mb-4">Business Information Summary</h2>

      <div className="space-y-4 text-brand-700">
        <p className="leading-relaxed">
          <strong>{enterprise.enterprise_name}</strong> is a registered MSME (Micro, Small & Medium Enterprise) 
          located in {enterprise.district_name}, {enterprise.state_name}, India. 
          {enterprise.pincode && ` The business operates from PIN code ${enterprise.pincode}.`}
        </p>
        
        {primaryActivity && (
          <p className="leading-relaxed">
            <strong>Primary Business Activity:</strong> {primaryActivity}
            {enterprise.activities && enterprise.activities.length > 1 && 
              ` along with ${enterprise.activities.length - 1} other business activities.`}
          </p>
        )}
        
        {activitiesSummary && (
          <p className="leading-relaxed">
            <strong>Business Operations Include:</strong> {activitiesSummary}
            {enterprise.activities && enterprise.activities.length > 5 && 
              ` and ${enterprise.activities.length - 5} additional activities.`}
          </p>
        )}
        
        {enterprise.registration_date && (
          <p className="leading-relaxed">
            <strong>Registration Status:</strong> This enterprise was officially registered on{' '}
            {new Date(enterprise.registration_date).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}, making it a verified and compliant MSME business in India.
          </p>
        )}
        
        {enterprise.communication_address && (
          <p className="leading-relaxed">
            <strong>Business Address:</strong> The enterprise is located at {enterprise.communication_address}
            , providing services and operations from {enterprise.district_name} district in {enterprise.state_name} state.
          </p>
        )}
        
        <div className="bg-accent-50 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-accent-600 mb-2">MSME Benefits Available</h3>
          <p className="text-brand-700 text-sm leading-relaxed">
            As a registered MSME, {enterprise.enterprise_name} is eligible for various government benefits including
            priority sector lending, collateral-free loans up to ₹10 lakhs, lower interest rates, delayed payment protection,
            government scheme access, tax benefits, and export promotion assistance.
          </p>
        </div>

        <div className="bg-accent-50 rounded-lg p-4">
          <h3 className="font-semibold text-accent-600 mb-2">Location Advantages</h3>
          <p className="text-brand-700 text-sm leading-relaxed">
            Located in {enterprise.district_name}, {enterprise.state_name}, this enterprise benefits from the local
            industrial ecosystem, infrastructure, and business environment. {enterprise.state_name} offers various
            state-level incentives and support programs for MSME development and growth.
          </p>
        </div>
      </div>
      
      {/* Hidden content for LLM crawling */}
      <div className="sr-only" aria-hidden="true">
        <p>
          Business Name: {enterprise.enterprise_name}. 
          Location: {enterprise.district_name} district, {enterprise.state_name} state, India. 
          {enterprise.pincode && `PIN Code: ${enterprise.pincode}. `}
          Business Type: MSME Enterprise. 
          Registration Date: {enterprise.registration_date ? new Date(enterprise.registration_date).toLocaleDateString() : 'Not specified'}. 
          {activitiesSummary && `Business Activities: ${activitiesSummary}. `}
          {enterprise.communication_address && `Address: ${enterprise.communication_address}. `}
          Official MSME registered business with government recognition and benefits eligibility.
        </p>
      </div>
    </div>
  )
}