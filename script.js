// script.js

// 筋トレサポートダッシュボード (index.html向け) の機能は全て削除されました。
// 現在のファイルでは、Google Apps Script (GAS) からJSONデータを取得し、
// Chart.jsを使ってグラフを動的に描画します。

const GAS_API_URL = 'https://script.google.com/a/macros/hiro.kindai.ac.jp/s/AKfycbw20uk14AdOpGG11X0ZSuDEGIj5GE4rwzGKdJS2qA0UqPf1Opa0Z0DNQ11DkgOjUFi9/exec';

document.addEventListener('DOMContentLoaded', function() {
    // ページロード時と、定期的にデータを取得して描画
    fetchAndRenderData();
    // リアルタイム更新（例: 5分ごと = 300000ミリ秒）
    setInterval(fetchAndRenderData, 300000); 
});

async function fetchAndRenderData() {
    try {
        // AJAXリクエストの実行
        const response = await fetch(GAS_API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTPエラー! ステータス: ${response.status}`);
        }
        
        // JSONデータのパース
        // 構造: {"today": [{"time": "...", "count": ...}, ...], "lastWeek": [...]} を想定
        const crowdData = await response.json();
        
        // データの描画関数を呼び出す
        renderCharts(crowdData);
        updateStatusMessage(crowdData);

    } catch (error) {
        console.error("データの取得または描画に失敗しました:", error);
        // エラーメッセージをユーザーに表示
        document.getElementById('today-status').textContent = '⚠️ データ取得エラー: グラフの表示に失敗しました。';
        document.getElementById('weekly-status').textContent = '⚠️ データ取得エラー: グラフの表示に失敗しました。';
    }
}


function renderCharts(data) {
    // 描画用のデータセットを抽出・整形
    const timeLabels = data.today.map(item => item.time);
    const todayCounts = data.today.map(item => item.count);
    const lastWeekCounts = data.lastWeek.map(item => item.count);

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

function updateStatusMessage(data) {
    // 最新のデータポイントを取得
    const latest = data.today[data.today.length - 1];
    if (latest) {
        const status = latest.count >= 25 ? '「高」' : (latest.count >= 15 ? '「中」' : '「低」');
        document.getElementById('today-status').innerHTML = `※ **現在時刻 ${latest.time}** の混雑度は<span style="color: ${latest.count >= 25 ? '#e74c3c' : '#3498db'}; font-weight: bold;">${status}</span>です。`;
    }

    // 比較メッセージを更新 (簡易的な判定)
    const todayAvg = todayCounts.reduce((a, b) => a + b, 0) / todayCounts.length;
    const lastWeekAvg = lastWeekCounts.reduce((a, b) => a + b, 0) / lastWeekCounts.length;
    let comparisonText = '前週とほぼ同じ混雑傾向です。';
    if (todayAvg > lastWeekAvg * 1.1) {
        comparisonText = '<span style="color: #e74c3c; font-weight: bold;">今週は前週よりも全体的に混雑しています。</span>';
    } else if (todayAvg < lastWeekAvg * 0.9) {
        comparisonText = '<span style="color: #3498db; font-weight: bold;">今週は前週よりも全体的に空いています。</span>';
    }
    document.getElementById('weekly-status').innerHTML = `※ ${comparisonText}`;
}
