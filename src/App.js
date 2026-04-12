import { useState } from "react";

const spots = [
  { id: 1, name: "近藤勇陣屋跡", icon: "🏯", tag: "撮影スポット", note: "室内撮影も可能になりました。", detail: "近藤勇ゆかりの歴史的スポット。屋外・室内ともに撮影OK。", images: ["/jinnyaato01.jpg", "/jinyaato02.jpg"], map: "https://maps.app.goo.gl/mA4rqrb5vQbQ4FKVA" },
  { id: 2, name: "浅間神社", icon: "⛩️", tag: "撮影スポット", note: "撮影可能。トイレもお借りできます。", detail: "境内での撮影が可能です。トイレ利用もOK。参拝者への配慮をお願いします。", images: ["/sengen01.jpg", "/sengen02.jpg", "/sengen03.jpg"], map: "https://maps.app.goo.gl/WyXJqtBiWors2EfA6" },
  { id: 3, name: "流山駅（流鉄流山線）", icon: "🚃", tag: "撮影・乗車", note: "乗車・撮影可能。利用者の邪魔にならない配慮でお願いします。", detail: "コスプレ乗車可能区間：流山駅〜馬橋駅。降車は流山駅・馬橋駅のみ。改札外に出られるのは流山駅のみ。コスプレ乗車時間：11:00〜16:00。往復乗車券440円、一日フリー乗車券500円。", images: ["/nagareyamaeki.jpg"], map: "https://maps.app.goo.gl/4XHTUziQm3Ewwzrx5" },
  { id: 4, name: "CHAT ERRANT", icon: "🍽️", tag: "協賛店", note: "ランチ営業・撮影スポット", detail: "流山本町エリアにある創作フレンチレストランです。当日はランチ営業を行っており、店内は撮影スポットとしてもご利用いただけます。", images: ["/chaterrant01.jpg"], map: "https://maps.app.goo.gl/XPWSuMm8fijJqLkt6" },
  { id: 5, name: "万華鏡ミュージアム", icon: "🔮", tag: "撮影スポット", note: "狭いため、建物前のみでの撮影が良いと思います。", detail: "建物外観が撮影スポットです。館内は一般見学者への配慮をお願いします。", images: ["/mangekyou01.jpg"], map: "https://maps.app.goo.gl/C1GoXzKYEUd7JiLx9" },
  { id: 6, name: "流山みりんミュージアム", icon: "🍶", tag: "撮影スポット", note: "施設内でも撮影可能です。", detail: "施設内部での撮影もOK。スタッフの案内に従ってください。", images: ["/mirin01.jpg"], map: "https://maps.app.goo.gl/tAbXgPDHVjfuFDtQ6" },
  { id: 8, name: "流山線歩道橋", icon: "🌉", tag: "撮影スポット", note: "撮影の際は、安全確認をお願いします。", detail: "駅が近く、撮影スポットとして使用できます。", images: ["/hodokyou01.jpg", "/hodoukyou02.jpg", "/hodoukyou03.jpg", "/hodoukyou04.jpg", "/hodoukyou05.jpg"], map: "https://maps.app.goo.gl/3sad4NCQfLbutbxs5" },
  { id: 7, name: "江戸川土手", icon: "🌊", tag: "撮影スポット", note: "全域で撮影可能です。", detail: "広大な土手エリアを自由に使えます。自然光を活かした撮影に最適。", images: ["/edogawa01.jpg", "/edogawa02.jpg", "/edogawa03.jpg", "/edogawa04.jpg", "/edogawa05.jpg"], map: "https://maps.app.goo.gl/n85F3pgeVYoRADuN6", map2: "https://maps.app.goo.gl/99h5UiiE3TyGNwvv7", map3: "https://maps.app.goo.gl/YqpCRJ7d3aC6hpVs7" },
];

const schedule = [
  { time: "10:00〜", label: "アーリー更衣室利用受付開始", icon: "⭐", note: "アーリー利用は+500円" },
  { time: "11:00〜", label: "通常更衣室受付開始", icon: "👘", note: "" },
  { time: "11:00〜", label: "流鉄流山線コスプレ乗車開始", icon: "🚃", note: "往復440円 / 一日フリー500円" },
  { time: "12:00〜", label: "オープニングイベント", icon: "🎉", note: "📍 浅間神社" },
  { time: "12:15〜", label: "集合写真撮影", icon: "📸", note: "📍 浅間神社" },
  { time: "〜16:00", label: "受付終了・流鉄コスプレ乗車終了", icon: "🔔", note: "" },
  { time: "16:30〜", label: "クローズイベント", icon: "🎊", note: "📍 浅間神社" },
  { time: "16:45〜", label: "集合写真撮影", icon: "📸", note: "📍 浅間神社" },
  { time: "〜18:30", label: "更衣室完全撤収", icon: "🏁", note: "時間厳守でお願いします" },
];

