const docs = [
  {
    id: "electrochemistry-cell",
    title: "电化学电池实验记录模板",
    type: "实验文档",
    tags: ["电化学", "模板", "实验记录"],
    updated: "2026-06-18",
    size: 128,
    file: "./docs/electrochemistry-cell.md",
    summary: "记录电极材料、循环伏安参数、阻抗测试条件和异常现象。",
    owner: "个人实验",
  },
  {
    id: "material-characterization",
    title: "材料表征资料整理规范",
    type: "资料",
    tags: ["XRD", "SEM", "表征", "归档"],
    updated: "2026-06-12",
    size: 236,
    file: "./docs/material-characterization.md",
    summary: "统一命名、图谱编号、原始数据位置和处理版本记录。",
    owner: "资料库",
  },
  {
    id: "safety-checklist",
    title: "实验安全检查清单",
    type: "清单",
    tags: ["安全", "SOP", "检查"],
    updated: "2026-05-29",
    size: 84,
    file: "./docs/safety-checklist.md",
    summary: "面向高温、强酸碱、有机溶剂和仪器通电前后的基础检查项。",
    owner: "常用",
  },
  {
    id: "literature-digest",
    title: "文献速读笔记样例",
    type: "笔记",
    tags: ["文献", "笔记", "方法"],
    updated: "2026-05-18",
    size: 64,
    file: "./docs/literature-digest.md",
    summary: "从研究问题、关键方法、可复现实验和可借鉴图表四个维度记录。",
    owner: "阅读",
  },
];

const state = {
  view: "overview",
  query: "",
  type: "全部",
  sort: "recent",
  selectedId: docs[0].id,
  uploads: [],
};

