document.addEventListener("DOMContentLoaded", () => {
  const orderForm = document.getElementById("orderForm");

  if (!orderForm) {
    return;
  }

  const submitButton = document.getElementById("submitButton");
  const orderStatus = document.getElementById("orderStatus");
  const statusText = orderStatus?.querySelector(".status-text");

  orderForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing securely...';
    submitButton.disabled = true;
    submitButton.style.opacity = "0.7";

    const payload = {
      customerName: document.getElementById("name").value,
      customerPhone: document.getElementById("phone").value,
      customerEmail: document.getElementById("email").value,
      customerAddress: document.getElementById("address").value,
      customerCity: document.getElementById("city").value,
      customerState: document.getElementById("state").value,
      customerPincode: document.getElementById("pincode").value
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({
        message: "Unexpected server response."
      }));

      if (!response.ok) {
        throw new Error(result.message || "Order submission failed.");
      }

      if (statusText) {
        statusText.textContent = result.customerEmailSent
          ? "Thank you for your order. We have sent a confirmation email to your provided address. Our dispatch team will process your order shortly."
          : "Thank you for your order. We received it successfully, but the confirmation email could not be sent right now. Our dispatch team will still process your order shortly.";
      }

      orderForm.style.display = "none";
      orderStatus.style.display = "block";
      window.scrollTo({
        top: document.querySelector(".order-form-section").offsetTop - 50,
        behavior: "smooth"
      });
    } catch (error) {
      console.error("Order submission failed:", error);
      alert(error.message || "There was an error while confirming your order. Please try again or contact us on WhatsApp.");
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
      submitButton.style.opacity = "1";
      return;
    }

    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
    submitButton.style.opacity = "1";
  });
});
