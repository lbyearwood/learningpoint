const QuizService = {
  sampleResponses: [
    {
      student: "A. Patel",
      className: "11CS1",
      quiz: "Characters quiz",
      score: "Not attempted",
      submitted: "Pending"
    },
    {
      student: "M. Johnson",
      className: "13IT",
      quiz: "Learning Aim A quiz",
      score: "Draft quiz",
      submitted: "Not published"
    }
  ],

  sampleClassSummaries: [
    {
      className: "11CS1",
      course: "GCSE Computer Science",
      studentCount: 24,
      quiz: "Characters quiz",
      segment: "Paper 2: Computational Thinking, Algorithms and Programming",
      unit: "6. Data Representation",
      topic: "Characters",
      workbookAccess: "Published",
      visibleResources: "Characters workbook and Characters quiz",
      submitted: 18,
      notSubmitted: 6,
      averageScore: "72%",
      studentsNotSubmitted: "6",
      supportSummary: "6 students have not submitted the current quiz.",
      lastSubmission: "Today",
      detailUrl: "responses.html"
    },
    {
      className: "13IT",
      course: "BTEC IT",
      studentCount: 21,
      quiz: "Learning Aim A quiz",
      segment: "Unit 21",
      unit: "Unit 21: Business Process Modelling Tools",
      topic: "Learning Aim A",
      workbookAccess: "Published",
      visibleResources: "Learning Aim A workbook",
      submitted: 0,
      notSubmitted: 21,
      averageScore: "Not started",
      studentsNotSubmitted: "21",
      supportSummary: "21 students still need to complete the first quiz attempt.",
      lastSubmission: "None",
      detailUrl: "responses.html"
    }
  ],

  markQuiz(form) {
    const questions = Array.from(form.querySelectorAll("[data-question]"));
    const answers = [];
    let score = 0;
    let maxScore = 0;

    questions.forEach((question, index) => {
      const correctAnswer = question.dataset.answer || "";
      const name = `q${index + 1}`;
      const selected = form.querySelector(`input[name="${name}"]:checked`);
      const written = form.elements[name];
      const response = selected ? selected.value : written ? written.value.trim() : "";
      const isAutoMarked = Boolean(correctAnswer);
      const isCorrect = isAutoMarked && response === correctAnswer;

      if (isAutoMarked) {
        maxScore += 1;
        if (isCorrect) score += 1;
      }

      answers.push({
        question: question.dataset.question,
        response,
        correctAnswer,
        isAutoMarked,
        isCorrect
      });
    });

    return {
      data: {
        quizId: form.dataset.quizId,
        studentName: form.elements.studentName ? form.elements.studentName.value.trim() : "",
        answers,
        score,
        maxScore
      },
      error: null
    };
  },

  async submitQuiz(result) {
    // TODO Stage 2:
    // Insert the quiz response into Supabase for the signed-in user.
    return { data: result, error: null };
  },

  async getSampleResponses() {
    // TODO Stage 2:
    // Admin users will later fetch quiz_responses from Supabase.
    return { data: this.sampleResponses, error: null };
  },

  async getClassSummaries() {
    return { data: this.sampleClassSummaries, error: null };
  }
};
