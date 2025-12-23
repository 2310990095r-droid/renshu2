// メニューデータ
// ※著作権侵害を避けるため、メニュー名・紹介文・原材料の表記をオリジナルの表現に変更しています。
const menuData = [
    {
        title: "オニオンソースのグリルハンバーグ、枝豆とコーンのサラダ、ほうれん草のソテー、ポテトサラダ",
        details: {
            原材料: "ハンバーグ（牛肉、たまねぎ、その他）、オニオンソース、添え野菜（カリフラワー、たまねぎ）、ほうれん草ソテー、枝豆コーンサラダ、ポテトサラダ／調味料（アミノ酸等）、増粘剤、着色料など",
            紹介: "肉厚でジューシーに焼き上げたハンバーグに、玉ねぎの甘みとコクを凝縮した特製ソースをたっぷりとかけました。付け合わせのカリフラワーもソースと相性抜群です。副菜には彩り豊かな枝豆コーン、胡麻の風味香るほうれん草ソテー、そして優しい味わいのポテトサラダを添えています。",
            成分詳細: [
                { name: "カロリー", value: "382kcal" },
                { name: "たんぱく質", value: "17.2g" },
                { name: "糖質", value: "20.5g" },
                { name: "炭水化物", value: "(25g)" },
                { name: "脂質", value: "24.6g" },
                { name: "食物繊維", value: "4.5g" },
                { name: "塩分", value: "2.4g" }
            ]
        }
    },
    {
        title: "白身魚の唐揚げ 特製生姜醤油だれ、小松菜の和え物、絹揚げ豆腐、大根とツナの和風あえ",
        details: {
            原材料: "白身魚（パンガシウス）、生姜醤油たれ、小松菜の和風あえ、絹揚げ豆腐、大根とツナの和え物／加工デンプン、調味料（アミノ酸等）、pH調整剤など",
            紹介: "ふっくらとした白身魚をカラッと揚げ、生姜の香りが食欲をそそる特製の醤油だれで仕上げた一品です。生姜の効果で体の中から温まります。副菜には、出汁の染みた小松菜のお浸し、絹揚げ豆腐、そしてさっぱりとした大根とツナの和え物を組み合わせました。",
            成分詳細: [
                { name: "カロリー", value: "237kcal" },
                { name: "たんぱく質", value: "14g" },
                { name: "糖質", value: "18g" },
                { name: "炭水化物", value: "(21.6g)" },
                { name: "脂質", value: "10.8g" },
                { name: "食物繊維", value: "3.6g" },
                { name: "塩分", value: "1.9g" }
            ]
        }
    },
    {
        title: "和風おろしソースのハンバーグ、椎茸とひじきの煮物、切り干し大根の煮物、コールスロー",
        details: {
            原材料: "ハンバーグ（鶏肉、豚肉、たまねぎ等）、おろしだれ、コールスロー、椎茸ひじき煮、切干大根煮／増粘剤、調味料（アミノ酸等）、甘味料など",
            紹介: "鶏肉と豚肉を独自の黄金比でブレンドし、柔らかさと旨味を追求したこだわりのハンバーグです。さっぱりとした大根おろしソースが肉の旨味を引き立てます。副菜は和の定番である椎茸とひじきの煮物、切り干し大根、そして箸休めにぴったりなコールスローをご用意しました。",
            成分詳細: [
                { name: "カロリー", value: "300kcal" },
                { name: "たんぱく質", value: "14.3g" },
                { name: "糖質", value: "21.9g" },
                { name: "炭水化物", value: "(27.4g)" },
                { name: "脂質", value: "16.5g" },
                { name: "食物繊維", value: "5.5g" },
                { name: "塩分", value: "2.5g" }
            ]
        }
    },
    {
        title: "旨辛チリソースのハンバーグステーキ、彩り野菜ミックス、なすのバジル和え、そら豆のポテトサラダ",
        details: {
            原材料: "ハンバーグ（牛肉等）、チリソース、ブロッコリー、そら豆のポテトサラダ、なすのバジルソースあえ、彩り野菜／加工デンプン、調味料、香辛料抽出物など",
            紹介: "噛むほどに肉汁があふれる人気のハンバーグステーキです。ピリッとした辛さの中に旨味を感じる特製チリソースが、ご飯との相性を高めています。副菜には、バジルが香る茄子のソテーや、そら豆を使った珍しいポテトサラダなど、バラエティ豊かな味わいを揃えました。",
            成分詳細: [
                { name: "カロリー", value: "368kcal" },
                { name: "たんぱく質", value: "15.2g" },
                { name: "糖質", value: "21.9g" },
                { name: "炭水化物", value: "(25.7g)" },
                { name: "脂質", value: "23.3g" },
                { name: "食物繊維", value: "3.8g" },
                { name: "塩分", value: "2.5g" }
            ]
        }
    },
    {
        title: "きのこととろけるチーズのトマトハンバーグ、枝豆と鶏肉の和え物、人参ガーリックソテー、コールスローサラダ",
        details: {
            原材料: "ハンバーグ、トマトソース、きのこミックス、ナチュラルチーズ、コールスロー、枝豆と鶏肉のあえ物、人参ガーリック／調味料（アミノ酸等）、加工デンプン、着色料など",
            紹介: "酸味と甘みのバランスが良いトマトソースに、3種類のきのこ（しめじ、舞茸、椎茸）とチーズをトッピングしました。チーズのコクとトマトの酸味が、ジューシーなハンバーグの味を一層引き立てます。副菜は、ガーリックバター風味の人参や、鶏肉と枝豆の和え物など満足感のあるラインナップです。",
            成分詳細: [
                { name: "カロリー", value: "366kcal" },
                { name: "たんぱく質", value: "19.5g" },
                { name: "糖質", value: "17g" },
                { name: "炭水化物", value: "(23g)" },
                { name: "脂質", value: "22.2g" },
                { name: "食物繊維", value: "6g" },
                { name: "塩分", value: "2.2g" }
            ]
        }
    },
    {
        title: "豚肉と野菜の回鍋肉、もやしと卵の中華あえ、肉焼売、白菜のスイートチリソース",
        details: {
            原材料: "豚肉、キャベツ、回鍋肉のたれ、にんにくの芽、焼売、もやしと卵のあえ物、白菜のスイートチリ／加工デンプン、調味料（アミノ酸等）、香辛料抽出物など",
            紹介: "厚切りの豚肉と甘みのあるキャベツ、食感の良いニンニクの芽を特製の味噌ダレで炒めました。豆板醤の辛味がアクセントになり、ご飯が進む味付けです。中華の定番である焼売や、アーモンドを散らした白菜のスイートチリ和えなど、中華三昧のプレートをお楽しみください。",
            成分詳細: [
                { name: "カロリー", value: "427kcal" },
                { name: "たんぱく質", value: "15g" },
                { name: "糖質", value: "17.9g" },
                { name: "炭水化物", value: "(21.4g)" },
                { name: "脂質", value: "32.9g" },
                { name: "食物繊維", value: "3.5g" },
                { name: "塩分", value: "2.3g" }
            ]
        }
    },
    {
        title: "濃厚デミグラスのハンバーグと温野菜、クリーミーかぼちゃサラダ、ほうれん草ソテー、ズッキーニと卵の炒め物",
        details: {
            原材料: "ハンバーグ、デミグラスソース、温野菜ミックス、かぼちゃサラダ、ほうれん草ソテー、ズッキーニエッグ／調味料、増粘剤、着色料など",
            紹介: "定番のデミグラスハンバーグをリニューアルしました。コーンの甘みが濃厚なソースのコクを引き立てます。付け合わせには彩り豊かな温野菜をプラス。副菜のかぼちゃサラダはホワイトソースを加えてクリーミーに仕上げ、素材本来の甘さを活かしています。",
            成分詳細: [
                { name: "カロリー", value: "338kcal" },
                { name: "たんぱく質", value: "14.8g" },
                { name: "糖質", value: "20g" },
                { name: "脂質", value: "19.9g" },
                { name: "食物繊維", value: "6g" },
                { name: "塩分", value: "2.4g" }
            ]
        }
    },
    {
        title: "鶏の唐揚げ スイートチリソース仕立て、じゃがいもの塩炒め、枝豆のカレーソテー、コーンとオクラの和え物",
        details: {
            原材料: "鶏肉（唐揚げ）、スイートチリソース、枝豆カレー風味、じゃがいもの旨塩、コーンとオクラ／加工デンプン、調味料（アミノ酸等）、酸味料など",
            紹介: "ジューシーな鶏の唐揚げに、トマトの旨味を加えた特製スイートチリソースを絡めました。甘酸っぱいソースが衣によく染み込んでいます。副菜には、カレー風味の枝豆や、シンプルな塩味のじゃがいもなど、メインの味を引き立てる野菜料理を組み合わせました。",
            成分詳細: [
                { name: "カロリー", value: "393kcal" },
                { name: "たんぱく質", value: "24.1g" },
                { name: "糖質", value: "29.2g" },
                { name: "炭水化物", value: "(32.8g)" },
                { name: "脂質", value: "19.6g" },
                { name: "食物繊維", value: "3.6g" },
                { name: "塩分", value: "1.9g" }
            ]
        }
    }
];

