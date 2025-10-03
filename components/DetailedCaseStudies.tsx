import React, { useState } from 'react';
import { Star, TrendingUp, Clock, Users, ArrowRight, Building, Phone, Target, CheckCircle } from 'lucide-react';

interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  logo: string;
  challenge: string;
  solution: string;
  results: {
    timesSaved: string;
    costReduction: string;
    accuracyImprovement: string;
    additionalMetric?: string;
  };
  testimonial: {
    quote: string;
    author: string;
    position: string;
    avatar: string;
  };
  metrics: {
    contactsFound: number;
    conversionRate: string;
    teamSize: number;
  };
}

const caseStudies: CaseStudy[] = [
  {
    id: 'local-narratives',
    company: 'Local Narratives',
    industry: 'Marketing Agency',
    logo: 'LN',
    challenge: 'Sales team was spending 15+ hours weekly manually searching for prospect contact information, leading to missed opportunities and reduced productivity.',
    solution: 'Implemented PeakAI Chrome extension across their 5-person sales team, integrated into their daily LinkedIn prospecting workflow.',
    results: {
      timesSaved: '15 hours/week',
      costReduction: '₹75,000/month',
      accuracyImprovement: '91% vs 40% before',
      additionalMetric: '3x faster deal closure'
    },
    testimonial: {
      quote: "PeakAI transformed our prospecting process completely. What used to take our team 15 hours weekly now takes just 2 hours. The accuracy is incredible - 9 out of 10 numbers are perfect, and we're closing deals 3x faster.",
      author: 'Vaishnavi Sharma',
      position: 'Head of Sales',
      avatar: 'V'
    },
    metrics: {
      contactsFound: 2500,
      conversionRate: '23%',
      teamSize: 5
    }
  },
  {
    id: 'bharatx',
    company: 'BharatX',
    industry: 'Fintech Startup',
    logo: 'BX',
    challenge: 'Recruiting top talent in competitive fintech market. Losing candidates to faster competitors who could reach prospects first.',
    solution: 'Used PeakAI to identify and contact passive candidates on LinkedIn, reaching them before competitors could make offers.',
    results: {
      timesSaved: '20 hours/week',
      costReduction: '60% vs recruiting agencies',
      accuracyImprovement: '91% contact success',
      additionalMetric: '50% faster hiring'
    },
    testimonial: {
      quote: "In fintech, talent moves fast. PeakAI helps us reach top candidates before competitors do. We've reduced our hiring time by 50% and cut recruiting costs by 60% compared to agencies.",
      author: 'Mehul Jindal',
      position: 'Founder & CEO',
      avatar: 'M'
    },
    metrics: {
      contactsFound: 800,
      conversionRate: '35%',
      teamSize: 3
    }
  },
  {
    id: 'tophire',
    company: 'Tophire',
    industry: 'Recruitment Agency',
    logo: 'TH',
    challenge: 'Struggling to connect with passive candidates quickly, losing top talent to competitors who reached them first.',
    solution: 'Integrated PeakAI into their recruitment workflow to instantly find contact details of LinkedIn candidates.',
    results: {
      timesSaved: '12 hours/week',
      costReduction: '45% vs traditional methods',
      accuracyImprovement: '91% contact success',
      additionalMetric: '60% faster placements'
    },
    testimonial: {
      quote: "PeakAI has revolutionized our recruitment process. We can now reach passive candidates instantly instead of waiting days for responses. Our placement speed increased by 60%.",
      author: 'Recruitment Team',
      position: 'Founder',
      avatar: 'T'
    },
    metrics: {
      contactsFound: 1200,
      conversionRate: '28%',
      teamSize: 4
    }
  },
  {
    id: 'dice-tech',
    company: 'Dice.tech',
    industry: 'Tech Consulting',
    logo: 'DT',
    challenge: 'Sales team needed to quickly connect with decision makers at enterprise clients, but LinkedIn InMail had low response rates.',
    solution: 'Used PeakAI to find direct phone numbers and reach prospects via calls, improving connection rates significantly.',
    results: {
      timesSaved: '18 hours/week',
      costReduction: '₹50,000/month',
      accuracyImprovement: '91% vs 25% InMail',
      additionalMetric: '4x higher response rate'
    },
    testimonial: {
      quote: "Phone calls convert 4x better than InMail for us. PeakAI helps us get those phone numbers quickly and accurately. Our sales pipeline has never been stronger.",
      author: 'Sales Team',
      position: 'Head of Sales',
      avatar: 'D'
    },
    metrics: {
      contactsFound: 1800,
      conversionRate: '31%',
      teamSize: 6
    }
  },
  {
    id: 'growth-agency',
    company: 'Growth Agency',
    industry: 'Digital Marketing',
    logo: 'GA',
    challenge: 'Agency needed to reach multiple stakeholders at client companies but struggled with finding reliable contact information.',
    solution: 'Implemented PeakAI across their client acquisition team to identify and contact key decision makers.',
    results: {
      timesSaved: '25 hours/week',
      costReduction: '₹1,00,000/month',
      accuracyImprovement: '91% vs 35% before',
      additionalMetric: '5x faster client onboarding'
    },
    testimonial: {
      quote: "We needed to connect with CMOs, CTOs, and founders quickly. PeakAI made it possible to reach the right people at the right time. Our client acquisition speed increased by 5x.",
      author: 'Team Lead',
      position: 'Business Development',
      avatar: 'G'
    },
    metrics: {
      contactsFound: 3200,
      conversionRate: '26%',
      teamSize: 8
    }
  }
];

