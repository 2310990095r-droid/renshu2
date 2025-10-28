document.addEventListener('DOMContentLoaded', function() {
    // =====================================================
    // 筋トレサポートダッシュボード (index.html向け) の機能
    // =====================================================
    const addButton = document.getElementById('add-log-btn');
    const exerciseSelect = document.getElementById('exercise');
    const weightInput = document.getElementById('weight');
    const repsSelect = document.getElementById('reps');
    const setsSelect = document.getElementById('sets');
    const pastLogsContainer = document.getElementById('past-logs');

    const LOG_STORAGE_KEY = 'trainingLogs';

    // -----------------------------------------------------
    // 1. 筋トレ飯のランダム表示機能
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
        // ログのロードのみを実行
        loadLogs();
    }
    initializeLogSystem();

    function saveLogs(logs) {
        localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(logs));
    }

    function loadLogs() {
        pastLogsContainer.innerHTML = '';
        
        const storedLogs = localStorage.getItem(LOG_STORAGE_KEY);
        let logs = [];
        
        // ★修正点: storedLogsがnull（データなし）の場合、logsは空のままになり、
        // サンプルログの再生成を防ぎます。
        if (storedLogs) {
             logs = JSON.parse(storedLogs).map(log => {
                if (!log.id) {
                    // 古いログ形式対応
                    log.id = Date.now() + Math.floor(Math.random() * 1000); 
                }
                return log;
            });
        } 
        
        // ログをHTMLに表示
        logs.forEach(log => {
            appendLogToHTML(log, false); 
        });
        
        return logs; 
    }
    
    // ログエントリをHTMLに追加する共通関数
    function appendLogToHTML(log, prepend = true) {
        const newLogEntry = document.createElement('div');
        newLogEntry.classList.add('log-entry');
        
        // ログIDを要素のデータ属性に保存（削除機能のために必要）
        newLogEntry.dataset.logId = log.id; 

        const header = document.createElement('strong');
        header.textContent = `${log.date} - ${log.part}`;
        newLogEntry.appendChild(header);

        const detailP = document.createElement('p');
        detailP.textContent = log.detail;
        newLogEntry.appendChild(detailP);

        // 削除ボタンの追加（削除機能のために必要）
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

    // 削除処理の本体
    function handleDeleteLog(event) {
        const logEntry = event.target.closest('.log-entry');
        const logIdToDelete = parseInt(logEntry.dataset.logId); 
        
        if (isNaN(logIdToDelete) || !confirm('このログを削除してもよろしいですか？')) {
            return;
        }

        const storedLogs = localStorage.getItem(LOG_STORAGE_KEY);
        let currentLogs = storedLogs ? JSON.parse(storedLogs) : [];
        
        // 該当IDのログを配列から除外
        const updatedLogs = currentLogs.filter(log => parseInt(log.id) !== logIdToDelete);
        
        // 削除後の配列をlocalStorageに上書き保存 (永続化)
        saveLogs(updatedLogs); 
        
        // 画面上の要素を削除
        logEntry.remove();
        
        alert('ログを削除しました。');
    }
    
    // -----------------------------------------------------
    // 3. ログ記録時の処理
    // -----------------------------------------------------

    addButton.addEventListener('click', function() {
        // 1. 入力値の取得とバリデーション
        const exerciseText = exerciseSelect.options[exerciseSelect.selectedIndex].text;
        const exerciseValue = exerciseSelect.value;
        const exerciseName = exerciseText.split(' ')[0]; 
        const weight = parseInt(weightInput.value);
        const reps = parseInt(repsSelect.value);
        const sets = parseInt(setsSelect.value);
        
        if (isNaN(weight) || weight < 0 || isNaN(reps) || reps <= 0 || isNaN(sets) || sets <= 0) {
             alert('重量、回数、セット数は正しく入力してください。');
             return;
        }

        // ... (日付、部位判定ロジックは維持) ...
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

        // 3. 新しいログオブジェクトを作成 (IDとログ詳細データ)
        const newLog = {
            id: Date.now(), 
            date: fullDate,
            exerciseValue: exerciseValue, 
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

        // 5. HTMLに表示
        appendLogToHTML(newLog, true);
        
        // 6. 入力値をリセット
        weightInput.value = '60'; 
        repsSelect.value = '10';
        setsSelect.value = '3';
        exerciseSelect.value = 'benchpress';
        
        alert('トレーニングログを記録しました！');
    });

    // =====================================================
    // 混雑ヒストグラム (gm-hist.js向け) の機能
    // =====================================================

    // ==== ユーティリティ ====
    const $ = (el, sel) => el.querySelector(sel);

    function kanjiDow(n){ return ["月","火","水","木","金","土","日"][n-1] || ""; }

    function median(arr){
        const a = arr.slice().sort((x,y)=>x-y);
        const n = a.length; if (!n) return null;
        return (n & 1) ? a[(n-1)>>1] : (a[n/2-1] + a[n/2]) / 2;
    }

    function safeDate(s){
        if (!s) return null;
        let d = new Date(s);
        if (isNaN(d)) d = new Date(s.replace(" ", "T"));
        return isNaN(d) ? null : d;
    }

    // 引用符対応の軽量CSVパーサ
    async function fetchCsvRows(url){
        const res = await fetch(url + (url.includes("?") ? "&" : "?") + "cachebust=" + Date.now(), { cache: "no-store" });
        const text = await res.text();
        return text.trim().split(/\r?\n/).map(line=>{
            const out=[]; let cur="",q=false;
            for(let i=0;i<line.length;i++){
                const ch=line[i], nx=line[i+1];
                if(ch=='"'){ if(q && nx=='"'){cur+='"'; i++;} else {q=!q;} }
                else if(ch==',' && !q){ out.push(cur); cur=""; }
                else { cur+=ch; }
            }
            out.push(cur);
            return out;
        });
    }

    // ヘッダー列番号の特定（日本語/英語どちらでも可）
    function indexByHeader(header){
        const H = header.map(s => s.replace(/\s+/g,"").toLowerCase());
        const find = (...kw) => H.findIndex(h => kw.some(k => h.includes(k)));
        return {
            ts:    find("記録時刻","timestamp","時刻"),
            inC:   find("入室累計","in"),
            outC:  find("退室累計","out"),
            cur:   find("現在人数","current"),
            dow:   find("曜日","dow"),
            bin15: find("時刻15分","timebin","15")
        };
    }

    function buildBins(startHour, endHour){
        const bins = (endHour - startHour + 1) * 4; // 15分刻み
        return { bins, toIndex(d){
            const h=d.getHours(), m=d.getMinutes();
            if(h < startHour || h > endHour) return -1;
            const i=(h - startHour) * 4 + Math.floor(m / 15);
            return (i>=0 && i<bins) ? i : -1;
        }};
    }

    // ==== 集計：log → 3系列の15分ヒストグラム ====
    async function buildHists(csvUrl, dow, lookbackDays, minSamples, startHour, endHour){
        const rows = await fetchCsvRows(csvUrl);
        if (rows.length <= 1) return { current:[], inBins:[], outBins:[], bins: buildBins(startHour, endHour).bins }; // binsを返すように修正

        const header = rows[0], idx = indexByHeader(header);
        const records = rows.slice(1).map(r => {
            const ts = safeDate(r[idx.ts]) || safeDate(r[idx.bin15]);
            return {
                ts,
                dow: Number(r[idx.dow]),
                cur: Number(r[idx.cur]),
                inC: Number(r[idx.inC]),
                outC: Number(r[idx.outC]),
                b15: safeDate(r[idx.bin15]) || ts
            };
        }).filter(x => x.ts && !Number.isNaN(x.dow));

        const from = Date.now() - lookbackDays * 24 * 60 * 60 * 1000;
        const filtered = records.filter(x => x.ts.getTime() >= from && x.dow === dow).sort((a,b) => a.ts - b.ts);

        const { bins, toIndex } = buildBins(startHour, endHour);
        const curBins = Array.from({length:bins}, ()=>[]);
        const inDeltaBins  = Array.from({length:bins}, ()=>[]);
        const outDeltaBins = Array.from({length:bins}, ()=>[]);

        for(let i=0;i<filtered.length;i++){
            const row = filtered[i];
            const idxBin = toIndex(row.b15);
            if (idxBin < 0) continue;

            // 現在人数（その時点の値）
            if (!Number.isNaN(row.cur) && row.cur > 0) curBins[idxBin].push(row.cur);

            // 入退室は累計の差分
            if (i>0){
                const prev = filtered[i-1];
                const dIn  = Math.max(0, (isFinite(row.inC)?row.inC:0) - (isFinite(prev.inC)?prev.inC:0));
                const dOut = Math.max(0, (isFinite(row.outC)?row.outC:0) - (isFinite(prev.outC)?prev.outC:0));
                if (dIn>0)  inDeltaBins[idxBin].push(dIn);
                if (dOut>0) outDeltaBins[idxBin].push(dOut);
            }
        }

        const toPct = (arrBins)=>{
            const meds = arrBins.map(a => (a.length >= minSamples) ? median(a) : null);
            const maxv = Math.max(0, ...meds.filter(v => v != null));
            return meds.map(v => (v==null || maxv===0) ? null : Math.round(v / maxv * 100));
        };

        return { current: toPct(curBins), inBins: toPct(inDeltaBins), outBins: toPct(outDeltaBins), bins };
    }

    // ==== 描画（Googleマップ風：コンパクト棒＋最小限の軸） ====
    function renderBars(mountEl, pctArray, startHour, endHour, bins){
        mountEl.innerHTML = "";

        const bars = document.createElement("div");
        bars.className = "gm-bars";
        pctArray.forEach((v, i) => {
            const bar = document.createElement("div");
            bar.className = "gm-bar" + (v==null ? " is-empty" : "");
            bar.style.setProperty("--bar-w", (100/bins) + "%");
            const h = startHour + Math.floor(i/4);
            const m = (i%4)*15;
            bar.title = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")} → ${v==null ? "(サンプル不足)" : v}`;
            bar.style.height = (v==null ? 0 : v) + "%";
            bars.appendChild(bar);
        });

        const axis = document.createElement("div");
        axis.className = "gm-axis";
        const mid = Math.floor((startHour + endHour)/2);
        [startHour, mid, endHour].forEach(t=>{
            const s = document.createElement("span");
            s.textContent = String(t).padStart(2,"0") + ":00";
            axis.appendChild(s);
        });

        mountEl.appendChild(bars);
        mountEl.appendChild(axis);
    }

    // ==== 初期化（HTMLの .gm-wrap 単位で動作） ====
    async function initGmHistogram(wrap){
        // nullチェックを追加
        if (!wrap) return; 

        const csvUrl  = wrap.dataset.csvUrl;
        const startHour = Number(wrap.dataset.startHour || 9);
        const endHour   = Number(wrap.dataset.endHour    || 20);

        // クエリセレクタを.gm-wrap内から探すように統一
        const dowSel   = wrap.querySelector('.gm-dow');
        const lookback = wrap.querySelector('.gm-lookback');
        const minInp   = wrap.querySelector('.gm-min');

        // 要素がない場合は処理を中断
        if (!dowSel || !lookback || !minInp) return; 

        async function run(){
            const dow = Number(dowSel.value);
            const lookbackDays = Number(lookback.value);
            const minSamples = Number(minInp.value);
            const { current, inBins, outBins, bins } =
                await buildHists(csvUrl, dow, lookbackDays, minSamples, startHour, endHour);

            renderBars(wrap.querySelector('#hist-current'), current, startHour, endHour, bins);
            renderBars(wrap.querySelector('#hist-in'),      inBins,  startHour, endHour, bins);
            renderBars(wrap.querySelector('#hist-out'),     outBins, startHour, endHour, bins);
        }

        ['change','input'].forEach(ev=>{
            dowSel.addEventListener(ev, run);
            lookback.addEventListener(ev, run);
            minInp.addEventListener(ev, run);
        });

        await run();
    }

    // ==== ページ内の全コンポーネントを起動 ====
    document.querySelectorAll('.gm-wrap').forEach(initGmHistogram);
});
