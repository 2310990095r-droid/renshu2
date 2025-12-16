// === 設定 ===
const STATS_URL = 'https://script.google.com/macros/s/AKfycbyonfBxtUhtzZJ8HU4suXqyxtu3JRAzaH3Bwl8zQbeh6dvwc6KUeb_jn_hg9hrjslxK/exec';
const DOW_MAP = {1:'月曜日',2:'火曜日',3:'水曜日',4:'木曜日',5:'金曜日',6:'土曜日',7:'日曜日'};
let allStatsData = [];
let statsChart = null;
let todayCrowdChart = null;
let weeklyComparisonChart = null;

const BUSINESS_START = 9;
const BUSINESS_END = 19;
const UPDATE_INTERVAL_MS = 30000; // 30秒ごとに今日の混雑グラフを更新

// === 初期化 ===
document.addEventListener('DOMContentLoaded', function() {
  // 統計データ（曜日・時間帯別）の取得と初期描画
  fetchAndProcessStats();

  // リアルタイム/比較データの取得と定期更新
  fetchTodayCrowdData();
  fetchWeeklyComparisonData();
  
  // 今日の混雑状況グラフを定期的に更新（リアルタイム性）
  setInterval(fetchTodayCrowdData, UPDATE_INTERVAL_MS);

  // 曜日選択ドロップダウンの処理
  const selectElement = document.getElementById('dow-select');
  if (selectElement) {
    // JSのgetDay(): 0=日..6=土 -> convert 0 to 7
    const raw = new Date().getDay();
    const currentDow = (raw === 0) ? 7 : raw;
    selectElement.value = String(currentDow);

    selectElement.addEventListener('change', function() {
      const v = parseInt(this.value);
      renderStatsChart(Number.isNaN(v) ? currentDow : v);
    });
  }
});


// =========================================================
// === 1. 今日の混雑状況 (リアルタイム) ===
// =========================================================

async function fetchTodayCrowdData() {
  const statusEl = document.getElementById('today-status');
  try {
    const url = STATS_URL + '?mode=today_crowd'; // APIモードを仮定
    const resp = await fetch(url, { cache: 'no-cache' });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    
    // データ構造: [{ hour: 9, current: 10 }, { hour: 10, current: 15 }, ...]
    const data = await resp.json(); 
    if (data && data.error) throw new Error('API error: ' + data.error);
    if (!data || !Array.isArray(data.crowd_data)) throw new Error("Invalid JSON: no 'crowd_data' array");
    
    const crowdData = data.crowd_data.map(item => ({
      hour: Number(item.hour),
      current: Number(item.current)
    }));
    
    // 現在の混雑状況のテキスト更新 (最新の値を取得)
    const latestCrowd = crowdData.length > 0 ? crowdData[crowdData.length - 1].current : '不明';
    const currentTime = new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
    statusEl.textContent = `✅ ${currentTime} 現在の人数: ${latestCrowd}人 (${UPDATE_INTERVAL_MS/1000}秒ごとに更新中)`;
    
    renderTodayCrowdChart(crowdData);

  } catch (err) {
    console.error('fetchTodayCrowdData error:', err);
    statusEl.textContent = '⚠️ 今日のデータ取得エラー: ' + (err.message || err);
  }
}

function renderTodayCrowdChart(data) {
  if (!Array.isArray(data) || data.length === 0) {
    // データがない場合の処理
    if (todayCrowdChart) todayCrowdChart.destroy();
    return;
  }
  
  const labels = data.map(d => `${d.hour}:00`);
  const crowdValues = data.map(d => d.current);
  
  if (todayCrowdChart) {
    try { todayCrowdChart.destroy(); } catch(e){/*ignore*/ }
  }

  const ctx = document.getElementById('todayCrowdChart').getContext('2d');
  todayCrowdChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: '現在の人数',
        data: crowdValues,
        borderColor: 'rgba(46, 204, 113, 1)',
        backgroundColor: 'rgba(46, 204, 113, 0.2)',
        tension: 0.3,
        fill: true,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: '今日のリアルタイム混雑状況' },
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: '人数' } }
      }
    }
  });
}


