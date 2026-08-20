// Intentionally empty — session state (accessToken/user/userRole) lives in
// localStorage (see src/utils/storage.ts), read directly by the auth guards.
// Build a real slice here if you outgrow that and need reactive auth state
// inside React (e.g. to re-render on login without a route change).
