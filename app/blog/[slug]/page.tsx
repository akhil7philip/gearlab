import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, markdownToHtml } from '@/lib/posts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    robots: post.noindex ? 'noindex, nofollow' : post.robots,
    alternates: {
      canonical: post.canonicalUrl || `/blog/${slug}/`,
    },
    openGraph: {
      title: post.ogTitle || post.title,
      description: post.ogDescription || post.excerpt,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.lastModified || post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.ogImage ? [{ url: post.ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.ogTitle || post.title,
      description: post.ogDescription || post.excerpt,
      images: post.ogImage ? [post.ogImage] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const contentHtml = await markdownToHtml(post.content)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
      url: post.authorSocial ? `https://twitter.com/${post.authorSocial.replace('@', '')}` : undefined,
    },
    datePublished: post.date,
    dateModified: post.lastModified || post.date,
    publisher: {
      '@type': 'Organization',
      name: 'Gear Lab',
      logo: {
        '@type': 'ImageObject',
        url: 'https://gearlab.space/favicon.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://gearlab.space/blog/${slug}/`,
    },
    ...(post.coverImage && {
      image: {
        '@type': 'ImageObject',
        url: post.coverImage,
      },
    }),
    keywords: post.keywords?.join(', ') || post.tags.join(', '),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://gearlab.space/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: 'https://gearlab.space/blog/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://gearlab.space/blog/${slug}/`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumbs - uses CSS variables */}
        <nav className="text-sm text-text-muted mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
            <li className="text-text-muted">/</li>
            <li><a href="/blog/" className="hover:text-accent transition-colors">Guides</a></li>
            <li className="text-text-muted">/</li>
            <li className="text-text-secondary font-medium">{post.title}</li>
          </ol>
        </nav>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-card">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.lastModified && post.lastModified !== post.date && (
              <>
                <span className="text-text-muted">·</span>
                <span className="text-warning">Updated {new Date(post.lastModified).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'short', day: 'numeric'
                })}</span>
              </>
            )}
            <span className="text-text-muted">·</span>
            <span className="text-accent font-medium">{post.author}</span>
            {post.category && (
              <>
                <span className="text-text-muted">·</span>
                <span className="text-accent font-medium">{post.category}</span>
              </>
            )}
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content - uses .prose styles from globals.css */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Affiliate Disclosure */}
        <div className="affiliate-disclosure">
          <strong className="text-text-primary">Affiliate Disclosure:</strong> Gear Lab is reader-supported. When you buy through links on our site, we may earn an affiliate commission at no extra cost to you. We independently research and test products. Our opinions are our own.
        </div>

        {/* Author Bio */}
        {post.author && post.authorBio && (
          <div className="author-bio">
            <div className="avatar">
              {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="text-text-primary font-semibold">{post.author}</p>
              <p className="text-text-secondary text-sm mt-1">{post.authorBio}</p>
              {post.authorSocial && (
                <a href={`https://twitter.com/${post.authorSocial.replace('@', '')}`} className="text-accent text-sm hover:underline mt-2 inline-block">
                  {post.authorSocial}
                </a>
              )}
            </div>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="newsletter-cta">
          <h3>⚡ Get power station deals before they sell out</h3>
          <p>We track prices daily. When the Anker C1000 drops to $470, you'll be the first to know.</p>
          <form className="flex gap-3" onSubmit={(e) => { e.preventDefault(); alert('Newsletter signup coming soon!'); }}>
            <input type="email" placeholder="your@email.com" required />
            <button type="submit">Subscribe</button>
          </form>
          <p className="text-xs mt-3 text-text-muted">No spam. Unsubscribe anytime.</p>
        </div>
      </article>
    </>
  )
}
