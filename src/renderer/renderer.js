// ─── State ───────────────────────────────────────────────────
let config = null;
let selectedTools = new Map(); // toolId -> version
let detectedTools = {};
let installing = false;
let uninstallToolId = null; // tool pending uninstall confirmation

// ─── DOM Refs ────────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const bundlesGrid = $('#bundlesGrid');
const categoriesContainer = $('#categoriesContainer');
const btnInstall = $('#btnInstall');
const adminBadge = $('#adminBadge');

const pageSelect = $('#pageSelect');
const pageInstall = $('#pageInstall');
const pageDone = $('#pageDone');

const overallLabel = $('#overallLabel');
const overallPercent = $('#overallPercent');
const overallFill = $('#overallFill');
const installItems = $('#installItems');
const logContent = $('#logContent');
const logToggle = $('#logToggle');

const doneIcon = $('#doneIcon');
const doneTitle = $('#doneTitle');
const doneSubtitle = $('#doneSubtitle');
const resultsList = $('#resultsList');
const btnBackToSelect = $('#btnBackToSelect');

// ─── Helpers ─────────────────────────────────────────────────
function getAllTools() {
  return config.categories.flatMap((cat) => cat.tools);
}

// ─── Initialization ──────────────────────────────────────────
async function init() {
  config = await window.api.getToolsConfig();

  // Check admin
  const isAdmin = await window.api.checkAdmin();
  adminBadge.textContent = isAdmin ? '🔒 Admin' : '⚠ No Admin';
  adminBadge.className = 'admin-badge ' + (isAdmin ? 'admin' : 'no-admin');

  // Detect installed tools
  const toolIds = getAllTools().map((t) => t.id);
  detectedTools = await window.api.detectInstalled(toolIds);

  renderBundles();
  renderCategories();
  setupListeners();
}

// ─── Render Bundles ──────────────────────────────────────────
function renderBundles() {
  bundlesGrid.innerHTML = '';
  for (const bundle of config.bundles) {
    const card = document.createElement('div');
    card.className = 'bundle-card';
    card.dataset.bundleId = bundle.id;
    card.innerHTML = `
      <div class="bundle-icon">${escapeHtml(bundle.icon)}</div>
      <div class="bundle-name">${escapeHtml(bundle.name)}</div>
      <div class="bundle-desc">${escapeHtml(bundle.description)}</div>
    `;
    card.addEventListener('click', () => selectBundle(bundle));
    bundlesGrid.appendChild(card);
  }
}

