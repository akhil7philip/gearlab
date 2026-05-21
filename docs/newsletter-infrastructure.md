# Newsletter Infrastructure Setup
# Service: Cloudflare Workers (Free Tier)
# Purpose: Email signup collection without paid newsletter service

## Architecture

```
User submits email → Cloudflare Worker → KV Storage
                                    ↓
                              Admin Dashboard (protected)
                                    ↓
                              Export to CSV / manual send
```

## Why Cloudflare?

- **Free tier:** 100,000 requests/day (more than enough)
- **KV storage:** 1GB free (stores 500,000+ emails)
- **No external dependencies:** No ConvertKit, Beehiiv, or Substack costs
- **Custom domain:** `newsletter.gearlab.space` / `newsletter.furryfinds.club`
- **Privacy-friendly:** Data stays in your Cloudflare account

## Setup Steps

### 1. Create Cloudflare Worker

```javascript
// worker.js — Newsletter Signup Handler
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const site = url.hostname.split('.')[0]; // gearlab or furryfinds
    
    if (request.method === 'POST' && url.pathname === '/subscribe') {
      const { email, source } = await request.json();
      
      // Validate email
      if (!email || !email.includes('@')) {
        return new Response(JSON.stringify({ error: 'Invalid email' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Store in KV
      const key = `${site}:${Date.now()}:${email}`;
      await env.NEWSLETTER_KV.put(key, JSON.stringify({
        email,
        source: source || 'website',
        subscribed_at: new Date().toISOString(),
        confirmed: false
      }));
      
      // Send confirmation email (optional — via Cloudflare Email Routing)
      // await sendConfirmation(email, site);
      
      return new Response(JSON.stringify({ 
        success: true,
        message: 'Subscribed! Check your inbox for confirmation.'
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Admin dashboard (password protected)
    if (url.pathname === '/admin') {
      // Check auth header
      const auth = request.headers.get('Authorization');
      if (auth !== `Bearer ${env.ADMIN_TOKEN}`) {
        return new Response('Unauthorized', { status: 401 });
      }
      
      // List subscribers
      const list = await env.NEWSLETTER_KV.list({ prefix: `${site}:` });
      const subscribers = await Promise.all(
        list.keys.map(async k => {
          const data = await env.NEWSLETTER_KV.get(k.name);
          return JSON.parse(data);
        })
      );
      
      return new Response(JSON.stringify({ 
        count: subscribers.length,
        subscribers 
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response('Not found', { status: 404 });
  }
};
```

### 2. Deploy via Wrangler

```bash
# Install wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create project
wrangler init newsletter-worker

# Set secrets
wrangler secret put NEWSLETTER_KV
wrangler secret put ADMIN_TOKEN

# Deploy
wrangler deploy
```

### 3. Frontend Form Component

```html
<!-- Newsletter Signup — Add to article template footer -->
<div class="newsletter-cta">
  <h3>Get the latest reviews in your inbox</h3>
  <p>No spam. Unsubscribe anytime. We test stuff so you don't have to.</p>
  <form id="newsletter-form">
    <input type="email" placeholder="your@email.com" required />
    <button type="submit">Subscribe</button>
  </form>
  <p class="privacy-note">We use your email only for newsletter delivery.</p>
</div>
```

```javascript
// Newsletter form handler
async function handleSubscribe(email, source) {
  const response = await fetch('https://newsletter.YOURSITE.workers.dev/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source })
  });
  
  const data = await response.json();
  
  if (data.success) {
    showMessage('✅ Subscribed! Check your inbox.');
    trackEvent('newsletter_signup', { source });
  } else {
    showMessage('❌ Something went wrong. Try again?');
  }
}
```

## Cost Analysis

| Service | Monthly Cost | Limit |
|---------|-------------|-------|
| Cloudflare Workers | $0 | 100K requests/day |
| Cloudflare KV | $0 | 1GB storage |
| Email delivery | $0 (manual) or $0 (Cloudflare Email Routing) | — |
| **Total** | **$0** | — |

## Migration Path (When Ready to Scale)

When you hit 1,000+ subscribers or want automation:

1. **Export CSV** from Cloudflare KV admin dashboard
2. **Import to ConvertKit / Beehiiv** ($0-29/month)
3. **Update form** to point to new service
4. **Cloudflare Worker** becomes a proxy/retry layer

## Admin Dashboard Commands

```bash
# View subscriber count
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  https://newsletter.YOURSITE.workers.dev/admin

# Export to CSV (custom endpoint)
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  https://newsletter.YOURSITE.workers.dev/export?format=csv
```

## Implementation Priority

1. **Phase 1 (This week):** Deploy worker + add signup form to both sites
2. **Phase 2 (Next week):** Add source tracking (which article drove signup)
3. **Phase 3 (Month 2):** Manual email sending with CSV export
4. **Phase 4 (Month 3+):** Automated newsletter with RSS-to-email

## Site-Specific Copy

### Gear Lab
```
Headline: "Get power station deals before they sell out"
Subtext: "We track prices daily. When the Anker C1000 drops to $470, you'll be the first to know."
CTA: "Subscribe"
```

### Furry Finds
```
Headline: "New pet gear reviews every week"
Subtext: "From indestructible toys to orthopedic beds — tested by real pets, reviewed by real owners."
CTA: "Join the pack"
```
