document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("quizOverviewFilters");
  const rows = document.getElementById("overviewRows");
  const { data: summaries } = await QuizService.getClassSummaries();
  const allSummaries = summaries || [];

  const filters = [
    { name: "className", id: "classFilter" },
    { name: "course", id: "courseFilter" },
    { name: "segment", id: "segmentFilter" },
    { name: "unit", id: "unitFilter" },
    { name: "topic", id: "topicFilter" }
  ];

  filters.forEach((filter) => populateFilter(filter.id, filter.name));

  function populateFilter(id, field) {
    const select = document.getElementById(id);
    if (!select) return;

    const values = Array.from(new Set(allSummaries.map((summary) => summary[field]).filter(Boolean)));
    select.innerHTML = `<option value="">All</option>${values.map((value) => `<option value="${AdminControlPanelView.escape(value)}">${AdminControlPanelView.escape(value)}</option>`).join("")}`;
  }

  function getFilteredSummaries() {
    return allSummaries.filter((summary) => filters.every((filter) => {
      const select = document.getElementById(filter.id);
      return !select || !select.value || summary[filter.name] === select.value;
    }));
  }

  function render() {
    AdminControlPanelView.renderQuizOverviewRows(rows, getFilteredSummaries());
  }

  if (form) form.addEventListener("change", render);
  render();
});
