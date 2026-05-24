// ── api.js — drop this into your React src/ folder ───────────────────────────
// Import and use these functions in your JSX files instead of hardcoded data.

const BASE = "http://localhost:5000/api";

// ── Token helpers (stored in localStorage) ───────────────────────────────────
export const getToken  = ()        => localStorage.getItem("voltex_token");
export const setToken  = (token)   => localStorage.setItem("voltex_token", token);
export const clearToken = ()       => localStorage.removeItem("voltex_token");

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...authHeaders(), ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export const Auth = {
  register: (username, email, password) =>
    request("/auth/register", { method: "POST", body: JSON.stringify({ username, email, password }) }),

  login: (email, password) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),

  me: () => request("/auth/me"),
};

// ── Listings ──────────────────────────────────────────────────────────────────
export const ListingsAPI = {
  // Get all listings — pass filters like { category, condition, search, minPrice, maxPrice, sort }
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return request(`/listings${params ? "?" + params : ""}`);
  },

  getFeatured: () => request("/listings/featured"),

  getById: (id) => request(`/listings/${id}`),

  // Create a listing with optional image files (File objects)
  create: (formData) => {
    // formData is a FormData object — do NOT set Content-Type header (browser sets boundary)
    return fetch(`${BASE}/listings`, {
      method: "POST",
      headers: authHeaders(),
      body: formData,
    }).then(r => r.json());
  },

  update: (id, updates) =>
    request(`/listings/${id}`, { method: "PATCH", body: JSON.stringify(updates) }),

  delete: (id) =>
    request(`/listings/${id}`, { method: "DELETE" }),

  markSold: (id) =>
    request(`/listings/${id}`, { method: "PATCH", body: JSON.stringify({ sold: true }) }),
};

// ── Users ─────────────────────────────────────────────────────────────────────
export const UsersAPI = {
  getById:      (id) => request(`/users/${id}`),
  getListings:  (id) => request(`/users/${id}/listings`),
  updateProfile: (updates) =>
    request("/users/me", { method: "PATCH", body: JSON.stringify(updates) }),
};
