const feedbacksContainer = document.getElementById("feedbacksContainer");
const subjectFilter = document.getElementById("subjectFilter");
const refreshBtn = document.getElementById("refreshBtn");

let allFeedbacks = [];

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text || "";
  return div.innerHTML;
}

function renderFeedbacks() {
  const selectedSubject = subjectFilter.value;
  const filtered = selectedSubject
    ? allFeedbacks.filter((item) => item.subject === selectedSubject)
    : allFeedbacks;

  feedbacksContainer.innerHTML = "";

  if (filtered.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.className = "empty-state";
    emptyMsg.textContent = selectedSubject
      ? "No feedback submitted for " + selectedSubject + " yet."
      : "No feedback submitted yet.";
    feedbacksContainer.appendChild(emptyMsg);
    return;
  }

  const reversed = [...filtered].reverse();

  reversed.forEach((item) => {
    const card = document.createElement("article");
    card.className = "feedback-card";

    const header = document.createElement("div");
    header.className = "card-header";

    const studentInfo = document.createElement("div");
    studentInfo.className = "student-info";

    const nameHeading = document.createElement("h2");
    nameHeading.textContent = item.name || "Anonymous";

    const classTag = document.createElement("span");
    classTag.className = "class-tag";
    classTag.textContent = item.className ? "Class: " + item.className : "Class not specified";

    studentInfo.appendChild(nameHeading);
    studentInfo.appendChild(classTag);

    const ratingBadge = document.createElement("div");
    ratingBadge.className = "rating-badge";
    ratingBadge.setAttribute("aria-label", "Rating: " + item.rating + " out of 10");

    const ratingNumber = document.createElement("span");
    ratingNumber.className = "rating-number";
    ratingNumber.textContent = item.rating;

    const ratingScale = document.createElement("span");
    ratingScale.className = "rating-scale";
    ratingScale.textContent = "/10";

    ratingBadge.appendChild(ratingNumber);
    ratingBadge.appendChild(ratingScale);

    header.appendChild(studentInfo);
    header.appendChild(ratingBadge);

    const subjectPill = document.createElement("span");
    subjectPill.className = "subject-pill";
    subjectPill.textContent = item.subject || "General";

    card.appendChild(header);
    card.appendChild(subjectPill);

    if (item.description) {
      const desc = document.createElement("p");
      desc.className = "card-description";
      desc.textContent = item.description;
      card.appendChild(desc);
    }

    feedbacksContainer.appendChild(card);
  });
}

async function loadFeedbacks() {
  feedbacksContainer.innerHTML = '<p class="loading-state">Loading feedbacks...</p>';
  try {
    const response = await fetch("/api/feedback");
    if (!response.ok) {
      throw new Error("Server responded with error: " + response.status);
    }
    allFeedbacks = await response.json();
    renderFeedbacks();
  } catch (error) {
    feedbacksContainer.innerHTML =
      '<p class="error-state">Failed to load feedbacks. Please click Refresh to try again.</p>';
  }
}

subjectFilter.addEventListener("change", renderFeedbacks);
refreshBtn.addEventListener("click", loadFeedbacks);

loadFeedbacks();
