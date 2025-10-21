# Quick Start Guide

Get your Cardiff International Church website deployed in minutes!

## 🚀 Prerequisites

- [Node.js](https://nodejs.org/) installed (LTS version recommended)
- A [Firebase](https://firebase.google.com/) account (free)
- A [EmailJS](https://www.emailjs.com/) account (free)

## 📋 Step-by-Step Setup

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Create Firebase Project

Go to [Firebase Console](https://console.firebase.google.com/):
1. Click "Add Project"
2. Name it: `cic-website` (or your choice)
3. Disable Google Analytics (optional)
4. Click "Create Project"

### 4. Initialize Firebase

In your project directory:

```bash
cd d:\Software-Development\cic-website
firebase init hosting
```

**Prompts:**
- Select your project: `cic-website-245dd`
- Public directory: `.` (dot)
- Single-page app: `N`
- GitHub integration: `N`
- Overwrite files: `N`

### 5. Update Project ID

If you used a different name, edit `.firebaserc`:

```json
{
  "projects": {
    "default": "your-project-id-here"
  }
}
```

### 6. Configure EmailJS

See `EMAILJS_SETUP.md` for detailed instructions, or:

1. Create account at [EmailJS](https://www.emailjs.com/)
2. Add email service (Gmail, Outlook, etc.)
3. Create email template using `EMAILJS_TEMPLATE.html`
4. Get your Public Key, Service ID, and Template ID
5. Update `js/main.js`:
   - Line 413: Public Key
   - Line 530: Service ID
   - Line 531: Template ID

### 7. Deploy!

```bash
firebase deploy
```

Or use the script:
```bash
deploy.bat
```

### 8. Done! 🎉

Your website is now live! You'll see:

```
✔  Deploy complete!

Hosting URL: https://cic-website.web.app
```

## 🔧 Common Tasks

### Update Website

1. Make your changes
2. Test locally (open HTML files in browser)
3. Deploy: `firebase deploy`

### View Deployment

```bash
firebase hosting:channel:list
```

### Rollback Deployment

In Firebase Console:
1. Go to Hosting → Release history
2. Select previous version
3. Click "Rollback"

## 📞 Need Help?

- **Firebase Issues:** See `FIREBASE_DEPLOYMENT.md`
- **EmailJS Issues:** See `EMAILJS_SETUP.md`
- **General Questions:** Contact the development team

## ✅ Checklist

Before going live, verify:

- [ ] EmailJS is configured and tested
- [ ] Contact form sends emails correctly
- [ ] All pages load without errors
- [ ] Images display properly
- [ ] Navigation works on all pages
- [ ] Mobile responsive design works
- [ ] All links are correct
- [ ] Social media links work
- [ ] Phone numbers are correct
- [ ] Address is accurate

## 🌐 Custom Domain (Optional)

To use your own domain (e.g., cardiffinternationalchurch.org):

1. In Firebase Console → Hosting → Add custom domain
2. Enter your domain
3. Add DNS records to your domain registrar
4. Wait for SSL certificate (up to 24 hours)

See `FIREBASE_DEPLOYMENT.md` for detailed instructions.

## 💰 Cost

Firebase Free Tier includes:
- ✅ 10 GB storage
- ✅ 360 MB/day bandwidth
- ✅ Free SSL certificate
- ✅ Custom domain support
- ✅ Global CDN

Perfect for church websites!

---

**Your website is ready to go live! 🚀**
