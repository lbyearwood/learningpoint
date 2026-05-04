document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quizForm");
  const message = document.getElementById("quizMessage");
  const resultContainer = document.getElementById("quizResult");

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const studentName = form.elements.studentName ? form.elements.studentName.value.trim() : "";
    if (!studentName) {
      DOM.setMessage(message, "Enter your name before submitting the quiz.", "error");
      if (form.elements.studentName) form.elements.studentName.focus();
      return;
    }

    const unanswered = Array.from(form.querySelectorAll("[data-question]")).find((question, index) => {
      const name = `q${index + 1}`;
      const input = form.elements[name];
      if (!input) return false;
      if ((typeof RadioNodeList !== "undefined" && input instanceof RadioNodeList) || input.length) {
        return !form.querySelector(`input[name="${name}"]:checked`);
      }
      return !input.value.trim();
    });

    if (unanswered) {
      DOM.setMessage(message, "Answer every question before submitting.", "error");
      unanswered.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const { data: result } = QuizService.markQuiz(form);
    const { error } = await QuizService.submitQuiz(result);

    if (error) {
      DOM.setMessage(message, "Unable to submit the quiz. Please try again.", "error");
      return;
    }

    DOM.setMessage(message, "Quiz marked locally. Supabase submission will be added in Stage 2.", "success");
    QuizView.showResult(resultContainer, result);
  });
});