export function DetailedCaseStudies() {
  const [selectedCase, setSelectedCase] = useState<string>(caseStudies[0].id);
  const activeCase = caseStudies.find(c => c.id === selectedCase) || caseStudies[0];

  return (
    <div className="bg-white/40 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 overflow-hidden">
      {/* Header */}
      <div className="p-8 border-b border-brand-200/50">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-accent-600 rounded-full flex items-center justify-center mr-4">
            <Building className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-brand-900">Customer Success Stories</h3>
            <p className="text-brand-700">Real results from companies using PeakAI</p>
          </div>
        </div>

        {/* Company Selection Tabs */}
        <div className="flex flex-wrap gap-2">
          {caseStudies.map((study) => (
            <button
              key={study.id}
              onClick={() => setSelectedCase(study.id)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                selectedCase === study.id
                  ? 'bg-accent-600 text-white shadow-lg'
                  : 'bg-white/50 text-brand-700 hover:bg-white/80'
              }`}
            >
              {study.company}
            </button>
          ))}
        </div>
      </div>

      {/* Case Study Content */}
      <div className="p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Story */}
          <div>
            {/* Company Header */}
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">{activeCase.logo}</span>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-brand-900">{activeCase.company}</h4>
                <p className="text-brand-700">{activeCase.industry}</p>
              </div>
            </div>

            {/* Challenge */}
            <div className="mb-6">
              <h5 className="text-lg font-semibold text-brand-900 mb-3 flex items-center">
                <Target className="w-5 h-5 text-brand-700 mr-2" />
                Challenge
              </h5>
              <p className="text-brand-700 leading-relaxed">{activeCase.challenge}</p>
            </div>

            {/* Solution */}
            <div className="mb-6">
              <h5 className="text-lg font-semibold text-brand-900 mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 text-accent-600 mr-2" />
                Solution
              </h5>
              <p className="text-brand-700 leading-relaxed">{activeCase.solution}</p>
            </div>

            {/* Testimonial */}
            <div className="bg-accent-50 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-brand-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-brand-700 text-lg leading-relaxed mb-4">
                "{activeCase.testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">{activeCase.testimonial.avatar}</span>
                </div>
                <div>
                  <p className="font-semibold text-brand-900">{activeCase.testimonial.author}</p>
                  <p className="text-brand-700">{activeCase.testimonial.position}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Metrics & Results */}
          <div>
            {/* Key Metrics */}
            <div className="bg-accent-50 rounded-2xl p-6 mb-6">
              <h5 className="text-lg font-semibold text-brand-900 mb-4">Key Metrics</h5>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-600">{activeCase.metrics.contactsFound.toLocaleString()}</div>
                  <div className="text-sm text-brand-700">Contacts Found</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-600">{activeCase.metrics.conversionRate}</div>
                  <div className="text-sm text-brand-700">Conversion Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-600">{activeCase.metrics.teamSize}</div>
                  <div className="text-sm text-brand-700">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-600">91%</div>
                  <div className="text-sm text-brand-700">Accuracy Rate</div>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/50 rounded-xl p-4 text-center">
                <Clock className="w-8 h-8 text-accent-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-brand-900">{activeCase.results.timesSaved}</div>
                <div className="text-sm text-brand-700">Time Saved</div>
              </div>

              <div className="bg-white/50 rounded-xl p-4 text-center">
                <TrendingUp className="w-8 h-8 text-accent-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-brand-900">{activeCase.results.costReduction}</div>
                <div className="text-sm text-brand-700">Cost Saved</div>
              </div>

              <div className="bg-white/50 rounded-xl p-4 text-center">
                <Phone className="w-8 h-8 text-accent-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-brand-900">{activeCase.results.accuracyImprovement}</div>
                <div className="text-sm text-brand-700">Accuracy</div>
              </div>

              <div className="bg-white/50 rounded-xl p-4 text-center">
                <Users className="w-8 h-8 text-accent-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-brand-900">{activeCase.results.additionalMetric}</div>
                <div className="text-sm text-brand-700">Improvement</div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-accent-600 rounded-2xl p-6 text-center">
              <h5 className="text-lg font-semibold text-white mb-3">
                Ready to achieve similar results?
              </h5>
              <a
                href="https://chromewebstore.google.com/detail/jndeeioopbcflpclpfnflmekcddknoph?utm_source=item-share-cb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white text-accent-600 px-6 py-3 rounded-xl hover:bg-brand-50 transition-all duration-200 font-semibold"
              >
                <span>Start Your Success Story</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}