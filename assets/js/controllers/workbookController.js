document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".student-answer").forEach((field) => {
    let messageTimer;

    const showPasteMessage = () => {
      const messageId = field.getAttribute("aria-describedby");
      const message = messageId ? document.getElementById(messageId) : null;
      if (!message) return;

      message.textContent = "Please type your answer rather than pasting it.";
      window.clearTimeout(messageTimer);
      messageTimer = window.setTimeout(() => {
        message.textContent = "";
      }, 3000);
    };

    field.addEventListener("paste", (event) => {
      event.preventDefault();
      showPasteMessage();
    });

    field.addEventListener("keydown", (event) => {
      const isPasteShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "v";
      if (!isPasteShortcut) return;
      event.preventDefault();
      showPasteMessage();
    });

    field.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      showPasteMessage();
    });
  });

  const params = new URLSearchParams(window.location.search);
  // Prototype only.
  // Later, currentUserRole and workbookCovered will come from Supabase.
  const currentUserRole = params.get("role") || (params.get("route") === "teacher" || document.referrer.includes("/admin/") ? "teacher" : "student");
  const coveredParam = params.get("covered");
  const workbookCovered = coveredParam === null ? false : coveredParam === "true";
  // Development prototype setting.
  // Keep true while building and testing the site.
  // Set to false later when workbook answer access should depend on teacher role or covered status.
  const allWorkbookAnswersAvailable = true;
  const canViewAnswers =
    allWorkbookAnswersAvailable === true ||
    currentUserRole === "teacher" ||
    workbookCovered === true;

  if (!canViewAnswers) {
    const notice = document.createElement("div");
    notice.className = "learning-state-notice";
    notice.textContent = "Answers will be available after your teacher has marked this workbook as covered.";

    const page = document.querySelector(".interactive-workbook") || document.querySelector(".workbook-page");
    if (page) page.prepend(notice);

    document.querySelectorAll(".toggle-answer").forEach((button) => {
      button.hidden = true;
      button.disabled = true;
    });
    document.querySelectorAll(".answer-block").forEach((answer) => {
      answer.hidden = true;
    });
    return;
  }

  document.querySelectorAll(".toggle-answer").forEach((button) => {
    const targetId = button.dataset.target;
    const answer = document.getElementById(targetId);

    if (!answer) return;

    answer.hidden = true;
    button.hidden = false;
    button.disabled = false;

    button.addEventListener("click", () => {
      const isHidden = answer.hidden;
      answer.hidden = !isHidden;
      button.textContent = isHidden ? "Hide answer" : "Show answer";
      button.setAttribute("aria-expanded", String(isHidden));
    });
  });
});
