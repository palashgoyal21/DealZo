"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { id: "phones", label: "Phones", icon: "📱" },
  { id: "laptops", label: "Laptops", icon: "💻" },
  { id: "tablets", label: "Tablets", icon: "🖥️" },
  { id: "cameras", label: "Cameras", icon: "📷" },
  { id: "audio", label: "Audio", icon: "🎧" },
  { id: "gaming", label: "Gaming", icon: "🎮" },
  { id: "watches", label: "Watches", icon: "⌚" },
  { id: "other", label: "Other", icon: "🔌" },
];

const LISTINGS = [
  { id: 1, title: "iPhone 15 Pro 256GB", condition: "Excellent", price: 749, original: 999, icon: "📱", seller: "TechResell", sellerId: "techresell", rating: 4.9, reviews: 128, badge: "Fast Ship" },
  { id: 2, title: "MacBook Air M2 8GB/256GB", condition: "Good", price: 849, original: 1099, icon: "💻", seller: "LaptopKing", sellerId: "laptopking", rating: 4.7, reviews: 84, badge: "Verified" },
  { id: 3, title: "Samsung Galaxy S24", condition: "Like New", price: 589, original: 799, icon: "📱", seller: "PhoneDeals", sellerId: "phonedeals", rating: 5.0, reviews: 43, badge: "Like New" },
  { id: 4, title: "Sony WH-1000XM5", condition: "Excellent", price: 199, original: 349, icon: "🎧", seller: "AudioPro", sellerId: "audiopro", rating: 4.8, reviews: 212, badge: null },
  { id: 5, title: "iPad Air 5th Gen 64GB", condition: "Good", price: 349, original: 599, icon: "🖥️", seller: "TabletHub", sellerId: "techresell", rating: 4.6, reviews: 67, badge: null },
  { id: 6, title: "PS5 Console + Controller", condition: "Like New", price: 399, original: 499, icon: "🎮", seller: "GamingVault", sellerId: "techresell", rating: 4.9, reviews: 156, badge: "Hot Deal" },
];

