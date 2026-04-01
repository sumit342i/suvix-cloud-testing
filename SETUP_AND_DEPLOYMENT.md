# RN Herbal India - Order Management System

A modern, responsive order form and email notification system for RN Herbal India products. Built with **Node.js + Express** backend and **HTML5 + CSS3** frontend.

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ installed
- Gmail account with 2-Step Verification enabled

### Setup

1. **Clone and install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

3. **Get Gmail App Password**:
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Generate a 16-character app password
   - Paste it into `backend/.env` as `SMTP_PASS`

4. **Start the server**:
   ```bash
   npm start
   ```

5. **Open your browser**:
   ```
   http://localhost:3000
   ```

---

## 📦 Project Structure

```
.
├── frontend/                 # HTML, CSS, JavaScript
│   ├── index.html           # Landing page
│   ├── order.html           # Order form page
│   └── assets/
│       ├── css/             # Styling
│       ├── js/              # Frontend scripts
│       └── images/          # Product images
├── backend/                  # Node.js server
│   ├── src/
│   │   ├── server.js        # Express server
│   │   └── emailTemplates.js # Email formatting
│   ├── .env.example         # Environment template
│   └── package.json
└── DEPLOYMENT_GUIDE.md      # Full deployment instructions
```

---

## 🌐 Deployment

### ✅ One-Command Deployment Options

**Deploy to Vercel** (Recommended for beginners):
```bash
npm install -g vercel
cd ../  # Go to root directory
vercel
```

**Deploy to Render**:
1. Push your code to GitHub
2. Connect your GitHub repo through [render.com](https://render.com)
3. Follow the environment variable setup in dashboard

### 📚 Full Deployment Guide

For step-by-step instructions with screenshots, see [**DEPLOYMENT_GUIDE.md**](./DEPLOYMENT_GUIDE.md)

---

## ✨ Features

- ✅ **Responsive Design** - Works on mobile, tablet, desktop
- ✅ **Order Form** - Captures customer details and creates orders
- ✅ **Email Notifications** - Sends confirmation to customers and admins
- ✅ **CORS Support** - Frontend and backend can be deployed separately
- ✅ **Gmail Integration** - Easy SMTP setup with Gmail
- ✅ **Production Ready** - Configured for Vercel and Render
- ✅ **Health Endpoint** - `/health` endpoint for monitoring

---

## 🔧 Technology Stack

- **Backend**: Node.js, Express.js, Nodemailer
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Email**: Google SMTP (Gmail)
- **Hosting**: Vercel or Render
- **Version Control**: Git + GitHub

---

## 🛠️ API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/` | GET | Serve landing page |
| `/order` | GET | Serve order form page |
| `/api/orders` | POST | Submit order and send emails |
| `/health` | GET | Check server and email status |

---

## 📧 Email Configuration

Currently configured for Gmail. To use a different provider:

1. Update in `backend/.env`:
   ```
   SMTP_HOST=your-smtp-host.com
   SMTP_PORT=585 or 465
   SMTP_SECURE=true or false
   SMTP_USER=your-email@example.com
   SMTP_PASS=your-app-password
   ```

2. Restart the backend service

---

## 🐛 Troubleshooting

### Emails Not Sending?

1. Check health status:
   ```bash
   curl https://your-deployment.com/health
   ```

2. Verify app password was created (not using regular Gmail password)

3. Check deployment logs:
   - **Vercel**: Dashboard → Deployments → Logs
   - **Render**: Dashboard → Logs

### Form Submitting But No Email?

1. Ensure SMTP credentials are correct in environment variables
2. Check spam/promotions folder in Gmail
3. Verify `ORDER_NOTIFICATION_EMAIL` is set correctly

---

## 📋 Environment Variables

| Variable | Example | Required |
|----------|---------|----------|
| `PORT` | `3000` | Yes |
| `SMTP_HOST` | `smtp.gmail.com` | Yes |
| `SMTP_PORT` | `465` | Yes |
| `SMTP_SECURE` | `true` | Yes |
| `SMTP_USER` | `email@gmail.com` | Yes |
| `SMTP_PASS` | `16-char-app-pwd` | Yes |
| `MAIL_FROM` | `Sender <email@gmail.com>` | No |
| `ORDER_NOTIFICATION_EMAIL` | `admin@gmail.com` | Yes |
| `FRONTEND_URL` | `https://example.com` | No |

---

## 🚀 Performance & Security

- ✅ CORS headers properly configured
- ✅ Input validation on all forms
- ✅ HTML escaping to prevent XSS
- ✅ Environment variables for secrets (not hardcoded)
- ✅ Compression and caching ready
- ✅ Error handling with safe messages

---

## 📞 Support

For issues or questions:

1. Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions
2. Review the logs in your deployment dashboard
3. Verify all environment variables are set
4. Ensure Gmail app password is generated correctly

---

## 📄 License

See [LICENSE.txt](./LICENSE.txt)

---

## 🎯 Next Steps

1. **Local Testing**: Follow "Quick Start" section
2. **Choose Platform**: Vercel (easier) or Render (more control)
3. **Deploy**: Follow [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
4. **Monitor**: Check `/health` endpoint periodically
5. **Scale**: Add features or upgrade hosting as needed

---

**Ready to deploy?** 👉 See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete instructions!