// ─── Render Categories & Tools ───────────────────────────────
function renderCategories() {
  categoriesContainer.innerHTML = '';

  for (const category of config.categories) {
    const section = document.createElement('div');
    section.className = 'category-section';
    section.dataset.categoryId = category.id;

    const allSelected = category.tools.every((t) => selectedTools.has(t.id));

    section.innerHTML = `
      <div class="category-header">
        <div class="category-title-group">
          <span class="category-icon">${escapeHtml(category.icon)}</span>
          <div>
            <div class="category-title">${escapeHtml(category.name)}</div>
            <div class="category-desc">${escapeHtml(category.description)}</div>
          </div>
        </div>
        <button class="category-select-all${allSelected ? ' all-selected' : ''}" data-category-id="${escapeHtml(category.id)}">
          ${allSelected ? '✓ All Selected' : 'Select All'}
        </button>
      </div>
      <div class="category-tools-list"></div>
    `;

    const toolsListEl = section.querySelector('.category-tools-list');

    for (const tool of category.tools) {
      const detected = detectedTools[tool.id];
      const isDetected = detected && detected.installed;

      const card = document.createElement('div');
      card.className = 'tool-card' + (selectedTools.has(tool.id) ? ' selected' : '') + (isDetected ? ' detected' : '');
      card.dataset.toolId = tool.id;

      let versionOptions = tool.versions
        .map((v) => `<option value="${escapeHtml(v)}"${v === (selectedTools.get(tool.id) || tool.defaultVersion) ? ' selected' : ''}>${escapeHtml(v)}</option>`)
        .join('');

      const detectedBadge = isDetected
        ? `<div class="tool-detected-badge">✓ Installed: ${escapeHtml(detected.output || detected.version || '')}</div>`
        : '';

      const uninstallBtn = isDetected
        ? `<button class="btn btn-sm btn-uninstall" data-uninstall-id="${escapeHtml(tool.id)}" title="Uninstall ${escapeHtml(tool.name)}">🗑️ Uninstall</button>`
        : '';

      card.innerHTML = `
        <div class="tool-checkbox"></div>
        <div class="tool-icon">${escapeHtml(tool.icon)}</div>
        <div class="tool-info">
          <div class="tool-name">${escapeHtml(tool.name)}</div>
          <div class="tool-desc">${escapeHtml(tool.description)}</div>
          ${detectedBadge}
        </div>
        <div class="tool-actions">
          ${uninstallBtn}
          <select class="tool-version-select" data-tool-id="${escapeHtml(tool.id)}">${versionOptions}</select>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (e.target.tagName === 'SELECT' || e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
        toggleTool(tool.id);
      });

      const select = card.querySelector('.tool-version-select');
      select.addEventListener('change', (e) => {
        if (selectedTools.has(tool.id)) {
          selectedTools.set(tool.id, e.target.value);
        }
      });

      const unBtn = card.querySelector('[data-uninstall-id]');
      if (unBtn) {
        unBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          showUninstallModal(tool.id, tool.name);
        });
      }

      toolsListEl.appendChild(card);
    }

    // Select All button handler
    const selectAllBtn = section.querySelector('.category-select-all');
    selectAllBtn.addEventListener('click', () => toggleCategory(category.id));

    categoriesContainer.appendChild(section);
  }
}

// ─── Selection Logic ─────────────────────────────────────────
function toggleTool(toolId) {
  if (installing) return;
  const tool = getAllTools().find((t) => t.id === toolId);
  if (!tool) return;

  if (selectedTools.has(toolId)) {
    selectedTools.delete(toolId);
  } else {
    const versionSelect = document.querySelector(`.tool-version-select[data-tool-id="${toolId}"]`);
    selectedTools.set(toolId, versionSelect ? versionSelect.value : tool.defaultVersion);
  }

  updateBundleHighlights();
  renderCategories();
  updateInstallButton();
}

function toggleCategory(categoryId) {
  if (installing) return;
  const category = config.categories.find((c) => c.id === categoryId);
  if (!category) return;

  const allSelected = category.tools.every((t) => selectedTools.has(t.id));

  if (allSelected) {
    for (const tool of category.tools) {
      selectedTools.delete(tool.id);
    }
  } else {
    for (const tool of category.tools) {
      if (!selectedTools.has(tool.id)) {
        selectedTools.set(tool.id, tool.defaultVersion);
      }
    }
  }

  updateBundleHighlights();
  renderCategories();
  updateInstallButton();
}

function selectBundle(bundle) {
  if (installing) return;

  // Check if all bundle tools are already selected
  const allSelected = bundle.tools.every((tid) => selectedTools.has(tid));

  if (allSelected) {
    // Deselect all bundle tools
    for (const tid of bundle.tools) {
      selectedTools.delete(tid);
    }
  } else {
    // Select all bundle tools
    for (const tid of bundle.tools) {
      if (!selectedTools.has(tid)) {
        const tool = getAllTools().find((t) => t.id === tid);
        selectedTools.set(tid, tool ? tool.defaultVersion : '');
      }
    }
  }

  updateBundleHighlights();
  renderCategories();
  updateInstallButton();
}

function updateBundleHighlights() {
  for (const card of $$('.bundle-card')) {
    const bundleId = card.dataset.bundleId;
    const bundle = config.bundles.find((b) => b.id === bundleId);
    if (!bundle) continue;
    const allSelected = bundle.tools.every((tid) => selectedTools.has(tid));
    card.classList.toggle('selected', allSelected);
  }
}

function updateInstallButton() {
  btnInstall.disabled = selectedTools.size === 0;
  btnInstall.textContent = selectedTools.size > 0
    ? `Install Selected (${selectedTools.size})`
    : 'Install Selected';
}

// ─── Navigation ──────────────────────────────────────────────
function showPage(pageName) {
  $$('.page').forEach((p) => p.classList.remove('active'));
  $$('.step-item').forEach((s) => {
    s.classList.remove('active');
    s.classList.remove('completed');
  });

  if (pageName === 'select') {
    pageSelect.classList.add('active');
    $('[data-step="select"]').classList.add('active');
  } else if (pageName === 'install') {
    pageInstall.classList.add('active');
    $('[data-step="select"]').classList.add('completed');
    $('[data-step="install"]').classList.add('active');
  } else if (pageName === 'done') {
    pageDone.classList.add('active');
    $('[data-step="select"]').classList.add('completed');
    $('[data-step="install"]').classList.add('completed');
    $('[data-step="done"]').classList.add('active');
  }
}

// ─── Installation ────────────────────────────────────────────
async function startInstallation() {
  installing = true;
  showPage('install');
  logContent.textContent = '';

  const selections = Array.from(selectedTools.entries()).map(([toolId, version]) => ({ toolId, version }));

  // Render install items
  installItems.innerHTML = '';
  for (const sel of selections) {
    const tool = getAllTools().find((t) => t.id === sel.toolId);
    if (!tool) continue;

    const item = document.createElement('div');
    item.className = 'install-item';
    item.id = `install-item-${tool.id}`;
    item.innerHTML = `
      <div class="install-item-icon">${escapeHtml(tool.icon)}</div>
      <div class="install-item-info">
        <div class="install-item-name">${escapeHtml(tool.name)} v${escapeHtml(sel.version)}</div>
        <div class="install-item-status" id="status-${tool.id}">Waiting...</div>
      </div>
      <span class="install-item-badge badge-waiting" id="badge-${tool.id}">Waiting</span>
    `;
    installItems.appendChild(item);
  }

  overallFill.style.width = '0%';
  overallPercent.textContent = '0%';
  overallLabel.textContent = 'Installing...';

  // Listen for progress
  window.api.onProgress(handleProgress);

  const result = await window.api.startInstallation(selections);

  window.api.removeProgressListener();
  installing = false;

  // show done
  showDone(result);
}

function handleProgress(data) {
  if (data.step === 'all-complete') return;

  const { toolId, toolName, step, detail, overallPercent: pct } = data;

  // Update overall
  overallFill.style.width = pct + '%';
  overallPercent.textContent = pct + '%';
  overallLabel.textContent = `Installing ${toolName || ''}...`;

  // Update per-tool status
  const statusEl = document.getElementById(`status-${toolId}`);
  const badgeEl = document.getElementById(`badge-${toolId}`);

  if (statusEl) statusEl.textContent = detail || step;
  if (badgeEl) {
    badgeEl.textContent = capitalize(step);
    badgeEl.className = `install-item-badge badge-${step}`;

    // Add retry button on error
    if (step === 'error') {
      const parentItem = document.getElementById(`install-item-${toolId}`);
      if (parentItem && !parentItem.querySelector('.retry-btn')) {
        const retryBtn = document.createElement('button');
        retryBtn.className = 'btn btn-sm btn-danger retry-btn';
        retryBtn.textContent = 'Retry';
        retryBtn.addEventListener('click', () => retryTool(toolId));
        parentItem.appendChild(retryBtn);
      }
    }
  }

  // Append to log
  appendLog(`[${toolName}] ${step}: ${detail}`);
}

async function retryTool(toolId) {
  const tool = getAllTools().find((t) => t.id === toolId);
  if (!tool) return;

  const version = selectedTools.get(toolId) || tool.defaultVersion;

  // Reset UI for this tool
  const statusEl = document.getElementById(`status-${toolId}`);
  const badgeEl = document.getElementById(`badge-${toolId}`);
  if (statusEl) statusEl.textContent = 'Retrying...';
  if (badgeEl) {
    badgeEl.textContent = 'Retrying';
    badgeEl.className = 'install-item-badge badge-downloading';
  }

  // Remove retry button
  const parentItem = document.getElementById(`install-item-${toolId}`);
  const retryBtn = parentItem ? parentItem.querySelector('.retry-btn') : null;
  if (retryBtn) retryBtn.remove();

  window.api.onProgress(handleProgress);
  await window.api.retryTool(toolId, version);
  window.api.removeProgressListener();
}

function showDone(result) {
  showPage('done');

  // Parse results from the last all-complete event or result
  const results = result.success !== false ? [] : [{ error: result.error }];

  // Rebuild from install items
  resultsList.innerHTML = '';
  const items = installItems.querySelectorAll('.install-item');
  let successCount = 0;
  let failCount = 0;

  items.forEach((item) => {
    const toolId = item.id.replace('install-item-', '');
    const tool = getAllTools().find((t) => t.id === toolId);
    const badge = item.querySelector('.install-item-badge');
    const isError = badge && badge.classList.contains('badge-error');

    if (isError) failCount++;
    else successCount++;

    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';
    const statusDetail = item.querySelector('.install-item-status');
    const errorDetail = isError && statusDetail ? statusDetail.textContent : '';
    resultItem.innerHTML = `
      <span class="result-status">${isError ? '\u274C' : '\u2705'}</span>
      <span class="result-name">${escapeHtml(tool ? tool.name : toolId)}</span>
      <span class="result-detail">${isError ? 'Failed' : 'Installed'}</span>
      ${isError && errorDetail ? `<div class="result-error-detail">${escapeHtml(errorDetail)}</div>` : ''}
    `;
    resultsList.appendChild(resultItem);
  });

  if (failCount > 0) {
    doneIcon.textContent = '⚠️';
    doneTitle.textContent = `${successCount} Installed, ${failCount} Failed`;
    doneSubtitle.textContent = 'Some tools could not be installed. You can retry from the progress page.';
  } else {
    doneIcon.textContent = '✅';
    doneTitle.textContent = 'Installation Complete!';
    doneSubtitle.textContent = 'Your development environment is ready. You may need to restart your terminal for PATH changes to take effect.';
  }
}

// ─── Utilities ───────────────────────────────────────────────
function appendLog(msg) {
  const ts = new Date().toLocaleTimeString();
  logContent.textContent += `[${ts}] ${msg}\n`;
  logContent.parentElement.scrollTop = logContent.parentElement.scrollHeight;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ─── Uninstall ───────────────────────────────────────────────
function showUninstallModal(toolId, toolName) {
  uninstallToolId = toolId;
  document.getElementById('uninstallToolName').textContent = toolName;
  document.getElementById('uninstallProgress').style.display = 'none';
  document.getElementById('uninstallActions').style.display = 'flex';
  document.getElementById('uninstallModal').classList.add('open');
}

function hideUninstallModal() {
  document.getElementById('uninstallModal').classList.remove('open');
  uninstallToolId = null;
}

async function performUninstall() {
  if (!uninstallToolId) return;
  const toolId = uninstallToolId;

  document.getElementById('uninstallActions').style.display = 'none';
  document.getElementById('uninstallProgress').style.display = 'block';
  document.getElementById('uninstallStatus').textContent = 'Starting uninstall...';
  document.getElementById('uninstallFill').style.width = '0%';
  document.getElementById('uninstallFill').style.background = '';

  const stepPcts = { finding: 10, uninstalling: 40, cleaning: 70, verifying: 90, completed: 100 };

  window.api.onUninstallProgress((data) => {
    if (data.toolId !== toolId) return;
    const pct = stepPcts[data.step] || 0;
    document.getElementById('uninstallFill').style.width = pct + '%';
    document.getElementById('uninstallStatus').textContent = data.detail || data.step;
  });

  const detected = detectedTools[toolId] || null;
  const result = await window.api.uninstallTool(toolId, detected);
  window.api.removeUninstallProgressListener();

  if (result.success) {
    document.getElementById('uninstallStatus').textContent = 'Uninstalled successfully!';
    document.getElementById('uninstallFill').style.width = '100%';

    // Refresh detection state
    const toolIds = getAllTools().map((t) => t.id);
    detectedTools = await window.api.detectInstalled(toolIds);
    renderCategories();
    updateInstallButton();

    setTimeout(hideUninstallModal, 1200);
  } else {
    const errorMsg = result.error || 'Unknown error';
    document.getElementById('uninstallFill').style.width = '100%';
    document.getElementById('uninstallFill').style.background = 'var(--error)';
    document.getElementById('uninstallStatus').innerHTML = `
      <div class="error-panel">
        <div class="error-panel-title">\u274C Uninstall Failed</div>
        <div class="error-panel-message">${escapeHtml(errorMsg)}</div>
        <div class="error-panel-hint">Check the application log for full details.</div>
      </div>
    `;
    document.getElementById('uninstallActions').style.display = 'flex';
    document.getElementById('btnConfirmUninstall').textContent = 'Retry';
  }
}

// ─── Event Listeners ─────────────────────────────────────────
function setupListeners() {
  btnInstall.addEventListener('click', startInstallation);

  btnBackToSelect.addEventListener('click', async () => {
    selectedTools.clear();

    // Re-detect tools to show updated status
    const toolIds = getAllTools().map((t) => t.id);
    detectedTools = await window.api.detectInstalled(toolIds);

    renderCategories();
    updateInstallButton();
    updateBundleHighlights();
    showPage('select');
  });

  logToggle.addEventListener('click', () => {
    logToggle.closest('.log-panel').classList.toggle('open');
  });

  document.getElementById('btnCancelUninstall').addEventListener('click', hideUninstallModal);
  document.getElementById('btnConfirmUninstall').addEventListener('click', performUninstall);
}

// ─── Boot ────────────────────────────────────────────────────
init();
