"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BASE = "http://localhost:5000/api";

async function apiRequest(path: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("dealzo_token") : null;
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [fields, setFields] = useState({ email: "", password: "", confirmPw: "", firstName: "", lastName: "", agree: false });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  function validate() {
    const e: Record<string, string> = {};
    if (!fields.email.includes("@")) e.email = "Enter a valid email";
    if (fields.password.length < 8) e.password = "Password must be at least 8 characters";
    if (mode === "signup") {
      if (!fields.firstName.trim()) e.firstName = "First name is required";
      if (!fields.lastName.trim()) e.lastName = "Last name is required";
      if (fields.password !== fields.confirmPw) e.confirmPw = "Passwords don't match";
      if (!fields.agree) e.agree = "You must agree to the terms";
    }
    return e;
  }

  const errors = validate();
  const hasErrors = Object.keys(errors).length > 0;

  async function handleSubmit() {
    setTouched({ email: true, password: true, confirmPw: true, firstName: true, lastName: true, agree: true });
    if (hasErrors) return;
    setLoading(true);
    setApiError("");
    try {
      if (mode === "signup") {
        const data = await apiRequest("/auth/register", {
          method: "POST",
          body: JSON.stringify({
            username: `${fields.firstName}${fields.lastName}`.toLowerCase(),
            email: fields.email,
            password: fields.password,
          }),
        });
        localStorage.setItem("dealzo_token", data.token);
        localStorage.setItem("dealzo_user", JSON.stringify(data.user));
      } else {
        const data = await apiRequest("/auth/login", {
          method: "POST",
          body: JSON.stringify({ email: fields.email, password: fields.password }),
        });
        localStorage.setItem("dealzo_token", data.token);
        localStorage.setItem("dealzo_user", JSON.stringify(data.user));
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function field(key: keyof typeof fields, label: string, type = "text", placeholder = "") {
    const err = touched[key] && errors[key];
    return (
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#aaa", marginBottom: 6 }}>{label}</label>
        <input
          type={type}
          value={fields[key] as string}
          placeholder={placeholder}
          onChange={e => setFields(f => ({ ...f, [key]: e.target.value }))}
          onBlur={() => setTouched(t => ({ ...t, [key]: true }))}
          style={{
            width: "100%", background: "#0f0f13", border: `1px solid ${err ? "#f87171" : "#2a2a35"}`,
            borderRadius: 10, padding: "11px 14px", color: "#fff", fontSize: 14, outline: "none",
            boxSizing: "border-box"
          }}
        />
        {err && <p style={{ color: "#f87171", fontSize: 12, marginTop: 4 }}>{err}</p>}
      </div>
    );
  }

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f0f13", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>{mode === "signup" ? "🎉" : "👋"}</div>
          <h2 style={{ fontWeight: 800, fontSize: 28, color: "#fff", marginBottom: 8 }}>
            {mode === "signup" ? `Welcome, ${fields.firstName}!` : "Welcome back!"}
          </h2>
          <p style={{ color: "#aaa", fontSize: 16, marginBottom: 32 }}>
            {mode === "signup" ? "Your account is ready. Start browsing verified electronics." : "You're signed in. Good to have you back on Dealzo."}
          </p>
          <button onClick={() => router.push("/")}
            style={{ background: "linear-gradient(90deg, #a78bfa, #818cf8)", border: "none", color: "#fff", fontWeight: 700, fontSize: 16, borderRadius: 999, padding: "14px 36px", cursor: "pointer" }}>
            Go to marketplace →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f13", fontFamily: "system-ui, sans-serif", display: "flex", flexDirection: "column" }}>
      <nav style={{ background: "#18181f", borderBottom: "1px solid #2a2a35", padding: "0 24px", height: 60, display: "flex", alignItems: "center" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <span style={{ fontSize: 22 }}>⚡</span>
          <span style={{ fontWeight: 700, fontSize: 20, color: "#a78bfa" }}>Dealzo</span>
        </a>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 440 }}>
          <div style={{ background: "#18181f", border: "1px solid #2a2a35", borderRadius: 20, padding: 32 }}>

            <div style={{ display: "flex", background: "#0f0f13", borderRadius: 12, padding: 4, marginBottom: 28 }}>
              {(["login", "signup"] as const).map(m => (
                <button key={m} onClick={() => { setMode(m); setTouched({}); setApiError(""); }}
                  style={{ flex: 1, background: mode === m ? "#a78bfa" : "transparent", border: "none", color: mode === m ? "#fff" : "#666", fontWeight: 600, fontSize: 14, borderRadius: 10, padding: "8px 0", cursor: "pointer" }}>
                  {m === "login" ? "Sign in" : "Create account"}
                </button>
              ))}
            </div>

            <h2 style={{ fontWeight: 800, fontSize: 22, color: "#fff", marginBottom: 4 }}>
              {mode === "login" ? "Sign in to Dealzo" : "Create your account"}
            </h2>
            <p style={{ color: "#555", fontSize: 14, marginBottom: 24 }}>
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setTouched({}); setApiError(""); }}
                style={{ background: "none", border: "none", color: "#a78bfa", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
                {mode === "login" ? "Sign up free →" : "Sign in →"}
              </button>
            </p>

            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              {[["G", "Google"], ["🍎", "Apple"]].map(([icon, label]) => (
                <button key={label} style={{ flex: 1, background: "#0f0f13", border: "1px solid #2a2a35", color: "#ccc", borderRadius: 10, padding: "10px 0", cursor: "pointer", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <span style={{ fontWeight: 700 }}>{icon}</span> {label}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: "#2a2a35" }} />
              <span style={{ color: "#444", fontSize: 12 }}>or continue with email</span>
              <div style={{ flex: 1, height: 1, background: "#2a2a35" }} />
            </div>

            {apiError && (
              <div style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 10, padding: "10px 14px", marginBottom: 16, color: "#f87171", fontSize: 13 }}>
                ⚠️ {apiError}
              </div>
            )}

            {mode === "signup" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>{field("firstName", "First name", "text", "John")}</div>
                <div>{field("lastName", "Last name", "text", "Doe")}</div>
              </div>
            )}
            {field("email", "Email address", "email", "you@example.com")}
            {field("password", "Password", "password", "Min. 8 characters")}
            {mode === "signup" && field("confirmPw", "Confirm password", "password", "Repeat password")}

            {mode === "signup" && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                  <input type="checkbox" checked={fields.agree}
                    onChange={e => setFields(f => ({ ...f, agree: e.target.checked }))}
                    style={{ marginTop: 2, accentColor: "#a78bfa" }} />
                  <span style={{ fontSize: 13, color: "#666", lineHeight: 1.5 }}>
                    I agree to the <span style={{ color: "#a78bfa" }}>Terms of Service</span> and <span style={{ color: "#a78bfa" }}>Privacy Policy</span>
                  </span>
                </label>
                {touched.agree && errors.agree && <p style={{ color: "#f87171", fontSize: 12, marginTop: 4 }}>{errors.agree}</p>}
              </div>
            )}

            {mode === "login" && (
              <div style={{ textAlign: "right", marginBottom: 16, marginTop: -8 }}>
                <button style={{ background: "none", border: "none", color: "#a78bfa", fontSize: 13, cursor: "pointer" }}>Forgot password?</button>
              </div>
            )}

            <button onClick={handleSubmit} disabled={loading}
              style={{ width: "100%", background: loading ? "#333" : "linear-gradient(90deg, #a78bfa, #818cf8)", border: "none", color: "#fff", fontWeight: 700, fontSize: 16, borderRadius: 12, padding: "13px 0", cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? "Please wait…" : mode === "login" ? "Sign in →" : "Create account →"}
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 24 }}>
            {["🔒 Secure login", "🛡️ Buyer protection", "⚡ Free to join"].map(t => (
              <span key={t} style={{ color: "#444", fontSize: 12 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
