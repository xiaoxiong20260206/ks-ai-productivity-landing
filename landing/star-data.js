// ============================================================
// star-data.js — 恒星演化数据库（三种质量恒星的完整生命周期）
// ============================================================

/**
 * 每颗恒星的数据结构：
 * {
 *   key, name, massLabel, massRatio,
 *   color: 整体主题色
 *   summary: 一句话介绍
 *   funFact: 趣味冷知识
 *   fate: 最终命运标签
 *   phases: [ { key, name, spanLabel, ageStartMyr, ageEndMyr,
 *               state, lumLsun, tempK, radiusRsun,
 *               color, halo, note,
 *               teach: { emoji, title, caption },
 *               special?: "supernova"|"pulsar"|"blackdwarf" } ]
 * }
 */

// ============================================================
// 1. 0.09 M☉ — 超低质量红矮星
// ============================================================
const STAR_RED_DWARF = {
  key: "red-dwarf",
  name: "红矮星",
  massLabel: "0.09 M☉",
  massRatio: 0.09,
  themeColor: "#ff7a45",
  gradientFrom: "#ff8a55",
  gradientTo:   "#5a1e0f",
  summary: "宇宙中数量最多的恒星，寿命是太阳的数百倍！",
  funFact: "如果给它每秒1滴汽油，它能燃烧约3万亿年。",
  fate: "🌑 黑矮星",
  fateColor: "#8877cc",
  phases: [
    {
      key: "cloud",
      name: "分子云",
      ageStartMyr: 0, ageEndMyr: 1,
      spanLabel: "0 ~ 100 万年",
      state: "引力收缩",
      lumLsun: 0.001, tempK: 2400, radiusRsun: 0.85,
      color: "#ffb58d", halo: "rgba(255,140,90,0.5)",
      note: "一团气体和尘埃在引力下缓缓向中心聚拢，核心升温。",
      teach: {
        emoji: "🌌",
        title: "诞生之前：宇宙的摇篮",
        caption: "一大团气体和尘埃在万有引力的作用下开始「抱团」，核心温度不断上升。就像捏紧一个气球，里面的空气会变热。这颗未来的红矮星，还只是宇宙中一片模糊的云。"
      }
    },
    {
      key: "protostar",
      name: "原恒星",
      ageStartMyr: 1, ageEndMyr: 80,
      spanLabel: "1 ~ 8000 万年",
      state: "预主序收缩",
      lumLsun: 0.004, tempK: 2700, radiusRsun: 0.62,
      color: "#ffb178", halo: "rgba(255,160,95,0.55)",
      note: "核心持续收缩升温，能量来自引力势能，尚未点燃核聚变。",
      teach: {
        emoji: "🔥",
        title: "还差一步：8000 万年的等待",
        caption: "核心温度慢慢爬升，但对这颗小小的星来说还不够——它需要比太阳更长的时间才能「点火」。太阳在 4000 万年时就点燃了，它还在等待……"
      }
    },
    {
      key: "zams",
      name: "主序点火",
      ageStartMyr: 80, ageEndMyr: 300,
      spanLabel: "8000 万 ~ 3 亿年",
      state: "氢聚变启动",
      lumLsun: 0.008, tempK: 2900, radiusRsun: 0.24,
      color: "#ff9f66", halo: "rgba(255,142,80,0.5)",
      note: "核心突破 400 万K阈值，质子-质子链反应稳定启动，正式成为恒星。",
      teach: {
        emoji: "⚡",
        title: "点火！终于成为恒星",
        caption: "核心温度突破约 400 万开尔文，氢核聚变点燃了！这颗红矮星正式成为一颗恒星。它比太阳暗约 125 倍，颜色深红，安静地燃烧。"
      }
    },
    {
      key: "stable",
      name: "稳定红矮星",
      ageStartMyr: 300, ageEndMyr: 50000,
      spanLabel: "3 亿 ~ 500 亿年",
      state: "全对流主序",
      lumLsun: 0.011, tempK: 3050, radiusRsun: 0.125,
      color: "#ff8a55", halo: "rgba(255,120,70,0.45)",
      note: "进入超长稳定期，内部完全对流，燃料利用率极高，寿命可达500亿年。",
      teach: {
        emoji: "⏳",
        title: "最漫长的岁月：500 亿年",
        caption: "这是它一生中最长的阶段——整整 500 亿年！内部的「搅拌机」（对流）让新鲜氢燃料不断补充进核心。此时太阳早已死去了很久很久，这颗小星还在安静燃烧。"
      }
    },
    {
      key: "late",
      name: "晚期主序",
      ageStartMyr: 50000, ageEndMyr: 200000,
      spanLabel: "500 亿 ~ 2 万亿年",
      state: "缓慢演化",
      lumLsun: 0.014, tempK: 3200, radiusRsun: 0.105,
      color: "#ff7a45", halo: "rgba(255,108,62,0.42)",
      note: "氢燃料渐渐耗尽，亮度温度缓慢上升，不会膨胀成红巨星。",
      teach: {
        emoji: "🌅",
        title: "安静的老年：不会爆炸",
        caption: "普通恒星老了会变成红巨星；但这颗小星质量不够，核心的引力不足以触发氦燃烧。它只是慢慢变稍亮、稍蓝，像一盏快烧完的灯。"
      }
    },
    {
      key: "he-wd",
      name: "氦白矮星",
      ageStartMyr: 200000, ageEndMyr: 300000,
      spanLabel: "2 ~ 3 万亿年",
      state: "白矮星冷却",
      lumLsun: 0.0004, tempK: 8000, radiusRsun: 0.065,
      color: "#c8b0ff", halo: "rgba(180,150,255,0.25)",
      note: "核聚变停止，残留氦核成为白矮星，靠余热发出微弱蓝白光。",
      teach: {
        emoji: "💜",
        title: "白矮星：地球大小的宝石",
        caption: "聚变停止了。核心变成一颗比地球稍大的氦球，密度极高，每茶匙重约 5 吨。它靠着储存的热量发出微弱的蓝白色光，缓缓冷却。"
      }
    },
    {
      key: "black-dwarf",
      name: "黑矮星",
      ageStartMyr: 300000, ageEndMyr: 380000,
      spanLabel: "3 万亿年以上",
      state: "黑矮星（理论终态）",
      lumLsun: 0.0000001, tempK: 400, radiusRsun: 0.062,
      color: "#2a2a4a", halo: "rgba(60,60,120,0.1)",
      note: "温度接近宇宙背景温度，几乎不发光，永远漂流于宇宙深处。",
      special: "blackdwarf",
      teach: {
        emoji: "🌑",
        title: "终章：黑矮星——永恒的沉默",
        caption: "最终，它变成一块沉默、冰冷的氦球，漂浮在黑暗的宇宙中。没有爆炸，没有超新星，只是安静地消失在无尽的黑暗里。注意：目前宇宙中还不存在任何黑矮星，因为宇宙还没足够老！"
      }
    }
  ],
  endingTitle: "终章：永恒的黑矮星",
  endingDesc: "它没有爆炸。漫长 3 万亿年后，静静变成一块冰冷的黑暗。",
  endingBadge: "🌑 黑矮星",
  quiz: [
    { q: "0.09 M☉ 红矮星会变成超新星吗？", a: "不会！它质量太小，不能触发超新星爆炸，只会安静地冷却成黑矮星。", ok: false, icon: "❌" },
    { q: "为什么红矮星寿命比太阳长这么多？", a: "因为它体积小、燃烧慢，而且内部全对流，燃料利用率比太阳高很多！", ok: true, icon: "✅" },
    { q: "黑矮星现在存在吗？", a: "不存在！宇宙只有约 138 亿岁，距离第一颗黑矮星的诞生还差数千亿倍时间。", ok: false, icon: "❓" }
  ]
};

