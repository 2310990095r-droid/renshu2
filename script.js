// メニューデータ
const menuData = [
    {
        title: "オニオングリルハンバーグ、枝豆コーンサラダ、ほうれん草ソテー、ポテトサラダ",
        details: {
            原材料: "オニオングリルハンバーグ[ハンバーグ(牛肉､たまねぎ､パン粉､その他)(国内製造)､野菜ブイヨンベース､カリフラワー､たまねぎ､ステーキソース､分離液状ドレッシング､フライドオニオン､香辛料]､ほうれん草ソテー(ほうれんそう､にんじん､たまねぎ､香味油､セロリ､粉末調味料､いりごま)､枝豆コーンサラダ(えだまめ､スイートコーン､マヨネーズ)､ポテトサラダ(ゆでじゃがいも､スクランブルエッグ､分離液状ドレッシング)／加工デンプン､増粘剤(加工デンプン､増粘多糖類)､調味料(アミノ酸等)､乳化剤､グリシン､酢酸Na､pH調整剤､リン酸塩(Na)､着色料(炭末､カロチノイド)､香料､酸化防止剤(V.E)､甘味料(ステビア)､香辛料抽出物",
            紹介: "ふっくらジューシーなハンバーグは、玉ねぎの旨みが詰まったソースとベストマッチ！添え野菜のカリフラワーもソースに絡めて食べていただくのがおすすめです！ 副菜は、マヨネーズで和えた枝豆コーンサラダ、ほうれん草ソテー、卵入りのポテトサラダです。",
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
        title: "白身魚の生姜醤油､小松菜の和風サラダ､絹揚げ豆腐､大根とツナのタルタルあえ",
        details: {
            原材料: "白身魚の生姜醤油[パンガシウス(ベトナム産)､たまねぎ､ごぼう､和風だし､しゅんぎく､醤油だれ､からあげ粉､植物油､きざみしょうが､生姜醤油たれ､あんかけのたれ]､小松菜の和風サラダ[こまつな､パプリカ､分離液状ドレッシング]､大根とツナのタルタルあえ(だいこん､ツナ､タルタルソース)､絹揚げ豆腐(絹揚げ豆腐､みぞれたれ)／加工デンプン､増粘剤(加工デンプン､増粘多糖類)､調味料(アミノ酸等)､凝固剤､pH調整剤､酒精､甘味料(スクラロース､甘草)､酸味料､香辛料抽出物､着色料(カラメル､ウコン)､乳酸Ca､酸化防止剤(V.C)､V.B1､香料､ショウガ抽出物",
            紹介: "白身魚のから揚げに、生姜の風味が特長の香り豊かな醤油だれで仕上げました。身も心も温まるようなおすすめの一品です。 添え野菜のささがきごぼう、玉ねぎの食感もぜひお楽しみください。 副菜は、ごましょうゆ味の小松菜の和風サラダ、おろしだれで和えた絹揚げ豆腐、大根とツナのタルタルあえです。",
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
        title: "おろしソースのハンバーグ､椎茸ひじき､切干いんげん､コールスロー",
        details: {
            原材料: "おろしソースのハンバーグ[ハンバーグ{鶏肉､たまねぎ､豚脂､パン粉､粒状大豆たん白､その他}(国内製造)､ほうれんそう､おろしだれ､あんかけのたれ､葉ねぎ]､コールスロー(キャベツ､スイートコーン､マヨネーズ､味付ぽん酢)､椎茸ひじき(ひじき煮､しいたけ､にんじん､醤油だれ)､切干いんげん(切干大根煮､いんげん､だしつゆ､香辛料)／増粘剤(加工デンプン､増粘多糖類)､調味料(アミノ酸等)､酒精､ポリリン酸Na､酸味料､着色料(カラメル､カロチノイド)､甘味料(スクラロース､甘草)､保存料(ソルビン酸K)､pH調整剤､香料",
            紹介: "和のシェフのこだわりを詰め込んだハンバーグが完成しました！ハンバーグは鶏肉と豚肉を独自の比率で合わせて柔らかく、旨みとコクのある美味しさに仕上げております。おろしソースでさっぱりと召し上がっていただきたいハンバーグです。 副菜は、椎茸ひじき、切干いんげん、コールスローです。",
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
        title: "チリハンバーグステーキ、彩り野菜、なすのバジルソース、そら豆のポテトサラダ",
        details: {
            原材料: "チリハンバーグステーキ[ハンバーグ(牛肉､たまねぎ､パン粉､その他)(国内製造)､チリソース､ブロッコリー]､そら豆のポテトサラダ(ゆでじゃがいも､そらまめ､マヨネーズ)､なすのバジルソース[揚げなす､たまねぎ､バジルソース]､彩り野菜(にんじん､パプリカ､植物油､粉末調味料)／加工デンプン､調味料(アミノ酸等)､増粘剤(加工デンプン､増粘多糖類)､乳化剤､クエン酸､着色料(カラメル､カロチノイド､炭末)､pH調整剤､香辛料抽出物､リン酸塩(Na)､香料",
            紹介: "メニューの中でも大人気のチリハンバーグステーキです。肉汁をギュッと閉じ込めたジューシーなハンバーグは、噛むほどに肉の旨味が広がり絶品です。辛さ控えめのチリソースが、さらに美味しさを引き立てています。副菜は、彩り野菜、なすのバジルソース、そら豆のポテトサラダです。",
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
        title: "きのことチーズのトマトハンバーグ､枝豆と鶏肉の洋風あえ､人参のガーリックバター､コールスローサラダ",
        details: {
            原材料: "きのことチーズのトマトハンバーグ[ハンバーグ(鶏肉､植物性たん白､たまねぎ､パン粉､牛脂､その他)(国内製造)､トマトソース､きのこ(ぶなしめじ､まいたけ､しいたけ)､ナチュラルチーズ､たまねぎ､粉末調味料]､コールスローサラダ(スイートコーン､キャベツ､乳化液状ドレッシング､パプリカ)､枝豆と鶏肉の洋風あえ(えだまめ､チキンフレーク､香味油､風味調味料)､人参のガーリックバター(にんじん､ガーリックバターソース､粒状植物性たんぱく､フライドオニオン)／調味料(アミノ酸等)､増粘剤(加工デンプン､増粘多糖類)､加工デンプン､着色料(カラメル､ベニコウジ､クチナシ)､リン酸塩(Na)､セルロース､pH調整剤､塩化Ca､酸味料､香料､甘味料(ステビア)､香辛料抽出物､乳化剤､酸化防止剤(V.E)",
            紹介: "世代を問わず愛され続けるトマトソースのハンバーグ！やわらかいジューシーなハンバーグに3種類のきのことチーズをトッピングし、まろやかな酸味のトマトソースで仕上げました。たっぷりのきのこの香りが食欲をそそり、チーズのコク深さと真っ赤に熟したトマトソースの酸味がハンバーグの旨みを引き立てます！ 副菜は、枝豆と鶏肉の洋風あえ、人参のガーリックバター、コーンとパプリカが入ったコールスローサラダです。",
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
        title: "回鍋肉､もやしと卵の和え物､焼売､白菜のスイートチリ",
        details: {
            原材料: "回鍋肉[キャベツ(国産)､豚肉､回鍋肉の素､葉ねぎ､にんにくの芽､香味油､鶏ガラスープベース､大豆発酵調味料]､焼売､もやしと卵の和え物(もやし､鶏卵加工品､中華調味料)､白菜のスイートチリ(はくさい､スイートチリソース､アーモンド)／加工デンプン､増粘剤(セルロース､加工デンプン､増粘多糖類)､調味料(アミノ酸等)､ソルビトール､グリセリン､着色料(カラメル､カロチノイド)､グリセリン脂肪酸エステル､リン酸Na､酸味料､酸化防止剤(V.E､V.C)､香辛料抽出物",
            紹介: "厚めで食べ応え十分の豚肉に、甘み豊かなキャベツと歯ざわりの良いにんにくの芽をたっぷりと合わせました。豆板醤のピリッとした辛味と濃厚でコク深い特製だれが食欲をそそる一品です。 豚肉と野菜を一緒にお楽しみいただきたい一皿です。 副菜は、シャキシャキ感が心地よいもやしと卵の和え物、ジューシーな焼売、アーモンドをアクセントにした白菜のスイートチリです。",
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
        title: "ハンバーグと彩り温野菜のデミ､かぼちゃサラダ､ほうれん草のソテー､ズッキーニエッグ",
        details: {
            原材料: "ハンバーグと彩り温野菜のデミ{ハンバーグ(鶏肉､植物性たん白､たまねぎ､パン粉､牛脂､その他)(国内製造)､デミグラスソース､野菜[ブロッコリー､スイートコーン､パプリカ]}､かぼちゃサラダ(かぼちゃ､ホワイトソース､チキンコンソメ､香辛料)､ほうれん草のソテー(ほうれんそう､香味油､鶏ガラだし)､ズッキーニエッグ(ズッキーニ､マヨネーズ､スクランブルエッグ､粒マスタード)／調味料(アミノ酸等)､増粘剤(加工デンプン､増粘多糖類)､着色料(カラメル､カロチノイド､ウコン)､トレハロース､リン酸塩(Na)､加工デンプン､乳化剤､グリシン､pH調整剤､香辛料抽出物､酸味料､香料､シリコーン",
            紹介: "人気定番のハンバーグメニューが、付け合わせと副菜をブラッシュアップし、さらに彩りも豊かになりリニューアル！付け合わせをコーンにすることで、柔らかいふわふわのハンバーグに食感をプラス。コーンの甘みが濃厚なデミソースのコクを引き立てます！かぼちゃはホワイトソースと合わせてサラダにすることで、より素材のうまみを引き出しました。見た目も美味しさもこだわりぬいた逸品となっております！ 副菜は、クリーミーなかぼちゃサラダ、鶏ガラ風味のほうれん草のソテー、粒マスタードが隠し味のズッキーニエッグです。",
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
        title: "コクと旨味のスイートチリカラアゲ、じゃがいもの旨塩、枝豆のカレー風味、コーンとオクラの生姜醤油",
        details: {
            原材料: "コクと旨味のスイートチリカラアゲ[鶏肉(タイ産)､キャベツ､甘酢あん､たまねぎ､からあげ粉､植物油､スイートチリソース､トマトスープの素]､枝豆のカレー風味(えだまめ､カレーソース､チキンフレーク､粉末しょうゆ調味料)､じゃがいもの旨塩(じゃがいも､グリーンピース､中華調味料)､コーンとオクラの生姜醤油(スイートコーン､オクラ､生姜醤油たれ)／加工デンプン､増粘剤(加工デンプン､増粘多糖類)､調味料(アミノ酸等)､カラメル色素､酸味料､酸化防止剤(V.E､V.C)､V.B1､香辛料抽出物､香料",
            紹介: "トマトの甘みをまとったスイートチリソースを開発！コクと旨みのあるソースは、カラアゲメニューとの相性抜群です。カラアゲはもちろん、添え野菜にもソースをたっぷりと絡めて召し上がってほしい一品です。 副菜は、じゃがいもの旨塩、枝豆のカレー風味、コーンとオクラの生姜醤油です。",
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
, // ←前のデータとのつなぎ目に必ずカンマを入れてください
    {
        title: "鶏の唐揚げ香味ソースがけ、オクラの和え物、大根の中華風、しろ菜の生姜醤油",
        details: {
            原材料: "油淋鶏[鶏肉(タイ産)､香味だれ､キャベツ､たまねぎ､からあげ粉､植物油､アーモンド]､しろ菜の生姜醤油(しろな､たけのこ水煮､生姜醤油たれ)､大根の中華和え(だいこん､ザーサイしょうゆ漬け､鶏ガラスープベース)､オクラの和え物(オクラ､焼豚､配合調味料)／加工デンプン､調味料(アミノ酸等)､酸味料､pH調整剤､着色料(カラメル､パプリカ色素)､ピロリン酸Na､グリシン､増粘剤(キサンタンガム)､V.B1､香料",
            紹介: "サクッと揚げた鶏肉に、玉ねぎをたっぷり使った特製の香味ダレをかけました。アーモンドの食感がアクセントになり、風味豊かに仕上がっています。酸味と旨味のバランスが良く、ご飯が進む味付けです。副菜には、焼豚入りのオクラ、ザーサイの風味が効いた大根、さっぱりとしたしろ菜を合わせました。",
            成分詳細: [
                { name: "カロリー", value: "384kcal" },
                { name: "たんぱく質", value: "23.4g" },
                { name: "糖質", value: "22.5g" },
                { name: "炭水化物", value: "(26g)" },
                { name: "脂質", value: "22.0g" },
                { name: "食物繊維", value: "3.5g" },
                { name: "塩分", value: "2.4g" }
            ]
        }
    },
    {
        title: "鶏もも肉の本格炭火焼き、ポテトサラダ、枝豆のあんかけ、菜の花のみぞれ和え",
        details: {
            原材料: "鶏もも肉の炭火焼き[鶏肉加工品(鶏肉､しょうゆ､その他)(中国製造)､ほうれんそう､和風だし､玉子焼､にんじん､だしつゆ]､菜の花のみぞれあえ(なばな､みぞれたれ､だいこん)､ポテトサラダ(じゃがいも､いんげん､マヨネーズ)､枝豆のとろみあん(えだまめ､あんかけのたれ､おろししょうが)／増粘剤(加工デンプン､増粘多糖類)､加工デンプン､調味料(アミノ酸等)､リン酸塩(Na)､酢酸Na､キシロース､酒精､甘味料(スクラロース)､重曹､酸味料､乳酸Ca､着色料(カラメル､ウコン)､酸化防止剤(V.C)､pH調整剤､香料､ショウガ抽出物､香辛料抽出物",
            紹介: "炭火ならではの香ばしさを存分に楽しめる鶏もも肉の焼き物です。ジューシーな鶏肉の旨味が口いっぱいに広がります。付け合わせのほうれん草と一緒にお召し上がりください。副菜は、定番のポテトサラダ、生姜を効かせた枝豆のあんかけ、さっぱりとした菜の花のみぞれ和えをご用意しました。",
            成分詳細: [
                { name: "カロリー", value: "266kcal" },
                { name: "たんぱく質", value: "17.4g" },
                { name: "糖質", value: "8.7g" },
                { name: "炭水化物", value: "(14.1g)" },
                { name: "脂質", value: "16.6g" },
                { name: "食物繊維", value: "5.4g" },
                { name: "塩分", value: "2.2g" }
            ]
        }
    },
    {
        title: "鯵の竜田揚げ 野菜の甘酢あんかけ、カリフラワーの和え物、かぼちゃそぼろ、お豆とふきの白和え",
        details: {
            原材料: "野菜と鯵の甘酢あん[あじ竜田揚げ(あじ､でん粉､その他)(中国製造)､野菜{なす､さといも､にんじん､たまねぎ､葉ねぎ}､甘酢だれ､和風だし､植物油､南蛮漬のたれ､あんかけのたれ､ドレッシングタイプ調味料]､お豆とふきの白和え(グリーンピース､白和えの素､ふきのしょうゆ煮)､かぼちゃの肉そぼろ(かぼちゃ､鶏そぼろ､和風だし､ピーマン)､カリフラワーのひじきマヨ(カリフラワー､ひじき煮､マヨネーズ)／増粘剤(加工デンプン､増粘多糖類)､調味料(アミノ酸等)､酒精､甘味料(スクラロース､甘草､ステビア)､着色料(カラメル､野菜色素)､酸味料､グリシン､酢酸Na､V.C､焼成Ca､酸化防止剤(V.C)､保存料(ソルビン酸K)､pH調整剤､香料",
            紹介: "ふっくらと揚げた鯵（あじ）に、茄子や里芋などの野菜が入った甘酢あんをたっぷり絡めました。お酢の酸味を抑え、まろやかで食べやすい味わいに仕上げています。副菜には、ひじきと合わせたカリフラワー、かぼちゃのそぼろ煮、お豆とふきの白和えを添え、彩り豊かに仕上げました。",
            成分詳細: [
                { name: "カロリー", value: "290kcal" },
                { name: "たんぱく質", value: "18.7g" },
                { name: "糖質", value: "24.3g" },
                { name: "炭水化物", value: "(27.4g)" },
                { name: "脂質", value: "12.3g" },
                { name: "食物繊維", value: "3.1g" },
                { name: "塩分", value: "2.1g" }
            ]
        }
    },
    {
        title: "彩り野菜のジンギスカン、貝柱と青菜のナムル、切干大根のごま和え、枝豆と桜えびの白和え",
        details: {
            原材料: "彩り野菜のジンギスカン{羊肉(豪州産)､野菜[たまねぎ､キャベツ､ピーマン､にんじん]､ジンギスカンのタレ､和風だし､だしつゆ}､枝豆と桜えびの白あえ(ふきと竹の子の白和え､えだまめ､さくらえび)､ほうれん草と貝柱のナムル(ほうれんそう､貝柱水煮､植物油､塩だれ)､切干大根とささみのごまあえ(切干大根煮､蒸し鶏､ごまだれ､香辛料)／増粘剤(加工デンプン､セルロース､増粘多糖類)､調味料(アミノ酸等)､加工デンプン､甘味料(スクラロース)､酸味料､酒精､着色料(カラメル､アナトー)､ソルビトール､リン酸塩(Na)､pH調整剤､酢酸Na､保存料(ソルビン酸K)､グリセリン脂肪酸エステル､香辛料抽出物､V.B1､酸化防止剤(V.E)､乳化剤､香料､乳酸Ca",
            紹介: "クセの少ないラム肉を使用し、キャベツやピーマンなどの野菜と一緒に特製ダレで炒めました。ラム肉はビタミン等の栄養が豊富と言われています。コクのあるタレが野菜の甘みを引き立てます。副菜は、貝柱の旨味が効いたナムル、ごま風味の切り干し大根、桜えび香る白和えです。",
            成分詳細: [
                { name: "カロリー", value: "313kcal" },
                { name: "たんぱく質", value: "23.1g" },
                { name: "糖質", value: "13.1g" },
                { name: "炭水化物", value: "(18g)" },
                { name: "脂質", value: "18.9g" },
                { name: "食物繊維", value: "4.9g" },
                { name: "塩分", value: "2.5g" }
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
        const mainContent = menuTitle.split(/､|、/)[0]; // 最初の項目をメインメニューと仮定
        const sideContent = menuTitle.split(/､|、/).slice(1).join('、');

        section.innerHTML = `
            <h3>メインメニュー</h3>
            <p>**${mainContent}**</p>
            <h3>副菜</h3>
            <p>${sideContent}</p>
        `;

    } else if (tabKey === "原材料") {
        // --- 修正箇所: 階層構造への変更ロジック ---
        
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
                    // (国内製造) などの補足を改行せず、文字列置換で見やすくする場合（任意）
                    // 例: item = item.replace('(国内製造)', ' <small>※国内製造</small>');
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
