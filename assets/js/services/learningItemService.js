const LearningItemService = {
  sampleItems: [
    {
      id: "gcse-paper-2-unit-6-characters-workbook",
      title: "Characters workbook",
      course: "GCSE Computer Science",
      paper: "Paper 2: Computational Thinking, Algorithms and Programming",
      unit: "6. Data Representation",
      segment: "Paper 2: Computational Thinking, Algorithms and Programming",
      subtopic: "Characters",
      type: "workbook",
      page_url: "../workbooks/gcse/unit-5/characters.html",
      course_units_url: "courses/gcse-computer-science.html",
      topic_management_url: "courses/gcse/unit-5/characters.html",
      is_published: true,
      description: "Understand how computers represent characters using binary codes and character sets."
    },
    {
      id: "gcse-paper-2-unit-6-characters-quiz",
      title: "Characters quiz",
      course: "GCSE Computer Science",
      paper: "Paper 2: Computational Thinking, Algorithms and Programming",
      unit: "6. Data Representation",
      segment: "Paper 2: Computational Thinking, Algorithms and Programming",
      subtopic: "Characters",
      type: "quiz",
      page_url: "../quizzes/gcse/unit-5/characters-quiz-1.html",
      course_units_url: "courses/gcse-computer-science.html",
      topic_management_url: "courses/gcse/unit-5/characters.html",
      is_published: true,
      description: "Check your understanding of characters, character sets and binary representation."
    },
    {
      id: "gcse-paper-2-unit-6-images-workbook",
      title: "Images workbook",
      course: "GCSE Computer Science",
      paper: "Paper 2: Computational Thinking, Algorithms and Programming",
      unit: "6. Data Representation",
      segment: "Paper 2: Computational Thinking, Algorithms and Programming",
      subtopic: "Images",
      type: "workbook",
      page_url: "../workbooks/gcse/unit-5/images.html",
      course_units_url: "courses/gcse-computer-science.html",
      topic_management_url: "courses/gcse/unit-5/images.html",
      is_published: true,
      description: "Understand how bitmap images use pixels, resolution, colour depth and metadata."
    },
    {
      id: "gcse-paper-2-unit-6-sound-workbook",
      title: "Sound workbook",
      course: "GCSE Computer Science",
      paper: "Paper 2: Computational Thinking, Algorithms and Programming",
      unit: "6. Data Representation",
      segment: "Paper 2: Computational Thinking, Algorithms and Programming",
      subtopic: "Sound",
      type: "workbook",
      page_url: "../workbooks/gcse/unit-5/sound.html",
      course_units_url: "courses/gcse-computer-science.html",
      topic_management_url: "courses/gcse/unit-5/sound.html",
      is_published: true,
      description: "Understand how sound is sampled and stored using sample rate, bit depth and duration."
    },
    {
      id: "btec-unit-21-learning-aim-a-workbook",
      title: "Learning Aim A workbook",
      course: "BTEC IT",
      unit: "Unit 21: Business Process Modelling Tools",
      segment: "Unit 21",
      learning_aim: "Learning Aim A",
      subtopic: "Business processes",
      type: "workbook",
      page_url: "../workbooks/btec/unit-21/learning-aim-a.html",
      course_units_url: "courses/btec-it.html",
      topic_management_url: "courses/btec/unit-21/learning-aim-a.html",
      is_published: true,
      description: "Understand business processes, organisational aims, departments and the drivers for change."
    },
    {
      id: "btec-unit-21-learning-aim-a-quiz",
      title: "Learning Aim A quiz",
      course: "BTEC IT",
      unit: "Unit 21: Business Process Modelling Tools",
      segment: "Unit 21",
      learning_aim: "Learning Aim A",
      subtopic: "Business processes",
      type: "quiz",
      page_url: "../quizzes/btec/unit-21/learning-aim-a-quiz-1.html",
      course_units_url: "courses/btec-it.html",
      topic_management_url: "courses/btec/unit-21/learning-aim-a.html",
      is_published: false,
      description: "A draft knowledge check for Unit 21 Learning Aim A."
    }
  ],

  async getPublishedItems() {
    return {
      data: this.sampleItems.filter((item) => item.is_published),
      error: null
    };
  },

  async getAllItems() {
    return {
      data: this.sampleItems,
      error: null
    };
  },

  async updatePublishedStatus(itemId, isPublished) {
    const item = this.sampleItems.find((entry) => entry.id === itemId);
    if (item) item.is_published = isPublished;
    return { data: item || null, error: null };
  }
};
