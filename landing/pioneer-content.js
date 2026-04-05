/* pioneer-content.js — 先锋队 Tab 渲染逻辑 v2
 * 布局：行 = 业务线，列 = 通道（AI Native / AI 驱动 / AI 增强）
 * 单元格状态：进行中 / 已成功（含案例按钮）
 */
(function () {

  function renderPioneer() {
    const panel = document.getElementById('tab-pioneer');
    if (!panel) return;
    const { bizLines, tiers, teams } = window.PIONEER_DATA;

    const tierMap = Object.fromEntries(tiers.map(t => [t.id, t]));
    const bizMap  = Object.fromEntries(bizLines.map(b => [b.id, b]));

    // 统计
    const totalTeams  = teams.length;
    const nativeCount = teams.filter(t => t.tier === 'native').length;
    const doneCount   = teams.filter(t => t.caseTitle).length;

    // ── 状态分类逻辑 ──────────────────────────────────────
    // caseTitle 非空 → 已成功；否则 → 进行中
    function isDone(team) { return !!team.caseTitle; }

    // ── 单个业务线单元格 ──────────────────────────────────
    function cellHTML(bizId, tierId) {
      const matched = teams.filter(t => t.biz === bizId && t.tier === tierId);
      if (matched.length === 0) {
        return `<div class="pm-cell pm-cell-empty">—</div>`;
      }
      const tier = tierMap[tierId];
      const cards = matched.map(t => {
        const done = isDone(t);
        return `<div class="pm-team-card ${done ? 'pm-card-done' : 'pm-card-wip'}" style="--tier-color:${tier.color}">
          <div class="pm-team-top">
            <span class="pm-team-name">${t.name}</span>
            <span class="pm-status-dot ${done ? 'dot-done' : 'dot-wip'}" title="${done ? '已成功' : '进行中'}"></span>
          </div>
          <div class="pm-team-meta">
            <span class="pm-lead">${t.lead !== '—' ? t.lead : ''}</span>
            <span class="pm-size">${t.size}</span>
          </div>
          <div class="pm-team-status-text">${t.status}</div>
          ${done ? `<button class="pm-case-btn" onclick="showPioneerCase('${bizId}','${tierId}','${t.name.replace(/'/g, "\\'")}')">查看案例 →</button>` : ''}
        </div>`;
      }).join('');
      return `<div class="pm-cell">${cards}</div>`;
    }

    // ── 表头：3个通道列 ───────────────────────────────────
    const thead = `<div class="pm-row pm-header-row">
      <div class="pm-biz-header-cell pm-corner">
        <span>业务线</span>
      </div>
      ${tiers.map(tier => `
        <div class="pm-tier-header-cell" style="--tier-color:${tier.color};--tier-bg:${tier.bg};--tier-border:${tier.border}">
          <div class="pm-tier-name">${tier.label}</div>
          <div class="pm-tier-desc">${tier.desc}</div>
          <div class="pm-tier-count">${teams.filter(t => t.tier === tier.id).length} 个团队</div>
        </div>`).join('')}
    </div>`;

    // ── 数据行：每行 = 一个业务线 ─────────────────────────
    const rows = bizLines.map(biz => `
      <div class="pm-row">
        <div class="pm-biz-label-cell" style="--biz-color:${biz.color};--biz-bg:${biz.bg};--biz-border:${biz.border}">
          <div class="pm-biz-name">${biz.name}</div>
          <div class="pm-biz-bp">BP: ${biz.bp}</div>
          <div class="pm-biz-count">${teams.filter(t => t.biz === biz.id).length} 队</div>
        </div>
        ${tiers.map(tier => cellHTML(biz.id, tier.id)).join('')}
      </div>`).join('');

    // ── 图例 ─────────────────────────────────────────────
    const legend = `<div class="pm-legend">
      <span class="pm-legend-item"><span class="dot-done"></span> 已成功（有案例）</span>
      <span class="pm-legend-item"><span class="dot-wip"></span> 进行中</span>
    </div>`;

    // ── 案例 Modal ────────────────────────────────────────
    const caseModal = `<div id="pioneerCaseModal" class="modal-overlay" onclick="closePioneerCase(event)">
      <div class="modal-box" id="pioneerModalBox">
        <div class="modal-header" id="pioneerModalHeader" style="border-top:3px solid #16a34a">
          <h3 id="pioneerModalTitle">实践案例</h3>
          <button class="modal-close" onclick="closePioneerCase()">✕</button>
        </div>
        <div class="modal-body" id="pioneerModalBody"></div>
      </div>
    </div>`;

    // ── 渲染进页面 ────────────────────────────────────────
    panel.innerHTML = `
      <section class="section">
        <div class="section-inner">
          <div class="section-label">🌟 AI研发范式跃迁 · 先锋队计划</div>
          <h2 class="section-title">AI-Native 先锋队全景</h2>
          <p class="section-desc">行 = 业务线，列 = 试点通道 · 共 ${totalTeams} 个先锋队，${nativeCount} 支 AI Native 团队，${doneCount} 个案例已产出</p>

          <!-- 统计条 -->
          <div class="pioneer-stats">
            <div class="ps-item"><span class="ps-num">${totalTeams}</span><span class="ps-label">先锋队总数</span></div>
            <div class="ps-item"><span class="ps-num" style="color:#dc2626">${nativeCount}</span><span class="ps-label">AI Native 团队</span></div>
            <div class="ps-item"><span class="ps-num" style="color:#16a34a">${doneCount}</span><span class="ps-label">已产出案例</span></div>
            <div class="ps-item"><span class="ps-num">${bizLines.length}</span><span class="ps-label">覆盖业务线</span></div>
          </div>

          ${legend}

          <!-- 矩阵 -->
          <div class="pioneer-matrix-wrap">
            <div class="pioneer-matrix pioneer-matrix-v2">
              ${thead}${rows}
            </div>
          </div>
        </div>
      </section>
      ${caseModal}
    `;

    // 绑定 Modal 关闭
    window.closePioneerCase = function(e) {
      if (!e || e.target === document.getElementById('pioneerCaseModal')) {
        document.getElementById('pioneerCaseModal').classList.remove('open');
      }
    };

    // 绑定案例查看
    window.showPioneerCase = function(bizId, tierId, teamName) {
      const { cases } = window.PIONEER_DATA;
      const biz  = window.PIONEER_DATA.bizLines.find(b => b.id === bizId);
      // 先按团队名匹配，再按业务线兜底
      let c = cases.find(x => x.biz === bizId && x.team === teamName);
      if (!c) c = cases.find(x => x.biz === bizId);

      const modal = document.getElementById('pioneerCaseModal');
      document.getElementById('pioneerModalTitle').textContent = teamName + ' · 实践案例';
      document.getElementById('pioneerModalHeader').style.borderTopColor = biz ? biz.color : '#16a34a';

      const body = document.getElementById('pioneerModalBody');
      if (c) {
        body.innerHTML = `
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">
            <span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;background:${biz?.bg||'#f0fdf4'};color:${biz?.color||'#16a34a'};border:1px solid ${biz?.border||'#bbf7d0'}">${biz?.name||bizId}</span>
            <span style="font-size:11px;background:#f0fdf4;color:#16a34a;padding:2px 8px;border-radius:4px;border:1px solid #bbf7d0">✅ 已完成</span>
            <span style="font-size:11px;color:var(--text-muted)">${c.date}</span>
          </div>
          <div style="font-size:16px;font-weight:800;color:var(--text-primary);line-height:1.5;margin-bottom:12px">${c.title}</div>
          <div style="font-size:13px;color:var(--text-secondary);margin-bottom:16px">核心成果：<strong>${c.metric}</strong></div>
          <div style="font-size:12px;color:var(--text-muted);padding:12px;background:#f8fafc;border-radius:6px">
            📎 实践总结文档已在效能委员会 Showcase 归档，如需获取可联系效能BP或PMO
          </div>`;
      } else {
        body.innerHTML = `<p style="color:var(--text-muted);font-size:14px">案例详情暂未录入，请联系效能BP获取。</p>`;
      }
      modal.classList.add('open');
    };
  }

  window.renderPioneerTab = renderPioneer;

  document.addEventListener('DOMContentLoaded', () => {
    const panel = document.getElementById('tab-pioneer');
    if (panel && panel.classList.contains('active')) renderPioneer();
  });
})();