// =========================================================
// === 2. 前週の同じ曜日比較 ===
// =========================================================

async function fetchWeeklyComparisonData() {
  const statusEl = document.getElementById('weekly-status');
  try {
    const url = STATS_URL + '?mode=weekly_comparison'; // APIモードを仮定
    const resp = await fetch(url, { cache: 'no-cache' });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    
    // データ構造: { today: [...], lastWeek: [...] } 
    // 各配列は: [{ hour: 9, current: 10 }, ...]
    const data = await resp.json(); 
    if (data && data.error) throw new Error('API error: ' + data.error);
    if (!data || !Array.isArray(data.today) || !Array.isArray(data.lastWeek)) {
      throw new Error("Invalid JSON for comparison data");
    }
    
    statusEl.textContent = '✅ 前週比較データを読み込みました。';
    
    renderWeeklyComparisonChart(data.today, data.lastWeek);

  } catch (err) {
    console.error('fetchWeeklyComparisonData error:', err);
    statusEl.textContent = '⚠️ 前週比較データ取得エラー: ' + (err.message || err);
  }
}

function renderWeeklyComparisonChart(todayData, lastWeekData) {
  // 比較のため、データを時間帯ラベルで揃える（ここでは今日データに合わせています）
  const labels = todayData.map(d => `${d.hour}:00`);
  const todayValues = todayData.map(d => d.current);
  
  // lastWeekDataから対応する時間帯の値を取得（時間帯が一致しない場合はnull）
  const lastWeekMap = new Map(lastWeekData.map(d => [`${d.hour}:00`, d.current]));
  const lastWeekValues = labels.map(label => lastWeekMap.get(label) || NaN); // NaNでデータがないことを示す

  if (weeklyComparisonChart) {
    try { weeklyComparisonChart.destroy(); } catch(e){/*ignore*/ }
  }

  const ctx = document.getElementById('weeklyComparisonChart').getContext('2d');
  weeklyComparisonChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: '今日',
          data: todayValues,
          borderColor: 'rgba(52, 152, 219, 1)',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          tension: 0.2,
          fill: false,
          pointRadius: 4,
          borderWidth: 2
        },
        {
          label: '先週の同じ曜日',
          data: lastWeekValues,
          borderColor: 'rgba(230, 126, 34, 1)',
          backgroundColor: 'rgba(230, 126, 34, 0.1)',
          tension: 0.2,
          fill: false,
          borderDash: [5, 5],
          pointRadius: 3,
          borderWidth: 1.5
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: '今日 vs 先週の同じ曜日' }
      },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: '人数' } }
      }
    }
  });
}


// =========================================================
// === 3. 曜日・時間帯別 平均混雑状況 (統計) - 元のコードを保持 ===
// =========================================================

// fetch + parse
async function fetchAndProcessStats() {
  try {
    const url = STATS_URL + '?mode=by_dow_hour';
    const resp = await fetch(url, { cache: 'no-cache' });
    if (!resp.ok) throw new Error(`HTTP ${resp.status} ${resp.statusText}`);

    const data = await resp.json();
    // If API returns { error: "..." }
    if (data && data.error) throw new Error('API error: ' + data.error);

    if (!data || !Array.isArray(data.by_dow_hour)) {
      throw new Error("Invalid JSON: no 'by_dow_hour' array");
    }

    // normalize: ensure numeric types and map into simple structure
    allStatsData = data.by_dow_hour.map(item => ({
      hour: Number(item.hour),
      dow: Number(item.dow),
      avg_current: (item.avg_current === null || item.avg_current === '' ? null : Number(item.avg_current)),
      max_current: (item.max_current === null || item.max_current === '' ? null : Number(item.max_current)),
      samples: Number(item.samples || 0)
    }));

    document.getElementById('stats-status').textContent = '✅ 統計データを読み込みました。';

    // 初期描画
    const initialDow = parseInt(document.getElementById('dow-select').value);
    renderStatsChart(Number.isNaN(initialDow) ? (new Date().getDay()||7) : initialDow);

  } catch (err) {
    console.error('fetchAndProcessStats error:', err);
    const el = document.getElementById('stats-status');
    if (el) el.textContent = '⚠️ 統計データ取得エラー: ' + (err.message || err);
  }
}

