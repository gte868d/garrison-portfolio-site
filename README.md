# Garrison Brooks Portfolio Website

A sophisticated portfolio website showcasing 20 years of industrial design work with modern AI-integrated methodologies.

## Features

- 🎨 Modern design with gradient mesh backgrounds and grain textures
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast static site generation with Next.js
- 🎯 Easy content management with Netlify CMS
- 🖼️ Image upload and management
- 🎭 Smooth animations and interactions
- 🔒 Secure admin panel

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS
- **CMS:** Netlify CMS (Decap CMS)
- **Hosting:** Netlify
- **Version Control:** GitHub

## Quick Start (Development)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Deployment to Netlify

### Option 1: GitHub + Netlify (Recommended - Enables CMS)

**Step 1: Create GitHub Repository**
1. Go to github.com and sign in (or create account)
2. Click "New repository"
3. Name it: `garrison-portfolio`
4. Make it Public
5. Don't initialize with README (we have one)
6. Click "Create repository"

**Step 2: Push Code to GitHub**
```bash
# In the project folder, run:
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/garrison-portfolio.git
git push -u origin main
```

**Step 3: Deploy to Netlify**
1. Go to netlify.com and sign in (or create account)
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub"
4. Authorize Netlify to access your GitHub
5. Select `garrison-portfolio` repository
6. Netlify auto-detects settings (from netlify.toml)
7. Click "Deploy site"
8. Wait 2-3 minutes for build to complete

**Step 4: Enable Netlify Identity (for CMS Admin)**
1. In Netlify dashboard, go to your site
2. Click "Identity" in top menu
3. Click "Enable Identity"
4. Go to "Settings and usage"
5. Scroll to "Registration preferences"
6. Select "Invite only"
7. Scroll to "Git Gateway"
8. Click "Enable Git Gateway"

**Step 5: Create Your Admin User**
1. In Netlify dashboard, go to "Identity" tab
2. Click "Invite users"
3. Enter your email (garrison.brooks@gmail.com)
4. Check your email for invitation
5. Click the link and set your password
6. You're now an admin!

**Step 6: Connect Custom Domain**
1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter: `garrisonbrooks.com`
4. Follow instructions to update DNS
5. Netlify provides automatic HTTPS

### Option 2: Manual Deploy (No CMS, Simpler)

**Step 1: Build the Site**
```bash
npm run build
npm run export
```

**Step 2: Deploy**
1. Go to netlify.com
2. Drag the `out` folder to "Sites" area
3. Done - site is live!

**To Update:**
- Edit files locally
- Run build commands
- Drag `out` folder again

## Using the Admin Panel

### Accessing Admin
1. Go to `yoursite.com/admin`
2. Login with your email and password
3. You're in the CMS!

### Adding a New Project
1. Click "Projects" in sidebar
2. Click "New Projects"
3. Fill in the form:
   - Title: Project name
   - Industry: E.g., "Sports & Recreation"
   - Materials: E.g., "Acrylic, Steel, LED"
   - Display Type: E.g., "Interactive Retail Display"
   - Client: Optional
   - Year: E.g., "2025"
   - Featured: Check if should appear on homepage
   - Hero Image: Upload main project image
   - Body: Write project description (supports Markdown)
   - Sketches: Upload concept sketches (multiple)
   - Execution Photos: Upload final photos (multiple)
4. Click "Publish"
5. Site rebuilds automatically (30-60 seconds)
6. New project appears on site!

### Editing Existing Project
1. Click "Projects" in sidebar
2. Find the project
3. Click to edit
4. Make changes
5. Click "Publish"
6. Done!

### Uploading Images
- **Drag and drop** images into any image field
- **Or click** to browse your computer
- Images automatically optimized for web
- Supported formats: JPG, PNG, WebP, SVG

### Changing Site Settings
1. Click "Site Settings" in sidebar
2. Edit:
   - Logo (upload new logo file)
   - Email address
   - LinkedIn URL
   - Show logo vs. text name
3. Click "Save"

## Project Structure

```
garrison-portfolio/
├── public/
│   ├── admin/           # CMS admin panel
│   └── images/          # Uploaded images go here
├── src/
│   ├── app/             # Next.js pages
│   ├── components/      # React components
│   └── styles/          # CSS styles
├── content/
│   ├── projects/        # Project markdown files
│   └── settings/        # Site settings
├── package.json         # Dependencies
├── netlify.toml         # Netlify configuration
└── README.md            # This file
```

## Customization

### Changing Colors
Edit `tailwind.config.js`:
```js
colors: {
  'primary-dark': '#2D1B4E',  // Deep purple
  'primary': '#4B0082',        // Purple
  'accent': '#B87333',         // Copper/bronze
  // etc.
}
```

### Changing Fonts
Edit `src/app/layout.tsx`:
```ts
import { Inter, YourFont } from 'next/font/google'
```

## Troubleshooting

**Build fails on Netlify:**
- Check the deploy log in Netlify dashboard
- Most common: Missing dependencies
- Solution: Make sure `package.json` is complete

**CMS not working:**
- Make sure Netlify Identity is enabled
- Make sure Git Gateway is enabled
- Check you're invited as a user

**Images not uploading:**
- Check file size (keep under 5MB)
- Check format (JPG, PNG, WebP, SVG)
- Try different browser if issues persist

**Site not updating after CMS publish:**
- Wait 60-90 seconds for rebuild
- Check "Deploys" tab in Netlify for status
- If stuck, trigger manual deploy

## Support

If you need help:
1. Check this README first
2. Check Netlify deploy logs
3. Contact Garrison (me!) - I'll help fix it

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Export static site
npm run export
```

## Updating Content Without CMS

If you prefer to edit files directly:

**To add a project:**
1. Create file in `content/projects/project-name.md`
2. Add frontmatter (see existing files)
3. Write content in Markdown
4. Run `npm run build && npm run export`
5. Deploy

**To change images:**
1. Add images to `public/images/`
2. Reference in markdown: `![Alt text](/images/your-image.jpg)`
3. Rebuild and deploy

## Performance

- Lighthouse score: 95+ 
- First Contentful Paint: < 1.5s
- Fully static (no server needed)
- Automatic image optimization
- CDN distribution via Netlify

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari iOS 12+
- Mobile Chrome Android 8+

## License

© 2025 Garrison Brooks. All rights reserved.

---

Built with ❤️ using Next.js, Tailwind CSS, and Netlify CMS
