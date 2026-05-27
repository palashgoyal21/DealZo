"use client";
import { useState } from "react";

const CATEGORIES = ["Phones", "Laptops", "Tablets", "Cameras", "Audio", "Gaming", "Watches", "Other"];
const CONDITIONS = [
  { value: "Like New", desc: "Opened but barely used. No signs of wear." },
  { value: "Excellent", desc: "Light use. Minor signs of wear, fully functional." },
  { value: "Good", desc: "Normal use. Some visible wear but works perfectly." },
  { value: "Fair", desc: "Heavy use. Noticeable wear but fully functional." },
];

export default function SellPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: "", category: "", condition: "", price: "", originalPrice: "",
    description: "", brand: "", model: "", storage: "", color: "",
    shipsFrom: "", shippingCost: "free", photos: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function nextStep() { if (step < 3) setStep(s => s + 1); }
  function prevStep() { if (step > 1) setStep(s => s - 1); }

  function handleSubmit() {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  }

  const inputStyle = (hasVal: boolean) => ({
    width: "100%", background: "#0f0f13", border: `1px solid ${hasVal ? "#a78bfa" : "#2a2a35"}`,
    borderRadius: 10, padding: "11px 14px", color: "#fff", fontSize: 14,
    outline: "none", boxSizing: "border-box" as const,
  });

  const labelStyle = { display: "block" as const, fontSize: 13, fontWeight: 500 as const, color: "#aaa", marginBottom: 6 };

  const discount = form.price && form.originalPrice
    ? Math.round((1 - parseFloat(form.price) / parseFloat(form.originalPrice)) * 100)
    : null;

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f0f13", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🚀</div>
          <h2 style={{ fontWeight: 800, fontSize: 28, color: "#fff", marginBottom: 8 }}>Listing published!</h2>
          <p style={{ color: "#aaa", fontSize: 16, marginBottom: 8 }}>
            <span style={{ color: "#a78bfa", fontWeight: 600 }}>{form.title}</span> is now live on CellSwapp.
          </p>
          <p style={{ color: "#555", fontSize: 14, marginBottom: 32 }}>Buyers can find your listing and make offers.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/" style={{ background: "linear-gradient(90deg, #a78bfa, #818cf8)", color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 999, padding: "12px 28px", textDecoration: "none" }}>
              Browse marketplace →
            </a>
            <button onClick={() => { setSubmitted(false); setStep(1); setForm({ title: "", category: "", condition: "", price: "", originalPrice: "", description: "", brand: "", model: "", storage: "", color: "", shipsFrom: "", shippingCost: "free", photos: [] }); }}
              style={{ background: "transparent", border: "1px solid #2a2a35", color: "#ccc", fontWeight: 600, fontSize: 15, borderRadius: 999, padding: "12px 28px", cursor: "pointer" }}>
              List another item
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f13", fontFamily: "system-ui, sans-serif" }}>

      {/* NAV */}
      <nav style={{ background: "#18181f", borderBottom: "1px solid #2a2a35", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <span style={{ fontSize: 22 }}>⚡</span>
          <span style={{ fontWeight: 700, fontSize: 20, color: "#a78bfa" }}>CellSwapp</span>
        </a>
        <span style={{ color: "#555", fontSize: 14 }}>Create a listing</span>
      </nav>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 24px" }}>

        {/* Progress bar */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            {["Item details", "Pricing & shipping", "Review & publish"].map((label, i) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700,
                  background: step > i + 1 ? "#4ade80" : step === i + 1 ? "#a78bfa" : "#2a2a35",
                  color: step >= i + 1 ? "#fff" : "#555",
                }}>
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span style={{ fontSize: 13, color: step === i + 1 ? "#fff" : "#555", fontWeight: step === i + 1 ? 600 : 400 }}>{label}</span>
              </div>
            ))}
          </div>
          <div style={{ height: 4, background: "#2a2a35", borderRadius: 999 }}>
            <div style={{ height: "100%", background: "linear-gradient(90deg, #a78bfa, #818cf8)", borderRadius: 999, width: `${((step - 1) / 2) * 100}%`, transition: "width 0.3s" }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 24 }}>

          {/* MAIN FORM */}
          <div style={{ background: "#18181f", border: "1px solid #2a2a35", borderRadius: 20, padding: 28 }}>

            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>What are you selling?</h2>
                <p style={{ color: "#555", fontSize: 14, marginBottom: 24 }}>Tell buyers about your item</p>

                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Title *</label>
                  <input value={form.title} onChange={e => update("title", e.target.value)}
                    placeholder="e.g. iPhone 15 Pro 256GB Natural Titanium"
                    style={inputStyle(!!form.title)} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>Category *</label>
                    <select value={form.category} onChange={e => update("category", e.target.value)}
                      style={{ ...inputStyle(!!form.category), appearance: "none" as const }}>
                      <option value="">Select category</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Brand</label>
                    <input value={form.brand} onChange={e => update("brand", e.target.value)}
                      placeholder="e.g. Apple, Samsung" style={inputStyle(!!form.brand)} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>Model</label>
                    <input value={form.model} onChange={e => update("model", e.target.value)}
                      placeholder="e.g. iPhone 15 Pro" style={inputStyle(!!form.model)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Storage / Size</label>
                    <input value={form.storage} onChange={e => update("storage", e.target.value)}
                      placeholder="e.g. 256GB" style={inputStyle(!!form.storage)} />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Color</label>
                  <input value={form.color} onChange={e => update("color", e.target.value)}
                    placeholder="e.g. Natural Titanium" style={inputStyle(!!form.color)} />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Condition *</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {CONDITIONS.map(c => (
                      <div key={c.value} onClick={() => update("condition", c.value)}
                        style={{ border: `2px solid ${form.condition === c.value ? "#a78bfa" : "#2a2a35"}`, borderRadius: 10, padding: 12, cursor: "pointer", background: form.condition === c.value ? "rgba(167,139,250,0.1)" : "transparent" }}>
                        <div style={{ fontWeight: 600, fontSize: 14, color: form.condition === c.value ? "#a78bfa" : "#ddd", marginBottom: 4 }}>{c.value}</div>
                        <div style={{ fontSize: 12, color: "#555" }}>{c.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 8 }}>
                  <label style={labelStyle}>Description</label>
                  <textarea value={form.description} onChange={e => update("description", e.target.value)}
                    placeholder="Describe your item — condition details, what's included, any flaws..."
                    rows={4}
                    style={{ ...inputStyle(!!form.description), resize: "vertical" as const }} />
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div>
                <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>Pricing & shipping</h2>
                <p style={{ color: "#555", fontSize: 14, marginBottom: 24 }}>Set your price and shipping details</p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>Your asking price *</label>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#666" }}>$</span>
                      <input type="number" value={form.price} onChange={e => update("price", e.target.value)}
                        placeholder="0.00" style={{ ...inputStyle(!!form.price), paddingLeft: 28 }} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Original retail price</label>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#666" }}>$</span>
                      <input type="number" value={form.originalPrice} onChange={e => update("originalPrice", e.target.value)}
                        placeholder="0.00" style={{ ...inputStyle(!!form.originalPrice), paddingLeft: 28 }} />
                    </div>
                  </div>
                </div>

                {discount !== null && discount > 0 && (
                  <div style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#4ade80" }}>
                    ✅ Buyers save {discount}% off retail — great deal!
                  </div>
                )}

                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Ships from (City, State)</label>
                  <input value={form.shipsFrom} onChange={e => update("shipsFrom", e.target.value)}
                    placeholder="e.g. New York, NY" style={inputStyle(!!form.shipsFrom)} />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Shipping cost</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[["free", "Free shipping"], ["buyer", "Buyer pays"], ["local", "Local pickup only"]].map(([val, label]) => (
                      <button key={val} onClick={() => update("shippingCost", val)}
                        style={{ flex: 1, background: form.shippingCost === val ? "rgba(167,139,250,0.15)" : "#0f0f13", border: `1px solid ${form.shippingCost === val ? "#a78bfa" : "#2a2a35"}`, color: form.shippingCost === val ? "#a78bfa" : "#666", borderRadius: 10, padding: "10px 6px", cursor: "pointer", fontSize: 12, fontWeight: 500 }}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Photo upload placeholder */}
                <div>
                  <label style={labelStyle}>Photos</label>
                  <div style={{ border: "2px dashed #2a2a35", borderRadius: 12, padding: "32px 24px", textAlign: "center", cursor: "pointer" }}
                    onClick={() => update("photos", ["photo1"])}>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>📷</div>
                    <p style={{ color: "#555", fontSize: 14, marginBottom: 4 }}>Click to add photos</p>
                    <p style={{ color: "#333", fontSize: 12 }}>Up to 10 photos • JPG, PNG • Max 10MB each</p>
                    {form.photos.length > 0 && <p style={{ color: "#4ade80", fontSize: 13, marginTop: 8 }}>✓ {form.photos.length} photo(s) added</p>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div>
                <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>Review your listing</h2>
                <p style={{ color: "#555", fontSize: 14, marginBottom: 24 }}>Double-check before publishing</p>

                <div style={{ background: "#0f0f13", borderRadius: 14, padding: 20, marginBottom: 20 }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 80, height: 80, background: "#18181f", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, flexShrink: 0 }}>
                      {form.category === "Phones" ? "📱" : form.category === "Laptops" ? "💻" : form.category === "Audio" ? "🎧" : form.category === "Gaming" ? "🎮" : "📦"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{form.title || "Untitled listing"}</div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                        {form.condition && <span style={{ background: "#e8f0fe", color: "#1a4fa0", fontSize: 11, fontWeight: 600, borderRadius: 999, padding: "2px 10px" }}>{form.condition}</span>}
                        {form.category && <span style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa", fontSize: 11, fontWeight: 600, borderRadius: 999, padding: "2px 10px" }}>{form.category}</span>}
                        {discount && discount > 0 && <span style={{ background: "rgba(74,222,128,0.15)", color: "#4ade80", fontSize: 11, fontWeight: 600, borderRadius: 999, padding: "2px 10px" }}>-{discount}%</span>}
                      </div>
                      <div style={{ fontWeight: 800, fontSize: 22, color: "#a78bfa" }}>{form.price ? `$${form.price}` : "No price set"}</div>
                    </div>
                  </div>
                </div>

                {[
                  ["Category", form.category], ["Brand", form.brand], ["Model", form.model],
                  ["Storage", form.storage], ["Color", form.color], ["Ships from", form.shipsFrom],
                  ["Shipping", form.shippingCost === "free" ? "Free shipping" : form.shippingCost === "buyer" ? "Buyer pays" : "Local pickup"],
                ].filter(([, v]) => v).map(([k, v]) => (
                  <div key={k as string} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #1a1a24" }}>
                    <span style={{ color: "#555", fontSize: 13 }}>{k as string}</span>
                    <span style={{ color: "#ddd", fontSize: 13, fontWeight: 500 }}>{v as string}</span>
                  </div>
                ))}

                {form.description && (
                  <div style={{ marginTop: 16 }}>
                    <div style={{ color: "#555", fontSize: 13, marginBottom: 6 }}>Description</div>
                    <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.6 }}>{form.description}</p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
              {step > 1 ? (
                <button onClick={prevStep} style={{ background: "transparent", border: "1px solid #2a2a35", color: "#ccc", fontWeight: 600, fontSize: 14, borderRadius: 10, padding: "10px 20px", cursor: "pointer" }}>
                  ← Back
                </button>
              ) : <div />}
              {step < 3 ? (
                <button onClick={nextStep} style={{ background: "linear-gradient(90deg, #a78bfa, #818cf8)", border: "none", color: "#fff", fontWeight: 700, fontSize: 14, borderRadius: 10, padding: "10px 24px", cursor: "pointer" }}>
                  Continue →
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={loading} style={{ background: loading ? "#333" : "linear-gradient(90deg, #a78bfa, #818cf8)", border: "none", color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 10, padding: "12px 28px", cursor: loading ? "not-allowed" : "pointer" }}>
                  {loading ? "Publishing…" : "🚀 Publish listing"}
                </button>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <div>
            <div style={{ background: "#18181f", border: "1px solid #2a2a35", borderRadius: 16, padding: 20, marginBottom: 16 }}>
              <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>💡 Selling tips</h3>
              {[
                "Add 5–10 clear photos from multiple angles",
                "Be honest about condition — it builds trust",
                "Price competitively vs similar listings",
                "Respond to offers within 24 hours",
                "Ship within 2 days of sale",
              ].map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "#a78bfa", fontSize: 14, marginTop: 1 }}>•</span>
                  <span style={{ color: "#888", fontSize: 13, lineHeight: 1.5 }}>{tip}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#18181f", border: "1px solid #2a2a35", borderRadius: 16, padding: 20 }}>
              <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>💰 Fees</h3>
              {[["Listing fee", "Free"], ["Sale fee", "5%"], ["Payout", "Within 2 days"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ color: "#666", fontSize: 13 }}>{k}</span>
                  <span style={{ color: "#ddd", fontSize: 13, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
