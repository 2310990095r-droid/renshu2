// ■■■ メニューデータ ■■■
// ★ここに「image: "ファイル名",」という行を追加しました
const menuData = [
    {
        title: "デミグラスハンバーグ、彩り野菜のソテー、ポテトサラダ、コーンバター",
        image: "1.png", // ← ★このメニューで使う画像ファイル名
        details: {
            原材料: "デミグラスハンバーグ[ハンバーグ(牛肉､豚肉､パン粉)､デミグラスソース(トマトペースト､赤ワイン､その他)]､彩り野菜のソテー(ブロッコリー､パプリカ､植物油)､ポテトサラダ(じゃがいも､マヨネーズ､コーン)､コーンバター(スイートコーン､バターソース)／加工デンプン､調味料(アミノ酸等)､pH調整剤､着色料(カラメル)､香料",
            紹介: "牛肉と豚肉の合挽きハンバーグに、特製のデミグラスソースをたっぷりとかけました。副菜には彩り豊かな野菜ソテーと、定番のポテトサラダを添えています。",
            成分詳細: [
                { name: "カロリー", value: "350kcal" },
                { name: "たんぱく質", value: "15.5g" },
                { name: "糖質", value: "20.0g" },
                { name: "炭水化物", value: "(25.0g)" },
                { name: "脂質", value: "22.0g" },
                { name: "食物繊維", value: "5.0g" },
                { name: "塩分", value: "2.0g" }
            ]
        }
    },
    {
        title: "白身魚の香草パン粉焼き、キャロットラペ、ほうれん草のバター炒め、キノコのマリネ",
        image: "2.png", // ← ★2つ目の画像を用意して指定してください
        details: {
            原材料: "白身魚の香草パン粉焼き[白身魚(ホキ)､パン粉､ハーブミックス､オリーブオイル]､キャロットラペ(にんじん､フレンチドレッシング､レーズン)､ほうれん草のバター炒め(ほうれんそう､バターソース､コーン)､キノコのマリネ(エリンギ､しめじ､イタリアンドレッシング)／増粘剤(加工デンプン)､乳化剤､調味料(アミノ酸)､酸味料､香辛料抽出物",
            紹介: "白身魚にハーブを効かせたパン粉をまぶし、香ばしく焼き上げました。ふっくらとした身とサクサクの衣の食感をお楽しみください。副菜は酸味の効いたキャロットラペです。",
            成分詳細: [
                { name: "カロリー", value: "280kcal" },
                { name: "たんぱく質", value: "18.0g" },
                { name: "糖質", value: "12.0g" },
                { name: "炭水化物", value: "(15.0g)" },
                { name: "脂質", value: "14.0g" },
                { name: "食物繊維", value: "3.0g" },
                { name: "塩分", value: "1.8g" }
            ]
        }
    },
    {
        title: "鶏肉のトマト煮込み、ブロッコリーのアーリオオーリオ、マッシュポテト、ナスの煮浸し",
        image: "3.png", // ← ★3つ目の画像
        details: {
            原材料: "鶏肉のトマト煮込み[鶏肉(ブラジル産)､トマトソース､たまねぎ､ズッキーニ]､ブロッコリーのアーリオオーリオ(ブロッコリー､ガーリックオイル､唐辛子)､マッシュポテト(じゃがいも､牛乳､バター)､ナスの煮浸し(揚げナス､和風だし)／調味料(アミノ酸等)､pH調整剤､増粘多糖類､着色料(カラチノイド)",
            紹介: "柔らかく煮込んだ鶏肉と、完熟トマトの酸味が相性抜群の一品です。ニンニクの香りが食欲をそそるブロッコリーと、クリーミーなマッシュポテトを合わせました。",
            成分詳細: [
                { name: "カロリー", value: "320kcal" },
                { name: "たんぱく質", value: "22.0g" },
                { name: "糖質", value: "15.0g" },
                { name: "炭水化物", value: "(19.0g)" },
                { name: "脂質", value: "16.0g" },
                { name: "食物繊維", value: "4.0g" },
                { name: "塩分", value: "2.1g" }
            ]
        }
    },
    {
        title: "豚肉のスタミナ生姜焼き、だし巻き卵、オクラのお浸し、大根のそぼろ煮",
        image: "4.png",
        details: {
            原材料: "豚肉のスタミナ生姜焼き[豚肉(カナダ産)､玉ねぎ､生姜焼きのタレ､ニラ]､だし巻き卵(鶏卵､かつおだし､砂糖)､オクラのお浸し(オクラ､醤油､かつおぶし)､大根のそぼろ煮(大根､鶏ひき肉､和風だし)／加工デンプン､調味料(アミノ酸等)､着色料(カラメル)､甘味料(ステビア)",
            紹介: "ご飯がすすむ定番メニュー、豚の生姜焼きです。すりおろした生姜をたっぷりと使い、風味豊かに仕上げました。副菜には優しい味わいのだし巻き卵をご用意しました。",
            成分詳細: [
                { name: "カロリー", value: "410kcal" },
                { name: "たんぱく質", value: "19.5g" },
                { name: "糖質", value: "18.5g" },
                { name: "炭水化物", value: "(22.0g)" },
                { name: "脂質", value: "25.0g" },
                { name: "食物繊維", value: "3.5g" },
                { name: "塩分", value: "2.4g" }
            ]
        }
    },
    {
        title: "サバの味噌煮、インゲンの胡麻和え、里芋の煮っころがし、厚揚げのみぞれ煮",
        image: "5.png",
        details: {
            原材料: "サバの味噌煮[サバ(ノルウェー産)､味噌だれ､生姜､長ネギ]､インゲンの胡麻和え(インゲン､すりごま､醤油だれ)､里芋の煮っころがし(里芋､醤油､みりん)､厚揚げのみぞれ煮(厚揚げ､大根おろし､和風だし)／増粘剤(加工デンプン)､調味料(アミノ酸等)､酒精､着色料(カラメル)",
            紹介: "脂の乗ったサバを、コクのある特製味噌だれでじっくりと煮込みました。骨まで柔らかく仕上げており、安心してお召し上がりいただけます。和食の定番を詰め合わせた一皿です。",
            成分詳細: [
                { name: "カロリー", value: "360kcal" },
                { name: "たんぱく質", value: "18.0g" },
                { name: "糖質", value: "14.0g" },
                { name: "炭水化物", value: "(18.0g)" },
                { name: "脂質", value: "24.0g" },
                { name: "食物繊維", value: "4.0g" },
                { name: "塩分", value: "2.2g" }
            ]
        }
    },
    {
        title: "チリコンカンハンバーグ、コールスロー、スパイシーポテト、ビーンズサラダ",
        image: "6.png",
        details: {
            原材料: "チリコンカンハンバーグ[ハンバーグ(牛肉､豚肉､パン粉)､チリソース(トマト､キドニービーンズ､唐辛子)]､コールスロー(キャベツ､コーン､ドレッシング)､スパイシーポテト(じゃがいも､カレー粉､植物油)､ビーンズサラダ(ミックスビーンズ､イタリアンドレッシング)／調味料(アミノ酸等)､香辛料抽出物､酸味料､増粘多糖類",
            紹介: "スパイシーなチリソースをかけたハンバーグで、食欲を刺激します。豆類を多く使用しており、食物繊維も豊富に摂取できます。辛さは控えめでお子様でも食べやすい味付けです。",
            成分詳細: [
                { name: "カロリー", value: "385kcal" },
                { name: "たんぱく質", value: "17.0g" },
                { name: "糖質", value: "22.0g" },
                { name: "炭水化物", value: "(28.0g)" },
                { name: "脂質", value: "21.0g" },
                { name: "食物繊維", value: "6.0g" },
                { name: "塩分", value: "2.3g" }
            ]
        }
    },
    {
        title: "鶏の唐揚げレモンソース、中華春雨、ザーサイの和え物、青梗菜のクリーム煮",
        image: "7.jpg",
        details: {
            原材料: "鶏の唐揚げレモンソース[鶏もも肉(タイ産)､唐揚げ粉､レモンソース､植物油]､中華春雨(春雨､きくらげ､人参､中華ドレッシング)､ザーサイの和え物(ザーサイ､ごま油､ネギ)､青梗菜のクリーム煮(チンゲンサイ､ホワイトソース､ハム)／加工デンプン､調味料(アミノ酸等)､酸味料､香料､着色料(クチナシ)",
            紹介: "ジューシーな唐揚げに、さっぱりとしたレモンソースをかけました。酸味と旨味のバランスが絶妙です。副菜には中華風の味付けを中心に揃えました。",
            成分詳細: [
                { name: "カロリー", value: "440kcal" },
                { name: "たんぱく質", value: "21.0g" },
                { name: "糖質", value: "24.0g" },
                { name: "炭水化物", value: "(27.0g)" },
                { name: "脂質", value: "26.0g" },
                { name: "食物繊維", value: "3.0g" },
                { name: "塩分", value: "2.5g" }
            ]
        }
    },
    {
        title: "サーモンのクリームシチュー、バジルパスタ、カボチャのサラダ、ブロッコリーと海老の和え物",
        image: "8.jpg",
        details: {
            原材料: "サーモンのクリームシチュー[鮭(チリ産)､ホワイトソース､牛乳､人参､じゃがいも]､バジルパスタ(スパゲッティ､バジルソース)､カボチャのサラダ(カボチャ､マヨネーズ､アーモンド)､ブロッコリーと海老の和え物(ブロッコリー､むきエビ､コンソメ)／増粘剤(加工デンプン)､調味料(アミノ酸等)､乳化剤､着色料(カロチノイド)",
            紹介: "脂の乗ったサーモンを濃厚なクリームシチューに仕上げました。寒い季節にぴったりの温まるメニューです。副菜のバジルパスタがアクセントになっています。＊レンジ加熱時に突沸することがあります。",
            成分詳細: [
                { name: "カロリー", value: "395kcal" },
                { name: "たんぱく質", value: "19.0g" },
                { name: "糖質", value: "26.0g" },
                { name: "炭水化物", value: "(30.0g)" },
                { name: "脂質", value: "20.0g" },
                { name: "食物繊維", value: "4.0g" },
                { name: "塩分", value: "1.9g" }
            ]
        }
    },
    {
        title: "牛すき焼き風煮、白菜の浅漬け、ポテトの明太マヨ和え、卯の花",
        image: "9.jpg",
        details: {
            原材料: "牛すき焼き風煮[牛肉(オーストラリア産)､焼き豆腐､糸こんにゃく､白菜､すき焼きのタレ]､白菜の浅漬け(白菜､食塩､昆布エキス)､ポテトの明太マヨ和え(じゃがいも､明太子ソース､マヨネーズ)､卯の花(おから､人参､椎茸､和風だし)／調味料(アミノ酸等)､水酸化Ca､着色料(紅麹)､増粘多糖類",
            紹介: "牛肉と野菜を甘辛い割り下で煮込んだ、すき焼き風のメニューです。豆腐や糸こんにゃくにも味が染みています。ご飯との相性が抜群の一品です。",
            成分詳細: [
                { name: "カロリー", value: "330kcal" },
                { name: "たんぱく質", value: "16.0g" },
                { name: "糖質", value: "16.0g" },
                { name: "炭水化物", value: "(20.0g)" },
                { name: "脂質", value: "19.0g" },
                { name: "食物繊維", value: "4.0g" },
                { name: "塩分", value: "2.3g" }
            ]
        }
    },
    {
        title: "エビのチリソース炒め、揚げ焼売、春巻き、もやしのナムル",
        image: "10.jpg",
        details: {
            原材料: "エビのチリソース炒め[むきエビ(ベトナム産)､チリソース､長ネギ､植物油]､揚げ焼売(豚肉､玉ねぎ､焼売の皮)､春巻き(竹の子､豚肉､春巻きの皮)､もやしのナムル(もやし､ごま油､鶏がらスープの素)／加工デンプン､調味料(アミノ酸等)､膨張剤､酸味料､着色料(パプリカ色素)",
            紹介: "プリプリのエビをピリ辛のチリソースで炒めました。中華料理の人気メニューを少しずつ楽しめるセットになっています。副菜には揚げ点心をご用意しました。",
            成分詳細: [
                { name: "カロリー", value: "375kcal" },
                { name: "たんぱく質", value: "15.0g" },
                { name: "糖質", value: "28.0g" },
                { name: "炭水化物", value: "(32.0g)" },
                { name: "脂質", value: "21.0g" },
                { name: "食物繊維", value: "4.0g" },
                { name: "塩分", value: "2.6g" }
            ]
        }
    },
    {
        title: "ロールキャベツのトマト煮、マカロニサラダ、ほうれん草とコーンのソテー、ごぼうサラダ",
        image: "11.jpg",
        details: {
            原材料: "ロールキャベツのトマト煮[ロールキャベツ(豚肉､キャベツ､玉ねぎ)､トマトソース､コンソメ]､マカロニサラダ(マカロニ､ハム､きゅうり､マヨネーズ)､ほうれん草とコーンのソテー(ほうれんそう､スイートコーン､マーガリン)､ごぼうサラダ(ごぼう､人参､胡麻ドレッシング)／加工デンプン､調味料(アミノ酸等)､増粘多糖類､乳化剤､香料",
            紹介: "じっくり煮込んだロールキャベツは、キャベツの甘みとお肉の旨味が溶け合っています。トマトベースのソースであっさりと仕上げました。野菜もたっぷり摂れるメニューです。",
            成分詳細: [
                { name: "カロリー", value: "310kcal" },
                { name: "たんぱく質", value: "14.0g" },
                { name: "糖質", value: "21.0g" },
                { name: "炭水化物", value: "(26.0g)" },
                { name: "脂質", value: "16.0g" },
                { name: "食物繊維", value: "5.0g" },
                { name: "塩分", value: "2.1g" }
            ]
        }
    },
    {
        title: "アジの南蛮漬け、切干大根の煮物、ひじきの炒め煮、小松菜の辛子和え",
        image: "12.jpg",
        details: {
            原材料: "アジの南蛮漬け[アジ(国産)､玉ねぎ､人参､南蛮酢､植物油]､切干大根の煮物(切干大根､油揚げ､和風だし)､ひじきの炒め煮(ひじき､大豆､人参､醤油だれ)､小松菜の辛子和え(小松菜､辛子醤油)／増粘剤(加工デンプン)､調味料(アミノ酸等)､酸味料､甘味料(スクラロース)",
            紹介: "揚げたアジを特製の南蛮酢に漬け込みました。酸味が効いてさっぱりとした味わいは、疲れた時にもおすすめです。副菜は和食の定番お惣菜を揃えました。",
            成分詳細: [
                { name: "カロリー", value: "295kcal" },
                { name: "たんぱく質", value: "17.0g" },
                { name: "糖質", value: "15.0g" },
                { name: "炭水化物", value: "(20.0g)" },
                { name: "脂質", value: "15.0g" },
                { name: "食物繊維", value: "5.0g" },
                { name: "塩分", value: "2.0g" }
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

    if (menuContainer) {
        menuData.forEach((menu, index) => {
            const menuItem = createMenuItem(menu, index);
            menuContainer.appendChild(menuItem);
        });
    }
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

    // ■■■ 画像の追加ここから修正 ■■■
    const menuImg = document.createElement('img');
    
    // データに画像ファイル名があればそれを、なければデフォルトで '1.png' を使う設定
    menuImg.src = menu.image || '1.png'; 
    
    menuImg.alt = menu.title; 
    menuImg.className = 'menu-image'; 
    itemDiv.appendChild(menuImg);
    // ■■■ 画像の追加ここまで ■■■

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
        const mainContent = menuTitle.split(/､|、/)[0]; // 最初の項目をメインメニューと仮定
        const sideContent = menuTitle.split(/､|、/).slice(1).join('、');

        section.innerHTML = `
            <h3>メインメニュー</h3>
            <p><strong>${mainContent}</strong></p>
            <h3>副菜</h3>
            <p>${sideContent}</p>
        `;

    } else if (tabKey === "原材料") {
        
        // 1. まず「／」で区切って、主原料と添加物を分ける
        const parts = details.原材料.split('／');
        const mainIngredients = parts[0]; // ／の前（主原料）
        const additives = parts[1];       // ／の後（添加物）

        // カッコ内のカンマを無視して分割する共通関数
        const splitItems = (text) => {
            if (!text) return [];
            const result = [];
            let level = 0; // カッコの深さ
            let current = "";

            for (let char of text) {
                if (['(', '（', '[', '{'].includes(char)) level++;
                if ([')', '）', ']', '}'].includes(char)) level--;

                // カッコの外（levelが0）で、かつ区切り文字の場合
                if (level === 0 && (char === '、' || char === '､')) {
                    if (current.trim()) result.push(current.trim());
                    current = "";
                } else {
                    current += char;
                }
            }
            if (current.trim()) result.push(current.trim());
            return result;
        };

        let htmlContent = `<h3>原材料名</h3>`;

        // 2. 主原料を「料理名」と「中身」に分解して表示
        const dishes = splitItems(mainIngredients);

        dishes.forEach(dish => {
            let dishTitle = dish;
            let subItems = [];

            // Pattern A: DishName[Item1, Item2...]
            if (dish.includes('[')) {
                const openIndex = dish.indexOf('[');
                const closeIndex = dish.lastIndexOf(']');
                if (openIndex > -1 && closeIndex > openIndex) {
                    dishTitle = dish.substring(0, openIndex);
                    const content = dish.substring(openIndex + 1, closeIndex);
                    subItems = splitItems(content);
                }
            } 
            // Pattern B: DishName(Item1, Item2...) 
            // ※ただし、[ ]の中にいない場合に限る
            else if (dish.includes('(')) {
                const openIndex = dish.indexOf('(');
                const closeIndex = dish.lastIndexOf(')');
                if (openIndex > -1 && closeIndex > openIndex) {
                    dishTitle = dish.substring(0, openIndex);
                    const content = dish.substring(openIndex + 1, closeIndex);
                    subItems = splitItems(content);
                }
            }

            // HTML生成
            htmlContent += `<div class="ingredient-group">`;
            htmlContent += `<div class="ingredient-title">${dishTitle}</div>`;
            
            if (subItems.length > 0) {
                htmlContent += `<ul class="sub-ingredient-list">`;
                subItems.forEach(item => {
                    htmlContent += `<li>${item}</li>`;
                });
                htmlContent += `</ul>`;
            }
            htmlContent += `</div>`;
        });

        // 3. 添加物がある場合
        if (additives) {
            htmlContent += `<p class="additives-title">添加物等</p>`;
            htmlContent += `<ul class="sub-ingredient-list">`; 
            const additiveList = splitItems(additives);
            additiveList.forEach(item => {
                 htmlContent += `<li>${item}</li>`;
            });
            htmlContent += `</ul>`;
        }

        section.innerHTML = htmlContent;

    } else if (tabKey === "紹介") {
        // ダミーデータに "＊レンジ加熱時に" が含まれていない場合のフォールバックを追加
        const splitText = details.紹介.split('＊レンジ加熱時に');
        const introText = splitText[0];
        const noteText = splitText.length > 1 ? splitText[1] : null;
        
        section.innerHTML = `
            <h3>商品の特徴</h3>
            <p>${introText.trim()}</p>
            ${noteText ? `<p class="note"><strong>重要なお知らせ（調理注意）</strong><br>＊レンジ加熱時に${noteText.trim()}</p>` : ''}
        `;

    } else if (tabKey === "成分詳細") {
        // 成分詳細 (テーブル形式で表示)
        let tableHTML = '<table class="nutrition-table" role="presentation"><tbody>';
        details.成分詳細.forEach(item => {
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
