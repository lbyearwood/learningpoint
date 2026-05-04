document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const message = document.getElementById("loginMessage");
  const signInButton = document.getElementById("signInButton");

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = form.elements.email.value.trim();
    const password = form.elements.password.value;
    const selectedRole = form.elements.testRole ? form.elements.testRole.value : "";
    const isTemporaryTestLogin = Boolean(form.elements.testRole);
    const emailError = isTemporaryTestLogin ? "" : Validation.email(email);
    const passwordError = isTemporaryTestLogin ? "" : Validation.required(password, "Password is required.");

    if (emailError || passwordError) {
      DOM.setMessage(message, emailError || passwordError, "error");
      return;
    }

    setLoading(true);
    const { data, error } = await AuthService.signIn(email || "stage1-preview@learningpoint.local", password, selectedRole);
    setLoading(false);

    if (error) {
      DOM.setMessage(message, error, "error");
      return;
    }

    DOM.setMessage(message, "Signed in successfully.", "success");
    const role = data && data.user ? data.user.role : selectedRole || "student";
    window.location.href = role === "admin" ? "admin/control-panel.html" : "student/dashboard.html";
  });

  function setLoading(isLoading) {
    if (!signInButton) return;
    signInButton.disabled = isLoading;
    const text = signInButton.querySelector(".button-text");
    const loading = signInButton.querySelector(".button-loading");
    if (text) text.hidden = isLoading;
    if (loading) loading.hidden = !isLoading;
  }
});
