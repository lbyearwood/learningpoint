// GitHub Pages only serves the static files for LearningPoint.
// Supabase will later control login, roles, database reads and database writes.
// Real protection must be enforced with Supabase Row Level Security, not only by hiding buttons in JavaScript.
const SupabaseClient = {
  isReady() {
    return typeof isSupabaseConfigured === "function" && isSupabaseConfigured();
  },

  getClient() {
    if (!this.isReady()) {
      return null;
    }

    // TODO: Stage 2
    // Initialise the Supabase JavaScript client here once the local client approach is chosen.
    // Example later:
    // return supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.warn("Supabase configuration is present, but the Supabase client is not wired in yet.");
    return null;
  }
};
