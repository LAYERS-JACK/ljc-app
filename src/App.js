import { useState, useEffect } from "react";

const tagColor = (tag) => {
  if (tag === "協賛店") return "#555";
  if (tag === "撮影・乗車") return "#222";
  return "#333";
};

function ImageSlider({ images, name }) {
  const [idx, setIdx] = useState(0);
  const [modal, setModal] = useState(false);
  if (!images || images.length === 0) return null;
  return (
    <div style={{ position: "relative", marginBottom: 10 }}>
      <img src={images[idx]} alt={name} onClick={() => setModal(true)} style={{ width: "100%", borderRadius: 8, display: "block", cursor: "zoom-in" }} />
      {images.length > 1 && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
          <button onClick={() => setIdx(i => (i - 1 + images.length) % images.length)} style={{ background: "#111", color: "#fff", border: "none", borderRadius: 6, padding: "4px 12px", fontSize: 16, cursor: "pointer" }}>‹</button>
          <span style={{ fontSize: 12, color: "#888" }}>{idx + 1} / {images.length}</span>
          <button onClick={() => setIdx(i => (i + 1) % images.length)} style={{ background: "#111", color: "#fff", border: "none", borderRadius: 6, padding: "4px 12px", fontSize: 16, cursor: "pointer" }}>›</button>
        </div>
      )}
      {modal && (
        <div onClick={() => setModal(false)} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.95)", zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => setModal(false)} style={{ position: "fixed", top: 20, right: 20, background: "#fff", color: "#111", border: "none", borderRadius: "50%", width: 48, height: 48, fontSize: 22, fontWeight: 700, cursor: "pointer", zIndex: 1001, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          <img src={images[idx]} alt={name} onClick={e => e.stopPropagation()} style={{ maxWidth: "95vw", maxHeight: "85vh", borderRadius: 8, objectFit: "contain", touchAction: "pinch-zoom" }} />
          {images.length > 1 && (
            <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
              <button onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); }} style={{ background: "#fff", color: "#111", border: "none", borderRadius: 6, padding: "8px 20px", fontSize: 20, cursor: "pointer", fontWeight: 700 }}>‹</button>
              <span style={{ color: "#fff", fontSize: 14, display: "flex", alignItems: "center" }}>{idx + 1} / {images.length}</span>
              <button onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); }} style={{ background: "#fff", color: "#111", border: "none", borderRadius: 6, padding: "8px 20px", fontSize: 20, cursor: "pointer", fontWeight: 700 }}>›</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TopSlideshow({ spots }) {
  const allImages = spots.flatMap(s => s.images.map(img => ({ src: img, name: s.name })));
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % allImages.length), 3000);
    return () => clearInterval(timer);
  }, [allImages.length]);
  return (
    <div style={{ position: "relative", width: "100%", borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
      <img src={allImages[idx].src} alt={allImages[idx].name} style={{ width: "100%", height: 240, objectFit: "cover", display: "block" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.7))", padding: "20px 16px 12px" }}>
        <div style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>📍 {allImages[idx].name}</div>
      </div>
      <div style={{ position: "absolute", bottom: 8, right: 12, display: "flex", gap: 4 }}>
        {allImages.map((_, i) => (
          <div key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 16 : 6, height: 6, borderRadius: 3, background: i === idx ? "#fff" : "rgba(255,255,255,0.5)", cursor: "pointer", transition: "width 0.3s" }} />
        ))}
      </div>
    </div>
  );
}

const tabs = ["TOP", "お知らせ", "イベント概要", "スケジュール", "スポット", "更衣室", "アクセス", "ルール", "FAQ", "イベント一覧", "オフ会プラン"];

