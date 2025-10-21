document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-log-btn');
    const exerciseSelect = document.getElementById('exercise');
    const weightInput = document.getElementById('weight');
    const repsSelect = document.getElementById('reps');
    const setsSelect = document.getElementById('sets');
    const pastLogsContainer = document.getElementById('past-logs');

    // -----------------------------------------------------
    // 1. 筋トレ飯のランダム表示機能 (詳細情報を追加)
    // -----------------------------------------------------
    const recommendedMeals = [
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
    // 2. ログの永続化機能と削除機能
    // -----------------------------------------------------

    const LOG_STORAGE_KEY = 'trainingLogs';
    
    // ローカルストレージからの読み込みと表示
    loadLogs();

    function saveLogs(logs) {
        localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(logs));
    }

    function loadLogs() {
        pastLogsContainer.innerHTML = '';
        
        const storedLogs = localStorage.getItem(LOG_STORAGE_KEY);
        let logs = storedLogs ? JSON.parse(storedLogs) : [];
        
        // ログをHTMLに表示
        logs.forEach(log => {
            // load時には末尾に追加（履歴の順番通り）
            appendLogToHTML(log, false); 
        });
    }
    
    // ログエントリをHTMLに追加する共通関数
    function appendLogToHTML(log, prepend = true) {
        const newLogEntry = document.createElement('div');
        newLogEntry.classList.add('log-entry');
        
        // ログIDを要素のデータ属性に保存
        newLogEntry.dataset.logId = log.id; 

        const header = document.createElement('strong');
        header.textContent = `${log.date} - ${log.part}`;
        newLogEntry.appendChild(header);

        const detailP = document.createElement('p');
        detailP.textContent = log.detail;
        newLogEntry.appendChild(detailP);

        // 削除ボタンの追加
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-log-btn');
        deleteBtn.textContent = '削除';
        // 削除ボタンにイベントリスナーを設定
        deleteBtn.addEventListener('click', handleDeleteLog);
        newLogEntry.appendChild(deleteBtn);

        // 新規ログはリストの先頭に、ロード時のログはリストの末尾に追加
        if (prepend && pastLogsContainer.firstElementChild) {
            pastLogsContainer.insertBefore(newLogEntry, pastLogsContainer.firstElementChild);
        } else {
            pastLogsContainer.appendChild(newLogEntry);
        }
    }

    // 削除処理の本体
    function handleDeleteLog(event) {
        // ボタンの親要素であるlog-entryからlogIdを取得
        const logEntry = event.target.closest('.log-entry');
        const logIdToDelete = parseInt(logEntry.dataset.logId);
        
        if (!confirm('このログを削除してもよろしいですか？')) {
            return;
        }

        const storedLogs = localStorage.getItem(LOG_STORAGE_KEY);
        let currentLogs = storedLogs ? JSON.parse(storedLogs) : [];
        
        // 該当IDのログを配列からフィルタリングして削除
        const updatedLogs = currentLogs.filter(log => log.id !== logIdToDelete);
        
        // localStorageを更新
        saveLogs(updatedLogs);
        
        // 画面上の要素を削除
        logEntry.remove();
        
        alert('ログを削除しました。');
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
        
        // 種目から大まかな部位を判別 (省略)
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

        // 3. 新しいログオブジェクトを作成 (一意のIDを追加)
        const newLog = {
            id: Date.now(), // 現在のタイムスタンプをIDとして使用 (ミリ秒単位で一意)
            date: fullDate,
            part: part,
            detail: detailString
        };
        
        // 4. HTMLに表示 (先頭に追加)
        appendLogToHTML(newLog, true);
        
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
