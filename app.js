let docs = [];
let commands = [];
let troubleshooting = [];

const state = {
  view: "overview",
  globalQuery: "",
  docQuery: "",
  docType: "全部",
  docSort: "recent",
  selectedDocId: "",
  commandQuery: "",
  vendor: "全部",
  category: "全部",
  selectedCommandId: "",
  troubleQuery: "",
  selectedTroubleId: "",
  uploads: [],
  paletteQuery: "",
  favorites: [],
  viewHistory: [],
};

const dbName = "personal-knowledge-base";
const storeName = "pending-files";
const commandCenterUrl = "https://www.h3c.com/cn/Service/Document_Software/Document_Center/Home/Switches/00-Public/Command/Command_Manual/H3C_CM_VI%28V1.01%29/?CHID=329047";
const h3cDocsUrl = "https://www.h3c.com/cn/Service/Document_Software/Document_Center/";
const personalStateKey = "net-kb-personal-desk";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const fallbackIcons = {
  archive: '<path d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8"/><path d="M10 12h4"/><path d="M2 3h20v5H2z"/>',
  "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  "cloud-upload": '<path d="M12 13v8"/><path d="m8 17 4-4 4 4"/><path d="M20 16.6A5 5 0 0 0 18 7h-1.3A7 7 0 1 0 4 14.9"/>',
  check: '<path d="m20 6-11 11-5-5"/>',
  copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
  "external-link": '<path d="M15 3h6v6"/><path d="m10 14 11-11"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  files: '<path d="M20 7h-8a2 2 0 0 1-2-2V3"/><path d="M18 22H8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6l6 6v9a2 2 0 0 1-2 2Z"/><path d="M4 16H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8"/>',
  "folder-open": '<path d="m6 14 1.5-2.9A2 2 0 0 1 9.2 10H20a2 2 0 0 1 1.8 2.9l-2.2 5A2 2 0 0 1 17.8 19H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v2"/>',
  "layout-dashboard": '<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>',
  library: '<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>',
  history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  "share-2": '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4"/><path d="m15.4 6.5-6.8 4"/>',
  "shield-check": '<path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3z"/><path d="m9 12 2 2 4-4"/>',
  "trash-2": '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>',
  "upload-cloud": '<path d="M12 13v8"/><path d="m8 17 4-4 4 4"/><path d="M20 16.6A5 5 0 0 0 18 7h-1.3A7 7 0 1 0 4 14.9"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2L5.8 21 7 14.2l-5-4.9 6.9-1z"/>',
  "rotate-ccw": '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
};

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]
  ));
}

function lower(value = "") {
  return String(value).toLowerCase();
}

function formatSize(kb = 0) {
  if (!kb) return "索引文件";
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
}

