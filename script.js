document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-log-btn');
    const exerciseSelect = document.getElementById('exercise');
    const weightInput = document.getElementById('weight');
    const repsSelect = document.getElementById('reps');
    const setsSelect = document.getElementById('sets');
    const pastLogsContainer = document.getElementById('past-logs');
    const logAnalyticsContainer = document.getElementById('log-analytics');

    const LOG_STORAGE_KEY = 'trainingLogs';

    // -----------------------------------------------------
    // 1. 筋トレ飯のランダム表示機能 (変更なし)
    // -----------------------------------------------------
    const recommendedMeals = [
        // 既存の豊富なメニューデータ（省略）
        { name: "鶏むね肉とブロッコリーの和風炒め", calorie: "約450 kcal", recipe: "鶏むね肉とブロッコリーを酒・醤油・生姜で炒める。", points: ["高タンパク質: 鶏むね肉で筋肉の材料をたっぷり補給。", "ビタミンC: ブロッコリーで免疫力とコラーゲン生成をサポート。"] },
        { name: "鮭の味噌マヨホイル焼き＆玄米", calorie: "約550 kcal", recipe: "鮭と野菜を味噌マヨネーズで包みホイルで焼く。玄米と合わせる。", points: ["良質な脂質: 鮭に含まれるDHA・EPA（オメガ3脂肪酸）が回復をサポート。", "複合炭水化物: 玄米でエネルギーを長時間供給し、インスリンを安定化。"] },
        { name: "マグロとアボカドのポキ丼", calorie: "約500 kcal", recipe: "マグロとアボカドを醤油・ごま油で和え、ご飯に乗せる。", points: ["良質なタンパク質: マグロでアミノ酸を効率よく摂取。", "ミネラル・ビタミンE: アボカドで抗酸化作用とホルモンバランスをサポート。"] },
        { name: "牛赤身肉とキノコのオイスターソース炒め", calorie: "約480 kcal", recipe: "牛赤身肉とキノコ類をオイスターソースで手早く炒める。", points: ["鉄分・亜鉛: 牛肉で酸素運搬能力と代謝を向上。", "食物繊維: キノコで腸内環境を整え、栄養吸収を促進。"] },
        { name: "鯖缶と納豆のパワーサラダ", calorie: "約400 kcal", recipe: "鯖缶、納豆、野菜を混ぜ、ポン酢やオリーブオイルで味付け。", points: ["オメガ3脂肪酸: 鯖缶で炎症を抑え、回復を促進。", "プロバイオティクス: 納豆で腸内環境を改善し、栄養の吸収率を高める。"] },
        { name: "豚ヒレ肉のソテーとレンズ豆のポタージュ", calorie: "約520 kcal", recipe: "豚ヒレ肉をシンプルに焼き、レンズ豆を煮込んだポタージュと。 ", points: ["ビタミンB1: 豚ヒレ肉で疲労回復と糖質の代謝をサポート。", "複合炭水化物: レンズ豆で持続的なエネルギーと食物繊維を摂取。"] },
        { name: "エビとアスパラガスのガーリック炒め", calorie: "約380 kcal", recipe: "エビとアスパラガスをニンニク、オリーブオイル、塩胡椒で炒める。", points: ["低脂質・高タンパク質: エビは良質なアミノ酸が豊富で低カロリー。", "葉酸・カリウム: アスパラガスでミネラルバランスを調整。"] },
        { name: "鶏レバーの甘辛煮とほうれん草の和え物", calorie: "約430 kcal", recipe: "鶏レバーを醤油・砂糖・生姜で煮る。ほうれん草はごま和えに。", points: ["鉄分・ビタミンA: 鶏レバーで貧血予防と粘膜の健康を維持。", "ビタミンK・カルシウム: 骨の健康をサポート。"] },
        { name: "豆腐とわかめの味噌汁＋鶏むね肉の棒棒鶏", calorie: "約470 kcal", recipe: "鶏むね肉を茹で、ネギ・醤油・酢・ごま油のタレでいただく。", points: ["大豆タンパク質: 豆腐で消化吸収のよいタンパク質を摂取。", "セサミン: ごまに含まれる成分が肝機能をサポート。"] },
        { name: "茹で卵と全粒粉パンのオープンサンド", calorie: "約350 kcal", recipe: "全粒粉パンにアボカドや茹で卵を乗せ、軽く塩胡椒。", points: ["完全栄養食: 卵は必須アミノ酸のバランスが完璧。", "低GI・複合炭水化物: 全粒粉パンで血糖値の急上昇を抑える。"] }
    ];

    function displayRandomMeal() {
        const mealContainer = document.querySelector('#recommended-meal .meal-detail');
        const randomIndex = Math.floor(Math.random() * recommendedMeals.length);
        const meal = recommendedMeals[randomIndex];
        
        let html = `
            <p><strong>メニュー名:</strong> ${meal.name}</p>
            <h3>栄養ポイント</h3>
            <ul>
                ${meal.points.map(point => `<li>${point}</li>`).join('')}
            </ul>
            <div class="detail-info">
                <p><strong>🔥 推定カロリー:</strong> ${meal.calorie}</p>
                <p><strong>📝 調理方法:</strong> ${meal.recipe}</p>
            </div>
        `;
        mealContainer.innerHTML = html;
    }
    
    displayRandomMeal();


    // -----------------------------------------------------
    // 2. ログの永続化・表示・削除機能
    // -----------------------------------------------------
    
    // ページロード時に実行
    function initializeLogSystem() {
        loadLogs();
        renderAnalytics(); // ログデータ読み込み後に分析も実行
        setupAnalyticsTabs(); // タブ切り替えの設定
    }
    initializeLogSystem();

    function saveLogs(logs) {
        localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(logs));
    }

    function loadLogs() {
        pastLogsContainer.innerHTML = '';
        
        const storedLogs = localStorage.getItem(LOG_STORAGE_KEY);
        // logsにweight, reps, sets, exerciseValue, partなどの分析に必要な情報も含まれる
        let logs = storedLogs ? JSON.parse(storedLogs) : [];
        
        // ログをHTMLに表示
        logs.forEach(log => {
            appendLogToHTML(log, false); 
        });
        return logs;
    }
    
    // ログエントリをHTMLに追加する共通関数
    function appendLogToHTML(log, prepend = true) {
        // ... (HTML要素作成ロジックは変更なし) ...
        const newLogEntry = document.createElement('div');
        newLogEntry.classList.add('log-entry');
        
        newLogEntry.dataset.logId = log.id; 

        const header = document.createElement('strong');
        header.textContent = `${log.date} - ${log.part}`;
        newLogEntry.appendChild(header);

        const detailP = document.createElement('p');
        detailP.textContent = log.detail;
        newLogEntry.appendChild(detailP);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-log-btn');
        deleteBtn.textContent = '削除';
        deleteBtn.addEventListener('click', handleDeleteLog);
        newLogEntry.appendChild(deleteBtn);

        if (prepend && pastLogsContainer.firstElementChild) {
            pastLogsContainer.insertBefore(newLogEntry, pastLogsContainer.firstElementChild);
        } else {
            pastLogsContainer.appendChild(newLogEntry);
        }
    }

    // 削除処理の本体（★永続化の確認済み）
    function handleDeleteLog(event) {
        const logEntry = event.target.closest('.log-entry');
        const logIdToDelete = parseInt(logEntry.dataset.logId); 
        
        if (!confirm('このログを削除してもよろしいですか？')) {
            return;
        }

        // 1. localStorageからログを読み込む
        const storedLogs = localStorage.getItem(LOG_STORAGE_KEY);
        let currentLogs = storedLogs ? JSON.parse(storedLogs) : [];
        
        // 2. 該当IDのログを配列から除外
        const updatedLogs = currentLogs.filter(log => log.id !== logIdToDelete);
        
        // 3. 削除後の配列をlocalStorageに上書き保存 (永続化)
        saveLogs(updatedLogs); 
        
        // 4. 画面上の要素を削除
        logEntry.remove();
        
        // 5. 分析グラフを更新
        renderAnalytics();

        alert('ログを削除しました。');
    }
    
    // -----------------------------------------------------
    // 3. ログ記録時の処理
    // -----------------------------------------------------

    addButton.addEventListener('click', function() {
        // 1. 入力値の取得
        const exerciseText = exerciseSelect.options[exerciseSelect.selectedIndex].text;
        const exerciseValue = exerciseSelect.value;
        const exerciseName = exerciseText.split(' ')[0]; 
        const weight = parseInt(weightInput.value);
        const reps = parseInt(repsSelect.value);
        const sets = parseInt(setsSelect.value);
        
        if (isNaN(weight) || weight <= 0 || isNaN(reps) || isNaN(sets)) {
             alert('重量、回数、セット数は正しく入力してください。');
             return;
        }

        // ... (日付、部位判定ロジックは省略) ...
        const now = new Date();
        const dateString = now.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/');
        const dayOfWeek = now.toLocaleDateString('ja-JP', { weekday: 'short' });
        const fullDate = `${dateString} (${dayOfWeek})`;
        
        let part = 'その他';
        if (['benchpress', 'incline_press', 'dumbbell_press', 'pec_fly', 'push_up'].includes(exerciseValue)) {
            part = '胸';
        } else if (['deadlift', 'latpulldown', 'bentover_row', 'seated_row', 'pull_up'].includes(exerciseValue)) {
            part = '背中';
        } else if (['squat', 'leg_press', 'romanian_deadlift', 'leg_extension', 'leg_curl', 'calf_raise'].includes(exerciseValue)) {
            part = '脚';
        } else if (['shoulderpress', 'side_raise', 'front_raise', 'reverse_fly'].includes(exerciseValue)) {
            part = '肩';
        } else if (['armcurl', 'triceps_extension', 'hammer_curl', 'cable_pushdown'].includes(exerciseValue)) {
            part = '腕';
        } else if (['crunch', 'leg_raise', 'plank', 'russian_twist'].includes(exerciseValue)) {
            part = '体幹';
        }

        const weightDisplay = (weight > 0) ? `${weight}kg` : '自重';
        const detailString = `${exerciseName}: ${weightDisplay} × ${reps}回 × ${sets}セット`;

        // 3. 新しいログオブジェクトを作成 (分析に必要な全データを含める)
        const newLog = {
            id: Date.now(), 
            date: fullDate,
            exerciseValue: exerciseValue, // 種目の値を追加
            weight: weight,
            reps: reps,
            sets: sets,
            part: part,
            detail: detailString
        };
        
        // 4. localStorageのデータを更新
        const currentLogsString = localStorage.getItem(LOG_STORAGE_KEY);
        let currentLogs = currentLogsString ? JSON.parse(currentLogsString) : [];
        currentLogs.unshift(newLog);
        saveLogs(currentLogs);

        // 5. HTMLに表示 (先頭に追加)
        appendLogToHTML(newLog, true);
        
        // 6. 分析グラフを更新
        renderAnalytics();

        // 7. 入力値をリセット
        // ユーザーが前回入力した値を維持したい可能性もあるため、今回は種目以外をリセットする
        weightInput.value = '60'; 
        repsSelect.value = '10';
        setsSelect.value = '3';
        // exerciseSelect.value は現在の選択を維持
        
        alert('トレーニングログを記録しました！');
    });

    // -----------------------------------------------------
    // 4. ログ分析機能 (グラフと表)
    // -----------------------------------------------------

    // Estimated 1 Repetition Maximum (Epleyの公式)
    function calculate1RM(weight, reps) {
        if (reps === 0 || weight === 0) return 0;
        if (reps === 1) return weight;
        return Math.round(weight * (1 + (reps / 30)));
    }

    // ログ分析のメイン実行関数
    function renderAnalytics() {
        const logs = loadLogs().filter(log => log.weight > 0 && log.reps > 0);
        if (logs.length === 0) {
            logAnalyticsContainer.style.display = 'none';
            return;
        }
        logAnalyticsContainer.style.display = 'block';

        renderVolumeGraph(logs);
        renderSummaryTable(logs);
    }
    
    // 【グラフ描画】週間トレーニングボリューム
    function renderVolumeGraph(logs) {
        const volumeData = {}; // { date_key: total_volume }
        const today = new Date();
        
        // 過去7日間の日付キーを初期化 (ボリューム0で)
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateKey = date.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' });
            volumeData[dateKey] = 0;
        }

        // ログを最新から順に処理し、過去7日間のボリュームを集計
        logs.forEach(log => {
            const logDate = new Date(log.id); // ID (タイムスタンプ) から日付を取得
            const dateKey = logDate.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' });
            
            // ログが過去7日間の範囲内であればボリュームを追加
            if (dateKey in volumeData) {
                // ボリューム = 重量 × 回数 × セット数
                const volume = log.weight * log.reps * log.sets;
                volumeData[dateKey] += volume;
            }
        });
        
        // データを日付順（古い順）にソート
        const sortedDates = Object.keys(volumeData).sort((a, b) => {
             // mm/dd 形式をソート可能にする（簡単なソート）
             const [aM, aD] = a.split('/').map(Number);
             const [bM, bD] = b.split('/').map(Number);
             if (aM !== bM) return aM - bM;
             return aD - bD;
        });

        // グラフ描画
        const chartContainer = document.querySelector('#volume-graph .bar-chart-container');
        chartContainer.innerHTML = '';
        
        const volumes = sortedDates.map(date => volumeData[date]);
        const maxVolume = Math.max(...volumes);

        sortedDates.forEach(date => {
            const volume = volumeData[date];
            const height = maxVolume > 0 ? (volume / maxVolume) * 100 : 0;
            const bar = document.createElement('div');
            bar.classList.add('chart-bar');
            bar.style.height = `${height}%`;
            
            bar.innerHTML = `
                <span class="chart-bar-value">${Math.round(volume / 1000)}k</span>
                <span class="chart-bar-label">${date}</span>
            `;
            chartContainer.appendChild(bar);
        });
    }

    // 【表描画】種目別推定1RM
    function renderSummaryTable(logs) {
        const max1RM = {}; // { exerciseValue: { max_1rm: value, date: date_str } }
        
        logs.forEach(log => {
            // 自重、有酸素運動などは除外
            if (log.weight === 0 || log.reps === 0 || log.exerciseValue === 'push_up' || log.exerciseValue === 'pull_up' || log.exerciseValue === 'cardio') return;

            const rm = calculate1RM(log.weight, log.reps);
            
            if (!max1RM[log.exerciseValue] || rm > max1RM[log.exerciseValue].max_1rm) {
                max1RM[log.exerciseValue] = {
                    max_1rm: rm,
                    date: log.date.split(' ')[0] // 日付のみ取得
                };
            }
        });
        
        const tableBody = document.querySelector('#summary-table tbody');
        tableBody.innerHTML = '';
        
        // ログ入力欄のoptionタグから種目名を取得
        const options = Array.from(exerciseSelect.options).filter(opt => opt.value in max1RM);
        
        // 推定1RMの高い順にソート
        options.sort((a, b) => max1RM[b.value].max_1rm - max1RM[a.value].max_1rm);

        options.forEach(option => {
            const data = max1RM[option.value];
            const row = tableBody.insertRow();
            
            row.insertCell().textContent = option.textContent.split(' ')[0]; // 種目名のみ
            row.insertCell().textContent = `${data.max_1rm} kg`;
            row.insertCell().textContent = data.date;
        });

        // データがない場合はメッセージを表示
        if (options.length === 0) {
             const row = tableBody.insertRow();
             const cell = row.insertCell();
             cell.colSpan = 3;
             cell.textContent = '記録された重さを伴うトレーニングログがありません。';
             cell.style.textAlign = 'center';
             cell.style.fontStyle = 'italic';
        }
    }
    
    // タブ切り替え機能の設定
    function setupAnalyticsTabs() {
        const tabs = document.querySelectorAll('.tab-button');
        const contents = document.querySelectorAll('.analytics-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // タブの状態をリセット
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                // クリックされたタブをアクティブにし、対応するコンテンツを表示
                tab.classList.add('active');
                const targetId = tab.dataset.target;
                document.getElementById(targetId).classList.add('active');
            });
        });
        
        // 初期表示をボリュームグラフにする
        document.querySelector('.tab-button[data-target="volume-graph"]').click();
    }
});
