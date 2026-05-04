document.addEventListener("DOMContentLoaded", async () => {
  const courseBrowserContainer = document.getElementById("courseBrowser");
  const classCardsContainer = document.getElementById("classCards");
  const responsesContainer = document.getElementById("responseRows");
  const { data: items, error } = await LearningItemService.getAllItems();

  if (error) {
    if (courseBrowserContainer) {
      courseBrowserContainer.innerHTML = `<article class="course-browser-empty"><h3>Unable to load courses</h3><p>Please refresh the page.</p></article>`;
    }
    return;
  }

  AdminControlPanelView.renderCourseBrowser(courseBrowserContainer, items || []);

  const { data: summaries } = await QuizService.getClassSummaries();
  const classSummaries = summaries || [];

  AdminControlPanelView.renderClassCards(classCardsContainer, classSummaries);
  AdminControlPanelView.renderClassSummaryRows(responsesContainer, classSummaries);

});