function inferKind(file = "", tags = []) {
  const ext = file.split(".").pop()?.toLowerCase() || "";
  if (ext === "pdf" || tags.includes("PDF")) return "PDF";
  if (["md", "markdown"].includes(ext) || tags.includes("Markdown")) return "Markdown";
  if (["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(ext)) return "图片";
  if (["cfg", "conf", "ini", "txt", "log"].includes(ext) || tags.includes("配置")) return "配置";
  return "其他";
}

function normalizeDoc(doc) {
  const tags = doc.tags || [];
  return {
    ...doc,
    fileKind: doc.fileKind || inferKind(doc.file, tags),
    purpose: doc.purpose || `用于 ${doc.tags?.slice(0, 3).join(" / ") || doc.type} 的学习、实验复盘或排障参考。`,
  };
}

async function loadJson(path, fallback = []) {
  try {
    const response = await fetch(`${path}?v=20260630-static-core`, { cache: "no-cache" });
    if (!response.ok) throw new Error(`${path} ${response.status}`);
    const data = await response.json();
    return Array.isArray(data) ? data : fallback;
  } catch (error) {
    console.warn(error);
    showToast(`${path} 读取失败`);
    return fallback;
  }
}

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function docHaystack(doc) {
  return lower([
    doc.title,
    doc.type,
    doc.fileKind,
    doc.tags?.join(" "),
    doc.summary,
    doc.purpose,
    doc.owner,
    doc.file,
  ].join(" "));
}

function commandHaystack(command) {
  return lower([
    command.command,
    command.vendor,
    command.category,
    command.scenario,
    command.description,
    command.keyFields?.join(" "),
    command.troubleshooting,
    command.relatedCommands?.join(" "),
  ].join(" "));
}

function troubleHaystack(item) {
  return lower([
    item.title,
    item.tags?.join(" "),
    item.symptom,
    item.environment,
    item.relatedConfig?.join(" "),
    item.commands?.join(" "),
    item.rootCause,
    item.solution?.join(" "),
    item.verification,
    item.summary,
  ].join(" "));
}

function findDoc(id) {
  return docs.find((doc) => doc.id === id);
}

function findCommand(id) {
  return commands.find((command) => command.id === id);
}

function findTrouble(id) {
  return troubleshooting.find((item) => item.id === id);
}

function itemKey(kind, id) {
  return `${kind}:${id}`;
}

function resolvePersonalItem(entry) {
  const item = entry.kind === "doc" ? findDoc(entry.id) : entry.kind === "command" ? findCommand(entry.id) : findTrouble(entry.id);
  if (!item) return null;
  return {
    ...entry,
    title: entry.kind === "doc" ? item.title : entry.kind === "command" ? item.command : item.title,
    meta: entry.kind === "doc" ? `${item.fileKind} / ${item.type}` : entry.kind === "command" ? `${item.vendor} / ${item.category}` : item.symptom,
  };
}

function loadPersonalState() {
  try {
    const saved = JSON.parse(localStorage.getItem(personalStateKey) || "{}");
    state.favorites = Array.isArray(saved.favorites) ? saved.favorites : [];
    state.viewHistory = Array.isArray(saved.viewHistory) ? saved.viewHistory : [];
  } catch {
    state.favorites = [];
    state.viewHistory = [];
  }
}

function savePersonalState() {
  localStorage.setItem(personalStateKey, JSON.stringify({
    favorites: state.favorites,
    viewHistory: state.viewHistory,
  }));
}

function isFavorite(kind, id) {
  const key = itemKey(kind, id);
  return state.favorites.some((entry) => itemKey(entry.kind, entry.id) === key);
}

function toggleFavorite(kind, id) {
  const key = itemKey(kind, id);
  const exists = isFavorite(kind, id);
  state.favorites = exists
    ? state.favorites.filter((entry) => itemKey(entry.kind, entry.id) !== key)
    : [{ kind, id }, ...state.favorites].slice(0, 30);
  savePersonalState();
  renderVisibleView();
  showToast(exists ? "已取消收藏" : "已加入收藏");
}

function recordView(kind, id) {
  const key = itemKey(kind, id);
  state.viewHistory = [{ kind, id, viewedAt: Date.now() }, ...state.viewHistory.filter((entry) => itemKey(entry.kind, entry.id) !== key)].slice(0, 12);
  savePersonalState();
  renderPersonalDesk();
}

function renderPersonalItem(entry, favorite = false) {
  const item = resolvePersonalItem(entry);
  if (!item) return "";
  const typeLabel = item.kind === "doc" ? "资料" : item.kind === "command" ? "命令" : "排障";
  return `
    <div class="desk-item">
      <button class="compact-item" data-personal-kind="${item.kind}" data-personal-id="${escapeHtml(item.id)}" type="button">
        <span><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.meta)}</span></span>
        <span class="type-pill">${typeLabel}</span>
      </button>
      ${favorite ? `<button class="icon-button desk-remove" data-favorite-toggle="${item.kind}:${escapeHtml(item.id)}" type="button" aria-label="取消收藏 ${escapeHtml(item.title)}"><i data-lucide="x"></i></button>` : ""}
    </div>
  `;
}

function renderPersonalDesk() {
  const favorites = state.favorites.map(resolvePersonalItem).filter(Boolean);
  const recent = state.viewHistory.map(resolvePersonalItem).filter(Boolean).slice(0, 6);
  $("#favorite-count").textContent = favorites.length;
  $("#favorite-list").innerHTML = favorites.length
    ? favorites.slice(0, 6).map((item) => renderPersonalItem(item, true)).join("")
    : `<div class="empty compact-empty">在资料、命令或排障详情中点击星标收藏</div>`;
  $("#view-history-list").innerHTML = recent.length
    ? recent.map((item) => renderPersonalItem(item)).join("")
    : `<div class="empty compact-empty">查看过的内容会出现在这里</div>`;
  refreshIcons();
}

function renderDetailTools(kind, id, copyValue = "") {
  const active = isFavorite(kind, id);
  return `
    <div class="detail-tools">
      ${copyValue ? `<button class="icon-button" data-copy-value="${escapeHtml(copyValue)}" type="button" aria-label="复制命令"><i data-lucide="copy"></i></button>` : ""}
      <button class="icon-button ${active ? "active" : ""}" data-favorite-toggle="${kind}:${escapeHtml(id)}" type="button" aria-label="${active ? "取消收藏" : "加入收藏"}"><i data-lucide="star"></i></button>
      <button class="icon-button" data-share-item="${kind}:${escapeHtml(id)}" type="button" aria-label="复制分享链接"><i data-lucide="share-2"></i></button>
    </div>
  `;
}

async function copyText(value, successMessage) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const input = document.createElement("textarea");
    input.value = value;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  }
  showToast(successMessage);
}

function scoreMatch(haystack, query) {
  const words = lower(query).split(/\s+/).filter(Boolean);
  if (!words.length) return 1;
  return words.reduce((score, word) => score + (haystack.includes(word) ? 1 : 0), 0);
}

