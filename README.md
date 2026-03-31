# testing-email-form

## Structure

- `frontend/`
  Static website pages and assets.
- `frontend/assets/css/`
  Shared website styling.
- `frontend/assets/js/`
  Frontend scripts, including the order submission flow.
- `frontend/assets/images/`
  Product images, icons, screenshots, and media.
- `backend/`
  Node.js backend that serves the frontend and sends order emails with Nodemailer.

## Run the project

1. Open `backend/.env.example`
2. Copy it to `backend/.env`
3. Add your SMTP credentials
4. In `backend/`, run `npm install`
5. In `backend/`, run `npm start`
6. Open `http://localhost:3000`

## Email flow

- Order details are sent to `digital.work.3442@gmail.com`
- A confirmation email is sent to the customer email entered in the form
