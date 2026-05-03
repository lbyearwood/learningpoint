const StudentDashboardView = {
  renderCards(container, items) {
    if (!container) return;

    if (!items.length) {
      container.innerHTML = `<article class="info-card"><h3>No published items yet</h3><p>Your teacher has not published anything in this section yet.</p></article>`;
      return;
    }

    container.innerHTML = items.map((item) => this.cardTemplate(item)).join("");
  },

  cardTemplate(item) {
    const meta = [item.paper, item.unit, item.learning_aim, item.subtopic].filter(Boolean).join(" > ");
    return `
      <article class="content-card">
        <span class="card-label">${this.escape(item.course)}</span>
        <h3>${this.escape(item.title)}</h3>
        <p><strong>${this.escape(meta)}</strong></p>
        <p>${this.escape(item.description)}</p>
        <a class="button button-primary" href="${this.escape(item.page_url)}">Open ${this.escape(item.type)}</a>
      </article>
    `;
  },

  renderScores(container, scores) {
    if (!container) return;

    if (!scores.length) {
      container.innerHTML = `<tr><td colspan="3">No quiz scores yet.</td></tr>`;
      return;
    }

    container.innerHTML = scores.map((score) => `
      <tr>
        <td>${this.escape(score.quiz)}</td>
        <td>${this.escape(score.score)}</td>
        <td>${this.escape(score.date)}</td>
      </tr>
    `).join("");
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