// ============================================================
// 2. 1.0 M☉ — 太阳型恒星
// ============================================================
const STAR_SUN = {
  key: "sun",
  name: "太阳型恒星",
  massLabel: "1.0 M☉",
  massRatio: 1.0,
  themeColor: "#f5c840",
  gradientFrom: "#ffe066",
  gradientTo:   "#7a4a00",
  summary: "和我们太阳一样的恒星——宇宙中的普通人，有戏剧性的结局！",
  funFact: "太阳每秒钟把 400 万吨物质转化成能量，但这点消耗还能维持约 50 亿年！",
  fate: "💫 白矮星",
  fateColor: "#a8c8ff",
  phases: [
    {
      key: "cloud",
      name: "分子云",
      ageStartMyr: 0, ageEndMyr: 1,
      spanLabel: "0 ~ 100 万年",
      state: "引力收缩",
      lumLsun: 0.001, tempK: 3000, radiusRsun: 3.5,
      color: "#ffe066", halo: "rgba(255,220,80,0.5)",
      note: "气体尘埃在引力下坍缩，初步形成原恒星盘。",
      teach: {
        emoji: "🌌",
        title: "诞生：和红矮星一样的开始",
        caption: "太阳诞生时和红矮星一样，都是从气体尘埃云的坍缩开始。但它的质量大得多，收缩过程更快，点火也更早。"
      }
    },
    {
      key: "protostar",
      name: "原恒星",
      ageStartMyr: 1, ageEndMyr: 40,
      spanLabel: "1 ~ 4000 万年",
      state: "预主序收缩",
      lumLsun: 0.8, tempK: 4500, radiusRsun: 1.5,
      color: "#ffd04a", halo: "rgba(255,210,80,0.55)",
      note: "质量较大，收缩更快，约 4000 万年便可达到氢聚变阈值。",
      teach: {
        emoji: "🔥",
        title: "更快的启动：4000 万年",
        caption: "比红矮星快了整整一倍！质量越大，引力越强，收缩越快，点火也越早。"
      }
    },
    {
      key: "zams",
      name: "主序点火",
      ageStartMyr: 40, ageEndMyr: 200,
      spanLabel: "4000 万 ~ 2 亿年",
      state: "氢聚变启动",
      lumLsun: 1.0, tempK: 5778, radiusRsun: 1.0,
      color: "#ffce45", halo: "rgba(255,210,70,0.5)",
      note: "核心点燃氢聚变，成为类太阳恒星，光度1 L☉，表面温度约5778K。",
      teach: {
        emoji: "☀️",
        title: "正式成为太阳！",
        caption: "核心温度达到约 1500 万开尔文（比红矮星高3倍），氢聚变高效燃烧，黄色温暖的光芒照亮周围。"
      }
    },
    {
      key: "stable",
      name: "稳定主序",
      ageStartMyr: 200, ageEndMyr: 10000,
      spanLabel: "2 亿 ~ 100 亿年",
      state: "稳定氢燃烧",
      lumLsun: 1.1, tempK: 5780, radiusRsun: 1.0,
      color: "#ffca40", halo: "rgba(255,205,65,0.45)",
      note: "稳定燃烧约 100 亿年，此期间地球上进化出了生命。",
      teach: {
        emoji: "🌍",
        title: "生命的摇篮：100 亿年",
        caption: "在这稳定的 100 亿年里，地球上诞生了生命，从单细胞生物进化到了恐龙，到人类。太阳是地球上一切生命的能量来源。"
      }
    },
    {
      key: "subgiant",
      name: "亚巨星膨胀",
      ageStartMyr: 10000, ageEndMyr: 10800,
      spanLabel: "100 ~ 108 亿年",
      state: "核心氦积累",
      lumLsun: 2.5, tempK: 5200, radiusRsun: 2.2,
      color: "#ffaa35", halo: "rgba(255,170,60,0.5)",
      note: "核心氢消耗殆尽，氢壳层点燃，恒星开始缓慢膨胀。",
      teach: {
        emoji: "📈",
        title: "核心变化：膨胀开始",
        caption: "核心的氢耗尽了，但外层的氢壳仍在燃烧。这导致恒星开始膨胀，亮度增加，温度略降。地球的海洋将开始蒸发……"
      }
    },
    {
      key: "red-giant",
      name: "红巨星",
      ageStartMyr: 10800, ageEndMyr: 11200,
      spanLabel: "108 ~ 112 亿年",
      state: "氦壳层燃烧",
      lumLsun: 2300, tempK: 3700, radiusRsun: 170,
      color: "#ff8c33", halo: "rgba(255,120,50,0.6)",
      note: "极度膨胀，半径达170倍太阳，吞噬水星金星，地球也岌岌可危。",
      teach: {
        emoji: "🔴",
        title: "红巨星：吞噬地球的怪物",
        caption: "太阳膨胀到现在半径的170倍！如果它现在是红巨星，它的表面会越过地球的轨道。水星、金星将被彻底吞噬，地球可能也会被吞进去……"
      }
    },
    {
      key: "planetary-nebula",
      name: "行星状星云",
      ageStartMyr: 11200, ageEndMyr: 11500,
      spanLabel: "112 ~ 115 亿年",
      state: "外层抛射",
      lumLsun: 800, tempK: 20000, radiusRsun: 8000,
      color: "#ff99ff", halo: "rgba(255,150,255,0.4)",
      note: "红巨星不稳定，外层被抛射成美丽的星云，向宇宙归还物质。",
      teach: {
        emoji: "💫",
        title: "华丽的谢幕：行星状星云",
        caption: "红巨星的外层被强烈的恒星风吹走，形成一个美丽的气体壳——行星状星云。这是宇宙中最美丽的景象之一！哈勃望远镜拍到了很多这样的照片。"
      }
    },
    {
      key: "white-dwarf",
      name: "白矮星",
      ageStartMyr: 11500, ageEndMyr: 200000,
      spanLabel: "115 亿 ~ 2 万亿年",
      state: "碳氧白矮星冷却",
      lumLsun: 0.0005, tempK: 12000, radiusRsun: 0.012,
      color: "#c8d8ff", halo: "rgba(180,210,255,0.25)",
      note: "外层抛尽后，剩余的碳氧核心成为白矮星，体积如地球，靠余热缓缓发光，历经数万亿年。",
      teach: {
        emoji: "💙",
        title: "白矮星：太阳的遗骸",
        caption: "星云散去后，太阳的核心留下来，变成了白矮星——大约地球大小，但密度超高，每茶匙重约 1 吨。它会缓缓冷却数万亿年，最终温度接近绝对零度……"
      }
    },
    {
      key: "black-dwarf-sun",
      name: "黑矮星（终态）",
      ageStartMyr: 200000, ageEndMyr: 380000,
      spanLabel: "2 万亿年以上",
      state: "碳氧黑矮星",
      lumLsun: 0.0000001, tempK: 400, radiusRsun: 0.011,
      color: "#1e2a3a", halo: "rgba(50,80,120,0.08)",
      note: "白矮星冷却完毕，成为碳氧黑矮星——和红矮星的氦黑矮星相似，同样是不发光的黑暗天体。",
      special: "blackdwarf",
      teach: {
        emoji: "🌑",
        title: "黑矮星：太阳的最终归宿",
        caption: "白矮星冷却完毕后，就变成了黑矮星！太阳的黑矮星是碳氧组成的，红矮星的黑矮星是氦组成的。成分不同，但命运一样——都是宇宙中冰冷沉默的黑暗天体。注意：现在宇宙中还没有任何黑矮星，因为宇宙才 138 亿岁，还不够老！"
      }
    }
  ],
  endingTitle: "终章：白矮星 → 黑矮星",
  endingDesc: "太阳死后变成白矮星，再经过漫长的冷却，最终变成黑矮星——和红矮星的归宿相同。",
  endingBadge: "🌑 黑矮星",
  quiz: [
    { q: "太阳会变成超新星吗？", a: "不会！太阳质量不够大（需要 8 M☉ 以上），它会变成红巨星然后行星状星云。", ok: false, icon: "❌" },
    { q: "太阳红巨星阶段地球会被怎样？", a: "太阳会膨胀到约 170 倍，地球可能被吞噬或表面被炙烤成荒漠，海洋完全蒸发。", ok: true, icon: "🔴" },
    { q: "行星状星云和行星有关系吗？", a: "没有！早期天文学家用望远镜看，觉得它们圆圆的像行星，就叫错了，名字沿用至今。", ok: false, icon: "😄" }
  ]
};

