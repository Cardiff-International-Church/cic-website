# Firebase Deployment Guide

This guide will help you deploy the Cardiff International Church website to Firebase Hosting.

## Prerequisites

1. **Node.js and npm** - Install from [nodejs.org](https://nodejs.org/)
2. **Firebase Account** - Create a free account at [firebase.google.com](https://firebase.google.com/)
3. **Firebase CLI** - Install globally via npm

## Step-by-Step Deployment

### 1. Install Firebase CLI

Open your terminal/command prompt and run:

```bash
npm install -g firebase-tools
```

Verify installation:
```bash
firebase --version
```

### 2. Login to Firebase

```bash
firebase login
```

This will open your browser to authenticate with your Google account.

### 3. Create a Firebase Project

**Option A: Via Firebase Console (Recommended)**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: `cic-website` (or your preferred name)
4. Disable Google Analytics (optional for a static website)
5. Click "Create Project"

**Option B: Via CLI**
```bash
firebase projects:create cic-website
```

### 4. Initialize Firebase in Your Project

Navigate to your project directory:
```bash
cd d:\Software-Development\cic-website
```

Initialize Firebase:
```bash
firebase init hosting
```

**Answer the prompts as follows:**

1. **Select a default Firebase project:** 
   - Choose the project you created (e.g., `cic-website`)

2. **What do you want to use as your public directory?**
   - Enter: `.` (current directory)

3. **Configure as a single-page app (rewrite all urls to /index.html)?**
   - Enter: `N` (No)

4. **Set up automatic builds and deploys with GitHub?**
   - Enter: `N` (No) - unless you want GitHub integration

5. **File . already exists. Overwrite?**
   - Enter: `N` (No) - we already have the firebase.json configured

### 5. Update Firebase Project ID

If you used a different project name, update `.firebaserc`:

```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

### 6. Deploy to Firebase

Deploy your website:

```bash
firebase deploy
```

Or deploy only hosting:
```bash
firebase deploy --only hosting
```

### 7. View Your Deployed Website

After deployment, you'll see output like:

```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/cic-website/overview
Hosting URL: https://cic-website.web.app
```

Your website is now live at the Hosting URL!

## Custom Domain Setup (Optional)

### 1. Add Custom Domain

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Hosting** → **Add custom domain**
4. Enter your domain (e.g., `cardiffinternationalchurch.org`)
5. Follow the verification steps

### 2. Update DNS Records

Add the DNS records provided by Firebase to your domain registrar:

**A Records:**
```
@    A    151.101.1.195
@    A    151.101.65.195
```

**Or CNAME (for subdomain):**
```
www    CNAME    cic-website.web.app
```

### 3. Wait for SSL Certificate

Firebase automatically provisions an SSL certificate. This may take up to 24 hours.

## Useful Firebase Commands

### View Current Deployments
```bash
firebase hosting:channel:list
```

### Deploy to Preview Channel (Testing)
```bash
firebase hosting:channel:deploy preview
```

### View Hosting Sites
```bash
firebase hosting:sites:list
```

### Open Firebase Console
```bash
firebase open hosting
```

### View Deployment History
```bash
firebase hosting:channel:list
```

## Project Structure

```
cic-website/
├── .firebaserc          # Firebase project configuration
├── firebase.json        # Firebase hosting configuration
├── .gitignore          # Git ignore file
├── index.html          # Homepage
├── contact.html        # Contact page
├── about.html          # About page
├── css/                # Stylesheets
├── js/                 # JavaScript files
├── images/             # Image assets
└── ...                 # Other HTML pages
```

## Configuration Files Explained

### firebase.json
- **public**: `.` - Serves files from the current directory
- **ignore**: Files/folders to exclude from deployment
- **rewrites**: URL rewriting rules (currently set for SPA fallback)
- **headers**: Cache control headers for performance
- **cleanUrls**: Removes `.html` from URLs
- **trailingSlash**: Removes trailing slashes

### .firebaserc
- Stores your Firebase project ID
- Allows multiple environments (dev, staging, production)

## Updating Your Website

After making changes to your website:

1. **Test locally** - Open files in browser to verify changes
2. **Deploy updates**:
   ```bash
   firebase deploy
   ```
3. **Verify deployment** - Visit your hosting URL

## Rollback to Previous Version

If something goes wrong:

```bash
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL_ID TARGET_SITE_ID:live
```

Or use the Firebase Console:
1. Go to Hosting → Release history
2. Click on a previous deployment
3. Click "Rollback"

## Performance Optimization

The `firebase.json` includes:
- **Cache headers** for images (1 year)
- **Cache headers** for CSS/JS (1 year)
- **Cache headers** for HTML (1 hour)
- **Clean URLs** for better SEO
- **Compression** (automatic by Firebase)

## Security

Firebase Hosting automatically provides:
- ✅ Free SSL certificate
- ✅ HTTPS enforcement
- ✅ DDoS protection
- ✅ Global CDN
- ✅ Automatic compression

## Monitoring

View analytics in Firebase Console:
1. Go to your project
2. Click **Hosting**
3. View traffic, bandwidth, and requests

## Troubleshooting

### Issue: "Permission denied"
**Solution:** Run `firebase login` again

### Issue: "Project not found"
**Solution:** Check `.firebaserc` has correct project ID

### Issue: "Deploy failed"
**Solution:** 
- Check `firebase.json` syntax
- Ensure all referenced files exist
- Run `firebase deploy --debug` for detailed logs

### Issue: "404 errors after deployment"
**Solution:**
- Verify file paths are correct
- Check `firebase.json` rewrites
- Ensure files are in the public directory

## Cost

Firebase Hosting Free Tier includes:
- ✅ 10 GB storage
- ✅ 360 MB/day bandwidth
- ✅ Custom domain
- ✅ SSL certificate
- ✅ Multiple sites

This is more than enough for most church websites!

## Support

- **Firebase Documentation:** https://firebase.google.com/docs/hosting
- **Firebase Support:** https://firebase.google.com/support
- **Community:** https://stackoverflow.com/questions/tagged/firebase-hosting

## Next Steps

After deployment:
1. ✅ Test all pages and links
2. ✅ Verify contact form works
3. ✅ Check mobile responsiveness
4. ✅ Test on different browsers
5. ✅ Set up custom domain (optional)
6. ✅ Configure Google Analytics (optional)
7. ✅ Submit sitemap to Google Search Console

---

**Your website is now live on Firebase! 🎉**
