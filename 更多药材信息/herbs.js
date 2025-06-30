document.addEventListener('DOMContentLoaded', function() {
    const herbGrid = document.querySelector('.herb-grid');
    const searchInput = document.querySelector('.search-box input');
    const pagination = document.querySelector('.pagination');
    const itemsPerPage = 20;
    let currentPage = 1;
    let filteredHerbs = [];
    const herbsData = [
        { id: 1, name: "阿胶", image: "../中药材图片/阿胶.jpg" },
        { id: 2, name: "阿魏", image: "../中药材图片/阿魏.jpg" },
        { id: 3, name: "矮地茶", image: "../中药材图片/矮地茶.jpg" },
        { id: 4, name: "艾叶", image: "../中药材图片/艾叶.jpg" },
        { id: 5, name: "安息香", image: "../中药材图片/安息香.jpg" },
        { id: 6, name: "桉叶油", image: "../中药材图片/桉叶油.jpg" },
        { id: 7, name: "八角枫", image: "../中药材图片/八角枫.jpg" },
        { id: 8, name: "八角茴香", image: "../中药材图片/八角茴香.jpg" },
        { id: 9, name: "八角莲", image: "../中药材图片/八角莲.jpg" },
        { id: 10, name: "八楞木", image: "../中药材图片/八楞木.jpg" },
        { id: 11, name: "巴豆", image: "../中药材图片/巴豆.jpg" },
        { id: 12, name: "巴戟天", image: "../中药材图片/巴戟天.jpg" },
        { id: 13, name: "菝葜", image: "../中药材图片/菝葜.jpg" },
        { id: 14, name: "白背叶根", image: "../中药材图片/白背叶根.jpg" },
        { id: 15, name: "白扁豆", image: "../中药材图片/白扁豆.jpg" },
        { id: 16, name: "白矾", image: "../中药材图片/白矾.jpg" },
        { id: 17, name: "白附子", image: "../中药材图片/白附子.jpg" },
        { id: 18, name: "白果", image: "../中药材图片/白果.jpg" },
        { id: 19, name: "白鹤灵芝", image: "../中药材图片/白鹤灵芝.jpg" },
        { id: 20, name: "白花丹", image: "../中药材图片/白花丹.jpg" },
        { id: 21, name: "白花蛇舌草", image: "../中药材图片/白花蛇舌草.jpg" },
        { id: 22, name: "白及", image: "../中药材图片/白及.jpg" },
        { id: 23, name: "白芥子", image: "../中药材图片/白芥子.jpg" },
        { id: 24, name: "白兰花", image: "../中药材图片/白兰花.jpg" },
        { id: 25, name: "白蔹", image: "../中药材图片/白蔹.jpg" },
        { id: 26, name: "白马骨", image: "../中药材图片/白马骨.jpg" },
        { id: 27, name: "白茅根", image: "../中药材图片/白茅根.jpg" },
        { id: 28, name: "白前", image: "../中药材图片/白前.jpg" },
        { id: 29, name: "白屈菜", image: "../中药材图片/白屈菜.jpg" },
        { id: 30, name: "白芍", image: "../中药材图片/白芍.jpg" },
        { id: 31, name: "白石花", image: "../中药材图片/白石花.jpg" },
        { id: 32, name: "白石英", image: "../中药材图片/白石英.jpg" },
        { id: 33, name: "白首乌", image: "../中药材图片/白首乌.jpg" },
        { id: 34, name: "白术", image: "../中药材图片/白术.jpg" },
        { id: 35, name: "白薇", image: "../中药材图片/白薇.jpg" },
        { id: 36, name: "白鲜皮", image: "../中药材图片/白鲜皮.jpg" },
        { id: 37, name: "白药子", image: "../中药材图片/白药子.jpg" },
        { id: 38, name: "白英", image: "../中药材图片/白英.jpg" },
        { id: 39, name: "白芷", image: "../中药材图片/白芷.jpg" },
        { id: 40, name: "百部", image: "../中药材图片/百部.jpg" },
        { id: 41, name: "百合", image: "../中药材图片/百合.jpg" },
        { id: 42, name: "柏子仁", image: "../中药材图片/柏子仁.jpg" },
        { id: 43, name: "败酱草", image: "../中药材图片/败酱草.jpg" },
        { id: 44, name: "板蓝根", image: "../中药材图片/板蓝根.jpg" },
        { id: 45, name: "半边莲", image: "../中药材图片/半边莲.jpg" },
        { id: 46, name: "半夏", image: "../中药材图片/半夏.jpg" },
        { id: 47, name: "半枝莲", image: "../中药材图片/半枝莲.jpg" },
        { id: 48, name: "薄荷", image: "../中药材图片/薄荷.jpg" },
        { id: 49, name: "暴马丁香", image: "../中药材图片/暴马丁香.jpg" },
        { id: 50, name: "北豆根", image: "../中药材图片/北豆根.jpg" },
        { id: 51, name: "北刘寄奴", image: "../中药材图片/北刘寄奴.jpg" },
        { id: 52, name: "北沙参", image: "../中药材图片/北沙参.jpg" },
        { id: 53, name: "荜茇", image: "../中药材图片/荜茇.jpg" },
        { id: 54, name: "荜澄茄", image: "../中药材图片/荜澄茄.jpg" },
        { id: 55, name: "蓖麻子", image: "../中药材图片/蓖麻子.jpg" },
        { id: 56, name: "扁蓄", image: "../中药材图片/扁蓄.jpg" },
        { id: 57, name: "苍耳子", image: "../中药材图片/苍耳子.jpg" },
        { id: 58, name: "苍术", image: "../中药材图片/苍术.jpg" },
        { id: 59, name: "藏菖蒲", image: "../中药材图片/藏菖蒲.jpg" },
        { id: 60, name: "草豆蔻", image: "../中药材图片/草豆蔻.jpg" },
        { id: 61, name: "草果", image: "../中药材图片/草果.jpg" },
        { id: 62, name: "草乌", image: "../中药材图片/草乌.jpg" },
        { id: 63, name: "草乌叶", image: "../中药材图片/草乌叶.jpg" },
        { id: 64, name: "侧柏叶", image: "../中药材图片/侧柏叶.jpg" },
        { id: 65, name: "柴胡", image: "../中药材图片/柴胡.jpg" },
        { id: 66, name: "蝉花", image: "../中药材图片/蝉花.jpg" },
        { id: 67, name: "蝉蜕", image: "../中药材图片/蝉蜕.jpg" },
        { id: 68, name: "蟾酥", image: "../中药材图片/蟾酥.jpg" },
        { id: 69, name: "常山", image: "../中药材图片/常山.jpg" },
        { id: 70, name: "车前草", image: "../中药材图片/车前草.jpg" },
        { id: 71, name: "车前子", image: "../中药材图片/车前子.jpg" },
        { id: 72, name: "沉香", image: "../中药材图片/沉香.jpg" },
        { id: 73, name: "陈皮", image: "../中药材图片/陈皮.jpg" },
        { id: 74, name: "澄茄子", image: "../中药材图片/澄茄子.jpg" },
        { id: 75, name: "赤芍", image: "../中药材图片/赤芍.jpg" },
        { id: 76, name: "赤石脂", image: "../中药材图片/赤石脂.jpg" },
        { id: 77, name: "赤小豆", image: "../中药材图片/赤小豆.jpg" },
        { id: 78, name: "茺蔚子", image: "../中药材图片/茺蔚子.jpg" },
        { id: 79, name: "虫白蜡", image: "../中药材图片/虫白蜡.jpg" },
        { id: 80, name: "虫牙药", image: "../中药材图片/虫牙药.jpg" },
        { id: 81, name: "臭灵丹草", image: "../中药材图片/臭灵丹草.jpg" },
        { id: 82, name: "臭牡丹", image: "../中药材图片/臭牡丹.jpg" },
        { id: 83, name: "臭梧桐", image: "../中药材图片/臭梧桐.jpg" },
        { id: 84, name: "楮实子", image: "../中药材图片/楮实子.jpg" },
        { id: 85, name: "川贝母", image: "../中药材图片/川贝母.jpg" },
        { id: 86, name: "川楝子", image: "../中药材图片/川楝子.jpg" },
        { id: 87, name: "川木通", image: "../中药材图片/川木通.jpg" },
        { id: 88, name: "川木香", image: "../中药材图片/川木香.jpg" },
        { id: 89, name: "川牛膝", image: "../中药材图片/川牛膝.jpg" },
        { id: 90, name: "川射干", image: "../中药材图片/川射干.jpg" },
        { id: 91, name: "川乌", image: "../中药材图片/川乌.jpg" },
        { id: 92, name: "川芎", image: "../中药材图片/川芎.jpg" },
        { id: 93, name: "川续断", image: "../中药材图片/川续断.jpg" },
        { id: 94, name: "穿破石", image: "../中药材图片/穿破石.jpg" },
        { id: 95, name: "穿山甲", image: "../中药材图片/穿山甲.jpg" },
        { id: 96, name: "穿山龙", image: "../中药材图片/穿山龙.jpg" },
        { id: 97, name: "穿心莲", image: "../中药材图片/穿心莲.jpg" },
        { id: 98, name: "垂盆草", image: "../中药材图片/垂盆草.jpg" },
        { id: 99, name: "椿皮", image: "../中药材图片/椿皮.jpg" },
        { id: 100, name: "磁石", image: "../中药材图片/磁石.jpg" },
        { id: 101, name: "刺猬皮", image: "../中药材图片/刺猬皮.jpg" },
        { id: 102, name: "刺五加", image: "../中药材图片/刺五加.jpg" },
        { id: 103, name: "刺苋菜", image: "../中药材图片/刺苋菜.jpg" },
        { id: 104, name: "葱白", image: "../中药材图片/葱白.jpg" },
        { id: 105, name: "葱子", image: "../中药材图片/葱子.jpg" },
        { id: 106, name: "楤木", image: "../中药材图片/楤木.jpg" },
        { id: 107, name: "翠云草", image: "../中药材图片/翠云草.jpg" },
        { id: 108, name: "大驳骨", image: "../中药材图片/大驳骨.jpg" },
        { id: 109, name: "大豆黄卷", image: "../中药材图片/大豆黄卷.jpg" },
        { id: 110, name: "大飞扬草", image: "../中药材图片/大飞扬草.jpg" },
        { id: 111, name: "大风艾", image: "../中药材图片/大风艾.jpg" },
        { id: 112, name: "大风子", image: "../中药材图片/大风子.jpg" },
        { id: 113, name: "大腹皮", image: "../中药材图片/大腹皮.jpg" },
        { id: 114, name: "大黄", image: "../中药材图片/大黄.jpg" },
        { id: 115, name: "大戟", image: "../中药材图片/大戟.jpg" },
        { id: 116, name: "大蓟", image: "../中药材图片/大蓟.jpg" },
        { id: 117, name: "大青盐", image: "../中药材图片/大青盐.jpg" },
        { id: 118, name: "大青叶", image: "../中药材图片/大青叶.jpg" },
        { id: 119, name: "大蒜", image: "../中药材图片/大蒜.jpg" },
        { id: 120, name: "大血藤", image: "../中药材图片/大血藤.jpg" },
        { id: 121, name: "大叶桉叶", image: "../中药材图片/大叶桉叶.jpg" },
        { id: 122, name: "大叶紫珠", image: "../中药材图片/大叶紫珠.jpg" },
        { id: 123, name: "大枣", image: "../中药材图片/大枣.jpg" },
        { id: 124, name: "玳瑁", image: "../中药材图片/玳瑁.jpg" },
        { id: 125, name: "丹参", image: "../中药材图片/丹参.jpg" },
        { id: 126, name: "单叶蔓荆子", image: "../中药材图片/单叶蔓荆子.jpg" },
        { id: 127, name: "胆矾", image: "../中药材图片/胆矾.jpg" },
        { id: 128, name: "胆木", image: "../中药材图片/胆木.jpg" },
        { id: 129, name: "胆南星", image: "../中药材图片/胆南星.jpg" },
        { id: 130, name: "淡豆豉", image: "../中药材图片/淡豆豉.jpg" },
        { id: 131, name: "淡竹叶", image: "../中药材图片/淡竹叶.jpg" },
        { id: 132, name: "当归", image: "../中药材图片/当归.jpg" },
        { id: 133, name: "当药", image: "../中药材图片/当药.jpg" },
        { id: 134, name: "党参", image: "../中药材图片/党参.jpg" },
        { id: 135, name: "刀豆", image: "../中药材图片/刀豆.jpg" },
        { id: 136, name: "倒扣草", image: "../中药材图片/倒扣草.jpg" },
        { id: 137, name: "稻芽", image: "../中药材图片/稻芽.jpg" },
        { id: 138, name: "地不容", image: "../中药材图片/地不容.jpg" },
        { id: 139, name: "地耳草", image: "../中药材图片/地耳草.jpg" },
        { id: 140, name: "地枫皮", image: "../中药材图片/地枫皮.jpg" },
        { id: 141, name: "地肤子", image: "../中药材图片/地肤子.jpg" },
        { id: 142, name: "地骨皮", image: "../中药材图片/地骨皮.jpg" },
        { id: 143, name: "地黄", image: "../中药材图片/地黄.jpg" },
        { id: 144, name: "地锦草", image: "../中药材图片/地锦草.jpg" },
        { id: 145, name: "地龙", image: "../中药材图片/地龙.jpg" },
        { id: 146, name: "地稔根", image: "../中药材图片/地稔根.jpg" },
        { id: 147, name: "地桃花", image: "../中药材图片/地桃花.jpg" },
        { id: 148, name: "地榆", image: "../中药材图片/地榆.jpg" },
        { id: 149, name: "灯心草", image: "../中药材图片/灯心草.jpg" },
        { id: 150, name: "灯盏细辛", image: "../中药材图片/灯盏细辛.jpg" },
        { id: 151, name: "颠茄草", image: "../中药材图片/颠茄草.jpg" },
        { id: 152, name: "丁公藤", image: "../中药材图片/丁公藤.jpg" },
        { id: 153, name: "丁香", image: "../中药材图片/丁香.jpg" },
        { id: 154, name: "丁香罗勒油", image: "../中药材图片/丁香罗勒油.jpg" },
        { id: 155, name: "东风橘", image: "../中药材图片/东风橘.jpg" },
        { id: 156, name: "冬虫夏草", image: "../中药材图片/冬虫夏草.jpg" },
        { id: 157, name: "冬瓜皮", image: "../中药材图片/冬瓜皮.jpg" },
        { id: 158, name: "冬葵果", image: "../中药材图片/冬葵果.jpg" },
        { id: 159, name: "冬葵子", image: "../中药材图片/冬葵子.jpg" },
        { id: 160, name: "冬凌草", image: "../中药材图片/冬凌草.jpg" },
        { id: 161, name: "豆豉姜", image: "../中药材图片/豆豉姜.jpg" },
        { id: 162, name: "豆蔻", image: "../中药材图片/豆蔻.jpg" },
        { id: 163, name: "独活", image: "../中药材图片/独活.jpg" },
        { id: 164, name: "独脚金", image: "../中药材图片/独脚金.jpg" },
        { id: 165, name: "独一味", image: "../中药材图片/独一味.jpg" },
        { id: 166, name: "杜仲", image: "../中药材图片/杜仲.jpg" },
        { id: 167, name: "杜仲叶", image: "../中药材图片/杜仲叶.jpg" },
        { id: 168, name: "断血流", image: "../中药材图片/断血流.jpg" },
        { id: 169, name: "莪术", image: "../中药材图片/莪术.jpg" },
        { id: 170, name: "峨参", image: "../中药材图片/峨参.jpg" },
        { id: 171, name: "鹅不食草", image: "../中药材图片/鹅不食草.jpg" },
        { id: 172, name: "儿茶", image: "../中药材图片/儿茶.jpg" },
        { id: 173, name: "番石榴叶", image: "../中药材图片/番石榴叶.jpg" },
        { id: 174, name: "番泻叶", image: "../中药材图片/番泻叶.jpg" },
        { id: 175, name: "翻白草", image: "../中药材图片/翻白草.jpg" },
        { id: 176, name: "方解石", image: "../中药材图片/方解石.jpg" },
        { id: 177, name: "防风", image: "../中药材图片/防风.jpg" },
        { id: 178, name: "防风草", image: "../中药材图片/防风草.jpg" },
        { id: 179, name: "防己", image: "../中药材图片/防己.jpg" },
        { id: 180, name: "飞龙掌血", image: "../中药材图片/飞龙掌血.jpg" },
        { id: 181, name: "飞天蠄蟧", image: "../中药材图片/飞天蠄蟧.jpg" },
        { id: 182, name: "榧子", image: "../中药材图片/榧子.jpg" },
        { id: 183, name: "粉萆薢", image: "../中药材图片/粉萆薢.jpg" },
        { id: 184, name: "粉葛", image: "../中药材图片/粉葛.jpg" },
        { id: 185, name: "枫香脂", image: "../中药材图片/枫香脂.jpg" },
        { id: 186, name: "蜂房", image: "../中药材图片/蜂房.jpg" },
        { id: 187, name: "凤凰衣", image: "../中药材图片/凤凰衣.jpg" },
        { id: 188, name: "凤尾草", image: "../中药材图片/凤尾草.jpg" },
        { id: 189, name: "凤眼草", image: "../中药材图片/凤眼草.jpg" },
        { id: 190, name: "凤眼果", image: "../中药材图片/凤眼果.jpg" },
        { id: 191, name: "伏龙肝", image: "../中药材图片/伏龙肝.jpg" },
        { id: 192, name: "扶芳藤", image: "../中药材图片/扶芳藤.jpg" },
        { id: 193, name: "扶桑花", image: "../中药材图片/扶桑花.jpg" },
        { id: 194, name: "佛甲草", image: "../中药材图片/佛甲草.jpg" },
        { id: 195, name: "佛手", image: "../中药材图片/佛手.jpg" },
        { id: 196, name: "茯苓", image: "../中药材图片/茯苓.jpg" },
        { id: 197, name: "茯神", image: "../中药材图片/茯神.jpg" },
        { id: 198, name: "浮萍", image: "../中药材图片/浮萍.jpg" },
        { id: 199, name: "浮小麦", image: "../中药材图片/浮小麦.jpg" },
        { id: 200, name: "附子", image: "../中药材图片/附子.jpg" },
        { id: 201, name: "覆盆子", image: "../中药材图片/覆盆子.jpg" },
        { id: 202, name: "甘草", image: "../中药材图片/甘草.jpg" },
        { id: 203, name: "甘松", image: "../中药材图片/甘松.jpg" },
        { id: 204, name: "甘肃丹参", image: "../中药材图片/甘肃丹参.jpg" },
        { id: 205, name: "甘遂", image: "../中药材图片/甘遂.jpg" },
        { id: 206, name: "干姜", image: "../中药材图片/干姜.jpg" },
        { id: 207, name: "干漆", image: "../中药材图片/干漆.jpg" },
        { id: 208, name: "岗梅根", image: "../中药材图片/岗梅根.jpg" },
        { id: 209, name: "岗稔根", image: "../中药材图片/岗稔根.jpg" },
        { id: 210, name: "杠板归", image: "../中药材图片/杠板归.jpg" },
        { id: 211, name: "高良姜", image: "../中药材图片/高良姜.jpg" },
        { id: 212, name: "藁本", image: "../中药材图片/藁本.jpg" },
        { id: 213, name: "葛根", image: "../中药材图片/葛根.jpg" },
        { id: 214, name: "功劳木", image: "../中药材图片/功劳木.jpg" },
        { id: 215, name: "钩藤", image: "../中药材图片/钩藤.jpg" },
        { id: 216, name: "狗肝菜", image: "../中药材图片/狗肝菜.jpg" },
        { id: 217, name: "狗脊", image: "../中药材图片/狗脊.jpg" },
        { id: 218, name: "狗肾", image: "../中药材图片/狗肾.jpg" },
        { id: 219, name: "枸骨叶", image: "../中药材图片/枸骨叶.jpg" },
        { id: 220, name: "枸杞子", image: "../中药材图片/枸杞子.jpg" },
        { id: 221, name: "谷精草", image: "../中药材图片/谷精草.jpg" },
        { id: 222, name: "谷芽", image: "../中药材图片/谷芽.jpg" },
        { id: 223, name: "骨碎补", image: "../中药材图片/骨碎补.jpg" },
        { id: 224, name: "瓜蒌", image: "../中药材图片/瓜蒌.jpg" },
        { id: 225, name: "瓜子金", image: "../中药材图片/瓜子金.jpg" },
        { id: 226, name: "关黄柏", image: "../中药材图片/关黄柏.jpg" },
        { id: 227, name: "贯叶金丝桃", image: "../中药材图片/贯叶金丝桃.jpg" },
        { id: 228, name: "贯众", image: "../中药材图片/贯众.jpg" },
        { id: 229, name: "广东海桐皮", image: "../中药材图片/广东海桐皮.jpg" },
        { id: 230, name: "广东合欢花", image: "../中药材图片/广东合欢花.jpg" },
        { id: 231, name: "广东刘寄奴", image: "../中药材图片/广东刘寄奴.jpg" },
        { id: 232, name: "广东络石藤", image: "../中药材图片/广东络石藤.jpg" },
        { id: 233, name: "广东王不留行", image: "../中药材图片/广东王不留行.jpg" },
        { id: 234, name: "广藿香", image: "../中药材图片/广藿香.jpg" },
        { id: 235, name: "广金钱草", image: "../中药材图片/广金钱草.jpg" },
        { id: 236, name: "广昆布", image: "../中药材图片/广昆布.jpg" },
        { id: 237, name: "广山药", image: "../中药材图片/广山药.jpg" },
        { id: 238, name: "广升麻", image: "../中药材图片/广升麻.jpg" },
        { id: 239, name: "广枣", image: "../中药材图片/广枣.jpg" },
        { id: 240, name: "龟甲", image: "../中药材图片/龟甲.jpg" },
        { id: 241, name: "鬼箭羽", image: "../中药材图片/鬼箭羽.jpg" },
        { id: 242, name: "鬼针草", image: "../中药材图片/鬼针草.jpg" },
        { id: 243, name: "桂花", image: "../中药材图片/桂花.jpg" },
        { id: 244, name: "桂皮", image: "../中药材图片/桂皮.jpg" },
        { id: 245, name: "桂枝", image: "../中药材图片/桂枝.jpg" },
        { id: 246, name: "蛤蚧", image: "../中药材图片/蛤蚧.jpg" },
        { id: 247, name: "海参", image: "../中药材图片/海参.jpg" },
        { id: 248, name: "海风藤", image: "../中药材图片/海风藤.jpg" },
        { id: 249, name: "海浮石", image: "../中药材图片/海浮石.jpg" },
    ];

    // 创建药材卡片
    function createHerbCard(herb) {
        const herbCard = document.createElement('a');
        herbCard.className = 'herb-card';
        herbCard.href = `${herb.name}.html`; // 链接到独立页面
        herbCard.title = `查看${herb.name}的详细信息`;
        
        const herbImage = document.createElement('div');
        herbImage.className = 'herb-image';
        
        const img = document.createElement('img');
        img.dataset.src = herb.image;
        img.alt = herb.name;
        img.loading = 'lazy'; // 原生懒加载
        img.classList.add('lazy-load');
        
        herbImage.appendChild(img);
        
        const herbName = document.createElement('div');
        herbName.className = 'herb-name';
        herbName.textContent = herb.name;
        
        herbCard.appendChild(herbImage);
        herbCard.appendChild(herbName);
        
        return herbCard;
    }

    // 显示当前页面的药材卡片
    function showPage(page) {
        herbGrid.innerHTML = '';
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentHerbs = filteredHerbs.slice(startIndex, endIndex);
        
        if (currentHerbs.length === 0) {
            herbGrid.innerHTML = '<div class="no-results">没有找到相关药材</div>';
            return;
        }
        
        currentHerbs.forEach(herb => {
            const herbCard = createHerbCard(herb);
            herbGrid.appendChild(herbCard);
        });
        
        updatePagination();
        lazyLoadImages();
    }

    // 更新分页按钮
    function updatePagination() {
        pagination.innerHTML = '';
        const totalPages = Math.ceil(filteredHerbs.length / itemsPerPage);
        
        if (totalPages <= 1) return;
        
        // 上一页按钮
        if (currentPage > 1) {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'page-btn';
            prevBtn.innerHTML = '<i class="fas fa-angle-left"></i>';
            prevBtn.addEventListener('click', () => {
                currentPage--;
                showPage(currentPage);
                window.scrollTo({top: 0, behavior: 'smooth'});
            });
            pagination.appendChild(prevBtn);
        }
        
        // 显示页码按钮（最多显示5个）
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);
        
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'page-btn';
            pageBtn.textContent = i;
            
            if (i === currentPage) {
                pageBtn.classList.add('active');
            }
            
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                showPage(currentPage);
                window.scrollTo({top: 0, behavior: 'smooth'});
            });
            
            pagination.appendChild(pageBtn);
        }
        
        // 下一页按钮
        if (currentPage < totalPages) {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'page-btn';
            nextBtn.innerHTML = '<i class="fas fa-angle-right"></i>';
            nextBtn.addEventListener('click', () => {
                currentPage++;
                showPage(currentPage);
                window.scrollTo({top: 0, behavior: 'smooth'});
            });
            pagination.appendChild(nextBtn);
        }
    }

    // 懒加载图片
    function lazyLoadImages() {
        const lazyImages = document.querySelectorAll('.lazy-load');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.onload = () => {
                        img.classList.add('loaded');
                    };
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px'
        });

        lazyImages.forEach(img => {
            observer.observe(img);
        });
    }

    // 搜索功能
    function filterHerbs(searchTerm) {
        if (!searchTerm) {
            filteredHerbs = [...herbsData];
        } else {
            filteredHerbs = herbsData.filter(herb => 
                herb.name.includes(searchTerm)
            );
        }
        currentPage = 1;
        showPage(currentPage);
    }

    // 搜索事件监听
    searchInput.addEventListener('input', (e) => {
        filterHerbs(e.target.value.trim());
    });

    // 初始化
    filteredHerbs = [...herbsData];
    showPage(currentPage);
});