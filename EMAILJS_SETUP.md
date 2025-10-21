# EmailJS Setup Instructions for Contact Form

This document explains how to configure EmailJS for the Cardiff International Church contact form.

## Overview

The contact form uses EmailJS to send emails directly from the browser without requiring a backend server. This is a secure and reliable way to handle contact form submissions.

## Setup Steps

### 1. Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

### 2. Add an Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Note down your **Service ID** (e.g., `service_abc123`)

### 3. Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Configure the template as follows:

**Template Name:** `Contact Form Submission`

**Subject Line:** 
```
New Contact Form Message from {{from_name}}
```

**Email Body:**
- Switch to **HTML** mode (toggle in the editor)
- Open the file `EMAILJS_TEMPLATE.html` from your project folder
- Copy the entire HTML content
- Paste it into the EmailJS template editor

**Alternative - Simple Text Template:**
If you prefer a plain text email, use this instead:
```
Hello {{to_name}},

You have received a new message from the Cardiff International Church contact form.

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent via the CIC website contact form.
Reply directly to this email to respond to {{from_name}}.
```

4. **Important Settings:**
   - Set "From Name" to: `CIC Website Contact Form`
   - Set "Reply To" to: `{{from_email}}` (this allows you to reply directly to the sender)
   
5. Click **Save** and note down your **Template ID** (e.g., `template_xyz789`)

### 4. Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `AbCdEfGhIjKlMnOp`)
3. Copy this key

### 5. Update the Website Code

Open `js/main.js` and update the following values:

**Line 413:** Replace `YOUR_PUBLIC_KEY` with your actual public key
```javascript
emailjs.init('YOUR_PUBLIC_KEY'); 
```

**Line 480:** Replace `YOUR_SERVICE_ID` with your service ID
```javascript
const serviceID = 'YOUR_SERVICE_ID';
```

**Line 481:** Replace `YOUR_TEMPLATE_ID` with your template ID
```javascript
const templateID = 'YOUR_TEMPLATE_ID';
```

### 6. Test the Contact Form

1. Open the contact page in your browser
2. Fill out the form with test data
3. Submit the form
4. Check your email inbox for the test message
5. Check the browser console for any errors

## Template Variables

The following variables are sent from the form to EmailJS:

- `from_name` - The sender's name
- `from_email` - The sender's email address
- `phone` - The sender's phone number (optional)
- `subject` - The message subject (optional)
- `message` - The message content
- `to_name` - Set to "Cardiff International Church"

## Troubleshooting

### Form not sending emails

1. Check browser console for errors
2. Verify all three IDs are correct (Public Key, Service ID, Template ID)
3. Ensure EmailJS script is loaded (check Network tab in DevTools)
4. Check EmailJS dashboard for error logs

### Emails going to spam

1. Add your domain to EmailJS allowed domains
2. Use a professional email service (not free Gmail)
3. Set up SPF and DKIM records for your domain

### Rate limiting

The free EmailJS plan allows 200 emails per month. If you exceed this:
1. Upgrade to a paid plan
2. Add rate limiting to the form
3. Consider alternative solutions

## Security Notes

- The Public Key is safe to expose in client-side code
- Never expose your Private Key
- EmailJS automatically protects against spam
- Consider adding reCAPTCHA for additional protection

## Support

For EmailJS support, visit:
- Documentation: https://www.emailjs.com/docs/
- Support: https://www.emailjs.com/support/

For website issues, contact the development team.
