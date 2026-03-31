# Backend

This backend replaces EmailJS with a Node.js + Nodemailer email flow.

## What it does

- serves the `frontend/` folder
- accepts order form submissions at `POST /api/orders`
- sends order details to `digital.work.3442@gmail.com`
- sends an order confirmation email to the customer

## Setup

1. Copy `.env.example` to `.env`
2. Fill in your SMTP values
3. Install dependencies with `npm install`
4. Start the server with `npm start`

Then open `http://localhost:3000`

## Gmail recommendation

The easiest setup for you is Gmail SMTP because your notification address is Gmail.

- keep `SMTP_HOST=smtp.gmail.com`
- keep `SMTP_PORT=465`
- keep `SMTP_SECURE=true`
- set `SMTP_USER=digital.work.3442@gmail.com`
- set `SMTP_PASS` to a Google App Password, not your normal Gmail password

To create a Google App Password:

1. Turn on 2-Step Verification for your Google account
2. Open Google Account settings
3. Go to `Security`
4. Open `App passwords`
5. Create a new app password and paste it into `backend/.env`
