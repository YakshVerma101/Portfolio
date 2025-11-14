# EmailJS Setup Instructions

To enable the contact form to send emails to your inbox, you need to set up EmailJS (it's free for up to 200 emails/month).

## Quick Setup Guide

### Step 1: Create an EmailJS Account
1. Go to **https://www.emailjs.com/**
2. Click "Sign Up" (top right)
3. Sign up with your email (you can use `yakshverma101@gmail.com`)
4. Verify your email address

### Step 2: Add an Email Service (Connect Your Gmail)
1. After logging in, go to **https://dashboard.emailjs.com/admin/integration**
2. Click **"Add New Service"** button
3. Select **"Gmail"** (or your email provider)
4. Click **"Connect Account"** and authorize EmailJS to send emails on your behalf
5. Give it a name like "Portfolio Contact Form"
6. **Copy the Service ID** - it looks like `service_xxxxxxxxx` (you'll need this!)

### Step 3: Create an Email Template
1. Go to **https://dashboard.emailjs.com/admin/template**
2. Click **"Create New Template"**
3. Fill in the following:
   - **Template Name**: "Portfolio Contact Form"
   - **Subject**: `New Contact Form Message from {{from_name}}`
   - **Content** (HTML or plain text):
     ```
     You have a new message from your portfolio contact form.
     
     From: {{from_name}}
     Email: {{from_email}}
     
     Message:
     {{message}}
     ```
   - **To Email**: `yakshverma101@gmail.com` (your email)
   - **From Name**: `{{from_name}}`
   - **From Email**: `{{from_email}}`
   - **Reply To**: `{{from_email}}` (so you can reply directly)
4. Click **"Save"**
5. **Copy the Template ID** - it looks like `template_xxxxxxxxx` (you'll need this!)

### Step 4: Get Your Public Key
1. Go to **https://dashboard.emailjs.com/admin/account/general**
2. Scroll down to find **"Public Key"**
3. **Copy the Public Key** - it's a long string (you'll need this!)

### Step 5: Update Your Code
Once you have all three values, I'll update `script.js` with your credentials, or you can update these lines:
- Line 66: Replace `'YOUR_SERVICE_ID'` with your Service ID
- Line 67: Replace `'YOUR_TEMPLATE_ID'` with your Template ID  
- Line 68: Replace `'YOUR_PUBLIC_KEY'` with your Public Key

## Testing
1. Open your portfolio website in a browser
2. Scroll to the contact form
3. Fill it out with a test message
4. Submit it
5. Check your email inbox (and spam folder) for the message!

## Troubleshooting
- **No email received?** Check spam folder first
- **Error message?** Open browser console (F12) and check for errors
- **Service not working?** Make sure your EmailJS service is "Active" in the dashboard
- **Template variables?** Make sure your template uses: `{{from_name}}`, `{{from_email}}`, `{{message}}`

## Need Help?
Once you have your three credentials (Service ID, Template ID, Public Key), share them with me and I'll update the code for you!

