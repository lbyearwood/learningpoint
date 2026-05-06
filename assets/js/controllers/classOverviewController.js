document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("classOverview");
  const className = document.body.dataset.className || "";
  const { data: summaries } = await QuizService.getClassSummaries();
  const summary = (summaries || []).find((entry) => entry.className === className);

  AdminControlPanelView.renderClassOverview(container, summary);
});
