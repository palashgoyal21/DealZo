"use client";
import React, { useState } from "react";

const SELLERS: Record<string, {
  id: string; name: string; joined: string; sales: number; rating: number;
  reviews: number; responseTime: string; bio: string; verified: boolean;
  totalEarnings: string; location: string;
}> = {
  techresell: { id: "techresell", name: "TechResell", joined: "January 2022", sales: 312, rating: 4.9, reviews: 128, responseTime: "< 1 hour", bio: "Professional electronics reseller. I specialize in iPhones, MacBooks, and iPads. All items thoroughly tested before listing. Fast shipping guaranteed.", verified: true, totalEarnings: "$48,200", location: "New York, NY" },
  laptopking: { id: "laptopking", name: "LaptopKing", joined: "March 2021", sales: 189, rating: 4.7, reviews: 84, responseTime: "< 2 hours", bio: "Laptop specialist with 5+ years of experience. Every laptop is tested, cleaned, and reset before sale. Honest descriptions always.", verified: true, totalEarnings: "$31,500", location: "Austin, TX" },
  phonedeals: { id: "phonedeals", name: "PhoneDeals", joined: "August 2023", sales: 57, rating: 5.0, reviews: 43, responseTime: "< 30 min", bio: "New seller but serious about quality. Only selling personal devices that I've owned and cared for.", verified: false, totalEarnings: "$8,900", location: "Chicago, IL" },
  audiopro: { id: "audiopro", name: "AudioPro", joined: "June 2020", sales: 445, rating: 4.8, reviews: 212, responseTime: "< 1 hour", bio: "Audio equipment expert. Headphones, speakers, DACs, and more. Packaging is always professional and secure.", verified: true, totalEarnings: "$67,300", location: "Los Angeles, CA" },
};

const LISTINGS = [
  { id: 1, title: "iPhone 15 Pro 256GB", condition: "Excellent", price: 749, original: 999, icon: "📱", seller: "techresell", badge: "Fast Ship" },
  { id: 2, title: "MacBook Air M2 8GB/256GB", condition: "Good", price: 849, original: 1099, icon: "💻", seller: "laptopking", badge: "Verified" },
  { id: 3, title: "Samsung Galaxy S24", condition: "Like New", price: 589, original: 799, icon: "📱", seller: "phonedeals", badge: "Like New" },
  { id: 4, title: "Sony WH-1000XM5", condition: "Excellent", price: 199, original: 349, icon: "🎧", seller: "audiopro", badge: null },
  { id: 5, title: "iPad Air 5th Gen 64GB", condition: "Good", price: 349, original: 599, icon: "🖥️", seller: "techresell", badge: null },
  { id: 6, title: "PS5 Console + Controller", condition: "Like New", price: 399, original: 499, icon: "🎮", seller: "techresell", badge: "Hot Deal" },
];

const REVIEWS = [
  { name: "Marcus T.", rating: 5, date: "2 weeks ago", text: "Super fast shipping, item exactly as described. Would buy again!" },
  { name: "Sarah K.", rating: 5, date: "1 month ago", text: "Great seller, very responsive. Item in perfect condition." },
  { name: "James R.", rating: 4, date: "2 months ago", text: "Good experience overall. Took a couple days to ship but worth it." },
  { name: "Priya M.", rating: 5, date: "3 months ago", text: "Honest description, fast shipping. My go-to seller on Dealzo!" },
];