export default function App({ event }) {
  const { meta, details, photographer, notices, spots, dressingRoom, access, rules, faqs, staff } = event;

  const getInitialTab = () => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    return tabs.includes(hash) ? hash : "TOP";
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [openSpot, setOpenSpot] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [staffUnlocked, setStaffUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handlePasswordSubmit = () => {
    if (passwordInput === staff.password) {
      setStaffUnlocked(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleTab = (t) => {
    setActiveTab(t);
    setMenuOpen(false);
    window.location.hash = encodeURIComponent(t);
  };

  return (
    <div style={{ fontFamily: "'Helvetica Neue', sans-serif", background: "#f5f5f5", minHeight: "100vh", maxWidth: 480, margin: "0 auto", color: "#111" }}>

      {/* ヘッダー */}
      <div style={{ background: "#111", color: "#fff", padding: "24px 20px 16px", position: "sticky", top: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div onClick={() => handleTab("TOP")} style={{ cursor: "pointer" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#aaa", marginBottom: 4 }}>{meta.subtitle}</div>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 1 }}>{meta.title}</div>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={{ display: "block", width: 24, height: 2, background: menuOpen ? "#aaa" : "#fff" }} />
          <span style={{ display: "block", width: 24, height: 2, background: menuOpen ? "#aaa" : "#fff" }} />
          <span style={{ display: "block", width: 24, height: 2, background: menuOpen ? "#aaa" : "#fff" }} />
        </button>
      </div>

      {/* メニュー */}
      {menuOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 200 }}>
          <div onClick={() => setMenuOpen(false)} style={{ position: "absolute", width: "100%", height: "100%", background: "rgba(0,0,0,0.5)" }} />
          <div style={{ position: "absolute", right: 0, top: 0, width: 240, height: "100%", background: "#111", padding: "80px 0 40px" }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#666", padding: "0 24px", marginBottom: 16 }}>MENU</div>
            {tabs.map(t => (
              <div key={t}>
                {t === "イベント一覧" && (
                  <div style={{ borderTop: "1px solid #333", margin: "8px 0" }} />
                )}
                <button onClick={() => handleTab(t)} style={{ display: "block", width: "100%", padding: "16px 24px", background: activeTab === t ? "#222" : "none", border: "none", borderLeft: activeTab === t ? "3px solid #fff" : "3px solid transparent", color: activeTab === t ? "#fff" : "#aaa", fontSize: 15, fontWeight: activeTab === t ? 700 : 400, textAlign: "left", cursor: "pointer", letterSpacing: 1 }}>{t}</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ padding: "20px 16px", paddingBottom: 100 }}>

        {/* イベント一覧 */}
        {activeTab === "イベント一覧" && (
          <div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>公開中・開催予定のイベント</div>
            {meta.eventsList.map((event, i) => (
              <div key={i} style={{ background: "#fff", border: `1px solid ${event.current ? "#111" : "#ddd"}`, borderRadius: 12, padding: 20, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{event.title}</div>
                  {event.status === "open" && (
                    <span style={{ background: "#111", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: 1, flexShrink: 0 }}>公開中</span>
                  )}
                  {event.status === "coming_soon" && (
                    <span style={{ background: "#f0f0f0", color: "#888", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: 1, flexShrink: 0 }}>COMING SOON</span>
                  )}
                </div>
                <div style={{ fontSize: 13, color: "#555", marginBottom: 4 }}>📅 {event.date}</div>
                <div style={{ fontSize: 13, color: "#555", marginBottom: event.description ? 8 : 16 }}>📍 {event.area}</div>
                {event.description && <div style={{ fontSize: 13, color: "#111", fontWeight: 600, marginBottom: 16, lineHeight: 1.6 }}>{event.description}</div>}
                {event.current && (
                  <button onClick={() => handleTab("TOP")} style={{ width: "100%", background: "#111", color: "#fff", border: "none", borderRadius: 8, padding: "12px 0", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>詳細を見る →</button>
                )}
                {event.status === "coming_soon" && (
                  <div style={{ textAlign: "center", fontSize: 12, color: "#aaa", padding: "8px 0" }}>詳細は近日公開予定です</div>
                )}
                {event.status === "coming_soon" && event.presale && (
                  <div style={{ background: "#fff", border: "2px solid #111", borderRadius: 10, padding: 12, marginTop: 8 }}>
                    <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 4 }}>🎟 先行販売情報</div>
                    <div style={{ fontSize: 12, color: "#444", lineHeight: 1.6 }}>{event.presale}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TOP */}
        {activeTab === "TOP" && (
          <div>
            <div style={{ background: "#111", color: "#fff", borderRadius: 12, padding: "24px 24px 20px", marginBottom: 16, textAlign: "center" }}>
              <img src={meta.logo} alt={meta.title} style={{ width: "100%", borderRadius: 8 }} />
            </div>

            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 12, padding: "16px 20px", marginBottom: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: "📅", label: "開催日", value: details.date },
                { icon: "🕐", label: "時間", value: details.time },
                { icon: "📍", label: "場所", value: details.area },
                { icon: "💰", label: "参加費", value: details.price },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 20, width: 28, textAlign: "center", flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontSize: 12, color: "#888", width: 44, flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{value}</span>
                </div>
              ))}
            </div>

            {meta.ticketUrl && (
              <a href={meta.ticketUrl} target="_blank" rel="noreferrer" style={{ display: "block", textAlign: "center", background: "#111", color: "#fff", borderRadius: 10, padding: "16px 0", fontSize: 15, fontWeight: 700, textDecoration: "none", marginBottom: 16, letterSpacing: 1 }}>🎟 参加申し込みはこちら</a>
            )}

            {meta.showPresale && (
              <div style={{ background: "#fff", border: "2px solid #111", borderRadius: 12, padding: 16, marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>🎟 先行販売情報</div>
                <div style={{ fontSize: 13, color: "#444", lineHeight: 1.8 }}>次回イベント「狐の嫁入りイベント」のチケット先行販売を、6月イベントへご来場された方に予定しています！</div>
              </div>
            )}

            {meta.showSlideshow && <TopSlideshow spots={spots} />}

            <div style={{ background: "#f0f0f0", borderRadius: 10, padding: 14, fontSize: 12, color: "#666", lineHeight: 1.8, marginBottom: 12, textAlign: "center" }}>
              📲 このページをホーム画面に追加すると<br />いつでもすぐにアクセスできます！
            </div>

            {photographer && (
              <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 12, padding: 20, marginBottom: 16, textAlign: "left" }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, letterSpacing: 1, textAlign: "center" }}>📷 公式カメラマン📷</div>
                <img src={photographer.image} alt={photographer.name} style={{ width: "100%", borderRadius: 8, marginBottom: 12 }} />
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, textAlign: "center" }}>{photographer.name}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <a href={photographer.twitter} target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#111", color: "#fff", borderRadius: 10, padding: "12px 0", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>𝕏 アカウント</a>
                  <a href={photographer.instagram} target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", color: "#111", border: "1px solid #111", borderRadius: 10, padding: "12px 0", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>📷 Instagram</a>
                </div>
              </div>
            )}

            <div style={{ fontSize: 13, color: "#888", letterSpacing: 2, marginBottom: 8, textAlign: "center" }}>― {meta.title} ―</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <a href={meta.sns.twitter} target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#111", color: "#fff", borderRadius: 10, padding: "14px 0", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>𝕏 公式アカウント</a>
              <a href={meta.sns.instagram} target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", color: "#111", border: "1px solid #111", borderRadius: 10, padding: "14px 0", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>📷 Instagram</a>
            </div>
            <a href={`mailto:${meta.contact}`} style={{ display: "block", textAlign: "center", background: "#fff", color: "#111", border: "1px solid #ddd", borderRadius: 10, padding: "14px 0", fontSize: 13, fontWeight: 600, textDecoration: "none", marginBottom: 12 }}>📧 お問い合わせはこちら</a>

            {meta.sponsor && (
              <div style={{ textAlign: "center", padding: "16px 0", marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: "#aaa", letterSpacing: 2, marginBottom: 6 }}>後援</div>
                <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 3, color: "#111" }}>{meta.sponsor}</div>
              </div>
            )}

            <div style={{ background: "#111", color: "#fff", borderRadius: 10, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 12, color: "#aaa", marginBottom: 8, letterSpacing: 1 }}>📣 公式ハッシュタグ</div>
              {meta.hashtags.map(tag => (
                <div key={tag} style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>{tag}</div>
              ))}
              <button onClick={() => { navigator.clipboard.writeText(meta.hashtags.join(" ")); alert("ハッシュタグをコピーしました！"); }} style={{ background: "#333", color: "#fff", border: "none", borderRadius: 6, padding: "8px 20px", fontSize: 12, cursor: "pointer", fontWeight: 600, marginTop: 8 }}>📋 まとめてコピー</button>
              <div style={{ marginTop: 12, borderTop: "1px solid #333", paddingTop: 12, fontSize: 12, color: "#aaa", lineHeight: 1.8 }}>
                <div>SNS投稿時は公式ハッシュタグをつけてシェアしよう！</div>
                <div>他の参加者を映した写真は必ず同意を得てから投稿しましょう。</div>
              </div>
            </div>
          </div>
        )}

        {/* お知らせ */}
        {activeTab === "お知らせ" && (
          <div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>最新のお知らせ</div>
            {notices.map((n, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: "#aaa", marginBottom: 6 }}>{n.date}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{n.title}</div>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.8 }}>
                  {n.body.map((line, j) => <div key={j}>{line}</div>)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* イベント概要 */}
        {activeTab === "イベント概要" && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, letterSpacing: 1 }}>📌 イベント概要</div>
              {[
                ["📅 開催日", details.date],
                ["🕐 開催時間", details.time],
                ["👘 更衣室完全撤収", details.closingTime],
                ["👥 定員", details.capacity],
                ["💰 参加費", details.price],
                ["📍 エリア", details.area],
                ["👘 更衣室", details.venue],
                ["📷 公式カメラマン", details.photographer],
                ["🎪 主催", details.organizer],
                ["🤝 後援", details.backer],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #e0e0e0", fontSize: 13 }}>
                  <span style={{ color: "#888" }}>{k}</span>
                  <span style={{ fontWeight: 500, textAlign: "right", maxWidth: "60%" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>💴 料金一覧</div>
              {details.pricing.map(({ label, price }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f0f0", fontSize: 13 }}>
                  <span style={{ color: "#555" }}>{label}</span>
                  <span style={{ fontWeight: 700 }}>{price}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, fontSize: 12, color: "#555", lineHeight: 1.8, marginBottom: 12 }}>
              {details.description}
            </div>
            {meta.ticketUrl && (
              <a href={meta.ticketUrl} target="_blank" rel="noreferrer" style={{ display: "block", textAlign: "center", background: "#111", color: "#fff", borderRadius: 10, padding: "16px 0", fontSize: 15, fontWeight: 700, textDecoration: "none", marginTop: 12 }}>🎟 参加申し込みはこちら</a>
            )}
          </div>
        )}

        {/* スケジュール */}
        {activeTab === "スケジュール" && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 18, letterSpacing: 3, color: "#aaa", fontWeight: 600 }}>Coming Soon</div>
          </div>
        )}

        {/* スポット */}
        {activeTab === "スポット" && (
          <div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>撮影スポット・協賛店一覧</div>
            {spots.map(spot => (
              <div key={spot.id}>
                <div onClick={() => setOpenSpot(openSpot === spot.id ? null : spot.id)} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: "14px 16px", marginBottom: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 24 }}>{spot.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{spot.name}</div>
                      <span style={{ fontSize: 10, background: tagColor(spot.tag), color: "#fff", padding: "2px 8px", borderRadius: 20, letterSpacing: 1 }}>{spot.tag}</span>
                    </div>
                  </div>
                  <span style={{ color: "#aaa", fontSize: 18 }}>{openSpot === spot.id ? "▲" : "▼"}</span>
                </div>
                {openSpot === spot.id && (
                  <div style={{ background: "#f9f9f9", border: "1px solid #ddd", borderTop: "none", borderRadius: "0 0 10px 10px", padding: "12px 16px", marginTop: -8, marginBottom: 8, fontSize: 13, lineHeight: 1.8, color: "#333" }}>
                    <ImageSlider images={spot.images} name={spot.name} />
                    <div style={{ marginBottom: 6 }}>{spot.detail}</div>
                    {spot.map && !spot.map2 && (
                      <a href={spot.map} target="_blank" rel="noreferrer" style={{ display: "inline-block", background: "#fff", color: "#111", border: "1px solid #111", borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 600, marginBottom: 8, textDecoration: "none" }}>🗺 Google マップで見る</a>
                    )}
                    {spot.map && spot.map2 && (
                      <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                        <a href={spot.map} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: "center", background: "#fff", color: "#111", border: "1px solid #111", borderRadius: 6, padding: "6px 8px", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>🗺 階段①</a>
                        <a href={spot.map2} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: "center", background: "#fff", color: "#111", border: "1px solid #111", borderRadius: 6, padding: "6px 8px", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>🗺 階段②</a>
                        {spot.map3 && <a href={spot.map3} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: "center", background: "#fff", color: "#111", border: "1px solid #111", borderRadius: 6, padding: "6px 8px", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>🗺 階段③</a>}
                      </div>
                    )}
                    <div style={{ background: "#111", color: "#fff", borderRadius: 6, padding: "8px 12px", fontSize: 12, whiteSpace: "pre-line" }}>📢 {spot.note}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 更衣室 */}
        {activeTab === "更衣室" && (
          <div>
            <div style={{ background: "#111", color: "#fff", borderRadius: 12, padding: 20, marginBottom: 16, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>👘</div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{dressingRoom.name}</div>
              <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>公式更衣室</div>
            </div>
            {[
              ["📍 住所", dressingRoom.address],
              ["🕐 通常利用時間", dressingRoom.hours],
              ["⭐ アーリー利用", dressingRoom.earlyHours],
              ["🏁 完全撤収", dressingRoom.closing],
              ["💼 クローク", dressingRoom.cloakFee],
            ].map(([k, v]) => (
              <div key={k} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: "14px 16px", marginBottom: 8, fontSize: 13 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{k}</div>
                <div style={{ color: "#555" }}>{v}</div>
              </div>
            ))}
            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: "14px 16px", marginBottom: 8, fontSize: 13 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>🧳 荷物について</div>
              <div style={{ color: "#555", lineHeight: 1.8 }}>
                {dressingRoom.notes.map((n, i) => <div key={i}>・{n}</div>)}
              </div>
            </div>
            <div style={{ background: "#f0f0f0", borderRadius: 10, padding: 14, fontSize: 12, color: "#666", lineHeight: 1.8, marginBottom: 8 }}>
              ⚠️ 更衣室は参加者のみ利用可能です。混雑状況によりお待ちいただく場合があります。<br />
              ・館内ではスタッフの指示に従ってください。<br />
              ・土足禁止エリアがあります。
            </div>
            <div style={{ borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>
              <iframe title={`${dressingRoom.name} 地図`} src={dressingRoom.mapEmbed + "&z=17"} width="100%" height="240" style={{ border: 0, display: "block" }} allowFullScreen="" loading="lazy" />
            </div>
            <a href={dressingRoom.mapUrl} target="_blank" rel="noreferrer" style={{ display: "block", textAlign: "center", background: "#111", color: "#fff", borderRadius: 10, padding: "14px 16px", fontSize: 13, fontWeight: 600, textDecoration: "none", marginBottom: 8 }}>🗺 Google マップで見る</a>
          </div>
        )}

        {/* アクセス */}
        {activeTab === "アクセス" && (
          <div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>会場へのアクセス</div>
            <div style={{ background: "#111", color: "#fff", borderRadius: 12, padding: 20, marginBottom: 16, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📍</div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{access.area}</div>
              <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>{access.areaDetail}</div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>🚃 電車でのアクセス</div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.8, marginBottom: 12 }}>
                <div><strong>{access.station}</strong> が最寄り駅です。</div>
                <div>一日フリー乗車券（500円）がお得で便利です。</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <a href={access.routeUrl} target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#111", color: "#fff", borderRadius: 6, padding: "10px 8px", fontSize: 12, fontWeight: 600, textDecoration: "none", textAlign: "center" }}>🗺 駅からのルートを見る</a>
                <a href={access.mapUrl} target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", color: "#111", border: "1px solid #111", borderRadius: 6, padding: "10px 8px", fontSize: 12, fontWeight: 600, textDecoration: "none", textAlign: "center" }}>🗺 イベントエリアマップ</a>
              </div>
            </div>
            <div style={{ borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>
              <iframe
                title="流山本町エリア 地図"
                src="https://www.google.com/maps?q=千葉県流山市流山1丁目136&output=embed&z=17"
                width="100%"
                height="240"
                style={{ border: 0, display: "block" }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>🚗 車でのアクセス</div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.8 }}>
                <div>会場専用の無料駐車場はありません。</div>
                <div>近辺の有料コインパーキングをご利用ください。</div>
              </div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #c00", borderRadius: 10, padding: 16, marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: "#c00" }}>🚫 駐車場について</div>
              <div style={{ fontSize: 13, color: "#c00", lineHeight: 1.8 }}>
                各施設・店舗の無料駐車場のご利用はお断りします。イベント参加者専用の駐車場はございません。
              </div>
            </div>
            <div style={{ background: "#f0f0f0", borderRadius: 10, padding: 14, fontSize: 12, color: "#666", lineHeight: 1.8 }}>
              ⚠️ 会場周辺は混雑が予想されます。できるだけ電車でのご来場をお願いします。
            </div>
          </div>
        )}

        {/* ルール */}
        {activeTab === "ルール" && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16, letterSpacing: 1 }}>📋 参加ルール・マナー</div>
            {rules.map((section, idx) => {
              if (section.header) {
                return (
                  <div key={idx} style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#888", padding: "4px 4px", marginTop: 20, marginBottom: 8, borderBottom: "1px solid #ddd", textTransform: "uppercase" }}>
                    {section.header}
                  </div>
                );
              }
              return (
                <div key={section.title} style={{ background: "#fff", border: `1px solid ${section.warning ? "#c00" : "#ddd"}`, borderRadius: 10, padding: 16, marginBottom: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: section.warning ? "#c00" : "#111" }}>{section.title}</div>
                  {section.items.map((item, i) => (
                    <div key={i} style={{ fontSize: 13, color: section.warning ? "#c00" : "#444", padding: "6px 0", borderBottom: i < section.items.length - 1 ? "1px solid #f0f0f0" : "none", lineHeight: 1.6 }}>
                      ・{item.split(/\*\*(.*?)\*\*/).map((part, j) =>
                        j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* オフ会プラン */}
        {activeTab === "オフ会プラン" && (
          <div>
            <div style={{ background: "#111", color: "#fff", borderRadius: 12, padding: 20, marginBottom: 16, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📷</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>撮影オフ会プラン</div>
              <div style={{ fontSize: 12, color: "#aaa" }}>少人数から楽しめる撮影オフ会</div>
            </div>

            <div style={{ background: "#f0f0f0", borderRadius: 10, padding: 14, fontSize: 12, color: "#666", lineHeight: 1.8, marginBottom: 16 }}>
              自由な形で開催できます。最低人数10名〜。<br />少人数の場合、料金が変更になります。お問い合わせください。
            </div>

            {/* ランチプラン */}
            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 12, padding: 20, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>🍽️ レストラン貸切ランチ付き撮影オフ会プラン</div>
              {[
                ["🕐 時間", "10:00〜17:00"],
                ["💰 料金", "5,000円（ランチ付き）"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f0f0", fontSize: 13 }}>
                  <span style={{ color: "#888" }}>{k}</span>
                  <span style={{ fontWeight: 700 }}>{v}</span>
                </div>
              ))}
            </div>

            {/* ディナープラン */}
            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 12, padding: 20, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>🍷 レストラン貸切ディナー付き撮影オフ会プラン</div>
              {[
                ["🕐 時間", "18:00〜21:00"],
                ["💰 料金", "7,500円（ディナー付き）"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f0f0", fontSize: 13 }}>
                  <span style={{ color: "#888" }}>{k}</span>
                  <span style={{ fontWeight: 700 }}>{v}</span>
                </div>
              ))}
            </div>

            {/* オプション */}
            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>✨ オプション（別料金）</div>
              <div style={{ fontSize: 13, color: "#444", lineHeight: 1.8 }}>
                <div>・外ロケーション撮影許可</div>
                <div>・アテンド兼、案内係を付けることができます</div>
              </div>
            </div>

            <a href={`mailto:${meta.contact}`} style={{ display: "block", textAlign: "center", background: "#111", color: "#fff", borderRadius: 10, padding: "16px 0", fontSize: 14, fontWeight: 700, textDecoration: "none", marginBottom: 8 }}>📧 オフ会プランについて問い合わせる</a>
          </div>
        )}

        {/* FAQ */}
        {activeTab === "FAQ" && (
          <div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>よくある質問</div>
            {faqs.map(section => (
              <div key={section.category} style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: 1, marginBottom: 8, padding: "6px 12px", background: "#111", color: "#fff", borderRadius: 6 }}>{section.category}</div>
                {section.items.map((item, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 14, marginBottom: 8 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>Q. {item.q}</div>
                    <div style={{ fontSize: 13, color: "#555", lineHeight: 1.8 }}>A. {item.a}</div>
                  </div>
                ))}
              </div>
            ))}
            <a href={`mailto:${meta.contact}`} style={{ display: "block", textAlign: "center", background: "#111", color: "#fff", borderRadius: 10, padding: "14px 0", fontSize: 13, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 80 }}>📧 お問い合わせはこちら</a>
          </div>
        )}

        {/* スタッフ */}
        {activeTab === "スタッフ" && (
          <div>
            {!staffUnlocked ? (
              <div style={{ textAlign: "center", padding: "40px 16px" }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>🔒</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>スタッフ専用ページ</div>
                <div style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>パスワードを入力してください</div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handlePasswordSubmit()}
                  placeholder="パスワード"
                  style={{ width: "100%", padding: "12px 16px", fontSize: 15, borderRadius: 8, border: `1px solid ${passwordError ? "#c00" : "#ddd"}`, marginBottom: 8, boxSizing: "border-box", outline: "none" }}
                />
                {passwordError && <div style={{ fontSize: 12, color: "#c00", marginBottom: 12 }}>パスワードが違います</div>}
                <button onClick={handlePasswordSubmit} style={{ width: "100%", background: "#111", color: "#fff", border: "none", borderRadius: 8, padding: "14px 0", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>入力</button>
              </div>
            ) : (
              <div>
                <div style={{ background: "#111", color: "#fff", borderRadius: 12, padding: "16px 20px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#aaa", letterSpacing: 2, marginBottom: 4 }}>STAFF ONLY</div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>スタッフ専用ページ</div>
                  </div>
                  <button onClick={() => { setStaffUnlocked(false); setPasswordInput(""); }} style={{ background: "#333", color: "#aaa", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 11, cursor: "pointer" }}>🔒 ロック</button>
                </div>

                <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: 1, marginBottom: 8, padding: "6px 12px", background: "#111", color: "#fff", borderRadius: 6 }}>📋 当日プログラム</div>
                <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 16 }}>
                  {[
                    { phase: "オープニング前", time: "09:30〜10:00", items: ["集合・朝礼・設営・役割確認"] },
                    { phase: "午前の部", time: "10:00〜12:00", items: ["受付対応・流鉄乗車サポート"] },
                    { phase: "オープニング", time: "12:00〜12:30", items: ["浅間神社に集合・集合写真撮影"] },
                    { phase: "午後の部", time: "12:30〜16:00", items: ["受付対応・巡回・交代休憩"] },
                    { phase: "クロージング", time: "16:30〜17:00", items: ["浅間神社に集合・集合写真撮影"] },
                    { phase: "撤収", time: "17:00〜18:30", items: ["後片付け・更衣室撤収"] },
                  ].map((item, i, arr) => (
                    <div key={i} style={{ padding: "10px 0", borderBottom: i < arr.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>📍 {item.phase}</span>
                        <span style={{ fontSize: 11, color: "#888" }}>{item.time}</span>
                      </div>
                      {item.items.map((t, j) => (
                        <div key={j} style={{ fontSize: 12, color: "#555", paddingLeft: 4 }}>・{t}</div>
                      ))}
                    </div>
                  ))}
                </div>

                <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: 1, marginBottom: 8, padding: "6px 12px", background: "#111", color: "#fff", borderRadius: 6 }}>📅 当日タイムライン</div>
                <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 16 }}>
                  {staff.timeline.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: i < staff.timeline.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#111", minWidth: 80, flexShrink: 0 }}>{item.time}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</div>
                        {item.note && <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{item.note}</div>}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: 1, marginBottom: 8, padding: "6px 12px", background: "#111", color: "#fff", borderRadius: 6 }}>📷 公式カメラマンスケジュール</div>
                <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 16 }}>
                  {[
                    { time: "10:00〜10:30", label: "準備", note: "" },
                    { time: "10:30〜12:30", label: "撮影（優先チケット）", note: "" },
                    { time: "12:30〜13:30", label: "休憩", note: "" },
                    { time: "13:30〜", label: "撮影（優先チケットの方優先）", note: "終了時間はチケット購入者数によります" },
                  ].map((item, i, arr) => (
                    <div key={i} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#111", minWidth: 80, flexShrink: 0 }}>{item.time}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</div>
                        {item.note && <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{item.note}</div>}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 16 }}>
                  {staff.roles.map((item, i) => (
                    <div key={i} style={{ padding: "8px 0", borderBottom: i < staff.roles.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>
                        {item.role}　{i === 0 || i === 1 ? `×${item.count}名` : `×${item.count}名（交代あり）`}
                      </div>
                      {item.person && <div style={{ fontSize: 12, color: "#888" }}>担当：{item.person}</div>}
                    </div>
                  ))}
                </div>

                <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: 1, marginBottom: 8, padding: "6px 12px", background: "#111", color: "#fff", borderRadius: 6 }}>🍽️ スタッフランチ</div>
                <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 16, fontSize: 13, color: "#444", lineHeight: 1.8 }}>
                  <div>スタッフ・ボランティアのランチは、CHAT ERRANTが提供します。</div>
                  <div style={{ marginTop: 6, color: "#888" }}>休憩は交代制のため、時間はスタッフによって異なります。</div>
                </div>

                <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: 1, marginBottom: 8, padding: "6px 12px", background: "#111", color: "#fff", borderRadius: 6 }}>📋 受付オペレーション</div>
                <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 8 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>受付の流れ</div>
                  {staff.reception.flow.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: i < staff.reception.flow.length - 1 ? "1px solid #f0f0f0" : "none", fontSize: 13 }}>
                      <span style={{ background: "#111", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 16 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>クローク受付</div>
                  {staff.reception.cloak.map((item, i) => (
                    <div key={i} style={{ fontSize: 13, color: "#444", padding: "4px 0", lineHeight: 1.6 }}>・{item}</div>
                  ))}
                </div>
                <a href="/LivePocket_Scan_manual.pdf" target="_blank" rel="noreferrer" style={{ display: "block", textAlign: "center", background: "#fff", color: "#111", border: "1px solid #111", borderRadius: 10, padding: "14px 0", fontSize: 13, fontWeight: 600, textDecoration: "none", marginBottom: 16 }}>📄 LivePocketスキャンマニュアルを見る</a>

                <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: 1, marginBottom: 8, padding: "6px 12px", background: "#c00", color: "#fff", borderRadius: 6 }}>⚠️ トラブル対応</div>
                {staff.troubles.map((item, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #c00", borderRadius: 10, padding: 14, marginBottom: 8 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#c00", marginBottom: 6 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{item.action}</div>
                  </div>
                ))}

                <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: 1, margin: "16px 0 8px", padding: "6px 12px", background: "#111", color: "#fff", borderRadius: 6 }}>📞 緊急連絡</div>
                {staff.emergency.map((item, i) => (
                  item.tel ? (
                    <a key={i} href={`tel:${item.tel}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: "12px 16px", marginBottom: 8, textDecoration: "none" }}>
                      <span style={{ fontSize: 13, color: "#888" }}>{item.label}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>📞 {item.value}</span>
                    </a>
                  ) : (
                    <div key={i} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: "12px 16px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, color: "#888" }}>{item.label}</span>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>{item.value}</span>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* フッター */}
      <div style={{ textAlign: "center", padding: "24px 16px 40px" }}>
        <div style={{ fontSize: 11, color: "#aaa", marginBottom: 8 }}>© 2026 Tied in Eventplanning</div>
        <span onClick={() => handleTab("スタッフ")} style={{ fontSize: 11, color: "#ccc", cursor: "pointer", letterSpacing: 1 }}>staff</span>
      </div>

    </div>
  );
}