// メニューコンテナとタブ名
const menuContainer = document.getElementById('menu-container');
const tabNames = [
    { key: "メニュー詳細", label: "メニュー詳細" },
    { key: "原材料", label: "原材料" },
    { key: "紹介", label: "紹介" },
    { key: "成分詳細", label: "成分詳細" }
];

// ページのロード時にメニューを生成
document.addEventListener('DOMContentLoaded', () => {
    // ローディングメッセージを削除
    const loadingMessage = document.querySelector('.loading-message');
    if (loadingMessage) loadingMessage.remove();

    menuData.forEach((menu, index) => {
        const menuItem = createMenuItem(menu, index);
        menuContainer.appendChild(menuItem);
    });
});

/**
 * 個別のメニューアイテムのDOM要素を作成する
 */
function createMenuItem(menu, index) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'menu-item';
    itemDiv.id = `menu-item-${index}`;
    
    // メニュータイトル
    const titleH2 = document.createElement('h2');
    titleH2.className = 'menu-title';
    titleH2.textContent = `メニュー${index + 1}: ${menu.title}`;
    itemDiv.appendChild(titleH2);

    // タブボタンエリア
    const tabButtonsDiv = document.createElement('div');
    tabButtonsDiv.className = 'tab-buttons';
    tabButtonsDiv.setAttribute('role', 'tablist');
    itemDiv.appendChild(tabButtonsDiv);

    // タブコンテンツエリア
    const tabContentDiv = document.createElement('div');
    tabContentDiv.className = 'tab-content';
    itemDiv.appendChild(tabContentDiv);

    tabNames.forEach((tab, tabIndex) => {
        // --- タブボタンの生成 ---
        const button = document.createElement('button');
        button.className = 'tab-button';
        button.textContent = tab.label;
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-controls', `panel-${index}-${tab.key}`);
        button.setAttribute('data-tab-key', tab.key);
        button.onclick = () => switchTab(itemDiv.id, tab.key);
        tabButtonsDiv.appendChild(button);

        // --- タブコンテンツセクションの生成 ---
        const section = document.createElement('div');
        section.className = 'content-section';
        section.setAttribute('id', `panel-${index}-${tab.key}`);
        section.setAttribute('role', 'tabpanel');
        section.setAttribute('aria-labelledby', `tab-${index}-${tab.key}`);
        
        // コンテンツを挿入
        insertTabContent(section, tab.key, menu.details, menu.title);
        
        tabContentDiv.appendChild(section);

        // 最初のタブをアクティブにする
        if (tabIndex === 0) {
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            section.classList.add('active');
        } else {
             button.setAttribute('aria-selected', 'false');
             section.setAttribute('hidden', 'true'); // 非アクティブなものは非表示
        }
    });

    return itemDiv;
}

