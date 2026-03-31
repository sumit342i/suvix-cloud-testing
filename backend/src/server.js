const fs = require("fs");
const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const {
  buildAdminOrderEmail,
  buildCustomerConfirmationEmail
} = require("./emailTemplates");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = Number(process.env.PORT || 3000);
const FRONTEND_DIR = path.resolve(__dirname, "../../frontend");
const DEFAULT_NOTIFICATION_EMAIL = "digital.work.3442@gmail.com";
const LOGO_CID = "rn-herbal-logo";
const LOGO_PATH = path.resolve(
  __dirname,
  "../../frontend/assets/images/ChatGPT Image Mar 26, 2026, 01_58_45 PM (1).png"
);

const ORDER_DETAILS = {
  productName: "RN Herbal RN Power Combo",
  amount: "3000",
  paymentMethod: "Cash on Delivery (COD)"
};

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(FRONTEND_DIR));

function readRequiredEnv(name) {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

function parseSecureFlag(value, port) {
  if (typeof value === "string" && value.trim() !== "") {
    return value.trim().toLowerCase() === "true";
  }

  return Number(port) === 465;
}

function isMailerConfigured() {
  return ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"].every(
    (key) => readRequiredEnv(key) !== ""
  );
}

function buildTransporter() {
  const host = readRequiredEnv("SMTP_HOST");
  const port = Number(readRequiredEnv("SMTP_PORT"));
  const user = readRequiredEnv("SMTP_USER");
  const pass = readRequiredEnv("SMTP_PASS");

  return nodemailer.createTransport({
    host,
    port,
    secure: parseSecureFlag(process.env.SMTP_SECURE, port),
    auth: {
      user,
      pass
    }
  });
}

function buildInlineBrandAttachments() {
  if (!fs.existsSync(LOGO_PATH)) {
    return [];
  }

  return [
    {
      filename: "rn-herbal-logo.png",
      path: LOGO_PATH,
      cid: LOGO_CID
    }
  ];
}

function normalizeOrderPayload(payload) {
  return {
    customerName: String(payload.customerName || "").trim(),
    customerPhone: String(payload.customerPhone || "").trim(),
    customerEmail: String(payload.customerEmail || "").trim().toLowerCase(),
    customerAddress: String(payload.customerAddress || "").trim(),
    customerCity: String(payload.customerCity || "").trim(),
    customerState: String(payload.customerState || "").trim(),
    customerPincode: String(payload.customerPincode || "").trim(),
    ...ORDER_DETAILS
  };
}

function validateOrder(order) {
  const errors = [];

  if (!order.customerName) errors.push("Full name is required.");
  if (!/^\d{10}$/.test(order.customerPhone)) errors.push("A valid 10-digit mobile number is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.customerEmail)) errors.push("A valid email address is required.");
  if (!order.customerAddress) errors.push("Delivery address is required.");
  if (!order.customerCity) errors.push("City is required.");
  if (!order.customerState) errors.push("State is required.");
  if (!/^\d{6}$/.test(order.customerPincode)) errors.push("A valid 6-digit pincode is required.");

  return errors;
}

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    mailerConfigured: isMailerConfigured()
  });
});

app.get("/order", (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, "order.html"));
});

app.post("/api/orders", async (req, res) => {
  const order = normalizeOrderPayload(req.body);
  const validationErrors = validateOrder(order);

  if (validationErrors.length > 0) {
    return res.status(400).json({
      message: validationErrors[0],
      errors: validationErrors
    });
  }

  if (!isMailerConfigured()) {
    return res.status(500).json({
      message: "Email delivery is not configured on the server yet. Add SMTP settings in backend/.env and restart the server."
    });
  }

  const transporter = buildTransporter();
  const orderTime = new Date();
  const notificationEmail =
    readRequiredEnv("ORDER_NOTIFICATION_EMAIL") || DEFAULT_NOTIFICATION_EMAIL;
  const mailFrom =
    readRequiredEnv("MAIL_FROM") || readRequiredEnv("SMTP_USER");

  try {
    const attachments = buildInlineBrandAttachments();
    const adminEmail = buildAdminOrderEmail(order, orderTime, {
      logoCid: LOGO_CID
    });

    await transporter.sendMail({
      from: mailFrom,
      to: notificationEmail,
      replyTo: order.customerEmail,
      subject: adminEmail.subject,
      text: adminEmail.text,
      html: adminEmail.html,
      attachments
    });

    let customerEmailSent = true;

    try {
      const customerEmail = buildCustomerConfirmationEmail(order, orderTime, {
        logoCid: LOGO_CID
      });

      await transporter.sendMail({
        from: mailFrom,
        to: order.customerEmail,
        subject: customerEmail.subject,
        text: customerEmail.text,
        html: customerEmail.html,
        attachments
      });
    } catch (customerError) {
      customerEmailSent = false;
      console.error("Customer confirmation email failed:", customerError);
    }

    return res.status(200).json({
      message: customerEmailSent
        ? "Order placed successfully."
        : "Order placed successfully, but the customer confirmation email could not be sent right now.",
      customerEmailSent
    });
  } catch (error) {
    console.error("Order email failed:", error);

    return res.status(500).json({
      message: "We could not process the order email right now. Please try again or contact us on WhatsApp."
    });
  }
});

const server = app.listen(PORT, () => {
  console.log(`RN Herbal server running on http://localhost:${PORT}`);

  if (!isMailerConfigured()) {
    console.warn(
      "SMTP settings are missing. Copy backend/.env.example to backend/.env, fill in your SMTP credentials, and restart the server."
    );
  }
});

server.on("error", (error) => {
  if (error && error.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Stop the process using that port or change PORT in backend/.env, then start the server again.`
    );
    process.exit(1);
  }

  throw error;
});
