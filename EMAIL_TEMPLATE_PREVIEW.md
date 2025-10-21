# Email Template Preview

This document shows what the contact form email will look like when received.

## Email Template Features

### 📧 Professional HTML Design
- **Responsive layout** - Works on desktop and mobile
- **Church branding** - Gold gradient header matching website colors
- **Clean structure** - Easy to read and professional

### 📋 Information Included

The email template displays all form fields:

1. **Name** - The sender's full name
2. **Email** - Clickable email address (mailto link)
3. **Phone** - Phone number (or "Not provided" if empty)
4. **Subject** - Message subject (or "General Enquiry" if empty)
5. **Message** - Full message content with preserved formatting

### 🎨 Visual Elements

- **Gold header** (#b8860b) with white text
- **Structured table** with alternating row colors for easy reading
- **Message box** with gold left border for emphasis
- **Reply button** - One-click reply to sender
- **Footer** with church contact information

### ✉️ Email Subject Line

```
New Contact Form Message from [Sender's Name]
```

Example: `New Contact Form Message from John Smith`

### 🔄 Reply-To Configuration

When you set up the template in EmailJS:
- Set **Reply To** field to: `{{from_email}}`
- This allows you to click "Reply" in your email client and it will automatically reply to the person who filled out the form

## Template Variables Used

The following variables are automatically replaced by EmailJS:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{from_name}}` | Sender's name | John Smith |
| `{{from_email}}` | Sender's email | john@example.com |
| `{{phone}}` | Phone number | 07123 456789 |
| `{{subject}}` | Message subject | Prayer Request |
| `{{message}}` | Message content | I would like to know more about... |
| `{{to_name}}` | Recipient name | Cardiff International Church |

## Example Email Preview

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│           New Contact Form Message                      │
│        Cardiff International Church Website             │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  You have received a new message from the Cardiff       │
│  International Church contact form.                     │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ NAME:     John Smith                             │  │
│  │ EMAIL:    john.smith@example.com                 │  │
│  │ PHONE:    07123 456789                           │  │
│  │ SUBJECT:  Sunday Service Enquiry                 │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  MESSAGE:                                               │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Hello, I'm interested in attending the Sunday    │  │
│  │ service. What time does it start and is there    │  │
│  │ parking available nearby?                        │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│              [Reply to John Smith]                      │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│         Cardiff International Church                    │
│    Cathays Terrace, Cathays, Cardiff, CF24 4HS, UK    │
│       cardiffinternationalchurch@gmail.com             │
│                                                         │
│   This message was sent via the CIC website contact    │
│                       form                              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Setup Instructions

1. Open `EMAILJS_TEMPLATE.html` in a text editor
2. Copy the entire HTML content
3. Go to EmailJS dashboard → Email Templates
4. Create new template or edit existing one
5. Switch to HTML mode
6. Paste the HTML content
7. Set subject line: `New Contact Form Message from {{from_name}}`
8. Set Reply-To: `{{from_email}}`
9. Save the template

## Testing

After setup, send a test message through the contact form to verify:
- ✅ All fields appear correctly
- ✅ Email formatting looks good
- ✅ Reply button works
- ✅ Reply-To is set to sender's email
- ✅ Links are clickable

## Customization

You can customize the template by editing `EMAILJS_TEMPLATE.html`:
- Change colors (search for `#b8860b` to change gold color)
- Modify layout and spacing
- Add church logo (upload to EmailJS and use image URL)
- Adjust fonts and sizes
