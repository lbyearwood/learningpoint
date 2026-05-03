const Validation = {
  isBlank(value) {
    return !value || !String(value).trim();
  },

  required(value, message) {
    return this.isBlank(value) ? message : "";
  },

  email(value) {
    if (this.isBlank(value)) return "Email address is required.";
    return /.+@.+\..+/.test(value) ? "" : "Enter a valid email address.";
  }
};
