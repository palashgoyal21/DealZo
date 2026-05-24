"use client";
import { useState } from "react";

const LISTINGS: Record<number, any> = {
  1: {
    id: 1, title: "iPhone 15 Pro 256GB", condition: "Excellent", price: 749, original: 999,
    icon: "📱", seller: "TechResell", rating: 4.9, reviews: 128, badge: "Fast Ship",
    description: "iPhone 15 Pro in excellent condition. Used for 6 months, always kept in a case with screen protector. No scratches, dents, or cracks. Battery health at 94%. Comes with original box, unused cable, and documentation. Face ID works perfectly.",
    specs: { Storage: "256GB", Color: "Natural Titanium", "Battery Health": "94%", "OS Version": "iOS 17.4", Carrier: "Unlocked", "Box Included": "Yes" },
    sellerJoined: "Jan 2022", sellerSales: 312,
  },
  2: {
    id: 2, title: "MacBook Air M2 8GB/256GB", condition: "Good", price: 849, original: 1099,
    icon: "💻", seller: "LaptopKing", rating: 4.7, reviews: 84, badge: "Verified",
    description: "MacBook Air M2 in good condition. Light scratches on the bottom lid. Screen is perfect. Battery cycles at 112.",
    specs: { Chip: "Apple M2", RAM: "8GB", Storage: "256GB", Color: "Midnight", "Battery Cycles": "112", "macOS": "Sonoma 14.4" },
    sellerJoined: "Mar 2021", sellerSales: 189,
  },
  3: {
    id: 3, title: "Samsung Galaxy S24", condition: "Like New", price: 589, original: 799,
    icon: "📱", seller: "PhoneDeals", rating: 5.0, reviews: 43, badge: "Like New",
    description: "Samsung Galaxy S24 in like-new condition. Purchased 2 months ago, used lightly. All original accessories included.",
    specs: { Storage: "128GB", Color: "Onyx Black", "Battery Health": "99%", "OS Version": "Android 14", Carrier: "Unlocked", "Box Included": "Yes" },
    sellerJoined: "Aug 2023", sellerSales: 57,
  },
  4: {
    id: 4, title: "Sony WH-1000XM5", condition: "Excellent", price: 199, original: 349,
    icon: "🎧", seller: "AudioPro", rating: 4.8, reviews: 212, badge: null,
    description: "Sony WH-1000XM5 wireless headphones in excellent condition. Used for about 8 months. Comes with carry case and cables.",
    specs: { Color: "Black", "Battery Life": "30hrs", Connectivity: "Bluetooth 5.2", "Noise Cancelling": "Yes", "Case Included": "Yes", Weight: "250g" },
    sellerJoined: "Jun 2020", sellerSales: 445,
  },
  5: {
    id: 5, title: "iPad Air 5th Gen 64GB", condition: "Good", price: 349, original: 599,
    icon: "🖥️", seller: "TabletHub", rating: 4.6, reviews: 67, badge: null,
    description: "iPad Air 5th generation with M1 chip. Good condition with minor wear on the corners. Screen is pristine.",
    specs: { Chip: "Apple M1", Storage: "64GB", Color: "Space Gray", Connectivity: "WiFi", "Battery Health": "91%", "iPadOS": "17.4" },
    sellerJoined: "Nov 2021", sellerSales: 98,
  },
  6: {
    id: 6, title: "PS5 Console + Controller", condition: "Like New", price: 399, original: 499,
    icon: "🎮", seller: "GamingVault", rating: 4.9, reviews: 156, badge: "Hot Deal",
    description: "PlayStation 5 disc edition in like-new condition. Only used for about 3 months. Comes with one DualSense controller.",
    specs: { Edition: "Disc", Storage: "825GB SSD", Controllers: "1x DualSense", "Box Included": "Yes", "System Software": "Latest", "Condition": "Like New" },
    sellerJoined: "Feb 2022", sellerSales: 203,
  },
};

const COND_COLORS: Record<string, { bg: string; text: string }> = {
  "Like New": { bg: "#e6f4ea", text: "#1a6b2e" },
  "Excellent": { bg: "#e8f0fe", text: "#1a4fa0" },
  "Good": { bg: "#fef3e2", text: "#92400e" },
};

const REVIEWS = [
  { name: "Marcus T.", rating: 5, date: "2 weeks ago", text: "Super fast shipping, item exactly as described. Would buy again!" },
  { name: "Sarah K.", rating: 5, date: "1 month ago", text: "Great seller, very responsive. Item in perfect condition." },
  { name: "James R.", rating: 4, date: "2 months ago", text: "Good experience overall. Took a couple days to ship but worth it." },
];

