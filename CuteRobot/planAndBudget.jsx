import { useState } from "react";

const INR = (n) => `₹${n.toLocaleString("en-IN")}`;

const sections = [
  {
    id: "brain",
    emoji: "🧠",
    title: "Brain / दिमाग",
    subtitle: "AI Processing Core",
    color: "#7C3AED",
    components: [
      { name: "Raspberry Pi 4B (4GB)", role: "Main AI brain — runs vision, voice, decisions", priceINR: 5500, qty: 1, buy: "Robu.in / Robocraze", local: false },
      { name: "Arduino Nano (Clone)", role: "Motor + sensor controller", priceINR: 200, qty: 1, buy: "Surat local / Robu.in", local: true },
      { name: "32GB microSD Card (Class 10)", role: "OS + AI models storage", priceINR: 350, qty: 1, buy: "Damodar Market Surat / Amazon", local: true },
      { name: "10,000mAh Power Bank (5V/3A)", role: "Main power — 4–5hr runtime", priceINR: 800, qty: 1, buy: "Any mobile shop Surat", local: true },
    ]
  },
  {
    id: "eyes",
    emoji: "👁️",
    title: "Eyes & Ears / आँखें",
    subtitle: "Camera, Mic, Speaker",
    color: "#0891B2",
    components: [
      { name: "Raspberry Pi Camera v2 (8MP)", role: "Main vision — face & object detection", priceINR: 1200, qty: 1, buy: "Robocraze / Robu.in", local: false },
      { name: "USB Mini Microphone", role: "Voice input for commands", priceINR: 250, qty: 1, buy: "Damodar Market / Amazon", local: true },
      { name: "3W 8Ω Mini Speaker", role: "Voice & sound output", priceINR: 80, qty: 1, buy: "Gandhi Electronics Adajan / Robu.in", local: true },
      { name: "PAM8403 Audio Amplifier Module", role: "Boosts speaker signal", priceINR: 60, qty: 1, buy: "Gandhi Electronics / Robu.in", local: true },
    ]
  },
  {
    id: "sensors",
    emoji: "📡",
    title: "Sensors / सेंसर",
    subtitle: "Feeling the Environment",
    color: "#059669",
    components: [
      { name: "HC-SR04 Ultrasonic Sensor", role: "Obstacle detection up to 4m", priceINR: 80, qty: 2, buy: "Gandhi Electronics Adajan / Robu.in", local: true },
      { name: "IR Proximity Sensor Module", role: "Edge & close-range detection", priceINR: 40, qty: 4, buy: "Local electronics shop Varachha", local: true },
      { name: "MPU-6050 Gyro+Accelerometer", role: "Tilt, balance, shake detection", priceINR: 120, qty: 1, buy: "Robu.in / Probots", local: false },
      { name: "DHT22 Temp/Humidity Sensor", role: "Senses heat — fun in Surat summer!", priceINR: 150, qty: 1, buy: "Gandhi Electronics / Robu.in", local: true },
      { name: "LDR Light Sensor Module", role: "Day/night detection — sleeps at night", priceINR: 30, qty: 2, buy: "Any local electronics shop", local: true },
      { name: "Capacitive Touch Sensor (TTP223)", role: "Pet it on head, belly, back", priceINR: 25, qty: 3, buy: "Robu.in / local shop", local: true },
    ]
  },
  {
    id: "movement",
    emoji: "⚙️",
    title: "Movement / हलचल",
    subtitle: "Motors, Wheels & Servos",
    color: "#DC2626",
    components: [
      { name: "TT DC Gear Motor (yellow)", role: "4-wheel drive — very common in India", priceINR: 60, qty: 4, buy: "Gandhi Electronics / Robu.in", local: true },
      { name: "L298N Motor Driver Module", role: "Controls motor speed & direction", priceINR: 120, qty: 1, buy: "Gandhi Electronics Adajan / Robu.in", local: true },
      { name: "65mm Rubber Wheels", role: "Works on tiles, marble, carpet", priceINR: 40, qty: 4, buy: "Robu.in / Probots", local: false },
      { name: "SG90 Servo Motor", role: "Head rotation + arm wave", priceINR: 80, qty: 3, buy: "Gandhi Electronics / Robu.in", local: true },
      { name: "18650 Li-Ion Battery (3000mAh)", role: "Dedicated motor power", priceINR: 250, qty: 2, buy: "Damodar Market Surat", local: true },
      { name: "18650 Battery Holder (2-cell)", role: "Safe holder with switch", priceINR: 50, qty: 1, buy: "Gandhi Electronics / Robu.in", local: true },
    ]
  },
  {
    id: "face",
    emoji: "😊",
    title: "Cute Face / चेहरा",
    subtitle: "OLED Eyes + Mood LEDs",
    color: "#D97706",
    components: [
      { name: "0.96\" OLED Display I2C (SSD1306)", role: "Animated eyes — blink, wink, happy/sad", priceINR: 180, qty: 2, buy: "Robu.in / Probots", local: false },
      { name: "WS2812B RGB LED Strip (1m)", role: "Mood lighting — blush pink, glow blue", priceINR: 250, qty: 1, buy: "Damodar Market Surat / Amazon", local: true },
      { name: "NeoPixel-style LED Ring (8 LED)", role: "Glowing halo on head", priceINR: 200, qty: 1, buy: "Robu.in", local: false },
    ]
  },
  {
    id: "body",
    emoji: "🏗️",
    title: "Body / शरीर",
    subtitle: "Chassis, Wiring & Assembly",
    color: "#64748B",
    components: [
      { name: "Acrylic Sheet 3mm (30×30cm)", role: "Base plate for all components", priceINR: 150, qty: 2, buy: "Ring Road Hardware Surat / local", local: true },
      { name: "M3 Screws + Brass Standoffs Kit", role: "Assembly hardware", priceINR: 120, qty: 1, buy: "Hardware shop near Udhna / Amazon", local: true },
      { name: "Silicone Jumper Wires (M-M, M-F)", role: "Internal wiring", priceINR: 100, qty: 2, buy: "Gandhi Electronics / Robu.in", local: true },
      { name: "Mini Breadboard + PCB Board", role: "Circuit prototyping", priceINR: 80, qty: 1, buy: "Gandhi Electronics / Robu.in", local: true },
      { name: "PLA Filament 500g (for 3D print)", role: "Print cute round body at 3D shop", priceINR: 500, qty: 1, buy: "3D print shops Surat / Majura Gate area", local: true },
      { name: "Hot Glue Gun + Glue Sticks", role: "Body assembly", priceINR: 150, qty: 1, buy: "Any stationery / hardware shop", local: true },
    ]
  },
];