// 描画関数（9〜19 を必ず表示する）
function renderStatsChart(selectedDow) {
  if (!Array.isArray(allStatsData) || allStatsData.length === 0) {
    console.warn('no data to render');
    return;
  }

  // build buckets for hours 9..19 (to avoid missing-hour mismatch)
  const hours = [];
  for (let h = BUSINESS_START; h <= BUSINESS_END; h++) hours.push(h);

  // prepare arrays filled with nulls
  const avgArr = hours.map(() => null);
  const maxArr = hours.map(() => null);
  const samplesArr = hours.map(() => 0);

  // fill from data (multiple entries shouldn't exist for same dow/hour but merge if they do)
  const filtered = allStatsData.filter(it => Number(it.dow) === Number(selectedDow));
  filtered.forEach(it => {
    if (it.hour < BUSINESS_START || it.hour > BUSINESS_END) return;
    const idx = it.hour - BUSINESS_START;
    // if multiple entries exist, take average of avg_current? We'll merge by weighted average:
    if (it.avg_current !== null) {
      if (avgArr[idx] === null) {
        avgArr[idx] = it.avg_current;
      } else {
        // merge by simple average of the two values (or use samples weighting if you prefer)
        avgArr[idx] = ( (avgArr[idx] || 0) + it.avg_current ) / 2;
      }
    }
    if (it.max_current !== null) {
      if (maxArr[idx] === null) maxArr[idx] = it.max_current;
      else maxArr[idx] = Math.max(maxArr[idx], it.max_current);
    }
    samplesArr[idx] = (samplesArr[idx] || 0) + (Number(it.samples) || 0);
  });

  const labels = hours.map(h => `${h}:00`);
  const avgData = avgArr.map(v => v === null ? NaN : v); // Chart.js treats NaN as gap
  const maxData = maxArr.map(v => v === null ? NaN : v);

  const dayName = DOW_MAP[selectedDow] || `曜日 ${selectedDow}`;

  // destroy existing chart
  if (statsChart) {
    try { statsChart.destroy(); } catch(e){/*ignore*/ }
  }

  const ctx = document.getElementById('weeklyStatsChart').getContext('2d');
  statsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: '平均人数 (avg_current)',
          data: avgData,
          backgroundColor: avgData.map(v => isNaN(v) ? 'rgba(200,200,200,0.15)' : 'rgba(52,152,219,0.8)'),
          borderColor: 'rgba(52,152,219,1)',
          borderWidth: 1,
          order: 2
        },
        {
          label: '最大人数 (max_current)',
          data: maxData,
          type: 'line',
          borderColor: 'rgba(231,76,60,1)',
          backgroundColor: 'rgba(231,76,60,0.12)',
          fill: true,
          tension: 0.2,
          order: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: `${dayName} の時間別 平均/最大混雑状況 (9:00〜19:00)` },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const idx = ctx.dataIndex;
              const dsLabel = ctx.dataset.label || '';
              const v = ctx.dataset.data[idx];
              const valText = (v === null || isNaN(v)) ? 'データ無し' : `${v}`;
              const samples = samplesArr[idx] || 0;
              return `${dsLabel}: ${valText} （samples: ${samples}）`;
            }
          }
        }
      },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: '人数' } }
      }
    }
  });
}
