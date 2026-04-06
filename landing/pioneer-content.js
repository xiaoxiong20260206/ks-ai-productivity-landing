/* pioneer-content.js — 先锋队 Tab v3（视觉优化版）
 * 布局：行 = 业务线（7行），列 = 通道（6列，与Skill市场对齐）
 * 视觉：卡片化通道列头、渐变业务线行头、团队卡片立体感
 */
(function () {

  function renderPioneer() {
    const panel = document.getElementById('tab-pioneer');
    if (!panel) return;
    const { bizLines, tiers, teams } = window.PIONEER_DATA;

    const tierMap = Object.fromEntries(tiers.map(t => [t.id, t]));

    // 统计
    const totalTeams  = teams.length;
    const nativeCount = teams.filter(t => t.status.includes('Native')).length;
    const doneCount   = teams.filter(t => t.caseTitle).length;

    function isDone(team) { return !!team.caseTitle; }

    // ── 团队卡片 ──────────────────────────────────────────
    function teamCardHTML(t, tier, bizId) {
      const done = isDone(t);
      const safeName = t.name.replace(/'/g, "\\'");
      return `<div class="pm-card ${done ? 'pm-card-done' : 'pm-card-wip'}">
        <div class="pm-card-header">
          <span class="pm-card-name">${t.name}</span>
          <span class="pm-card-badge ${done ? 'badge-success' : 'badge-progress'}">${done ? '✓ 已成功' : '进行中'}</span>
        </div>
        <div class="pm-card-info">
          ${t.lead && t.lead !== '—' ? `<span class="pm-info-item">👤 ${t.lead}</span>` : ''}
          <span class="pm-info-item">👥 ${t.size}</span>
        </div>
        <div class="pm-card-status">${t.status}</div>
        ${done ? `<button class="pm-case-btn" onclick="showPioneerCase('${bizId}','${tier.id}','${safeName}')">查看案例 →</button>` : ''}
      </div>`;
    }

    // ── 单元格 ────────────────────────────────────────────
    function cellHTML(bizId, tierId) {
      const matched = teams.filter(t => t.biz === bizId && t.tier === tierId);
      const tier = tierMap[tierId];
      if (matched.length === 0) {
        return `<td class="pm-cell pm-cell-empty"><span class="pm-empty-dash">—</span></td>`;
      }
      return `<td class="pm-cell">${matched.map(t => teamCardHTML(t, tier, bizId)).join('')}</td>`;
    }

    // ── 表格 HTML ─────────────────────────────────────────
    const tableHTML = `
      <div class="pm-table-wrap">
        <table class="pm-table">
          <thead>
            <tr>
              <th class="pm-th-corner">业务线</th>
              ${tiers.map(tier => `
                <th class="pm-th-tier" style="--tc:${tier.color};--tb:${tier.bg};--tbd:${tier.border}">
                  <div class="pm-th-tier-bar"></div>
                  <div class="pm-th-tier-name">${tier.label}</div>
                  <div class="pm-th-tier-desc">${tier.desc}</div>
                  <div class="pm-th-tier-count">${teams.filter(t => t.tier === tier.id).length} 个团队</div>
                </th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${bizLines.map(biz => `
              <tr>
                <td class="pm-td-biz" style="--bc:${biz.color};--bb:${biz.bg};--bbd:${biz.border}">
                  <div class="pm-biz-bar"></div>
                  <div class="pm-biz-content">
                    <div class="pm-biz-name">${biz.name}</div>
                    <div class="pm-biz-meta">BP: ${biz.bp}</div>
                    <div class="pm-biz-cnt">${teams.filter(t => t.biz === biz.id).length} 个团队</div>
                  </div>
                </td>
                ${tiers.map(tier => cellHTML(biz.id, tier.id)).join('')}
              </tr>`).join('')}
          </tbody>
        </table>
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

    // ── 渲染 ──────────────────────────────────────────────
    panel.innerHTML = `
      <!-- ① Top-Down：AI-Native 先锋队 -->
      <section class="section">
        <div class="section-inner">
          <div class="practice-type-banner practice-type-top">
            <div class="ptb-label">Top-Down</div>
            <div class="ptb-name">AI-Native 先锋队</div>
            <div class="ptb-desc">由公司 AI 基建虚拟组统一组织，业务线 × 职能通道双维覆盖，自上而下推进 AI-Native 工作范式落地</div>
          </div>

          <div class="section-label" style="margin-top:0">🌟 先锋队全景矩阵</div>
          <p class="section-desc">
            <strong>${totalTeams}</strong> 支先锋队横跨 <strong>${bizLines.length}</strong> 条业务线，<strong>${nativeCount}</strong> 支已进入 AI-Native 工作模式，<strong>${doneCount}</strong> 个案例已在 Showcase 产出 ·
            <span style="font-size:12px;color:var(--text-muted)">矩阵以「业务线 × 职能通道」双维度呈现，空白格代表当前周期尚未设立先锋队（预留扩展位）</span>
          </p>

          <!-- 统计条 -->
          <div class="pm-stats">
            <div class="pm-stat-item">
              <div class="pm-stat-num">${totalTeams}</div>
              <div class="pm-stat-label">先锋队总数</div>
            </div>
            <div class="pm-stat-item pm-stat-native">
              <div class="pm-stat-num">${nativeCount}</div>
              <div class="pm-stat-label">AI Native 团队</div>
            </div>
            <div class="pm-stat-item pm-stat-done">
              <div class="pm-stat-num">${doneCount}</div>
              <div class="pm-stat-label">已产出案例</div>
            </div>
            <div class="pm-stat-item">
              <div class="pm-stat-num">${bizLines.length}</div>
              <div class="pm-stat-label">覆盖业务线</div>
            </div>
          </div>

          <!-- 图例 -->
          <div class="pm-legend-bar">
            <span class="pm-leg"><span class="pm-leg-dot pm-leg-success"></span>已成功（有案例）</span>
            <span class="pm-leg"><span class="pm-leg-dot pm-leg-wip"></span>进行中</span>
            <span class="pm-leg-note">点击「查看案例 →」可查看实践详情</span>
          </div>

          ${tableHTML}
        </div>
      </section>

      <!-- ② Down-Top：AI 超级个体/团队 -->
      <section class="section section-bg-gray">
        <div class="section-inner">
          <div class="practice-type-banner practice-type-bottom">
            <div class="ptb-label">Down-Top</div>
            <div class="ptb-name">AI 超级个体 / 团队</div>
            <div class="ptb-desc">由一线员工与自发团队驱动，探索 AI 使用边界，孵化极致 AI 用法，反哺公司级 Skill 市场</div>
          </div>

          <div class="super-collect-banner">
            <div class="scb-icon">🌱</div>
            <div class="scb-body">
              <div class="scb-title">正在征集中 · 你就是下一个 AI 超级个体</div>
              <div class="scb-desc">无论你是用 AI 干掉了繁琐流程、还是训练出了一个专属你的 AI 搭档，都欢迎来分享你的故事。</div>
              <div class="scb-tags">
                <span class="scb-tag scb-tag-a">🏆 AI 超级个体</span>
                <span class="scb-tag scb-tag-b">🔥 AI-Native 团队</span>
                <span class="scb-tag scb-tag-c">🛠️ 高价值 Skill 创造者</span>
              </div>
            </div>
            <a class="scb-cta" href="https://myflicker.kuaishou.com/nominate" target="_blank">👉 立即申报</a>
          </div>

          <!-- 四大入选标准 -->
          <div class="super-criteria">
            <div class="sc-card">
              <div class="sc-icon">⚡</div>
              <div class="sc-title">AI 超级个体</div>
              <div class="sc-desc">个人通过 AI 工具使工作效率提升 2x+ 以上，或创造了可复用、可分享的高价值 AI 使用方法</div>
              <div class="sc-status">征集中</div>
            </div>
            <div class="sc-card">
              <div class="sc-icon">🧑‍🤝‍🧑</div>
              <div class="sc-title">AI-Native 团队</div>
              <div class="sc-desc">团队已将 AI 工具全面融入日常工作流，效率提升显著，愿意分享团队实践经验与 SOP</div>
              <div class="sc-status">征集中</div>
            </div>
            <div class="sc-card">
              <div class="sc-icon">🛠️</div>
              <div class="sc-title">高价值 Skill 创造者</div>
              <div class="sc-desc">开发了团队/个人级 Skill 并在组内落地，经评审后可晋升为公司级官方 Skill，获得官方认证与激励</div>
              <div class="sc-status">征集中</div>
            </div>
            <div class="sc-card">
              <div class="sc-icon">📖</div>
              <div class="sc-title">实践案例贡献者</div>
              <div class="sc-desc">有完整的 AI 实践案例（背景、方法、效果），愿意在公司级 AI 知识库中沉淀与分享</div>
              <div class="sc-status">征集中</div>
            </div>
          </div>

          <div class="super-footer-note">
            📌 入选后将获得：官方认证荣誉 · 公司级 Skill 晋升通道 · Showcase 分享机会 · AI 生产力战役官方背书<br/>
            如有意向，联系 PMO 张佳丽 或 在 MyFlicker 内搜索「AI超级个体申报」
          </div>
        </div>
      </section>
      ${caseModal}
    `;

    // 案例 Modal 逻辑
    window.closePioneerCase = function(e) {
      if (!e || e.target === document.getElementById('pioneerCaseModal')) {
        document.getElementById('pioneerCaseModal').classList.remove('open');
      }
    };

    window.showPioneerCase = function(bizId, tierId, teamName) {
      const biz   = window.PIONEER_DATA.bizLines.find(b => b.id === bizId);
      let c = window.PIONEER_DATA.cases.find(x => x.biz === bizId && x.team === teamName);
      if (!c) c = window.PIONEER_DATA.cases.find(x => x.biz === bizId);

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
      document.getElementById('pioneerCaseModal').classList.add('open');
    };
  }

  window.renderPioneerTab = renderPioneer;

  document.addEventListener('DOMContentLoaded', () => {
    const panel = document.getElementById('tab-pioneer');
    if (panel && panel.classList.contains('active')) renderPioneer();
  });
})();