const COND_COLORS: Record<string, { bg: string; text: string }> = {
  "Like New": { bg: "#e6f4ea", text: "#1a6b2e" },
  "Excellent": { bg: "#e8f0fe", text: "#1a4fa0" },
  "Good": { bg: "#fef3e2", text: "#92400e" },
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [activecat, setActivecat] = useState<string | null>(null);
  const [saved, setSaved] = useState<Record<number, boolean>>({});
  const router = useRouter();

  const filtered = LISTINGS.filter((l) =>
    l.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f13", color: "#fff", fontFamily: "system-ui, sans-serif" }}>

      {/* NAV */}
      <nav style={{ background: "#18181f", borderBottom: "1px solid #2a2a35", padding: "0 24px", height: 60, display: "flex", alignItems: "center", gap: 16, position: "sticky", top: 0, zIndex: 100 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <span style={{ fontSize: 22 }}>⚡</span>
          <span style={{ fontWeight: 700, fontSize: 20, color: "#a78bfa" }}>Dealzo</span>
        </a>
        <div style={{ flex: 1, position: "relative", maxWidth: 480 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: 0.4 }}>🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search phones, laptops, headphones…"
            style={{ width: "100%", background: "#0f0f13", border: "1px solid #2a2a35", borderRadius: 999, padding: "8px 16px 8px 36px", color: "#fff", fontSize: 14, outline: "none" }}
          />
        </div>
        <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
          <a href="/" style={{ background: "none", border: "none", color: "#aaa", fontSize: 14, cursor: "pointer", padding: "6px 12px", borderRadius: 8, textDecoration: "none" }}>Browse</a>
          <a href="/sell" style={{ background: "none", border: "none", color: "#aaa", fontSize: 14, cursor: "pointer", padding: "6px 12px", borderRadius: 8, textDecoration: "none" }}>Sell</a>
          <a href="/login" style={{ background: "none", border: "none", color: "#aaa", fontSize: 14, cursor: "pointer", padding: "6px 12px", borderRadius: 8, textDecoration: "none" }}>Deals</a>
          <a href="/login" style={{ background: "#a78bfa", border: "none", color: "#fff", fontWeight: 600, fontSize: 14, borderRadius: 999, padding: "8px 20px", cursor: "pointer", textDecoration: "none" }}>Sign up</a>
        </div>
      </nav>

      {/* HERO */}
      {!search && (
        <div style={{ background: "linear-gradient(135deg, #1a103a 0%, #0f0f13 60%)", padding: "64px 24px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -80, left: "20%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ display: "inline-block", background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: 999, padding: "6px 16px", fontSize: 13, color: "#a78bfa", marginBottom: 20 }}>
            Trusted by 50,000+ buyers &amp; sellers
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
            Buy &amp; sell electronics<br />
            <span style={{ background: "linear-gradient(90deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>without the guesswork.</span>
          </h1>
          <p style={{ color: "#aaa", fontSize: 18, maxWidth: 480, margin: "0 auto 32px" }}>Every listing is verified. Every seller is rated. No fees until you sell.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })} style={{ background: "#a78bfa", border: "none", color: "#fff", fontWeight: 700, fontSize: 16, borderRadius: 999, padding: "14px 32px", cursor: "pointer" }}>Browse listings →</button>
            <a href="/sell" style={{ background: "transparent", border: "1px solid #333", color: "#fff", fontWeight: 600, fontSize: 16, borderRadius: 999, padding: "14px 32px", cursor: "pointer", textDecoration: "none" }}>Start selling</a>
          </div>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}>
            {[["12,000+", "Active listings"], ["50K+", "Happy buyers"], ["4.9★", "Avg seller rating"], ["$0", "Fees to browse"]].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 700, fontSize: 22, color: "#a78bfa" }}>{val}</div>
                <div style={{ fontSize: 13, color: "#666" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CATEGORIES */}
      {!search && (
        <div style={{ padding: "32px 24px 8px", maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 16 }}>Browse by category</h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActivecat(activecat === c.id ? null : c.id)}
                style={{
                  background: activecat === c.id ? "#a78bfa" : "#18181f",
                  border: `1px solid ${activecat === c.id ? "#a78bfa" : "#2a2a35"}`,
                  color: activecat === c.id ? "#fff" : "#ccc",
                  borderRadius: 999,
                  padding: "8px 18px",
                  fontSize: 14,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontWeight: 500,
                }}
              >
                <span>{c.icon}</span> {c.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* LISTINGS */}
      <div style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 20 }}>{search ? `Results for "${search}"` : "Featured listings"}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {filtered.map((item) => {
            const cond = COND_COLORS[item.condition] || { bg: "#eee", text: "#333" };
            const discount = Math.round((1 - item.price / item.original) * 100);
            return (
              <div key={item.id} style={{ background: "#18181f", border: "1px solid #2a2a35", borderRadius: 16, overflow: "hidden", transition: "border-color 0.2s", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#a78bfa")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2a2a35")}
              >
                <div onClick={() => router.push(`/listings/${item.id}`)} style={{ background: "#0f0f13", height: 160, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, position: "relative" }}>
                  {item.icon}
                  {item.badge && (
                    <span style={{ position: "absolute", top: 12, left: 12, background: "#a78bfa", color: "#fff", fontSize: 11, fontWeight: 700, borderRadius: 999, padding: "3px 10px" }}>{item.badge}</span>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); setSaved((s) => ({ ...s, [item.id]: !s[item.id] })); }}
                    style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    {saved[item.id] ? "❤️" : "🤍"}
                  </button>
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ background: cond.bg, color: cond.text, fontSize: 11, fontWeight: 600, borderRadius: 999, padding: "2px 10px" }}>{item.condition}</span>
                    <span style={{ background: "rgba(74,222,128,0.15)", color: "#4ade80", fontSize: 11, fontWeight: 600, borderRadius: 999, padding: "2px 10px" }}>-{discount}%</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 10, color: "#f0f0f0" }}>{item.title}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 22, fontWeight: 800, color: "#a78bfa" }}>${item.price}</span>
                    <span style={{ fontSize: 13, color: "#555", textDecoration: "line-through" }}>${item.original}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <a href={`/profile/${item.sellerId}`} onClick={e => e.stopPropagation()} style={{ fontSize: 13, color: "#888", textDecoration: "none" }}>by <span style={{ color: "#a78bfa" }}>{item.seller}</span></a>
                    <span style={{ fontSize: 13, color: "#facc15" }}>★ {item.rating} <span style={{ color: "#555" }}>({item.reviews})</span></span>
                  </div>
                  <button onClick={() => router.push(`/listings/${item.id}`)} style={{ width: "100%", background: "linear-gradient(90deg, #a78bfa, #818cf8)", border: "none", color: "#fff", fontWeight: 700, fontSize: 14, borderRadius: 10, padding: "10px 0", cursor: "pointer" }}>
                    View listing →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", color: "#555", padding: "60px 0" }}>No listings found for "{search}"</div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #2a2a35", padding: "32px 24px", textAlign: "center", color: "#444", fontSize: 13, marginTop: 40 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 12 }}>
          <a href="/sell" style={{ color: "#666", textDecoration: "none" }}>Sell</a>
          <a href="/login" style={{ color: "#666", textDecoration: "none" }}>Sign up</a>
          <a href="/login" style={{ color: "#666", textDecoration: "none" }}>Login</a>
        </div>
        <span style={{ color: "#a78bfa", fontWeight: 700 }}>⚡ Dealzo</span> — Buy &amp; sell electronics with confidence. © 2026
      </footer>
    </div>
  );
}
