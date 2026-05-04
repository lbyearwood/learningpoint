document.addEventListener("DOMContentLoaded", async () => {
  const page = document.body;
  const workbookContainer = document.getElementById("workbookAdminRows");
  const quizContainer = document.getElementById("quizAdminRows");
  const topicResourceContainer = document.getElementById("topicResourceRows");

  function matchesPage(item) {
    const course = page.dataset.course || "";
    const unit = page.dataset.unit || "";
    const topic = page.dataset.topic || "";
    const itemTopic = item.learning_aim || item.subtopic || "";

    return item.course === course && item.unit === unit && itemTopic === topic;
  }

  async function renderResources() {
    const { data: items, error } = await LearningItemService.getAllItems();

    if (error) {
      if (workbookContainer) workbookContainer.innerHTML = `<article class="resource-card"><div><strong>Unable to load workbook records</strong></div></article>`;
      if (quizContainer) quizContainer.innerHTML = `<article class="resource-card"><div><strong>Unable to load quiz records</strong></div></article>`;
      return;
    }

    const pageItems = (items || []).filter(matchesPage).map((item) => ({
      ...item,
      page_url: `../../../../${item.page_url.replace("../", "")}`
    }));

    AdminControlPanelView.renderTopicResources(topicResourceContainer, pageItems);
    AdminControlPanelView.renderLearningItems(workbookContainer, pageItems.filter((item) => item.type === "workbook"));
    AdminControlPanelView.renderLearningItems(quizContainer, pageItems.filter((item) => item.type === "quiz"));
  }

  await renderResources();
});
