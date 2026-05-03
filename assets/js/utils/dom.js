const DOM = {
  get(selector, parent = document) {
    return parent.querySelector(selector);
  },

  getAll(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
  },

  setText(selector, text) {
    const element = this.get(selector);
    if (element) element.textContent = text;
  },

  setMessage(element, message, type = "") {
    if (!element) return;
    element.textContent = message;
    element.className = `form-message ${type}`.trim();
  }
};
