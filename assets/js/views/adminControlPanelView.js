const AdminControlPanelView = {
  renderLearningItems(container, items) {
    if (!container) return;

    if (!items.length) {
      container.innerHTML = `<article class="admin-row"><div><strong>No records</strong><p>No items found.</p></div></article>`;
      return;
    }

    container.innerHTML = items.map((item) => this.itemTemplate(item)).join("");
  },

  itemTemplate(item) {
    const meta = [item.course, item.paper, item.unit, item.learning_aim, item.subtopic].filter(Boolean).join(" > ");
    const statusClass = item.is_published ? "published" : "draft";
    const statusText = item.is_published ? "Published" : "Draft";
    const buttonClass = item.is_published ? "toggle-button is-published" : "toggle-button";
    const buttonText = item.is_published ? "Unpublish" : "Publish";

    return `
      <article class="admin-row" data-item-id="${this.escape(item.id)}">
        <div>
          <span class="status-pill ${statusClass}">${statusText}</span>
          <h3>${this.escape(item.title)}</h3>
          <p>${this.escape(meta)}</p>
          <p>${this.escape(item.description)}</p>
        </div>
        <button class="${buttonClass}" type="button" data-publish-toggle="${this.escape(item.id)}" data-current-status="${item.is_published}">${buttonText}</button>
      </article>
    `;
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

  escape(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
};