const shops = [
  { name: "Gandhi Electronics", area: "Adajan (Gujarat Gas Circle)", what: "Motors, sensors, Arduino, servo, speaker, IR sensors — one-stop shop!", tag: "⭐ Best for Most Parts", color: "#7C3AED" },
  { name: "Modern Electronics", area: "Varachha Road", what: "Basic components, LEDs, resistors, capacitors, wires", tag: "💡 Cheap Components", color: "#0891B2" },
  { name: "Damodar Market Area", area: "Near Ring Road / Sagrampura", what: "Electronics wholesale — batteries, microSD cards, USB accessories, LED strips", tag: "💰 Wholesale Prices", color: "#059669" },
  { name: "Mahek Electronics", area: "Varachha Road, near Railway Station", what: "General electronics, wires, adapters, small components", tag: "🛒 General Components", color: "#D97706" },
  { name: "Maruti Electronics", area: "Begampura / Cinema Road", what: "Power supplies, adapters, soldering tools", tag: "🔧 Tools & Power", color: "#DC2626" },
];

const onlineShops = [
  { name: "Robu.in", specialty: "India's #1 robotics store — motors, sensors, Arduino, Pi, servos", delivery: "2–4 days to Surat", discount: "Good combo offers", url: "robu.in" },
  { name: "Robocraze.com", specialty: "Raspberry Pi official seller, camera modules, Pi accessories", delivery: "3–5 days", discount: "Student discounts", url: "robocraze.com" },
  { name: "Probots.co.in", specialty: "Sensors, ESP32, motor drivers, bulk orders", delivery: "3–4 days", discount: "Bulk pricing", url: "probots.co.in" },
  { name: "Amazon.in", specialty: "Power bank, microSD, USB mic, LED strips, misc hardware", delivery: "1–2 days (Prime)", discount: "Combo deals", url: "amazon.in" },
  { name: "Flipkart", specialty: "Acrylic sheets, hot glue guns, hobby tools", delivery: "2–3 days", discount: "Sale events", url: "flipkart.com" },
];

