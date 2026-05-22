import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Gear Lab privacy policy — how we collect, use, and protect your personal information.',
  alternates: {
    canonical: '/privacy/',
  },
  robots: 'index, follow',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight mb-4">
        Privacy Policy
      </h1>
      <p className="text-text-muted text-sm mb-8">
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <div className="prose prose-lg max-w-none">
        <p className="text-text-secondary">
          Gear Lab (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-text-secondary">
          We may collect personal information that you voluntarily provide to us when you:
        </p>
        <ul>
          <li>Subscribe to our newsletter</li>
          <li>Contact us via email</li>
          <li>Leave comments or feedback</li>
          <li>Participate in surveys or promotions</li>
        </ul>
        <p className="text-text-secondary">
          The personal information we collect may include your name, email address, and any other information you choose to provide.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">2. Automatically Collected Information</h2>
        <p className="text-text-secondary">
          When you visit our website, we automatically collect certain information about your device and usage, including:
        </p>
        <ul>
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Pages visited and time spent</li>
          <li>Referring website or search terms</li>
        </ul>
        <p className="text-text-secondary">
          We use Google Analytics 4 to collect this information. You can learn more about Google&apos;s data practices in the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover">Google Privacy Policy</a>.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">3. Cookies and Tracking Technologies</h2>
        <p className="text-text-secondary">
          We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
        </p>
        <p className="text-text-secondary">
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">4. How We Use Your Information</h2>
        <p className="text-text-secondary">
          We use the information we collect to:
        </p>
        <ul>
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>Communicate with you, including for customer service and marketing purposes</li>
          <li>Send you emails and newsletters</li>
          <li>Find and prevent fraud</li>
        </ul>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">5. Affiliate Disclosure</h2>
        <p className="text-text-secondary">
          Gear Lab participates in affiliate marketing programs, including the Amazon Associates Program. When you click on an affiliate link and make a purchase, we may earn a commission at no additional cost to you.
        </p>
        <p className="text-text-secondary">
          Affiliate links may use tracking cookies to attribute sales to our website. These cookies typically expire after a set period (e.g., 24 hours for Amazon). For more information about how Amazon handles affiliate data, please see the <a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=468496" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover">Amazon Privacy Notice</a>.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">6. Third-Party Services</h2>
        <p className="text-text-secondary">
          We may share your information with third-party service providers who perform services on our behalf, such as:
        </p>
        <ul>
          <li>Google Analytics (website analytics)</li>
          <li>Cloudflare (CDN and security)</li>
          <li>Vercel (hosting)</li>
        </ul>
        <p className="text-text-secondary">
          These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">7. Data Security</h2>
        <p className="text-text-secondary">
          We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">8. Your Rights</h2>
        <p className="text-text-secondary">
          Depending on your location, you may have the following rights regarding your personal information:
        </p>
        <ul>
          <li>The right to access your personal information</li>
          <li>The right to correct inaccurate information</li>
          <li>The right to delete your personal information</li>
          <li>The right to restrict or object to processing</li>
          <li>The right to data portability</li>
          <li>The right to withdraw consent</li>
        </ul>
        <p className="text-text-secondary">
          To exercise these rights, please contact us at <a href="mailto:hello@gearlab.space" className="text-accent hover:text-accent-hover">hello@gearlab.space</a>.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">9. Children&apos;s Privacy</h2>
        <p className="text-text-secondary">
          Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">10. Changes to This Privacy Policy</h2>
        <p className="text-text-secondary">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
        </p>
        <p className="text-text-secondary">
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </p>

        <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">11. Contact Us</h2>
        <p className="text-text-secondary">
          If you have any questions about this Privacy Policy, please contact us:
        </p>
        <ul>
          <li>By email: <a href="mailto:hello@gearlab.space" className="text-accent hover:text-accent-hover">hello@gearlab.space</a></li>
          <li>By visiting our <a href="/contact/" className="text-accent hover:text-accent-hover">Contact Page</a></li>
        </ul>
      </div>
    </div>
  )
}