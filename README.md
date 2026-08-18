# 🖥️ Prathamesh Salokhe — Terminal Portfolio & Live AI Assistant

A full-screen hacker terminal interface portfolio powered by Next.js and Vercel Edge Functions with live Groq LLM streaming (`llama-3.3-70b-versatile`).

---

## ✨ Core Features

- **Full-Screen Console Aesthetics**: Monospace typography (`JetBrains Mono`), CRT scanline overlay, initial screen flicker (with `prefers-reduced-motion` support), phosphor-green/amber/cyan matrix color themes.
- **Live Streaming AI Chat Assistant**: General-purpose AI powered by Groq API (`llama-3.3-70b-versatile`) streaming real-time responses with teletype feel and instant keypress/click completion.
- **Embedded Knowledge Base**: First-source, accurate background context on Prathamesh's education (DKTE 8.96 CGPA), GenAI projects (*NeuroNauts*, *Sunbeam RAG Chatbot*, *ALZ-AI*, *Sales Analysis Platform*), AWS Data Engineering certification, and LeetCode rating (1500+).
- **Built-in CLI Commands**: `help`, `whoami`, `projects`, `skills`, `resume`, `contact`, `theme [green|amber|cyan]`, `clear`.
- **Top-Right Fixed Link Button**: Always-visible `[view portfolio →]` button linking out to external portfolios or GitHub repos.
- **Vercel Edge Function**: `/api/chat` running on Vercel Edge Runtime for near-instant cold starts and zero exposure of server-side API keys.

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Local API Key (Optional)
Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```
Add your Groq API key (get a free key at [Groq Console](https://console.groq.com)):
```env
GROQ_API_KEY=gsk_your_groq_api_key_here
```
*(Note: If no API key is provided, the terminal runs in offline fallback mode with built-in knowledge answers).*

### 3. Run Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ How to Customize

### 1. Update Knowledge Base (`knowledge.md`)
All background details, projects, skills, education, and experience are stored in:
- `knowledge.md`
- `app/api/chat/route.js` (`KNOWLEDGE_BASE` constant)

Simply edit the text in `knowledge.md` whenever you want to update your resume, add new projects, or change certifications.

### 2. Change Top-Right Portfolio URL (`app/config.js`)
To change where the top-right `[view portfolio →]` button points, open `app/config.js` and modify `externalPortfolioUrl`:
```javascript
export const CONFIG = {
  name: "Prathamesh Salokhe",
  externalPortfolioUrl: "https://github.com/JACKSPARROW10-MAX", // Replace with your desired URL
  externalPortfolioText: "[view portfolio →]",
  // ...
};
```

---

## ☁️ Deploying to Vercel (Zero-Config)

This repository is pre-configured for deployment to **Vercel** with Vercel Edge Functions on the Hobby tier.

### Steps to Deploy:
1. **Push Code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial terminal portfolio commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
2. **Import into Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** &rarr; **"Project"**.
   - Select your GitHub repository.
3. **Set Environment Variable**:
   - Under **Environment Variables**, add:
     - **Name**: `GROQ_API_KEY`
     - **Value**: `gsk_your_actual_groq_api_key_here`
4. **Deploy**:
   - Click **Deploy**. Vercel will automatically build and deploy your terminal portfolio and `/api/chat` Edge Function.

---

## 📜 License
MIT License. Built for Prathamesh Salokhe.
