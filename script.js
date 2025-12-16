// === 設定 ===
const STATS_URL = 'https://script.google.com/macros/s/XXXX/exec'; // ←あなたのURL
const BUSINESS_START = 9;
const BUSINESS_END = 19;
const POLL_MS = 15000; // リアルタイム用ポーリング間隔

const DOW_MAP = {1:'月曜日',2:'火曜日',3:'水曜日',4:'木曜日',5:'金曜日',6:'土曜日',7:'日曜日'};

let allRows = [];        // 生データ全部
let liveChart = null;    // 現在人数の推移（折れ線）
let hourlyChart = null;  // 各時間 入室累計の最高値（棒グラフ）

// === 初期化 ===
document.addEventListener('DOMContentLoaded', () => {
  const selectElement = document.getElementById('dow-select');

  // 今日の曜日 (JS:0=日→7に変換)
  const jsDow = new Date().getDay();
  const todayDow = (jsDow === 0 ? 7 : jsDow);

  if (selectElement) {
    selectElement.value = String(todayDow);
    selectElement.addEventListener('change', () => {
      const v = parseInt(selectElement.value);
      const dow = Number.isNaN(v) ? todayDow : v;
      renderForDow(dow);
    });
  }

  // 初回取得
  fetchAndProcess();

  // ポーリングでリアルタイム更新（当日の曜日のみ効いてくる）
  setInterval(fetchAndProcess, POLL_MS);
});

// === API から行データ取得 ===
async function fetchAndProcess() {
  try {
    const resp = await fetch(STATS_URL + '?mode=raw', { cache: 'no-cache' }); // mode は自分の GAS に合わせる
    if (!resp.ok) throw new Error(`HTTP ${resp.status} ${resp.statusText}`);

    const data = await resp.json();
    if (!data || !Array.isArray(data.rows)) {
      throw new Error("Invalid JSON: no 'rows' array");
    }

    // 正規化
    allRows = data.rows.map(normalizeRow).filter(r => r !== null);

    const status = document.getElementById('stats-status');
    if (status) status.textContent = '✅ データ更新: ' + new Date().toLocaleTimeString();

    // 現在選択中の曜日で描画
    const selEl = document.getElementById('dow-select');
    const jsDow = new Date().getDay();
    const todayDow = (jsDow === 0 ? 7 : jsDow);
    const rawSel = selEl ? parseInt(selEl.value) : todayDow;
    const dow = Number.isNaN(rawSel) ? todayDow : rawSel;
    renderForDow(dow);

  } catch (e) {
    console.error('fetchAndProcess error', e);
    const status = document.getElementById('stats-status');
    if (status) status.textContent = '⚠️ データ取得エラー: ' + (e.message || e);
  }
}

// === 1行をスプレッドシートの列に合わせて整形 ===
function normalizeRow(item) {
  try {
    // ここはあなたの Apps Script / シート列名に合わせて変更
    const timeStr = item.record_time || item.記録時刻 || item.timestamp || item.slot15;
    const enterCum = Number(item.enter_cum ?? item.入室累計 ?? 0);
    const current = Number(item.current ?? item.現在人数 ?? 0);
    const dow = Number(item.dow ?? item.曜日);
    const hour = Number(item.hour ?? item.時);
    const slotStr = item.slot15 ?? item['時刻15分'] ?? timeStr;

    if (!timeStr || isNaN(dow) || isNaN(hour)) return null;

    // 日付キー (YYYY-MM-DD) を文字列から抜く
    const m = String(timeStr).match(/(\d{4})[-/](\d{2})[-/](\d{2})/);
    if (!m) return null;
    const dateKey = `${m[1]}-${m[2]}-${m[3]}`;

    // JS Date に変換（ブラウザのローカルタイムでOKとする）
    const ts = new Date(timeStr);
    const slotDate = new Date(slotStr);

    return {
      ts,
      slotDate,
      dateKey,
      dow,
      hour,
      enterCum,
      current
    };
  } catch (e) {
    console.warn('normalizeRow error', e, item);
    return null;
  }
}

