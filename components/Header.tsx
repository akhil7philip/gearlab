import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-border bg-bg-primary shadow-nav">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-text-primary tracking-tight">
          Gear Lab
        </a>
        <nav className="flex gap-6 text-sm font-medium text-text-muted">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <Link href="/blog/" className="hover:text-accent transition-colors">Guides</Link>
          <Link href="/about/" className="hover:text-accent transition-colors">About</Link>
          <Link href="/contact/" className="hover:text-accent transition-colors">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
