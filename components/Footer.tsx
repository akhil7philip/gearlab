import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8 text-sm text-text-muted">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-bold text-text-primary mb-2">Gear Lab</p>
            <p className="text-xs">Independent reviews and buying guides for portable power stations and outdoor gear.</p>
          </div>
          <div>
            <p className="font-bold text-text-primary mb-2">Quick Links</p>
            <div className="flex flex-col gap-1 text-xs">
              <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              <Link href="/blog/" className="hover:text-accent transition-colors">Guides</Link>
              <Link href="/about/" className="hover:text-accent transition-colors">About</Link>
              <Link href="/contact/" className="hover:text-accent transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <p className="font-bold text-text-primary mb-2">Legal</p>
            <div className="flex flex-col gap-1 text-xs">
              <Link href="/privacy/" className="hover:text-accent transition-colors">Privacy Policy</Link>
              <Link href="/terms/" className="hover:text-accent transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <p>&copy; {new Date().getFullYear()} Gear Lab. All rights reserved.</p>
          <p className="text-xs">
            This site contains affiliate links. We may earn a commission when you purchase through our links.
          </p>
        </div>
      </div>
    </footer>
  )
}
