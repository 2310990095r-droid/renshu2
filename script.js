// script.js

// Google Sheetsの公開CSV URL
const CSV_URL = 'https://script.google.com/macros/s/AKfycbyonfBxtUhtzZJ8HU4suXqyxtu3JRAzaH3Bwl8zQbeh6dvwc6KUeb_jn_hg9hrjslxK/exec';

document.addEventListener('DOMContentLoaded', function() {
    // ページロード時と、定期的にデータを取得して描画
    fetchAndProcessCSV();
    // リアルタイム更新（例: 5分ごと = 300000ミリ秒）
    setInterval(fetchAndProcessCSV, 300000); 
});

// --- 1. CSVデータの取得とデコード (response.text()でロバスト化) ---
async function fetchAndProcessCSV() {
    try {
        const response = await fetch(CSV_URL);
        
        if (!response.ok) {
            throw new Error(`HTTPエラー! ステータス: ${response.status}`);
        }
        
        // 以前の ArrayBuffer + TextDecoder によるデコードの代わりに
        // response.text() を使用して、エンコーディング自動判別による文字化けを防ぐ
        const csvText = await response.text();
        
        // CSVデータを解析
        const parsedData = parseCSV(csvText);
        
        // データの描画関数を呼び出す
        renderCharts(parsedData);
        updateStatusMessage(parsedData);

    } catch (error) {
        console.error("データ取得または描画に失敗しました:", error);
        // エラーメッセージをユーザーに表示
        document.getElementById('today-status').textContent = '⚠️ データ取得エラー: グラフの表示に失敗しました。';
        document.getElementById('weekly-status').textContent = '⚠️ データ取得エラー: グラフの表示に失敗しました。';
    }
}


// --- 2. CSV解析ロジック ---
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return { timeLabels: [], todayCounts: [], lastWeekCounts: [] };

    // ヘッダー行をスキップし、データ行のみを取得
    const dataLines = lines.slice(1);
    
    const timeLabels = [];
    const todayCounts = [];
    const lastWeekCounts = [];
    
    // 各行を処理
    dataLines.forEach(line => {
        // カンマ区切りで分割。トリムで前後の空白を削除
        const columns = line.split(',').map(col => col.trim());
        
        // Time, TodayCount, LastWeekCount の順序を想定
        const time = columns[0];
        const todayCount = parseInt(columns[1], 10); // 数値に変換
        const lastWeekCount = parseInt(columns[2], 10); // 数値に変換

        if (time && !isNaN(todayCount) && !isNaN(lastWeekCount)) {
            timeLabels.push(time);
            todayCounts.push(todayCount);
            lastWeekCounts.push(lastWeekCount);
        }
    });

    return { timeLabels, todayCounts, lastWeekCounts };
}

// --- 3. グラフ描画（Chart.js）ロジック ---
function renderCharts(data) {
    const { timeLabels, todayCounts, lastWeekCounts } = data;

    // 既存のグラフがあれば破棄（リアルタイム更新のため）
    if (window.todayChart) window.todayChart.destroy();
    if (window.comparisonChart) window.comparisonChart.destroy();

    // --- 1. 今日の混雑状況グラフ (棒グラフ) ---
    const todayCtx = document.getElementById('todayCrowdChart').getContext('2d');
    window.todayChart = new Chart(todayCtx, {
        type: 'bar',
        data: {
            labels: timeLabels,
            datasets: [{
                label: '今日の人数',
                data: todayCounts,
                backgroundColor: todayCounts.map(count => count >= 25 ? 'rgba(231, 76, 60, 0.8)' : 'rgba(52, 152, 219, 0.7)'), // 25人以上で赤色に
                borderColor: todayCounts.map(count => count >= 25 ? 'rgba(231, 76, 60, 1)' : 'rgba(52, 152, 219, 1)'),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '人数'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // 凡例を非表示
                }
            }
        }
    });

    // --- 2. 前週との比較グラフ (折れ線グラフ) ---
    const comparisonCtx = document.getElementById('weeklyComparisonChart').getContext('2d');
    window.comparisonChart = new Chart(comparisonCtx, {
        type: 'line', // 折れ線グラフ
        data: {
            labels: timeLabels,
            datasets: [
                {
                    label: '今日の人数',
                    data: todayCounts,
                    borderColor: 'rgba(231, 76, 60, 1)', // #e74c3c
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    fill: false,
                    tension: 0.3
                },
                {
                    label: '前週の人数',
                    data: lastWeekCounts,
                    borderColor: 'rgba(52, 152, 219, 1)', // #3498db
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    fill: false,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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

// --- 4. ステータスメッセージの更新ロジック ---
function updateStatusMessage(data) {
    const { timeLabels, todayCounts, lastWeekCounts } = data;
    
    // 最新のデータポイントを取得
    const latestCount = todayCounts[todayCounts.length - 1];
    const latestTime = timeLabels[timeLabels.length - 1];

    if (latestCount !== undefined && latestTime) {
        const status = latestCount >= 25 ? '「高」' : (latestCount >= 15 ? '「中」' : '「低」');
        document.getElementById('today-status').innerHTML = `※ **現在時刻 ${latestTime}** の混雑度は<span style="color: ${latestCount >= 25 ? '#e74c3c' : '#3498db'}; font-weight: bold;">${status}</span>です。`;
    } else {
        document.getElementById('today-status').textContent = '⚠️ データが取得できていません。';
    }

    // 比較メッセージを更新 (簡易的な判定)
    const todayAvg = todayCounts.reduce((a, b) => a + b, 0) / (todayCounts.length || 1);
    const lastWeekAvg = lastWeekCounts.reduce((a, b) => a + b, 0) / (lastWeekCounts.length || 1);
    let comparisonText = '前週とほぼ同じ混雑傾向です。';
    if (todayAvg > lastWeekAvg * 1.1 && todayAvg > 0) {
        comparisonText = '<span style="color: #e74c3c; font-weight: bold;">今週は前週よりも全体的に混雑しています。</span>';
    } else if (todayAvg < lastWeekAvg * 0.9 && lastWeekAvg > 0) {
        comparisonText = '<span style="color: #3498db; font-weight: bold;">今週は前週よりも全体的に空いています。</span>';
    }
    document.getElementById('weekly-status').innerHTML = `※ ${comparisonText}`;
}
