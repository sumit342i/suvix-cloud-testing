const { isMailerConfigured } = require("../backend/src/orderService");

module.exports = (request, response) => {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({
      message: "Method not allowed."
    });
  }

  return response.status(200).json({
    ok: true,
    mailerConfigured: isMailerConfigured()
  });
};
