/* skill-content.js — Renders the AI Skill Market tab from SKILL_DATA (v2) */

document.addEventListener('DOMContentLoaded', function () {
  renderSkillTab();
});

function renderSkillTab() {
  const container = document.getElementById('tab-skill');
  if (!container || !window.SKILL_DATA) return;

  const d = window.SKILL_DATA;
  const channels = d.channels;
  const layers = d.layers;
  const stats = d.totalStats;

  // Role-to-channel mapping (index)
  const roleToColIndex = {
    'all':     null,
    'dev':     0,
    'product': 1,
    'design':  2,
    'data':    3,
    'ops':     4,
    'admin':   5,
  };

  let activeRole = 'all';

  container.innerHTML = `
    <section class="section">
      <div class="section-inner">
        <div class="section-label">🛒 AI 技能 &amp; 知识市场</div>
        <h2 class="section-title">快手公司级 AI 技能 &amp; 知识市场</h2>
        <p class="section-desc">AI 时代的「公司级 App Store」——每个格子包含<strong>技能</strong>（可直接调用）和<strong>知识</strong>（AI 员工的记忆库）两种类型，知识部分持续建设中</p>

        <!-- Stats bar -->
        <div class="skill-stats-bar">
          <div class="sk-stat">
            <div class="sk-stat-accent" style="background:var(--accent-blue)"></div>
            <div class="sk-stat-num">${stats.packages}</div>
            <div class="sk-stat-label">技能包总数</div>
            <div class="sk-stat-sub">4层 × 6通道</div>
          </div>
          <div class="sk-stat">
            <div class="sk-stat-accent" style="background:var(--accent-green)"></div>
            <div class="sk-stat-num">${stats.online}</div>
            <div class="sk-stat-label">已上线技能</div>
            <div class="sk-stat-sub">${Math.round(stats.online/stats.total*100)}% 上线率</div>
          </div>
          <div class="sk-stat">
            <div class="sk-stat-accent" style="background:var(--accent-purple)"></div>
            <div class="sk-stat-num">${stats.canary}</div>
            <div class="sk-stat-label">灰度中</div>
            <div class="sk-stat-sub">Canary 验证阶段</div>
          </div>
          <div class="sk-stat">
            <div class="sk-stat-accent" style="background:var(--accent-amber)"></div>
            <div class="sk-stat-num">${stats.wip}</div>
            <div class="sk-stat-label">开发中</div>
            <div class="sk-stat-sub">In Development</div>
          </div>
          <div class="sk-stat">
            <div class="sk-stat-accent" style="background:var(--text-muted)"></div>
            <div class="sk-stat-num">${stats.plan}</div>
            <div class="sk-stat-label">计划中</div>
            <div class="sk-stat-sub">Roadmap</div>
          </div>
        </div>

        <!-- Role filters -->
        <div class="role-filters" id="roleFilters">
          <button class="role-filter active" data-role="all">👀 全部</button>
          <button class="role-filter" data-role="dev">👨‍💻 研发工程师</button>
          <button class="role-filter" data-role="product">📋 产品经理</button>
          <button class="role-filter" data-role="data">📊 数据分析师</button>
          <button class="role-filter" data-role="ops">📣 运营</button>
          <button class="role-filter" data-role="admin">🏢 行政/HR</button>
          <button class="role-filter" data-role="design">🎨 设计</button>
        </div>

        <!-- Legend -->
        <div class="skill-legend">
          <span style="font-weight:600;color:var(--text-primary)">图例：</span>
          <div class="legend-item"><div class="legend-dot" style="background:var(--done-color)"></div><span>已上线</span></div>
          <div class="legend-item"><div class="legend-dot" style="background:var(--canary-color)"></div><span>灰度中</span></div>
          <div class="legend-item"><div class="legend-dot" style="background:var(--wip-color)"></div><span>开发中</span></div>
          <div class="legend-item"><div class="legend-dot" style="background:var(--plan-color)"></div><span>计划中</span></div>
          <span style="margin-left:8px">左侧彩条 = 架构层标识色 · 点击卡片查看技能详情</span>
        </div>

        <!-- Matrix wrapper -->
        <div class="skill-matrix-wrapper" id="skillMatrixWrapper">
          ${buildMatrixHTML(channels, layers)}
        </div>

        <!-- Skill flow -->
        <div class="section-label" style="margin-top:40px">🔧 Skill 接入流程</div>
        <h3 style="font-size:18px;font-weight:700;margin-bottom:20px">如何将你的场景 Skill 化</h3>
        <div class="skill-flow">
          <div class="flow-step">
            <div class="flow-num">1</div>
            <div class="flow-title">梳理场景</div>
            <div class="flow-desc">明确业务需求，定义 Skill 输入输出</div>
            <div class="flow-arrow">→</div>
          </div>
          <div class="flow-step">
            <div class="flow-num">2</div>
            <div class="flow-title">沙盒测试</div>
            <div class="flow-desc">安全扫描 + 功能验证</div>
            <div class="flow-arrow">→</div>
          </div>
          <div class="flow-step">
            <div class="flow-num">3</div>
            <div class="flow-title">灰度发布</div>
            <div class="flow-desc">小范围验证效果与安全</div>
            <div class="flow-arrow">→</div>
          </div>
          <div class="flow-step">
            <div class="flow-num">4</div>
            <div class="flow-title">全量监控</div>
            <div class="flow-desc">持续监控 + 官方认证上线</div>
          </div>
        </div>
        <div class="skill-note">
          📌 所有技能包均由对应平台<strong>官方团队认证出品</strong>，经六阶段流程：
          静态安全扫描 → 沙盒测试 → 上线前评测 → 灰度发布 → 全量上线 → 持续监控。<br/>
          通用技能由 AI 基建虚拟组织统一管理 · 经管委决议授权推动。
          如需提交 Skill 需求，联系 AI 基建虚拟组。
        </div>
      </div>
    </section>

    <!-- ===== 团队 & 个人级 Skill 市场 ===== -->
    <section class="section section-bg-gray" style="border-top:2px solid var(--border)">
      <div class="section-inner">
        <div class="section-label">🧩 更多市场层级</div>
        <h2 class="section-title">团队 &amp; 个人级 Skill 市场</h2>
        <p class="section-desc">
          除公司级官方 Skill 外，MyFlicker 还支持<strong>团队定制</strong>和<strong>个人专属</strong>两种更灵活的 Skill 形态，让 AI 员工真正懂你的业务场景。
        </p>

        <!-- 三级市场架构说明 -->
        <div class="skill-market-levels">
          <!-- 公司级（当前页面已有，作为背景参照）-->
          <div class="sml-item sml-company">
            <div class="sml-tier-badge">L0</div>
            <div class="sml-content">
              <div class="sml-header">
                <div class="sml-icon">🏢</div>
                <div>
                  <div class="sml-name">公司级官方市场</div>
                  <div class="sml-subtitle">当前页面 · 经管委授权 · 6阶段认证</div>
                </div>
                <div class="sml-status sml-status-live">已上线</div>
              </div>
              <div class="sml-desc">由 AI 基建虚拟组统一管理，覆盖全员通用场景（协作办公、研发工具链、基础设施），经严格安全审核方可上线。</div>
              <div class="sml-scope">📦 26 个技能包 · 98 个 Skill · 覆盖 4 层 × 6 职能通道</div>
            </div>
          </div>

          <!-- 团队级 -->
          <div class="sml-item sml-team">
            <div class="sml-tier-badge sml-badge-team">L1</div>
            <div class="sml-content">
              <div class="sml-header">
                <div class="sml-icon">👥</div>
                <div>
                  <div class="sml-name">团队级定制市场</div>
                  <div class="sml-subtitle">基于 MyFlicker · 业务团队自建</div>
                </div>
                <div class="sml-status sml-status-hot">开放申请</div>
              </div>
              <div class="sml-desc">业务团队可在 MyFlicker 内创建团队专属 Skill 空间，沉淀本团队的业务流程、数据口径、代码规范等私有知识，仅团队内可见可用。</div>
              <div class="sml-scope">🎯 适用：先锋队团队、项目组、虚拟组织</div>
              <div class="sml-features">
                <span class="sml-feat">📋 私有 Skill 创建</span>
                <span class="sml-feat">🔒 团队隔离</span>
                <span class="sml-feat">🧠 业务知识沉淀</span>
                <span class="sml-feat">📊 团队用量统计</span>
              </div>
              <div class="sml-actions">
                <a class="sml-btn sml-btn-primary" href="https://myflicker.kuaishou.com/team" target="_blank">在 MyFlicker 创建团队空间 →</a>
                <a class="sml-btn" href="https://myflicker.kuaishou.com/docs/team-skill" target="_blank">查看团队 Skill 指南</a>
              </div>
            </div>
          </div>

          <!-- 个人级 -->
          <div class="sml-item sml-personal">
            <div class="sml-tier-badge sml-badge-personal">L2</div>
            <div class="sml-content">
              <div class="sml-header">
                <div class="sml-icon">🧑‍💻</div>
                <div>
                  <div class="sml-name">个人专属市场</div>
                  <div class="sml-subtitle">基于 MyFlicker · 个人自建</div>
                </div>
                <div class="sml-status sml-status-hot">开放申请</div>
              </div>
              <div class="sml-desc">每位快手人都可以在 MyFlicker 内训练属于自己的 AI 员工：记住你的工作风格、常用术语、偏好格式，打造真正懂你的私人 AI 搭档。</div>
              <div class="sml-scope">🎯 适用：个人效率提升、私有 Prompt 沉淀、个人知识库</div>
              <div class="sml-features">
                <span class="sml-feat">🪄 个人 Prompt 库</span>
                <span class="sml-feat">💾 个人长期记忆</span>
                <span class="sml-feat">🔁 使用习惯学习</span>
                <span class="sml-feat">🌟 收藏 &amp; 评分</span>
              </div>
              <div class="sml-actions">
                <a class="sml-btn sml-btn-primary" href="https://myflicker.kuaishou.com" target="_blank">打开 MyFlicker 开始使用 →</a>
                <a class="sml-btn" href="https://myflicker.kuaishou.com/docs/personal-skill" target="_blank">个人 Skill 入门指南</a>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部对比说明 -->
        <div class="sml-compare-note">
          <div class="sml-cn-item">
            <div class="sml-cn-icon">🔓</div>
            <div class="sml-cn-text"><strong>开放性</strong>：公司级全员可见 → 团队级内部可见 → 个人级仅自己可用</div>
          </div>
          <div class="sml-cn-item">
            <div class="sml-cn-icon">⚙️</div>
            <div class="sml-cn-text"><strong>灵活性</strong>：公司级严格认证 → 团队级轻量审核 → 个人级自由创建</div>
          </div>
          <div class="sml-cn-item">
            <div class="sml-cn-icon">🔼</div>
            <div class="sml-cn-text"><strong>晋升通道</strong>：优质团队/个人 Skill 经评审可申请晋升为公司级官方 Skill</div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Bind role filters
  container.querySelectorAll('.role-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      activeRole = btn.dataset.role;
      container.querySelectorAll('.role-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyRoleFilter(activeRole, channels);
    });
  });

  // Bind card clicks for modal
  container.querySelectorAll('.pkg-card[data-pkg-id]').forEach(card => {
    card.addEventListener('click', () => {
      const pkgId = card.dataset.pkgId;
      const pkg = findPkg(pkgId, layers);
      if (pkg) openSkillModal(pkg);
    });
  });
  container.querySelectorAll('.universal-pkg[data-pkg-id]').forEach(card => {
    card.addEventListener('click', () => {
      const pkgId = card.dataset.pkgId;
      const pkg = findPkg(pkgId, layers);
      if (pkg) openSkillModal(pkg);
    });
  });
}

/* ── 辅助函数：整体状态 ─────────────────────────────────── */
function overallStatusLabel(s) {
  return { applied: '🟢 已应用', building: '🟡 建设中' }[s] || '⬜ 未知';
}
function overallStatusClass(s) {
  return { applied: 'attr-applied', building: 'attr-building' }[s] || '';
}

/* ── 辅助函数：知识库状态 ───────────────────────────────── */
function kbLabel(s) {
  return { notStarted: '⬜ 未启动', building: '🔵 建设中', published: '✅ 已发布' }[s] || '⬜ 未启动';
}
function kbClass(s) {
  return { notStarted: 'attr-kb-not', building: 'attr-kb-building', published: 'attr-kb-published' }[s] || 'attr-kb-not';
}

/* ── 构建单个卡片内的属性行 HTML ──────────────────────── */
function buildPkgAttrs(pkg) {
  return `<div class="pkg-card-attrs">
    <div class="pkg-attr-row">
      <span class="pkg-attr-label">状态</span>
      <span class="pkg-attr-val ${overallStatusClass(pkg.overallStatus)}">${overallStatusLabel(pkg.overallStatus)}</span>
      <span class="pkg-attr-sep">|</span>
      <span class="pkg-attr-label">Skills</span>
      <span class="pkg-attr-val">${pkg.skillProgress || '0/0'}</span>
    </div>
    <div class="pkg-attr-row">
      <span class="pkg-attr-label">知识库</span>
      <span class="pkg-attr-val ${kbClass(pkg.knowledgeBase)}">${kbLabel(pkg.knowledgeBase)}</span>
    </div>
  </div>`;
}

function buildMatrixHTML(channels, layers) {
  const colCount = channels.length;

  // L4 业务线下拉选项（与 pioneer-data 业务线对应）
  const l4BizOptions = [
    { id: 'zhuZhan',    name: '主站' },
    { id: 'ksib',       name: 'KSIB' },
    { id: 'shangYeHua', name: '商业化' },
    { id: 'zongXiao',   name: '综效' },
    { id: 'yanFaXian',  name: '研发线' },
    { id: 'shujuPT',    name: '数据平台' },
    { id: 'anQuan',     name: '安全风控' },
  ];

  let html = `<table class="skill-matrix">`;

  // Header
  html += `<thead><tr>
    <th class="row-header" style="min-width:90px"></th>`;
  channels.forEach(ch => {
    const pct = Math.round(ch.online / ch.total * 100);
    html += `<th>
      <div class="col-header-content">
        <div class="col-name">${ch.name}</div>
        <div class="col-desc">${ch.desc}</div>
        <div class="col-stats">${ch.online} 上线 / ${ch.total} 总计</div>
        <div class="col-bar"><div class="col-bar-fill" style="width:${pct}%"></div></div>
      </div>
    </th>`;
  });
  html += `</tr></thead><tbody>`;

  layers.forEach(layer => {
    // Universal row（L2 协作办公层只渲染 universal，不渲染 packages 职能行）
    if (layer.universal && layer.universal.length) {
      html += `<tr>
        <td class="row-header">
          <div class="layer-label" style="color:${layer.color}">
            <span class="layer-code">${layer.code}</span>
            <span class="layer-name">${layer.name}</span>
            <span class="layer-desc" style="font-size:9px;color:var(--text-muted)">${layer.desc}</span>
          </div>
        </td>
        <td colspan="${colCount}" class="universal-cell"><div class="universal-cell-inner">`;
      layer.universal.forEach(u => {
        html += `<div class="universal-pkg" data-pkg-id="${u.id}" style="border-color:var(--l2-border)">
          <div class="universal-pkg-header">
            <span class="pkg-card-title">${u.title}</span>
            <span class="status-badge ${statusBadge(u.status)}" style="margin-left:6px">${statusLabel(u.status)}</span>
          </div>
          ${buildPkgAttrs(u)}
        </div>`;
      });
      html += `<div class="universal-pkg-more" title="更多通用包持续建设中">…</div>`;
      html += `</div></td></tr>`;
      // L2 协作办公层只有通用行，直接跳过，不再渲染 packages 行
      return;
    }

    // Normal layer row（L4、L3、L1 的职能分列矩阵）
    const isL4 = layer.id === 'l4';
    html += `<tr data-layer="${layer.id}">
      <td class="row-header">
        <div class="layer-label" style="color:${layer.color}">
          <span class="layer-code">${layer.code}</span>
          <span class="layer-name">${layer.name}</span>
          <span class="layer-desc" style="font-size:9px;color:var(--text-muted)">${layer.desc}</span>
        </div>
        ${isL4 ? `
        <div class="l4-biz-selector">
          <select id="l4BizSelect" class="l4-biz-select" onchange="switchL4Biz(this.value)">
            ${l4BizOptions.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
          </select>
        </div>` : ''}
      </td>`;
    channels.forEach(ch => {
      const pkgs = layer.packages[ch.id] || [];
      const colIdx = channels.indexOf(ch);
      html += `<td class="matrix-cell" data-col="${ch.id}" data-col-idx="${colIdx}" data-layer="${layer.id}">`;
      if (pkgs.length === 0) {
        html += `<div class="cell-empty"><span class="cell-empty-skill">—</span></div>`;
      } else {
        pkgs.forEach(pkg => {
          html += `<div class="pkg-card ${layer.id}" data-pkg-id="${pkg.id}">
            <div class="pkg-card-title">${pkg.title}</div>
            ${buildPkgAttrs(pkg)}
          </div>`;
        });
      }
      html += `</td>`;
    });
    html += `</tr>`;
  });

  // Summary row
  html += `<tr class="summary-row"><td class="row-header" style="font-weight:700;font-size:12px;text-align:center">合计</td>`;
  channels.forEach(ch => {
    html += `<td style="text-align:center"><div class="summary-num">${ch.online}</div><div style="font-size:10px;color:var(--text-muted)">${ch.online} 上线 / ${ch.total} 总</div></td>`;
  });
  html += `</tr>`;

  html += `</tbody></table>`;
  return html;
}

function applyRoleFilter(role, channels) {
  const cells = document.querySelectorAll('.matrix-cell');
  const headers = document.querySelectorAll('#skillMatrixWrapper th:not(.row-header)');

  if (role === 'all') {
    cells.forEach(c => { c.classList.remove('dimmed', 'highlighted'); });
    headers.forEach(h => { h.style.opacity = '1'; });
    return;
  }

  const targetId = role;
  cells.forEach(cell => {
    const isTarget = cell.dataset.col === targetId;
    cell.classList.toggle('dimmed', !isTarget);
    cell.classList.toggle('highlighted', isTarget);
  });
  headers.forEach((h, i) => {
    h.style.opacity = channels[i] && channels[i].id === targetId ? '1' : '0.3';
  });
}

function findPkg(pkgId, layers) {
  for (const layer of layers) {
    if (layer.universal) {
      const u = layer.universal.find(u => u.id === pkgId);
      if (u) return { ...u, layer: layer.id };
    }
    for (const chId of Object.keys(layer.packages || {})) {
      const pkg = (layer.packages[chId] || []).find(p => p.id === pkgId);
      if (pkg) return { ...pkg, layer: layer.id };
    }
  }
  return null;
}

function statusBadge(status) {
  return { done: 'badge-done', canary: 'badge-canary', wip: 'badge-wip', plan: 'badge-plan' }[status] || 'badge-plan';
}

function statusLabel(status) {
  return { done: '✅ 已上线', canary: '🔵 灰度中', wip: '🟡 开发中', plan: '⬜ 计划中' }[status] || status;
}

// ── L4 业务线切换 ──────────────────────────────────────────────
function switchL4Biz(bizId) {
  const l4 = window.SKILL_DATA && window.SKILL_DATA.layers.find(l => l.id === 'l4');
  if (!l4) return;

  const bizPkgs = (window.L4_BIZ_PACKAGES && window.L4_BIZ_PACKAGES[bizId]) || l4.packages;

  const channels = window.SKILL_DATA.channels;
  const l4Cells = document.querySelectorAll('.matrix-cell[data-layer="l4"]');
  l4Cells.forEach(cell => {
    const chId = cell.dataset.col;
    const pkgs = (bizPkgs[chId]) || [];
    cell.innerHTML = '';
    if (pkgs.length === 0) {
      cell.innerHTML = `<div class="cell-empty"><span class="cell-empty-skill">—</span></div>`;
    } else {
      pkgs.forEach(pkg => {
        const div = document.createElement('div');
        div.className = `pkg-card l4`;
        div.dataset.pkgId = pkg.id;
        div.innerHTML = `<div class="pkg-card-title">${pkg.title}</div>
          ${buildPkgAttrs(pkg)}`;
        div.addEventListener('click', () => {
          const p = findPkg(pkg.id, window.SKILL_DATA.layers);
          if (p) openSkillModal(p); else openSkillModal(pkg);
        });
        cell.appendChild(div);
      });
    }
  });

  // 更新行头显示当前业务线名
  const sel = document.getElementById('l4BizSelect');
  if (sel) sel.value = bizId;
}