function filterByQuery(items, haystackFn, query) {
  const q = query.trim();
  if (!q) return [...items];
  return items
    .map((item) => ({ item, score: scoreMatch(haystackFn(item), q) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);
}

function filteredDocs() {
  const result = filterByQuery(docs, docHaystack, state.docQuery).filter((doc) =>
    state.docType === "全部" ? true : doc.fileKind === state.docType,
  );
  return result.sort((a, b) => {
    if (state.docSort === "title") return a.title.localeCompare(b.title, "zh-CN");
    if (state.docSort === "kind") return a.fileKind.localeCompare(b.fileKind, "zh-CN");
    if (state.docSort === "size") return (b.size || 0) - (a.size || 0);
    return new Date(b.updated) - new Date(a.updated);
  });
}

function filteredCommands() {
  return filterByQuery(commands, commandHaystack, state.commandQuery)
    .filter((command) => state.vendor === "全部" || command.vendor === state.vendor)
    .filter((command) => state.category === "全部" || command.category === state.category);
}

function filteredTroubles() {
  return filterByQuery(troubleshooting, troubleHaystack, state.troubleQuery)
    .sort((a, b) => new Date(b.updated) - new Date(a.updated));
}

function relatedCommandsForDoc(doc) {
  return commands.filter((command) => command.relatedDocs?.includes(doc.id)).slice(0, 5);
}

function relatedTroublesForDoc(doc) {
  return troubleshooting.filter((item) => item.relatedDocs?.includes(doc.id)).slice(0, 4);
}

function relatedDocsForCommand(command) {
  return (command.relatedDocs || []).map(findDoc).filter(Boolean);
}

function relatedTroublesForCommand(command) {
  return (command.relatedTroubles || []).map(findTrouble).filter(Boolean);
}

function relatedCommandsForTrouble(item) {
  return (item.relatedCommands || []).map(findCommand).filter(Boolean);
}

function relatedDocsForTrouble(item) {
  return (item.relatedDocs || []).map(findDoc).filter(Boolean);
}

function renderStats() {
  $("#stat-docs").textContent = docs.length;
  $("#stat-pdfs").textContent = docs.filter((doc) => doc.fileKind === "PDF").length;
  $("#stat-commands").textContent = commands.length;
  $("#stat-troubles").textContent = troubleshooting.length;
}

function renderRecent() {
  const recentDocs = [...docs].sort((a, b) => new Date(b.updated) - new Date(a.updated)).slice(0, 5);
  $("#recent-list").innerHTML = recentDocs.map((doc) => `
    <button class="compact-item" data-doc-link="${escapeHtml(doc.id)}" type="button">
      <span>
        <strong>${escapeHtml(doc.title)}</strong>
        <span>${escapeHtml(doc.fileKind)} / ${escapeHtml(doc.type)} / ${escapeHtml(doc.updated)}</span>
      </span>
      <span class="type-pill">${escapeHtml(doc.tags?.[0] || doc.fileKind)}</span>
    </button>
  `).join("");

  const recentTroubles = [...troubleshooting].sort((a, b) => new Date(b.updated) - new Date(a.updated)).slice(0, 4);
  $("#recent-troubles").innerHTML = recentTroubles.map((item) => `
    <button class="compact-item" data-trouble-link="${escapeHtml(item.id)}" type="button">
      <span>
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.symptom)}</span>
      </span>
      <span class="type-pill">${escapeHtml(item.tags?.[0] || "Trouble")}</span>
    </button>
  `).join("");
}

function renderRecentInbox() {
  const recent = state.uploads.slice(0, 4);
  $("#recent-inbox").innerHTML = recent.length
    ? recent.map((file) => `
        <button class="compact-item" data-upload-jump="true" type="button">
          <span>
            <strong>${escapeHtml(file.name)}</strong>
            <span>${escapeHtml(new Date(file.createdAt).toLocaleString("zh-CN"))}</span>
          </span>
          <span class="type-pill">${escapeHtml(file.type || "file")}</span>
        </button>
      `).join("")
    : `<div class="empty compact-empty">暂无暂存内容</div>`;
}

function renderFrequentCommands() {
  $("#frequent-commands").innerHTML = `
    <div class="terminal-head"><span></span><span></span><span></span><strong>command-center</strong></div>
    ${commands.slice(0, 7).map((command) => `
      <button class="command-line" data-command-link="${escapeHtml(command.id)}" type="button">
        <code>${escapeHtml(command.command)}</code>
        <span>${escapeHtml(command.category)}</span>
      </button>
    `).join("")}
  `;
}

function renderHomeResults() {
  const panel = $("#home-results-panel");
  const results = $("#global-results");
  const query = state.globalQuery.trim();
  if (!query) {
    panel.hidden = true;
    results.innerHTML = "";
    return;
  }

  const docMatches = filterByQuery(docs, docHaystack, query).slice(0, 4);
  const commandMatches = filterByQuery(commands, commandHaystack, query).slice(0, 4);
  const troubleMatches = filterByQuery(troubleshooting, troubleHaystack, query).slice(0, 4);
  panel.hidden = false;
  results.innerHTML = `
    ${renderResultGroup("资料", docMatches, (doc) => `
      <button class="result-item" data-doc-link="${escapeHtml(doc.id)}" type="button">
        <span>${escapeHtml(doc.fileKind)}</span><strong>${escapeHtml(doc.title)}</strong><small>${escapeHtml(doc.summary)}</small>
      </button>
    `)}
    ${renderResultGroup("命令", commandMatches, (command) => `
      <button class="result-item" data-command-link="${escapeHtml(command.id)}" type="button">
        <span>${escapeHtml(command.category)}</span><strong>${escapeHtml(command.command)}</strong><small>${escapeHtml(command.scenario)}</small>
      </button>
    `)}
    ${renderResultGroup("排障", troubleMatches, (item) => `
      <button class="result-item" data-trouble-link="${escapeHtml(item.id)}" type="button">
        <span>${escapeHtml(item.tags?.[0] || "记录")}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.symptom)}</small>
      </button>
    `)}
  `;
}

function renderResultGroup(title, items, mapper) {
  return `
    <div class="result-group">
      <h3>${escapeHtml(title)}</h3>
      ${items.length ? items.map(mapper).join("") : `<div class="empty mini-empty">没有匹配</div>`}
    </div>
  `;
}

function renderTypeFilter() {
  const types = ["全部", "PDF", "Markdown", "图片", "配置", "其他"];
  $("#type-filter").innerHTML = types.map((type) => `
    <button class="segment ${state.docType === type ? "active" : ""}" data-type="${escapeHtml(type)}" type="button">
      ${escapeHtml(type)}
    </button>
  `).join("");
}

function renderLibrary() {
  renderTypeFilter();
  $("#search-input").value = state.docQuery;
  $("#sort-select").value = state.docSort;
  const list = filteredDocs();
  const listEl = $("#doc-list");
  if (!list.length) {
    listEl.innerHTML = `<div class="empty">没有匹配的资料</div>`;
    $("#detail-panel").innerHTML = `<div class="empty">选择一个资料，或调整搜索关键词</div>`;
    return;
  }
  if (!list.some((doc) => doc.id === state.selectedDocId)) state.selectedDocId = list[0].id;
  listEl.innerHTML = list.map((doc, index) => `
    <article class="doc-card ${state.selectedDocId === doc.id ? "active" : ""}" data-doc-id="${escapeHtml(doc.id)}" style="--card-index:${index}">
      <div class="doc-meta">
        <span class="type-pill">${escapeHtml(doc.fileKind)}</span>
        <span>${escapeHtml(doc.type)}</span>
        <span>${escapeHtml(doc.updated)}</span>
        <span>${escapeHtml(formatSize(doc.size))}</span>
      </div>
      <strong>${escapeHtml(doc.title)}</strong>
      <p class="doc-summary">${escapeHtml(doc.summary)}</p>
      <p class="doc-purpose">${escapeHtml(doc.purpose)}</p>
      <div class="tag-cloud">${(doc.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
    </article>
  `).join("");
  renderDocDetail();
}

