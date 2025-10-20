document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-log-btn');
    const exerciseSelect = document.getElementById('exercise');
    const weightInput = document.getElementById('weight');
    const repsSelect = document.getElementById('reps');
    const setsSelect = document.getElementById('sets');
    const pastLogsContainer = document.getElementById('past-logs');

    addButton.addEventListener('click', function() {
        // 1. 入力値の取得
        // 選択されたオプションのテキストから種目名のみを取得
        const exerciseName = exerciseSelect.options[exerciseSelect.selectedIndex].text.split(' ')[0]; 
        const weight = weightInput.value;
        const reps = repsSelect.value;
        const sets = setsSelect.value;
        
        // ログの日付を整形
        const now = new Date();
        const dateString = now.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/');
        const dayOfWeek = now.toLocaleDateString('ja-JP', { weekday: 'short' });
        
        // 種目から大まかな部位を判別（ログの見出し用）
        let part = '';
        const selectedValue = exerciseSelect.value;
        if (selectedValue.includes('press') || selectedValue.includes('benchpress')) {
            part = '胸・肩';
        } else if (selectedValue.includes('squat')) {
            part = '脚';
        } else if (selectedValue.includes('deadlift') || selectedValue.includes('pulldown')) {
            part = '背中';
        } else if (selectedValue.includes('armcurl')) {
            part = '腕';
        } else if (selectedValue.includes('crunch')) {
            part = '腹筋';
        } else {
            part = 'その他';
        }

        // 2. 新しいログ要素の作成
        const newLogEntry = document.createElement('div');
        newLogEntry.classList.add('log-entry');
        
        // ログの見出し (今日の日付)
        const header = document.createElement('strong');
        header.textContent = `${dateString} (${dayOfWeek}) - ${part}`;
        newLogEntry.appendChild(header);

        // ログの詳細
        const detail = document.createElement('p');
        // 重量0kgまたは空の場合は「自重」と表示
        const weightValue = parseInt(weight);
        const weightDisplay = (weightValue > 0 && !isNaN(weightValue)) ? `${weight}kg` : '自重';
        detail.textContent = `${exerciseName}: ${weightDisplay} × ${reps}回 × ${sets}セット`;
        newLogEntry.appendChild(detail);

        // 3. 過去のログの先頭に挿入 (新しいログが上に来るように)
        if (pastLogsContainer.firstElementChild) {
            pastLogsContainer.insertBefore(newLogEntry, pastLogsContainer.firstElementChild);
        } else {
            pastLogsContainer.appendChild(newLogEntry);
        }
        
        // 4. 入力値をリセット
        weightInput.value = '60'; 
        repsSelect.value = '10';
        setsSelect.value = '3';
        exerciseSelect.value = 'benchpress';
        
        alert('トレーニングログを記録しました！');
    });
});
