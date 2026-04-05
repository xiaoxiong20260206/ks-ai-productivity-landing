/* skill-content.js — Renders the AI Skill Market tab from SKILL_DATA */

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
        <div class="section-label">🛒 AI Skill 市场</div>
        <h2 class="section-title">快手公司级 AI Skill 市场</h2>
        <p class="section-desc">AI 时代的「公司级 App Store」——为快手AI员工提供各类专业能力，所有 Skill 均经过六阶段安全审核</p>

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
          <span style="margin-left:8px">左侧彩条 = 架构层标识色 · 点击卡片查看详情</span>
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

function buildMatrixHTML(channels, layers) {
  const colCount = channels.length;

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
    // Universal row (L3 only)
    if (layer.universal && layer.universal.length) {
      html += `<tr>
        <td class="row-header">
          <div class="layer-label" style="color:${layer.color}">
            <span class="layer-code">${layer.code}</span>
            <span class="layer-name">${layer.name}</span>
            <span class="layer-desc" style="font-size:9px;color:var(--text-muted)">${layer.desc}</span>
          </div>
        </td>
        <td colspan="${colCount}" class="universal-cell">`;
      layer.universal.forEach(u => {
        html += `<div class="universal-pkg" data-pkg-id="${u.id}" style="border-color:var(--l3-border)">
          <span class="pkg-card-title">${u.title}</span>
          <span class="status-badge ${statusBadge(u.status)}" style="margin-left:6px">${statusLabel(u.status)}</span>
          <span class="pkg-count" style="margin-left:4px">${u.skillCount} 技能</span>
        </div>`;
      });
      html += `</td></tr>`;
    }

    // Normal layer row
    html += `<tr>
      <td class="row-header">
        <div class="layer-label" style="color:${layer.color}">
          <span class="layer-code">${layer.code}</span>
          <span class="layer-name">${layer.name}</span>
          <span class="layer-desc" style="font-size:9px;color:var(--text-muted)">${layer.desc}</span>
        </div>
      </td>`;
    channels.forEach(ch => {
      const pkgs = layer.packages[ch.id] || [];
      const colIdx = channels.indexOf(ch);
      html += `<td class="matrix-cell" data-col="${ch.id}" data-col-idx="${colIdx}">`;
      if (pkgs.length === 0) {
        html += `<div class="cell-empty">—</div>`;
      } else {
        pkgs.forEach(pkg => {
          html += `<div class="pkg-card ${layer.id}" data-pkg-id="${pkg.id}">
            <div class="pkg-card-title">${pkg.title}</div>
            <div class="pkg-card-meta">
              <span class="status-badge ${statusBadge(pkg.status)}">${statusLabel(pkg.status)}</span>
              ${pkg.skillCount ? `<span class="pkg-count">${pkg.skillCount} 技能</span>` : ''}
            </div>
          </div>`;
        });
      }
      html += `</td>`;
    });
    html += `</tr>`;
  });

  // Summary row
  html += `<tr class="summary-row"><td class="row-header" style="font-weight:700;font-size:12px">合计</td>`;
  channels.forEach(ch => {
    html += `<td><span class="summary-num">${ch.online}</span>${ch.online}上线 / ${ch.total}总</td>`;
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
