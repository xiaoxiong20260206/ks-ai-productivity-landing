/* app.js — Tab switching, countdown, modal, scroll reveal */

// ===== TAB SWITCHING =====
function switchTab(tabId) {
  // Update tab nav
  document.querySelectorAll('.tab-item').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tabId);
  });
  // Update panels
  document.querySelectorAll('.tab-panel').forEach(el => {
    el.classList.toggle('active', el.id === 'tab-' + tabId);
  });
  // Lazy render: pioneer tab
  if (tabId === 'pioneer') {
    const panel = document.getElementById('tab-pioneer');
    if (panel && !panel.dataset.rendered && window.PIONEER_DATA) {
      panel.dataset.rendered = '1';
      if (typeof window.renderPioneerTab === 'function') window.renderPioneerTab();
    }
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function () {
  // Bind tab clicks (skip external tabs that have their own onclick)
  document.querySelectorAll('.tab-item').forEach(el => {
    if (el.classList.contains('tab-item-external')) return; // 外链 Tab 由 onclick 自处理
    el.addEventListener('click', () => switchTab(el.dataset.tab));
  });

  // ===== COUNTDOWN =====
  (function initCountdown() {
    const target = new Date('2026-04-12T00:00:00+08:00');
    const start  = new Date('2026-03-01T00:00:00+08:00');

    function update() {
      const now = new Date();
      const diffMs = target - now;
      const daysLeft = Math.max(0, Math.ceil(diffMs / 86400000));
      const numEl = document.getElementById('countdownDays');
      if (numEl) numEl.textContent = daysLeft;
    }
    update();
    setInterval(update, 60000);
  })();

  // ===== SCROLL REVEAL (Intersection Observer) =====
  const revealEls = document.querySelectorAll(
    '.section-inner, .entry-card, .col-card, .stat-chip, .pioneer-card, ' +
    '.eff2-card, .ab2-card, .rm-item, .pc2-card, .cta-card, .channel-item, ' +
    '.hpc-chat, .hpc-metrics, .hero-trust'
  );
  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger child elements
          const delay = entry.target.closest('.entry-grid, .eff2-grid, .ab2-grid, .stats-strip, .pioneer-grid, .cta-grid')
            ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 60
            : 0;
          setTimeout(() => entry.target.classList.add('revealed'), delay);
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => {
      el.classList.add('reveal-on-scroll');
      revealObs.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    revealEls.forEach(el => el.classList.add('revealed'));
  }

  // ===== TOPBAR SCROLL EFFECT =====
  const topbar = document.getElementById('topbar');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 100) {
      topbar.classList.add('topbar-scrolled');
    } else {
      topbar.classList.remove('topbar-scrolled');
    }
    lastScroll = y;
  }, { passive: true });
});

// ===== MODAL =====
function openSkillModal(pkg) {
  const modal = document.getElementById('skillModal');
  document.getElementById('modalTitle').textContent = pkg.title;

  const headerEl = document.getElementById('modalHeader');
  // Set layer color on header
  const layerColors = { l4: '#16a34a', l3: '#0369a1', l2: '#7c3aed', l1: '#dc2626' };
  headerEl.style.borderTop = '3px solid ' + (layerColors[pkg.layer] || '#2563eb');

  const body = document.getElementById('modalBody');
  body.innerHTML = '';

  // Meta info
  const metaDiv = document.createElement('div');
  metaDiv.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;';
  if (pkg.status) {
    const cls = { done:'badge-done', canary:'badge-canary', wip:'badge-wip', plan:'badge-plan' }[pkg.status] || 'badge-plan';
    const labels = { done:'✅ 已上线', canary:'🔵 灰度中', wip:'🟡 开发中', plan:'⬜ 计划中' };
    metaDiv.innerHTML += `<span class="status-badge ${cls}">${labels[pkg.status] || pkg.status}</span>`;
  }
  if (pkg.skillCount !== undefined) {
    metaDiv.innerHTML += `<span style="font-size:12px;color:var(--text-muted)">${pkg.skillCount} 个技能</span>`;
  }
  body.appendChild(metaDiv);

  if (pkg.desc) {
    const descEl = document.createElement('p');
    descEl.style.cssText = 'font-size:14px;color:var(--text-secondary);margin-bottom:16px;line-height:1.7;';
    descEl.textContent = pkg.desc;
    body.appendChild(descEl);
  }

  if (pkg.skills && pkg.skills.length) {
    const listTitle = document.createElement('div');
    listTitle.style.cssText = 'font-size:13px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;';
    listTitle.textContent = '包含技能';
    body.appendChild(listTitle);

    const list = document.createElement('div');
    list.className = 'modal-skill-list';
    pkg.skills.forEach(sk => {
      const item = document.createElement('div');
      item.className = 'modal-skill-item';
      const statusCls = { done:'badge-done', canary:'badge-canary', wip:'badge-wip', plan:'badge-plan' }[sk.status] || 'badge-plan';
      const statusLabel = { done:'已上线', canary:'灰度中', wip:'开发中', plan:'计划中' }[sk.status] || sk.status;
      item.innerHTML = `
        <div class="modal-skill-name">${sk.name}</div>
        <div class="modal-skill-meta">
          <span class="status-badge ${statusCls}">${statusLabel}</span>
          ${sk.channel ? `<span style="font-size:11px;color:var(--text-muted)">${sk.channel}</span>` : ''}
        </div>
        ${sk.desc ? `<div class="modal-skill-desc">${sk.desc}</div>` : ''}
      `;
      list.appendChild(item);
    });
    body.appendChild(list);
  }

  modal.classList.add('open');
}

function closeModal(e) {
  if (!e || e.target === document.getElementById('skillModal')) {
    document.getElementById('skillModal').classList.remove('open');
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