const faqs = [
  { category: "参加について", items: [
    { q: "初めてのコスプレイベントでも参加できますか？", a: "もちろん大歓迎です！スタッフがサポートしますので、お気軽にご参加ください。" },
    { q: "当日参加はできますか？", a: "定員に余裕がある場合のみ当日参加が可能です。事前予約を推奨しています。" },
    { q: "友人と一緒に参加できますか？", a: "もちろんです！グループでのご参加も歓迎しています。" },
  ]},
  { category: "衣装・更衣について", items: [
    { q: "更衣室の利用に追加料金はかかりますか？", a: "参加費（3,500円）に含まれていますので追加料金はかかりません。" },
    { q: "更衣室に鍵付きロッカーはありますか？", a: "鍵付きロッカーのご用意はありませんが、クローク（500円・当日現金払い）をご利用いただけます。貴重品は各自で管理してください。" },
    { q: "衣装のサイズや種類に制限はありますか？", a: "着ぐるみや大型衣装の場合はアテンドの同行が必要です。また禁止衣装がありますので、ルールページをご確認ください。" },
  ]},
  { category: "撮影について", items: [
    { q: "一般の方への撮影をお願いしてもいいですか？", a: "一般の方への撮影依頼はご遠慮ください。参加者同士での撮影は必ず相手の同意を得てから行ってください。" },
    { q: "三脚や大型カメラの使用はできますか？", a: "周囲の方の迷惑にならない範囲でご使用いただけます。道路での使用は禁止します。撮影可能場所混雑時はスタッフの指示に従ってください。" },
  ]},
  { category: "流鉄について", items: [
    { q: "乗車券は自分で購入するのですか？", a: "はい、乗車券は各自でご購入ください。往復乗車券440円、または一日フリー乗車券500円がご利用いただけます。電車で来場される方は一日フリー乗車券がお得です。" },
    { q: "コスプレのまま改札を通っていいですか？", a: "コスプレでの乗車は11:00〜16:00の間のみ可能です。改札外に出られるのは流山駅のみとなります。" },
  ]},
  { category: "その他", items: [
    { q: "雨天の場合はどうなりますか？", a: "小雨の場合は予定通り開催します。荒天の場合は公式SNSにてお知らせします。" },
    { q: "子どもと一緒に参加できますか？", a: "お子様連れでのご参加も歓迎です。未成年の方は保護者の同伴または同意書が必要です。" },
  ]},
];

const tabs = ["TOP", "スケジュール", "スポット", "更衣室", "アクセス", "ルール", "FAQ"];
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
      <img
        src={images[idx]}
        alt={name}
        onClick={() => setModal(true)}
        style={{ width: "100%", borderRadius: 8, display: "block", cursor: "zoom-in" }}
      />
      {images.length > 1 && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
          <button onClick={() => setIdx(i => (i - 1 + images.length) % images.length)} style={{ background: "#111", color: "#fff", border: "none", borderRadius: 6, padding: "4px 12px", fontSize: 16, cursor: "pointer" }}>‹</button>
          <span style={{ fontSize: 12, color: "#888" }}>{idx + 1} / {images.length}</span>
          <button onClick={() => setIdx(i => (i + 1) % images.length)} style={{ background: "#111", color: "#fff", border: "none", borderRadius: 6, padding: "4px 12px", fontSize: 16, cursor: "pointer" }}>›</button>
        </div>
      )}
      {modal && (
        <div
          onClick={() => setModal(false)}
          style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "rgba(0,0,0,0.95)", zIndex: 1000,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          }}
        >
          <button
            onClick={() => setModal(false)}
            style={{
              position: "fixed", top: 20, right: 20,
              background: "#fff", color: "#111", border: "none",
              borderRadius: "50%", width: 48, height: 48,
              fontSize: 22, fontWeight: 700, cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 1001,
            }}
          >✕</button>
          <img
            src={images[idx]}
            alt={name}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: "95vw", maxHeight: "85vh",
              borderRadius: 8, objectFit: "contain",
              touchAction: "pinch-zoom",
            }}
          />
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

