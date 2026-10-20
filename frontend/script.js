const form = document.getElementById("feedbackForm");
const statusMessage = document.getElementById("status");
const submitButton = form.querySelector("button[type='submit']");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const feedbackPayload = {
    name: (data.get("name") || "").trim(),
    className: (data.get("className") || "").trim(),
    subject: data.get("subject") || "",
    description: (data.get("feedback") || "").trim(),
    rating: Number(data.get("rating"))
  };

  submitButton.disabled = true;
  statusMessage.textContent = "Submitting feedback...";

  try {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(feedbackPayload)
    });

    if (!response.ok) {
      throw new Error("Server responded with error: " + response.status);
    }

    statusMessage.textContent = "Thanks, " + feedbackPayload.name + "! Your feedback was successfully submitted.";
    form.reset();
  } catch (error) {
    statusMessage.textContent = "Failed to submit feedback. Please try again.";
  } finally {
    submitButton.disabled = false;
  }
});
