# Deployment Checklist

Use this checklist to ensure your deployment is successful.

## Pre-Deployment

- [ ] Code is tested locally (`npm start` works at `http://localhost:3000`)
- [ ] `.env` file has valid SMTP credentials (Gmail app password)
- [ ] All environment variables are set in deployment platform
- [ ] Git repository is initialized and code is committed
- [ ] Code is pushed to GitHub/GitLab/Bitbucket

## Environment Variables to Set

**For Vercel or Render**, add these in your dashboard:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=digital.work.3442@gmail.com
SMTP_PASS=your-16-character-google-app-password
MAIL_FROM=RN Herbal India <digital.work.3442@gmail.com>
ORDER_NOTIFICATION_EMAIL=digital.work.3442@gmail.com
FRONTEND_URL=https://your-deployment-domain.com
NODE_ENV=production
PORT=3000
```

## Vercel Deployment Checklist

- [ ] Signed up at [vercel.com](https://vercel.com)
- [ ] Connected GitHub repository to Vercel
- [ ] Added all environment variables in Vercel dashboard
- [ ] Created deployment (should take 1-2 minutes)
- [ ] Noted the deployment URL (e.g., `your-app.vercel.app`)
- [ ] Tested `/health` endpoint: `https://your-app.vercel.app/health`

## Render Deployment Checklist

- [ ] Signed up at [render.com](https://render.com)
- [ ] Created new Web Service from GitHub repository
- [ ] Set Build Command: `npm install --prefix backend`
- [ ] Set Start Command: `cd backend && npm start`
- [ ] Added all environment variables in Render dashboard
- [ ] Deployment completed (should take 2-5 minutes)
- [ ] Noted the deployment URL (e.g., `your-app.onrender.com`)
- [ ] Tested `/health` endpoint: `https://your-app.onrender.com/health`

## Post-Deployment Testing

After deployment:

1. **Test Health Endpoint**:
   ```
   GET https://your-deployment.com/health
   ```
   Should return: `{"ok":true,"mailerConfigured":true}`

2. **Test Landing Page**:
   - Visit `https://your-deployment.com`
   - Should display landing page with product information

3. **Test Order Form**:
   - Visit `https://your-deployment.com/order`
   - Fill in form with test data
   - Click "PLACE ORDER NOW"
   - Should see success message

4. **Verify Emails**:
   - Check inbox of `ORDER_NOTIFICATION_EMAIL` for admin email
   - Check the customer's email for confirmation email
   - Check spam/promotions folder if not found

## Troubleshooting

### Health Check Shows `"mailerConfigured": false`

- Verify all SMTP environment variables are set
- Check that `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` are all present
- Ensure no extra spaces in values

### Order Form Submits but No Emails Arrive

1. Check deployment logs for errors
2. Verify SMTP credentials are correct
3. Check spam/promotions folder in Gmail
4. Try a different email address for testing

### 404 Errors on Pages

- Ensure static files are being served from `/frontend`
- Check that all image paths are relative (not absolute)
- Verify the deployment includes the `frontend/` directory

### CORS Errors in Console

- Update `ALLOWED_ORIGINS` in `backend/src/server.js` with your deployment URL
- Redeploy the backend

## Monitoring

Once deployed:

1. **Check logs regularly** in your deployment dashboard
2. **Monitor email delivery** - check if orders are coming through
3. **Test `/health` endpoint** periodically
4. **Keep `.env` credentials secure** - never commit them to Git

## Scale Up (Optional)

If you need more features:

- Add payment gateway integration (Razorpay, Stripe)
- Add SMS notifications
- Store orders in a database (MongoDB, PostgreSQL)
- Add admin dashboard
- Implement order tracking

---

**When you're done with all checks, your deployment is ready for production!** 🎉
