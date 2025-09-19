import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { PricingPage } from './pages/PricingPage';
import { LeadsAiPage } from './pages/LeadsAiPage';
import { DirectorPhonePage } from './pages/DirectorPhonePage';
import { PartnersPage } from './pages/PartnersPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { UnlimitedEmailPage } from './pages/UnlimitedEmailPage';
import { PartnerProgramPage } from './pages/PartnerProgramPage';
import MSMEPage from './pages/MSMEPage';
import EnterpriseDetailPage from './pages/EnterpriseDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* MSME Routes (without Layout for full-page experience) */}
        <Route path="/msme" element={<MSMEPage />} />
        <Route path="/:state/:slug" element={<EnterpriseDetailPage />} />
        
        {/* Main site routes (with Layout) */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/features" element={<Layout><FeaturesPage /></Layout>} />
        <Route path="/pricing" element={<Layout><PricingPage /></Layout>} />
        <Route path="/leads-ai" element={<Layout><LeadsAiPage /></Layout>} />
        <Route path="/director-phone" element={<Layout><DirectorPhonePage /></Layout>} />
        <Route path="/partners" element={<Layout><PartnersPage /></Layout>} />
        <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
        <Route path="/blog/:slug" element={<Layout><BlogPostPage /></Layout>} />
        <Route path="/privacy-policy" element={<Layout><PrivacyPolicyPage /></Layout>} />
        <Route path="/terms-of-service" element={<Layout><TermsOfServicePage /></Layout>} />
        <Route path="/help-center" element={<Layout><HelpCenterPage /></Layout>} />
        <Route path="/about-us" element={<Layout><AboutPage /></Layout>} />
        <Route path="/contact-us" element={<Layout><ContactPage /></Layout>} />
        <Route path="/unlimited-email" element={<Layout><UnlimitedEmailPage /></Layout>} />
        <Route path="/partner-program" element={<Layout><PartnerProgramPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;