async function renderDocDetail() {
  const doc = findDoc(state.selectedDocId) || docs[0];
  if (!doc) return;
  const relatedCommands = relatedCommandsForDoc(doc);
  const relatedTroubles = relatedTroublesForDoc(doc);
  const isPdf = doc.fileKind === "PDF";
  const isText = ["Markdown", "配置"].includes(doc.fileKind);
  $("#detail-panel").innerHTML = `
    <div class="detail-heading">
      <span class="type-pill">${escapeHtml(doc.fileKind)}</span>
      ${renderDetailTools("doc", doc.id)}
    </div>
    <h2>${escapeHtml(doc.title)}</h2>
    <p>${escapeHtml(doc.summary)}</p>
    <dl class="kv-list">
      <div><dt>类型</dt><dd>${escapeHtml(doc.type)}</dd></div>
      <div><dt>用途</dt><dd>${escapeHtml(doc.purpose)}</dd></div>
      <div><dt>更新</dt><dd>${escapeHtml(doc.updated)}</dd></div>
      <div><dt>来源</dt><dd>${escapeHtml(doc.owner)}</dd></div>
    </dl>
    <div class="tag-cloud detail-tags">${(doc.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
    ${isPdf ? `<div class="pdf-preview"><iframe src="${escapeHtml(doc.file)}#view=FitH" title="${escapeHtml(doc.title)} PDF 预览"></iframe></div>` : ""}
    ${isText ? `<pre class="text-preview" id="text-preview">正在读取文本预览...</pre>` : ""}
    ${renderRelationBlock("关联命令", relatedCommands, (command) => `
      <button class="related-command" data-command-link="${escapeHtml(command.id)}" type="button">
        <strong>${escapeHtml(command.command)}</strong><small>${escapeHtml(command.category)}</small>
      </button>
    `)}
    ${renderRelationBlock("关联排障", relatedTroubles, (item) => `
      <button class="related-command" data-trouble-link="${escapeHtml(item.id)}" type="button">
        <strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.symptom)}</small>
      </button>
    `)}
    <div class="detail-actions">
      <a class="button primary" href="${escapeHtml(doc.file)}" target="_blank" rel="noreferrer">
        <i data-lucide="external-link"></i><span>打开文件</span>
      </a>
      <a class="button secondary" href="${escapeHtml(doc.file)}" download>
        <i data-lucide="download"></i><span>下载</span>
      </a>
    </div>
  `;
  refreshIcons();
  if (isText) {
    try {
      const response = await fetch(doc.file);
      const text = await response.text();
      $("#text-preview").textContent = text.slice(0, 2600);
    } catch {
      $("#text-preview").textContent = "文本预览读取失败，可直接打开文件。";
    }
  }
}

function renderRelationBlock(title, items, mapper) {
  if (!items.length) return "";
  return `<div class="related-commands"><span>${escapeHtml(title)}</span>${items.map(mapper).join("")}</div>`;
}

function renderCommandFilters() {
  const vendors = ["全部", ...new Set(commands.map((command) => command.vendor))];
  const categories = ["全部", ...new Set(commands.map((command) => command.category))];
  $("#vendor-filter").innerHTML = vendors.map((vendor) => `<option value="${escapeHtml(vendor)}">${escapeHtml(vendor)}</option>`).join("");
  $("#category-filter").innerHTML = categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("");
  $("#vendor-filter").value = state.vendor;
  $("#category-filter").value = state.category;
}

function renderCommands() {
  renderCommandFilters();
  $("#command-search-input").value = state.commandQuery;
  const list = filteredCommands();
  const listEl = $("#command-list");
  if (!list.length) {
    listEl.innerHTML = `
      <div class="empty no-command">
        <span>本地 commands.json 没有匹配结果</span>
        <a class="button primary" href="${commandCenterUrl}" target="_blank" rel="noreferrer">打开 H3C 官方命令查询</a>
        <a class="button secondary" href="${h3cDocsUrl}" target="_blank" rel="noreferrer">打开 H3C 文档搜索</a>
      </div>
    `;
    $("#command-detail").innerHTML = `<div class="empty">本地没有命令详情。可以从官方链接继续查。</div>`;
    return;
  }
  if (!list.some((command) => command.id === state.selectedCommandId)) state.selectedCommandId = list[0].id;
  listEl.innerHTML = list.map((command, index) => `
    <article class="doc-card command-card ${state.selectedCommandId === command.id ? "active" : ""}" data-command-id="${escapeHtml(command.id)}" style="--card-index:${index}">
      <div class="doc-meta">
        <span class="type-pill">${escapeHtml(command.vendor)}</span>
        <span>${escapeHtml(command.category)}</span>
      </div>
      <strong><code>${escapeHtml(command.command)}</code></strong>
      <p class="doc-summary">${escapeHtml(command.scenario)}</p>
    </article>
  `).join("");
  renderCommandDetail();
}

function renderCommandDetail() {
  const command = findCommand(state.selectedCommandId) || commands[0];
  if (!command) return;
  const relatedDocs = relatedDocsForCommand(command);
  const relatedTroubles = relatedTroublesForCommand(command);
  $("#command-detail").innerHTML = `
    <div class="detail-heading">
      <span class="type-pill">${escapeHtml(command.vendor)} / ${escapeHtml(command.category)}</span>
      ${renderDetailTools("command", command.id, command.command)}
    </div>
    <h2><code>${escapeHtml(command.command)}</code></h2>
    <p>${escapeHtml(command.description)}</p>
    <dl class="kv-list">
      <div><dt>场景</dt><dd>${escapeHtml(command.scenario)}</dd></div>
      <div><dt>关键字段</dt><dd>${escapeHtml(command.keyFields?.join(" / "))}</dd></div>
      <div><dt>排障提示</dt><dd>${escapeHtml(command.troubleshooting)}</dd></div>
    </dl>
    ${renderListBlock("关联命令", command.relatedCommands)}
    ${renderRelationBlock("关联资料", relatedDocs, (doc) => `
      <button class="related-command" data-doc-link="${escapeHtml(doc.id)}" type="button">
        <strong>${escapeHtml(doc.title)}</strong><small>${escapeHtml(doc.fileKind)} / ${escapeHtml(doc.type)}</small>
      </button>
    `)}
    ${renderRelationBlock("关联排障记录", relatedTroubles, (item) => `
      <button class="related-command" data-trouble-link="${escapeHtml(item.id)}" type="button">
        <strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.symptom)}</small>
      </button>
    `)}
    <div class="detail-actions">
      <a class="button primary" href="${escapeHtml(command.officialUrl || commandCenterUrl)}" target="_blank" rel="noreferrer">
        <i data-lucide="external-link"></i><span>外部参考链接</span>
      </a>
      <a class="button secondary" href="${h3cDocsUrl}" target="_blank" rel="noreferrer">
        <i data-lucide="external-link"></i><span>H3C 文档搜索</span>
      </a>
    </div>
  `;
  refreshIcons();
}