const behaviors = [
  { icon: "🎲", title: "Random Wander Mode", desc: "Every 15 mins picks random activity — explore, sing, spin, tell joke in Hindi or English" },
  { icon: "☀️", title: "Surat Weather React", desc: "DHT22 senses Gujarat heat (45°C!) → robot fans itself, says 'Bhai garmi bahut hai!' and glows red" },
  { icon: "👋", title: "Gujarati Greetings", desc: "Recognizes you with camera → 'Jai Shree Krishna!' or 'Kem cho?' randomly" },
  { icon: "🐾", title: "Pet Mode", desc: "Touch sensors on head — pet it and it purrs, blinks hearts, does a happy dance" },
  { icon: "🌙", title: "LDR Sleep Mode", desc: "When lights go off at night, it yawns (sound), dims LEDs, goes into quiet patrol mode" },
  { icon: "🎵", title: "Music Bot", desc: "Plays Bollywood classics when idle, party beats when excited, lullabies at bedtime" },
  { icon: "👀", title: "Face Tracker", desc: "Head servo follows your face. Tilts head when confused. Winks at you!" },
  { icon: "🌍", title: "Home Explorer", desc: "Maps your home autonomously — builds a mental map and reports 'new areas discovered today!'" },
];

const roadmap = [
  { week: "Week 1", title: "Parts Shopping", task: "Visit Gandhi Electronics Adajan. Order remaining parts from Robu.in. Set up Raspberry Pi OS. Test camera + mic.", color: "#7C3AED" },
  { week: "Week 2", title: "Wheels & Motion", task: "Wire L298N + TT motors. Test 4-wheel drive. Mount on acrylic base. Add ultrasonic obstacle avoidance.", color: "#0891B2" },
  { week: "Week 3", title: "Give It a Face!", task: "Connect dual OLED eyes. Program 20+ expressions (blink, wink, heart eyes, sad, shocked). Add RGB LEDs.", color: "#059669" },
  { week: "Week 4", title: "Voice & Vision", task: "Install OpenCV for face tracking. Add Whisper STT. Install pyttsx3 TTS. First Hindi/English conversation!", color: "#D97706" },
  { week: "Week 5", title: "Personality Engine", task: "Add random behavior system. Pet mode, Gujarati greetings, weather reactions, music & dance mode.", color: "#DC2626" },
  { week: "Week 6", title: "Cute Shell & Polish", task: "3D print or laser cut cute rounded body. Decorate with stickers. Final testing. Show to family! 🎉", color: "#a78bfa" },
];

function BudgetBar({ price, max }) {
  const pct = Math.min((price / max) * 100, 100);
  return (
    <div style={{ background: "#1e293b", borderRadius: 4, height: 6, marginTop: 6 }}>
      <div style={{ width: `${pct}%`, background: "linear-gradient(90deg,#7C3AED,#06B6D4)", borderRadius: 4, height: "100%", transition: "width 0.7s" }} />
    </div>
  );
}

