import { useState } from "react";

const tabs = ["TOP", "イベント概要", "スケジュール", "スポット", "更衣室", "アクセス", "ルール", "FAQ"];

export default function App() {
  const [activeTab, setActiveTab] = useState("TOP");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleTab = (t) => { setActiveTab(t); setMenuOpen(false); };

  return (
    <div style={{ fontFamily: "'Helvetica Neue', sans-serif", background: "#f5f5f5", minHeight: "100vh", maxWidth: 480, margin: "0 auto", color: "#111" }}>

      <div style={{ background: "#111", color: "#fff", padding: "24px 20px 16px", position: "sticky", top: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div onClick={() => setActiveTab("TOP")} style={{ cursor: "pointer" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#aaa", marginBottom: 4 }}>COSPLAY EVENT</div>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 1 }}>LAYERS JACK</div>
          <div style={{ fontSize: 13, letterSpacing: 2, color: "#ccc" }}>CONVENTION</div>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={{ display: "block", width: 24, height: 2, background: menuOpen ? "#aaa" : "#fff" }} />
          <span style={{ display: "block", width: 24, height: 2, background: menuOpen ? "#aaa" : "#fff" }} />
          <span style={{ display: "block", width: 24, height: 2, background: menuOpen ? "#aaa" : "#fff" }} />
        </button>
      </div>

      {menuOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 200 }}>
          <div onClick={() => setMenuOpen(false)} style={{ position: "absolute", width: "100%", height: "100%", background: "rgba(0,0,0,0.5)" }} />
          <div style={{ position: "absolute", right: 0, top: 0, width: 240, height: "100%", background: "#111", padding: "80px 0 40px" }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#666", padding: "0 24px", marginBottom: 16 }}>MENU</div>
            {tabs.map(t => (
              <button key={t} onClick={() => handleTab(t)} style={{ display: "block", width: "100%", padding: "16px 24px", background: activeTab === t ? "#222" : "none", border: "none", borderLeft: activeTab === t ? "3px solid #fff" : "3px solid transparent", color: activeTab === t ? "#fff" : "#aaa", fontSize: 15, fontWeight: activeTab === t ? 700 : 400, textAlign: "left", cursor: "pointer", letterSpacing: 1 }}>{t}</button>
            ))}
          </div>
        </div>
      )}

      <div style={{ padding: "20px 16px", paddingBottom: 100 }}>
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <img src="/ljc_vo1.jpeg" alt="LAYERS JACK CONVENTION" style={{ width: "100%", borderRadius: 8, marginBottom: 32 }} />
          <div style={{ fontSize: 18, letterSpacing: 4, color: "#aaa", fontWeight: 600, marginBottom: 40 }}>Coming Soon</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <a href="https://x.com/LJC_Nagareyama" target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#111", color: "#fff", borderRadius: 10, padding: "14px 0", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>𝕏 公式アカウント</a>
            <a href="https://www.instagram.com/ljc_nagareyama" target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", color: "#111", border: "1px solid #111", borderRadius: 10, padding: "14px 0", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>📷 Instagram</a>
          </div>
          <a href="mailto:layersjack.convention@gmail.com" style={{ display: "block", textAlign: "center", background: "#fff", color: "#111", border: "1px solid #ddd", borderRadius: 10, padding: "14px 0", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>📧 お問い合わせはこちら</a>
        </div>
      </div>

    </div>
  );
}