// ============================================================
// 3. 8 M☉ — 大质量恒星（超新星 → 中子星）
// ============================================================
const STAR_MASSIVE = {
  key: "massive",
  name: "大质量恒星",
  massLabel: "8 M☉",
  massRatio: 8,
  themeColor: "#5580ff",
  gradientFrom: "#88aaff",
  gradientTo:   "#1a1050",
  summary: "短暂而壮烈！燃烧只有 3000 万年，却用超新星爆炸震撼整个宇宙！",
  funFact: "它的亮度巅峰时相当于 100 亿个太阳，可以在白天肉眼看到！",
  fate: "💥 中子星",
  fateColor: "#88aaff",
  phases: [
    {
      key: "cloud",
      name: "分子云",
      ageStartMyr: 0, ageEndMyr: 0.2,
      spanLabel: "0 ~ 20 万年",
      state: "快速引力收缩",
      lumLsun: 0.01, tempK: 4000, radiusRsun: 8.0,
      color: "#aaccff", halo: "rgba(100,160,255,0.5)",
      note: "质量是太阳8倍，引力更强，收缩速度极快，仅需20万年。",
      teach: {
        emoji: "🚀",
        title: "闪电般的诞生：20 万年",
        caption: "质量越大，引力越强，收缩越快！这颗大质量恒星的诞生，比红矮星（需要 1 百万年）快了 5 倍。宇宙中的强者，总是冲劲十足。"
      }
    },
    {
      key: "protostar",
      name: "原恒星",
      ageStartMyr: 0.2, ageEndMyr: 0.5,
      spanLabel: "20 ~ 50 万年",
      state: "快速预主序",
      lumLsun: 50, tempK: 8000, radiusRsun: 3.0,
      color: "#99bbff", halo: "rgba(120,170,255,0.55)",
      note: "原恒星阶段极短，质量大、引力强，快速收缩至核聚变温度。",
      teach: {
        emoji: "⚡",
        title: "极短的青春期",
        caption: "才 30 万年就完成了原恒星阶段！而红矮星需要 8000 万年，太阳需要 4000 万年。大质量恒星就像那种「一入学就毕业」的天才学生。"
      }
    },
    {
      key: "zams",
      name: "主序点火",
      ageStartMyr: 0.5, ageEndMyr: 1.0,
      spanLabel: "50 ~ 100 万年",
      state: "氢 CNO 循环",
      lumLsun: 3000, tempK: 25000, radiusRsun: 4.5,
      color: "#77aaff", halo: "rgba(100,160,255,0.55)",
      note: "核心启动 CNO 循环（更高效的氢聚变），发出炽热的蓝白色光。",
      teach: {
        emoji: "🔵",
        title: "蓝白巨星：3000 个太阳",
        caption: "大质量恒星用的不是质子-质子链，而是 CNO 循环（碳氮氧催化聚变）——效率更高！它的亮度高达 3000 个太阳，颜色是炽热的蓝白色，这就是「蓝超巨星」！"
      }
    },
    {
      key: "blue-supergiant",
      name: "蓝超巨星",
      ageStartMyr: 1.0, ageEndMyr: 8000,
      spanLabel: "100 万 ~ 80 亿年",
      state: "稳定氢主序",
      lumLsun: 4500, tempK: 28000, radiusRsun: 5.0,
      color: "#6699ff", halo: "rgba(90,150,255,0.5)",
      note: "稳定燃烧阶段，极蓝极亮，但寿命只有约 80 亿年——不到太阳的1/10。",
      teach: {
        emoji: "💙",
        title: "短暂的辉煌：只活 80 亿年",
        caption: "太阳能活 100 亿年，它只能活 80 亿年——更亮也更费！一辆跑车油耗远高于家用轿车。质量越大的恒星，燃烧越猛烈，寿命越短。这就是宇宙的代价。"
      }
    },
    {
      key: "red-supergiant",
      name: "红超巨星",
      ageStartMyr: 8000, ageEndMyr: 9500,
      spanLabel: "80 ~ 95 亿年",
      state: "多层核聚变",
      lumLsun: 100000, tempK: 3500, radiusRsun: 700,
      color: "#ff5533", halo: "rgba(255,80,50,0.58)",
      note: "核心氢耗尽后，经历多轮核聚变（He→C→Ne→O→Si），半径膨胀到700倍太阳。",
      teach: {
        emoji: "🔴",
        title: "红超巨星：宇宙中最大的星",
        caption: "它膨胀成了红超巨星——半径约700倍太阳，如果放在太阳位置，外表面超过木星轨道！核心此时在同时燃烧多种元素，像一个「洋葱」，层层叠叠。著名的参宿四就是这种星！"
      }
    },
    {
      key: "pre-supernova",
      name: "超新星前夕",
      ageStartMyr: 9500, ageEndMyr: 9500.001,
      spanLabel: "约 95 亿年（最后几天）",
      state: "铁核坍缩倒计时",
      lumLsun: 200000, tempK: 4000, radiusRsun: 750,
      color: "#ff7722", halo: "rgba(255,120,50,0.7)",
      note: "核心聚变到铁时，聚变无法释放能量，核心坍缩——超新星前的最后几天！",
      teach: {
        emoji: "⚠️",
        title: "末日倒计时：铁核已形成",
        caption: "核心聚变逐渐烧到了铁——而铁无法继续聚变释放能量。此时核心就像一个「不出力」的支撑，随时会在自身引力下瞬间崩塌……超新星爆炸已经倒计时！"
      }
    },
    {
      key: "supernova",
      name: "超新星爆炸 💥",
      ageStartMyr: 9500.001, ageEndMyr: 9500.002,
      spanLabel: "几秒钟！",
      state: "Ⅱ型超新星",
      lumLsun: 10000000000, tempK: 100000, radiusRsun: 100000,
      color: "#ffeeaa", halo: "rgba(255,240,150,0.9)",
      note: "铁核在不到1秒内坍缩，巨大冲击波向外传播，释放出比太阳一生还多的能量！",
      special: "supernova",
      teach: {
        emoji: "💥",
        title: "超新星！宇宙级别的烟火",
        caption: "铁核在不到1秒内坍缩，产生巨大的冲击波，将外层物质以约10%光速抛射出去！这一瞬间，它释放的能量超过太阳一生总辐射量的100倍，比整个银河系还亮！地球上的金、铀等重元素，都是在这里诞生的。"
      }
    },
    {
      key: "neutron-star",
      name: "中子星",
      ageStartMyr: 9500.003, ageEndMyr: 380000,
      spanLabel: "爆炸后永久存在",
      state: "脉冲星 / 中子星",
      lumLsun: 0.001, tempK: 1000000, radiusRsun: 0.000014,
      color: "#aaddff", halo: "rgba(100,200,255,0.35)",
      note: "爆炸后铁核留下约12公里的中子星，密度极高，快速自转，每秒发射射电脉冲。",
      special: "pulsar",
      teach: {
        emoji: "📡",
        title: "中子星：最极致的天体之一",
        caption: "超新星爆炸后，核心被压缩成只有约12公里直径的中子星！每茶匙重达10亿吨，比原子核还密。它以每秒几十转的速度旋转，发出规律的射电脉冲——就是「脉冲星」。1967年被发现时，科学家还以为是外星信号！"
      }
    }
  ],
  endingTitle: "终章：超新星 → 中子星（冷却中）",
  endingDesc: "壮烈的死亡！铁核坍缩在1秒内，诞生中子星。中子星也会慢慢冷却，但它不是黑矮星——它是中子组成的，和白矮星完全不同。",
  endingBadge: "📡 冷中子星",
  endingNote: "⚠️ 注意：中子星的最终形态是『冷中子星』，不是黑矮星。黑矮星是白矮星冷却来的（氦/碳氧组成）；中子星是由中子紧密堆砌而成，两者完全不同！",
  quiz: [
    { q: "超新星爆炸有多亮？", a: "爆炸峰值时比整个银河系还亮！可以在白天肉眼看到，持续数周。", ok: true, icon: "💥" },
    { q: "中子星有多小？", a: "直径只有约12公里——但质量约是太阳的1.5倍！每茶匙重达 10 亿吨。", ok: true, icon: "📡" },
    { q: "中子星会变成黑矮星吗？", a: "不会！黑矮星是白矮星冷却而来（氦或碳氧组成）。中子星由中子紧密构成，冷却后是『冷中子星』，完全不同！", ok: false, icon: "🔬" }
  ]
};

// ============================================================
// 导出：所有星种数据
// ============================================================
const STAR_CATALOG = [STAR_RED_DWARF, STAR_SUN, STAR_MASSIVE];
