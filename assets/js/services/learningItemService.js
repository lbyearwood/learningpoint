const LearningItemService = {
  sampleItems: [
    {
      id: "gcse-j277-01-1-1-1-cpu-architecture-workbook",
      title: "1.1.1 Architecture of the CPU workbook",
      course: "GCSE Computer Science",
      component: "J277/01 Computer systems",
      unit: "1.1 Systems architecture",
      topic: "1.1.1 Architecture of the CPU",
      subtopic: "Architecture of the CPU",
      segment: "J277/01 Computer systems",
      type: "workbook",
      page_url: "../workbooks/gcse/j277-01/1-1-systems-architecture/1-1-1-architecture-of-the-cpu.html",
      course_units_url: "courses/gcse-computer-science.html",
      topic_view_url: "courses/gcse/j277-01/subtopics/1-1-1-architecture-of-the-cpu.html",
      is_published: true,
      description: "Learn the purpose of the CPU, the fetch-execute cycle, CPU components and Von Neumann registers."
    },
    {
      id: "gcse-j277-01-1-2-4-characters-workbook",
      title: "Characters workbook",
      course: "GCSE Computer Science",
      component: "J277/01 Computer systems",
      unit: "1.2 Memory and storage",
      topic: "1.2.4 Data representation",
      subtopic: "Characters",
      segment: "J277/01 Computer systems",
      type: "workbook",
      page_url: "../workbooks/gcse/j277-01/1-2-memory-and-storage/1-2-4d-characters.html",
      course_units_url: "courses/gcse-computer-science.html",
      topic_view_url: "courses/gcse/j277-01/subtopics/1-2-4-data-representation.html",
      is_published: true,
      description: "Understand how computers represent characters using binary codes, ASCII, Unicode and character sets."
    },
    {
      id: "gcse-j277-01-1-2-4-characters-quiz",
      title: "Characters quiz",
      course: "GCSE Computer Science",
      component: "J277/01 Computer systems",
      unit: "1.2 Memory and storage",
      topic: "1.2.4 Data representation",
      subtopic: "Characters",
      segment: "J277/01 Computer systems",
      type: "quiz",
      page_url: "../quizzes/gcse/j277-01/1-2-memory-and-storage/1-2-4d-characters.html",
      course_units_url: "courses/gcse-computer-science.html",
      topic_view_url: "courses/gcse/j277-01/subtopics/1-2-4-data-representation.html",
      is_published: true,
      description: "Check your understanding of characters, character sets and binary representation."
    },
    {
      id: "btec-unit-21-learning-aim-a-workbook",
      title: "Learning Aim A workbook",
      course: "BTEC IT",
      unit: "Unit 21: Business Process Modelling Tools",
      segment: "Unit 21",
      learning_aim: "Learning Aim A",
      topic: "Learning Aim A",
      subtopic: "Business processes",
      type: "workbook",
      page_url: "../workbooks/btec/unit-21/learning-aim-a.html",
      course_units_url: "courses/btec-it.html",
      topic_view_url: "courses/btec/unit-21/learning-aim-a.html",
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
      topic: "Learning Aim A",
      subtopic: "Business processes",
      type: "quiz",
      page_url: "../quizzes/btec/unit-21/learning-aim-a-quiz-1.html",
      course_units_url: "courses/btec-it.html",
      topic_view_url: "courses/btec/unit-21/learning-aim-a.html",
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
