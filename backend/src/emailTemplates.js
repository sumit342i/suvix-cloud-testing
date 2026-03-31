const RUPEE_SYMBOL = "\u20B9";
const BRAND = {
  name: "RN Herbal India",
  accent: "#c9943f",
  accentSoft: "#f3dfb9",
  forest: "#204a34",
  forestDeep: "#163625",
  warmBackground: "#f6efe4",
  cardBackground: "#fffaf4",
  line: "#eadfce",
  text: "#24342a",
  textSoft: "#5f655d",
  supportPhone: "+91 8292905500",
  supportPhoneHref: "tel:+918292905500",
  supportEmail: "digital.work.3442@gmail.com",
  website: "https://rnherbalindia.com/"
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatOrderTime(orderTime) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata"
  }).format(orderTime);
}

function normalizePhoneForLink(phone) {
  const digits = String(phone || "").replace(/\D/g, "");

  if (!digits) {
    return BRAND.supportPhoneHref;
  }

  if (digits.startsWith("91")) {
    return `tel:+${digits}`;
  }

  return `tel:+91${digits}`;
}

function buildOrderRows(order, orderTime) {
  return [
    ["Order time", formatOrderTime(orderTime)],
    ["Customer name", order.customerName],
    ["Phone", order.customerPhone],
    ["Customer email", order.customerEmail],
    ["Address", order.customerAddress],
    ["City", order.customerCity],
    ["State", order.customerState],
    ["Pincode", order.customerPincode],
    ["Product", order.productName],
    ["Amount", `${RUPEE_SYMBOL}${order.amount}`],
    ["Payment method", order.paymentMethod]
  ];
}

function buildRowsText(rows) {
  return rows.map(([label, value]) => `${label}: ${value}`).join("\n");
}

function buildTagRow(items) {
  return items
    .map(
      (item) => `
        <span style="display:inline-block;margin:0 8px 8px 0;padding:10px 12px;border-radius:999px;background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.12);color:#ffffff;font-size:13px;font-weight:700;letter-spacing:0.01em;">
          ${escapeHtml(item)}
        </span>`
    )
    .join("");
}

function buildHighlightCards(cards) {
  return cards
    .map(
      (card) => `
        <tr>
          <td style="padding:0 0 12px;">
            <table role="presentation" width="100%" style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:16px 18px;background:${BRAND.cardBackground};border:1px solid ${BRAND.line};border-radius:18px;">
                  <div style="font-size:11px;line-height:1.4;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.textSoft};font-weight:800;margin-bottom:6px;">
                    ${escapeHtml(card.label)}
                  </div>
                  <div style="font-size:21px;line-height:1.35;color:${BRAND.forest};font-weight:800;">
                    ${escapeHtml(card.value)}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>`
    )
    .join("");
}

