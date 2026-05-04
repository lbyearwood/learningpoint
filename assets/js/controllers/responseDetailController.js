document.addEventListener("DOMContentLoaded", async () => {
  const responsesContainer = document.getElementById("responseRows");
  const { data: responses } = await QuizService.getSampleResponses();

  AdminControlPanelView.renderResponses(responsesContainer, responses || []);
});
