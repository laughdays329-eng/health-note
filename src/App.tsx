import { useState, useRef, useEffect } from "react";

const FOOD_DB = [
  { name: "白米（茶碗1杯）", cal: 252, protein: 4.2, fat: 0.5, carbs: 55.7, fiber: 0.5 },
  { name: "十穀米おにぎり 120g", cal: 198, protein: 4.0, fat: 1.2, carbs: 42.0, fiber: 2.2 },
  { name: "Zavas ソイプロテイン ココア（1杯）", cal: 116, protein: 20.0, fat: 2.0, carbs: 6.8, fiber: 0.8 },
  { name: "バナナ（1本）", cal: 86, protein: 1.1, fat: 0.2, carbs: 22.5, fiber: 1.1 },
  { name: "食パン（6枚切り1枚）", cal: 158, protein: 5.6, fat: 2.5, carbs: 28.0, fiber: 1.4 },
  { name: "卵（1個）", cal: 76, protein: 6.2, fat: 5.2, carbs: 0.1, fiber: 0 },
  { name: "鶏むね肉（100g）", cal: 108, protein: 22.3, fat: 1.5, carbs: 0, fiber: 0 },
  { name: "鶏もも肉（100g）", cal: 190, protein: 17.3, fat: 14.2, carbs: 0, fiber: 0 },
  { name: "豚ロース（100g）", cal: 263, protein: 19.3, fat: 19.2, carbs: 0.2, fiber: 0 },
  { name: "牛もも肉（100g）", cal: 193, protein: 21.3, fat: 10.7, carbs: 0.4, fiber: 0 },
  { name: "サーモン（100g）", cal: 204, protein: 20.1, fat: 12.8, carbs: 0.1, fiber: 0 },
  { name: "マグロ赤身（100g）", cal: 115, protein: 26.4, fat: 1.4, carbs: 0.1, fiber: 0 },
  { name: "豆腐（1丁300g）", cal: 168, protein: 19.8, fat: 10.8, carbs: 3.6, fiber: 1.2 },
  { name: "納豆（1パック45g）", cal: 90, protein: 7.4, fat: 4.5, carbs: 5.4, fiber: 3.4 },
  { name: "牛乳（200ml）", cal: 122, protein: 6.6, fat: 7.6, carbs: 9.6, fiber: 0 },
  { name: "ヨーグルト無糖（100g）", cal: 56, protein: 3.6, fat: 3.0, carbs: 3.9, fiber: 0 },
  { name: "ブロッコリー（100g）", cal: 33, protein: 4.3, fat: 0.5, carbs: 5.2, fiber: 4.4 },
  { name: "ほうれん草（100g）", cal: 18, protein: 2.2, fat: 0.4, carbs: 3.1, fiber: 2.8 },
  { name: "トマト（1個）", cal: 35, protein: 1.1, fat: 0.2, carbs: 8.0, fiber: 1.3 },
  { name: "キャベツ（100g）", cal: 23, protein: 1.3, fat: 0.2, carbs: 5.2, fiber: 1.8 },
  { name: "おにぎり 鮭（1個）", cal: 178, protein: 4.5, fat: 1.5, carbs: 37.0, fiber: 0.5 },
  { name: "おにぎり ツナマヨ（1個）", cal: 214, protein: 4.2, fat: 5.8, carbs: 36.0, fiber: 0.4 },
  { name: "カップヌードル（1個）", cal: 351, protein: 9.6, fat: 14.7, carbs: 44.5, fiber: 1.1 },
  { name: "ファミチキ（1個）", cal: 245, protein: 13.5, fat: 14.5, carbs: 15.5, fiber: 0.3 },
  { name: "から揚げ（3個）", cal: 270, protein: 18.0, fat: 16.5, carbs: 11.0, fiber: 0.2 },
  { name: "マクドナルド ビッグマック", cal: 525, protein: 27.0, fat: 29.0, carbs: 41.0, fiber: 2.0 },
  { name: "吉野家 牛丼並", cal: 635, protein: 21.0, fat: 20.0, carbs: 89.0, fiber: 1.5 },
  { name: "ざるそば（1人前）", cal: 271, protein: 11.0, fat: 1.3, carbs: 54.0, fiber: 2.5 },
  { name: "ラーメン（醤油・1杯）", cal: 458, protein: 18.0, fat: 12.0, carbs: 67.0, fiber: 2.0 },
  { name: "カレーライス（1皿）", cal: 742, protein: 20.0, fat: 21.5, carbs: 112.0, fiber: 4.5 },
  { name: "チャーハン（1皿）", cal: 620, protein: 15.0, fat: 22.0, carbs: 87.0, fiber: 1.5 },
  { name: "味噌汁（1杯）", cal: 27, protein: 2.1, fat: 0.9, carbs: 3.2, fiber: 0.8 },
  { name: "プロテイン（1杯・水割り）", cal: 110, protein: 21.0, fat: 1.5, carbs: 5.0, fiber: 0.5 },
  { name: "ゆでたまご（1個）", cal: 76, protein: 6.5, fat: 5.1, carbs: 0.2, fiber: 0 },
  { name: "サラダ（コンビニ）", cal: 58, protein: 2.5, fat: 2.0, carbs: 7.5, fiber: 2.8 },
];

const ALCOHOL_DB = [
  { name: "ビール（350ml缶）", cal: 140, alcohol: 14, unit: "缶" },
  { name: "ビール（500ml缶）", cal: 200, alcohol: 20, unit: "缶" },
  { name: "ハイボール（350ml缶）", cal: 98, alcohol: 14, unit: "缶" },
  { name: "チューハイ 5%（350ml）", cal: 154, alcohol: 17, unit: "缶" },
  { name: "チューハイ 9%（350ml）", cal: 214, alcohol: 28, unit: "缶" },
  { name: "日本酒（1合180ml）", cal: 196, alcohol: 29, unit: "合" },
  { name: "赤ワイン（グラス125ml）", cal: 91, alcohol: 15, unit: "杯" },
  { name: "白ワイン（グラス125ml）", cal: 91, alcohol: 15, unit: "杯" },
  { name: "焼酎（1杯100ml）", cal: 146, alcohol: 20, unit: "杯" },
  { name: "梅酒（1杯100ml）", cal: 156, alcohol: 14, unit: "杯" },
  { name: "シャンパン（グラス）", cal: 84, alcohol: 12, unit: "杯" },
];

const MEAL_TIMES = ["朝食", "昼食", "夕食", "間食"];
const MENTAL_OPTIONS = [
  { label: "絶好調！", emoji: "🌟", color: "#ff4d79", score: 3 },
  { label: "ふつう", emoji: "😊", color: "#ff85a1", score: 2 },
  { label: "落ちてる", emoji: "🌧️", color: "#8ba7c7", score: 1 },
];
const CONDITION_OPTIONS = [
  { label: "絶好調", emoji: "💪", color: "#ff4d79", score: 5 },
  { label: "元気", emoji: "😊", color: "#ff85a1", score: 4 },
  { label: "普通", emoji: "😐", color: "#aaa", score: 3 },
  { label: "疲れ気味", emoji: "😴", color: "#b0a0c8", score: 2 },
  { label: "不調", emoji: "🤒", color: "#8ba7c7", score: 1 },
];
const TABS = [
  { id: "気分", icon: "😊" },
  { id: "食事", icon: "🍽️" },
  { id: "記録", icon: "⚖️" },
  { id: "生理", icon: "🌸" },
  { id: "健診", icon: "🏥" },
  { id: "AI", icon: "💬" },
];

function today() { return new Date().toLocaleDateString("ja-JP"); }
function nowTime() { return new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }); }
function toDateStr(d: Date) { return d.toISOString().split("T")[0]; }
function getWeekKey(d: string) { const dt = new Date(d); dt.setDate(dt.getDate() - dt.getDay()); return dt.toISOString().split("T")[0]; }
function getMonthKey(d: string) { return d.slice(0, 7); }
function getYearKey(d: string) { return d.slice(0, 4); }

function useLS<T>(key: string, init: T) {
  const [val, setVal] = useState<T>(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; } catch { return init; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }, [key, val]);
  return [val, setVal] as const;
}

function getGreeting(name: string) {
  const h = new Date().getHours();
  const n = name || "あなた";
  const messages: Record<string, string[]> = {
    deepNight: [`${n}さん、こんな時間まで起きてるんですね。今夜は自分を労わる時間にしませんか？`, `夜更かし中の${n}さんへ。無理しないでね。あなたのペースが一番大事です。`],
    morning: [`おはよう、${n}さん。今日も自分を褒めて褒めて、輝きましょう！`, `${n}さん、おはようございます。今日という一日、あなたらしく過ごしてね。`, `朝の${n}さんへ。今日も丁寧に自分を大切にしてください✨`],
    noon: [`${n}さん、お昼はちゃんと食べましたか？自分への投資を忘れずに。`, `こんにちは、${n}さん。今日の午前中、よく頑張りました。午後もマイペースで。`],
    afternoon: [`${n}さん、午後もお疲れ様です。ちょっと一息、ついてもいいんですよ。`, `がんばってる${n}さんへ。たまには立ち止まって深呼吸してみて。`],
    evening: [`お疲れ様、${n}さん。今は仕事を忘れて自由にリラックスして。`, `${n}さん、今日も一日よく生きました。夜は自分へのご褒美タイムです。`],
    night: [`${n}さん、そろそろゆっくり休む準備を。明日の自分への最高のプレゼントは睡眠です。`, `おやすみ前の${n}さんへ。今日も存在してくれてありがとう。ゆっくり休んでね。`],
  };
  let pool: string[];
  if (h <= 4) pool = messages.deepNight;
  else if (h <= 10) pool = messages.morning;
  else if (h <= 13) pool = messages.noon;
  else if (h <= 17) pool = messages.afternoon;
  else if (h <= 21) pool = messages.evening;
  else pool = messages.night;
  return pool[new Date().getDate() % pool.length];
}

