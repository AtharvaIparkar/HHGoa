# Hacker House Goa 2026 — Official Frame & Builder Pass Generator

Official web app for Hacker House Goa 2026 PFP Frame & Builder Pass generator, featuring the 1960s retro Goa travel poster aesthetic, animated intro splash screen, 3D card stage, and pixel-perfect PNG export.

## 🚀 How to Deploy on Vercel

### Option 1: Deploy via Vercel CLI (Recommended & Fastest)

1. Open your terminal in this directory (`C:\Users\nisha\.gemini\antigravity\scratch\hh-goa-card-generator`):
   ```bash
   npx vercel
   ```
2. Follow the prompts:
   - **Set up and deploy?** `Y`
   - **Which scope?** (Select your personal account)
   - **Link to existing project?** `N`
   - **What's your project's name?** `hh-goa-2026-card-generator`
   - **In which directory is your code located?** `./`
3. Vercel will output a live URL (e.g. `https://hh-goa-2026-card-generator.vercel.app`).
4. To deploy to production:
   ```bash
   npx vercel --prod
   ```

---

### Option 2: Deploy via GitHub & Vercel Dashboard

1. Initialize a git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Vercel deployment"
   ```
2. Push your repository to GitHub.
3. Go to [vercel.com/new](https://vercel.com/new).
4. Import your GitHub repository.
5. Leave all build settings default (Vercel automatically detects static HTML/CSS/JS).
6. Click **Deploy**!

---

## 🛠️ Included Vercel Configuration Files
- `vercel.json` — Static routing, clean URLs, and asset cache headers.
- `package.json` — Metadata & development script configurations.
- `.gitignore` — Ignore `node_modules` and `.vercel` build artifacts.
