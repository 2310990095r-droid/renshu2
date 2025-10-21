document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-log-btn');
    const exerciseSelect = document.getElementById('exercise');
    const weightInput = document.getElementById('weight');
    const repsSelect = document.getElementById('reps');
    const setsSelect = document.getElementById('sets');
    const pastLogsContainer = document.getElementById('past-logs');

    // -----------------------------------------------------
    // 1. 筋トレ飯のランダム表示機能
    // -----------------------------------------------------
    const recommendedMeals = [
        { name: "鮭の味噌マヨホイル焼き＆玄米", points: ["良質な脂質: 鮭に含まれるDHA・EPA（オメガ3脂肪酸）が回復をサポート。", "複合炭水化物: 玄米でエネルギーを長時間供給し、インスリンを安定化。"] },
        { name: "鶏むね肉とブロッコリーの和風炒め", points: ["高タンパク質: 鶏むね肉で筋肉の材料をたっぷり補給。", "ビタミンC: ブロッコリーで免疫力とコラーゲン生成をサポート。"] },
        { name: "マグロとアボカドのポキ丼", points: ["良質なタンパク質: マグロでアミノ酸を効率よく摂取。", "ミネラル・ビタミンE: アボカドで抗酸化作用とホルモンバランスをサポート。"] },
        { name: "牛赤身肉とキノコのオイスターソース炒め", points: ["鉄分・亜鉛: 牛肉で酸素運搬能力と代謝を向上。", "食物繊維: キノコで腸内環境を整え、栄養吸収を促進。"] },
        { name: "鯖缶と納豆のパワーサラダ", points: ["オメガ3脂肪酸: 鯖缶で炎症を抑え、回復を促進。", "プロバイオティクス: 納豆で腸内環境を改善し、栄養の吸収率を高める。"] },
        { name: "豚ヒレ肉のソテーとレンズ豆のポタージュ", points: ["ビタミンB1: 豚ヒレ肉で疲労回復と糖質の代謝をサポート。", "複合炭水化物: レンズ豆で持続的なエネルギーと食物繊維を摂取。"] }
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
        `;
        mealContainer.innerHTML = html;
    }
    
    // ページロード時に筋トレ飯を表示
    displayRandomMeal();


    // -----------------------------------------------------
    // 2. ログの永続化機能 (localStorageを使用)
    // -----------------------------------------------------

    const LOG_STORAGE_KEY = 'trainingLogs';
    
    // ローカルストレージからの読み込みと表示
    loadLogs();

    function saveLogs(logs) {
        // ログデータをJSON文字列に変換してlocalStorageに保存
        localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(logs));
    }

    function loadLogs() {
        // 過去のログをクリア
        pastLogsContainer.innerHTML = '';
        
        // localStorageからデータを取得
        const storedLogs = localStorage.getItem(LOG_STORAGE_KEY);
        let logs = [];
        
        if (storedLogs) {
            // JSON文字列を配列に戻す
            logs = JSON.parse(storedLogs);
        } else {
            // データがない場合は、初期のサンプルログを設定
            logs = [
                { date: '2025/10/06 (月)', part: '胸・三頭筋', detail: 'ベンチプレス: 80kg × 8回 × 3セット' },
                { date: '2025/10/06 (月)', part: '胸・三頭筋', detail: 'ディップス: 自重 × 10回 × 3セット' },
                { date: '2025/10/04 (土)', part: '背中・二頭筋', detail: 'デッドリフト: 100kg × 5回 × 3セット' },
                { date: '2025/10/04 (土)', part: '背中・二頭筋', detail: 'ラットプルダウン: 40kg × 12回 × 3セット' }
            ];
            // 初期ログをlocalStorageに保存
            saveLogs(logs);
        }
        
        // ログをHTMLに表示
        logs.forEach(log => {
            appendLogToHTML(log.date, log.part, log.detail, false); // falseはリストの先頭に追加しないことを示す
        });
    }
    
    // ログエントリをHTMLに追加する共通関数
    function appendLogToHTML(date, part, detail, prepend = true) {
        const newLogEntry = document.createElement('div');
        newLogEntry.classList.add('log-entry');
        
        const header = document.createElement('strong');
        header.textContent = `${date} - ${part}`;
        newLogEntry.appendChild(header);

        const detailP = document.createElement('p');
        detailP.textContent = detail;
        newLogEntry.appendChild(detailP);

        // 新規ログはリストの先頭に、ロード時のログはリストの末尾に追加
        if (prepend && pastLogsContainer.firstElementChild) {
            pastLogsContainer.insertBefore(newLogEntry, pastLogsContainer.firstElementChild);
        } else {
            pastLogsContainer.appendChild(newLogEntry);
        }
    }
    
    // -----------------------------------------------------
    // 3. ログ追加ボタンの処理
    // -----------------------------------------------------

    addButton.addEventListener('click', function() {
        // 1. 入力値の取得
        const exerciseText = exerciseSelect.options[exerciseSelect.selectedIndex].text;
        const exerciseName = exerciseText.split(' ')[0]; 
        const weight = weightInput.value;
        const reps = repsSelect.value;
        const sets = setsSelect.value;
        
        // ログの日付を整形
        const now = new Date();
        const dateString = now.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/');
        const dayOfWeek = now.toLocaleDateString('ja-JP', { weekday: 'short' });
        const fullDate = `${dateString} (${dayOfWeek})`;
        
        // 種目から大まかな部位を判別
        let part = 'その他';
        const selectedValue = exerciseSelect.value;
        if (['benchpress', 'incline_press', 'dumbbell_press', 'pec_fly', 'push_up'].includes(selectedValue)) {
            part = '胸';
        } else if (['deadlift', 'latpulldown', 'bentover_row', 'seated_row', 'pull_up'].includes(selectedValue)) {
            part = '背中';
        } else if (['squat', 'leg_press', 'romanian_deadlift', 'leg_extension', 'leg_curl', 'calf_raise'].includes(selectedValue)) {
            part = '脚';
        } else if (['shoulderpress', 'side_raise', 'front_raise', 'reverse_fly'].includes(selectedValue)) {
            part = '肩';
        } else if (['armcurl', 'triceps_extension', 'hammer_curl', 'cable_pushdown'].includes(selectedValue)) {
            part = '腕';
        } else if (['crunch', 'leg_raise', 'plank', 'russian_twist'].includes(selectedValue)) {
            part = '体幹';
        }

        // ログの詳細文字列を生成
        const weightValue = parseInt(weight);
        const weightDisplay = (weightValue > 0 && !isNaN(weightValue)) ? `${weight}kg` : '自重';
        const detailString = `${exerciseName}: ${weightDisplay} × ${reps}回 × ${sets}セット`;

        // 3. 新しいログオブジェクトを作成
        const newLog = {
            date: fullDate,
            part: part,
            detail: detailString
        };
        
        // 4. HTMLに表示 (先頭に追加)
        appendLogToHTML(newLog.date, newLog.part, newLog.detail, true);
        
        // 5. localStorageのデータを更新
        const currentLogsString = localStorage.getItem(LOG_STORAGE_KEY);
        let currentLogs = currentLogsString ? JSON.parse(currentLogsString) : [];
        
        // 新しいログを配列の先頭に追加
        currentLogs.unshift(newLog);
        
        // localStorageに保存
        saveLogs(currentLogs);

        // 6. 入力値をリセット
        weightInput.value = '60'; 
        repsSelect.value = '10';
        setsSelect.value = '3';
        exerciseSelect.value = 'benchpress';
        
        alert('トレーニングログを記録しました！');
    });
});