function getFeedback(weights: any[], mealLogs: any, userName: string, moodLogs: any[]) {
  const n = userName || "あなた";
  const messages: any[] = [];
  if (weights.length >= 2) {
    const diff = (weights[0].weight - weights[1].weight).toFixed(1);
    if (Number(diff) < 0) messages.push({ emoji: "⚖️", text: `昨日より${Math.abs(Number(diff))}kg減ってるよ！${n}さんの努力の結果が出てきた🌟`, type: "praise" });
    else if (Number(diff) > 1) messages.push({ emoji: "⚖️", text: `少し増えたけど気にしすぎないで。体重は毎日変動するもの。${n}さんのペースで大丈夫💕`, type: "encourage" });
    else if (diff === "0.0") messages.push({ emoji: "⚖️", text: `体重が安定してるね！${n}さんの生活リズムが整ってきてる証拠かも✨`, type: "praise" });
  }
  if (weights.length >= 3) {
    const t = new Date();
    const isConsec = weights.slice(0, 3).every((w, i) => (t.getTime() - new Date(w.date).getTime()) / 86400000 <= i + 2);
    if (isConsec) messages.push({ emoji: "📅", text: `3日連続で体重を記録してる${n}さん、その継続力がすごい！習慣になってきてるね🎉`, type: "praise" });
  }
  const recentDates = Object.keys(mealLogs).sort().reverse().slice(0, 3);
  if (recentDates.length >= 3) messages.push({ emoji: "🍽️", text: `この3日間の${n}さんの食事への意識、本当に素晴らしいよ！`, type: "praise" });
  const todayKey = toDateStr(new Date());
  const tm = mealLogs[todayKey];
  if (tm) {
    const all = Object.values(tm).flat() as any[];
    const covered = MEAL_TIMES.filter(mt => (tm[mt] || []).length > 0).length;
    const tp = all.reduce((s: number, f: any) => s + (Number(f.protein) || 0), 0);
    const tc = all.reduce((s: number, f: any) => s + (Number(f.cal) || 0), 0);
    if (covered >= 3) messages.push({ emoji: "✅", text: `今日は朝・昼・夜ちゃんと食べてるね！${n}さんの体が喜んでるよ😊`, type: "praise" });
    if (tp >= 50) messages.push({ emoji: "🥩", text: `今日のタンパク質${tp.toFixed(0)}g！${n}さんの筋肉と肌がありがとうって言ってるよ💪`, type: "praise" });
    if (tc > 0 && tc < 800) messages.push({ emoji: "⚡", text: `今日のカロリーがちょっと少なめかも。しっかり食べることも大切な自分への投資だよ🌿`, type: "encourage" });
  }
  if (moodLogs.length >= 2) {
    const good = ["絶好調！", "絶好調", "元気"], bad = ["落ちてる", "不調", "疲れ気味"];
    if (bad.includes(moodLogs[1].mental) && good.includes(moodLogs[0].mental)) messages.push({ emoji: "🌈", text: `前回より気分が上がってるね！${n}さんの回復力、すごいよ🌟`, type: "praise" });
    if (bad.includes(moodLogs[0].condition)) messages.push({ emoji: "💊", text: `体調が優れないみたいだね。${n}さん、今日は特に自分を甘やかす日にしていいよ🛋️`, type: "encourage" });
  }
  if (moodLogs.length >= 3) messages.push({ emoji: "📖", text: `${n}さんが気分を記録し続けてること、自己理解がどんどん深まってる証拠だよ✨`, type: "praise" });
  if (!weights.length && !Object.keys(mealLogs).length && !moodLogs.length) messages.push({ emoji: "🌱", text: `${n}さん、記録を始めると自分の変化に気づけるようになるよ。最初の一歩を踏み出してみて！`, type: "encourage" });
  return messages.sort(() => Math.random() - 0.5).slice(0, 2);
}

async function analyzeFood(base64Image: string) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: [{ type: "image", source: { type: "base64", media_type: "image/jpeg", data: base64Image } }, { type: "text", text: '食事写真を分析。JSONのみ: {"name":"料理名","cal":数字,"protein":数字,"fat":数字,"carbs":数字,"fiber":数字,"advice":"一言"}' }] }] }) });
    const d = await res.json();
    return JSON.parse(d.content[0].text.replace(/```json|```/g, "").trim());
  } catch { return { name: "食事", cal: 0, protein: 0, fat: 0, carbs: 0, fiber: 0, advice: "分析できませんでした" }; }
}

async function analyzeNutritionLabel(base64Image: string) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 500, messages: [{ role: "user", content: [{ type: "image", source: { type: "base64", media_type: "image/jpeg", data: base64Image } }, { type: "text", text: '栄養成分表示ラベルを読み取り。JSONのみ: {"name":"商品名","cal":数字,"protein":数字,"fat":数字,"carbs":数字,"fiber":数字,"advice":"一言"}' }] }] }) });
    const d = await res.json();
    return JSON.parse(d.content[0].text.replace(/```json|```/g, "").trim());
  } catch { return { name: "食品", cal: 0, protein: 0, fat: 0, carbs: 0, fiber: 0, advice: "読み取れませんでした" }; }
}

async function getAdvice(summary: any) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 300, messages: [{ role: "user", content: `今日の健康データ: ${JSON.stringify(summary)}。優しく具体的な健康アドバイスを2〜3文で。` }] }) });
    const d = await res.json();
    return d.content[0].text;
  } catch { return "記録を増やすとアドバイスが届きます💕"; }
}

async function analyzeCheckupImage(base64Image: string) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 2000, messages: [{ role: "user", content: [{ type: "image", source: { type: "base64", media_type: "image/jpeg", data: base64Image } }, { type: "text", text: '健康診断結果を読み取りJSONのみ: {"date":"","height":"","weight":"","bmi":"","sbp":"","dbp":"","ast":"","alt":"","gtp":"","alp":"","uricAcid":"","totalCholesterol":"","hdl":"","ldl":"","triglyceride":"","nonHdl":"","glucose":"","hba1c":"","creatinine":"","egfr":"","rbc":"","hematocrit":"","hemoglobin":"","mcv":"","mch":"","mchc":"","wbc":"","platelet":""}' }] }] }) });
    const d = await res.json();
    return JSON.parse(d.content[0].text.replace(/```json|```/g, "").trim());
  } catch { return null; }
}

function toBase64(file: File): Promise<string> {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result as string); r.onerror = rej; r.readAsDataURL(file); });
}

function LineChart({ weights, goal }: { weights: any[], goal: number | null }) {
  const last7 = [...weights].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(-7);
  if (!last7.length) return <div style={{ textAlign: "center", color: "#dbb", padding: 20, fontSize: 13 }}>体重を記録するとグラフが表示されます</div>;
  const allVals = [...last7.map((w: any) => w.weight), goal].filter(Boolean) as number[];
  const min = Math.floor(Math.min(...allVals) - 1), max = Math.ceil(Math.max(...allVals) + 1);
  const W = 340, H = 160, pL = 36, pR = 10, pT = 10, pB = 28, cW = W - pL - pR, cH = H - pT - pB;
  const xP = (i: number) => pL + (i / Math.max(last7.length - 1, 1)) * cW;
  const yP = (v: number) => pT + cH - ((v - min) / (max - min)) * cH;
  const pts = last7.map((w: any, i: number) => `${xP(i)},${yP(w.weight)}`).join(" ");
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
      {[0, .25, .5, .75, 1].map(t => { const y = pT + t * cH; return (<g key={t}><line x1={pL} y1={y} x2={W - pR} y2={y} stroke="#f0e0e8" strokeWidth="1" /><text x={pL - 4} y={y + 4} textAnchor="end" fontSize="9" fill="#bbb">{(max - (max - min) * t).toFixed(1)}</text></g>); })}
      {goal && <line x1={pL} y1={yP(goal)} x2={W - pR} y2={yP(goal)} stroke="#ffb3c6" strokeWidth="1.5" strokeDasharray="4,3" />}
      {goal && <text x={W - pR} y={yP(goal) - 3} textAnchor="end" fontSize="9" fill="#ff85a1">目標</text>}
      <polyline points={pts} fill="none" stroke="#ff4d79" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {last7.map((w: any, i: number) => (<g key={i}><circle cx={xP(i)} cy={yP(w.weight)} r="4" fill="#fff" stroke="#ff4d79" strokeWidth="2" /><text x={xP(i)} y={yP(w.weight) - 8} textAnchor="middle" fontSize="9" fill="#ff4d79">{w.weight}</text></g>))}
      {last7.map((w: any, i: number) => (<text key={i} x={xP(i)} y={H - 4} textAnchor="middle" fontSize="8" fill="#bbb">{w.date.slice(5)}</text>))}
    </svg>
  );
}

