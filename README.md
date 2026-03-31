# testing-email-form

## Structure

- `frontend/`
  Static website pages and assets. Vercel serves this folder as the deployed site output.
- `api/`
  Vercel serverless functions for `POST /api/orders` and `GET /api/health`.
- `backend/`
  Local Express server plus shared email logic for development outside Vercel.

## Run locally

1. Copy `backend/.env.example` to `backend/.env`
2. Add your SMTP credentials
3. Run `npm install` from the project root
4. Run `npm start`
5. Open `http://localhost:3000`

You can still run the older backend-only flow from `backend/` if you prefer, but the root commands now match the Vercel-ready setup.

## Deploy to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, create a new project and import this repository.
3. Keep the project root as the repository root.
4. Vercel will serve `frontend/` as the site because `vercel.json` sets `"outputDirectory": "frontend"`.
5. The build step is intentionally disabled in `vercel.json`, so if the dashboard shows a build command, leave it empty.
6. In Vercel Project Settings -> Environment Variables, add these values for Production and Preview:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `MAIL_FROM`
   - `ORDER_NOTIFICATION_EMAIL`
7. Deploy the project.
8. After deployment, test:
   - `https://your-domain.vercel.app/api/health`
   - a real order submission from `https://your-domain.vercel.app/order.html`

## Recommended Gmail SMTP values

- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=465`
- `SMTP_SECURE=true`
- `SMTP_USER=digital.work.3442@gmail.com`
- `SMTP_PASS=your-16-character-google-app-password`
- `MAIL_FROM=RN Herbal India <digital.work.3442@gmail.com>`
- `ORDER_NOTIFICATION_EMAIL=digital.work.3442@gmail.com`

## Email flow

- Order details are sent to `digital.work.3442@gmail.com`
- A confirmation email is sent to the customer email entered in the form