function renderListBlock(title, items = []) {
  if (!items.length) return "";
  return `
    <div class="list-block">
      <span>${escapeHtml(title)}</span>
      <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </div>
  `;
}

function renderTroubleshooting() {
  $("#trouble-search-input").value = state.troubleQuery;
  const list = filteredTroubles();
  const listEl = $("#trouble-list");
  if (!list.length) {
    listEl.innerHTML = `<div class="empty">没有匹配的排障记录</div>`;
    $("#trouble-detail").innerHTML = `<div class="empty">选择一条排障记录</div>`;
    return;
  }
  if (!list.some((item) => item.id === state.selectedTroubleId)) state.selectedTroubleId = list[0].id;
  listEl.innerHTML = list.map((item, index) => `
    <article class="doc-card trouble-card ${state.selectedTroubleId === item.id ? "active" : ""}" data-trouble-id="${escapeHtml(item.id)}" style="--card-index:${index}">
      <div class="doc-meta">
        <span class="type-pill">Trouble</span>
        <span>${escapeHtml(item.updated)}</span>
      </div>
      <strong>${escapeHtml(item.title)}</strong>
      <p class="doc-summary">${escapeHtml(item.symptom)}</p>
      <div class="tag-cloud">${(item.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
    </article>
  `).join("");
  renderTroubleDetail();
}

function renderTroubleDetail() {
  const item = findTrouble(state.selectedTroubleId) || troubleshooting[0];
  if (!item) return;
  $("#trouble-detail").innerHTML = `
    <div class="detail-heading">
      <span class="type-pill">Troubleshooting Note</span>
      ${renderDetailTools("trouble", item.id)}
    </div>
    <h2>${escapeHtml(item.title)}</h2>
    <dl class="kv-list trouble-kv">
      <div><dt>故障现象</dt><dd>${escapeHtml(item.symptom)}</dd></div>
      <div><dt>环境/拓扑</dt><dd>${escapeHtml(item.environment)}</dd></div>
      <div><dt>相关配置</dt><dd>${escapeHtml(item.relatedConfig?.join(" / "))}</dd></div>
      <div><dt>排查命令</dt><dd class="copy-command-list">${(item.commands || []).map((command) => `<button data-copy-value="${escapeHtml(command)}" type="button"><code>${escapeHtml(command)}</code><i data-lucide="copy"></i></button>`).join("")}</dd></div>
      <div><dt>原因定位</dt><dd>${escapeHtml(item.rootCause)}</dd></div>
      <div><dt>解决命令</dt><dd class="copy-command-list">${(item.solution || []).map((command) => `<button data-copy-value="${escapeHtml(command)}" type="button"><code>${escapeHtml(command)}</code><i data-lucide="copy"></i></button>`).join("")}</dd></div>
      <div><dt>验证结果</dt><dd>${escapeHtml(item.verification)}</dd></div>
      <div><dt>总结</dt><dd>${escapeHtml(item.summary)}</dd></div>
    </dl>
    <div class="tag-cloud detail-tags">${(item.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
    ${renderRelationBlock("关联命令", relatedCommandsForTrouble(item), (command) => `
      <button class="related-command" data-command-link="${escapeHtml(command.id)}" type="button">
        <strong>${escapeHtml(command.command)}</strong><small>${escapeHtml(command.category)}</small>
      </button>
    `)}
    ${renderRelationBlock("关联资料", relatedDocsForTrouble(item), (doc) => `
      <button class="related-command" data-doc-link="${escapeHtml(doc.id)}" type="button">
        <strong>${escapeHtml(doc.title)}</strong><small>${escapeHtml(doc.fileKind)} / ${escapeHtml(doc.type)}</small>
      </button>
    `)}
  `;
}

