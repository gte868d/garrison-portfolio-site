# Garrison Brooks Portfolio - Deployment Guide

## Complete Step-by-Step Deployment Instructions

This guide will walk you through deploying your portfolio website to Netlify with full CMS functionality.

---

## Part 1: Create GitHub Account & Repository

### Step 1: Create GitHub Account
1. Go to [github.com](https://github.com)
2. Click "Sign up" in top right
3. Enter email: `garrison.brooks@gmail.com`
4. Create a password (save it somewhere safe!)
5. Choose a username (suggestions: `garrisonbrooks` or `gbrooks` or `garrison-brooks`)
6. Verify your email
7. Complete the signup process

### Step 2: Create Repository
1. After signing in, click the "+" icon in top right
2. Select "New repository"
3. Repository name: `garrison-portfolio`
4. Description: "Professional portfolio website"
5. Select "Public"
6. **DO NOT** check "Initialize this repository with a README"
7. Click "Create repository"
8. You'll see a page with instructions - **keep this page open**

---

## Part 2: Upload Your Code to GitHub

### Option A: Using GitHub Desktop (Easiest)

1. Download GitHub Desktop from [desktop.github.com](https://desktop.github.com)
2. Install and sign in with your GitHub account
3. Click "File" → "Add Local Repository"
4. Browse to your `garrison-portfolio` folder
5. Click "Publish repository"
6. Make sure "Keep this code private" is UNCHECKED
7. Click "Publish repository"
8. Done! Your code is on GitHub

### Option B: Using Command Line

Open Terminal/Command Prompt in your project folder and run:

```bash
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/garrison-portfolio.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

---

## Part 3: Deploy to Netlify

### Step 1: Create Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Click "Sign up"
3. Choose "Sign up with GitHub" (easiest)
4. Authorize Netlify to access your GitHub
5. You're now signed in to Netlify

### Step 2: Connect Your Repository
1. Click "Add new site" button
2. Select "Import an existing project"
3. Click "Deploy with GitHub"
4. Authorize Netlify (if asked)
5. You'll see a list of your repositories
6. Click on `garrison-portfolio`

### Step 3: Configure Build Settings
**Good news:** Netlify auto-detects everything from your `netlify.toml` file!

You should see:
- Build command: `npm run build && npm run export`
- Publish directory: `out`

If you see this, just click "Deploy garrison-portfolio"

### Step 4: Wait for Build
1. Netlify will start building your site (2-5 minutes)
2. You'll see a build log with lots of text scrolling
3. When done, you'll see "Site is live" with a URL
4. Click the URL to see your site! 🎉

Your site will have a random name like `magical-unicorn-123456.netlify.app`

---

## Part 4: Enable CMS Admin Panel

### Step 1: Enable Netlify Identity
1. In your Netlify dashboard, find your site
2. Click on your site name
3. Click "Identity" in the top menu
4. Click "Enable Identity"
5. Wait a moment for it to activate

### Step 2: Configure Identity Settings
1. Still in Identity tab, click "Settings and usage"
2. Scroll down to "Registration preferences"
3. Select "Invite only" (important for security!)
4. Click "Save"

### Step 3: Enable Git Gateway
1. Still in Identity settings, scroll down
2. Find "Git Gateway" section
3. Click "Enable Git Gateway"
4. You'll see "Git Gateway is enabled"

### Step 4: Invite Yourself as Admin
1. Go back to "Identity" tab (top menu)
2. Click "Invite users"
3. Enter your email: `garrison.brooks@gmail.com`
4. Click "Send"
5. Check your email
6. Click the invitation link
7. Set your admin password (save it somewhere safe!)
8. You're now an admin!

---

## Part 5: Test Your CMS

### Step 1: Access Admin Panel
1. Go to your site URL
2. Add `/admin` to the end
   - Example: `https://your-site.netlify.app/admin`
3. You'll see a login screen
4. Enter your email and password
5. You're in!

### Step 2: Add Your First Project
1. Click "Projects" in the left sidebar
2. Click "New Projects" button
3. Fill in a test project:
   - Title: "Test Project"
   - Industry: "Testing"
   - Materials: "Pixels"
   - Display Type: "Digital"
   - Year: "2025"
   - Body: "This is a test project"
4. Click "Publish"
5. Wait 30-60 seconds
6. Go back to your site homepage
7. You should see your test project!

**If you see it: CMS is working! 🎉**

---

## Part 6: Connect Your Domain

### Step 1: Domain Settings
1. In Netlify dashboard, click "Domain settings"
2. Click "Add custom domain"
3. Enter: `garrisonbrooks.com`
4. Click "Verify"
5. Click "Add domain"

### Step 2: Update DNS
Netlify will show you DNS records to update. You need to:

1. Log in to your domain registrar (GoDaddy, Namecheap, etc.)
2. Find DNS settings
3. Add/update these records:
   - Type: A Record
   - Name: @ (or blank)
   - Value: (Netlify will show you the IP)
   
4. Add another record:
   - Type: CNAME
   - Name: www
   - Value: your-site.netlify.app

5. Save DNS changes
6. Wait 24-48 hours for DNS to propagate

### Step 3: Enable HTTPS
1. Once DNS is connected, go back to Netlify
2. Go to "Domain settings"
3. Scroll to "HTTPS"
4. Click "Verify DNS configuration"
5. Click "Provision certificate"
6. Wait a few minutes
7. Your site now has HTTPS! 🔒

---

## What You Can Do Now

### Managing Content
- Add projects: Go to `/admin` → Projects → New
- Edit projects: Click on any project to edit
- Upload images: Drag and drop into image fields
- Change site settings: Click "Site Settings" in CMS

### When You Make Changes
1. Edit in CMS admin panel
2. Click "Publish"
3. Netlify automatically rebuilds (30-90 seconds)
4. Changes appear on your live site

### No Code Needed!
You can manage everything through the admin panel. Never need to touch code again unless you want to change design/layout.

---

## Troubleshooting

### Build Failed
1. Go to Netlify dashboard
2. Click "Deploys"
3. Click the failed deploy
4. Read the error log
5. Usually: missing dependency or typo
6. Contact me (Claude) with the error

### CMS Not Loading
- Check Netlify Identity is enabled
- Check Git Gateway is enabled
- Clear browser cache
- Try different browser

### Can't Login to CMS
- Check you accepted the email invitation
- Check you're going to the right URL (`/admin`)
- Try "Forgot password" to reset

### Images Not Uploading
- Check file size (keep under 5MB)
- Check format (JPG, PNG, SVG only)
- Try refreshing the page
- Try different browser

### Site Not Updating
- Wait full 90 seconds after publishing
- Check "Deploys" tab in Netlify
- If stuck, click "Trigger deploy" → "Deploy site"

---

## Need Help?

**I (Claude/Garrison) will help you:**
- Screen share to walk through setup
- Fix any deployment issues
- Answer questions as you learn

**Don't hesitate to ask!** This is new territory and that's totally normal.

---

## Quick Reference

### Important URLs
- Your site: `https://garrisonbrooks.com` (after DNS)
- Temp URL: `https://your-site.netlify.app`
- Admin panel: Add `/admin` to either URL
- GitHub repo: `https://github.com/YOUR-USERNAME/garrison-portfolio`
- Netlify dashboard: `https://app.netlify.com`

### Important Passwords
- GitHub password: (save it!)
- Netlify uses GitHub login
- CMS admin password: (save it!)

### When Something Changes
1. Edit in CMS admin (`/admin`)
2. Click "Publish"
3. Wait 60 seconds
4. Refresh your site
5. See changes live!

---

**You've got this!** The first deploy is the hardest part. After that, it's just using the nice admin panel. 🚀
