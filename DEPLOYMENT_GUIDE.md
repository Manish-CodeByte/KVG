# 🚀 Neurox Deployment Guide

## ✅ Pre-Deployment Checklist

- [x] Code is clean and bug-free
- [x] Build passes: `npm run build`
- [x] vercel.json configured for routing
- [x] .env.example created for reference
- [x] vite.config.js optimized for production
- [ ] GitHub repository is up to date
- [ ] Vercel account created

---

## 📋 Step 1: Prepare GitHub

```bash
# Make sure all changes are committed
git add .
git commit -m "🚀 Neurox ready for Vercel deployment"

# Push to main branch
git push origin main
```

---

## 🎯 Step 2: Deploy to Vercel

### 2.1 Create Vercel Project

1. Go to **https://vercel.com**
2. Click **"Add New Project"**
3. Sign in with GitHub
4. Select your repo: **neurox**
5. Click **"Import"**

### 2.2 Configure Build Settings

Vercel will auto-detect Vite, but verify:

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

✅ Keep defaults - they're correct!

### 2.3 Add Environment Variables 🔐

**CRITICAL**: Add these in Vercel dashboard:

```
VITE_CLERK_PUBLISHABLE_KEY = pk_test_d29ydGh5LWZpcmVmbHktNTcuY2xlcmsuYWNjb3VudHMuZGV2JA
VITE_API_BASE_URL = http://localhost:5000/api
VITE_SUPABASE_URL = https://cmjbmtvalwvkaqruxbbe.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtamJtdHZhbHd2a2FxcnV4YmJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMDk0MTAsImV4cCI6MjA5MDg4NTQxMH0.Go9kDvFMOXRnpXG76eCLsgjzlNoUCH7NyWCcq_7q_WE
```

### ⚠️ DO NOT Add:
- ❌ `CLERK_SECRET_KEY` (never expose secrets in frontend!)
- ❌ Any private API keys

---

## 🎉 Step 3: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. Your app is live! 🎊

You'll get a URL like:
```
https://neurox-xxx.vercel.app
```

---

## 🔧 Step 4: Fix Clerk Authentication

After deployment, update Clerk dashboard:

1. Go to **https://dashboard.clerk.com**
2. Select your application
3. Go to **Settings → Domains**
4. Add your Vercel URL:
   - `https://neurox-xxx.vercel.app`

---

## 🌐 Step 5: Add Custom Domain (Optional)

For production, get a custom domain:

1. In Vercel dashboard → **Domains**
2. Add your domain (e.g., `neurox.ai`)
3. Follow DNS instructions

```
Example: neurox.ai (looks professional! 🎓)
```

---

## 📊 Step 6: Monitor Performance

In Vercel dashboard:
- **Analytics**: View traffic and performance
- **Logs**: Check for errors
- **Deployments**: See deployment history

---

## 🧠 Pro Tips for Hackathon 🏆

### 1. Optimize Bundle Size
✅ Already done in vite.config.js with manual chunks

### 2. Add Loading States
```jsx
// Show skeleton loaders while data loads
<Skeleton className="w-full h-12 rounded" />
```

### 3. Demo Data Fallback
```javascript
// If API fails, app still works with mock data
const data = apiResponse || mockData
```

### 4. Performance Score
- Use Vercel Analytics
- Target: Lighthouse 90+
- Judges check this!

### 5. Monitor & Improve
```
Performance Tips:
✅ Code-splitting (done via vite)
✅ Image optimization
✅ Lazy loading routes
✅ Service workers (PWA)
```

---

## 🚀 Architecture (Production)

```
┌─────────────────────────────────┐
│  Frontend: Neurox               │
│  Hosted: Vercel                 │
│  Domain: neurox.ai              │
└────────────┬────────────────────┘
             │ (HTTPS)
             ↓
┌─────────────────────────────────┐
│  Backend (Optional): Node/Express│
│  Hosted: Render                 │
│  API: https://api.neurox.ai     │
└────────────┬────────────────────┘
             │
             ↓
┌─────────────────────────────────┐
│  Database: Supabase PostgreSQL  │
│  Auth: Clerk                    │
└─────────────────────────────────┘
```

---

## 🎯 Troubleshooting

### Issue: 404 Page Not Found
**Solution**: vercel.json already configured ✅

### Issue: Clerk Not Working
**Solution**: Add domain to Clerk dashboard

### Issue: Supabase Connection Fails
**Solution**: Check ANON_KEY in Vercel env vars

### Issue: Build Takes Too Long
**Solution**: vite.config.js optimized (manual chunks) ✅

---

## ✨ Final Checklist

- [x] GitHub repo up to date
- [x] vercel.json created
- [x] vite.config.js optimized
- [x] Environment variables ready
- [ ] Deploy to Vercel
- [ ] Update Clerk domain
- [ ] Test all features on live URL
- [ ] Add custom domain (optional)
- [ ] Share with judges! 🎉

---

## 📞 Support

If you get errors:
1. Check Vercel build logs
2. Verify environment variables
3. Ensure CLERK_SECRET_KEY is NOT in frontend
4. Check Supabase credentials

**You're ready to deploy!** 🚀
