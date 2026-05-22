import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Gear Lab for questions, feedback, partnerships, or media inquiries.',
  alternates: {
    canonical: '/contact/',
  },
}

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight mb-4">
        Contact Us
      </h1>
      <p className="text-text-secondary mb-8">
        Have a question, suggestion, or partnership idea? We&apos;d love to hear from you.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-bg-secondary border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-text-primary mb-2">General Inquiries</h2>
          <p className="text-text-secondary text-sm mb-4">
            For questions about our reviews, recommendations, or site feedback.
          </p>
          <a
            href="mailto:hello@gearlab.space"
            className="text-accent hover:text-accent-hover font-medium"
          >
            hello@gearlab.space
          </a>
        </div>

        <div className="bg-bg-secondary border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-text-primary mb-2">Partnerships</h2>
          <p className="text-text-secondary text-sm mb-4">
            For brand collaborations, product testing requests, or affiliate partnerships.
          </p>
          <a
            href="mailto:partners@gearlab.space"
            className="text-accent hover:text-accent-hover font-medium"
          >
            partners@gearlab.space
          </a>
        </div>

        <div className="bg-bg-secondary border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-text-primary mb-2">Media</h2>
          <p className="text-text-secondary text-sm mb-4">
            For press inquiries, interview requests, or media kit requests.
          </p>
          <a
            href="mailto:media@gearlab.space"
            className="text-accent hover:text-accent-hover font-medium"
          >
            media@gearlab.space
          </a>
        </div>

        <div className="bg-bg-secondary border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-text-primary mb-2">Social</h2>
          <p className="text-text-secondary text-sm mb-4">
            Follow us for daily deals, behind-the-scenes testing, and quick tips.
          </p>
          <a
            href="https://twitter.com/GearLabReviews"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover font-medium"
          >
            @GearLabReviews on X/Twitter
          </a>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="text-xl font-bold text-text-primary mb-4">Response Time</h2>
        <p className="text-text-secondary">
          We aim to respond to all inquiries within 48 hours during weekdays. For urgent
          partnership or media requests, please mention &quot;URGENT&quot; in your subject line.
        </p>
      </div>
    </div>
  )
}