export default function App() {
  const [activeTab, setActiveTab] = useState("TOP");
  const [openSpot, setOpenSpot] = useState(null);
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

        {activeTab === "TOP" && (
          <div>
            <div style={{ background: "#111", color: "#fff", borderRadius: 12, padding: "32px 24px", marginBottom: 20, textAlign: "center" }}>
              <img src="/ljc_vo1.jpeg" alt="LAYERS JACK CONVENTION" style={{ width: "100%", borderRadius: 8, marginBottom: 12 }} />
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>LAYERS JACK</div>
              <div style={{ fontSize: 13, color: "#aaa", letterSpacing: 3 }}>CONVENTION</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, letterSpacing: 1 }}>📌 イベント概要</div>
              {[
                ["📅 開催日", "2026年6月28日（日）"],
                ["🕐 開催時間", "11:00〜17:00"],
                ["👘 更衣室完全撤収", "18:30"],
                ["👥 定員", "100名"],
                ["💰 参加費", "3,500円（更衣室利用込み）"],
                ["📍 エリア", "流山本町周辺"],
                ["👘 更衣室", "流山福祉会館"],
                ["🎪 主催", "レイヤーズ ジャック実行委員会"],
                ["🤝 協賛", "流山市"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #e0e0e0", fontSize: 13 }}>
                  <span style={{ color: "#888" }}>{k}</span>
                  <span style={{ fontWeight: 500, textAlign: "right", maxWidth: "60%", whiteSpace: "pre-line" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>💴 料金一覧</div>
              {[
                ["参加費（更衣室込み）", "3,500円"],
                ["アーリー更衣室（10:00〜）", "500円"],
                ["クローク利用（当日現金払い）", "500円"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f0f0", fontSize: 13 }}>
                  <span style={{ color: "#555" }}>{k}</span>
                  <span style={{ fontWeight: 700 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, fontSize: 12, color: "#555", lineHeight: 1.8, marginBottom: 12 }}>
              💡 流山市の歴史ある街並みを舞台にしたコスプレイベントです。近藤勇ゆかりの地や流鉄流山線など、唯一無二のロケーションをお楽しみください。
            </div>
            <a href="https://www.google.com/maps/d/edit?mid=1w5oyodlavOqjWNFjJj6C3ZmEKcGUyrI&usp=sharing" target="_blank" rel="noreferrer" style={{ display: "block", textAlign: "center", background: "#fff", color: "#111", border: "1px solid #111", borderRadius: 10, padding: "14px 0", fontSize: 13, fontWeight: 600, textDecoration: "none", marginBottom: 12 }}>🗺 イベントエリアマップを見る</a>
            <a href="https://livepocket.jp/e/ip399" target="_blank" rel="noreferrer" style={{ display: "block", textAlign: "center", background: "#111", color: "#fff", borderRadius: 10, padding: "16px 0", fontSize: 15, fontWeight: 700, textDecoration: "none", marginBottom: 12, letterSpacing: 1 }}>🎟 チケット購入はこちら</a>
            <a href="mailto:layersjack.convention@gmail.com" style={{ display: "block", textAlign: "center", background: "#fff", color: "#111", border: "1px solid #ddd", borderRadius: 10, padding: "14px 0", fontSize: 13, fontWeight: 600, textDecoration: "none", marginBottom: 12 }}>📧 お問い合わせはこちら</a>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <a href="https://x.com/LJC_Nagareyama" target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#111", color: "#fff", borderRadius: 10, padding: "14px 0", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>𝕏 公式アカウント</a>
              <a href="https://www.instagram.com/ljc_nagareyama" target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#fff", color: "#111", border: "1px solid #111", borderRadius: 10, padding: "14px 0", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>📷 Instagram</a>
            </div>
            <div style={{ background: "#111", color: "#fff", borderRadius: 10, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 12, color: "#aaa", marginBottom: 8, letterSpacing: 1 }}>📣 公式ハッシュタグ</div>
              <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>#流山本町</div>
              <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>#レイヤーズジャック</div>
              <button onClick={() => { navigator.clipboard.writeText("#流山本町 #レイヤーズジャック"); alert("ハッシュタグをコピーしました！"); }} style={{ background: "#333", color: "#fff", border: "none", borderRadius: 6, padding: "8px 20px", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>📋 まとめてコピー</button>
              <div style={{ marginTop: 12, borderTop: "1px solid #333", paddingTop: 12, fontSize: 12, color: "#aaa", lineHeight: 1.8 }}>
                <div>SNS投稿時は公式ハッシュタグをつけてシェアしよう！</div>
                <div>他の参加者を映した写真は必ず同意を得てから投稿しましょう。</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "スケジュール" && (
          <div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>2026年6月28日（日）タイムスケジュール</div>
            {schedule.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 40, height: 40, background: "#111", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                  {i < schedule.length - 1 && <div style={{ width: 2, flex: 1, background: "#ddd", margin: "4px 0" }} />}
                </div>
                <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: "10px 14px", flex: 1, marginBottom: 4 }}>
                  <div style={{ fontSize: 12, color: "#888", marginBottom: 2 }}>{item.time}</div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{item.label}</div>
                  {item.note !== "" && <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>{item.note}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

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
                    <div style={{ background: "#111", color: "#fff", borderRadius: 6, padding: "8px 12px", fontSize: 12 }}>📢 {spot.note}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "更衣室" && (
          <div>
            <div style={{ background: "#111", color: "#fff", borderRadius: 12, padding: 20, marginBottom: 16, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>👘</div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>流山福祉会館</div>
              <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>公式更衣室</div>
            </div>
            {[
              ["📍 住所", "〒270-0164 千葉県流山市流山２丁目１０２"],
              ["🕐 通常利用時間", "11:00〜17:00"],
              ["⭐ アーリー利用", "10:00〜（+500円）"],
              ["🏁 完全撤収", "18:30"],
              ["💼 クローク", "利用可能（500円・当日現金払い）※スペース限定"],
            ].map(([k, v]) => (
              <div key={k} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: "14px 16px", marginBottom: 8, fontSize: 13 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{k}</div>
                <div style={{ color: "#555" }}>{v}</div>
              </div>
            ))}
            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: "14px 16px", marginBottom: 8, fontSize: 13 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>🧳 荷物について</div>
              <div style={{ color: "#555", lineHeight: 1.8 }}>
                <div>・段ボールでの衣装持ち込みは不可です</div>
                <div>・スーツケース・ボストンバッグでの来場を推奨</div>
                <div>・荷物が多い場合は追加料金が発生します</div>
              </div>
            </div>
            <a href="https://maps.app.goo.gl/sPNcwtP9Q7PvRiP79" target="_blank" rel="noreferrer" style={{ display: "block", textAlign: "center", background: "#111", color: "#fff", borderRadius: 10, padding: "14px 16px", fontSize: 13, fontWeight: 600, textDecoration: "none", marginBottom: 8 }}>🗺 Google マップで見る</a>
            <div style={{ background: "#f0f0f0", borderRadius: 10, padding: 14, fontSize: 12, color: "#666", lineHeight: 1.8 }}>
              ⚠️ 更衣室は参加者のみ利用可能です。混雑状況によりお待ちいただく場合があります。
            </div>
          </div>
        )}

        {activeTab === "アクセス" && (
          <div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>会場へのアクセス</div>
            <div style={{ background: "#111", color: "#fff", borderRadius: 12, padding: 20, marginBottom: 16, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📍</div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>流山福祉会館</div>
              <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>〒270-0164 千葉県流山市流山２丁目１０２</div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>🚃 電車でのアクセス</div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.8, marginBottom: 12 }}>
                <div>流鉄流山線 <strong>流山駅</strong> が最寄り駅です。</div>
                <div>一日フリー乗車券（500円）がお得で便利です。</div>
              </div>
              <a href="https://maps.app.goo.gl/8qVkYAFz1XG6wVDu8" target="_blank" rel="noreferrer" style={{ display: "inline-block", background: "#111", color: "#fff", borderRadius: 6, padding: "8px 16px", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>🗺 駅からのルートを見る</a>
            </div>
            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>🚗 車でのアクセス</div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.8 }}>
                <div>会場専用の無料駐車場はありません。</div>
                <div>近辺の有料コインパーキングをご利用ください。</div>
              </div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>🚃 流鉄流山線 コスプレ乗車情報</div>
              {[
                ["乗車可能区間", "流山駅〜馬橋駅"],
                ["降車可能駅", "流山駅・馬橋駅のみ"],
                ["改札外に出られる駅", "流山駅のみ"],
                ["コスプレ乗車時間", "11:00〜16:00"],
                ["往復乗車券", "440円"],
                ["一日フリー乗車券", "500円（お得！）"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f0f0", fontSize: 13 }}>
                  <span style={{ color: "#888" }}>{k}</span>
                  <span style={{ fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#f0f0f0", borderRadius: 10, padding: 14, fontSize: 12, color: "#666", lineHeight: 1.8 }}>
              ⚠️ 会場周辺は混雑が予想されます。できるだけ電車でのご来場をお願いします。
            </div>
          </div>
        )}

        {activeTab === "ルール" && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, letterSpacing: 1 }}>📋 参加ルール・マナー</div>
            {[
              { title: "📋 受付・身分証明書について", items: ["**受付時に身分証明書の確認**を行っています。あらかじめご了承ください", "参加中はリストバンドと身分証明書を必ず携帯してください", "スタッフからお声がけがあった際には、すぐにご提示ください"], warning: true },
              { title: "🎭 イベントコンセプト・マナー", items: ["当イベントは「コスプレを楽しむ」をコンセプトに、初心者から上級者まで安心して参加できる場を目指しています", "SNS上での誹謗中傷・他者のクオリティに関する否定的な発言は固くお断りします"], warning: false },
              { title: "🎥 公式撮影について", items: ["公式カメラマンによる動画撮影を予定しています", "撮影をご希望されない場合はスタッフまでお声がけください"], warning: false },
              { title: "🦁 大型コスプレ・キグルミ・ドールについて", items: ["更衣後に簡単な視界チェックを行います（アテンドがいる場合を除く）", "安全面で危険と判断した場合は**参加をお断りする場合があります**", "マスク・ヘッドは1分以内に脱着できる仕様であることをご確認ください"], warning: true },
              { title: "👘 仮装・羽織ものについて", items: ["仮装（羽織もの・帽子など）であっても、事務局の判断によりコスプレと認定する場合があります", "その際はコスプレ参加チケットのご購入をお願いします", "当日はスタッフよりお声がけする場合がありますのでご了承ください"], warning: false },
              { title: "⚔️ 長物・衣装小物について", items: ["1m以上の衣装小物を持って移動する際は**必ず袋やケースに入れてください**", "撮影可能スポットであっても、安全面を考慮しお控えいただく場合があります", "その際はスタッフの指示に従ってください"], warning: true },
              { title: "📸 撮影マナー", items: ["撮影前に必ず相手の同意を得てください", "一般市民・観光客への配慮を忘れずに", "私有地・立入禁止区域には入らないこと"], warning: false },
              { title: "🚃 流鉄乗車ルール", items: ["乗車可能区間：流山駅〜馬橋駅", "降車は流山駅・馬橋駅のみ", "改札外に出られるのは流山駅のみ", "コスプレ乗車時間：11:00〜16:00", "駅ホームでの撮影は運行・一般利用客の妨げにならないよう注意", "車内での大声・迷惑行為は禁止"], warning: false },
              { title: "🚫 禁止行為", items: ["更衣室以外での着替えやメイク", "屋内でのスプレー類の使用", "コスプレをしたままの来退場", "現行の国家機関衣装の着用", "下着に間違われやすい衣装", "会場内でのウィッグカット", "実際に音を出す行為", "スピーカー等による過度な音出し", "着ぐるみ・大型衣装での1人移動（アテンド同行必須、アテンド1人につき2体まで）", "他の方に怪我をさせる危険のある物や、周囲を汚す・破損させる恐れのある物の持ち込み"], warning: true },
              { title: "📱 SNS投稿について", items: ["公式ハッシュタグ：#流山本町 #レイヤーズジャック をつけて投稿しよう", "他の参加者を映した写真は同意を得てから投稿", "イベント公式の動画撮影にご協力ください"], warning: false },
              { title: "⚠️ 全般的な注意", items: ["ゴミは必ず持ち帰るか指定の場所へ", "スタッフの指示に従ってください", "体調不良の場合はスタッフへ申し出てください"], warning: false },
            ].map(section => (
              <div key={section.title} style={{ background: "#fff", border: `1px solid ${section.warning ? "#c00" : "#ddd"}`, borderRadius: 10, padding: 16, marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: section.warning ? "#c00" : "#111" }}>{section.title}</div>
                {section.items.map((item, i) => (
                  <div key={i} style={{ fontSize: 13, color: section.warning ? "#c00" : "#444", padding: "6px 0", borderBottom: i < section.items.length - 1 ? "1px solid #f0f0f0" : "none", lineHeight: 1.6 }}>
                    ・{item.split(/\*\*(.*?)\*\*/).map((part, j) =>
                      j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

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
            <a href="mailto:layersjack.convention@gmail.com" style={{ display: "block", textAlign: "center", background: "#111", color: "#fff", borderRadius: 10, padding: "14px 0", fontSize: 13, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 80 }}>📧 お問い合わせはこちら</a>
          </div>
        )}

      </div>

      <a href="https://livepocket.jp/e/ip399" target="_blank" rel="noreferrer" style={{
        position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
        background: "#111", color: "#fff", border: "2px solid #fff", borderRadius: 30,
        padding: "14px 32px", fontSize: 15, fontWeight: 700, textDecoration: "none",
        letterSpacing: 1, boxShadow: "0 4px 16px rgba(0,0,0,0.25)", zIndex: 300, whiteSpace: "nowrap",
      }}>🎟 チケット購入はこちら</a>

    </div>
  );
}