function buildDetailCards(rows) {
  return rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:0 0 10px;">
            <table role="presentation" width="100%" style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:14px 16px;background:#ffffff;border:1px solid ${BRAND.line};border-radius:16px;">
                  <div style="font-size:11px;line-height:1.4;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.textSoft};font-weight:800;margin-bottom:7px;">
                    ${escapeHtml(label)}
                  </div>
                  <div style="font-size:16px;line-height:1.65;color:${BRAND.text};font-weight:600;word-break:break-word;">
                    ${escapeHtml(value)}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>`
    )
    .join("");
}

function buildActionButtons(actions) {
  if (!actions || actions.length === 0) {
    return "";
  }

  return actions
    .map(
      (action) => `
        <tr>
          <td style="padding:0 0 10px;">
            <a href="${action.href}" style="display:block;width:100%;box-sizing:border-box;padding:15px 16px;border-radius:16px;text-align:center;text-decoration:none;font-size:14px;line-height:1.4;font-weight:800;letter-spacing:0.02em;background:${
              action.variant === "secondary" ? "#ffffff" : BRAND.forest
            };color:${action.variant === "secondary" ? BRAND.forest : "#ffffff"};border:1px solid ${
              action.variant === "secondary" ? BRAND.line : BRAND.forest
            };">
              ${escapeHtml(action.label)}
            </a>
          </td>
        </tr>`
    )
    .join("");
}

function buildStyles() {
  return `
    <style>
      body, table, td, a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      table, td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }

      img {
        -ms-interpolation-mode: bicubic;
        border: 0;
        outline: none;
        text-decoration: none;
      }

      table {
        border-collapse: collapse !important;
      }

      body {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        height: 100% !important;
        background: ${BRAND.warmBackground};
      }

      @media only screen and (max-width: 620px) {
        .shell {
          width: 100% !important;
        }

        .outer-pad {
          padding: 14px !important;
        }

        .inner-pad {
          padding-left: 18px !important;
          padding-right: 18px !important;
        }

        .hero-title {
          font-size: 30px !important;
          line-height: 38px !important;
        }

        .hero-copy,
        .body-copy {
          font-size: 15px !important;
          line-height: 25px !important;
        }

        .logo {
          max-width: 150px !important;
        }
      }
    </style>`;
}

function buildEmailShell({
  preheader,
  eyebrow,
  title,
  intro,
  tagItems,
  highlightCards,
  detailHeading,
  detailRows,
  closingHtml,
  actions,
  footerNote,
  logoCid
}) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    ${buildStyles()}
  </head>
  <body>
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${escapeHtml(preheader)}
    </div>

    <table role="presentation" width="100%" style="width:100%;background:${BRAND.warmBackground};">
      <tr>
        <td class="outer-pad" style="padding:20px;">
          <table role="presentation" width="100%" class="shell" style="width:100%;max-width:560px;margin:0 auto;">
            <tr>
              <td>
                <table role="presentation" width="100%" style="width:100%;border-radius:28px;overflow:hidden;background:linear-gradient(180deg,${BRAND.forestDeep} 0%,${BRAND.forest} 62%,${BRAND.accent} 100%);box-shadow:0 18px 40px rgba(24,32,26,0.16);">
                  <tr>
                    <td class="inner-pad" style="padding:26px 28px 22px;text-align:left;">
                      <img src="cid:${logoCid}" alt="${BRAND.name}" class="logo" style="max-width:170px;width:100%;height:auto;display:block;">
                      <div style="margin-top:16px;">
                        <span style="display:inline-block;padding:10px 14px;border-radius:999px;background:rgba(255,255,255,0.16);color:#ffffff;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-weight:800;">
                          ${escapeHtml(eyebrow)}
                        </span>
                      </div>
                      <h1 class="hero-title" style="margin:18px 0 10px;font-size:34px;line-height:1.15;color:#ffffff;">
                        ${escapeHtml(title)}
                      </h1>
                      <p class="hero-copy" style="margin:0 0 18px;font-size:16px;line-height:1.75;color:rgba(255,255,255,0.9);">
                        ${escapeHtml(intro)}
                      </p>
                      <div>
                        ${buildTagRow(tagItems)}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:0 12px 12px;">
                      <table role="presentation" width="100%" style="width:100%;background:#ffffff;border-radius:24px;border:1px solid rgba(32,74,52,0.08);">
                        <tr>
                          <td class="inner-pad" style="padding:22px 24px;">
                            <table role="presentation" width="100%" style="width:100%;border-collapse:collapse;">
                              ${buildHighlightCards(highlightCards)}
                            </table>

                            <table role="presentation" width="100%" style="width:100%;margin-top:4px;background:${BRAND.cardBackground};border:1px solid ${BRAND.line};border-radius:20px;">
                              <tr>
                                <td style="padding:20px 18px;">
                                  <h2 style="margin:0 0 14px;font-size:22px;line-height:1.25;color:${BRAND.forest};">
                                    ${escapeHtml(detailHeading)}
                                  </h2>
                                  <table role="presentation" width="100%" style="width:100%;border-collapse:collapse;">
                                    ${buildDetailCards(detailRows)}
                                  </table>
                                </td>
                              </tr>
                            </table>

                            <table role="presentation" width="100%" style="width:100%;margin-top:14px;background:linear-gradient(180deg,#fffdf9,#f8f2e8);border:1px solid ${BRAND.line};border-radius:20px;">
                              <tr>
                                <td style="padding:20px 18px;">
                                  ${closingHtml}
                                  <table role="presentation" width="100%" style="width:100%;margin-top:16px;border-collapse:collapse;">
                                    ${buildActionButtons(actions)}
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <p class="body-copy" style="margin:18px 12px 0;text-align:center;font-size:13px;line-height:1.75;color:${BRAND.textSoft};">
                  ${footerNote}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildAdminOrderEmail(order, orderTime, options = {}) {
  const rows = buildOrderRows(order, orderTime);
  const logoCid = options.logoCid || "rn-herbal-logo";

  return {
    subject: `New RN Herbal order from ${order.customerName}`,
    text: [
      "A new order has been placed on RN Herbal India.",
      "",
      buildRowsText(rows)
    ].join("\n"),
    html: buildEmailShell({
      preheader: `New order received from ${order.customerName}`,
      eyebrow: "Admin Notification",
      title: "A new order has been received",
      intro:
        "A customer submitted a fresh order from the RN Herbal India website. Review the details below and follow up quickly.",
      tagItems: [
        order.productName,
        `${RUPEE_SYMBOL}${order.amount}`,
        order.paymentMethod
      ],
      highlightCards: [
        { label: "Customer", value: order.customerName },
        { label: "Phone", value: order.customerPhone },
        { label: "Order value", value: `${RUPEE_SYMBOL}${order.amount}` }
      ],
      detailHeading: "Complete order details",
      detailRows: rows,
      closingHtml: `
        <p class="body-copy" style="margin:0 0 10px;font-size:15px;line-height:1.8;color:${BRAND.text};">
          Reply directly to this email if you want to contact the customer at <strong>${escapeHtml(order.customerEmail)}</strong>.
        </p>
        <p class="body-copy" style="margin:0;font-size:14px;line-height:1.8;color:${BRAND.textSoft};">
          Recommended next step: confirm delivery details and prepare dispatch.
        </p>`,
      actions: [
        {
          label: "Reply to Customer",
          href: `mailto:${order.customerEmail}`,
          variant: "primary"
        },
        {
          label: "Call Customer",
          href: normalizePhoneForLink(order.customerPhone),
          variant: "secondary"
        }
      ],
      footerNote: `${BRAND.name} | ${BRAND.supportPhone} | ${BRAND.supportEmail}`,
      logoCid
    })
  };
}

function buildCustomerConfirmationEmail(order, orderTime, options = {}) {
  const rows = buildOrderRows(order, orderTime).filter(([label]) =>
    label !== "Customer email"
  );
  const logoCid = options.logoCid || "rn-herbal-logo";

  return {
    subject: "Your RN Herbal India order is confirmed",
    text: [
      `Hi ${order.customerName},`,
      "",
      "Thank you for ordering from RN Herbal India. We have received your order and our team will contact you shortly.",
      "",
      buildRowsText(rows),
      "",
      `If you need help, call us at ${BRAND.supportPhone}.`
    ].join("\n"),
    html: buildEmailShell({
      preheader: `Your order for ${order.productName} has been received`,
      eyebrow: "Order Confirmation",
      title: "Thank you. Your order is confirmed.",
      intro:
        "We have received your order successfully. Our team will review it and contact you shortly for the next step.",
      tagItems: [
        order.productName,
        `${RUPEE_SYMBOL}${order.amount}`,
        "Support available"
      ],
      highlightCards: [
        { label: "Order for", value: order.customerName },
        { label: "Product", value: order.productName },
        { label: "Payment", value: order.paymentMethod }
      ],
      detailHeading: "Your order summary",
      detailRows: rows,
      closingHtml: `
        <p class="body-copy" style="margin:0 0 10px;font-size:15px;line-height:1.8;color:${BRAND.text};">
          Hi <strong>${escapeHtml(order.customerName)}</strong>, thank you for choosing ${BRAND.name}. Please keep your phone available so our team can confirm your order quickly.
        </p>
        <p class="body-copy" style="margin:0;font-size:14px;line-height:1.8;color:${BRAND.textSoft};">
          Need help right away? Call us at <strong>${BRAND.supportPhone}</strong> or visit our website.
        </p>`,
      actions: [
        {
          label: "Call Support",
          href: BRAND.supportPhoneHref,
          variant: "primary"
        },
        {
          label: "Visit Website",
          href: BRAND.website,
          variant: "secondary"
        }
      ],
      footerNote: `${BRAND.name} | ${BRAND.supportPhone} | ${BRAND.supportEmail}`,
      logoCid
    })
  };
}

module.exports = {
  buildAdminOrderEmail,
  buildCustomerConfirmationEmail
};