export default function CuteBotIndia() {
  const [activeTab, setActiveTab] = useState("brain");
  const [view, setView] = useState("components"); // components | shops | roadmap | behaviors

  const activeSection = sections.find(s => s.id === activeTab);
  const totalINR = sections.reduce((sum, s) => sum + s.components.reduce((cs, c) => cs + c.priceINR * c.qty, 0), 0);

  const navItems = [
    { id: "components", label: "🔩 Parts & Cost", },
    { id: "shops", label: "🏪 Where to Buy", },
    { id: "behaviors", label: "✨ Personality", },
    { id: "roadmap", label: "🗺️ Build Plan", },
  ];

  return (
    <div style={{
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      background: "linear-gradient(160deg, #0a0a1a 0%, #0f1729 50%, #0a0a1a 100%)",
      minHeight: "100vh", color: "#f1f5f9", padding: "0 0 60px"
    }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(8,145,178,0.2))",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "36px 20px 28px", textAlign: "center"
      }}>
        <div style={{ fontSize: 64, marginBottom: 4, filter: "drop-shadow(0 0 24px rgba(124,58,237,0.9))" }}>🤖</div>
        <h1 style={{
          fontSize: "clamp(28px, 6vw, 52px)", fontWeight: 900, margin: "0 0 4px",
          background: "linear-gradient(135deg, #a78bfa, #38bdf8, #34d399)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-1px"
        }}>CuteBot — India Edition 🇮🇳</h1>
        <p style={{ color: "#94a3b8", fontSize: 15, margin: "0 0 20px" }}>
          Surat, Gujarat ke liye complete plan — local shops + online sources 🛒
        </p>

        {/* Budget badges */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { label: "Total Budget", val: INR(totalINR), sub: "approx cost", icon: "💰", col: "#7C3AED" },
            { label: "Local (Surat)", val: "~" + INR(Math.round(totalINR * 0.35)), sub: "from local shops", icon: "🏪", col: "#059669" },
            { label: "Online Order", val: "~" + INR(Math.round(totalINR * 0.65)), sub: "Robu.in / Amazon", icon: "📦", col: "#0891B2" },
          ].map((b, i) => (
            <div key={i} style={{
              background: `${b.col}20`, border: `1px solid ${b.col}50`,
              borderRadius: 16, padding: "12px 22px", display: "flex", alignItems: "center", gap: 10
            }}>
              <span style={{ fontSize: 22 }}>{b.icon}</span>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: b.col }}>{b.val}</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 14px" }}>

        {/* Main Nav */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", margin: "24px 0 18px" }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => setView(n.id)} style={{
              background: view === n.id ? "rgba(124,58,237,0.9)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${view === n.id ? "#7C3AED" : "rgba(255,255,255,0.12)"}`,
              color: "#fff", borderRadius: 30, padding: "9px 18px",
              cursor: "pointer", fontSize: 14, fontWeight: 600,
              boxShadow: view === n.id ? "0 0 20px rgba(124,58,237,0.5)" : "none"
            }}>{n.label}</button>
          ))}
        </div>

        {/* === COMPONENTS VIEW === */}
        {view === "components" && (
          <>
            {/* Category tabs */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 18 }}>
              {sections.map(s => (
                <button key={s.id} onClick={() => setActiveTab(s.id)} style={{
                  background: activeTab === s.id ? s.color : "rgba(255,255,255,0.04)",
                  border: `1px solid ${activeTab === s.id ? s.color : "rgba(255,255,255,0.1)"}`,
                  color: "#fff", borderRadius: 24, padding: "7px 14px",
                  cursor: "pointer", fontSize: 13, fontWeight: 600,
                  boxShadow: activeTab === s.id ? `0 0 16px ${s.color}60` : "none"
                }}>{s.emoji} {s.title.split("/")[0].trim()}</button>
              ))}
            </div>

            {activeSection && (
              <div style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${activeSection.color}35`,
                borderRadius: 18, padding: 22, marginBottom: 24,
                boxShadow: `0 0 30px ${activeSection.color}15`
              }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: activeSection.color, margin: "0 0 4px" }}>
                  {activeSection.emoji} {activeSection.title}
                </h2>
                <p style={{ color: "#64748b", fontSize: 13, margin: "0 0 18px" }}>{activeSection.subtitle}</p>
                <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))" }}>
                  {activeSection.components.map((c, i) => (
                    <div key={i} style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 12, padding: "14px 16px"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, flex: 1, paddingRight: 8, color: "#e2e8f0" }}>{c.name}</div>
                        <div style={{
                          background: `${activeSection.color}25`, color: activeSection.color,
                          borderRadius: 16, padding: "2px 9px", fontSize: 13, fontWeight: 800, whiteSpace: "nowrap"
                        }}>{INR(c.priceINR * c.qty)}</div>
                      </div>
                      {c.qty > 1 && <div style={{ fontSize: 11, color: "#475569", marginBottom: 3 }}>× {c.qty} units @ {INR(c.priceINR)} each</div>}
                      <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5, marginBottom: 6 }}>{c.role}</div>
                      <div style={{
                        fontSize: 11, padding: "3px 8px", borderRadius: 8,
                        background: c.local ? "rgba(5,150,105,0.15)" : "rgba(8,145,178,0.15)",
                        color: c.local ? "#34d399" : "#38bdf8",
                        display: "inline-block", marginBottom: 4
                      }}>{c.local ? "🏪 Local Surat" : "📦 Online Order"} — {c.buy}</div>
                      <BudgetBar price={c.priceINR * c.qty} max={6000} />
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: "right", marginTop: 14, fontWeight: 800, color: activeSection.color, fontSize: 16 }}>
                  Section Total: {INR(activeSection.components.reduce((s, c) => s + c.priceINR * c.qty, 0))}
                </div>
              </div>
            )}

            {/* Summary bar */}
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, padding: "20px 22px"
            }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 700 }}>💰 Complete Budget Summary</h3>
              <div style={{ display: "grid", gap: 8 }}>
                {sections.map(s => {
                  const cost = s.components.reduce((sum, c) => sum + c.priceINR * c.qty, 0);
                  const pct = ((cost / totalINR) * 100).toFixed(0);
                  return (
                    <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ width: 24, textAlign: "center" }}>{s.emoji}</span>
                      <span style={{ width: 120, fontSize: 13, color: "#cbd5e1" }}>{s.title.split("/")[0].trim()}</span>
                      <div style={{ flex: 1, background: "rgba(255,255,255,0.07)", borderRadius: 6, height: 8 }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg,${s.color},${s.color}80)`, borderRadius: 6 }} />
                      </div>
                      <span style={{ width: 70, textAlign: "right", fontWeight: 700, color: s.color, fontSize: 14 }}>{INR(cost)}</span>
                    </div>
                  );
                })}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 8, paddingTop: 12, display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 900 }}>
                  <span>🏆 Grand Total</span>
                  <span style={{ color: "#a78bfa" }}>{INR(totalINR)}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
                  {[
                    { label: "💡 AliExpress (slow, 20–30 days)", val: INR(Math.round(totalINR * 0.55)), desc: "Cheapest — order motors, sensors in bulk" },
                    { label: "⚡ Robu.in + Local (fast)", val: INR(Math.round(totalINR * 1.05)), desc: "2–4 day delivery, slight premium" },
                  ].map((opt, i) => (
                    <div key={i} style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: 10, padding: "10px 14px" }}>
                      <div style={{ fontSize: 12, color: "#a78bfa", fontWeight: 700 }}>{opt.label}</div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: "#c4b5fd" }}>{opt.val}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>{opt.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* === SHOPS VIEW === */}
        {view === "shops" && (
          <div style={{ display: "grid", gap: 16 }}>
            <div style={{
              background: "rgba(5,150,105,0.1)", border: "1px solid rgba(5,150,105,0.3)",
              borderRadius: 16, padding: "18px 20px"
            }}>
              <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 800, color: "#34d399" }}>🏪 Surat Local Shops</h2>
              <p style={{ color: "#64748b", fontSize: 13, margin: "0 0 16px" }}>Jao, dekho, haath lagao — buy same day!</p>
              <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                {shops.map((shop, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.04)", border: `1px solid ${shop.color}30`,
                    borderRadius: 12, padding: "14px 16px"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <div style={{ fontWeight: 800, fontSize: 15, color: "#e2e8f0" }}>{shop.name}</div>
                      <span style={{
                        background: `${shop.color}25`, color: shop.color,
                        borderRadius: 10, padding: "2px 8px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap"
                      }}>{shop.tag}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#38bdf8", marginBottom: 5 }}>📍 {shop.area}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>{shop.what}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: "rgba(8,145,178,0.1)", border: "1px solid rgba(8,145,178,0.3)",
              borderRadius: 16, padding: "18px 20px"
            }}>
              <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 800, color: "#38bdf8" }}>📦 Online Stores (Ship to Surat)</h2>
              <p style={{ color: "#64748b", fontSize: 13, margin: "0 0 16px" }}>Best Indian robotics websites — fast delivery to Surat</p>
              <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                {onlineShops.map((shop, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 12, padding: "14px 16px"
                  }}>
                    <div style={{ fontWeight: 800, fontSize: 15, color: "#e2e8f0", marginBottom: 4 }}>{shop.name}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5, marginBottom: 6 }}>{shop.specialty}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <span style={{ background: "rgba(8,145,178,0.2)", color: "#38bdf8", borderRadius: 8, padding: "2px 8px", fontSize: 11 }}>🚚 {shop.delivery}</span>
                      <span style={{ background: "rgba(5,150,105,0.2)", color: "#34d399", borderRadius: 8, padding: "2px 8px", fontSize: 11 }}>💸 {shop.discount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: "rgba(217,119,6,0.1)", border: "1px solid rgba(217,119,6,0.3)",
              borderRadius: 16, padding: "18px 20px"
            }}>
              <h2 style={{ margin: "0 0 12px", fontSize: 18, fontWeight: 800, color: "#fbbf24" }}>💡 Smart Shopping Tips for Surat</h2>
              <div style={{ display: "grid", gap: 8 }}>
                {[
                  ["🛒", "Pehle Gandhi Electronics Adajan jao", "Motors, sensors, Arduino, servo — sab milega ek hi jagah. Owner se project batao, helpful hai!"],
                  ["📦", "Robu.in pe bulk order karo", "5+ items order karo — ₹500+ pe free shipping milta hai Surat ke liye"],
                  ["📱", "Damodar Market try karo", "Batteries, microSD, USB accessories wholesale rates pe milti hain"],
                  ["🖨️", "3D printing Surat mein hi karo", "Majura Gate / Ring Road pe 3D print shops hain — ₹200–400 mein cute body print hogi"],
                  ["💰", "AliExpress se save karo", "Motors, sensors, LEDs AliExpress pe 60–70% sasta — bas 20–25 din wait karo"],
                ].map(([icon, title, desc], i) => (
                  <div key={i} style={{
                    display: "flex", gap: 12, alignItems: "flex-start",
                    background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px"
                  }}>
                    <span style={{ fontSize: 20 }}>{icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "#fbbf24", marginBottom: 2 }}>{title}</div>
                      <div style={{ fontSize: 12, color: "#94a3b8" }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* === BEHAVIORS VIEW === */}
        {view === "behaviors" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>✨ Personality Behaviors</h2>
              <p style={{ color: "#64748b", fontSize: 13 }}>Surat ke liye special — kabhi boring nahi hoga!</p>
            </div>
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
              {behaviors.map((b, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14, padding: 18
                }}>
                  <div style={{ fontSize: 30, marginBottom: 8 }}>{b.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: "#e2e8f0" }}>{b.title}</div>
                  <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{b.desc}</div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 20, background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.3)", borderRadius: 16, padding: "18px 20px"
            }}>
              <h3 style={{ margin: "0 0 12px", color: "#a78bfa" }}>💻 AI Software Stack (Free / Open Source)</h3>
              <div style={{ display: "grid", gap: 8 }}>
                {[
                  ["🗣️", "Whisper (OpenAI)", "Voice recognition — Hindi + English dono samjhega", "Free"],
                  ["🔊", "pyttsx3 / gTTS", "Text to speech — bolega bhi Hindi mein", "Free"],
                  ["👁️", "OpenCV + MediaPipe", "Face detection, object recognition, color tracking", "Free"],
                  ["🧠", "Ollama (local LLM)", "Offline AI chat — no internet needed!", "Free"],
                  ["⚙️", "Python GPIO", "Controls all motors, servos, LEDs", "Free"],
                  ["😊", "Luma / Pillow", "Custom OLED eye animations", "Free"],
                ].map(([icon, name, use, cost], i) => (
                  <div key={i} style={{
                    display: "grid", gridTemplateColumns: "24px 150px 1fr 50px",
                    gap: 10, alignItems: "center",
                    background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "8px 12px", fontSize: 13
                  }}>
                    <span>{icon}</span>
                    <span style={{ color: "#a78bfa", fontWeight: 700 }}>{name}</span>
                    <span style={{ color: "#94a3b8" }}>{use}</span>
                    <span style={{ color: "#34d399", fontWeight: 700, textAlign: "right" }}>{cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* === ROADMAP VIEW === */}
        {view === "roadmap" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>🗺️ 6-Week Build Roadmap</h2>
              <p style={{ color: "#64748b", fontSize: 13 }}>Step by step — ek ek karo, daro mat! 💪</p>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {roadmap.map((r, i) => (
                <div key={i} style={{
                  display: "flex", gap: 14, alignItems: "flex-start",
                  background: "rgba(255,255,255,0.04)",
                  borderLeft: `4px solid ${r.color}`,
                  borderRadius: "0 14px 14px 0", padding: "16px 18px"
                }}>
                  <div style={{ minWidth: 80 }}>
                    <div style={{ background: r.color, borderRadius: 8, padding: "3px 10px", fontSize: 12, fontWeight: 800, textAlign: "center", marginBottom: 4 }}>{r.week}</div>
                    <div style={{ fontSize: 11, color: r.color, textAlign: "center", fontWeight: 600 }}>{r.title}</div>
                  </div>
                  <div style={{ fontSize: 14, color: "#cbd5e1", lineHeight: 1.6 }}>{r.task}</div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 20, background: "rgba(5,150,105,0.1)",
              border: "1px solid rgba(5,150,105,0.3)", borderRadius: 14, padding: "16px 18px"
            }}>
              <h3 style={{ margin: "0 0 10px", color: "#34d399", fontSize: 16 }}>🎓 Sikho kahan se? (Free Resources)</h3>
              <div style={{ display: "grid", gap: 6 }}>
                {[
                  ["YouTube", "\"Raspberry Pi robot Hindi\" search karo — bahut tutorials hain"],
                  ["GitHub", "Open source robot projects clone karo — free code milega"],
                  ["Robu.in Blog", "Indian makers ke tutorials — motors, sensors sab covered"],
                  ["Reddit r/robotics", "Global community — doubts puchho anytime"],
                  ["Telegram Groups", "\"Arduino India\" ya \"Raspberry Pi India\" groups join karo"],
                ].map(([src, tip], i) => (
                  <div key={i} style={{ display: "flex", gap: 10, fontSize: 13 }}>
                    <span style={{ color: "#34d399", fontWeight: 700, minWidth: 80 }}>{src}</span>
                    <span style={{ color: "#94a3b8" }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 36, color: "#475569", fontSize: 12 }}>
          Made for Surat 🏙️ · Total Budget {INR(totalINR)} · Your CuteBot is waiting to be born! 🤖✨
        </div>
      </div>
    </div>
  );
}
