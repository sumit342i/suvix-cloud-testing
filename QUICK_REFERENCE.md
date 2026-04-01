# ⚡ Quick Deployment Reference

## Option 1: Deploy to Vercel (Easiest) ⭐

### Step 1: Prepare Code
```bash
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Push to GitHub
1. Create repo at https://github.com/new
2. Push your code using GitHub's instructions

### Step 3: Deploy on Vercel
1. Go to https://vercel.com
2. Sign up / Log in
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_PORT` = `465`
   - `SMTP_SECURE` = `true`
   - `SMTP_USER` = `digital.work.3442@gmail.com`
   - `SMTP_PASS` = (16-char Gmail app password)
   - `MAIL_FROM` = `RN Herbal India <digital.work.3442@gmail.com>`
   - `ORDER_NOTIFICATION_EMAIL` = `digital.work.3442@gmail.com`
6. Click "Deploy"
7. Wait 1-2 minutes
8. Done! Your app is live 🎉

### Get Gmail App Password (Required)
1. Go to https://myaccount.google.com/apppasswords
2. Enable 2-Step Verification first if not done
3. Select "Mail" and "Windows Computer"
4. Copy the password and paste in Vercel

---

## Option 2: Deploy to Render (More Control)

### Step 1: Same as Vercel
Push code to GitHub (Steps 1-2 above)

### Step 2: Deploy on Render
1. Go to https://render.com
2. Sign up / Log in with GitHub
3. Click "New Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `rn-herbal-backend`
   - **Region**: Closest to you
   - **Branch**: `main`
   - **Build Command**: `npm install --prefix backend`
   - **Start Command**: `cd backend && npm start`
   - **Runtime**: Node 18.x
6. Add same environment variables as Vercel
7. Click "Create Web Service"
8. Wait 2-5 minutes
9. Done! 🎉

---

## Quick Commands

### Test Locally
```bash
cd backend
npm install
npm start
# Open: http://localhost:3000
```

### Verify SMTP Setup
```bash
curl -X GET "https://your-deployment.com/health"
# Should show: {"ok":true,"mailerConfigured":true}
```

### Check Logs
- **Vercel**: Dashboard → Deployments → Click latest → Logs
- **Render**: Dashboard → Logs tab

---

## Common Issues & Fixes

### ❌ "Emails not sending"
✅ **Fix**: Verify SMTP_PASS is a 16-char Google App Password (not regular password)

### ❌ "Page shows 404"  
✅ **Fix**: Ensure all environment variables are set in deployment dashboard

### ❌ "CORS errors"
✅ **Fix**: This is normal for localhost. On production, it's handled automatically.

### ❌ "Can't generate Google App Password"
✅ **Steps**:
1. Go to https://myaccount.google.com/security
2. Make sure **2-Step Verification is ON**
3. Then go to https://myaccount.google.com/apppasswords
4. Select "Mail" and "Windows Computer"
5. Click Generate

---

## Test Your Deployment

After deployment:

1. **Visit homepage**: https://your-app.com
2. **Test order form**: https://your-app.com/order
   - Fill form completely
   - Click "PLACE ORDER NOW"
   - Should see success message
3. **Check emails**:
   - Admin should receive order at `ORDER_NOTIFICATION_EMAIL`
   - Customer should receive confirmation at their email
   - Check spam folder if not found

---

## File Checklist

Before deployment, ensure these files exist:

- ✅ `vercel.json` - Vercel configuration
- ✅ `render.yaml` - Render configuration  
- ✅ `backend/.env.example` - Environment template
- ✅ `DEPLOYMENT_GUIDE.md` - Full deployment instructions
- ✅ `DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist

---

## Need Help?

1. **Full Guide**: See `DEPLOYMENT_GUIDE.md`
2. **Step-by-Step**: Follow `DEPLOYMENT_CHECKLIST.md`
3. **This Quick Ref**: You're reading it! 😊

---

**Ready? Pick Vercel or Render above and follow the 3 steps!** 🚀
