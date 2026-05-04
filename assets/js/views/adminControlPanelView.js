const AdminControlPanelView = {
  renderCourseBrowser(container, items) {
    if (!container) return;

    if (!items.length) {
      container.innerHTML = `<article class="course-browser-empty"><h3>No courses available</h3><p>Courses will appear here when resources have been added.</p></article>`;
      return;
    }

    container.innerHTML = this.groupCourseCards(items).map((course) => this.courseTemplate(course)).join("");
  },

  groupCourseCards(items) {
    const grouped = items.reduce((courses, item) => {
      const courseName = item.course || "Other";

      if (!courses[courseName]) {
        courses[courseName] = {
          course: courseName,
          segments: new Set(),
          units: new Set(),
          topics: new Set(),
          items: []
        };
      }

      if (item.paper || item.segment) courses[courseName].segments.add(item.paper || item.segment);
      if (item.unit) courses[courseName].units.add(item.unit);
      if (item.learning_aim || item.subtopic) courses[courseName].topics.add(item.learning_aim || item.subtopic);
      courses[courseName].items.push(item);
      return courses;
    }, {});

    return Object.values(grouped).sort((a, b) => this.courseSortValue(a.course) - this.courseSortValue(b.course));
  },

  courseSortValue(courseName) {
    if (courseName === "BTEC IT") return 1;
    if (courseName === "GCSE Computer Science") return 2;
    return 99;
  },

  courseTemplate(course) {
    return `
      <article class="course-browser-card">
        <div class="course-card-main">
          <h3>${this.escape(course.course)}</h3>
          <div class="status-row">
            <span class="status-tag public">Public</span>
            <span class="status-tag available">Available</span>
          </div>
          <p class="course-summary-text">${this.escape(this.courseDescription(course))}</p>
        </div>
        <div class="course-card-actions">
          <a class="resource-link" href="${this.escape(this.courseUnitsUrl(course))}">View course</a>
        </div>
      </article>
    `;
  },

  courseUnitsUrl(course) {
    const itemWithUrl = course.items.find((item) => item.course_units_url);
    if (itemWithUrl) return itemWithUrl.course_units_url;
    return "#";
  },

  courseSummary(course) {
    const topicCount = course.topics.size;
    const resourceCount = course.items.length;
    return `${topicCount} topic${topicCount === 1 ? "" : "s"} · ${resourceCount} resource${resourceCount === 1 ? "" : "s"}`;
  },

  joinSet(values) {
    return Array.from(values).join(", ");
  },

  courseDescription(course) {
    const unitCount = course.units.size;
    const topicCount = course.topics.size;
    const resourceCount = course.items.length;
    return `${unitCount} unit${unitCount === 1 ? "" : "s"} · ${topicCount} topic${topicCount === 1 ? "" : "s"} · ${resourceCount} resource${resourceCount === 1 ? "" : "s"}`;
  },

  topicSummary(items) {
    const publishedCount = items.filter((item) => item.is_published).length;
    return `${publishedCount} of ${items.length} resources published`;
  },

  renderLearningItems(container, items) {
    if (!container) return;

    if (!items.length) {
      container.innerHTML = `<article class="resource-card"><div><strong>No records</strong><p>No items found.</p></div></article>`;
      return;
    }

    container.innerHTML = items.map((item) => this.itemTemplate(item)).join("");
  },

  itemTemplate(item) {
    const statusClass = item.is_published ? "public" : "private";
    const statusText = item.is_published ? "Public" : "Private";

    return `
      <article class="resource-card" data-item-id="${this.escape(item.id)}">
        <div class="resource-card-body">
          <div class="resource-card-header">
            <span class="status-tag ${statusClass}">${statusText}</span>
            <span class="resource-type-tag">${this.escape(item.type)}</span>
          </div>
          <h3>${this.escape(item.title)}</h3>
          <dl class="metadata-list compact">
            ${this.metadataRow("Course", item.course)}
            ${this.metadataRow("Paper", item.paper)}
            ${this.metadataRow("Unit", item.unit)}
            ${this.metadataRow("Learning aim", item.learning_aim)}
            ${this.metadataRow("Subtopic", item.subtopic)}
          </dl>
          <p>${this.escape(item.description)}</p>
        </div>
        <div class="resource-card-actions">
          ${item.page_url ? this.resourceLink(item, "View resource") : ""}
        </div>
      </article>
    `;
  },

  renderTopicResources(container, items) {
    if (!container) return;

    if (!items.length) {
      container.innerHTML = `<article class="topic-resource-card"><strong>No resources found for this topic.</strong></article>`;
      return;
    }

    container.innerHTML = items.map((item) => this.topicResourceTemplate(item)).join("");
  },

  topicResourceTemplate(item) {
    const statusClass = item.is_published ? "public" : "private";
    const statusText = item.is_published ? "Public" : "Private";
    const accessText = item.is_published ? "Visible to students" : "Hidden from students";
    const openLabel = item.type === "quiz" ? "View quiz" : "View workbook";

    return `
      <article class="topic-resource-card" data-item-id="${this.escape(item.id)}">
        <div class="topic-resource-card-header">
          <span class="resource-type-tag">${this.escape(this.titleCase(item.type))}</span>
          <span class="status-tag ${statusClass}">${statusText}</span>
        </div>
        <h3>${this.escape(item.title)}</h3>
        <dl class="topic-resource-meta">
          ${this.metadataRow("Student access", accessText)}
        </dl>
        <p>${this.escape(item.description)}</p>
        <div class="topic-resource-actions">
          ${item.page_url ? this.resourceLink(item, openLabel) : ""}
        </div>
      </article>
    `;
  },

  titleCase(value) {
    const text = String(value || "");
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
  },

  metadataRow(label, value) {
    if (!value) return "";
    return `<div><dt>${this.escape(label)}</dt><dd>${this.escape(value)}</dd></div>`;
  },

  resourceLink(item, label, variant = "") {
    return `<a class="resource-link ${variant} ${this.escape(item.type)}" href="${this.escape(item.page_url)}">${this.escape(label)}</a>`;
  },

  renderResponses(container, responses) {
    if (!container) return;

    if (!responses.length) {
      container.innerHTML = `<tr><td colspan="5">No quiz responses yet.</td></tr>`;
      return;
    }

    container.innerHTML = responses.map((response) => `
      <tr>
        <td>${this.escape(response.student)}</td>
        <td>${this.escape(response.className)}</td>
        <td>${this.escape(response.quiz)}</td>
        <td>${this.escape(response.score)}</td>
        <td>${this.escape(response.submitted)}</td>
      </tr>
    `).join("");
  },

  renderClassCards(container, summaries) {
    if (!container) return;

    if (!summaries.length) {
      container.innerHTML = `<article class="class-card"><h3>No classes available</h3><p>Class summaries will appear here when quiz activity is available.</p></article>`;
      return;
    }

    const classes = summaries.reduce((classMap, summary) => {
      if (!classMap[summary.className]) {
        classMap[summary.className] = {
          className: summary.className,
          courses: new Set(),
          submitted: 0,
          notSubmitted: 0
        };
      }

      classMap[summary.className].courses.add(summary.course);
      classMap[summary.className].submitted += Number(summary.submitted) || 0;
      classMap[summary.className].notSubmitted += Number(summary.notSubmitted) || 0;
      return classMap;
    }, {});

    container.innerHTML = Object.values(classes).sort((a, b) => this.classSortValue(a.className) - this.classSortValue(b.className)).map((classInfo) => `
      <article class="class-card">
        <div class="class-card-main">
          <h3>${this.escape(classInfo.className)}</h3>
          <div class="status-row">
            <span class="status-tag available">${this.escape(Array.from(classInfo.courses).join(", "))}</span>
          </div>
          <p class="course-summary-text">${this.escape(classInfo.submitted)} submitted · ${this.escape(classInfo.notSubmitted)} not submitted</p>
        </div>
        <div class="course-card-actions">
          <a class="resource-link" href="${this.escape(this.classProgressUrl(classInfo.className))}">Review class</a>
        </div>
      </article>
    `).join("");
  },

  classProgressUrl(className) {
    return `classes/${String(className || "").toLowerCase()}.html`;
  },

  classSortValue(className) {
    if (className === "13IT") return 1;
    if (className === "11CS1") return 2;
    return 99;
  },

  renderCourseUnits(container, items) {
    if (!container) return;

    if (!items.length) {
      container.innerHTML = `<article class="course-browser-empty"><h3>No units available</h3><p>Course units will appear here when resources have been added.</p></article>`;
      return;
    }

    const segments = items.reduce((segmentMap, item) => {
      const segment = item.segment || item.paper || item.unit || "Course segment";
      const unit = item.unit || "Course unit";
      const topic = item.learning_aim || item.subtopic || "Unit topic";

      if (!segmentMap[segment]) segmentMap[segment] = {};
      if (!segmentMap[segment][unit]) segmentMap[segment][unit] = {};
      if (!segmentMap[segment][unit][topic]) segmentMap[segment][unit][topic] = [];
      segmentMap[segment][unit][topic].push(item);
      return segmentMap;
    }, {});

    container.innerHTML = Object.keys(segments).map((segment) => `
      <article class="course-browser-card course-unit-card">
        <h3>${this.escape(segment)}</h3>
        ${Object.keys(segments[segment]).map((unit) => `
          <section class="unit-topic-panel">
            <h4>${this.escape(unit)}</h4>
            ${Object.keys(segments[segment][unit]).map((topic) => `
              <article class="topic-management-row">
                <div>
                  <strong>${this.escape(topic)}</strong>
                  <span>${this.escape(this.topicSummary(segments[segment][unit][topic]))}</span>
                </div>
                <a class="resource-link" href="${this.escape(this.relativeTopicUrl(segments[segment][unit][topic][0]))}">View topic</a>
              </article>
            `).join("")}
          </section>
        `).join("")}
      </article>
    `).join("");
  },

  relativeTopicUrl(item) {
    return item.topic_management_url || "#";
  },

  renderClassProgress(container, summaries) {
    if (!container) return;

    if (!summaries.length) {
      container.innerHTML = `<article class="course-browser-empty"><h3>No progress available</h3><p>Class progress will appear here when quiz activity is available.</p></article>`;
      return;
    }

    container.innerHTML = summaries.map((summary) => `
      <article class="class-progress-card">
        <div class="course-card-main">
          <h3>${this.escape(summary.topic || summary.quiz)}</h3>
          <div class="status-row">
            <span class="status-tag available">${this.escape(summary.course)}</span>
            <span class="status-tag public">${this.escape(summary.quiz)}</span>
          </div>
        </div>
        <dl class="metadata-list">
          ${this.metadataRow("Course segment", summary.segment)}
          ${this.metadataRow("Course unit", summary.unit)}
          ${this.metadataRow("Unit topic", summary.topic)}
          ${this.metadataRow("Workbook access", summary.workbookAccess)}
          ${this.metadataRow("Quiz completion", `${summary.submitted} submitted, ${summary.notSubmitted} not submitted`)}
          ${this.metadataRow("Average score", summary.averageScore)}
          ${this.metadataRow("Students not submitted", summary.studentsNotSubmitted)}
        </dl>
        <div class="course-card-actions">
          <a class="resource-link" href="${this.escape(summary.detailUrl)}">View detailed responses</a>
        </div>
      </article>
    `).join("");
  },

  renderClassSummaryRows(container, summaries) {
    if (!container) return;

    if (!summaries.length) {
      container.innerHTML = `<tr><td colspan="8">No quiz response summaries yet.</td></tr>`;
      return;
    }

    container.innerHTML = summaries.map((summary) => `
      <tr>
        <td>${this.escape(summary.className)}</td>
        <td>${this.escape(summary.course)}</td>
        <td>${this.escape(summary.quiz)}</td>
        <td>${this.escape(summary.submitted)}</td>
        <td>${this.escape(summary.notSubmitted)}</td>
        <td>${this.escape(summary.averageScore)}</td>
        <td>${this.escape(summary.lastSubmission)}</td>
        <td><a class="table-action-link" href="quiz-overview.html">Open overview</a></td>
      </tr>
    `).join("");
  },

  renderQuizOverviewRows(container, summaries) {
    if (!container) return;
    this.renderClassSummaryRows(container, summaries);
    container.querySelectorAll("a.table-action-link").forEach((link, index) => {
      link.href = summaries[index] ? summaries[index].detailUrl : "responses.html";
      link.textContent = "View detailed responses";
    });
  },

  escape(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
};
