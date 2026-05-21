import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Gear Lab - Independent Power Station Testing',
    template: '%s | Gear Lab',
  },
  description: 'Independent, hands-on reviews of portable power stations. We buy, test, and break things so you don\'t have to.',
  metadataBase: new URL('https://gearlab.space'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Gear Lab',
    locale: 'en_US',
    images: ['https://gearlab.space/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@GearLabReviews',
  },
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-4B8KM1P3FJ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-4B8KM1P3FJ');
        `}
      </Script>
      <body className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#f5f5f5] antialiased">
        <header className="border-b border-[#262626] bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-[#ff6b35] tracking-tight">
              Gear Lab
            </a>
            <nav className="flex gap-6 text-sm font-medium text-[#a3a3a3]">
              <a href="/" className="hover:text-[#ff6b35] transition-colors">Home</a>
              <a href="/blog/" className="hover:text-[#ff6b35] transition-colors">All Guides</a>
              <a href="/about/" className="hover:text-[#ff6b35] transition-colors">About</a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[#262626] bg-[#141414] mt-16">
          <div className="max-w-4xl mx-auto px-4 py-8 text-sm text-[#737373]">
            <p className="mb-2">&copy; {new Date().getFullYear()} Gear Lab. Independent Product Testing.</p>
            <p className="text-xs mb-4">
              This site contains affiliate links. We may earn a commission when you purchase through our links — at no extra cost to you.
            </p>
            <div className="flex gap-4 text-xs">
              <a href="/about/" className="hover:text-[#ff6b35]">About Us</a>
              <a href="https://twitter.com/GearLabReviews" className="hover:text-[#ff6b35]">Twitter</a>
              <span>hello@gearlab.space</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}