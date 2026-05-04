document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("courseUnits");
  const course = document.body.dataset.course || "";
  const { data: items, error } = await LearningItemService.getAllItems();

  if (error) {
    if (container) container.innerHTML = `<article class="course-browser-empty"><h3>Unable to load course units</h3><p>Please refresh the page.</p></article>`;
    return;
  }

  const courseItems = (items || []).filter((item) => item.course === course).map((item) => ({
    ...item,
    topic_management_url: item.topic_management_url ? `../${item.topic_management_url.replace("courses/", "")}` : "#"
  }));

  AdminControlPanelView.renderCourseUnits(container, courseItems);
});
