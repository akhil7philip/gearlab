import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Gear Lab — rules and guidelines for using our website.',
  alternates: {
    canonical: '/terms/',
  },
  robots: 'index, follow',
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight mb-4">
        Terms of Service
      </h1>
      <p className="text-text-muted text-sm mb-8">
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <div className="prose prose-lg max-w-none">
        <p className="text-text-secondary">
          Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Gear Lab website.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="text-text-secondary">
          By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the website.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">2. Use of Our Website</h2>
        <p className="text-text-secondary">
          Gear Lab grants you a limited, non-exclusive, non-transferable license to access and use our website for personal, non-commercial purposes. You agree not to:
        </p>
        <ul>
          <li>Use the website in any way that violates applicable laws or regulations</li>
          <li>Attempt to interfere with the proper working of the website</li>
          <li>Access or collect data from the website using automated means without permission</li>
          <li>Use the website to distribute spam, malware, or other harmful content</li>
          <li>Impersonate any person or entity</li>
        </ul>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">3. Intellectual Property</h2>
        <p className="text-text-secondary">
          All content on Gear Lab, including text, graphics, logos, images, and software, is the property of Gear Lab or its content suppliers and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from our content without our express written permission.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">4. Product Reviews and Recommendations</h2>
        <p className="text-text-secondary">
          Our product reviews and recommendations are based on our own research, testing, and analysis. We strive to provide accurate and unbiased information, but we make no warranties about the completeness, reliability, or accuracy of this information.
        </p>
        <p className="text-text-secondary">
          Any reliance you place on our reviews is strictly at your own risk. We recommend that you conduct your own research and due diligence before making any purchase.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">5. Affiliate Links</h2>
        <p className="text-text-secondary">
          Gear Lab participates in affiliate marketing programs. This means we may earn a commission when you click on certain links and make a purchase. This comes at no additional cost to you.
        </p>
        <p className="text-text-secondary">
          We only recommend products we genuinely believe in. Our affiliate relationships do not influence our editorial content or product recommendations.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">6. Disclaimer of Warranties</h2>
        <p className="text-text-secondary">
          Our website and its content are provided on an "as is" and "as available" basis. Gear Lab makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or its content.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">7. Limitation of Liability</h2>
        <p className="text-text-secondary">
          In no event shall Gear Lab, its owners, or contributors be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the website.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">8. External Links</h2>
        <p className="text-text-secondary">
          Our website may contain links to third-party websites. We have no control over the content or practices of these websites and accept no responsibility for them.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">9. Changes to These Terms</h2>
        <p className="text-text-secondary">
          We reserve the right to modify or replace these Terms at any time. We will provide notice of significant changes by posting the new Terms on this page. Your continued use of the website after any changes constitutes acceptance of the new Terms.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">10. Governing Law</h2>
        <p className="text-text-secondary">
          These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Gear Lab operates, without regard to its conflict of law provisions.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">11. Contact Us</h2>
        <p className="text-text-secondary">
          If you have any questions about these Terms, please contact us:
        </p>
        <ul>
          <li>By email: <a href="mailto:hello@gearlab.space" className="text-accent hover:text-accent-hover">hello@gearlab.space</a></li>
          <li>By visiting our <a href="/contact/" className="text-accent hover:text-accent-hover">Contact Page</a></li>
        </ul>
      </div>
    </div>
  )
}