// Google Sheetsの公開 JSON URL (既存のCSV URLとは別)
// 統計データ取得のため、GAS側でJSONを返すロジックが必要です (例: doGet?mode=by_dow_hour)
// 今回は提供されたURLをそのまま使用し、JSON形式で返ってくることを前提とします。
const STATS_URL = 'https://script.google.com/macros/s/AKfycbyonfBxtUhtzZJ8HU4suXqyxtu3JRAzaH3Bwl8zQbeh6dvwc6KUeb_jn_hg9hrjslxK/exec';

let allStatsData = [];
let statsChart = null; // Chartインスタンスを保持

// 曜日のマッピング
const DOW_MAP = {
    1: '月曜日', 2: '火曜日', 3: '水曜日', 4: '木曜日', 5: '金曜日', 6: '土曜日', 7: '日曜日'
};

document.addEventListener('DOMContentLoaded', function() {
    // 1. データ取得
    fetchAndProcessStats();
    
    // 2. 曜日選択UIにイベントリスナーを設定
    const selectElement = document.getElementById('dow-select');
    if (selectElement) {
        // デフォルトで今日の曜日を選択する (JavaScriptのgetDay()は日:0〜土:6)
        const currentDow = new Date().getDay() || 7; // 日曜 (0) を 7 に変換
        selectElement.value = currentDow.toString();
        
        // 選択が変更されたらグラフを再描画
        selectElement.addEventListener('change', function() {
            renderStatsChart(parseInt(this.value));
        });
    }
});


// --- 1. JSONデータの取得と解析 ---
async function fetchAndProcessStats() {
    try {
        // GAS URLにモードパラメータを付けて、JSON応答を期待する (GAS側の対応が必要)
        const response = await fetch(STATS_URL + '?mode=by_dow_hour'); 
        
        if (!response.ok) {
            throw new Error(`HTTPエラー! ステータス: ${response.status}`);
        }
        
        // JSONデータを取得
        const data = await response.json(); 
        
        // データ構造の検証
        if (data && Array.isArray(data.by_dow_hour)) {
            allStatsData = data.by_dow_hour;
            document.getElementById('stats-status').textContent = '✅ 統計データを読み込みました。';

            // 初期描画: 選択されている曜日のグラフを表示
            const initialDow = parseInt(document.getElementById('dow-select').value);
            renderStatsChart(initialDow);
        } else {
            throw new Error("JSONデータに 'by_dow_hour' の配列が見つかりません。");
        }

    } catch (error) {
        console.error("統計データ取得または解析に失敗しました:", error);
        document.getElementById('stats-status').textContent = '⚠️ 統計データ取得エラー: グラフを表示できません。GASの出力形式を確認してください。';
    }
}


// --- 2. グラフ描画（Chart.js）ロジック ---
function renderStatsChart(selectedDow) {
    if (allStatsData.length === 0) return;

    // 選択された曜日のデータのみをフィルタリング
    const filteredData = allStatsData
        .filter(item => item.dow === selectedDow && item.hour >= 9 && item.hour <= 19)
        .sort((a, b) => a.hour - b.hour); // 時間でソート

    // グラフ用データの準備
    const labels = filteredData.map(item => `${item.hour}:00`);
    const avgData = filteredData.map(item => item.avg);
    const maxData = filteredData.map(item => item.max);
    
    const dayName = DOW_MAP[selectedDow];

    // 既存のグラフがあれば破棄
    if (statsChart) statsChart.destroy();

    const ctx = document.getElementById('weeklyStatsChart').getContext('2d');
    statsChart = new Chart(ctx, {
        type: 'bar', // 棒グラフ
        data: {
            labels: labels,
            datasets: [
                {
                    label: '平均人数 (avg_current)',
                    data: avgData,
                    backgroundColor: 'rgba(52, 152, 219, 0.7)', // 青
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1,
                    type: 'bar', // 棒グラフとして描画
                    order: 2
                },
                {
                    label: '最大人数 (max_current)',
                    data: maxData,
                    borderColor: 'rgba(231, 76, 60, 1)', // 赤
                    backgroundColor: 'rgba(231, 76, 60, 0.2)',
                    type: 'line', // 折れ線グラフとして描画
                    fill: true,
                    tension: 0.2,
                    order: 1 // 平均より手前に表示
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `${dayName} の時間別 平均/最大混雑状況 (9:00〜19:00)`,
                    font: { size: 16 }
                },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            const dataIndex = context.dataIndex;
                            const samples = filteredData[dataIndex].samples;
                            return `サンプル数: ${samples}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '人数'
                    }
                }
            }
        }
    });
}
