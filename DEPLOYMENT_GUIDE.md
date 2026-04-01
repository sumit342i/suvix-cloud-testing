# Deployment Guide

This guide covers deploying your RN Herbal India application to **Vercel** and **Render**.

---

## Prerequisites

- Git account (GitHub, GitLab, or Bitbucket)
- Your SMTP credentials (Gmail recommended)
  - Gmail: Set `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`
  - For other providers, update accordingly in the `.env` file

---

## Option 1: Deploy to Vercel

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub**:
   - Create a new repository on [GitHub.com](https://github.com/new)
   - Copy the commands to push your code:
     ```bash
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
     git branch -M main
     git push -u origin main
     ```

### Step 2: Create Vercel Project

1. Go to [vercel.com](https://vercel.com) and sign up/log in
2. Click **"New Project"**
3. **Import Git Repository**:
   - Select your GitHub repository
   - Click **Import**

### Step 3: Configure Environment Variables

1. In the Vercel dashboard, go to **Settings** → **Environment Variables**
2. Add the following variables:

   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=digital.work.3442@gmail.com
   SMTP_PASS=your-16-character-google-app-password
   MAIL_FROM=RN Herbal India <digital.work.3442@gmail.com>
   ORDER_NOTIFICATION_EMAIL=digital.work.3442@gmail.com
   FRONTEND_URL=https://your-vercel-domain.vercel.app
   PORT=3000
   ```

   **For Gmail App Password** (recommended):
   1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   2. Ensure you have **2-Step Verification** enabled
   3. Select "Mail" and "Windows Computer"
   4. Generate a 16-character password
   5. Copy and paste it as `SMTP_PASS`

### Step 4: Deploy

1. Click **Deploy**
2. Wait for the deployment to complete (usually 1-2 minutes)
3. Your app will be available at `https://your-project-name.vercel.app`

### Step 5: Test

1. Open your deployment URL
2. Fill out the order form
3. Check that emails are sent to your notification email

---

## Option 2: Deploy to Render

### Step 1: Prepare Your Repository

Same as Vercel - ensure your code is pushed to GitHub.

### Step 2: Create Render Service

1. Go to [render.com](https://render.com) and sign up/log in
2. Click **"New +"** → **"Web Service"**
3. **Connect with GitHub**
4. **Select your repository**
5. **Configure the service**:
   - Name: `rn-herbal-backend`
   - Environment: `Node`
   - Region: Select closest to your users (e.g., `Singapore` for India)
   - Branch: `main`
   - Build Command: `npm install --prefix backend`
   - Start Command: `cd backend && npm start`
   - **Important**: Set **Runtime** to `Node 18+`

### Step 3: Set Environment Variables

1. Scroll down to **Environment** section
2. Click **"Add Environment Variable"**
3. Add all variables from the `backend/.env.example`:

   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=digital.work.3442@gmail.com
   SMTP_PASS=your-16-character-google-app-password
   MAIL_FROM=RN Herbal India <digital.work.3442@gmail.com>
   ORDER_NOTIFICATION_EMAIL=digital.work.3442@gmail.com
   FRONTEND_URL=https://your-render-domain.onrender.com
   PORT=3000
   ```

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Render will automatically build and deploy your app
3. Wait for deployment to complete (usually 2-5 minutes)
4. Your app will be available at `https://your-service-name.onrender.com`

### Step 5: Keep Service Running (Paid Feature)

By default, Render spins down free services. For production:
- **Upgrade to Paid Plan** (recommended for production)
- Or use Vercel which keeps free services running

---

## Option 3: Deploy to Both (Recommended)

You can deploy to both platforms for redundancy:

1. **Backend on Render** (more reliable for serverless)
2. **Frontend on Vercel** (or just serve from backend)

**For separate deployment:**
- Update `FRONTEND_URL` environment variable on both services
- Ensure CORS is properly configured in `backend/src/server.js`

---

## Troubleshooting

### Emails Not Sending

1. **Check SMTP credentials**:
   ```bash
   curl -X GET "https://your-deployment.com/health"
   ```
   Should return: `{"ok": true, "mailerConfigured": true}`

2. **Verify Gmail App Password**:
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Ensure you created a new app password (not using your regular password)

3. **Check logs**:
   - **Vercel**: Dashboard → Deployments → Click deployment → View logs
   - **Render**: Dashboard → Logs tab

### 404 Errors on Frontend

Make sure:
- `FRONTEND_URL` environment variable is set
- Image paths are relative (already fixed in this version)
- Static files are being served from `frontend/` directory

### CORS Errors

The backend now has CORS enabled. If you still get errors:
1. Add your frontend domain to `ALLOWED_ORIGINS` in `backend/src/server.js`
2. Redeploy the backend

---

## Custom Domain Configuration

### On Vercel

1. Go to **Settings** → **Domains**
2. Add your custom domain (e.g., `rnherbalindia.com`)
3. Update your DNS provider with the provided records
4. Wait for DNS propagation (up to 48 hours)

### On Render

1. Go to **Settings** → **Custom Domains**
2. Add your custom domain
3. Update your DNS provider with the provided CNAME record
4. Mark as verified

---

## Production Checklist

- [ ] Environment variables are set in production
- [ ] Gmail App Password is being used (not regular password)
- [ ] `ORDER_NOTIFICATION_EMAIL` is set to your email
- [ ] Custom domain is configured (optional)
- [ ] CORS is working properly
- [ ] Test order submission works end-to-end
- [ ] Check email received in notification inbox
- [ ] Customer confirmation email is working

---

## Monitoring

### Check Health Endpoint

Visit this URL to check if everything is working:
```
https://your-deployment.com/health
```

Should return (if configured correctly):
```json
{
  "ok": true,
  "mailerConfigured": true
}
```

---

## Support

For issues:
1. Check the logs in your deployment dashboard
2. Verify SMTP credentials
3. Ensure all environment variables are set
4. Make sure the image files exist in `frontend/assets/images/`