function MoodAnalysis({ moodLogs }: { moodLogs: any[] }) {
  if (moodLogs.length === 0) return <div style={{ textAlign: "center", color: "#dbb", padding: 20, fontSize: 13 }}>気分を記録すると分析が表示されます😊</div>;
  const last14 = [...moodLogs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(-14);
  const mentalCount: { [k: string]: number } = {};
  const condCount: { [k: string]: number } = {};
  last14.forEach(l => {
    if (l.mental) { mentalCount[l.mental] = (mentalCount[l.mental] || 0) + 1; }
    if (l.condition) { condCount[l.condition] = (condCount[l.condition] || 0) + 1; }
  });
  const avgMental = last14.reduce((s, l) => { const m = MENTAL_OPTIONS.find(o => o.label === l.mental); return s + (m?.score || 0); }, 0) / last14.length;
  const avgCond = last14.reduce((s, l) => { const c = CONDITION_OPTIONS.find(o => o.label === l.condition); return s + (c?.score || 0); }, 0) / last14.length;
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <div style={{ flex: 1, background: "linear-gradient(135deg,#fff0f4,#ffe8f0)", borderRadius: 16, padding: 14, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "#ff85a1", marginBottom: 4 }}>メンタル平均</div>
          <div style={{ fontSize: 28, fontWeight: "bold", color: "#ff4d79" }}>{avgMental.toFixed(1)}<span style={{ fontSize: 12, color: "#ffb3c6" }}>/3</span></div>
          <div style={{ fontSize: 18, marginTop: 4 }}>{avgMental >= 2.5 ? "🌟" : avgMental >= 1.5 ? "😊" : "🌧️"}</div>
        </div>
        <div style={{ flex: 1, background: "linear-gradient(135deg,#f0f8ff,#e8f4ff)", borderRadius: 16, padding: 14, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "#60a5fa", marginBottom: 4 }}>体調平均</div>
          <div style={{ fontSize: 28, fontWeight: "bold", color: "#3b82f6" }}>{avgCond.toFixed(1)}<span style={{ fontSize: 12, color: "#93c5fd" }}>/5</span></div>
          <div style={{ fontSize: 18, marginTop: 4 }}>{avgCond >= 4 ? "💪" : avgCond >= 3 ? "😊" : avgCond >= 2 ? "😴" : "🤒"}</div>
        </div>
        <div style={{ flex: 1, background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", borderRadius: 16, padding: 14, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "#34d399", marginBottom: 4 }}>記録日数</div>
          <div style={{ fontSize: 28, fontWeight: "bold", color: "#10b981" }}>{last14.length}<span style={{ fontSize: 12, color: "#6ee7b7" }}>日</span></div>
          <div style={{ fontSize: 18, marginTop: 4 }}>📅</div>
        </div>
      </div>
      <div style={{ background: "#fff", borderRadius: 16, padding: 14, marginBottom: 10 }}>
        <div style={{ fontWeight: "bold", color: "#ff4d79", fontSize: 13, marginBottom: 10 }}>🧠 メンタル推移（直近14日）</div>
        <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 60 }}>
          {last14.map((l, i) => { const m = MENTAL_OPTIONS.find(o => o.label === l.mental); const h = m ? ((m.score / 3) * 50) : 0; return (<div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}><div style={{ width: "100%", height: `${h}px`, background: m?.color || "#eee", borderRadius: "4px 4px 0 0", minHeight: 4 }} /><div style={{ fontSize: 8, color: "#ccc", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>{l.date.slice(5)}</div></div>); })}
        </div>
      </div>
      <div style={{ background: "#fff", borderRadius: 16, padding: 14, marginBottom: 10 }}>
        <div style={{ fontWeight: "bold", color: "#3b82f6", fontSize: 13, marginBottom: 10 }}>💪 体調推移（直近14日）</div>
        <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 60 }}>
          {last14.map((l, i) => { const c = CONDITION_OPTIONS.find(o => o.label === l.condition); const h = c ? ((c.score / 5) * 50) : 0; return (<div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}><div style={{ width: "100%", height: `${h}px`, background: c?.color || "#eee", borderRadius: "4px 4px 0 0", minHeight: 4 }} /><div style={{ fontSize: 8, color: "#ccc", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>{l.date.slice(5)}</div></div>); })}
        </div>
      </div>
      <div style={{ background: "#fff", borderRadius: 16, padding: 14, marginBottom: 10 }}>
        <div style={{ fontWeight: "bold", color: "#ff4d79", fontSize: 13, marginBottom: 10 }}>📊 気分の内訳</div>
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          {MENTAL_OPTIONS.map(m => { const cnt = mentalCount[m.label] || 0; const pct = last14.length > 0 ? Math.round((cnt / last14.length) * 100) : 0; return (<div key={m.label} style={{ flex: 1, textAlign: "center" }}><div style={{ fontSize: 20, marginBottom: 4 }}>{m.emoji}</div><div style={{ height: 6, background: "#f0f0f0", borderRadius: 3, marginBottom: 4, overflow: "hidden" }}><div style={{ height: "100%", width: `${pct}%`, background: m.color, borderRadius: 3 }} /></div><div style={{ fontSize: 11, color: m.color, fontWeight: "bold" }}>{pct}%</div><div style={{ fontSize: 10, color: "#bbb" }}>{m.label}</div></div>); })}
        </div>
      </div>
      <div style={{ background: "#fff", borderRadius: 16, padding: 14 }}>
        <div style={{ fontWeight: "bold", color: "#ff4d79", fontSize: 13, marginBottom: 8 }}>📝 最近の記録</div>
        {[...moodLogs].slice(0, 5).map((l, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #fff0f4" }}>
            <span style={{ fontSize: 11, color: "#bbb", width: 80 }}>{l.date} {l.time}</span>
            <div style={{ display: "flex", gap: 6, flex: 1, justifyContent: "center" }}>
              {l.mental && <span style={{ fontSize: 11, background: "#fff0f4", color: "#ff4d79", borderRadius: 6, padding: "2px 8px" }}>{MENTAL_OPTIONS.find(m => m.label === l.mental)?.emoji} {l.mental}</span>}
              {l.condition && <span style={{ fontSize: 11, background: "#f0f8ff", color: "#3b82f6", borderRadius: 6, padding: "2px 8px" }}>{CONDITION_OPTIONS.find(c => c.label === l.condition)?.emoji} {l.condition}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const INITIAL_CHECKUP = null; 

export default function App() {
  const [tab, setTab] = useLS("hn_tab", "気分");
  const [appTitle, setAppTitle] = useLS("hn_title", "私の健康ノート");
  const [editingTitle, setEditingTitle] = useState(false);
  const [userName, setUserName] = useLS("hn_userName", "");
  const [editingName, setEditingName] = useState(false);

  const [moodLogs, setMoodLogs] = useLS<any[]>("hn_moodLogs", []);
  const [todayMental, setTodayMental] = useState("");
  const [todayCondition, setTodayCondition] = useState("");
  const [moodMemo, setMoodMemo] = useState("");
  const [showMoodAnalysis, setShowMoodAnalysis] = useState(false);

  const [mealDate, setMealDate] = useState(toDateStr(new Date()));
  const [mealLogs, setMealLogs] = useLS<any>("hn_mealLogs", {});
  const [goals, setGoals] = useLS("hn_goals", { cal: 1800, protein: 60, fat: 60, carbs: 220, fiber: 18 });
  const [showGoalEdit, setShowGoalEdit] = useState(false);
  const [foodSearch, setFoodSearch] = useState("");
  const [selMealTime, setSelMealTime] = useState("朝食");
  const [manualFood, setManualFood] = useState({ name: "", cal: "", protein: "", fat: "", carbs: "", fiber: "" });
  const [showManual, setShowManual] = useState(false);
  const [servings, setServings] = useState("1");
  const [myList, setMyList] = useLS<any[]>("hn_myList", []);
  const [showMyList, setShowMyList] = useState(false);
  const [myListForm, setMyListForm] = useState({ name: "", cal: "", protein: "", fat: "", carbs: "", fiber: "" });
  const [showMyListForm, setShowMyListForm] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const foodFileRef = useRef<HTMLInputElement>(null);
  const nutritionFileRef = useRef<HTMLInputElement>(null);

  const [showAlcohol, setShowAlcohol] = useState(false);
  const [alcoholLogs, setAlcoholLogs] = useLS<any[]>("hn_alcoholLogs", []);
  const [alcoholSearch, setAlcoholSearch] = useState("");
  const [alcoholServings, setAlcoholServings] = useState("1");
  const [alcoholDate, setAlcoholDate] = useState(toDateStr(new Date()));
  const [alcoholView, setAlcoholView] = useState("week");

  const [weights, setWeights] = useLS<any[]>("hn_weights", []);
  const [weightInput, setWeightInput] = useState({ date: toDateStr(new Date()), weight: "", fat: "", muscle: "", condition: "普通" });
  const [weightGoal, setWeightGoal] = useLS("hn_weightGoal", "");
  const [editingWeight, setEditingWeight] = useState<number | null>(null);

  const [periods, setPeriods] = useLS<any[]>("hn_periods", []);
  const [periodDate, setPeriodDate] = useState("");

  const [checkups, setCheckups] = useLS<any[]>("hn_checkups", [INITIAL_CHECKUP]);
  const [showCheckupForm, setShowCheckupForm] = useState(false);
  const [checkupForm, setCheckupForm] = useState<any>({ date: "", place: "", height: "", weight: "", bmi: "", sbp: "", dbp: "", ast: "", alt: "", gtp: "", alp: "", uricAcid: "", totalCholesterol: "", hdl: "", ldl: "", triglyceride: "", nonHdl: "", glucose: "", hba1c: "", creatinine: "", egfr: "", rbc: "", hematocrit: "", hemoglobin: "", mcv: "", mch: "", mchc: "", wbc: "", platelet: "", recheck: [], memo: "" });
  const [recheckInput, setRecheckInput] = useState({ item: "", timing: "", due: "" });
  const [checkupAnalyzing, setCheckupAnalyzing] = useState(false);
  const checkupFileRef = useRef<HTMLInputElement>(null);
  const [selectedCheckup, setSelectedCheckup] = useLS("hn_selectedCheckup", 0);

  const [advice, setAdvice] = useState("");
  const [advLoading, setAdvLoading] = useState(false);

  const todayMeals = mealLogs[mealDate] || {};
  const allMealsFlat = Object.values(todayMeals).flat() as any[];
  const tot = {
    cal: allMealsFlat.reduce((s, f) => s + (Number(f.cal) || 0), 0),
    protein: allMealsFlat.reduce((s, f) => s + (Number(f.protein) || 0), 0),
    fat: allMealsFlat.reduce((s, f) => s + (Number(f.fat) || 0), 0),
    carbs: allMealsFlat.reduce((s, f) => s + (Number(f.carbs) || 0), 0),
    fiber: allMealsFlat.reduce((s, f) => s + (Number(f.fiber) || 0), 0),
  };

  const addFood = (food: any, qty: number = 1) => {
    const scaled = { ...food, cal: Math.round(food.cal * qty), protein: Math.round(food.protein * qty * 10) / 10, fat: Math.round(food.fat * qty * 10) / 10, carbs: Math.round(food.carbs * qty * 10) / 10, fiber: Math.round(food.fiber * qty * 10) / 10, qty, id: Date.now(), time: nowTime() };
    setMealLogs((prev: any) => { const day = prev[mealDate] || {}; const t = day[selMealTime] || []; return { ...prev, [mealDate]: { ...day, [selMealTime]: [...t, scaled] } }; });
    setFoodSearch(""); setServings("1");
  };
  const removeFood = (mt: string, id: number) => setMealLogs((prev: any) => { const day = prev[mealDate] || {}; return { ...prev, [mealDate]: { ...day, [mt]: (day[mt] || []).filter((f: any) => f.id !== id) } }; });
  const handleFoodPhoto = async (e: any) => { const file = e.target.files[0]; if (!file) return; setAnalyzing(true); const b64 = await toBase64(file); const result = await analyzeFood(b64.split(",")[1]); addFood({ ...result, img: b64 }, 1); setAnalyzing(false); e.target.value = ""; };
  const handleNutritionPhoto = async (e: any) => { const file = e.target.files[0]; if (!file) return; setAnalyzing(true); const b64 = await toBase64(file); const result = await analyzeNutritionLabel(b64.split(",")[1]); addFood({ ...result, img: b64 }, Number(servings) || 1); setAnalyzing(false); e.target.value = ""; };
  const addManual = () => { if (!manualFood.name) return; addFood({ ...manualFood, cal: Number(manualFood.cal) || 0, protein: Number(manualFood.protein) || 0, fat: Number(manualFood.fat) || 0, carbs: Number(manualFood.carbs) || 0, fiber: Number(manualFood.fiber) || 0 }, Number(servings) || 1); setManualFood({ name: "", cal: "", protein: "", fat: "", carbs: "", fiber: "" }); setShowManual(false); };
  const addToMyList = () => { if (!myListForm.name) return; setMyList(l => [...l, { ...myListForm, cal: Number(myListForm.cal) || 0, protein: Number(myListForm.protein) || 0, fat: Number(myListForm.fat) || 0, carbs: Number(myListForm.carbs) || 0, fiber: Number(myListForm.fiber) || 0 }]); setMyListForm({ name: "", cal: "", protein: "", fat: "", carbs: "", fiber: "" }); setShowMyListForm(false); };

  const filteredAlcohol = alcoholSearch.length > 0 ? ALCOHOL_DB.filter(a => a.name.includes(alcoholSearch)).slice(0, 6) : [];
  const addAlcohol = (a: any, qty: number = 1) => { setAlcoholLogs(prev => [...prev, { ...a, qty, cal: Math.round(a.cal * qty), alcohol: Math.round(a.alcohol * qty * 10) / 10, date: alcoholDate, id: Date.now() }]); setAlcoholSearch(""); setAlcoholServings("1"); };
  const alcoholByPeriod = () => alcoholLogs.reduce((acc: any, l: any) => { const wk = getWeekKey(l.date), mo = getMonthKey(l.date), yr = getYearKey(l.date); if (!acc[wk]) acc[wk] = { cal: 0, alcohol: 0, count: 0 }; if (!acc[mo]) acc[mo] = { cal: 0, alcohol: 0, count: 0 }; if (!acc[yr]) acc[yr] = { cal: 0, alcohol: 0, count: 0 }; [wk, mo, yr].forEach(k => { acc[k].cal += l.cal; acc[k].alcohol += l.alcohol; acc[k].count += l.qty; }); return acc; }, {});
  const alcoStats = alcoholByPeriod();
  const thisWeek = getWeekKey(toDateStr(new Date()));
  const thisMonth = getMonthKey(toDateStr(new Date()));
  const thisYear = getYearKey(toDateStr(new Date()));

  const saveWeight = () => {
    if (!weightInput.weight) return;
    const entry = { ...weightInput, weight: parseFloat(weightInput.weight), fat: weightInput.fat ? parseFloat(weightInput.fat) : null, muscle: weightInput.muscle ? parseFloat(weightInput.muscle) : null, id: editingWeight || Date.now() };
    if (editingWeight) { setWeights(w => w.map((x: any) => x.id === editingWeight ? entry : x)); setEditingWeight(null); }
    else setWeights(w => [...w, entry].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setWeightInput({ date: toDateStr(new Date()), weight: "", fat: "", muscle: "", condition: "普通" });
  };
  const startEditWeight = (w: any) => { setWeightInput({ date: w.date, weight: String(w.weight), fat: w.fat ? String(w.fat) : "", muscle: w.muscle ? String(w.muscle) : "", condition: w.condition }); setEditingWeight(w.id); };

  const prediction = (() => {
    if (periods.length < 2) return null;
    const sorted = [...periods].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    const diffs = sorted.slice(1).map((p, i) => (new Date(p.start).getTime() - new Date(sorted[i].start).getTime()) / 86400000);
    const avg = Math.round(diffs.reduce((a, b) => a + b) / diffs.length);
    const next = new Date(sorted.at(-1)!.start); next.setDate(next.getDate() + avg);
    return { date: next.toLocaleDateString("ja-JP"), cycle: avg };
  })();

  const handleCheckupPhoto = async (e: any) => { const file = e.target.files[0]; if (!file) return; setCheckupAnalyzing(true); const b64 = await toBase64(file); const result = await analyzeCheckupImage(b64.split(",")[1]); if (result) setCheckupForm((f: any) => ({ ...f, ...result })); setCheckupAnalyzing(false); e.target.value = ""; };
  const saveCheckup = () => { if (!checkupForm.date) return; setCheckups(c => [{ ...checkupForm, id: Date.now() }, ...c]); setShowCheckupForm(false); setCheckupForm({ date: "", place: "", height: "", weight: "", bmi: "", sbp: "", dbp: "", ast: "", alt: "", gtp: "", alp: "", uricAcid: "", totalCholesterol: "", hdl: "", ldl: "", triglyceride: "", nonHdl: "", glucose: "", hba1c: "", creatinine: "", egfr: "", rbc: "", hematocrit: "", hemoglobin: "", mcv: "", mch: "", mchc: "", wbc: "", platelet: "", recheck: [], memo: "" }); };

  const recheckAlerts = checkups.flatMap(c => (c.recheck || []).filter((r: any) => { if (!r.due) return false; const days = (new Date(r.due).getTime() - new Date().getTime()) / 86400000; return days <= 30 && days >= 0; }).map((r: any) => ({ ...r, checkupDate: c.date })));
  const filteredFoods = foodSearch.length > 0 ? [...FOOD_DB, ...myList].filter(f => f.name.includes(foodSearch)).slice(0, 8) : [];

  const getPeriodPhase = () => {
    if (!periods.length) return null;
    const lastPeriod = periods[0].start;
    const daysSince = Math.floor((new Date().getTime() - new Date(lastPeriod).getTime()) / 86400000);
    const cycle = prediction?.cycle || 28;
    const dayOfCycle = (daysSince % cycle) + 1;
    const phases = [
      { name: "月経期", emoji: "🔴", days: [1, 5], condition: "出血による貧血・疲労感が出やすい時期", nutrients: ["鉄分", "ビタミンC", "葉酸"], foods: ["ほうれん草", "レバー", "あさり", "ブロッコリー", "納豆"], avoid: ["カフェイン", "冷たい飲み物", "アルコール"], tip: "温かいものを中心に、鉄分をしっかり補給しましょう", color: "#ff6b8a", bg: "#fff0f4" },
      { name: "卵胞期", emoji: "🌱", days: [6, 13], condition: "エストロゲン上昇で心身ともに安定・元気な時期", nutrients: ["タンパク質", "葉酸", "ビタミンB群"], foods: ["鶏むね肉", "卵", "大豆製品", "アボカド", "バナナ"], avoid: ["過度な糖質", "加工食品"], tip: "代謝が良い時期。筋トレや運動との相性も◎", color: "#34d399", bg: "#f0fdf4" },
      { name: "排卵期", emoji: "🌸", days: [14, 16], condition: "最もエネルギーが高く、体調が良い時期", nutrients: ["亜鉛", "ビタミンE", "オメガ3"], foods: ["牡蠣", "ナッツ類", "サーモン", "アーモンド", "かぼちゃ"], avoid: ["過食"], tip: "体のピーク期！栄養バランスを整えて最大限活用を", color: "#f59e0b", bg: "#fffbeb" },
      { name: "黄体期", emoji: "🌙", days: [17, cycle], condition: "プロゲステロン上昇でむくみ・イライラが出やすい", nutrients: ["マグネシウム", "ビタミンB6", "食物繊維"], foods: ["バナナ", "ダークチョコレート", "ごま", "玄米", "豆類"], avoid: ["塩分の多い食事", "アルコール", "カフェイン"], tip: "むくみ対策にカリウムを。チョコは少量ならOK😊", color: "#8b5cf6", bg: "#f5f3ff" },
    ];
    const phase = phases.find(p => dayOfCycle >= p.days[0] && dayOfCycle <= p.days[1]) || phases[3];
    return { ...phase, dayOfCycle };
  };

  const s = {
    card: { background: "#fff", borderRadius: 20, padding: 16, marginBottom: 12, boxShadow: "0 2px 16px rgba(255,77,121,0.08)" },
    btn: { padding: "12px 16px", background: "linear-gradient(135deg,#ff4d79,#ff85a1)", color: "#fff", border: "none", borderRadius: 14, fontSize: 14, fontWeight: "bold", cursor: "pointer" },
    inp: { width: "100%", padding: "10px 12px", border: "2px solid #ffe0eb", borderRadius: 12, fontSize: 14, marginBottom: 8, boxSizing: "border-box" as const, outline: "none" },
    tag: { background: "#fff0f4", borderRadius: 8, padding: "2px 8px", fontSize: 11, color: "#ff4d79" },
    sBtn: { padding: "6px 12px", background: "#fff0f4", color: "#ff4d79", border: "1.5px solid #ffb3c6", borderRadius: 10, fontSize: 12, cursor: "pointer", fontWeight: "bold" },
  };

  return (
    <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: "#fff5f8", position: "relative" }}>
      {/* ヘッダー */}
      <div style={{ background: "linear-gradient(160deg,#ff4d79,#ff85a1,#ffb3c6)", padding: "24px 20px 18px", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, background: "rgba(255,255,255,0.1)", borderRadius: "50%" }} />
        <div style={{ fontSize: 11, letterSpacing: 3, opacity: 0.8, marginBottom: 2 }}>HEALTH JOURNAL</div>
        {editingTitle
          ? <input autoFocus value={appTitle} onChange={e => setAppTitle(e.target.value)} onBlur={() => setEditingTitle(false)} onKeyDown={e => e.key === "Enter" && setEditingTitle(false)} style={{ fontSize: 20, fontWeight: "bold", background: "rgba(255,255,255,0.25)", border: "none", borderBottom: "2px solid #fff", color: "#fff", outline: "none", width: "100%", borderRadius: 4, padding: "2px 4px" }} />
          : <div style={{ fontSize: 20, fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }} onClick={() => setEditingTitle(true)}>🌿 {appTitle} <span style={{ fontSize: 11, opacity: 0.7 }}>✏️</span></div>
        }
        <div style={{ fontSize: 11, opacity: 0.75, marginTop: 2 }}>{today()}</div>
        <div style={{ marginTop: 10, background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "10px 14px" }}>
          <div style={{ fontSize: 13, color: "#fff", lineHeight: 1.6, marginBottom: 6 }}>{getGreeting(userName)}</div>
          {editingName
            ? <input autoFocus value={userName} onChange={e => setUserName(e.target.value)} onBlur={() => setEditingName(false)} onKeyDown={e => e.key === "Enter" && setEditingName(false)} placeholder="名前を入力" style={{ padding: "4px 10px", borderRadius: 8, border: "none", fontSize: 13, outline: "none", width: "80%" }} />
            : <div onClick={() => setEditingName(true)} style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>{userName ? `${userName}さん ✏️` : "👤 名前を設定する（任意）"}</div>
          }
        </div>
      </div>

      {/* コンテンツ */}
      <div style={{ padding: "14px 14px 90px" }}>

        {tab === "気分" && (
          <div>
            <div style={s.card}>
              <div style={{ fontWeight: "bold", color: "#ff4d79", marginBottom: 12, fontSize: 15 }}>🧠 今日のメンタル</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {MENTAL_OPTIONS.map(m => (
                  <button key={m.label} onClick={() => setTodayMental(m.label)} style={{ flex: 1, padding: "14px 4px", border: `2px solid ${todayMental === m.label ? m.color : "#f0f0f0"}`, borderRadius: 16, background: todayMental === m.label ? "#fff0f4" : "#fafafa", cursor: "pointer", textAlign: "center" }}>
                    <div style={{ fontSize: 26 }}>{m.emoji}</div>
                    <div style={{ fontSize: 12, color: todayMental === m.label ? m.color : "#aaa", fontWeight: todayMental === m.label ? "bold" : "normal", marginTop: 4 }}>{m.label}</div>
                  </button>
                ))}
              </div>
              <div style={{ fontWeight: "bold", color: "#ff4d79", marginBottom: 12, fontSize: 15 }}>💪 今日の体調</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                {CONDITION_OPTIONS.map(c => (
                  <button key={c.label} onClick={() => setTodayCondition(c.label)} style={{ flex: 1, minWidth: 60, padding: "10px 4px", border: `2px solid ${todayCondition === c.label ? c.color : "#f0f0f0"}`, borderRadius: 14, background: todayCondition === c.label ? "#fff0f4" : "#fafafa", cursor: "pointer", textAlign: "center" }}>
                    <div style={{ fontSize: 20 }}>{c.emoji}</div>
                    <div style={{ fontSize: 11, color: todayCondition === c.label ? c.color : "#aaa", fontWeight: todayCondition === c.label ? "bold" : "normal", marginTop: 2 }}>{c.label}</div>
                  </button>
                ))}
              </div>
              <textarea placeholder="今日のひとことメモ（任意）" value={moodMemo} onChange={e => setMoodMemo(e.target.value)} style={{ ...s.inp, height: 70, resize: "none", marginBottom: 10 }} />
              <button onClick={() => { if (!todayMental && !todayCondition) return; setMoodLogs(l => [{ date: toDateStr(new Date()), time: nowTime(), mental: todayMental, condition: todayCondition, memo: moodMemo, id: Date.now() }, ...l]); setTodayMental(""); setTodayCondition(""); setMoodMemo(""); }} style={{ ...s.btn, width: "100%" }}>記録する</button>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <button onClick={() => setShowMoodAnalysis(false)} style={{ flex: 1, padding: "8px", border: `2px solid ${!showMoodAnalysis ? "#ff4d79" : "#f0f0f0"}`, borderRadius: 12, background: !showMoodAnalysis ? "#fff0f4" : "#fafafa", fontSize: 12, cursor: "pointer", color: !showMoodAnalysis ? "#ff4d79" : "#999", fontWeight: !showMoodAnalysis ? "bold" : "normal" }}>📝 記録一覧</button>
              <button onClick={() => setShowMoodAnalysis(true)} style={{ flex: 1, padding: "8px", border: `2px solid ${showMoodAnalysis ? "#ff4d79" : "#f0f0f0"}`, borderRadius: 12, background: showMoodAnalysis ? "#fff0f4" : "#fafafa", fontSize: 12, cursor: "pointer", color: showMoodAnalysis ? "#ff4d79" : "#999", fontWeight: showMoodAnalysis ? "bold" : "normal" }}>📊 分析</button>
            </div>
            {showMoodAnalysis ? <MoodAnalysis moodLogs={moodLogs} /> : (
              <div>
                {moodLogs.length === 0 && <div style={{ textAlign: "center", color: "#dbb", marginTop: 40 }}><div style={{ fontSize: 40 }}>😊</div><br />今日の気分を記録しよう！</div>}
                {moodLogs.map((l: any) => (
                  <div key={l.id} style={{ ...s.card, padding: "12px 16px" }}>
                    <div style={{ fontSize: 12, color: "#aaa", marginBottom: 6 }}>{l.date} {l.time}</div>
                    <div style={{ display: "flex", gap: 10 }}>
                      {l.mental && <span style={s.tag}>🧠 {l.mental}</span>}
                      {l.condition && <span style={s.tag}>💪 {l.condition}</span>}
                    </div>
                    {l.memo && <div style={{ fontSize: 12, color: "#777", marginTop: 6 }}>💬 {l.memo}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "食事" && (
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <input type="date" value={mealDate} onChange={e => setMealDate(e.target.value)} style={{ flex: 1, padding: "8px 12px", border: "2px solid #ffe0eb", borderRadius: 12, fontSize: 14, outline: "none" }} />
              <button onClick={() => setMealDate(toDateStr(new Date()))} style={s.sBtn}>今日</button>
              <button onClick={() => setShowAlcohol(v => !v)} style={{ ...s.sBtn, background: showAlcohol ? "#fff0f4" : "#fafafa" }}>🍺</button>
            </div>
            {showAlcohol && (
              <div style={{ ...s.card, border: "2px solid #ffe8b0" }}>
                <div style={{ fontWeight: "bold", color: "#e6a817", marginBottom: 10, fontSize: 14 }}>🍺 飲酒記録</div>
                <input type="date" value={alcoholDate} onChange={e => setAlcoholDate(e.target.value)} style={{ ...s.inp, marginBottom: 8 }} />
                <input placeholder="🔍 お酒を検索" value={alcoholSearch} onChange={e => setAlcoholSearch(e.target.value)} style={s.inp} />
                {filteredAlcohol.map((a, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderRadius: 10, background: "#fffbee", marginBottom: 4 }}>
                    <span style={{ fontSize: 13 }}>{a.name}</span>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <input type="number" value={alcoholServings} onChange={e => setAlcoholServings(e.target.value)} min="0.5" step="0.5" style={{ width: 50, padding: "4px 6px", border: "1.5px solid #ffe0eb", borderRadius: 8, fontSize: 13, outline: "none", textAlign: "center" }} />
                      <button onClick={() => addAlcohol(a, Number(alcoholServings) || 1)} style={{ ...s.sBtn, background: "#ffe8b0", borderColor: "#ffd166", color: "#7a4f00" }}>追加</button>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 6, marginTop: 10, marginBottom: 6 }}>
                  {["week", "month", "year"].map(v => (
                    <button key={v} onClick={() => setAlcoholView(v)} style={{ flex: 1, padding: "6px 4px", border: `2px solid ${alcoholView === v ? "#e6a817" : "#f0f0f0"}`, borderRadius: 10, background: alcoholView === v ? "#fffbee" : "#fafafa", fontSize: 11, cursor: "pointer", color: alcoholView === v ? "#e6a817" : "#999", fontWeight: alcoholView === v ? "bold" : "normal" }}>
                      {v === "week" ? "週次" : v === "month" ? "月次" : "年次"}
                    </button>
                  ))}
                </div>
                {(() => { const key = alcoholView === "week" ? thisWeek : alcoholView === "month" ? thisMonth : thisYear; const stat = alcoStats[key] || { cal: 0, alcohol: 0, count: 0 }; return (<div style={{ display: "flex", gap: 6 }}>{[["🍺", "杯数", `${stat.count}杯`], ["🔥", "kcal", `${stat.cal}`], ["🌊", "純AL", `${stat.alcohol}g`]].map(([ic, lb, val]) => (<div key={lb} style={{ flex: 1, textAlign: "center", background: "#fffbee", borderRadius: 10, padding: "8px 4px" }}><div style={{ fontSize: 16 }}>{ic}</div><div style={{ fontSize: 13, fontWeight: "bold", color: "#e6a817" }}>{val}</div><div style={{ fontSize: 9, color: "#bbb" }}>{lb}</div></div>))}</div>); })()}
              </div>
            )}
            <div style={{ ...s.card, padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontWeight: "bold", color: "#ff4d79", fontSize: 14 }}>📊 今日の合計</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => setShowMyList(v => !v)} style={s.sBtn}>📋 マイリスト</button>
                  <button onClick={() => setShowGoalEdit(v => !v)} style={s.sBtn}>目標</button>
                </div>
              </div>
              {showGoalEdit && (
                <div style={{ marginBottom: 10, background: "#fff8fb", borderRadius: 10, padding: 10 }}>
                  {(["cal", "protein", "fat", "carbs", "fiber"] as const).map(k => (
                    <div key={k} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: "#aaa", width: 90 }}>{{ cal: "カロリー", protein: "タンパク質", fat: "脂質", carbs: "糖質", fiber: "食物繊維" }[k]}</span>
                      <input type="number" value={goals[k]} onChange={e => setGoals(g => ({ ...g, [k]: Number(e.target.value) }))} style={{ flex: 1, padding: "4px 8px", border: "1.5px solid #ffe0eb", borderRadius: 8, fontSize: 13, outline: "none" }} />
                    </div>
                  ))}
                </div>
              )}
              {showMyList && (
                <div style={{ marginBottom: 10, background: "#fff8fb", borderRadius: 10, padding: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ fontWeight: "bold", color: "#ff85a1", fontSize: 13 }}>📋 マイリスト</div>
                    <button onClick={() => setShowMyListForm(v => !v)} style={{ ...s.sBtn, fontSize: 11 }}>＋ 新規登録</button>
                  </div>
                  {showMyListForm && (
                    <div style={{ background: "#fff", borderRadius: 10, padding: 10, marginBottom: 8 }}>
                      <input placeholder="食品名（必須）" value={myListForm.name} onChange={e => setMyListForm(f => ({ ...f, name: e.target.value }))} style={{ ...s.inp, marginBottom: 6 }} />
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                        {[["cal", "カロリー(kcal)"], ["protein", "タンパク質(g)"], ["fat", "脂質(g)"], ["carbs", "糖質(g)"], ["fiber", "食物繊維(g)"]].map(([k, ph]) => (
                          <input key={k} type="number" placeholder={ph} value={(myListForm as any)[k]} onChange={e => setMyListForm(f => ({ ...f, [k]: e.target.value }))} style={{ ...s.inp, marginBottom: 4, fontSize: 12 }} />
                        ))}
                      </div>
                      <button onClick={addToMyList} style={{ ...s.btn, width: "100%", padding: "8px" }}>登録する</button>
                    </div>
                  )}
                  {myList.length === 0 && <div style={{ fontSize: 12, color: "#bbb", textAlign: "center", padding: 8 }}>「＋ 新規登録」からよく食べるものを登録しよう！</div>}
                  {myList.map((f: any, i: number) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 8px", borderRadius: 8, background: "#fff", marginBottom: 4 }}>
                      <div><div style={{ fontSize: 13 }}>{f.name}</div><div style={{ fontSize: 10, color: "#bbb" }}>P:{f.protein}g F:{f.fat}g C:{f.carbs}g</div></div>
                      <div style={{ display: "flex", gap: 4 }}>
                        <span style={{ fontSize: 12, color: "#ff4d79" }}>{f.cal}kcal</span>
                        <button onClick={() => addFood(f, 1)} style={{ ...s.sBtn, padding: "2px 8px", fontSize: 11 }}>追加</button>
                        <button onClick={() => setMyList(l => l.filter((_: any, j: number) => j !== i))} style={{ ...s.sBtn, padding: "2px 6px", fontSize: 11, color: "#aaa", borderColor: "#eee" }}>×</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: 4 }}>
                {[["🔥", "kcal", tot.cal, goals.cal], ["🥩", "P(g)", tot.protein.toFixed(1), goals.protein], ["🥑", "F(g)", tot.fat.toFixed(1), goals.fat], ["🍚", "C(g)", tot.carbs.toFixed(1), goals.carbs], ["🌿", "繊維", tot.fiber.toFixed(1), goals.fiber]].map(([ic, lb, val, goal]) => (
                  <div key={String(lb)} style={{ textAlign: "center", background: Number(val) > Number(goal) ? "#ffe0e8" : "#fff0f4", borderRadius: 10, padding: "6px 2px" }}>
                    <div style={{ fontSize: 13 }}>{ic}</div>
                    <div style={{ fontSize: 13, fontWeight: "bold", color: Number(val) > Number(goal) ? "#ff4d79" : "#333" }}>{val}</div>
                    <div style={{ fontSize: 9, color: "#bbb" }}>/{goal}</div>
                    <div style={{ fontSize: 8, color: "#bbb" }}>{lb}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
              {MEAL_TIMES.map(t => (
                <button key={t} onClick={() => setSelMealTime(t)} style={{ flex: 1, padding: "8px 2px", border: `2px solid ${selMealTime === t ? "#ff4d79" : "#f0f0f0"}`, borderRadius: 12, background: selMealTime === t ? "#fff0f4" : "#fafafa", fontSize: 11, cursor: "pointer", color: selMealTime === t ? "#ff4d79" : "#999", fontWeight: selMealTime === t ? "bold" : "normal" }}>{t}</button>
              ))}
            </div>
            <div style={s.card}>
              <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                <input placeholder="🔍 食品名で検索" value={foodSearch} onChange={e => setFoodSearch(e.target.value)} style={{ ...s.inp, flex: 1, marginBottom: 0 }} />
                <input type="number" value={servings} onChange={e => setServings(e.target.value)} min="0.5" step="0.5" placeholder="人前" style={{ width: 60, padding: "10px 6px", border: "2px solid #ffe0eb", borderRadius: 12, fontSize: 13, outline: "none", textAlign: "center" }} />
              </div>
              {filteredFoods.map((f, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderRadius: 10, background: "#fff8fb", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, flex: 1 }}>{f.name}</span>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#ff4d79", fontWeight: "bold" }}>{Math.round(f.cal * (Number(servings) || 1))}kcal</span>
                    <button onClick={() => addFood(f, Number(servings) || 1)} style={{ ...s.sBtn, padding: "3px 8px", fontSize: 11 }}>追加</button>
                  </div>
                </div>
              ))}
              {foodSearch && filteredFoods.length === 0 && <div style={{ fontSize: 12, color: "#bbb", textAlign: "center", padding: 8 }}>見つかりません</div>}
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <input ref={foodFileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFoodPhoto} />
              <input ref={nutritionFileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleNutritionPhoto} />
              <button onClick={() => foodFileRef.current?.click()} disabled={analyzing} style={{ ...s.btn, flex: 1, opacity: analyzing ? 0.6 : 1, fontSize: 12 }}>{analyzing ? "分析中…" : "📷 料理写真"}</button>
              <button onClick={() => nutritionFileRef.current?.click()} disabled={analyzing} style={{ ...s.btn, flex: 1, background: "linear-gradient(135deg,#a78bfa,#c084fc)", opacity: analyzing ? 0.6 : 1, fontSize: 12 }}>{analyzing ? "読取中…" : "🔍 成分表示"}</button>
              <button onClick={() => setShowManual(v => !v)} style={{ ...s.btn, background: "linear-gradient(135deg,#ff85a1,#ffb3c6)" }}>✏️</button>
            </div>
            {showManual && (
              <div style={{ ...s.card, marginBottom: 12 }}>
                <input placeholder="料理名" value={manualFood.name} onChange={e => setManualFood(f => ({ ...f, name: e.target.value }))} style={s.inp} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {[["cal", "カロリー(kcal)"], ["protein", "タンパク質(g)"], ["fat", "脂質(g)"], ["carbs", "糖質(g)"], ["fiber", "食物繊維(g)"]].map(([k, ph]) => (
                    <input key={k} type="number" placeholder={ph} value={(manualFood as any)[k]} onChange={e => setManualFood(f => ({ ...f, [k]: e.target.value }))} style={{ ...s.inp, marginBottom: 4 }} />
                  ))}
                  <input type="number" value={servings} onChange={e => setServings(e.target.value)} min="0.5" step="0.5" placeholder="人前数" style={{ ...s.inp, marginBottom: 4 }} />
                </div>
                <button onClick={addManual} style={{ ...s.btn, width: "100%" }}>追加する</button>
              </div>
            )}
            {MEAL_TIMES.map(mt => { const foods = todayMeals[mt] || []; if (!foods.length) return null; return (<div key={mt} style={{ ...s.card, marginBottom: 10 }}><div style={{ fontWeight: "bold", color: "#ff4d79", marginBottom: 8, fontSize: 14 }}>{mt}</div>{foods.map((f: any) => (<div key={f.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #fff0f4" }}><div style={{ display: "flex", gap: 8, alignItems: "center" }}>{f.img && <img src={f.img} style={{ width: 34, height: 34, borderRadius: 8, objectFit: "cover" }} />}<div><div style={{ fontSize: 13, fontWeight: "bold" }}>{f.name}{f.qty && f.qty !== 1 ? ` ×${f.qty}` : ""}</div><div style={{ fontSize: 11, color: "#aaa" }}>P:{f.protein}g F:{f.fat}g C:{f.carbs}g</div></div></div><div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 14, fontWeight: "bold", color: "#ff4d79" }}>{f.cal}kcal</span><button onClick={() => removeFood(mt, f.id)} style={{ background: "none", border: "none", color: "#ddd", cursor: "pointer", fontSize: 16 }}>×</button></div></div>))}</div>); })}
            {allMealsFlat.length === 0 && <div style={{ textAlign: "center", color: "#dbb", marginTop: 20 }}><div style={{ fontSize: 40 }}>🍽️</div><div style={{ marginTop: 8, fontSize: 14 }}>食事を記録しよう！</div></div>}
          </div>
        )}

        {tab === "記録" && (
          <div>
            <div style={s.card}>
              <div style={{ fontWeight: "bold", color: "#ff4d79", marginBottom: 10, fontSize: 14 }}>{editingWeight ? "✏️ 記録を修正" : "⚖️ 体重を記録"}</div>
              <input type="date" value={weightInput.date} onChange={e => setWeightInput(w => ({ ...w, date: e.target.value }))} style={s.inp} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
                {[["weight", "体重(kg)"], ["fat", "体脂肪(%)"], ["muscle", "筋肉量(kg)"]].map(([k, ph]) => (
                  <input key={k} type="number" placeholder={ph} value={(weightInput as any)[k]} onChange={e => setWeightInput(w => ({ ...w, [k]: e.target.value }))} style={{ ...s.inp, marginBottom: 0, fontSize: 13 }} />
                ))}
              </div>
              <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                {["絶好調", "普通", "疲れ気味", "不調"].map(c => (
                  <button key={c} onClick={() => setWeightInput(w => ({ ...w, condition: c }))} style={{ flex: 1, padding: "8px 2px", border: `2px solid ${weightInput.condition === c ? "#ff4d79" : "#f0f0f0"}`, borderRadius: 12, background: weightInput.condition === c ? "#fff0f4" : "#fafafa", fontSize: 11, cursor: "pointer", color: weightInput.condition === c ? "#ff4d79" : "#999", fontWeight: weightInput.condition === c ? "bold" : "normal" }}>{c}</button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={saveWeight} style={{ ...s.btn, flex: 1 }}>{editingWeight ? "更新する" : "記録する"}</button>
                {editingWeight && <button onClick={() => { setEditingWeight(null); setWeightInput({ date: toDateStr(new Date()), weight: "", fat: "", muscle: "", condition: "普通" }); }} style={s.sBtn}>キャンセル</button>}
              </div>
              <input type="number" placeholder="目標体重(kg)" value={weightGoal} onChange={e => setWeightGoal(e.target.value)} style={{ ...s.inp, marginTop: 10, marginBottom: 0, fontSize: 13 }} />
            </div>
            {weights.length > 0 && (<div style={{ ...s.card, padding: "14px 10px" }}><div style={{ fontWeight: "bold", color: "#ff4d79", marginBottom: 8, fontSize: 14, paddingLeft: 6 }}>📈 直近1週間 {weightGoal && <span style={{ fontSize: 12, color: "#ff85a1", marginLeft: 8 }}>目標: {weightGoal}kg</span>}</div><LineChart weights={weights} goal={weightGoal ? parseFloat(weightGoal) : null} /></div>)}
            {weights.length === 0 && <div style={{ textAlign: "center", color: "#dbb", marginTop: 40 }}><div style={{ fontSize: 40 }}>⚖️</div><br />体重を記録しよう！</div>}
            {weights.map((w: any, i: number) => (
              <div key={w.id || i} style={{ ...s.card, padding: "12px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#aaa", fontSize: 12 }}>{w.date}</span>
                  <span style={{ fontWeight: "bold", fontSize: 22, color: "#ff4d79" }}>{w.weight}<span style={{ fontSize: 12, color: "#ccc" }}>kg</span></span>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    <span style={s.tag}>{w.condition}</span>
                    <button onClick={() => startEditWeight(w)} style={{ ...s.sBtn, padding: "3px 8px", fontSize: 11 }}>修正</button>
                  </div>
                </div>
                {(w.fat || w.muscle) && (<div style={{ display: "flex", gap: 8, marginTop: 6 }}>{w.fat && <span style={{ ...s.tag, fontSize: 11 }}>体脂肪 {w.fat}%</span>}{w.muscle && <span style={{ ...s.tag, fontSize: 11 }}>筋肉量 {w.muscle}kg</span>}</div>)}
              </div>
            ))}
          </div>
        )}

        {tab === "生理" && (
          <div>
            {(() => { const phase = getPeriodPhase(); if (!phase) return <div style={{ textAlign: "center", color: "#dbb", fontSize: 13, marginBottom: 12 }}>生理開始日を記録するとフェーズアドバイスが表示されます🌸</div>; return (<div style={{ background: phase.bg, borderRadius: 20, padding: 18, marginBottom: 14, border: `2px solid ${phase.color}30` }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}><div style={{ fontWeight: "bold", color: phase.color, fontSize: 16 }}>{phase.emoji} {phase.name}</div><div style={{ fontSize: 12, color: phase.color, background: `${phase.color}20`, padding: "3px 10px", borderRadius: 20, fontWeight: "bold" }}>周期{phase.dayOfCycle}日目</div></div><div style={{ fontSize: 13, color: "#666", marginBottom: 12, lineHeight: 1.6 }}>{phase.condition}</div><div style={{ marginBottom: 10 }}><div style={{ fontSize: 12, fontWeight: "bold", color: phase.color, marginBottom: 6 }}>💊 積極的に摂りたい栄養素</div><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{phase.nutrients.map((n: string) => (<span key={n} style={{ background: `${phase.color}20`, color: phase.color, borderRadius: 8, padding: "3px 10px", fontSize: 12, fontWeight: "bold" }}>{n}</span>))}</div></div><div style={{ marginBottom: 10 }}><div style={{ fontSize: 12, fontWeight: "bold", color: phase.color, marginBottom: 6 }}>🍽️ おすすめ食材</div><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{phase.foods.map((f: string) => (<span key={f} style={{ background: "#fff", border: `1px solid ${phase.color}40`, borderRadius: 8, padding: "3px 10px", fontSize: 12, color: "#555" }}>{f}</span>))}</div></div><div style={{ marginBottom: 10 }}><div style={{ fontSize: 12, fontWeight: "bold", color: "#e74c3c", marginBottom: 6 }}>⚠️ 控えたいもの</div><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{phase.avoid.map((a: string) => (<span key={a} style={{ background: "#fff0f0", border: "1px solid #ffcccc", borderRadius: 8, padding: "3px 10px", fontSize: 12, color: "#e74c3c" }}>{a}</span>))}</div></div><div style={{ background: "#fff", borderRadius: 12, padding: "10px 14px", fontSize: 13, color: "#555", borderLeft: `3px solid ${phase.color}` }}>💡 {phase.tip}</div></div>); })()}
            {prediction && (<div style={{ background: "linear-gradient(135deg,#ff4d79,#ffb3c6)", borderRadius: 20, padding: 22, marginBottom: 14, textAlign: "center", color: "#fff" }}><div style={{ fontSize: 11, opacity: 0.85, letterSpacing: 2 }}>NEXT PERIOD</div><div style={{ fontSize: 28, fontWeight: "bold", margin: "6px 0 4px" }}>{prediction.date}</div><div style={{ fontSize: 12, opacity: 0.75 }}>平均周期 {prediction.cycle} 日</div></div>)}
            <div style={s.card}>
              <input type="date" value={periodDate} onChange={e => setPeriodDate(e.target.value)} style={s.inp} />
              <button onClick={() => { if (!periodDate) return; setPeriods(p => [...p, { start: periodDate }].sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())); setPeriodDate(""); }} style={{ ...s.btn, width: "100%" }}>記録する</button>
            </div>
            {periods.length < 2 && <div style={{ textAlign: "center", color: "#dbb", fontSize: 13 }}>2回記録すると次回予測が出ます🌸</div>}
            {periods.map((p: any, i: number) => (<div key={i} style={{ ...s.card, padding: "10px 14px" }}><span style={{ color: "#ff85a1", marginRight: 8 }}>🌸</span><span style={{ color: "#777", fontSize: 13 }}>{p.start} 開始</span></div>))}
          </div>
        )}

        {tab === "健診" && (
          <div>
            {recheckAlerts.length > 0 && (<div style={{ background: "linear-gradient(135deg,#ffe066,#ffb347)", borderRadius: 16, padding: 14, marginBottom: 12, color: "#7a4f00" }}><div style={{ fontWeight: "bold", marginBottom: 6 }}>⚠️ 再検査の時期が近づいています</div>{recheckAlerts.map((r: any, i: number) => (<div key={i} style={{ fontSize: 13, marginBottom: 2 }}>・{r.item}（{r.due}）</div>))}</div>)}
            <div style={{ display: "flex", gap: 6, marginBottom: 10, overflowX: "auto" }}>
              {checkups.map((c: any, i: number) => (<button key={c.id} onClick={() => setSelectedCheckup(i)} style={{ padding: "6px 14px", border: `2px solid ${selectedCheckup === i ? "#ff4d79" : "#f0f0f0"}`, borderRadius: 12, background: selectedCheckup === i ? "#fff0f4" : "#fafafa", fontSize: 12, cursor: "pointer", color: selectedCheckup === i ? "#ff4d79" : "#999", whiteSpace: "nowrap", fontWeight: selectedCheckup === i ? "bold" : "normal" }}>{c.date}</button>))}
              <button onClick={() => setShowCheckupForm(v => !v)} style={{ padding: "6px 14px", border: "2px dashed #ffb3c6", borderRadius: 12, background: "#fff8fb", fontSize: 12, cursor: "pointer", color: "#ff85a1", whiteSpace: "nowrap" }}>＋ 追加</button>
            </div>
            {showCheckupForm && (
              <div style={{ ...s.card, marginBottom: 14 }}>
                <div style={{ fontWeight: "bold", color: "#ff4d79", marginBottom: 10 }}>🏥 新しい健診結果</div>
                <input ref={checkupFileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleCheckupPhoto} />
                <button onClick={() => checkupFileRef.current?.click()} disabled={checkupAnalyzing} style={{ ...s.btn, width: "100%", marginBottom: 10, opacity: checkupAnalyzing ? 0.6 : 1 }}>{checkupAnalyzing ? "📷 読み取り中…" : "📷 結果の写真を読み込む"}</button>
                {[["date", "受診日", "date"], ["place", "受診した病院・クリニック名", "text"], ["height", "身長(cm)", "number"], ["weight", "体重(kg)", "number"], ["bmi", "BMI", "number"], ["sbp", "収縮期血圧", "number"], ["dbp", "拡張期血圧", "number"], ["ast", "AST(GOT)", "number"], ["alt", "ALT(GPT)", "number"], ["gtp", "γ-GTP", "number"], ["alp", "ALP", "number"], ["uricAcid", "尿酸", "number"], ["totalCholesterol", "総コレステロール", "number"], ["hdl", "HDL(善玉)", "number"], ["ldl", "LDL(悪玉)", "number"], ["triglyceride", "中性脂肪", "number"], ["nonHdl", "nonHDL", "number"], ["glucose", "空腹時血糖", "number"], ["hba1c", "HbA1c", "number"], ["creatinine", "クレアチニン", "number"], ["egfr", "eGFR", "number"], ["rbc", "赤血球数", "number"], ["hematocrit", "ヘマトクリット", "number"], ["hemoglobin", "ヘモグロビン", "number"], ["mcv", "MCV", "number"], ["mch", "MCH", "number"], ["mchc", "MCHC", "number"], ["wbc", "白血球数", "number"], ["platelet", "血小板数", "number"], ["memo", "メモ・所見", "text"]].map(([k, ph, t]) => (<input key={k} type={t} placeholder={ph} value={checkupForm[k]} onChange={(e: any) => setCheckupForm((f: any) => ({ ...f, [k]: e.target.value }))} style={s.inp} />))}
                <div style={{ marginTop: 4, marginBottom: 8 }}>
                  <div style={{ fontWeight: "bold", color: "#ff85a1", fontSize: 13, marginBottom: 6 }}>再検査項目</div>
                  {(checkupForm.recheck || []).map((r: any, i: number) => (<div key={i} style={{ fontSize: 12, color: "#666", marginBottom: 2 }}>・{r.item}（{r.timing}、{r.due}）</div>))}
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 4, marginTop: 6 }}>
                    <input placeholder="項目名" value={recheckInput.item} onChange={e => setRecheckInput(r => ({ ...r, item: e.target.value }))} style={{ ...s.inp, marginBottom: 0, fontSize: 12 }} />
                    <input placeholder="目安（例：3ヶ月後）" value={recheckInput.timing} onChange={e => setRecheckInput(r => ({ ...r, timing: e.target.value }))} style={{ ...s.inp, marginBottom: 0, fontSize: 12 }} />
                    <input type="date" value={recheckInput.due} onChange={e => setRecheckInput(r => ({ ...r, due: e.target.value }))} style={{ ...s.inp, marginBottom: 0, fontSize: 12 }} />
                  </div>
                  <button onClick={() => { if (!recheckInput.item) return; setCheckupForm((f: any) => ({ ...f, recheck: [...(f.recheck || []), { ...recheckInput }] })); setRecheckInput({ item: "", timing: "", due: "" }); }} style={{ ...s.sBtn, marginTop: 6 }}>＋ 追加</button>
                </div>
                <button onClick={saveCheckup} style={{ ...s.btn, width: "100%" }}>保存する</button>
              </div>
            )}
            {checkups[selectedCheckup] && (() => { const c = checkups[selectedCheckup]; return (<div style={s.card}><div style={{ fontWeight: "bold", color: "#ff4d79", marginBottom: 4, fontSize: 15 }}>📋 {c.date}</div>{c.place && <div style={{ fontSize: 13, color: "#888", marginBottom: 10, background: "#fff0f4", borderRadius: 8, padding: "4px 10px", display: "inline-block" }}>🏥 {c.place}</div>}{[["身体計測", [["身長", c.height, "cm"], ["体重", c.weight, "kg"], ["BMI", c.bmi, ""]]], ["血圧", [["収縮期", c.sbp, ""], ["拡張期", c.dbp, ""]]], ["肝機能", [["AST", c.ast, ""], ["ALT", c.alt, ""], ["γ-GTP", c.gtp, ""], ["ALP", c.alp, ""]]], ["尿酸", [["尿酸", c.uricAcid, ""]]], ["脂質代謝", [["総コレステロール", c.totalCholesterol, ""], ["HDL", c.hdl, ""], ["LDL", c.ldl, ""], ["中性脂肪", c.triglyceride, ""], ["nonHDL", c.nonHdl, ""]]], ["糖代謝", [["血糖", c.glucose, ""], ["HbA1c", c.hba1c, "%"]]], ["腎機能", [["クレアチニン", c.creatinine, ""], ["eGFR", c.egfr, ""]]], ["血球", [["赤血球", c.rbc, ""], ["Ht", c.hematocrit, "%"], ["Hb", c.hemoglobin, ""], ["MCV", c.mcv, ""], ["MCH", c.mch, ""], ["MCHC", c.mchc, ""], ["白血球", c.wbc, ""], ["血小板", c.platelet, ""]]]].map(([label, items]: any) => (<div key={label} style={{ marginBottom: 10 }}><div style={{ fontSize: 12, fontWeight: "bold", color: "#ff85a1", marginBottom: 4, background: "#fff0f4", padding: "3px 8px", borderRadius: 6 }}>{label}</div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>{items.map(([n, v, u]: any) => v && (<div key={n} style={{ fontSize: 12, color: "#555", display: "flex", justifyContent: "space-between", padding: "3px 6px" }}><span style={{ color: "#aaa" }}>{n}</span><span style={{ fontWeight: "bold", color: "#333" }}>{v}{u}</span></div>))}</div></div>))}{c.recheck?.length > 0 && (<div style={{ marginTop: 8, background: "#fffbe6", borderRadius: 10, padding: 10 }}><div style={{ fontWeight: "bold", color: "#e6a817", marginBottom: 4, fontSize: 13 }}>⚠️ 再検査</div>{c.recheck.map((r: any, i: number) => (<div key={i} style={{ fontSize: 12, color: "#7a5700", marginBottom: 2 }}>・{r.item}（{r.timing}、{r.due}）</div>))}</div>)}{c.memo && <div style={{ marginTop: 8, fontSize: 12, color: "#666", background: "#fff8fb", borderRadius: 8, padding: "6px 10px" }}>📝 {c.memo}</div>}</div>); })()}
          </div>
        )}

        {tab === "AI" && (
          <div>
            {(() => { const feedbacks = getFeedback(weights, mealLogs, userName, moodLogs); if (!feedbacks.length) return null; return (<div style={{ marginBottom: 16 }}><div style={{ fontWeight: "bold", color: "#ff4d79", marginBottom: 8, fontSize: 14 }}>💌 あなたへのメッセージ</div>{feedbacks.map((fb: any, i: number) => (<div key={i} style={{ background: fb.type === "praise" ? "linear-gradient(135deg,#fff0f4,#ffe8f0)" : "linear-gradient(135deg,#f0f8ff,#e8f4ff)", borderRadius: 16, padding: "14px 16px", marginBottom: 8, borderLeft: `4px solid ${fb.type === "praise" ? "#ff4d79" : "#60a5fa"}` }}><span style={{ fontSize: 18, marginRight: 8 }}>{fb.emoji}</span><span style={{ fontSize: 14, color: "#444", lineHeight: 1.7 }}>{fb.text}</span></div>))}</div>); })()}
            <div style={{ background: "linear-gradient(160deg,#ff4d79,#ff85a1,#ffb3c6)", borderRadius: 24, padding: 26, marginBottom: 14, textAlign: "center", minHeight: 110, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              {advLoading ? <div style={{ color: "#fff", fontSize: 15 }}>✨ 考え中…</div> : advice ? <div style={{ color: "#fff", fontSize: 15, lineHeight: 1.8 }}>{advice}</div> : <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.8 }}>ボタンを押すと<br />今日のアドバイスが届きます💕</div>}
            </div>
            <button onClick={async () => { setAdvLoading(true); setAdvice(await getAdvice({ cal: tot.cal, weight: weights[0]?.weight, mental: moodLogs[0]?.mental, condition: moodLogs[0]?.condition })); setAdvLoading(false); }} disabled={advLoading} style={{ ...s.btn, width: "100%", marginBottom: 12, opacity: advLoading ? 0.6 : 1 }}>
              {advLoading ? "生成中…" : "💬 今日のアドバイスをもらう"}
            </button>
            <button onClick={() => {
              const lines = ["【健康記録データ】", `出力日: ${today()}`, "", "■ 食事記録"];
              const sd = Object.keys(mealLogs).sort().reverse().slice(0, 7);
              if (!sd.length) lines.push("  記録なし");
              else sd.forEach(date => { lines.push(`  📅 ${date}`); const day = mealLogs[date]; MEAL_TIMES.forEach(mt => { const foods = day[mt] || []; if (foods.length > 0) lines.push(`    ${mt}: ${foods.map((f: any) => `${f.name}(${f.cal}kcal)`).join("、")}`); }); const all = Object.values(day).flat() as any[]; lines.push(`    合計: ${all.reduce((s: number, f: any) => s + (Number(f.cal) || 0), 0)}kcal`); });
              lines.push("", "■ 体重記録");
              if (!weights.length) lines.push("  記録なし");
              else weights.slice(0, 7).forEach((w: any) => { let r = `  ${w.date}: ${w.weight}kg (${w.condition})`; if (w.fat) r += ` 体脂肪${w.fat}%`; if (w.muscle) r += ` 筋肉量${w.muscle}kg`; lines.push(r); });
              lines.push("", "■ 気分・体調");
              if (!moodLogs.length) lines.push("  記録なし");
              else moodLogs.slice(0, 7).forEach((l: any) => { let r = `  ${l.date}`; if (l.mental) r += ` メンタル:${l.mental}`; if (l.condition) r += ` 体調:${l.condition}`; if (l.memo) r += ` メモ:${l.memo}`; lines.push(r); });
              lines.push("", "■ 生理記録");
              if (!periods.length) lines.push("  記録なし");
              else { periods.slice(0, 3).forEach((p: any) => lines.push(`  開始日: ${p.start}`)); if (prediction) lines.push(`  次回予測: ${prediction.date}（平均周期${prediction.cycle}日）`); }
              lines.push("", "■ 最新健診結果");
              if (checkups.length) { const c = checkups[0]; lines.push(`  受診日: ${c.date}${c.place ? " (" + c.place + ")" : ""}`); if (c.height) lines.push(`  身長:${c.height}cm 体重:${c.weight}kg BMI:${c.bmi}`); if (c.sbp) lines.push(`  血圧:${c.sbp}/${c.dbp}`); if (c.hdl) lines.push(`  HDL:${c.hdl} LDL:${c.ldl} 中性脂肪:${c.triglyceride}`); if (c.glucose) lines.push(`  血糖:${c.glucose} HbA1c:${c.hba1c}`); }
              navigator.clipboard.writeText(lines.join("\n")).then(() => alert("📋 コピーしました！\nClaude.aiに貼り付けてアドバイスをもらいましょう😊"));
            }} style={{ ...s.btn, width: "100%", marginBottom: 16, background: "linear-gradient(135deg,#34d399,#10b981)" }}>
              📋 データをコピーしてClaudeに相談
            </button>
            <div style={s.card}>
              <div style={{ fontWeight: "bold", color: "#ff4d79", marginBottom: 12, fontSize: 14 }}>📊 今日のサマリー</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {[[moodLogs[0]?.mental || "未記録", "🧠 メンタル"], [moodLogs[0]?.condition || "未記録", "💪 体調"], [`${tot.cal}kcal`, "🔥 摂取"], [weights[0] ? `${weights[0].weight}kg` : "未記録", "⚖️ 体重"], [periods.length ? `${periods.length}件` : "未記録", "🌸 生理"], [`${checkups.length}回`, "🏥 健診"]].map(([val, lb]) => (
                  <div key={String(lb)} style={{ flex: "1 1 calc(33% - 8px)", textAlign: "center", background: "#fff0f4", borderRadius: 12, padding: "10px 4px" }}>
                    <div style={{ fontSize: 13, fontWeight: "bold", color: "#ff4d79" }}>{val}</div>
                    <div style={{ fontSize: 9, color: "#bbb" }}>{lb}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ボトムナビ（固定） */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid #ffe0eb", display: "flex", zIndex: 1000 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", padding: "10px 0", color: tab === t.id ? "#ff4d79" : "#ccc" }}>
            <div style={{ fontSize: 18 }}>{t.icon}</div>
            <div style={{ fontSize: 9, fontWeight: tab === t.id ? "bold" : "normal" }}>{t.id}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
