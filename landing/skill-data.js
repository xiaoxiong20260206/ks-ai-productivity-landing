/* skill-data.js — Complete Skill market data (v2: 分层重排 + 属性扩展 + 标题精简) */

window.SKILL_DATA = {
  channels: [
    { id: 'dev',     name: '技术研发', desc: '研发全生命周期', online: 14, total: 33 },
    { id: 'product', name: '产品',     desc: '产品规划与协作', online: 5,  total: 14 },
    { id: 'design',  name: '设计',     desc: '视觉与体验',     online: 3,  total: 6  },
    { id: 'data',    name: '数据分析', desc: '数据洞察决策',   online: 5,  total: 13 },
    { id: 'ops',     name: '运营',     desc: '内外部运营',     online: 5,  total: 20 },
    { id: 'admin',   name: '行政职能', desc: 'HR/财务/法务等', online: 4,  total: 12 },
  ],
  // 展示顺序：L4 → L3（生产工具）→ L2（协作办公）→ L1（基础设施）
  layers: [
    /* ── L4：业务定制层 ──────────────────────────────────────── */
    {
      id: 'l4', code: 'L4', name: '业务定制层', desc: '短视频/直播/社区内容生态',
      color: '#16a34a',
      packages: {
        dev:     [{ id:'l4-dev',     title:'主站研发 AI',         status:'canary', skillCount:8,  overallStatus:'building', skillProgress:'3/8',  knowledgeBase:'building',   desc:'面向主站研发工程师的定制化 AI 能力包，覆盖代码生成、需求澄清、自动测试等', skills:[{name:'智能代码生成 (主站版)',status:'done',desc:'理解主站代码规范，精准生成符合业务逻辑的代码'},{name:'需求文档智能解析',status:'done',desc:'自动拆解 PRD，生成任务清单与开发要点'},{name:'跨仓库代码研究',status:'canary',desc:'跨多仓库理解代码关联，辅助排查问题'},{name:'主站 Bug 自动修复',status:'wip',desc:'识别错误模式，自动提出修复方案'},{name:'主站测试用例生成',status:'wip'},{name:'代码 Review 助手（主站规范）',status:'plan'},{name:'性能优化建议 (主站)',status:'plan'},{name:'主站发布流程辅助',status:'plan'}] }],
        product: [{ id:'l4-product', title:'主站数据分析',         status:'done',   skillCount:4,  overallStatus:'applied',  skillProgress:'3/4',  knowledgeBase:'notStarted', desc:'主站产品数据分析与洞察能力', skills:[{name:'DAU/MAU 指标分析',status:'done'},{name:'用户行为路径分析',status:'done'},{name:'内容推荐数据解读',status:'done'},{name:'A/B 实验分析',status:'wip'}] }],
        design:  [{ id:'l4-design',  title:'主站视觉设计',         status:'wip',    skillCount:3,  overallStatus:'building', skillProgress:'0/3',  knowledgeBase:'notStarted', skills:[{name:'短视频封面优化',status:'wip'},{name:'直播间视觉规范检查',status:'plan'},{name:'UGC 内容视觉打分',status:'plan'}] }],
        data:    [{ id:'l4-data',    title:'主站数据洞察',         status:'done',   skillCount:5,  overallStatus:'applied',  skillProgress:'3/5',  knowledgeBase:'building',   desc:'数据分析师专属，覆盖取数、分析、报表全流程', skills:[{name:'快数智能取数',status:'done',desc:'自然语言描述需求，自动生成 Hive SQL'},{name:'指标异动归因',status:'done',desc:'智能分析指标波动原因'},{name:'用户画像生成',status:'done'},{name:'运营活动效果分析',status:'canary'},{name:'数据报告自动生成',status:'wip'}] }],
        ops:     [{ id:'l4-ops',     title:'主站运营 AI',          status:'done',   skillCount:6,  overallStatus:'applied',  skillProgress:'3/6',  knowledgeBase:'notStarted', desc:'主站运营专属能力，覆盖内容审核、活动策划等', skills:[{name:'内容标签智能打标',status:'done'},{name:'违规内容初审',status:'done'},{name:'热点话题追踪',status:'done'},{name:'活动方案生成',status:'canary'},{name:'运营周报自动生成',status:'canary'},{name:'UGC 高质量内容挖掘',status:'plan'}] }],
        admin:   [{ id:'l4-admin',   title:'行政职能 AI',          status:'done',   skillCount:4,  overallStatus:'applied',  skillProgress:'3/4',  knowledgeBase:'notStarted', desc:'行政/HR/法务专属，覆盖办公自动化', skills:[{name:'HR 智能问答',status:'done',desc:'人事政策、福利、流程智能解答'},{name:'合同智能审查',status:'done',desc:'自动识别合同风险点'},{name:'招聘 JD 生成与优化',status:'canary'},{name:'离职手续流程辅助',status:'plan'}] }],
      }
    },

    /* ── L3：生产工具层（原 L2）────────────────────────────── */
    {
      id: 'l3', code: 'L3', name: '生产工具层', desc: '软件研发全生命周期',
      color: '#7c3aed',
      packages: {
        dev:     [{ id:'l3-dev',     title:'研发工具',             status:'done',   skillCount:8,  overallStatus:'applied',  skillProgress:'6/8',  knowledgeBase:'published',  desc:'覆盖 KATE/KDev/CodeFlicker/Git 全研发工具链', skills:[{name:'CodeFlicker 编程助手',status:'done',desc:'AI Pair Programmer，代码生成/补全/解释'},{name:'KATE 需求理解',status:'done',desc:'理解 KATE 任务，自动拆解开发步骤'},{name:'KDev 调试助手',status:'done',desc:'智能定位 Bug，给出修复建议'},{name:'Git Commit 自动生成',status:'done'},{name:'代码安全扫描辅助',status:'canary'},{name:'SQL 优化建议',status:'canary'},{name:'API 文档自动生成',status:'wip'},{name:'自动化测试生成',status:'wip'}] }],
        product: [{ id:'l3-product', title:'产品研发协作',         status:'done',   skillCount:4,  overallStatus:'applied',  skillProgress:'2/4',  knowledgeBase:'notStarted', skills:[{name:'KEEP 需求文档智能生成',status:'done'},{name:'原型图说明生成',status:'done'},{name:'需求评审纪要',status:'canary'},{name:'排期自动估算',status:'plan'}] }],
        design:  [{ id:'l3-design',  title:'设计工具',             status:'done',   skillCount:4,  overallStatus:'applied',  skillProgress:'2/4',  knowledgeBase:'notStarted', skills:[{name:'设计稿自动切图说明',status:'done'},{name:'色彩规范检查',status:'done'},{name:'响应式设计建议',status:'wip'},{name:'设计稿 → 代码生成',status:'plan'}] }],
        data:    [{ id:'l3-data',    title:'Data Agent',           status:'done',   skillCount:5,  overallStatus:'applied',  skillProgress:'3/5',  knowledgeBase:'published',  desc:'Data Agent 智能数据分析能力，全数据分析师可用', skills:[{name:'天策/快数自然语言取数',status:'done',desc:'用自然语言描述，AI 自动写 SQL 并取数'},{name:'Hive 表智能检索',status:'done'},{name:'数据血缘分析',status:'done'},{name:'可视化图表生成',status:'canary'},{name:'数据分析报告自动撰写',status:'wip'}] }],
        ops:     [{ id:'l3-ops',     title:'运营工具',             status:'wip',    skillCount:4,  overallStatus:'building', skillProgress:'0/4',  knowledgeBase:'notStarted', skills:[{name:'小红书/抖音内容生成',status:'canary'},{name:'广告文案优化',status:'canary'},{name:'用户反馈智能分类',status:'wip'},{name:'内容推荐效果分析',status:'plan'}] }],
        admin:   [{ id:'l3-admin',   title:'职能工具',             status:'wip',    skillCount:3,  overallStatus:'building', skillProgress:'0/3',  knowledgeBase:'notStarted', skills:[{name:'财务报销单智能填写',status:'wip'},{name:'法律合同模板生成',status:'wip'},{name:'HR 数据统计自动化',status:'plan'}] }],
      }
    },

    /* ── L2：协作办公层（原 L3，只保留通用包，无职能分列）── */
    {
      id: 'l2', code: 'L2', name: '协作办公层', desc: '日常协作 & 办公自动化',
      color: '#0369a1',
      // 只保留通用行，不再有 packages 职能分列
      universal: [
        { id:'l2-kim',  title:'KIM 移动办公',  status:'done', skillCount:6, colspan: 6, overallStatus:'applied',  skillProgress:'4/6',  knowledgeBase:'notStarted', desc:'全员适用，基于 KIM 的 AI 助手核心能力', skills:[{name:'KIM 智能助手基础对话',status:'done'},{name:'会议纪要自动生成',status:'done'},{name:'任务创建与追踪',status:'done'},{name:'跨部门协作通知',status:'done'},{name:'待办事项智能整理',status:'canary'},{name:'KIM 群智能摘要',status:'wip'}] },
        { id:'l2-docs', title:'Docs 协同文档', status:'done', skillCount:5, colspan: 6, overallStatus:'applied',  skillProgress:'3/5',  knowledgeBase:'building',   desc:'基于快手内网 Docs 的文档智能能力', skills:[{name:'文档智能摘要',status:'done'},{name:'多文档关联分析',status:'done'},{name:'文档问答检索',status:'done'},{name:'表格数据智能分析',status:'canary'},{name:'文档自动格式化',status:'plan'}] },
        { id:'l2-bpm',  title:'BPM 全员审批', status:'done', skillCount:4, colspan: 6, overallStatus:'applied',  skillProgress:'3/4',  knowledgeBase:'notStarted', desc:'审批流程智能加速', skills:[{name:'审批单智能填写',status:'done'},{name:'审批状态查询',status:'done'},{name:'报销智能辅助',status:'done'},{name:'合规检查',status:'wip'}] },
      ],
    },

    /* ── L1：基础设施层 ────────────────────────────────────── */
    {
      id: 'l1', code: 'L1', name: '基础设施层', desc: '底层平台 & 安全合规',
      color: '#dc2626',
      packages: {
        dev:     [{ id:'l1-dev',     title:'安全 & 基础运维',      status:'done',   skillCount:7,  overallStatus:'applied',  skillProgress:'4/7',  knowledgeBase:'notStarted', desc:'安全合规与基础设施运维智能化', skills:[{name:'安全漏洞扫描辅助',status:'done'},{name:'权限申请智能审核',status:'done'},{name:'CMDB 资产智能查询',status:'done'},{name:'故障根因分析',status:'done'},{name:'Radar 告警智能处理',status:'canary'},{name:'容量规划建议',status:'wip'},{name:'合规检查自动化',status:'plan'}] }],
        product: [],
        design:  [],
        data:    [{ id:'l1-data',    title:'数据存储 & 查询优化',  status:'done',   skillCount:3,  overallStatus:'applied',  skillProgress:'2/3',  knowledgeBase:'notStarted', skills:[{name:'KDB 查询优化建议',status:'done'},{name:'数据仓库分层说明',status:'done'},{name:'慢查询诊断',status:'canary'}] }],
        ops:     [],
        admin:   [{ id:'l1-admin',   title:'IT 智能运维',          status:'done',   skillCount:3,  overallStatus:'applied',  skillProgress:'2/3',  knowledgeBase:'notStarted', skills:[{name:'IT 设备智能报修',status:'done'},{name:'网络故障初诊',status:'done'},{name:'账号权限自动化',status:'plan'}] }],
      }
    }
  ],
  totalStats: {
    packages: 26, online: 36, canary: 5, wip: 16, plan: 41, total: 98
  }
};

