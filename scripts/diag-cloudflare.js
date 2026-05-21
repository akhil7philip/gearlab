#!/usr/bin/env node
/**
 * diag-cloudflare.js
 * Debug Cloudflare API connectivity for a domain.
 */

const CF_API = 'https://api.cloudflare.com/client/v4'
const TOKEN = process.env.CLOUDFLARE_API_TOKEN
const DOMAIN = process.argv[2] || 'furryfinds.club'

async function cf(path, opts = {}) {
  const res = await fetch(`${CF_API}${path}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  })
  const data = await res.json()
  return { status: res.status, ok: res.ok, data }
}

async function main() {
  if (!TOKEN) {
    console.error('❌ Set CLOUDFLARE_API_TOKEN env var')
    process.exit(1)
  }

  console.log(`🔍 Checking Cloudflare API for domain: ${DOMAIN}\n`)

  // 1. Verify token
  console.log('1. Verifying API token...')
  const verify = await cf('/user/tokens/verify')
  console.log(`   Status: ${verify.status}`)
  console.log(`   Result: ${verify.data.result?.status || verify.data.errors?.[0]?.message || 'unknown'}`)

  // 2. List zones (broad search)
  console.log('\n2. Listing all accessible zones...')
  const zones = await cf('/zones?per_page=50')
  if (zones.data.result?.length) {
    console.log(`   Found ${zones.data.result.length} zone(s):`)
    for (const z of zones.data.result) {
      const match = z.name === DOMAIN ? ' ← MATCH' : ''
      console.log(`   - ${z.name} (id: ${z.id})${match}`)
    }
  } else {
    console.log('   No zones found.')
    if (zones.data.errors?.length) {
      console.log(`   Errors: ${JSON.stringify(zones.data.errors)}`)
    }
  }

  // 3. Specific zone lookup (what create-site.js does)
  console.log(`\n3. Searching zone by exact name: ${DOMAIN}`)
  const exact = await cf(`/zones?name=${DOMAIN}`)
  console.log(`   Status: ${exact.status}`)
  console.log(`   Results: ${exact.data.result?.length || 0}`)
  if (exact.data.result?.[0]) {
    const z = exact.data.result[0]
    console.log(`   Zone ID: ${z.id}`)
    console.log(`   Status:  ${z.status}`)
    console.log(`   Plan:    ${z.plan?.name || 'none'}`)

    // 4. List existing DNS records
    console.log(`\n4. Existing DNS records for ${DOMAIN}:`)
    const records = await cf(`/zones/${z.id}/dns_records`)
    if (records.data.result?.length) {
      for (const r of records.data.result) {
        console.log(`   ${r.type}\t${r.name}\t→ ${r.content} ${r.proxied ? '(proxied)' : ''}`)
      }
    } else {
      console.log('   No DNS records found.')
    }

    // 5. Check if we can create records
    console.log(`\n5. Testing DNS record creation (dry run)...`)
    const test = await cf(`/zones/${z.id}/dns_records`, {
      method: 'POST',
      body: { type: 'A', name: '@', content: '76.76.21.21', ttl: 1, proxied: false },
    })
    if (test.ok) {
      console.log('   ✅ A record created successfully')
      // Clean up test record
      await cf(`/zones/${z.id}/dns_records/${test.data.result.id}`, { method: 'DELETE' })
      console.log('   (test record deleted)')
    } else {
      console.log(`   ❌ Failed: ${test.data.errors?.[0]?.message || JSON.stringify(test.data)}`)
    }
  } else {
    console.log(`   Zone not found.`)
    if (exact.data.errors?.length) {
      console.log(`   Errors: ${JSON.stringify(exact.data.errors)}`)
    }
  }

  console.log('\n✅ Done.')
}

main().catch(err => {
  console.error('❌', err.message)
  process.exit(1)
})
