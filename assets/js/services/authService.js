const AuthService = {
  async signIn(email, password) {
    if (!SupabaseClient.isReady()) {
      return {
        data: null,
        error: "Supabase is not connected yet. Add your project URL and anon key in assets/js/config/supabase-config.js."
      };
    }

    // TODO Stage 2:
    // Use Supabase Auth here once the client is wired in.
    // Example:
    // return await supabase.auth.signInWithPassword({ email, password });
    return {
      data: null,
      error: "Supabase configuration was found, but live authentication has not been wired in yet."
    };
  },

  async getCurrentUser() {
    // TODO Stage 2: return the current Supabase authenticated user.
    return { data: null, error: null };
  },

  async signOut() {
    // TODO Stage 2: call supabase.auth.signOut().
    return { error: null };
  },

  async requireRole(allowedRoles) {
    // TODO Stage 3:
    // Check the current user session, load the profile role and redirect if not authorised.
    // Real protection must also be enforced using Supabase Row Level Security.
    return { authorised: true, role: "preview", allowedRoles };
  }
};