/* ── L4 业务线定制包（按业务线切换时使用）──────────────────────────
 * 默认显示「主站」；切换下拉后替换 L4 行内容
 * 格式：{ [bizId]: { [channelId]: [ pkgObject, ... ] } }
 */
window.L4_BIZ_PACKAGES = {
  zhuZhan: {
    dev:     [{ id:'l4-dev',     title:'主站研发 AI',         status:'canary', skillCount:8,  overallStatus:'building', skillProgress:'3/8',  knowledgeBase:'building',   desc:'面向主站研发工程师的定制化 AI 能力包，覆盖代码生成、需求澄清、自动测试等' }],
    product: [{ id:'l4-product', title:'主站数据分析',         status:'done',   skillCount:4,  overallStatus:'applied',  skillProgress:'3/4',  knowledgeBase:'notStarted', desc:'主站产品数据分析与洞察能力' }],
    design:  [{ id:'l4-design',  title:'主站视觉设计',         status:'wip',    skillCount:3,  overallStatus:'building', skillProgress:'0/3',  knowledgeBase:'notStarted', desc:'短视频封面优化/直播间视觉规范/UGC 内容视觉打分' }],
    data:    [{ id:'l4-data',    title:'主站数据洞察',         status:'done',   skillCount:5,  overallStatus:'applied',  skillProgress:'3/5',  knowledgeBase:'building',   desc:'数据分析师专属，覆盖取数、分析、报表全流程' }],
    ops:     [{ id:'l4-ops',     title:'主站运营 AI',          status:'done',   skillCount:6,  overallStatus:'applied',  skillProgress:'3/6',  knowledgeBase:'notStarted', desc:'主站运营专属能力，覆盖内容审核、活动策划等' }],
    admin:   [{ id:'l4-admin',   title:'行政职能 AI',          status:'done',   skillCount:4,  overallStatus:'applied',  skillProgress:'3/4',  knowledgeBase:'notStarted', desc:'行政/HR/法务专属，覆盖办公自动化' }],
  },
  ksib: {
    dev:     [{ id:'l4-ksib-dev',     title:'KSIB 研发 AI',        status:'wip',    skillCount:5,  overallStatus:'building', skillProgress:'0/5',  knowledgeBase:'notStarted', desc:'面向 KSIB 研发工程师，支持海外多时区协作与本地化研发' }],
    product: [{ id:'l4-ksib-product', title:'KSIB 产品分析',        status:'plan',   skillCount:3,  overallStatus:'building', skillProgress:'0/3',  knowledgeBase:'notStarted', desc:'海外市场产品数据分析' }],
    design:  [],
    data:    [{ id:'l4-ksib-data',    title:'KSIB 数据洞察',        status:'plan',   skillCount:3,  overallStatus:'building', skillProgress:'0/3',  knowledgeBase:'notStarted', desc:'海外业务数据分析与报告自动化' }],
    ops:     [{ id:'l4-ksib-ops',     title:'KSIB 运营 AI',         status:'plan',   skillCount:4,  overallStatus:'building', skillProgress:'0/4',  knowledgeBase:'notStarted', desc:'海外运营内容生成与活动策划' }],
    admin:   [],
  },
  shangYeHua: {
    dev:     [{ id:'l4-sy-dev',     title:'商业化研发 AI',        status:'done',   skillCount:10, overallStatus:'applied',  skillProgress:'7/10', knowledgeBase:'building',   desc:'商业化研发全流程 AI 化，覆盖广告/品牌/电商研发链路' }],
    product: [{ id:'l4-sy-product', title:'商业化产品',            status:'wip',    skillCount:4,  overallStatus:'building', skillProgress:'0/4',  knowledgeBase:'notStarted', desc:'商业化产品规划与数据分析' }],
    design:  [{ id:'l4-sy-design',  title:'商业化创意设计',        status:'plan',   skillCount:3,  overallStatus:'building', skillProgress:'0/3',  knowledgeBase:'notStarted', desc:'广告创意生成与优化' }],
    data:    [{ id:'l4-sy-data',    title:'商业化数据洞察',        status:'done',   skillCount:5,  overallStatus:'applied',  skillProgress:'4/5',  knowledgeBase:'notStarted', desc:'广告数据看板智能分析' }],
    ops:     [{ id:'l4-sy-ops',     title:'商业化运营 AI',         status:'done',   skillCount:6,  overallStatus:'applied',  skillProgress:'4/6',  knowledgeBase:'notStarted', desc:'生服营销/活动策划/内容生成' }],
    admin:   [],
  },
  zongXiao: {
    dev:     [{ id:'l4-zx-dev',   title:'综效研发 AI',           status:'canary', skillCount:4,  overallStatus:'building', skillProgress:'1/4',  knowledgeBase:'notStarted', desc:'企业应用前端研发效能提升' }],
    product: [],
    design:  [],
    data:    [],
    ops:     [],
    admin:   [{ id:'l4-zx-admin', title:'综效职能 AI',           status:'plan',   skillCount:3,  overallStatus:'building', skillProgress:'0/3',  knowledgeBase:'notStarted', desc:'企业内部系统行政职能自动化' }],
  },
  yanFaXian: {
    dev:     [{ id:'l4-yfx-dev',  title:'研发线 AI',             status:'done',   skillCount:8,  overallStatus:'applied',  skillProgress:'6/8',  knowledgeBase:'building',   desc:'研发效能中心 AI Native 研发模式工具链' }],
    product: [],
    design:  [],
    data:    [],
    ops:     [],
    admin:   [],
  },
  shujuPT: {
    dev:     [{ id:'l4-sj-dev',     title:'数据平台研发 AI',      status:'done',   skillCount:6,  overallStatus:'applied',  skillProgress:'4/6',  knowledgeBase:'notStarted', desc:'数据平台工程师代码生成/SQL 优化/数据血缘分析' }],
    product: [],
    design:  [],
    data:    [{ id:'l4-sj-data',    title:'数据平台分析师',        status:'done',   skillCount:5,  overallStatus:'applied',  skillProgress:'4/5',  knowledgeBase:'building',   desc:'经营数据中心全流程 AI 分析' }],
    ops:     [],
    admin:   [],
  },
  anQuan: {
    dev:     [{ id:'l4-aq-dev',  title:'安全风控研发 AI',        status:'wip',    skillCount:4,  overallStatus:'building', skillProgress:'0/4',  knowledgeBase:'notStarted', desc:'安全攻防、漏洞检测、合规扫描 AI 辅助' }],
    product: [],
    design:  [],
    data:    [],
    ops:     [],
    admin:   [],
  },
};
