document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".toggle-answer").forEach((button) => {
    const targetId = button.dataset.target;
    const answer = document.getElementById(targetId);

    if (!answer) return;

    answer.hidden = true;

    button.addEventListener("click", () => {
      const isHidden = answer.hidden;
      answer.hidden = !isHidden;
      button.textContent = isHidden ? "Hide answer" : "Show answer";
      button.setAttribute("aria-expanded", String(isHidden));
    });
  });
});
