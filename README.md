# RN Herbal India Email Order Form

A production-ready order form with email notifications and deployment to Vercel & Render.

## 🚀 Quick Start - 3 Steps

### 1. Install & Configure
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your SMTP credentials
npm start
```
Open http://localhost:3000

### 2. Get Gmail App Password
1. Go to https://myaccount.google.com/apppasswords
2. Generate password, paste into `.env`

### 3. Deploy
- **Vercel**: `npm install -g vercel && vercel`
- **Render**: Push to GitHub, connect in dashboard

---

## 📖 Documentation

Start with one of these guides based on your need:

### 🎯 **For Beginners**: [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
Quick 3-step deployment guide with all commands

### 📚 **For Details**: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
Complete step-by-step with screenshots and troubleshooting

### ✅ **For Checklist**: [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
Verify everything before and after deployment

### 🔧 **For Setup**: [SETUP_AND_DEPLOYMENT.md](SETUP_AND_DEPLOYMENT.md)
Full project overview and feature list

---

## 📁 Project Structure

```
.
├── frontend/
│   ├── index.html (landing page)
│   ├── order.html (order form)
│   └── assets/ (css, js, images)
├── backend/
│   ├── src/server.js (Express server)
│   ├── src/emailTemplates.js
│   └── .env.example (configuration)
├── vercel.json (Vercel config)
├── render.yaml (Render config)
└── DEPLOYMENT_GUIDE.md (see above)
```

---

## ✨ Features

- ✅ Responsive order form
- ✅ Email notifications (admin + customer)
- ✅ Gmail SMTP integration
- ✅ CORS support for separate deployments
- ✅ Production-ready deployments
- ✅ Health check endpoint
- ✅ Input validation

---

## 🌐 API Endpoints

| URL | Purpose |
|-----|---------|
| `GET /` | Landing page |
| `GET /order` | Order form |
| `POST /api/orders` | Submit order |
| `GET /health` | Health check |

---

## 🔐 Environment Variables

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
MAIL_FROM=Your Name <email@gmail.com>
ORDER_NOTIFICATION_EMAIL=admin@gmail.com
FRONTEND_URL=https://your-domain.com (optional)
PORT=3000
```

---

## 🚀 Deploy Now

### Pick Your Platform:

**Vercel** (Recommended for beginners)
- No server management needed
- Always free tier available
- [Follow QUICK_REFERENCE.md](QUICK_REFERENCE.md)

**Render** (More control)
- Docker-friendly
- Good uptime
- [Follow QUICK_REFERENCE.md](QUICK_REFERENCE.md)

---

## 🐛 Troubleshooting

### Emails not sending?
→ See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md#troubleshooting)

### Getting 404 errors?
→ Check environment variables in deployment dashboard

### CORS issues?
→ Already handled! Check [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

---

## 📞 Common Tasks

**Run locally**:
```bash
cd backend && npm install && npm start
```

**Test health endpoint**:
```bash
curl http://localhost:3000/health
```

**View logs (after deployment)**:
- Vercel: Dashboard → Logs
- Render: Dashboard → Logs

---

## 📋 Files in This Project

| File | Purpose |
|------|---------|
| **QUICK_REFERENCE.md** | ⭐ Start here for deployment |
| **DEPLOYMENT_GUIDE.md** | Full step-by-step instructions |
| **DEPLOYMENT_CHECKLIST.md** | Pre & post-deployment verification |
| **SETUP_AND_DEPLOYMENT.md** | Project overview |
| **DEPLOYMENT_GUIDE.md** | Testing and monitoring |

---

## ✅ What's Fixed

- ✅ CORS headers added for separate deployments
- ✅ Vercel deployment config (`vercel.json`)
- ✅ Render deployment config (`render.yaml`)
- ✅ Environment variable templates
- ✅ Comprehensive deployment guides
- ✅ Syntax validation (no errors)
- ✅ Production-ready error handling
- ✅ Health check endpoint working

---

## 🎯 Next Steps

1. **Read**: [QUICK_REFERENCE.md](QUICK_REFERENCE.md) (5 min read)
2. **Prepare**: Get Gmail app password
3. **Deploy**: Choose Vercel or Render
4. **Test**: Fill out order form and verify emails arrive
5. **Monitor**: Use `/health` endpoint

---

## 📞 Need Help?

1. Check the [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) troubleshooting section
2. Verify all environment variables are set
3. Check deployment logs (Vercel/Render dashboard)
4. Ensure Gmail app password is 16-character (from apppasswords page)

---

**Ready to deploy? Start with [QUICK_REFERENCE.md](QUICK_REFERENCE.md)!** → 👉
