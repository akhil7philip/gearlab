#!/usr/bin/env node
/**
 * create-site.js
 *
 * One-command automation to spin up a new agent content site from the template.
 *
 * Usage:
 *   GITHUB_TOKEN=ghp_xxx VERCEL_TOKEN=vercel_xxx node scripts/create-site.js
 *
 * Phase 1 — Codegen:    Clone template → replace placeholders
 * Phase 2 — Infra:      Create GitHub repo → push → create Vercel project → set domain
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const readline = require('readline')

const TEMPLATE_REPO = 'https://github.com/akhil7philip/agent-content-site.git'
const GITHUB_API = 'https://api.github.com'
const VERCEL_API = 'https://api.vercel.com'

/* ─── helpers ─── */

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => rl.question(question, (ans) => { rl.close(); resolve(ans.trim()) }))
}

function sh(cmd, opts = {}) {
  return execSync(cmd, { encoding: 'utf-8', stdio: opts.silent ? 'pipe' : 'inherit', ...opts }).trim()
}

function randomId() {
  return Math.random().toString(36).slice(2, 8)
}

function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) return
  let content = fs.readFileSync(filePath, 'utf8')
  for (const [from, to] of replacements) {
    content = content.split(from).join(to)
  }
  fs.writeFileSync(filePath, content)
}

function replaceInDir(dir, replacements, extensions = ['.ts', '.tsx', '.js', '.json', '.md', '.css', '.xml']) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.next' || entry.name === 'dist') continue
      replaceInDir(full, replacements, extensions)
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      replaceInFile(full, replacements)
    }
  }
}

async function githubApi(token, path, opts = {}) {
  const res = await fetch(`${GITHUB_API}${path}`, {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'create-site-cli',
      'Content-Type': 'application/json',
    },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`GitHub API ${opts.method || 'GET'} ${path} → ${res.status}: ${text}`)
  return text ? JSON.parse(text) : {}
}

