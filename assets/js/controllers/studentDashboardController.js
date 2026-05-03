document.addEventListener("DOMContentLoaded", async () => {
  const workbooksContainer = document.getElementById("publishedWorkbooks");
  const quizzesContainer = document.getElementById("publishedQuizzes");
  const scoresContainer = document.getElementById("recentScores");

  const { data: items, error } = await LearningItemService.getPublishedItems();

  if (error) {
    if (workbooksContainer) workbooksContainer.innerHTML = `<article class="info-card"><h3>Unable to load workbooks</h3><p>Please refresh the page.</p></article>`;
    if (quizzesContainer) quizzesContainer.innerHTML = `<article class="info-card"><h3>Unable to load quizzes</h3><p>Please refresh the page.</p></article>`;
    return;
  }

  const workbooks = items.filter((item) => item.type === "workbook");
  const quizzes = items.filter((item) => item.type === "quiz");

  StudentDashboardView.renderCards(workbooksContainer, workbooks);
  StudentDashboardView.renderCards(quizzesContainer, quizzes);

  StudentDashboardView.renderScores(scoresContainer, [
    { quiz: "Characters quiz", score: "Not attempted", date: "Pending" },
    { quiz: "Learning Aim A quiz", score: "Draft", date: "Not published" }
  ]);
});
