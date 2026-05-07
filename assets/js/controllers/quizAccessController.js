document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const coveredParam = params.get("covered");
  const covered = coveredParam === null ? true : coveredParam === "true";
  const completed = params.get("completed") === "true";
  const quizCard = document.querySelector(".quiz-card");

  if (!quizCard) return;

  if (!covered) {
    quizCard.innerHTML = `
      <section class="lesson-block">
        <h2>Quiz locked</h2>
        <p>This quiz will unlock when your teacher has marked the workbook as covered.</p>
      </section>
    `;
    return;
  }

  if (completed) {
    quizCard.insertAdjacentHTML("afterbegin", `
      <div class="learning-state-notice">
        Completed. Score will appear here when Supabase is connected.
      </div>
    `);
  }
});