async function vercelApi(token, path, opts = {}) {
  const res = await fetch(`${VERCEL_API}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`Vercel API ${opts.method || 'GET'} ${path} → ${res.status}: ${text}`)
  return text ? JSON.parse(text) : {}
}

/* ─── main ─── */

async function main() {
  console.log('\n🚀  Agent Content Site — Automated Scaffold\n')

  /* 0. env checks */
  const githubToken = process.env.GITHUB_TOKEN
  const vercelToken = process.env.VERCEL_TOKEN

  if (!githubToken) {
    console.error('❌ Missing GITHUB_TOKEN env var. Create one at https://github.com/settings/tokens (repo scope)')
    process.exit(1)
  }
  if (!vercelToken) {
    console.error('❌ Missing VERCEL_TOKEN env var. Create one at https://vercel.com/account/tokens')
    process.exit(1)
  }

  /* 1. inputs */
  const brand = (await ask('Brand name (e.g. Gear Lab): ')) || 'My Site'
  const domain = (await ask('Domain (e.g. gearlab.space): ')) || 'example.com'
  const niche = (await ask('Niche (e.g. Portable Power Stations): ')) || 'General'
  const githubOwner = (await ask(`GitHub owner/username [${process.env.GITHUB_OWNER || 'akhil7philip'}]: `)) || process.env.GITHUB_OWNER || 'akhil7philip'
  const repoNameDefault = domain.replace(/\./g, '-')
  const repoName = (await ask(`GitHub repo name [${repoNameDefault}]: `)) || repoNameDefault

  const siteUrl = `https://${domain}`
  const repoSlug = `${githubOwner}/${repoName}`
  const vercelProjectName = repoName.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 50) || `site-${randomId()}`

  console.log('\n📋  Plan:')
  console.log(`   Brand:     ${brand}`)
  console.log(`   Domain:    ${domain}`)
  console.log(`   Niche:     ${niche}`)
  console.log(`   GitHub:    ${repoSlug}`)
  console.log(`   Vercel:    ${vercelProjectName}`)
  console.log('')

  const ok = await ask('Proceed? [Y/n]: ')
  if (ok && ok.toLowerCase() !== 'y') {
    console.log('Aborted.')
    process.exit(0)
  }

  /* 2. Phase 1 — Codegen */
  console.log('\n─── Phase 1: Codegen ───\n')

  const tmpDir = path.join(require('os').tmpdir(), `agent-site-${randomId()}`)
  fs.mkdirSync(tmpDir, { recursive: true })

  console.log(`Cloning template → ${tmpDir}`)
  sh(`git clone --depth 1 ${TEMPLATE_REPO} "${tmpDir}"`, { silent: true })

  // remove template git history
  fs.rmSync(path.join(tmpDir, '.git'), { recursive: true, force: true })

  console.log('Replacing placeholders...')
  replaceInDir(tmpDir, [
    ['Gear Lab', brand],
    ['gearlab.space', domain],
    ['https://gearlab.space', siteUrl],
    ['Portable Power Stations', niche],
    ['Portable power stations', niche],
    ['portable power stations', niche.toLowerCase()],
    ['akhil7philip', githubOwner],
    ['agent-content-site', repoName],
    ['G-4B8KM1P3FJ', 'G-XXXXXXXXXX'], // reset GA4 to placeholder
  ])

  // reset publishing script defaults
  const publishScript = path.join(tmpDir, 'scripts', 'publish-post.js')
  if (fs.existsSync(publishScript)) {
    let content = fs.readFileSync(publishScript, 'utf8')
    content = content.replace(/owner: process\.env\.GITHUB_OWNER \|\| '[^']+'/, `owner: process.env.GITHUB_OWNER || '${githubOwner}'`)
    content = content.replace(/repo: process\.env\.GITHUB_REPO \|\| '[^']+'/, `repo: process.env.GITHUB_REPO || '${repoName}'`)
    fs.writeFileSync(publishScript, content)
  }

  // init git and commit
  console.log('Init git...')
  sh(`git init`, { cwd: tmpDir, silent: true })
  sh(`git add -A`, { cwd: tmpDir, silent: true })
  sh(`git -c user.name="${brand}" -c user.email="admin@${domain}" commit -m "init: ${brand} content site"`, { cwd: tmpDir, silent: true })

  /* 3. Phase 2 — GitHub repo */
  console.log('\n─── Phase 2: GitHub Repo ───\n')

  console.log(`Creating GitHub repo: ${repoSlug}`)
  await githubApi(githubToken, '/user/repos', {
    method: 'POST',
    body: { name: repoName, private: false, description: `${brand} — ${niche} buying guides & reviews` },
  })

  console.log('Pushing code...')
  const remote = `https://${githubToken}@github.com/${repoSlug}.git`
  sh(`git remote add origin ${remote}`, { cwd: tmpDir, silent: true })
  sh(`git branch -M main`, { cwd: tmpDir, silent: true })
  sh(`git push -u origin main`, { cwd: tmpDir, silent: true })

  /* 4. Phase 2 — Vercel */
  console.log('\n─── Phase 2: Vercel ───\n')

  console.log(`Creating Vercel project: ${vercelProjectName}`)
  const project = await vercelApi(vercelToken, '/v9/projects', {
    method: 'POST',
    body: {
      name: vercelProjectName,
      framework: 'nextjs',
      gitRepository: {
        type: 'github',
        repo: repoSlug,
      },
      buildSettings: {
        buildCommand: 'next build',
        outputDirectory: 'dist',
      },
    },
  })

  console.log(`Adding custom domain: ${domain}`)
  try {
    await vercelApi(vercelToken, `/v9/projects/${project.id}/domains`, {
      method: 'POST',
      body: { name: domain },
    })
    console.log('Domain added. You may need to configure DNS (CNAME → cname.vercel-dns.com)')
  } catch (err) {
    console.warn(`⚠️  Could not add domain automatically: ${err.message}`)
    console.warn('   Add it manually in Vercel dashboard → Project Settings → Domains')
  }

  /* 5. Done */
  console.log('\n✅  Done!\n')
  console.log(`GitHub:    https://github.com/${repoSlug}`)
  console.log(`Vercel:    https://vercel.com/dashboard/${vercelProjectName}`)
  console.log(`Live URL:  https://${domain}  (once DNS is configured)`)
  console.log(`\nNext steps:`)
  console.log(`  1. Add DNS record:  CNAME  ${domain}  →  cname.vercel-dns.com`)
  console.log(`  2. Visit the Vercel dashboard to verify the domain`)
  console.log(`  3. Set GITHUB_TOKEN in .env for the publishing pipeline`)
  console.log(`  4. Set up GA4 and update the Measurement ID in app/layout.tsx`)
  console.log(`  5. Set up Google Search Console and submit sitemap.xml`)

  // cleanup
  fs.rmSync(tmpDir, { recursive: true, force: true })
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message)
  process.exit(1)
})
