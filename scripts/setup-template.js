#!/usr/bin/env node
/**
 * setup-template.js
 *
 * Separates the live site from the template:
 * 1. Creates a clean template repo (agent-site-template)
 * 2. Renames Vercel project agent-content-site → gearlab
 * 3. Updates create-site.js to use the new template
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const os = require('os')

const GITHUB_API = 'https://api.github.com'
const VERCEL_API = 'https://api.vercel.com'

const githubToken = process.env.GITHUB_TOKEN
const vercelToken = process.env.VERCEL_TOKEN
const owner = process.env.GITHUB_OWNER || 'akhil7philip'

function sh(cmd, opts = {}) {
  return execSync(cmd, { encoding: 'utf-8', stdio: opts.silent ? 'pipe' : 'inherit', ...opts }).trim()
}

async function fetchJson(url, opts = {}) {
  const res = await fetch(url, opts)
  const text = await res.text()
  if (!res.ok) throw new Error(`${opts.method || 'GET'} ${url} → ${res.status}: ${text.slice(0, 300)}`)
  return text ? JSON.parse(text) : {}
}

async function githubApi(path, opts = {}) {
  return fetchJson(`${GITHUB_API}${path}`, {
    headers: {
      Authorization: `token ${githubToken}`,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'setup-template',
      'Content-Type': 'application/json',
    },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  })
}

async function vercelApi(path, opts = {}) {
  return fetchJson(`${VERCEL_API}${path}`, {
    headers: {
      Authorization: `Bearer ${vercelToken}`,
      'Content-Type': 'application/json',
    },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  })
}

async function main() {
  if (!githubToken) { console.error('❌ GITHUB_TOKEN required'); process.exit(1) }
  if (!vercelToken) { console.error('❌ VERCEL_TOKEN required'); process.exit(1) }

  console.log('\n🔧 Separating live site from template\n')

  /* ─── 1. Create clean template repo ─── */
  console.log('1. Creating template repo: agent-site-template')
  const tmpDir = path.join(os.tmpdir(), `agent-template-${Date.now()}`)
  fs.mkdirSync(tmpDir, { recursive: true })

  // Clone current repo
  const remote = `https://${githubToken}@github.com/${owner}/agent-content-site.git`
  sh(`git clone --depth 1 ${remote} "${tmpDir}"`, { silent: true })
  fs.rmSync(path.join(tmpDir, '.git'), { recursive: true, force: true })

  // Strip it clean for template use
  console.log('   Stripping live-site content...')

  // Remove sample posts
  const postsDir = path.join(tmpDir, 'content', 'posts')
  if (fs.existsSync(postsDir)) {
    for (const f of fs.readdirSync(postsDir)) {
      fs.rmSync(path.join(postsDir, f), { recursive: true, force: true })
    }
    fs.writeFileSync(path.join(postsDir, '.gitkeep'), '')
  }

  // Reset to placeholder values
  const replaceInFile = (file, from, to) => {
    const p = path.join(tmpDir, file)
    if (fs.existsSync(p)) {
      fs.writeFileSync(p, fs.readFileSync(p, 'utf8').split(from).join(to))
    }
  }

  replaceInFile('app/layout.tsx', 'G-4B8KM1P3FJ', 'G-XXXXXXXXXX')
  replaceInFile('app/layout.tsx', 'Gear Lab', 'Site Title')
  replaceInFile('app/page.tsx', 'Gear Lab', 'Site Title')
  replaceInFile('app/robots.ts', 'https://gearlab.space', 'https://example.com')
  replaceInFile('app/sitemap.xml/route.ts', 'https://gearlab.space', 'https://example.com')
  replaceInFile('app/rss.xml/route.ts', 'https://gearlab.space', 'https://example.com')
  replaceInFile('README.md', 'gearlab.space', 'example.com')
  replaceInFile('README.md', 'Gear Lab', 'Site Title')
  replaceInFile('.env.example', 'https://gearlab.space', 'https://example.com')
  replaceInFile('.env.example', 'Gear Lab', 'Site Title')
  replaceInFile('.env.example', 'GITHUB_REPO=agent-content-site', 'GITHUB_REPO=your-repo-name')

  // Reset next.config.ts if it has domain-specific redirects/headers
  const nextConfig = path.join(tmpDir, 'next.config.ts')
  if (fs.existsSync(nextConfig)) {
    fs.writeFileSync(nextConfig, `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
};

export default nextConfig;
`)
  }

  // Commit clean template
  sh(`git init`, { cwd: tmpDir, silent: true })
  sh(`git -C "${tmpDir}" add -A`, { silent: true })
  sh(`git -C "${tmpDir}" -c user.name="Template Bot" -c user.email="bot@agent.site" commit -m "init: clean template"`, { silent: true })

  // Create repo on GitHub
  try {
    await githubApi('/user/repos', {
      method: 'POST',
      body: {
        name: 'agent-site-template',
        private: false,
        description: 'Template repository for agent content sites',
        is_template: true,
      },
    })
    console.log('   ✅ Created agent-site-template on GitHub')
  } catch (e) {
    if (e.message.includes('422') || e.message.includes('already exists')) {
      console.log('   ⚠️  agent-site-template already exists. Will force-push.')
    } else {
      throw e
    }
  }

  // Push template
  const templateRemote = `https://${githubToken}@github.com/${owner}/agent-site-template.git`
  sh(`git -C "${tmpDir}" remote add origin ${templateRemote}`, { silent: true })
  sh(`git -C "${tmpDir}" branch -M main`, { silent: true })
  sh(`git -C "${tmpDir}" push -uf origin main`, { silent: true })
  console.log('   ✅ Pushed clean template')

  fs.rmSync(tmpDir, { recursive: true, force: true })

  /* ─── 2. Rename Vercel project ─── */
  console.log('\n2. Renaming Vercel project: agent-content-site → gearlab')
  try {
    await vercelApi('/v9/projects/agent-content-site', {
      method: 'PATCH',
      body: { name: 'gearlab' },
    })
    console.log('   ✅ Renamed to gearlab')
  } catch (e) {
    if (e.message.includes('already exists') || e.message.includes('conflict')) {
      console.log('   ⚠️  Name gearlab already taken or conflict. Check dashboard.')
    } else {
      console.log(`   ❌ Failed: ${e.message}`)
    }
  }

  /* ─── 3. Update create-site.js ─── */
  console.log('\n3. Updating create-site.js template source')
  const scriptPath = path.join(process.cwd(), 'scripts', 'create-site.js')
  let script = fs.readFileSync(scriptPath, 'utf8')
  script = script.replace(
    /const TEMPLATE_REPO = .*/,
    `const TEMPLATE_REPO = 'https://github.com/${owner}/agent-site-template.git'`
  )
  fs.writeFileSync(scriptPath, script)
  console.log('   ✅ Updated TEMPLATE_REPO to agent-site-template')

  /* ─── 4. Commit changes to this repo ─── */
  console.log('\n4. Committing changes to agent-content-site')
  try {
    sh(`git add scripts/create-site.js scripts/setup-template.js`, { silent: true })
    sh(`git -c user.name="Template Bot" -c user.email="bot@agent.site" commit -m "chore: separate template repo + rename vercel project"`, { silent: true })
    sh(`git push`, { silent: true })
    console.log('   ✅ Committed and pushed')
  } catch {
    console.log('   (nothing to commit or push failed)')
  }

  console.log('\n✅ Done!\n')
  console.log('New structure:')
  console.log('  GitHub template:  https://github.com/akhil7philip/agent-site-template')
  console.log('  GitHub live site: https://github.com/akhil7philip/agent-content-site')
  console.log('  Vercel live site: https://vercel.com/dashboard/gearlab')
  console.log('')
  console.log('Next time you run create-site.js, it will clone from agent-site-template.')
}

main().catch(err => {
  console.error('\n❌ Error:', err.message)
  process.exit(1)
})