const COND_COLORS: Record<string, { bg: string; text: string }> = {
  "Like New": { bg: "#e6f4ea", text: "#1a6b2e" },
  "Excellent": { bg: "#e8f0fe", text: "#1a4fa0" },
  "Good": { bg: "#fef3e2", text: "#92400e" },
};

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const seller = SELLERS[id] || SELLERS["techresell"];
  const sellerListings = LISTINGS.filter(l => l.seller === seller.id);
  const [activeTab, setActiveTab] = useState<"listings" | "reviews">("listings");
  const [following, setFollowing] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f13", color: "#fff", fontFamily: "system-ui, sans-serif" }}>

      {/* NAV */}
      <nav style={{ background: "#18181f", borderBottom: "1px solid #2a2a35", padding: "0 24px", height: 60, display: "flex", alignItems: "center", gap: 16, position: "sticky", top: 0, zIndex: 100 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <span style={{ fontSize: 22 }}>⚡</span>
          <span style={{ fontWeight: 700, fontSize: 20, color: "#a78bfa" }}>Dealzo</span>
        </a>
        <span style={{ color: "#444", fontSize: 14 }}>/ Sellers / {seller.name}</span>
        <div style={{ marginLeft: "auto" }}>
          <a href="/login" style={{ background: "#a78bfa", border: "none", color: "#fff", fontWeight: 600, fontSize: 14, borderRadius: 999, padding: "8px 20px", textDecoration: "none" }}>Sign up</a>
        </div>
      </nav>

      {/* COVER */}
      <div style={{ height: 140, background: "linear-gradient(135deg, #1a103a 0%, #0f0f13 100%)", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(167,139,250,0.2) 0%, transparent 70%)" }} />
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>

        {/* PROFILE HEADER */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 20, marginTop: -48, marginBottom: 24, flexWrap: "wrap" }}>
          <div style={{ width: 96, height: 96, borderRadius: "50%", background: "linear-gradient(135deg, #a78bfa, #60a5fa)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 36, border: "4px solid #0f0f13", flexShrink: 0 }}>
            {seller.name[0]}
          </div>
          <div style={{ flex: 1, paddingBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h1 style={{ fontWeight: 800, fontSize: 24, margin: 0 }}>{seller.name}</h1>
              {seller.verified && (
                <span style={{ background: "rgba(74,222,128,0.15)", color: "#4ade80", fontSize: 12, fontWeight: 600, borderRadius: 999, padding: "3px 10px", display: "flex", alignItems: "center", gap: 4 }}>
                  ✓ Verified seller
                </span>
              )}
            </div>
            <div style={{ color: "#666", fontSize: 14, marginTop: 4 }}>📍 {seller.location} · Member since {seller.joined}</div>
          </div>
          <div style={{ display: "flex", gap: 10, paddingBottom: 8 }}>
            <button onClick={() => setFollowing(!following)}
              style={{ background: following ? "rgba(167,139,250,0.15)" : "transparent", border: `1px solid ${following ? "#a78bfa" : "#2a2a35"}`, color: following ? "#a78bfa" : "#ccc", fontWeight: 600, fontSize: 14, borderRadius: 999, padding: "8px 20px", cursor: "pointer" }}>
              {following ? "✓ Following" : "+ Follow"}
            </button>
            <button style={{ background: "#a78bfa", border: "none", color: "#fff", fontWeight: 600, fontSize: 14, borderRadius: 999, padding: "8px 20px", cursor: "pointer" }}>
              💬 Message
            </button>
          </div>
        </div>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 24 }}>
          {[
            ["⭐", `${seller.rating}`, "Rating"],
            ["📦", `${seller.sales}`, "Total sales"],
            ["💬", `${seller.reviews}`, "Reviews"],
            ["⚡", seller.responseTime, "Response time"],
          ].map(([icon, val, label]) => (
            <div key={label} style={{ background: "#18181f", border: "1px solid #2a2a35", borderRadius: 14, padding: "16px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 20, color: "#a78bfa", marginBottom: 2 }}>{val}</div>
              <div style={{ fontSize: 12, color: "#555" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* BIO */}
        <div style={{ background: "#18181f", border: "1px solid #2a2a35", borderRadius: 16, padding: 20, marginBottom: 24 }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>About</h3>
          <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{seller.bio}</p>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: 4, background: "#18181f", borderRadius: 12, padding: 4, marginBottom: 20, width: "fit-content" }}>
          {(["listings", "reviews"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ background: activeTab === tab ? "#a78bfa" : "transparent", border: "none", color: activeTab === tab ? "#fff" : "#666", fontWeight: 600, fontSize: 14, borderRadius: 10, padding: "8px 20px", cursor: "pointer", textTransform: "capitalize" }}>
              {tab} {tab === "listings" ? `(${sellerListings.length})` : `(${REVIEWS.length})`}
            </button>
          ))}
        </div>

        {/* LISTINGS TAB */}
        {activeTab === "listings" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16, marginBottom: 40 }}>
            {sellerListings.length > 0 ? sellerListings.map(item => {
              const cond = COND_COLORS[item.condition] || { bg: "#eee", text: "#333" };
              const discount = Math.round((1 - item.price / item.original) * 100);
              return (
                <a key={item.id} href={`/listings/${item.id}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#18181f", border: "1px solid #2a2a35", borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "border-color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "#a78bfa")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "#2a2a35")}>
                    <div style={{ background: "#0f0f13", height: 140, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60, position: "relative" }}>
                      {item.icon}
                      {item.badge && <span style={{ position: "absolute", top: 10, left: 10, background: "#a78bfa", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 999, padding: "2px 8px" }}>{item.badge}</span>}
                    </div>
                    <div style={{ padding: 14 }}>
                      <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                        <span style={{ background: cond.bg, color: cond.text, fontSize: 10, fontWeight: 600, borderRadius: 999, padding: "2px 8px" }}>{item.condition}</span>
                        <span style={{ background: "rgba(74,222,128,0.15)", color: "#4ade80", fontSize: 10, fontWeight: 600, borderRadius: 999, padding: "2px 8px" }}>-{discount}%</span>
                      </div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: "#f0f0f0", marginBottom: 6 }}>{item.title}</div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                        <span style={{ fontSize: 20, fontWeight: 800, color: "#a78bfa" }}>${item.price}</span>
                        <span style={{ fontSize: 12, color: "#555", textDecoration: "line-through" }}>${item.original}</span>
                      </div>
                    </div>
                  </div>
                </a>
              );
            }) : (
              <div style={{ color: "#555", fontSize: 14, padding: "40px 0" }}>No active listings from this seller.</div>
            )}
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === "reviews" && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ background: "#18181f", border: "1px solid #2a2a35", borderRadius: 16, padding: 24, marginBottom: 16, display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 48, fontWeight: 800, color: "#a78bfa" }}>{seller.rating}</div>
                <div style={{ color: "#facc15", fontSize: 20 }}>{"★".repeat(Math.round(seller.rating))}</div>
                <div style={{ color: "#555", fontSize: 12, marginTop: 4 }}>{seller.reviews} reviews</div>
              </div>
              <div style={{ flex: 1 }}>
                {[5, 4, 3, 2, 1].map(star => {
                  const pct = star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : star === 2 ? 1 : 1;
                  return (
                    <div key={star} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ color: "#facc15", fontSize: 12, width: 12 }}>{star}★</span>
                      <div style={{ flex: 1, height: 6, background: "#2a2a35", borderRadius: 999 }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: "#facc15", borderRadius: 999 }} />
                      </div>
                      <span style={{ color: "#555", fontSize: 12, width: 28 }}>{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ background: "#18181f", border: "1px solid #2a2a35", borderRadius: 14, padding: 18, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #a78bfa, #60a5fa)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>
                      {r.name[0]}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</span>
                  </div>
                  <span style={{ color: "#555", fontSize: 12 }}>{r.date}</span>
                </div>
                <div style={{ color: "#facc15", fontSize: 13, marginBottom: 6 }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
