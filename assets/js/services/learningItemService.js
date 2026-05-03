const LearningItemService = {
  sampleItems: [
    {
      id: "gcse-unit-5-characters-workbook",
      title: "Characters workbook",
      course: "GCSE Computer Science",
      unit: "Unit 5: Data Representation",
      subtopic: "Characters",
      type: "workbook",
      page_url: "../workbooks/gcse/unit-5/characters.html",
      is_published: true,
      description: "Understand how computers represent characters using binary codes and character sets."
    },
    {
      id: "gcse-unit-5-characters-quiz",
      title: "Characters quiz",
      course: "GCSE Computer Science",
      unit: "Unit 5: Data Representation",
      subtopic: "Characters",
      type: "quiz",
      page_url: "../quizzes/gcse/unit-5/characters-quiz-1.html",
      is_published: true,
      description: "Check your understanding of characters, character sets and binary representation."
    },
    {
      id: "btec-unit-21-workbook",
      title: "Business processes workbook",
      course: "BTEC IT",
      unit: "Unit 21: Business Process Modelling Tools",
      subtopic: "Introduction",
      type: "workbook",
      page_url: "../workbooks/btec/unit-21/introduction.html",
      is_published: true,
      description: "Start learning how organisations use process modelling to analyse and improve business processes."
    },
    {
      id: "btec-unit-21-quiz",
      title: "Business processes quiz",
      course: "BTEC IT",
      unit: "Unit 21: Business Process Modelling Tools",
      subtopic: "Introduction",
      type: "quiz",
      page_url: "../quizzes/btec/unit-21/introduction-quiz-1.html",
      is_published: false,
      description: "A draft knowledge check for the first Unit 21 topic."
    }
  ],

  async getPublishedItems() {
    // TODO Stage 4:
    // Replace this with a Supabase select from learning_items where is_published is true.
    return {
      data: this.sampleItems.filter((item) => item.is_published),
      error: null
    };
  },

  async getAllItems() {
    // TODO Stage 5:
    // Admin users will later fetch all learning_items records from Supabase.
    return {
      data: this.sampleItems,
      error: null
    };
  },

  async updatePublishedStatus(itemId, isPublished) {
    // TODO Stage 5:
    // Update is_published in Supabase. Row Level Security must restrict this to admin only.
    const item = this.sampleItems.find((entry) => entry.id === itemId);
    if (item) item.is_published = isPublished;
    return { data: item || null, error: null };
  }
};