// === 曜日ごとの表示ロジック ===
function renderForDow(selectedDow) {
  if (!allRows.length) return;

  const now = new Date();
  const jsDow = now.getDay();
  const todayDow = (jsDow === 0 ? 7 : jsDow);

  // 曜日ごとに dateKey を集計
  const rowsSameDow = allRows.filter(r => r.dow === selectedDow);
  if (!rowsSameDow.length) {
    console.warn('no data for dow', selectedDow);
    destroyCharts();
    return;
  }

  // dateKeyごとにグループ化
  const byDate = {};
  for (const r of rowsSameDow) {
    (byDate[r.dateKey] ??= []).push(r);
  }
  const dateKeys = Object.keys(byDate).sort(); // 昇順（古い→新しい）

  // 今日の日付キー（normalizeRow で作った形式と合わせる）
  const todayKeyMatch = now.toISOString().slice(0,10); // "YYYY-MM-DD"

  let useDateKey;

  if (selectedDow === todayDow && byDate[todayKeyMatch]) {
    // ★ 条件1: 当日の曜日なら、その日のデータ（リアルタイムに増えていく想定）
    useDateKey = todayKeyMatch;
  } else {
    // ★ 条件2: それ以外は「一番近いその曜日のグラフ」= 最も新しい dateKey
    useDateKey = dateKeys[dateKeys.length - 1];
  }

  const rows = byDate[useDateKey] || [];
  if (!rows.length) {
    console.warn('no rows for chosen dateKey', useDateKey);
    destroyCharts();
    return;
  }

  // 時刻順にソート
  rows.sort((a,b) => a.ts - b.ts);

  // ---- グラフ用データ作成 ----

  // ① 現在人数の推移（折れ線）
  const liveLabels = rows.map(r =>
    r.slotDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
  const liveData = rows.map(r => r.current);

  // ② 各時間の入室累計の最高値（棒）
  const hours = [];
  for (let h = BUSINESS_START; h <= BUSINESS_END; h++) hours.push(h);

  const hourlyMaxEnter = hours.map(h => {
    const inHour = rows.filter(r => r.hour === h);
    if (!inHour.length) return null;
    return Math.max(...inHour.map(r => r.enterCum));
  });

  const hourlyLabels = hours.map(h => `${h}:00`);

  const dayName = DOW_MAP[selectedDow] || `曜日 ${selectedDow}`;
  const isToday = (selectedDow === todayDow && useDateKey === todayKeyMatch);

  renderLiveChart(dayName, isToday, useDateKey, liveLabels, liveData);
  renderHourlyChart(dayName, isToday, useDateKey, hourlyLabels, hourlyMaxEnter);
}

// === 現在人数の推移（折れ線） ===
function renderLiveChart(dayName, isToday, dateKey, labels, data) {
  const canvas = document.getElementById('liveChart');
  if (!canvas) return;

  if (liveChart) {
    try { liveChart.destroy(); } catch(e) {}
  }

  const ctx = canvas.getContext('2d');

  liveChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: isToday ? '現在人数（リアルタイム）' : '現在人数（過去データ）',
        data,
        borderColor: 'rgba(52,152,219,1)',
        backgroundColor: 'rgba(52,152,219,0.12)',
        fill: true,
        tension: 0.2,
        pointRadius: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: ${dayName} (${dateKey}) の現在人数推移
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: '人数' }
        }
      }
    }
  });
}

// === 各時間の入室累計最高値（棒） ===
function renderHourlyChart(dayName, isToday, dateKey, labels, maxEnterArr) {
  const canvas = document.getElementById('hourlyMaxChart');
  if (!canvas) return;

  if (hourlyChart) {
    try { hourlyChart.destroy(); } catch(e) {}
  }

  const ctx = canvas.getContext('2d');

  const barData = maxEnterArr.map(v => v == null ? NaN : v);

  hourlyChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: '各時間の入室累計の最高値',
        data: barData,
        backgroundColor: barData.map(v => isNaN(v) ? 'rgba(200,200,200,0.15)' : 'rgba(231,76,60,0.8)'),
        borderColor: 'rgba(231,76,60,1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: ${dayName} (${dateKey}) の各時間 入室累計の最高値
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: '入室累計（人）' }
        }
      }
    }
  });
}

function destroyCharts() {
  if (liveChart) { try { liveChart.destroy(); } catch(e){} liveChart = null; }
  if (hourlyChart) { try { hourlyChart.destroy(); } catch(e){} hourlyChart = null; }
}