const dbName = "personal-knowledge-base";
const storeName = "pending-files";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const fallbackIcons = {
  archive: '<path d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8"/><path d="M10 12h4"/><path d="M2 3h20v5H2z"/>',
  "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  "cloud-upload": '<path d="M12 13v8"/><path d="m8 17 4-4 4 4"/><path d="M20 16.6A5 5 0 0 0 18 7h-1.3A7 7 0 1 0 4 14.9"/>',
  database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
  "external-link": '<path d="M15 3h6v6"/><path d="m10 14 11-11"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  "file-up": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="m9 15 3-3 3 3"/>',
  files: '<path d="M20 7h-8a2 2 0 0 1-2-2V3"/><path d="M18 22H8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6l6 6v9a2 2 0 0 1-2 2Z"/><path d="M4 16H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8"/>',
  "folder-open": '<path d="m6 14 1.5-2.9A2 2 0 0 1 9.2 10H20a2 2 0 0 1 1.8 2.9l-2.2 5A2 2 0 0 1 17.8 19H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v2"/>',
  github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-6a5.4 5.4 0 0 0-1.5-3.8A5 5 0 0 0 18.4 1S17 1 15 2.5a13.4 13.4 0 0 0-6 0C7 1 5.6 1 5.6 1a5 5 0 0 0-.1 3.7A5.4 5.4 0 0 0 4 8.5c0 4 3 6 6 6-.4.4-.7 1-.8 1.8-1 .5-3.6 1.1-5.2-1.5 0 0-1-1.8-3-1.9 0 0-1.9 0-.1 1.2 0 0 1.3.6 2.2 2.7 0 0 1.1 3.4 6 2.3V22"/>',
  "hard-drive-download": '<path d="M12 2v8"/><path d="m8 6 4 4 4-4"/><path d="M20 16H4l2-6h12z"/><path d="M6 20h12a2 2 0 0 0 2-2v-2H4v2a2 2 0 0 0 2 2Z"/><path d="M8 18h.01"/>',
  "layout-dashboard": '<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>',
  library: '<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>',
  "refresh-cw": '<path d="M21 12a9 9 0 0 0-15-6.7L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"/><path d="M21 21v-5h-5"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  "settings-2": '<path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>',
  "shield-check": '<path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3z"/><path d="m9 12 2 2 4-4"/>',
  tags: '<path d="m15 5 6 6-8 8-6-6 8-8Z"/><path d="M14 6H4v10"/><circle cx="17" cy="9" r="1"/>',
  "trash-2": '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>',
  "upload-cloud": '<path d="M12 13v8"/><path d="m8 17 4-4 4 4"/><path d="M20 16.6A5 5 0 0 0 18 7h-1.3A7 7 0 1 0 4 14.9"/>',
};

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatDocSize(kb) {
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore(mode, callback) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, mode);
    const store = transaction.objectStore(storeName);
    const result = callback(store);
    transaction.oncomplete = () => {
      db.close();
      resolve(result);
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

async function loadUploads() {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
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
  const items = [...files].map((file) => ({
    id: `${Date.now()}-${crypto.randomUUID()}`,
    name: file.name,
    type: file.type || "application/octet-stream",
    size: file.size,
    createdAt: Date.now(),
    blob: file,
  }));

  await withStore("readwrite", (store) => {
    items.forEach((item) => store.put(item));
  });

  state.uploads = await loadUploads();
  renderAll();
  showToast(`已暂存 ${items.length} 个文件`);
}

async function deleteUpload(id) {
  await withStore("readwrite", (store) => store.delete(id));
  state.uploads = await loadUploads();
  renderAll();
  showToast("已从暂存区移除");
}

async function clearUploads() {
  await withStore("readwrite", (store) => store.clear());
  state.uploads = [];
  renderAll();
  showToast("暂存区已清空");
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

function getTags() {
  return [...new Set(docs.flatMap((doc) => doc.tags))];
}

function getTypes() {
  return ["全部", ...new Set(docs.map((doc) => doc.type))];
}

function filteredDocs() {
  const query = state.query.trim().toLowerCase();
  const result = docs.filter((doc) => {
    const haystack = `${doc.title} ${doc.type} ${doc.tags.join(" ")} ${doc.summary} ${doc.owner}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesType = state.type === "全部" || doc.type === state.type;
    return matchesQuery && matchesType;
  });

  return result.sort((a, b) => {
    if (state.sort === "title") return a.title.localeCompare(b.title, "zh-CN");
    if (state.sort === "size") return b.size - a.size;
    return new Date(b.updated) - new Date(a.updated);
  });
}

function renderStats() {
  const uploadBytes = state.uploads.reduce((sum, file) => sum + file.size, 0);
  $("#stat-docs").textContent = docs.length;
  $("#stat-tags").textContent = getTags().length;
  $("#stat-uploads").textContent = state.uploads.length;
  $("#stat-size").textContent = formatSize(uploadBytes);
}

function renderRecent() {
  const recent = [...docs]
    .sort((a, b) => new Date(b.updated) - new Date(a.updated))
    .slice(0, 4);

  $("#recent-list").innerHTML = recent
    .map(
      (doc) => `
        <a class="compact-item" href="#library" data-select-doc="${doc.id}">
          <span>
            <strong>${doc.title}</strong>
            <span>${doc.type} / ${doc.updated}</span>
          </span>
          <span class="type-pill">${doc.tags[0]}</span>
        </a>
      `,
    )
    .join("");
}

function renderTagCloud() {
  const counts = getTags().map((tag) => ({
    tag,
    count: docs.filter((doc) => doc.tags.includes(tag)).length,
  }));

  $("#tag-cloud").innerHTML = counts
    .map((item) => `<button class="tag" data-tag="${item.tag}">${item.tag} · ${item.count}</button>`)
    .join("");
}

function renderTypeFilter() {
  $("#type-filter").innerHTML = getTypes()
    .map(
      (type) => `
        <button class="segment ${state.type === type ? "active" : ""}" data-type="${type}">
          ${type}
        </button>
      `,
    )
    .join("");
}

function renderLibrary() {
  renderTypeFilter();
  const list = filteredDocs();
  const listEl = $("#doc-list");

  if (!list.length) {
    listEl.innerHTML = `<div class="empty">没有匹配的资料</div>`;
    $("#detail-panel").innerHTML = `<div class="empty">选择一个资料</div>`;
    return;
  }

  if (!list.some((doc) => doc.id === state.selectedId)) {
    state.selectedId = list[0].id;
  }

  listEl.innerHTML = list
    .map(
      (doc) => `
        <article class="doc-card ${state.selectedId === doc.id ? "active" : ""}" data-doc-id="${doc.id}">
          <div class="doc-meta">
            <span class="type-pill">${doc.type}</span>
            <span>${doc.updated}</span>
            <span>${formatDocSize(doc.size)}</span>
          </div>
          <strong>${doc.title}</strong>
          <p class="doc-summary">${doc.summary}</p>
          <div class="tag-cloud">
            ${doc.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
        </article>
      `,
    )
    .join("");

  renderDetail();
}

function renderDetail() {
  const doc = docs.find((item) => item.id === state.selectedId) || docs[0];
  $("#detail-panel").innerHTML = `
    <span class="type-pill">${doc.type}</span>
    <h2>${doc.title}</h2>
    <p>${doc.summary}</p>
    <div class="doc-meta">
      <span>更新：${doc.updated}</span>
      <span>大小：${formatDocSize(doc.size)}</span>
      <span>来源：${doc.owner}</span>
    </div>
    <div class="tag-cloud" style="margin-top:16px">
      ${doc.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
    </div>
    <div class="detail-actions">
      <a class="button primary" href="${doc.file}" download>
        <i data-lucide="download"></i>
        <span>下载</span>
      </a>
      <a class="button secondary" href="${doc.file}" target="_blank" rel="noreferrer">
        <i data-lucide="external-link"></i>
        <span>打开</span>
      </a>
    </div>
  `;
  refreshIcons();
}

function renderUploads() {
  $("#upload-count").textContent = `${state.uploads.length} 个文件`;

  if (!state.uploads.length) {
    $("#upload-list").innerHTML = `<div class="empty">暂无暂存文件</div>`;
    return;
  }

  $("#upload-list").innerHTML = state.uploads
    .map(
      (file) => `
        <article class="upload-item">
          <span>
            <strong>${file.name}</strong>
            <small>${formatSize(file.size)} / ${new Date(file.createdAt).toLocaleString("zh-CN")}</small>
          </span>
          <span class="upload-actions">
            <button class="icon-button" data-download-upload="${file.id}" aria-label="下载 ${file.name}">
              <i data-lucide="download"></i>
            </button>
            <button class="icon-button" data-delete-upload="${file.id}" aria-label="删除 ${file.name}">
              <i data-lucide="trash-2"></i>
            </button>
          </span>
        </article>
      `,
    )
    .join("");
}

function renderNavigation() {
  $$("[data-view-link]").forEach((link) => {
    link.classList.toggle("active", link.dataset.viewLink === state.view);
  });
  $$("[data-view]").forEach((view) => {
    view.classList.toggle("active", view.dataset.view === state.view);
  });
}

function renderAll() {
  renderNavigation();
  renderStats();
  renderRecent();
  renderTagCloud();
  renderLibrary();
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

function exportIndex() {
  const payload = {
    exportedAt: new Date().toISOString(),
    docs,
    pendingUploads: state.uploads.map(({ blob, ...rest }) => rest),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "knowledge-index.json";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function setViewFromHash() {
  const next = location.hash.replace("#", "") || "overview";
  state.view = ["overview", "library", "uploads", "settings"].includes(next) ? next : "overview";
  renderAll();
}

function bindEvents() {
  window.addEventListener("hashchange", setViewFromHash);

  $("#search-input").addEventListener("input", (event) => {
    state.query = event.target.value;
    renderLibrary();
    refreshIcons();
  });

  $("#sort-select").addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderLibrary();
    refreshIcons();
  });

  $("#type-filter").addEventListener("click", (event) => {
    const button = event.target.closest("[data-type]");
    if (!button) return;
    state.type = button.dataset.type;
    renderLibrary();
    refreshIcons();
  });

  document.body.addEventListener("click", (event) => {
    const docCard = event.target.closest("[data-doc-id]");
    const recent = event.target.closest("[data-select-doc]");
    const tag = event.target.closest("[data-tag]");
    const downloadButton = event.target.closest("[data-download-upload]");
    const deleteButton = event.target.closest("[data-delete-upload]");

    if (docCard) {
      state.selectedId = docCard.dataset.docId;
      renderLibrary();
      refreshIcons();
    }

    if (recent) {
      state.selectedId = recent.dataset.selectDoc;
      state.view = "library";
      location.hash = "library";
    }

    if (tag) {
      state.query = tag.dataset.tag;
      $("#search-input").value = state.query;
      state.view = "library";
      location.hash = "library";
      renderAll();
    }

    if (downloadButton) {
      downloadUpload(downloadButton.dataset.downloadUpload);
    }

    if (deleteButton) {
      deleteUpload(deleteButton.dataset.deleteUpload);
    }
  });

  $("#export-index").addEventListener("click", exportIndex);
  $("#pick-files").addEventListener("click", () => $("#file-input").click());
  $("#file-input").addEventListener("change", (event) => saveFiles(event.target.files));
  $("#clear-uploads").addEventListener("click", clearUploads);

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
  bindEvents();
  state.uploads = await loadUploads();
  setViewFromHash();
}

init().catch((error) => {
  console.error(error);
  showToast("初始化失败，请检查浏览器存储权限");
});
