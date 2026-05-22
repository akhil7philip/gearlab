import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight mb-8">
        All Guides
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group card hover:border-accent transition-all"
          >
            <Link href={`/blog/${post.slug}/`}>
              <time className="text-xs text-text-muted font-medium">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
              <h2 className="text-lg font-bold text-text-primary mt-2 group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-text-secondary mt-2 line-clamp-2">{post.excerpt}</p>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
