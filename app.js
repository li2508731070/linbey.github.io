const docs = [
  {
    id: "qos-lab",
    title: "QOS实验",
    type: "广域网",
    tags: ["H3C", "QOS", "广域网", "PDF"],
    updated: "2026-06-13",
    size: 533,
    file: "./docs/h3c/qos-lab.pdf",
    summary: "H3C 广域网 QOS 实验文档，可在站内预览并下载归档。",
    owner: "H3C实验拓扑 / 广域网",
  },
  {
    id: "ipsec-vpn-lab",
    title: "IP Sec VPN",
    type: "广域网",
    tags: ["H3C", "IPSec", "VPN", "广域网", "PDF"],
    updated: "2026-05-31",
    size: 425,
    file: "./docs/h3c/ipsec-vpn-lab.pdf",
    summary: "H3C 广域网 IP Sec VPN 实验文档，可在站内预览并下载归档。",
    owner: "H3C实验拓扑 / 广域网",
  },
  {
    id: "gre-vpn-lab",
    title: "GRE VPN实验",
    type: "广域网",
    tags: ["H3C", "GRE", "VPN", "广域网", "PDF"],
    updated: "2025-12-16",
    size: 369,
    file: "./docs/h3c/gre-vpn-lab.pdf",
    summary: "H3C 广域网 GRE VPN 实验文档，可在站内预览并下载归档。",
    owner: "H3C实验拓扑 / 广域网",
  },
  {
    id: "ipsec-vpn-main-mode-lab",
    title: "IPsec-VPN main_mode",
    type: "广域网",
    tags: ["H3C", "IPSec", "VPN", "main mode", "PDF"],
    updated: "2025-12-16",
    size: 374,
    file: "./docs/h3c/ipsec-vpn-main-mode-lab.pdf",
    summary: "H3C IPsec-VPN main mode 实验文档，可在站内预览并下载归档。",
    owner: "H3C实验拓扑 / 广域网",
  },
  {
    id: "bfd-lab",
    title: "BFD实验",
    type: "高性能园区网",
    tags: ["H3C", "BFD", "园区网", "PDF"],
    updated: "2025-12-14",
    size: 334,
    file: "./docs/h3c/bfd-lab.pdf",
    summary: "H3C 高性能园区网 BFD 实验文档，可在站内预览并下载归档。",
    owner: "H3C实验拓扑 / 高性能园区网",
  },
  {
    id: "basic-qinq-lab",
    title: "基本QinQ",
    type: "高性能园区网",
    tags: ["H3C", "QinQ", "园区网", "PDF"],
    updated: "2025-11-30",
    size: 464,
    file: "./docs/h3c/basic-qinq-lab.pdf",
    summary: "H3C 高性能园区网基本 QinQ 实验文档，可在站内预览并下载归档。",
    owner: "H3C实验拓扑 / 高性能园区网",
  },
  {
    id: "flexible-qinq-lab",
    title: "灵活QinQ",
    type: "高性能园区网",
    tags: ["H3C", "QinQ", "园区网", "PDF"],
    updated: "2025-11-30",
    size: 471,
    file: "./docs/h3c/flexible-qinq-lab.pdf",
    summary: "H3C 高性能园区网灵活 QinQ 实验文档，可在站内预览并下载归档。",
    owner: "H3C实验拓扑 / 高性能园区网",
  },
  {
    id: "irf-mad-lab",
    title: "IRF与MAD实验",
    type: "高性能园区网",
    tags: ["H3C", "IRF", "MAD", "园区网", "PDF"],
    updated: "2025-11-21",
    size: 418,
    file: "./docs/h3c/irf-mad-lab.pdf",
    summary: "H3C 高性能园区网 IRF 与 MAD 实验文档，可在站内预览并下载归档。",
    owner: "H3C实验拓扑 / 高性能园区网",
  },
  {
    id: "mstp-lab",
    title: "MSTP实验",
    type: "高性能园区网",
    tags: ["H3C", "MSTP", "园区网", "PDF"],
    updated: "2025-11-21",
    size: 439,
    file: "./docs/h3c/mstp-lab.pdf",
    summary: "H3C 高性能园区网 MSTP 实验文档，可在站内预览并下载归档。",
    owner: "H3C实验拓扑 / 高性能园区网",
  },
  {
    id: "vrrp-lab",
    title: "VRRP实验",
    type: "高性能园区网",
    tags: ["H3C", "VRRP", "园区网", "PDF"],
    updated: "2025-11-18",
    size: 472,
    file: "./docs/h3c/vrrp-lab.pdf",
    summary: "H3C 高性能园区网 VRRP 实验文档，可在站内预览并下载归档。",
    owner: "H3C实验拓扑 / 高性能园区网",
  },
  {
    id: "rrpp-lab",
    title: "RRPP实验",
    type: "高性能园区网",
    tags: ["H3C", "RRPP", "园区网", "PDF"],
    updated: "2025-11-17",
    size: 437,
    file: "./docs/h3c/rrpp-lab.pdf",
    summary: "H3C 高性能园区网 RRPP 实验文档，可在站内预览并下载归档。",
    owner: "H3C实验拓扑 / 高性能园区网",
  },
  {
    id: "smart-link-lab",
    title: "Smart-Link实验",
    type: "高性能园区网",
    tags: ["H3C", "Smart-Link", "园区网", "PDF"],
    updated: "2025-11-13",
    size: 497,
    file: "./docs/h3c/smart-link-lab.pdf",
    summary: "H3C 高性能园区网 Smart-Link 实验文档，可在站内预览并下载归档。",
    owner: "H3C实验拓扑 / 高性能园区网",
  },
  {
    id: "vlan-routing-lab",
    title: "VLAN路由实验",
    type: "高性能园区网",
    tags: ["H3C", "VLAN", "路由", "园区网", "PDF"],
    updated: "2025-11-12",
    size: 375,
    file: "./docs/h3c/vlan-routing-lab.pdf",
    summary: "H3C 高性能园区网 VLAN 路由实验文档，可在站内预览并下载归档。",
    owner: "H3C实验拓扑 / 高性能园区网",
  },
  {
    id: "link-aggregation-lab",
    title: "链路聚合实验",
    type: "高性能园区网",
    tags: ["H3C", "链路聚合", "园区网", "PDF"],
    updated: "2025-11-12",
    size: 209,
    file: "./docs/h3c/link-aggregation-lab.pdf",
    summary: "H3C 高性能园区网链路聚合实验文档，可在站内预览并下载归档。",
    owner: "H3C实验拓扑 / 高性能园区网",
  },
  {
    id: "private-vlan-lab",
    title: "私有VLAN实验",
    type: "高性能园区网",
    tags: ["H3C", "私有VLAN", "园区网", "PDF"],
    updated: "2025-11-11",
    size: 357,
    file: "./docs/h3c/private-vlan-lab.pdf",
    summary: "H3C 高性能园区网私有 VLAN 实验文档，可在站内预览并下载归档。",
    owner: "H3C实验拓扑 / 高性能园区网",
  },
  {
    id: "hybrid-lab",
    title: "Hybrid实验",
    type: "高性能园区网",
    tags: ["H3C", "Hybrid", "园区网", "PDF"],
    updated: "2025-11-10",
    size: 358,
    file: "./docs/h3c/hybrid-lab.pdf",
    summary: "H3C 高性能园区网 Hybrid 实验文档，可在站内预览并下载归档。",
    owner: "H3C实验拓扑 / 高性能园区网",
  },
  {
    id: "mvrp-lab",
    title: "MVRP实验",
    type: "高性能园区网",
    tags: ["H3C", "MVRP", "园区网", "PDF"],
    updated: "2025-11-10",
    size: 268,
    file: "./docs/h3c/mvrp-lab.pdf",
    summary: "H3C 高性能园区网 MVRP 实验文档，可在站内预览并下载归档。",
    owner: "H3C实验拓扑 / 高性能园区网",
  },
  {
    id: "h3cne-comprehensive-lab",
    title: "H3CNE综合实验",
    type: "H3CNE实验文档",
    tags: ["H3CNE", "综合实验", "拓扑", "PDF"],
    updated: "2025-11-08",
    size: 1551,
    file: "./docs/h3c/h3cne-comprehensive-lab.pdf",
    summary: "H3CNE 综合实验 PDF，可在站内预览并下载归档。",
    owner: "H3C实验拓扑 / H3CNE实验文档",
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

let motionBound = false;

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
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
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
  if (!files.length) return;

  const items = [...files].map((file) => ({
    id: `${Date.now()}-${crypto.randomUUID?.() || Math.random().toString(36).slice(2)}`,
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
      (doc, index) => `
        <article class="doc-card ${state.selectedId === doc.id ? "active" : ""}" data-doc-id="${doc.id}" style="--card-index: ${index}">
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
  const isPdf = doc.file.toLowerCase().endsWith(".pdf");
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
    ${
      isPdf
        ? `<div class="pdf-preview">
            <iframe src="${doc.file}#view=FitH" title="${doc.title} PDF 预览"></iframe>
          </div>`
        : ""
    }
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

function bindMotion() {
  if (motionBound) return;
  motionBound = true;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches) return;

  const root = document.documentElement;
  const target = {
    x: 0.5,
    y: 0.5,
    px: window.innerWidth / 2,
    py: window.innerHeight / 2,
  };
  const current = { ...target };

  const setMotionVars = () => {
    current.x += (target.x - current.x) * 0.12;
    current.y += (target.y - current.y) * 0.12;
    current.px += (target.px - current.px) * 0.16;
    current.py += (target.py - current.py) * 0.16;

    const dx = current.x - 0.5;
    const dy = current.y - 0.5;
    const motionX = dx * 52;
    const motionY = dy * 42;
    const motionXSmall = dx * 22;
    const motionYSmall = dy * 16;
    const microX = dx * 8;
    const microY = dy * 6;

    root.style.setProperty("--mx", current.x.toFixed(4));
    root.style.setProperty("--my", current.y.toFixed(4));
    root.style.setProperty("--px", `${current.px.toFixed(1)}px`);
    root.style.setProperty("--py", `${current.py.toFixed(1)}px`);
    root.style.setProperty("--rx", `${(window.innerWidth - current.px).toFixed(1)}px`);
    root.style.setProperty("--motion-x", `${motionX.toFixed(1)}px`);
    root.style.setProperty("--motion-y", `${motionY.toFixed(1)}px`);
    root.style.setProperty("--motion-x-neg", `${(-motionX).toFixed(1)}px`);
    root.style.setProperty("--motion-y-neg", `${(-motionY).toFixed(1)}px`);
    root.style.setProperty("--motion-x-sm", `${motionXSmall.toFixed(1)}px`);
    root.style.setProperty("--motion-y-sm", `${motionYSmall.toFixed(1)}px`);
    root.style.setProperty("--motion-x-sm-neg", `${(-motionXSmall).toFixed(1)}px`);
    root.style.setProperty("--motion-y-sm-neg", `${(-motionYSmall).toFixed(1)}px`);
    root.style.setProperty("--micro-x", `${microX.toFixed(1)}px`);
    root.style.setProperty("--micro-y", `${microY.toFixed(1)}px`);
    root.style.setProperty("--tilt-x", `${(dx * 8).toFixed(2)}deg`);
    root.style.setProperty("--tilt-y", `${(dy * 8).toFixed(2)}deg`);
    root.style.setProperty("--scroll", `${window.scrollY}`);
    root.style.setProperty("--scroll-rot", `${(window.scrollY * 0.006).toFixed(2)}deg`);

    requestAnimationFrame(setMotionVars);
  };

  window.addEventListener(
    "pointermove",
    (event) => {
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
    },
    { passive: true },
  );

  window.addEventListener(
    "scroll",
    () => {
      root.style.setProperty("--scroll", `${window.scrollY}`);
      root.style.setProperty("--scroll-rot", `${(window.scrollY * 0.006).toFixed(2)}deg`);
    },
    { passive: true },
  );

  window.addEventListener(
    "resize",
    () => {
      target.px = window.innerWidth * target.x;
      target.py = window.innerHeight * target.y;
    },
    { passive: true },
  );

  requestAnimationFrame(setMotionVars);
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

  $("#clear-search").addEventListener("click", () => {
    state.query = "";
    $("#search-input").value = "";
    renderLibrary();
    refreshIcons();
    showToast("已清空搜索");
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
  $("#file-input").addEventListener("change", async (event) => {
    await saveFiles(event.target.files);
    event.target.value = "";
  });
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
  bindMotion();
  bindEvents();
  state.uploads = await loadUploads();
  setViewFromHash();
}

init().catch((error) => {
  console.error(error);
  showToast("初始化失败，请检查浏览器存储权限");
});