/**
 * タブの内容を適切な形式でDOM要素に挿入する
 */
function insertTabContent(section, tabKey, details, menuTitle) {
    if (tabKey === "メニュー詳細") {
        // タイトルの区切り文字で分割して表示（、または､）
        const mainContent = menuTitle.split(/､|、/)[0];
        const sideContent = menuTitle.split(/､|、/).slice(1).join('、');

        section.innerHTML = `
            <h3>メインメニュー</h3>
            <p>**${mainContent}**</p>
            <h3>副菜</h3>
            <p>${sideContent}</p>
        `;

    } else if (tabKey === "原材料") {
        // 原材料は、区切り文字を改行に置き換えて見やすくする
        const formattedRawMaterials = details.原材料.replace(/、/g, '、<br>').replace(/／/g, '<br><br>**添加物等**／');
        section.innerHTML = `
            <h3>原材料名</h3>
            <p>${formattedRawMaterials}</p>
        `;

    } else if (tabKey === "紹介") {
        // オリジナルの区切り文字があった場合の処理（念のため残しています）
        const [introText, noteText] = details.紹介.split('＊レンジ加熱時に');
        
        section.innerHTML = `
            <h3>商品の特徴</h3>
            <p>${introText.trim()}</p>
            ${noteText ? `<p class="note">**重要なお知らせ（調理注意）**<br>＊レンジ加熱時に${noteText.trim()}</p>` : ''}
        `;

    } else if (tabKey === "成分詳細") {
        // 成分詳細 (テーブル形式で表示)
        let tableHTML = '<table class="nutrition-table" role="presentation"><tbody>';
        details.成分詳細.forEach(item => {
            // 炭水化物や糖質の表記を強調
            const isCarbOrSugar = item.name.includes('糖質') || item.name.includes('炭水化物');
            const thClass = isCarbOrSugar ? ' class="highlight"' : '';
            
            tableHTML += `
                <tr>
                    <th${thClass}>${item.name}</th>
                    <td>${item.value}</td>
                </tr>
            `;
        });
        tableHTML += '</tbody></table>';
        section.innerHTML = `
            <h3>栄養成分情報 (1食あたり)</h3>
            ${tableHTML}
            <p style="margin-top: 15px; font-size: 0.9em; color: #777;">※ ( ) 内は炭水化物に含まれるものです。</p>
        `;
    }
}

/**
 * タブを切り替える
 */
function switchTab(itemId, tabKey) {
    const itemDiv = document.getElementById(itemId);
    
    // すべてのボタンとコンテンツの 'active' 状態と aria 属性をリセット
    itemDiv.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    itemDiv.querySelectorAll('.content-section').forEach(content => {
        content.classList.remove('active');
        content.setAttribute('hidden', 'true');
    });

    // 選択されたタブ要素を取得
    const activeButton = itemDiv.querySelector(`.tab-button[data-tab-key="${tabKey}"]`);
    const activeContent = itemDiv.querySelector(`.content-section[id="panel-${itemId.split('-')[2]}-${tabKey}"]`);

    // 選択されたタブ要素をアクティブにする
    if (activeButton && activeContent) {
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-selected', 'true');

        activeContent.classList.add('active');
        activeContent.removeAttribute('hidden');
    }
}
