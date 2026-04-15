const { processOrderSubmission } = require("../backend/src/orderService");

const LOGO_PUBLIC_PATH =
  "/assets/images/ChatGPT Image Mar 26, 2026, 01_58_45 PM (1).png";

function getHeaderValue(request, key) {
  const value = request.headers[key];

  if (Array.isArray(value)) {
    return value[0];
  }

  return value || "";
}

function getRequestOrigin(request) {
  const protocol = getHeaderValue(request, "x-forwarded-proto") || "https";
  const forwardedHost = getHeaderValue(request, "x-forwarded-host");
  const host = forwardedHost || getHeaderValue(request, "host");

  if (!host) {
    return "";
  }

  return `${protocol}://${host}`;
}

module.exports = async (request, response) => {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({
      message: "Method not allowed."
    });
  }

  let payload = {};

  try {
    payload = request.body || {};
  } catch (error) {
    return response.status(400).json({
      message: "Invalid JSON payload."
    });
  }

  const origin = getRequestOrigin(request);
  const result = await processOrderSubmission(payload, {
    logoSrc: origin ? `${origin}${LOGO_PUBLIC_PATH}` : ""
  });

  return response.status(result.status).json(result.body);
};
