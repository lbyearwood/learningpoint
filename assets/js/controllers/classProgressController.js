document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("classProgress");
  const className = document.body.dataset.className || "";
  const classView = document.body.dataset.classView || "progress";
  const { data: summaries } = await QuizService.getClassSummaries();
  const classSummaries = (summaries || [])
    .filter((summary) => summary.className === className)
    .map((summary) => ({
      ...summary,
      detailUrl: "../responses.html"
    }));

  if (classView === "course-progress") {
    AdminControlPanelView.renderClassCourseProgress(container, classSummaries);
    return;
  }

  if (classView === "quiz-completion") {
    AdminControlPanelView.renderClassQuizCompletion(container, classSummaries);
    return;
  }

  if (classView === "support") {
    AdminControlPanelView.renderStudentsNeedingSupport(container, classSummaries);
    return;
  }

  AdminControlPanelView.renderClassProgress(container, classSummaries);
});