export default function ListingPage({ params }: { params: any }) {
  const id = parseInt(params.id);
  const item = LISTINGS[id] || LISTINGS[1];
  const cond = COND_COLORS[item.condition] || { bg: "#eee", text: "#333" };
  const discount = Math.round((1 - item.price / item.original) * 100);
  const [offerOpen, setOfferOpen] = useState(false);
  const [offerValue, setOfferValue] = useState("");
  const [offerSent, setOfferSent] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const thumbs = [item.icon, item.icon, item.icon, item.icon];

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f13", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      <nav style={{ background: "#18181f", borderBottom: "1px solid #2a2a35", padding: "0 24px", height: 60, display: "flex", alignItems: "center", gap: 16, position: "sticky", top: 0, zIndex: 100 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <span style={{ fontSize: 22 }}>⚡</span>
          <span style={{ fontWeight: 700, fontSize: 20, color: "#a78bfa" }}>Dealzo</span>
        </a>
        <span style={{ color: "#444", fontSize: 14 }}>/ Listings / {item.title}</span>
        <div style={{ marginLeft: "auto" }}>
          <a href="/login" style={{ background: "#a78bfa", border: "none", color: "#fff", fontWeight: 600, fontSize: 14, borderRadius: 999, padding: "8px 20px", textDecoration: "none" }}>Sign up</a>
        </div>
      </nav>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px", display: "grid", gridTemplateColumns: "1fr 420px", gap: 40 }}>
        <div>
          <div style={{ background: "#18181f", border: "1px solid #2a2a35", borderRadius: 20, height: 380, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 120, marginBottom: 12, position: "relative" }}>
            {thumbs[activeImg]}
            {item.badge && <span style={{ position: "absolute", top: 16, left: 16, background: "#a78bfa", color: "#fff", fontSize: 12, fontWeight: 700, borderRadius: 999, padding: "4px 12px" }}>{item.badge}</span>}
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
            {thumbs.map((t: string, i: number) => (
              <div key={i} onClick={() => setActiveImg(i)} style={{ background: "#18181f", border: `2px solid ${activeImg === i ? "#a78bfa" : "#2a2a35"}`, borderRadius: 12, width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, cursor: "pointer" }}>{t}</div>
            ))}
          </div>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>About this listing</h2>
            <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: 15 }}>{item.description}</p>
          </div>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Specs</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {Object.entries(item.specs).map(([k, v]) => (
                <div key={k} style={{ background: "#18181f", border: "1px solid #2a2a35", borderRadius: 10, padding: "10px 14px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#666", fontSize: 13 }}>{k}</span>
                  <span style={{ color: "#ddd", fontSize: 13, fontWeight: 500 }}>{v as string}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Seller reviews</h2>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ background: "#18181f", border: "1px solid #2a2a35", borderRadius: 14, padding: 16, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</span>
                  <span style={{ color: "#555", fontSize: 12 }}>{r.date}</span>
                </div>
                <div style={{ color: "#facc15", fontSize: 13, marginBottom: 6 }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.5 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "sticky", top: 80, alignSelf: "start" }}>
          <div style={{ background: "#18181f", border: "1px solid #2a2a35", borderRadius: 20, padding: 24, marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              <span style={{ background: cond.bg, color: cond.text, fontSize: 12, fontWeight: 600, borderRadius: 999, padding: "3px 12px" }}>{item.condition}</span>
              <span style={{ background: "rgba(74,222,128,0.15)", color: "#4ade80", fontSize: 12, fontWeight: 600, borderRadius: 999, padding: "3px 12px" }}>-{discount}% off retail</span>
            </div>
            <h1 style={{ fontWeight: 700, fontSize: 22, marginBottom: 16, lineHeight: 1.3 }}>{item.title}</h1>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: "#a78bfa" }}>${item.price}</span>
              <span style={{ fontSize: 16, color: "#555", textDecoration: "line-through" }}>${item.original}</span>
              <span style={{ fontSize: 14, color: "#4ade80" }}>Save ${item.original - item.price}</span>
            </div>
            <button style={{ width: "100%", background: "linear-gradient(90deg, #a78bfa, #818cf8)", border: "none", color: "#fff", fontWeight: 700, fontSize: 16, borderRadius: 12, padding: "14px 0", cursor: "pointer", marginBottom: 10 }}>Buy now — ${item.price}</button>
            <button onClick={() => setOfferOpen(!offerOpen)} style={{ width: "100%", background: "transparent", border: "1px solid #a78bfa", color: "#a78bfa", fontWeight: 600, fontSize: 15, borderRadius: 12, padding: "12px 0", cursor: "pointer", marginBottom: 10 }}>Make an offer</button>
            <button onClick={() => setSaved(!saved)} style={{ width: "100%", background: "transparent", border: "1px solid #2a2a35", color: saved ? "#f87171" : "#888", fontWeight: 600, fontSize: 15, borderRadius: 12, padding: "12px 0", cursor: "pointer" }}>{saved ? "❤️ Saved" : "🤍 Save listing"}</button>
            {offerOpen && !offerSent && (
              <div style={{ marginTop: 16, background: "#0f0f13", borderRadius: 12, padding: 16, border: "1px solid #2a2a35" }}>
                <p style={{ fontSize: 13, color: "#aaa", marginBottom: 10 }}>Enter your offer price</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <input type="number" value={offerValue} onChange={(e) => setOfferValue(e.target.value)} placeholder={`e.g. ${item.price - 50}`} style={{ flex: 1, background: "#18181f", border: "1px solid #2a2a35", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 14, outline: "none" }} />
                  <button onClick={() => { if (offerValue) setOfferSent(true); }} style={{ background: "#a78bfa", border: "none", color: "#fff", fontWeight: 600, borderRadius: 8, padding: "8px 16px", cursor: "pointer" }}>Send</button>
                </div>
              </div>
            )}
            {offerSent && (
              <div style={{ marginTop: 16, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 12, padding: 14, textAlign: "center" }}>
                <p style={{ color: "#4ade80", fontSize: 14, fontWeight: 600 }}>✅ Offer of ${offerValue} sent!</p>
              </div>
            )}
          </div>
          <div style={{ background: "#18181f", border: "1px solid #2a2a35", borderRadius: 20, padding: 20 }}>
            <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>About the seller</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #a78bfa, #60a5fa)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18 }}>{item.seller[0]}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{item.seller}</div>
                <div style={{ color: "#facc15", fontSize: 13 }}>★ {item.rating} <span style={{ color: "#555" }}>({item.reviews} reviews)</span></div>
              </div>
            </div>
            <button style={{ width: "100%", background: "transparent", border: "1px solid #2a2a35", color: "#ccc", fontWeight: 600, fontSize: 14, borderRadius: 10, padding: "10px 0", cursor: "pointer" }}>💬 Message seller</button>
          </div>
        </div>
      </div>
    </div>
  );
}