function renderUploads() {
  $("#upload-count").textContent = `${state.uploads.length} 个文件`;
  renderRecentInbox();
  if (!state.uploads.length) {
    $("#upload-list").innerHTML = `<div class="empty">暂无暂存文件</div>`;
    return;
  }
  $("#upload-list").innerHTML = state.uploads.map((file) => `
    <article class="upload-item">
      <span>
        <strong>${escapeHtml(file.name)}</strong>
        <small>${escapeHtml(formatBytes(file.size))} / ${escapeHtml(new Date(file.createdAt).toLocaleString("zh-CN"))}</small>
      </span>
      <span class="upload-actions">
        <button class="icon-button" data-download-upload="${escapeHtml(file.id)}" aria-label="下载 ${escapeHtml(file.name)}">
          <i data-lucide="download"></i>
        </button>
        <button class="icon-button" data-delete-upload="${escapeHtml(file.id)}" aria-label="删除 ${escapeHtml(file.name)}">
          <i data-lucide="trash-2"></i>
        </button>
      </span>
    </article>
  `).join("");
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function getPaletteItems() {
  return [
    ...commands.map((command) => ({ kind: "CMD", id: command.id, title: command.command, meta: command.category })),
    ...docs.map((doc) => ({ kind: doc.fileKind, id: doc.id, title: doc.title, meta: doc.type })),
    ...troubleshooting.map((item) => ({ kind: "Trouble", id: item.id, title: item.title, meta: item.tags?.join(" / ") })),
  ];
}

function renderPaletteResults() {
  const results = $("#palette-results");
  if (!results) return;
  const query = state.paletteQuery.trim();
  const items = filterByQuery(getPaletteItems(), (item) => lower(`${item.kind} ${item.title} ${item.meta}`), query).slice(0, 9);
  results.innerHTML = items.length
    ? items.map((item) => `
      <button class="palette-item" data-palette-kind="${escapeHtml(item.kind)}" data-palette-id="${escapeHtml(item.id)}" type="button">
        <span>${escapeHtml(item.kind)}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.meta)}</small>
      </button>
    `).join("")
    : `<div class="empty">没有匹配内容</div>`;
}

function openPalette(seed = "") {
  const palette = $("#command-palette");
  const input = $("#palette-input");
  state.paletteQuery = seed;
  input.value = seed;
  palette.classList.add("open");
  palette.setAttribute("aria-hidden", "false");
  renderPaletteResults();
  window.setTimeout(() => input.focus(), 40);
}

function closePalette() {
  const palette = $("#command-palette");
  palette.classList.remove("open");
  palette.setAttribute("aria-hidden", "true");
}

function parseRoute() {
  const [view = "overview", id = ""] = location.hash.replace(/^#/, "").split("/");
  return { view, id: decodeURIComponent(id) };
}

function applyRouteSelection(view, id) {
  if (!id) return;
  if (view === "library" && findDoc(id)) state.selectedDocId = id;
  if (view === "commands" && findCommand(id)) state.selectedCommandId = id;
  if (view === "troubleshooting" && findTrouble(id)) state.selectedTroubleId = id;
}

function updateDetailRoute(view, id) {
  const nextHash = `#${view}/${encodeURIComponent(id)}`;
  if (location.hash !== nextHash) window.history.replaceState(null, "", nextHash);
}

function setView(view, selectedId = "") {
  state.view = ["overview", "library", "commands", "troubleshooting", "uploads"].includes(view) ? view : "overview";
  applyRouteSelection(state.view, selectedId);
  $$("[data-view-link]").forEach((link) => link.classList.toggle("active", link.dataset.viewLink === state.view));
  $$("[data-view]").forEach((section) => section.classList.toggle("active", section.dataset.view === state.view));
  document.body.dataset.view = state.view;
  document.body.classList.toggle("reading-mode", ["library", "commands", "troubleshooting"].includes(state.view));
  renderVisibleView();
}

function renderVisibleView() {
  renderStats();
  renderHomeResults();
  renderPersonalDesk();
  renderRecent();
  renderFrequentCommands();
  if (state.view === "library") renderLibrary();
  if (state.view === "commands") renderCommands();
  if (state.view === "troubleshooting") renderTroubleshooting();
  renderUploads();
  refreshIcons();
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
    return;
  }
  $$("i[data-lucide]").forEach((icon) => {
    const name = icon.dataset.lucide;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("class", `lucide lucide-${name}`);
    svg.innerHTML = fallbackIcons[name] || fallbackIcons.files;
    icon.replaceWith(svg);
  });
}

function updateClock() {
  const clock = $("#os-clock");
  if (!clock) return;
  clock.textContent = new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
}

function bindMotion() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches) return;
  const root = document.documentElement;
  const target = { x: 0.5, y: 0.5, px: window.innerWidth / 2, py: window.innerHeight / 2 };
  const current = { ...target };
  const tick = () => {
    current.x += (target.x - current.x) * 0.12;
    current.y += (target.y - current.y) * 0.12;
    current.px += (target.px - current.px) * 0.16;
    current.py += (target.py - current.py) * 0.16;
    const dx = current.x - 0.5;
    const dy = current.y - 0.5;
    root.style.setProperty("--mx", current.x.toFixed(4));
    root.style.setProperty("--my", current.y.toFixed(4));
    root.style.setProperty("--px", `${current.px.toFixed(1)}px`);
    root.style.setProperty("--py", `${current.py.toFixed(1)}px`);
    root.style.setProperty("--rx", `${(window.innerWidth - current.px).toFixed(1)}px`);
    root.style.setProperty("--motion-x", `${(dx * 52).toFixed(1)}px`);
    root.style.setProperty("--motion-y", `${(dy * 42).toFixed(1)}px`);
    root.style.setProperty("--motion-x-neg", `${(-dx * 52).toFixed(1)}px`);
    root.style.setProperty("--motion-y-neg", `${(-dy * 42).toFixed(1)}px`);
    root.style.setProperty("--motion-x-sm", `${(dx * 22).toFixed(1)}px`);
    root.style.setProperty("--motion-y-sm", `${(dy * 16).toFixed(1)}px`);
    root.style.setProperty("--motion-x-sm-neg", `${(-dx * 22).toFixed(1)}px`);
    root.style.setProperty("--motion-y-sm-neg", `${(-dy * 16).toFixed(1)}px`);
    root.style.setProperty("--micro-x", `${(dx * 8).toFixed(1)}px`);
    root.style.setProperty("--micro-y", `${(dy * 6).toFixed(1)}px`);
    root.style.setProperty("--tilt-x", `${(dx * 8).toFixed(2)}deg`);
    root.style.setProperty("--tilt-y", `${(dy * 8).toFixed(2)}deg`);
    root.style.setProperty("--scroll-rot", `${(window.scrollY * 0.006).toFixed(2)}deg`);
    requestAnimationFrame(tick);
  };
  window.addEventListener("pointermove", (event) => {
    target.px = event.clientX;
    target.py = event.clientY;
    target.x = Math.min(1, Math.max(0, event.clientX / window.innerWidth));
    target.y = Math.min(1, Math.max(0, event.clientY / window.innerHeight));
    const activeCard = event.target.closest(".stat-card, .panel, .doc-card, .upload-zone");
    if (activeCard) {
      const rect = activeCard.getBoundingClientRect();
      activeCard.style.setProperty("--card-x", `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`);
      activeCard.style.setProperty("--card-y", `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`);
    }
  }, { passive: true });
  requestAnimationFrame(tick);
}

