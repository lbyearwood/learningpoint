const ProfileService = {
  async getCurrentProfile() {
    // TODO Stage 3:
    // Load the current user's profile from Supabase after login.
    // The role must come from the profiles table, not from a role selector on the login page.
    return {
      data: {
        first_name: "Student",
        last_name: "Preview",
        role: "student",
        class_name: "Preview class"
      },
      error: null
    };
  }
};
