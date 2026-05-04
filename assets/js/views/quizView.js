const QuizView = {
  showResult(container, result) {
    if (!container) return;

    const writtenCount = result.answers.filter((answer) => !answer.isAutoMarked).length;
    const writtenMessage = writtenCount
      ? ` ${writtenCount} written answer${writtenCount === 1 ? "" : "s"} will need teacher review later.`
      : "";

    container.innerHTML = `
      <div class="quiz-result" tabindex="-1">
        <h2>Quiz submitted</h2>
        <p>You scored <strong>${this.escape(result.score)} out of ${this.escape(result.maxScore)}</strong> on the auto-marked questions.${writtenMessage}</p>
        <ul class="quiz-feedback-list">
          ${result.answers.map((answer, index) => this.answerTemplate(answer, index)).join("")}
        </ul>
      </div>
    `;

    const resultPanel = container.querySelector(".quiz-result");
    if (resultPanel) resultPanel.focus();
  },

  answerTemplate(answer, index) {
    const status = answer.isAutoMarked
      ? answer.isCorrect ? "Correct" : "Check this"
      : "Written answer saved locally";
    const className = answer.isAutoMarked && answer.isCorrect ? "correct" : "review";

    return `
      <li class="${className}">
        <strong>Q${index + 1}: ${this.escape(status)}</strong>
        <span>${this.escape(answer.question)}</span>
      </li>
    `;
  },

  escape(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
};