function bindCyberCanvas() {
  const canvas = $("#cyber-canvas");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const context = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let points = [];
  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    points = Array.from({ length: Math.max(40, Math.min(90, Math.floor((width * height) / 18000))) }, (_, index) => ({
      x: (index * 97) % width,
      y: (index * 53) % height,
      vx: ((index % 7) - 3) * 0.045,
      vy: (((index + 3) % 9) - 4) * 0.032,
    }));
  };
  const draw = () => {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(8, 12, 11, 0.2)";
    context.fillRect(0, 0, width, height);
    points.forEach((point, index) => {
      point.x += point.vx;
      point.y += point.vy;
      if (point.x < -30) point.x = width + 30;
      if (point.x > width + 30) point.x = -30;
      if (point.y < -30) point.y = height + 30;
      if (point.y > height + 30) point.y = -30;
      for (let j = index + 1; j < points.length; j += 1) {
        const other = points[j];
        const distance = Math.hypot(point.x - other.x, point.y - other.y);
        if (distance < 140) {
          context.strokeStyle = `rgba(73, 198, 177, ${(1 - distance / 140) * 0.14})`;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }
      context.fillStyle = "rgba(233, 220, 193, 0.32)";
      context.beginPath();
      context.arc(point.x, point.y, 1.35, 0, Math.PI * 2);
      context.fill();
    });
    requestAnimationFrame(draw);
  };
  window.addEventListener("resize", resize, { passive: true });
  resize();
  requestAnimationFrame(draw);
}

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) db.createObjectStore(storeName, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore(mode, callback) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);
    const result = callback(store);
    tx.oncomplete = () => {
      db.close();
      resolve(result);
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}

async function loadUploads() {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => {
      db.close();
      resolve(request.result.sort((a, b) => b.createdAt - a.createdAt));
    };
    request.onerror = () => {
      db.close();
      reject(request.error);
    };
  });
}

async function saveFiles(files) {
  if (!files.length) return;
  const items = [...files].map((file) => ({
    id: `${Date.now()}-${crypto.randomUUID?.() || Math.random().toString(36).slice(2)}`,
    name: file.name,
    type: file.type || "application/octet-stream",
    size: file.size,
    createdAt: Date.now(),
    blob: file,
  }));
  await withStore("readwrite", (store) => items.forEach((item) => store.put(item)));
  state.uploads = await loadUploads();
  renderUploads();
  showToast(`已暂存 ${items.length} 个文件`);
}

async function deleteUpload(id) {
  await withStore("readwrite", (store) => store.delete(id));
  state.uploads = await loadUploads();
  renderUploads();
}

async function clearUploads() {
  await withStore("readwrite", (store) => store.clear());
  state.uploads = [];
  renderUploads();
}

