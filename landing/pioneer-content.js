/* pioneer-content.js — 先锋队 Tab v4
 * 布局：2 大区域
 *   (1) 组织专项 → 子分区：自上而下 驱动 / 自下而上 涌现
 *   (2) AI 普惠
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

    // ── 先锋队矩阵表格 ─────────────────────────────────────
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

      <!-- ══════════════════════════════════════════════════════
           大区域 1：组织专项
           ════════════════════════════════════════════════════ -->
      <section class="section org-domain-section">
        <div class="section-inner">

          <!-- 大区域 Header -->
          <div class="big-domain-banner big-domain-org">
            <div class="bdb-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div class="bdb-body">
              <div class="bdb-title">组织专项</div>
              <div class="bdb-desc">联合业务线 × 职能通道，驱动各团队完成从「用 AI 工具」到「AI-Native 工作方式」的组织级跃迁</div>
            </div>
            <div class="bdb-stats">
              <div class="bdb-stat"><span class="bdb-num">${totalTeams}</span><span class="bdb-label">先锋队</span></div>
              <div class="bdb-stat"><span class="bdb-num">${nativeCount}</span><span class="bdb-label">AI-Native</span></div>
              <div class="bdb-stat"><span class="bdb-num">${doneCount}</span><span class="bdb-label">已出案例</span></div>
            </div>
          </div>

          <!-- ─────────────────────────────
               子分区 A：自上而下 驱动
               ───────────────────────────── -->
          <div class="org-sub-section">
            <div class="org-sub-header org-sub-topdown">
              <div class="osh-left">
                <div class="osh-direction-badge osh-badge-topdown">自上而下 驱动</div>
                <div class="osh-title">AI-Native 先锋队</div>
                <div class="osh-desc">由公司 AI 基建虚拟组统一组织，业务线 × 职能通道双维覆盖，推进 AI-Native 工作范式落地</div>
                <div class="osh-tracks">
                  <span class="osh-track-item">🔧 技术通道 · @王诩</span>
                  <span class="osh-track-item">🏢 非技术通道 · @李玟潮</span>
                  <span class="osh-track-item">⚙️ 职能通道 · @王诩</span>
                  <span class="osh-track-item">🌱 自下而上涌现 · @周祥</span>
                </div>
              </div>
              <div class="osh-meta">
                <span class="osh-meta-item">📊 ${totalTeams} 支先锋队</span>
                <span class="osh-meta-item">🏢 ${bizLines.length} 条业务线</span>
                <span class="osh-meta-item">👤 @沈浪 统筹</span>
              </div>
            </div>

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

          <!-- ─────────────────────────────
               子分区 B：自下而上 涌现
               ───────────────────────────── -->
          <div class="org-sub-section org-sub-section-btm">
            <div class="org-sub-header org-sub-bottomup">
              <div class="osh-left">
                <div class="osh-direction-badge osh-badge-bottomup">自下而上 涌现</div>
                <div class="osh-title">AI 超级个体 / 团队</div>
                <div class="osh-desc">由一线员工与自发团队驱动，探索 AI 使用边界，孵化极致 AI 用法，反哺公司级 Skill 市场</div>
                <div class="osh-tracks">
                  <span class="osh-track-item">👤 负责人 @周祥</span>
                  <span class="osh-track-item">🔥 100+ 布道师已招募</span>
                  <span class="osh-track-item">🏆 Skill大赛 · 5月正式启动</span>
                </div>
              </div>
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

        </div>
      </section>

      <!-- ══════════════════════════════════════════════════════
           大区域 2：AI 普惠
           ════════════════════════════════════════════════════ -->
      <section class="section section-bg-gray ai-inclusion-section">
        <div class="section-inner">

          <!-- 大区域 Header -->
          <div class="big-domain-banner big-domain-inclusion">
            <div class="bdb-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>
            </div>
            <div class="bdb-body">
              <div class="bdb-title">AI 普惠</div>
              <div class="bdb-desc">用 AI 提升快手员工工作体验——每月聚焦一个领域，将 AI 能力注入员工日常工作场景，让每一位快手员工都能切实感受到效率提升与体验改善</div>
              <div class="bdb-owners">负责人 @高海漩 &nbsp;|&nbsp; 协作 @罗森</div>
            </div>
            <div class="bdb-stats">
              <div class="bdb-stat"><span class="bdb-num">每月</span><span class="bdb-label">1 个领域</span></div>
              <div class="bdb-stat"><span class="bdb-num">全员</span><span class="bdb-label">零门槛</span></div>
              <div class="bdb-stat"><span class="bdb-num">4.20</span><span class="bdb-label">第一期活动</span></div>
            </div>
          </div>

          <p class="section-desc" style="margin-top:20px">
            从高频、强感知的工作场景入手，按月滚动推进 AI 普惠——先让每个人在最日常的场景里感受到 AI 的价值，再逐步扩展到全岗位、全流程
          </p>

          <!-- 月度路线图时间线 -->
          <div class="inclusion-timeline">
            <div class="itl-item itl-done">
              <div class="itl-dot"><span>✓</span></div>
              <div class="itl-connector"></div>
              <div class="itl-card">
                <div class="itl-month">4 月</div>
                <div class="itl-domain">
                  <span class="itl-domain-icon">🏢</span>
                  <span class="itl-domain-name">行政 AI 化</span>
                  <span class="itl-status itl-status-done">进行中</span>
                </div>
                <div class="itl-desc">
                  餐厅查询、停车申请、报修工单、访客预约——把最常用的行政场景全部 AI 化，让 MyFlicker 成为每天都要打开的工作助手
                </div>
                <div class="itl-event">🎉 4.20「今天请客」全员体验活动</div>
                <div class="itl-skills">
                  <span class="itl-skill-tag">🍱 食堂查询</span>
                  <span class="itl-skill-tag">🚗 停车申请</span>
                  <span class="itl-skill-tag">🔧 行政报修</span>
                  <span class="itl-skill-tag">🏃 访客预约</span>
                  <span class="itl-skill-tag">💪 健身房预约</span>
                </div>
              </div>
            </div>

            <div class="itl-item">
              <div class="itl-dot"><span>5</span></div>
              <div class="itl-connector"></div>
              <div class="itl-card itl-card-planned">
                <div class="itl-month">5 月</div>
                <div class="itl-domain">
                  <span class="itl-domain-icon">💬</span>
                  <span class="itl-domain-name">办公协作 AI 化</span>
                  <span class="itl-status itl-status-plan">规划中</span>
                </div>
                <div class="itl-desc">
                  KIM 消息智能摘要、Docs 文档 AI 助手、会议纪要自动生成——让信息处理效率翻倍，从「读文档」到「问文档」
                </div>
                <div class="itl-skills">
                  <span class="itl-skill-tag">📝 会议记录</span>
                  <span class="itl-skill-tag">📄 文档摘要</span>
                  <span class="itl-skill-tag">📅 日程管理</span>
                  <span class="itl-skill-tag">🔔 消息助手</span>
                </div>
              </div>
            </div>

            <div class="itl-item">
              <div class="itl-dot"><span>6</span></div>
              <div class="itl-connector"></div>
              <div class="itl-card itl-card-planned">
                <div class="itl-month">6 月</div>
                <div class="itl-domain">
                  <span class="itl-domain-icon">📊</span>
                  <span class="itl-domain-name">数据分析 AI 化</span>
                  <span class="itl-status itl-status-plan">规划中</span>
                </div>
                <div class="itl-desc">
                  自然语言查数据、AI 自动解读报表、业务异动归因——把「取数→分析→汇报」的全链路从小时级缩短到分钟级
                </div>
                <div class="itl-skills">
                  <span class="itl-skill-tag">🔍 自然语言取数</span>
                  <span class="itl-skill-tag">📈 报表解读</span>
                  <span class="itl-skill-tag">🧩 A/B分析</span>
                  <span class="itl-skill-tag">⚠️ 异动归因</span>
                </div>
              </div>
            </div>

            <div class="itl-item">
              <div class="itl-dot"><span>Q3</span></div>
              <div class="itl-connector itl-connector-last"></div>
              <div class="itl-card itl-card-planned">
                <div class="itl-month">Q3</div>
                <div class="itl-domain">
                  <span class="itl-domain-icon">🎨</span>
                  <span class="itl-domain-name">内容创作 AI 化</span>
                  <span class="itl-status itl-status-plan">规划中</span>
                </div>
                <div class="itl-desc">
                  PPT 自动生成、营销文案创作、UI 设计辅助——让非技术同学也能快速产出高质量内容，释放创意生产力
                </div>
                <div class="itl-skills">
                  <span class="itl-skill-tag">🖼️ 图片生成</span>
                  <span class="itl-skill-tag">📊 PPT 生成</span>
                  <span class="itl-skill-tag">✍️ 文案创作</span>
                  <span class="itl-skill-tag">🎭 设计辅助</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 底部目标说明 -->
          <div class="inclusion-goal-banner">
            <div class="igb-left">
              <div class="igb-title">🎯 AI 普惠的目标</div>
              <div class="igb-desc">
                每一位快手员工，无论职能、层级，都能在日常工作中拥有一个"懂你的 AI 搭档"——
                不需要学习提示词，不需要懂技术，打开 MyFlicker 就能用。
              </div>
            </div>
            <div class="igb-stats">
              <div class="igb-stat">
                <div class="igb-stat-num">每月</div>
                <div class="igb-stat-label">1 个领域上线</div>
              </div>
              <div class="igb-stat">
                <div class="igb-stat-num">全员</div>
                <div class="igb-stat-label">零门槛触达</div>
              </div>
              <div class="igb-stat">
                <div class="igb-stat-num">15%+</div>
                <div class="igb-stat-label">组织效率目标</div>
              </div>
            </div>
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
