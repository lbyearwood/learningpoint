document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("classProgress");
  const className = document.body.dataset.className || "";
  const { data: summaries } = await QuizService.getClassSummaries();
  const classSummaries = (summaries || [])
    .filter((summary) => summary.className === className)
    .map((summary) => ({
      ...summary,
      detailUrl: "../responses.html"
    }));

  AdminControlPanelView.renderClassProgress(container, classSummaries);
});
