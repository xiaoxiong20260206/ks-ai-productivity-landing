/* pioneer-data.js — 先锋队名单与案例数据 v2
 * 列 = Skill市场通道（技术研发/产品/设计/数据分析/运营/行政职能）
 * 行 = 业务线
 */

window.PIONEER_DATA = {
  bizLines: [
    { id: 'zhuZhan',    name: '主站',     bp: '王诩',   color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
    { id: 'ksib',       name: 'KSIB',    bp: '王诩',   color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe' },
    { id: 'shangYeHua', name: '商业化',   bp: '王诩',   color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
    { id: 'zongXiao',   name: '综效',     bp: '于旭东', color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
    { id: 'yanFaXian',  name: '研发线',   bp: '王硕',   color: '#0369a1', bg: '#f0f9ff', border: '#bae6fd' },
    { id: 'shujuPT',    name: '数据平台', bp: '张蕤',   color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
    { id: 'anQuan',     name: '安全风控', bp: '于旭东', color: '#6b7280', bg: '#f9fafb', border: '#e5e7eb' },
  ],
  // 与 Skill 市场保持一致的 6 个通道（顺序一致）
  tiers: [
    { id: 'dev',     label: '技术研发', desc: '研发工程师 · 编码/测试/架构',   color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe' },
    { id: 'product', label: '产品',     desc: '产品经理 · 规划/需求/分析',     color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
    { id: 'design',  label: '设计',     desc: '设计师 · 视觉/体验/交互',       color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
    { id: 'data',    label: '数据分析', desc: '数据分析师 · 取数/洞察/报告',   color: '#0369a1', bg: '#f0f9ff', border: '#bae6fd' },
    { id: 'ops',     label: '运营',     desc: '运营/市场 · 活动/内容/增长',    color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
    { id: 'admin',   label: '行政职能', desc: 'HR/行政/财务/法务',             color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
  ],
  teams: [
    // 主站 — 研发团队（技术研发通道）
    { biz:'zhuZhan', tier:'dev', name:'运营FT',         lead:'郭云龙', size:'~50人', status:'AI Native · 实践L3',    caseTitle:'主站技术 AI Native 研发实践与演进思考' },
    { biz:'zhuZhan', tier:'dev', name:'直播FT',         lead:'闫光',   size:'~40人', status:'AI Native · 实践L3',    caseTitle:'' },
    { biz:'zhuZhan', tier:'dev', name:'搜索FT',         lead:'李思',   size:'~20人', status:'AI Native · 实践L3',    caseTitle:'' },
    { biz:'zhuZhan', tier:'dev', name:'开放平台FT',     lead:'马存',   size:'~50人', status:'AI Native · 实践L2+L3', caseTitle:'' },
    { biz:'zhuZhan', tier:'dev', name:'移动端技术平台', lead:'崔通',   size:'~50人', status:'AI Native · 实践L3',    caseTitle:'' },
    { biz:'zhuZhan', tier:'dev', name:'Core Feature',   lead:'亦明',   size:'~50人', status:'AI 驱动 · L2占比47.6%', caseTitle:'' },

    // KSIB
    { biz:'ksib', tier:'dev', name:'电商',  lead:'牛海玉', size:'~40人', status:'AI Native · 实践L3', caseTitle:'海外研发AI提效介绍' },
    { biz:'ksib', tier:'dev', name:'UG',    lead:'李刚',   size:'~40人', status:'AI Native · 实践L3', caseTitle:'' },

    // 商业化 — 技术研发通道
    { biz:'shangYeHua', tier:'dev', name:'电商（后端+测试）', lead:'陈云/袁首超', size:'10人',  status:'AI Native · 完成KO',   caseTitle:'AI高效研发模式试点报告' },
    { biz:'shangYeHua', tier:'dev', name:'AI基座中心',        lead:'马达',        size:'21人',  status:'AI Native · 进行中',   caseTitle:'' },
    { biz:'shangYeHua', tier:'dev', name:'品牌（后端+前端+测试）', lead:'—',      size:'15人',  status:'AI Native · 完成KO',   caseTitle:'' },
    { biz:'shangYeHua', tier:'dev', name:'生体（后端+前端）', lead:'—',           size:'28人',  status:'AI Native · 完成KO',   caseTitle:'' },
    { biz:'shangYeHua', tier:'dev', name:'业务中台',          lead:'—',           size:'15人',  status:'AI Native · 完成KO',   caseTitle:'' },
    { biz:'shangYeHua', tier:'dev', name:'生服-前端研发',     lead:'何以然',      size:'30人',  status:'AI Native · 实践L2+L3',caseTitle:'' },
    { biz:'shangYeHua', tier:'dev', name:'效果（AI增强）',    lead:'—',           size:'14人',  status:'AI 增强 · 验证中',     caseTitle:'' },
    { biz:'shangYeHua', tier:'dev', name:'基础平台研发',      lead:'吴淼',        size:'30人',  status:'AI 增强 · 验证中',     caseTitle:'' },
    { biz:'shangYeHua', tier:'dev', name:'治理中心',          lead:'—',           size:'20人',  status:'AI 增强 · 实践L2+L3',  caseTitle:'' },
    { biz:'shangYeHua', tier:'dev', name:'智能直播中心',      lead:'—',           size:'10人',  status:'AI 增强 · 验证中',     caseTitle:'' },
    { biz:'shangYeHua', tier:'dev', name:'招商',              lead:'—',           size:'10人',  status:'AI 增强 · 验证中',     caseTitle:'' },
    { biz:'shangYeHua', tier:'dev', name:'生活服务搜索',      lead:'—',           size:'10人',  status:'AI 增强 · 验证中',     caseTitle:'' },
    // 商业化 — 运营通道
    { biz:'shangYeHua', tier:'ops', name:'生服营销',          lead:'张宏伟',      size:'20人',  status:'AI Native · 实践L2+L3',caseTitle:'' },

    // 综效 — 产品/前端研发通道（企业应用前端研发，归技术研发）
    { biz:'zongXiao', tier:'dev', name:'企业应用-前端研发中心', lead:'贾召', size:'~10人', status:'AI 驱动 · 实践L2+L3', caseTitle:'企业应用部 —— AI 协同开发' },

    // 研发线
    { biz:'yanFaXian', tier:'dev', name:'研发效能中心', lead:'王硕/李京', size:'~100人', status:'AI Native · 组织转型中', caseTitle:'【重塑工作流】Kwaipilot 团队研发模式重塑实践' },

    // 数据平台 — 技术研发通道
    { biz:'shujuPT', tier:'dev', name:'数据平台产品&BP',    lead:'张蕤',  size:'100人', status:'AI Native · 实践L2+L3', caseTitle:'' },
    { biz:'shujuPT', tier:'dev', name:'运营数据中心',       lead:'赵海波',size:'17人',  status:'AI Native · 实践L2+L3', caseTitle:'' },
    { biz:'shujuPT', tier:'dev', name:'实时&流量数据',      lead:'邵良开',size:'17人',  status:'AI Native · 实践L2+L3', caseTitle:'实时&流量数据团队研发效能提升实践' },
    { biz:'shujuPT', tier:'dev', name:'实验与流量平台',     lead:'覃侃',  size:'22人',  status:'AI Native · 探索L3',    caseTitle:'AB研发团队研发效能提升实践' },
    { biz:'shujuPT', tier:'dev', name:'数据资产与应用中心', lead:'邓琨',  size:'10人',  status:'AI Native · 实践L2+L3', caseTitle:'基于大模型技术的用户理解新范式' },
    { biz:'shujuPT', tier:'dev', name:'安全数据组',         lead:'翁宇旋',size:'11人',  status:'AI Native · 实践L2+L3', caseTitle:'' },
    // 数据平台 — 数据分析通道
    { biz:'shujuPT', tier:'data', name:'经营数据中心',      lead:'—',     size:'15人',  status:'AI Native · 实践L2+L3', caseTitle:'数据分析师 × CodeFlicker 完整 AI 工作流' },

    // 安全风控 — 技术研发通道
    { biz:'anQuan', tier:'dev', name:'用户体验', lead:'肖宝秋', size:'~50人', status:'AI 驱动 · L2+L3实践中', caseTitle:'' },
  ],
  cases: [
    { biz:'zhuZhan',    team:'运营FT',             title:'主站技术 AI Native 研发实践与演进思考',       metric:'AI Native 全流程落地',        date:'2026-03' },
    { biz:'ksib',       team:'电商',               title:'海外研发AI提效介绍',                          metric:'跨时区 AI 协作模式验证',      date:'2026-03' },
    { biz:'shangYeHua', team:'电商（后端+测试）',  title:'AI高效研发模式试点报告',                      metric:'完成KO，进入规模化',          date:'2026-03' },
    { biz:'zongXiao',   team:'企业应用-前端研发中心', title:'企业应用部 —— AI 协同开发',               metric:'AI 驱动全面实践L2+L3',        date:'2026-03' },
    { biz:'yanFaXian',  team:'研发效能中心',        title:'【重塑工作流】Kwaipilot 团队研发模式重塑实践', metric:'100人团队 AI Native 组织转型',date:'2026-Q1' },
    { biz:'shujuPT',    team:'实时&流量数据',       title:'实时&流量数据团队研发效能提升实践',            metric:'L2+L3全量实践',               date:'2026-03' },
    { biz:'shujuPT',    team:'实验与流量平台',      title:'AB研发团队研发效能提升实践',                  metric:'探索L3阶段完成',              date:'2026-03' },
    { biz:'shujuPT',    team:'数据资产与应用中心',  title:'基于大模型技术的用户理解新范式',              metric:'AI 用户理解新方法落地',        date:'2026-03' },
    { biz:'shujuPT',    team:'经营数据中心',        title:'数据分析师 × CodeFlicker 完整 AI 工作流',     metric:'分析报告全流程 AI 化',         date:'2026-03' },
  ]
};
