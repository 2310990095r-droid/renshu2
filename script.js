// === 設定 ===
const STATS_URL = 'https://script.google.com/macros/s/AKfycbyonfBxtUhtzZJ8HU4suXqyxtu3JRAzaH3Bwl8zQbeh6dvwc6KUeb_jn_hg9hrjslxK/exec';
const DOW_MAP = {1:'月曜日',2:'火曜日',3:'水曜日',4:'木曜日',5:'金曜日',6:'土曜日',7:'日曜日'};
let allStatsData = [];
let statsChart = null;
const BUSINESS_START = 9;
const BUSINESS_END = 19;

// === 初期化 ===
document.addEventListener('DOMContentLoaded', function() {
  fetchAndProcessStats();

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

// === fetch + parse ===
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

// === 描画関数（9〜19 を必ず表示する） ===
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
        title: { display: true, text: ${dayName} の時間別 平均/最大混雑状況 (9:00〜19:00) },
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