async function downloadUpload(id) {
  const upload = state.uploads.find((item) => item.id === id);
  if (!upload) return;
  const url = URL.createObjectURL(upload.blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = upload.name;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function exportIndex() {
  const payload = {
    exportedAt: new Date().toISOString(),
    docs,
    commands,
    troubleshooting,
    pendingUploads: state.uploads.map(({ blob, ...rest }) => rest),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "network-knowledge-index.json";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function jumpToDoc(id) {
  state.selectedDocId = id;
  state.docQuery = "";
  recordView("doc", id);
  location.hash = `library/${encodeURIComponent(id)}`;
  setView("library", id);
}

function jumpToCommand(id) {
  state.selectedCommandId = id;
  state.commandQuery = "";
  recordView("command", id);
  location.hash = `commands/${encodeURIComponent(id)}`;
  setView("commands", id);
}

function jumpToTrouble(id) {
  state.selectedTroubleId = id;
  state.troubleQuery = "";
  recordView("trouble", id);
  location.hash = `troubleshooting/${encodeURIComponent(id)}`;
  setView("troubleshooting", id);
}

function bindEvents() {
  window.addEventListener("hashchange", () => {
    const route = parseRoute();
    setView(route.view, route.id);
  });

  $("#global-search").addEventListener("input", (event) => {
    state.globalQuery = event.target.value;
    renderHomeResults();
    refreshIcons();
  });
  $("#global-search").addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const query = event.target.value.trim();
    if (!query) return;
    const command = filterByQuery(commands, commandHaystack, query)[0];
    const doc = filterByQuery(docs, docHaystack, query)[0];
    const trouble = filterByQuery(troubleshooting, troubleHaystack, query)[0];
    if (command) jumpToCommand(command.id);
    else if (doc) jumpToDoc(doc.id);
    else if (trouble) jumpToTrouble(trouble.id);
  });

  $("#search-input").addEventListener("input", (event) => {
    state.docQuery = event.target.value;
    renderLibrary();
    refreshIcons();
  });
  $("#clear-search").addEventListener("click", () => {
    state.docQuery = "";
    renderLibrary();
  });
  $("#sort-select").addEventListener("change", (event) => {
    state.docSort = event.target.value;
    renderLibrary();
  });
  $("#type-filter").addEventListener("click", (event) => {
    const button = event.target.closest("[data-type]");
    if (!button) return;
    state.docType = button.dataset.type;
    renderLibrary();
  });

  $("#command-search-input").addEventListener("input", (event) => {
    state.commandQuery = event.target.value;
    renderCommands();
    refreshIcons();
  });
  $("#clear-command-search").addEventListener("click", () => {
    state.commandQuery = "";
    renderCommands();
  });
  $("#vendor-filter").addEventListener("change", (event) => {
    state.vendor = event.target.value;
    renderCommands();
  });
  $("#category-filter").addEventListener("change", (event) => {
    state.category = event.target.value;
    renderCommands();
  });

  $("#trouble-search-input").addEventListener("input", (event) => {
    state.troubleQuery = event.target.value;
    renderTroubleshooting();
    refreshIcons();
  });
  $("#clear-trouble-search").addEventListener("click", () => {
    state.troubleQuery = "";
    renderTroubleshooting();
  });

  document.body.addEventListener("click", (event) => {
    const docCard = event.target.closest("[data-doc-id]");
    const commandCard = event.target.closest("[data-command-id]");
    const troubleCard = event.target.closest("[data-trouble-id]");
    const docLink = event.target.closest("[data-doc-link]");
    const commandLink = event.target.closest("[data-command-link]");
    const troubleLink = event.target.closest("[data-trouble-link]");
    const paletteItem = event.target.closest("[data-palette-id]");
    const uploadJump = event.target.closest("[data-upload-jump]");
    const downloadButton = event.target.closest("[data-download-upload]");
    const deleteButton = event.target.closest("[data-delete-upload]");
    const personalItem = event.target.closest("[data-personal-kind]");
    const favoriteButton = event.target.closest("[data-favorite-toggle]");
    const copyButton = event.target.closest("[data-copy-value]");
    const shareButton = event.target.closest("[data-share-item]");

    if (docCard) {
      state.selectedDocId = docCard.dataset.docId;
      recordView("doc", state.selectedDocId);
      updateDetailRoute("library", state.selectedDocId);
      renderLibrary();
    }
    if (commandCard) {
      state.selectedCommandId = commandCard.dataset.commandId;
      recordView("command", state.selectedCommandId);
      updateDetailRoute("commands", state.selectedCommandId);
      renderCommands();
    }
    if (troubleCard) {
      state.selectedTroubleId = troubleCard.dataset.troubleId;
      recordView("trouble", state.selectedTroubleId);
      updateDetailRoute("troubleshooting", state.selectedTroubleId);
      renderTroubleshooting();
    }
    if (docLink) jumpToDoc(docLink.dataset.docLink);
    if (commandLink) jumpToCommand(commandLink.dataset.commandLink);
    if (troubleLink) jumpToTrouble(troubleLink.dataset.troubleLink);
    if (uploadJump) location.hash = "uploads";
    if (downloadButton) downloadUpload(downloadButton.dataset.downloadUpload);
    if (deleteButton) deleteUpload(deleteButton.dataset.deleteUpload);
    if (personalItem) {
      const { personalKind: kind, personalId: id } = personalItem.dataset;
      if (kind === "doc") jumpToDoc(id);
      if (kind === "command") jumpToCommand(id);
      if (kind === "trouble") jumpToTrouble(id);
    }
    if (favoriteButton) {
      event.stopPropagation();
      const [kind, id] = favoriteButton.dataset.favoriteToggle.split(":");
      toggleFavorite(kind, id);
    }
    if (copyButton) copyText(copyButton.dataset.copyValue, "命令已复制");
    if (shareButton) {
      const [kind, id] = shareButton.dataset.shareItem.split(":");
      const view = kind === "doc" ? "library" : kind === "command" ? "commands" : "troubleshooting";
      const url = `${location.origin}${location.pathname}${location.search}#${view}/${encodeURIComponent(id)}`;
      copyText(url, "分享链接已复制");
    }
    if (paletteItem) {
      const kind = paletteItem.dataset.paletteKind;
      const id = paletteItem.dataset.paletteId;
      if (kind === "CMD") jumpToCommand(id);
      else if (kind === "Trouble") jumpToTrouble(id);
      else jumpToDoc(id);
      closePalette();
    }
  });

  $("#export-index").addEventListener("click", exportIndex);
  $("#open-palette").addEventListener("click", () => openPalette());
  $("#command-palette").addEventListener("click", (event) => {
    if (event.target.id === "command-palette") closePalette();
  });
  $("#palette-input").addEventListener("input", (event) => {
    state.paletteQuery = event.target.value;
    renderPaletteResults();
  });
  document.addEventListener("keydown", (event) => {
    const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName);
    if (event.key === "Escape") closePalette();
    if (event.key === "/" && !isTyping) {
      event.preventDefault();
      openPalette();
    }
  });

  $("#pick-files").addEventListener("click", () => $("#file-input").click());
  $("#file-input").addEventListener("change", async (event) => {
    await saveFiles(event.target.files);
    event.target.value = "";
  });
  $("#clear-uploads").addEventListener("click", clearUploads);
  $("#clear-history").addEventListener("click", () => {
    state.viewHistory = [];
    savePersonalState();
    renderPersonalDesk();
    showToast("最近查看已清除");
  });

  const zone = $("#upload-zone");
  ["dragenter", "dragover"].forEach((name) => {
    zone.addEventListener(name, (event) => {
      event.preventDefault();
      zone.classList.add("dragging");
    });
  });
  ["dragleave", "drop"].forEach((name) => {
    zone.addEventListener(name, (event) => {
      event.preventDefault();
      zone.classList.remove("dragging");
    });
  });
  zone.addEventListener("drop", (event) => saveFiles(event.dataTransfer.files));
}

async function init() {
  bindMotion();
  bindCyberCanvas();
  const [loadedDocs, loadedCommands, loadedTroubles] = await Promise.all([
    loadJson("./docs/documents.json"),
    loadJson("./data/commands.json"),
    loadJson("./data/troubleshooting.json"),
  ]);
  docs = loadedDocs.map(normalizeDoc);
  commands = loadedCommands;
  troubleshooting = loadedTroubles;
  loadPersonalState();
  state.selectedDocId = docs[0]?.id || "";
  state.selectedCommandId = commands[0]?.id || "";
  state.selectedTroubleId = troubleshooting[0]?.id || "";
  state.uploads = await loadUploads();
  bindEvents();
  updateClock();
  window.setInterval(updateClock, 30000);
  const route = parseRoute();
  setView(route.view, route.id);
}

init().catch((error) => {
  console.error(error);
  showToast("初始化失败，请检查浏览器存储权限或本地 JSON 文件。");
});
