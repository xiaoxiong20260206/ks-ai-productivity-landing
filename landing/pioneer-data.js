/* pioneer-data.js — 先锋队名单与案例数据 */

window.PIONEER_DATA = {
  bizLines: [
    { id: 'zhuZhan',    name: '主站',     bp: '王娟',   color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
    { id: 'ksib',       name: 'KSIB',    bp: '王娟',   color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe' },
    { id: 'shangYeHua', name: '商业化',   bp: '王贤',   color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
    { id: 'zongXiao',   name: '综效',     bp: '于旭东', color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
    { id: 'yanFaXian',  name: '研发线',   bp: '于旭东', color: '#0369a1', bg: '#f0f9ff', border: '#bae6fd' },
    { id: 'shujuPT',    name: '数据平台', bp: '—',      color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
    { id: 'anQuan',     name: '安全风控', bp: '于旭东', color: '#6b7280', bg: '#f9fafb', border: '#e5e7eb' },
  ],
  tiers: [
    { id: 'native', label: 'AI Native',  desc: '全面 AI 驱动开发，人 + AI 协同全流程',    color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
    { id: 'driven', label: 'AI 驱动',   desc: 'AI 深度参与核心环节，>50% 工作量 AI 辅助', color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe' },
    { id: 'enhanced',label: 'AI 增强',  desc: 'AI 工具全面铺开，提升局部效率',           color: '#0369a1', bg: '#f0f9ff', border: '#bae6fd' },
  ],
  teams: [
    // 主站
    { biz:'zhuZhan', tier:'native', name:'运营FT',          lead:'郭云龙', size:'~50人', status:'实践L3',    caseTitle:'主站技术 AI Native 研发实践与演进思考' },
    { biz:'zhuZhan', tier:'native', name:'直播FT',          lead:'闫光',   size:'~40人', status:'实践L3',    caseTitle:'' },
    { biz:'zhuZhan', tier:'native', name:'搜索FT',          lead:'李思',   size:'~20人', status:'实践L3',    caseTitle:'' },
    { biz:'zhuZhan', tier:'native', name:'开放平台FT',      lead:'马存',   size:'~50人', status:'实践L2+L3', caseTitle:'' },
    { biz:'zhuZhan', tier:'native', name:'移动端技术平台',  lead:'崔通',   size:'~50人', status:'实践L3',    caseTitle:'' },
    { biz:'zhuZhan', tier:'driven', name:'Core Feature',    lead:'亦明',   size:'~50人', status:'L2占比47.6%',caseTitle:'' },
    // KSIB
    { biz:'ksib', tier:'native', name:'电商',  lead:'牛海玉', size:'~40人', status:'实践L3', caseTitle:'海外研发AI提效介绍' },
    { biz:'ksib', tier:'native', name:'UG',    lead:'李刚',   size:'~40人', status:'实践L3', caseTitle:'' },
    // 商业化
    { biz:'shangYeHua', tier:'native', name:'电商',         lead:'陈云/袁首超', size:'10人',  status:'完成KO',   caseTitle:'AI高效研发模式试点报告' },
    { biz:'shangYeHua', tier:'native', name:'AI基座中心',   lead:'马达',        size:'21人',  status:'进行中',   caseTitle:'' },
    { biz:'shangYeHua', tier:'native', name:'品牌',         lead:'—',           size:'15人',  status:'完成KO',   caseTitle:'' },
    { biz:'shangYeHua', tier:'native', name:'生体',         lead:'—',           size:'28人',  status:'完成KO',   caseTitle:'' },
    { biz:'shangYeHua', tier:'native', name:'业务中台',     lead:'—',           size:'15人',  status:'完成KO',   caseTitle:'' },
    { biz:'shangYeHua', tier:'native', name:'生服-前端研发',lead:'何以然',      size:'30人',  status:'实践L2+L3',caseTitle:'' },
    { biz:'shangYeHua', tier:'native', name:'生服营销',     lead:'张宏伟',      size:'20人',  status:'实践L2+L3',caseTitle:'' },
    { biz:'shangYeHua', tier:'enhanced', name:'效果',       lead:'—',           size:'14人',  status:'验证中',   caseTitle:'' },
    { biz:'shangYeHua', tier:'enhanced', name:'基础平台研发',lead:'吴淼',       size:'30人',  status:'验证中',   caseTitle:'' },
    { biz:'shangYeHua', tier:'enhanced', name:'治理中心',   lead:'—',           size:'20人',  status:'实践L2+L3',caseTitle:'' },
    { biz:'shangYeHua', tier:'enhanced', name:'智能直播中心',lead:'—',          size:'10人',  status:'验证中',   caseTitle:'' },
    { biz:'shangYeHua', tier:'enhanced', name:'招商',       lead:'—',           size:'10人',  status:'验证中',   caseTitle:'' },
    { biz:'shangYeHua', tier:'enhanced', name:'生活服务搜索',lead:'—',          size:'10人',  status:'验证中',   caseTitle:'' },
    // 综效
    { biz:'zongXiao', tier:'driven', name:'企业应用-前端研发中心', lead:'贾召', size:'~10人', status:'实践L2+L3', caseTitle:'企业应用部 —— AI 协同开发' },
    // 研发线
    { biz:'yanFaXian', tier:'native', name:'研发效能中心', lead:'王硕/李京', size:'~100人', status:'AI-Native组织转型中', caseTitle:'【重塑工作流】Kwaipilot 团队研发模式重塑实践' },
    // 数据平台
    { biz:'shujuPT', tier:'native', name:'数据平台产品&BP',    lead:'张蕤',  size:'100人', status:'实践L2+L3', caseTitle:'' },
    { biz:'shujuPT', tier:'native', name:'运营数据中心',       lead:'赵海波',size:'17人',  status:'实践L2+L3', caseTitle:'' },
    { biz:'shujuPT', tier:'native', name:'实时&流量数据',      lead:'邵良开',size:'17人',  status:'实践L2+L3', caseTitle:'实时&流量数据 团队 研发效能提升实践' },
    { biz:'shujuPT', tier:'native', name:'实验与流量平台',     lead:'覃侃',  size:'22人',  status:'探索L3',    caseTitle:'AB 研发团队研发效能提升实践' },
    { biz:'shujuPT', tier:'native', name:'数据资产与应用中心', lead:'邓琨',  size:'10人',  status:'实践L2+L3', caseTitle:'基于大模型技术的用户理解新范式' },
    { biz:'shujuPT', tier:'native', name:'安全数据组',         lead:'翁宇旋',size:'11人',  status:'实践L2+L3', caseTitle:'' },
    { biz:'shujuPT', tier:'native', name:'经营数据中心',       lead:'—',     size:'15人',  status:'实践L2+L3', caseTitle:'数据分析师 × CodeFlicker 完整 AI 工作流' },
    // 安全风控
    { biz:'anQuan', tier:'driven', name:'用户体验', lead:'肖宝秋', size:'~50人', status:'L2+L3实践中', caseTitle:'' },
  ],
  cases: [
    { biz:'zhuZhan',    team:'运营FT',         title:'主站技术 AI Native 研发实践与演进思考',    metric:'AI Native 全流程落地', tag:'研发效能', date:'2026-03' },
    { biz:'ksib',       team:'电商',           title:'海外研发AI提效介绍',                       metric:'跨时区 AI 协作',       tag:'研发效能', date:'2026-03' },
    { biz:'shangYeHua', team:'电商',           title:'AI高效研发模式试点报告',                   metric:'完成KO，已规模化',      tag:'研发效能', date:'2026-03' },
    { biz:'zongXiao',   team:'企业应用-前端',  title:'企业应用部 —— AI 协同开发',               metric:'L2+L3全面实践',        tag:'协同开发', date:'2026-03' },
    { biz:'yanFaXian',  team:'研发效能中心',   title:'【重塑工作流】Kwaipilot 团队研发模式重塑实践', metric:'100人团队 AI Native 转型', tag:'组织转型', date:'2026-Q1' },
    { biz:'shujuPT',    team:'实时&流量数据',  title:'实时&流量数据团队研发效能提升实践',         metric:'L2+L3全量实践',        tag:'研发效能', date:'2026-03' },
    { biz:'shujuPT',    team:'实验与流量平台', title:'AB 研发团队研发效能提升实践',               metric:'探索L3阶段',            tag:'研发效能', date:'2026-03' },
    { biz:'shujuPT',    team:'数据资产中心',   title:'基于大模型技术的用户理解新范式',            metric:'AI 用户理解新方法',     tag:'AI应用',   date:'2026-03' },
    { biz:'shujuPT',    team:'经营数据中心',   title:'数据分析师 × CodeFlicker 完整 AI 工作流',  metric:'分析报告全流程 AI 化',  tag:'数据分析', date:'2026-03' },
  ]
};
