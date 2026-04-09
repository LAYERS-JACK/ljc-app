import { useState } from "react";

const spots = [
  {
    id: 1,
    name: "流山陣屋跡",
    icon: "🏯",
    tag: "撮影スポット",
    note: "室内撮影も可能になりました。",
    detail: "近藤勇ゆかりの歴史的スポット。屋外・室内ともに撮影OK。",
  },
  {
    id: 2,
    name: "浅間神社",
    icon: "⛩️",
    tag: "撮影スポット",
    note: "撮影可能。トイレもお借りできます。",
    detail: "境内での撮影が可能です。トイレ利用もOK。参拝者への配慮をお願いします。",
  },
  {
    id: 3,
    name: "流山駅（流鉄流山線）",
    icon: "🚃",
    tag: "撮影・乗車",
    note: "乗車・撮影可能。利用者の邪魔にならない配慮でお願いします。",
    detail: "コスプレでの電車乗車が可能です。一般利用者への配慮を必ずお守りください。",
  },
  {
    id: 4,
    name: "丁字屋",
    icon: "🏠",
    tag: "協賛店",
    note: "改装中のため、店前撮影のみ可能です。",
    detail: "店舗前でのフォトスポットとしてご利用ください。",
  },
  {
    id: 5,
    name: "万華鏡ミュージアム",
    icon: "🔮",
    tag: "撮影スポット",
    note: "狭いため、建物前のみでの撮影が良いと思います。",
    detail: "建物外観が撮影スポットです。館内は一般見学者への配慮をお願いします。",
  },
  {
    id: 6,
    name: "流山みりんミュージアム",
    icon: "🍶",
    tag: "撮影スポット",
    note: "施設内でも撮影可能です。",
    detail: "施設内部での撮影もOK。スタッフの案内に従ってください。",
  },
  {
    id: 7,
    name: "江戸川土手",
    icon: "🌊",
    tag: "撮影スポット",
    note: "全域で撮影可能です。",
    detail: "広大な土手エリアを自由に使えます。自然光を活かした撮影に最適。",
  },
];

const tabs = ["TOP", "スポット", "更衣室", "ルール"];

const tagColor = (tag) => {
  if (tag === "協賛店") return "#555";
  if (tag === "撮影・乗車") return "#222";
  return "#333";
};

