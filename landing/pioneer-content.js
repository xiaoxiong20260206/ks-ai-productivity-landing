/* pioneer-content.js — 先锋队 Tab 渲染逻辑 */
(function () {
  function renderPioneer() {
    const panel = document.getElementById('tab-pioneer');
    if (!panel) return;
    const { bizLines, tiers, teams, cases } = window.PIONEER_DATA;

    // ── 统计数据 ──────────────────────────────────────────
    const totalTeams = teams.length;
    const nativeCount = teams.filter(t => t.tier === 'native').length;
    const caseCount = cases.length;
    const bizCount = bizLines.length;

    // ── 业务线筛选状态 ─────────────────────────────────────
    let activeBiz = 'all';

    // ── 辅助：获取通道配置 ────────────────────────────────
    const tierMap = Object.fromEntries(tiers.map(t => [t.id, t]));
    const bizMap  = Object.fromEntries(bizLines.map(b => [b.id, b]));

    // ── 构建矩阵 HTML ─────────────────────────────────────
    function matrixHTML(bizFilter) {
      const filteredBiz = bizFilter === 'all' ? bizLines : bizLines.filter(b => b.id === bizFilter);

      // 表头
      let thead = `<div class="pm-header pm-header-row">
        <div class="pm-tier-col pm-corner">通道 \\ 业务线</div>
        ${filteredBiz.map(b => `
          <div class="pm-biz-col" style="--biz-color:${b.color};--biz-bg:${b.bg};--biz-border:${b.border}">
            <div class="pm-biz-name">${b.name}</div>
            <div class="pm-biz-bp">效能BP: ${b.bp}</div>
          </div>`).join('')}
      </div>`;

      // 行（按通道）
      let rows = tiers.map(tier => {
        const cells = filteredBiz.map(biz => {
          const matched = teams.filter(t => t.biz === biz.id && t.tier === tier.id);
          if (matched.length === 0) {
            return `<div class="pm-cell pm-cell-empty">—</div>`;
          }
          return `<div class="pm-cell" style="--tier-color:${tier.color}">
            ${matched.map(t => `
              <div class="pm-team-card">
                <div class="pm-team-name">${t.name}</div>
                <div class="pm-team-meta">
                  <span class="pm-lead">${t.lead}</span>
                  <span class="pm-size">${t.size}</span>
                </div>
                <div class="pm-team-status">${t.status}</div>
                ${t.caseTitle ? `<div class="pm-has-case">📝 有实践总结</div>` : ''}
              </div>`).join('')}
          </div>`;
        }).join('');

        return `<div class="pm-row">
          <div class="pm-tier-col pm-tier-label" style="--tier-color:${tier.color};--tier-bg:${tier.bg};--tier-border:${tier.border}">
            <div class="pm-tier-name">${tier.label}</div>
            <div class="pm-tier-desc">${tier.desc}</div>
            <div class="pm-tier-count">${teams.filter(t => t.tier === tier.id && (bizFilter === 'all' || t.biz === bizFilter)).length} 个团队</div>
          </div>
          ${cells}
        </div>`;
      }).join('');

      return thead + rows;
    }

    // ── 案例卡片 ──────────────────────────────────────────
    function casesHTML(bizFilter) {
      const filtered = bizFilter === 'all' ? cases : cases.filter(c => c.biz === bizFilter);
      if (filtered.length === 0) return '<p style="color:var(--text-muted);font-size:14px;">该业务线暂无公开案例</p>';
      return filtered.map(c => {
        const biz = bizMap[c.biz];
        return `<div class="pc-card">
          <div class="pc-header">
            <span class="pc-biz-tag" style="background:${biz.bg};color:${biz.color};border-color:${biz.border}">${biz.name}</span>
            <span class="pc-team">${c.team}</span>
            <span class="pc-date">${c.date}</span>
          </div>
          <div class="pc-title">${c.title}</div>
          <div class="pc-footer">
            <span class="pc-metric">${c.metric}</span>
            <span class="pc-tag">${c.tag}</span>
          </div>
        </div>`;
      }).join('');
    }

    // ── 组合渲染 ──────────────────────────────────────────
    function render() {
      const biz = activeBiz;
      const filterBtns = `<div class="pf-bar">
        <button class="pf-btn ${biz==='all'?'pf-active':''}" onclick="window.pioneerFilter('all')">全部业务线</button>
        ${bizLines.map(b => `<button class="pf-btn ${biz===b.id?'pf-active':''}" onclick="window.pioneerFilter('${b.id}')" style="${biz===b.id?`background:${b.bg};color:${b.color};border-color:${b.color}`:''}">
          ${b.name}
        </button>`).join('')}
      </div>`;

      const bizCols = biz === 'all' ? bizLines.length : 1;

      panel.innerHTML = `
        <!-- stats strip -->
        <section class="section">
          <div class="section-inner">
            <div class="section-label">🌟 AI研发范式跃迁 · 先锋队计划</div>
            <h2 class="section-title">先锋队全景矩阵</h2>
            <p class="section-desc">以业务线为列、试点类型（通道）为行，展示 ${totalTeams} 个团队的分布情况</p>
            <div class="pioneer-stats">
              <div class="ps-item"><span class="ps-num">${totalTeams}</span><span class="ps-label">先锋队总数</span></div>
              <div class="ps-item"><span class="ps-num">${bizCount}</span><span class="ps-label">覆盖业务线</span></div>
              <div class="ps-item"><span class="ps-num" style="color:var(--accent-red)">${nativeCount}</span><span class="ps-label">AI Native 团队</span></div>
              <div class="ps-item"><span class="ps-num" style="color:var(--accent-green)">${caseCount}</span><span class="ps-label">公开实践案例</span></div>
            </div>

            <!-- 筛选 -->
            ${filterBtns}

            <!-- 矩阵 -->
            <div class="pioneer-matrix" style="--biz-cols:${bizCols}">
              ${matrixHTML(biz)}
            </div>
          </div>
        </section>

        <!-- 优秀案例 -->
        <section class="section section-bg-gray">
          <div class="section-inner">
            <div class="section-label">📝 公司级优秀实践</div>
            <h2 class="section-title">先锋队已交付案例</h2>
            <p class="section-desc">以下案例均已产出实践总结，4月效能委员会 Showcase 评选</p>
            <div class="pioneer-cases">
              ${casesHTML(biz)}
            </div>
          </div>
        </section>
      `;
    }

    window.pioneerFilter = function(bizId) {
      activeBiz = bizId;
      render();
    };

    render();
  }

  // 暴露全局入口（供 switchTab 调用）
  window.renderPioneerTab = renderPioneer;

  // Tab 切换时初始化
  document.addEventListener('DOMContentLoaded', () => {
    // 监听 tab 激活
    const obs = new MutationObserver(() => {
      const panel = document.getElementById('tab-pioneer');
      if (panel && panel.classList.contains('active') && !panel.dataset.rendered) {
        panel.dataset.rendered = '1';
        renderPioneer();
      }
    });
    const container = document.getElementById('main-content');
    if (container) obs.observe(container, { subtree: true, attributes: true, attributeFilter: ['class'] });

    // 如果默认就是 pioneer tab
    setTimeout(() => {
      const panel = document.getElementById('tab-pioneer');
      if (panel && panel.classList.contains('active')) renderPioneer();
    }, 100);
  });
})();