export default function App() {
  const [activeTab, setActiveTab] = useState("TOP");
  const [openSpot, setOpenSpot] = useState(null);

  return (
    <div style={{
      fontFamily: "'Helvetica Neue', sans-serif",
      background: "#f5f5f5",
      minHeight: "100vh",
      maxWidth: 480,
      margin: "0 auto",
      color: "#111",
    }}>
      <div style={{
        background: "#111",
        color: "#fff",
        padding: "24px 20px 16px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: "#aaa", marginBottom: 4 }}>COSPLAY EVENT</div>
        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 1 }}>LAYERS JACK</div>
        <div style={{ fontSize: 13, letterSpacing: 2, color: "#ccc" }}>CONVENTION</div>
      </div>

      <div style={{
        display: "flex",
        background: "#fff",
        borderBottom: "2px solid #111",
        position: "sticky",
        top: 88,
        zIndex: 99,
      }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            flex: 1,
            padding: "12px 0",
            border: "none",
            borderBottom: activeTab === t ? "3px solid #111" : "3px solid transparent",
            background: "transparent",
            fontWeight: activeTab === t ? 700 : 400,
            fontSize: 12,
            color: activeTab === t ? "#111" : "#999",
            cursor: "pointer",
            letterSpacing: 1,
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "20px 16px", paddingBottom: 40 }}>

        {activeTab === "TOP" && (
          <div>
            <div style={{
              background: "#111",
              color: "#fff",
              borderRadius: 12,
              padding: "32px 24px",
              marginBottom: 20,
              textAlign: "center",
            }}>
              <img
                src="/ljc_vo1.jpeg"
                alt="LAYERS JACK CONVENTION"
                style={{ width: "100%", borderRadius: 8, marginBottom: 12 }}
              />
              <div style={{ marginTop: 20, padding: "10px 0", borderTop: "1px solid #333" }}>
                <div style={{ fontSize: 12, color: "#bbb", marginBottom: 4 }}>📍 千葉県流山市 流山本町エリア</div>
                <div style={{ fontSize: 12, color: "#bbb" }}>🎟 参加費：3,000〜4,000円</div>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, letterSpacing: 1 }}>📌 イベント概要</div>
              {[
                ["主催", "レイヤーズ ジャック コンベンション実行委員会"],
                ["協賛", "流山市"],
                ["エリア", "流山本町周辺"],
                ["参加人数", "50〜100名"],
                ["更衣室", "流山市生涯学習センター"],
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid #e0e0e0",
                  fontSize: 13,
                }}>
                  <span style={{ color: "#888" }}>{k}</span>
                  <span style={{ fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 16,
              fontSize: 12,
              color: "#555",
              lineHeight: 1.8,
            }}>
              💡 流山市の歴史ある街並みを舞台にしたコスプレイベントです。近藤勇ゆかりの地や流鉄流山線など、唯一無二のロケーションをお楽しみください。
            </div>
          </div>
        )}

        {activeTab === "スポット" && (
          <div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>撮影スポット・協賛店一覧</div>
            {spots.map(spot => (
              <div key={spot.id}>
                <div
                  onClick={() => setOpenSpot(openSpot === spot.id ? null : spot.id)}
                  style={{
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: 10,
                    padding: "14px 16px",
                    marginBottom: 8,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 24 }}>{spot.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{spot.name}</div>
                      <span style={{
                        fontSize: 10,
                        background: tagColor(spot.tag),
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: 20,
                        letterSpacing: 1,
                      }}>{spot.tag}</span>
                    </div>
                  </div>
                  <span style={{ color: "#aaa", fontSize: 18 }}>{openSpot === spot.id ? "▲" : "▼"}</span>
                </div>
                {openSpot === spot.id && (
                  <div style={{
                    background: "#f9f9f9",
                    border: "1px solid #ddd",
                    borderTop: "none",
                    borderRadius: "0 0 10px 10px",
                    padding: "12px 16px",
                    marginTop: -8,
                    marginBottom: 8,
                    fontSize: 13,
                    lineHeight: 1.8,
                    color: "#333",
                  }}>
                    <div style={{ marginBottom: 6 }}>{spot.detail}</div>
                    <div style={{
                      background: "#111",
                      color: "#fff",
                      borderRadius: 6,
                      padding: "8px 12px",
                      fontSize: 12,
                    }}>📢 {spot.note}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "更衣室" && (
          <div>
            <div style={{
              background: "#111",
              color: "#fff",
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
              textAlign: "center",
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>👘</div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>流山市生涯学習センター</div>
              <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>公式更衣室</div>
            </div>

            {[
              ["📍 住所", "千葉県流山市（詳細は確定次第更新）"],
              ["🕐 利用時間", "イベント当日のみ（時間は追って告知）"],
              ["💼 荷物", "貴重品の管理は各自でお願いします"],
              ["🚻 設備", "男女別更衣スペース設置予定"],
            ].map(([k, v]) => (
              <div key={k} style={{
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: 10,
                padding: "14px 16px",
                marginBottom: 8,
                fontSize: 13,
              }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{k}</div>
                <div style={{ color: "#555" }}>{v}</div>
              </div>
            ))}

            <div style={{
              background: "#f0f0f0",
              borderRadius: 10,
              padding: 14,
              fontSize: 12,
              color: "#666",
              lineHeight: 1.8,
              marginTop: 8,
            }}>
              ⚠️ 更衣室は参加者のみ利用可能です。混雑状況によりお待ちいただく場合があります。
            </div>
          </div>
        )}

        {activeTab === "ルール" && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, letterSpacing: 1 }}>📋 参加ルール・マナー</div>

            {[
              {
                title: "📸 撮影マナー",
                items: [
                  "撮影前に必ず相手の同意を得てください",
                  "一般市民・観光客への配慮を忘れずに",
                  "私有地・立入禁止区域には入らないこと",
                ],
                warning: false,
              },
              {
                title: "🚃 流鉄乗車ルール",
                items: [
                  "一般利用者の妨げにならないよう配慮する",
                  "車内での大声・迷惑行為は禁止",
                  "乗車マナーを守り楽しく利用してください",
                ],
                warning: false,
              },
              {
                title: "👘 衣装・更衣について",
                items: [
                  "更衣は男女それぞれのイベント専用更衣室内にて行ってください",
                  "イベント専用更衣室以外での更衣が発覚した場合は、退場していただきます",
                  "緊急非常時は異性スタッフが更衣室に立ち入ることがあります",
                  "一般の方が不愉快な思いをする衣装と判断した場合は、更衣室にて着替えていただきます",
                  "武器や小道具は長さや形状に関わらず、撮影時以外には袋等に入れて移動・保管してください",
                ],
                warning: false,
              },
              {
                title: "🚫 禁止行為",
                items: [
                  "更衣室以外での着替えやメイク",
                  "屋内でのスプレー類の使用",
                  "コスプレをしたままの来退場",
                  "現行の国家機関衣装の着用",
                  "下着に間違われやすい衣装",
                  "会場内でのウィッグカット",
                  "実際に音を出す行為",
                  "スピーカー等による過度な音出し",
                  "着ぐるみ・大型衣装での1人移動（アテンド同行必須、アテンド1人につき2体まで）",
                  "他の方に怪我をさせる危険のある物や、周囲を汚す・破損させる恐れのある物の持ち込み",
                ],
                warning: true,
              },
              {
                title: "📱 SNS投稿について",
                items: [
                  "公式ハッシュタグを使って投稿しよう（追って告知）",
                  "他の参加者を映した写真は同意を得てから投稿",
                  "イベント公式の動画撮影にご協力ください",
                ],
                warning: false,
              },
              {
                title: "⚠️ 全般的な注意",
                items: [
                  "ゴミは必ず持ち帰るか指定の場所へ",
                  "スタッフの指示に従ってください",
                  "体調不良の場合はスタッフへ申し出てください",
                ],
                warning: false,
              },
            ].map(section => (
              <div key={section.title} style={{
                background: "#fff",
                border: `1px solid ${section.warning ? "#c00" : "#ddd"}`,
                borderRadius: 10,
                padding: 16,
                marginBottom: 12,
              }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: section.warning ? "#c00" : "#111" }}>{section.title}</div>
                {section.items.map((item, i) => (
                  <div key={i} style={{
                    fontSize: 13,
                    color: section.warning ? "#c00" : "#444",
                    padding: "6px 0",
                    borderBottom: i < section.items.length - 1 ? "1px solid #f0f0f0" : "none",
                    lineHeight: 1.6,
                  }}>
                    ・{item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}