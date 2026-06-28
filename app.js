let docs = [];

const fallbackDocs = [
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
  selectedId: "",
  uploads: [],
  statuses: {},
  notes: {},
  activity: {},
  paletteQuery: "",
};

let motionBound = false;

const dbName = "personal-knowledge-base";
const storeName = "pending-files";
const statusStorageKey = "personal-knowledge-status";
const notesStorageKey = "personal-knowledge-notes";
const activityStorageKey = "personal-knowledge-activity";

const statusOptions = [
  { id: "unread", label: "未读" },
  { id: "read", label: "已读" },
  { id: "reproduced", label: "已复现" },
  { id: "mastered", label: "已掌握" },
  { id: "review", label: "重点复盘" },
];

const protocolNodes = [
  { id: "vpn", label: "VPN", query: "VPN", terms: ["VPN", "IPSec", "GRE"] },
  { id: "vlan", label: "VLAN", query: "VLAN", terms: ["VLAN", "私有VLAN"] },
  { id: "qinq", label: "QinQ", query: "QinQ", terms: ["QinQ"] },
  { id: "stp", label: "STP", query: "MSTP", terms: ["MSTP"] },
  { id: "ha", label: "HA", query: "VRRP", terms: ["VRRP", "IRF", "MAD", "BFD"] },
  { id: "link", label: "链路", query: "链路聚合", terms: ["链路聚合", "Smart-Link", "RRPP"] },
  { id: "qos", label: "QOS", query: "QOS", terms: ["QOS"] },
  { id: "h3cne", label: "H3CNE", query: "H3CNE", terms: ["H3CNE", "综合实验"] },
];

const learningPath = [
  { title: "VLAN 边界", query: "VLAN", docs: ["vlan-routing-lab", "private-vlan-lab"] },
  { title: "链路冗余", query: "链路聚合", docs: ["link-aggregation-lab", "smart-link-lab", "rrpp-lab"] },
  { title: "二层收敛", query: "MSTP", docs: ["mstp-lab", "mvrp-lab"] },
  { title: "高可用", query: "VRRP", docs: ["vrrp-lab", "irf-mad-lab", "bfd-lab"] },
  { title: "运营商封装", query: "QinQ", docs: ["basic-qinq-lab", "flexible-qinq-lab"] },
  { title: "广域隧道", query: "VPN", docs: ["gre-vpn-lab", "ipsec-vpn-lab", "ipsec-vpn-main-mode-lab"] },
  { title: "流量治理", query: "QOS", docs: ["qos-lab"] },
  { title: "综合验收", query: "H3CNE", docs: ["h3cne-comprehensive-lab"] },
];

const commandIndex = [
  { command: "display ip routing-table", protocol: "路由", query: "VLAN路由", doc: "vlan-routing-lab" },
  { command: "display ospf peer", protocol: "OSPF", query: "OSPF", doc: "h3cne-comprehensive-lab" },
  { command: "display vlan", protocol: "VLAN", query: "VLAN", doc: "vlan-routing-lab" },
  { command: "display link-aggregation verbose", protocol: "链路聚合", query: "链路聚合", doc: "link-aggregation-lab" },
  { command: "display stp brief", protocol: "MSTP", query: "MSTP", doc: "mstp-lab" },
  { command: "display vrrp", protocol: "VRRP", query: "VRRP", doc: "vrrp-lab" },
  { command: "display ike sa", protocol: "IPSec", query: "IPSec", doc: "ipsec-vpn-lab" },
  { command: "display qos policy", protocol: "QOS", query: "QOS", doc: "qos-lab" },
];

const drillPrompts = [
  { query: "VPN", title: "复盘 VPN 建立失败", prompt: "写下 IKE SA、ACL 感兴趣流、路由回程三个排查点。" },
  { query: "MSTP", title: "复盘二层环路收敛", prompt: "说明根桥、端口角色和阻塞端口如何验证。" },
  { query: "VRRP", title: "复盘网关高可用", prompt: "记录主备切换条件、优先级和上联故障联动。" },
  { query: "QOS", title: "复盘流量治理", prompt: "列出分类、行为、策略应用方向和验证命令。" },
  { query: "QinQ", title: "复盘 QinQ 封装", prompt: "区分基本 QinQ 与灵活 QinQ 的标签处理逻辑。" },
];

const faultScenarios = [
  {
    title: "IPSec VPN 隧道不起来",
    symptom: "两端公网可达，但业务网段互访失败，IKE SA 没有建立。",
    choices: [
      { label: "先看 display ike sa", good: true },
      { label: "直接重启设备", good: false },
      { label: "只检查终端网关", good: false },
    ],
    answer: "优先确认 IKE SA 和提议匹配，再查 ACL 感兴趣流、路由回程和安全策略。",
    query: "IPSec",
  },
  {
    title: "VRRP 主备频繁切换",
    symptom: "业务偶发中断，网关 MAC 变化，主备状态来回漂移。",
    choices: [
      { label: "检查 track/BFD 和优先级", good: true },
      { label: "只改终端 DNS", good: false },
      { label: "关闭全部备份链路", good: false },
    ],
    answer: "先看 VRRP 状态、优先级抢占、track/BFD 联动，再看上联链路稳定性。",
    query: "VRRP",
  },
  {
    title: "MSTP 环路导致广播风暴",
    symptom: "核心 CPU 升高，MAC 表震荡，部分 VLAN 丢包。",
    choices: [
      { label: "确认根桥和端口角色", good: true },
      { label: "随机拔线", good: false },
      { label: "只清 ARP", good: false },
    ],
    answer: "定位根桥、区域配置、端口角色和边缘端口，结合 display stp brief 验证。",
    query: "MSTP",
  },
];

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

async function loadDocuments() {
  try {
    const response = await fetch("./docs/documents.json?v=20260628-persona", { cache: "no-cache" });
    if (!response.ok) throw new Error(`documents.json ${response.status}`);
    const items = await response.json();
    return Array.isArray(items) ? items : fallbackDocs;
  } catch (error) {
    console.warn(error);
    showToast("资料索引读取失败，已使用本地备份");
    return fallbackDocs;
  }
}

function readLocalMap(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "{}");
    return value && typeof value === "object" ? value : {};
  } catch {
    return {};
  }
}

function saveLocalMap(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getStatus(id) {
  return state.statuses[id] || "unread";
}

function getStatusLabel(id) {
  return statusOptions.find((item) => item.id === id)?.label || statusOptions[0].label;
}

function findDoc(id) {
  return docs.find((doc) => doc.id === id);
}

function runQuery(query, selectedId = "") {
  state.query = query;
  state.type = "全部";
  if (selectedId) state.selectedId = selectedId;
  $("#search-input").value = state.query;
  state.view = "library";
  location.hash = "library";
  recordActivity("query");
  renderAll();
}

function setStatus(id, status) {
  state.statuses[id] = status;
  saveLocalMap(statusStorageKey, state.statuses);
  recordActivity("status");
}

function getNote(id) {
  return state.notes[id] || "";
}

function setNote(id, note) {
  state.notes[id] = note;
  saveLocalMap(notesStorageKey, state.notes);
  recordActivity("note");
}

function recordActivity(kind) {
  const date = new Date().toISOString().slice(0, 10);
  const item = state.activity[date] || { count: 0, query: 0, status: 0, note: 0, open: 0 };
  item.count += 1;
  item[kind] = (item[kind] || 0) + 1;
  state.activity[date] = item;
  saveLocalMap(activityStorageKey, state.activity);
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

function docHaystack(doc) {
  return `${doc.title} ${doc.type} ${doc.tags.join(" ")} ${doc.summary} ${doc.owner}`.toLowerCase();
}

function getRelatedCommands(doc) {
  const haystack = docHaystack(doc);
  return commandIndex
    .filter((command) => {
      const protocol = command.protocol.toLowerCase();
      const query = command.query.toLowerCase();
      return doc.id === command.doc || haystack.includes(protocol) || haystack.includes(query);
    })
    .slice(0, 3);
}

function setProtocolTheme() {
  const activeDoc = findDoc(state.selectedId);
  const haystack = `${state.query} ${activeDoc ? docHaystack(activeDoc) : ""}`.toLowerCase();
  const matched = protocolNodes.find((node) =>
    node.terms.some((term) => haystack.includes(term.toLowerCase())),
  );
  document.body.dataset.protocolTheme = matched?.id || "core";
}

function updateClock() {
  const clock = $("#os-clock");
  if (!clock) return;
  clock.textContent = new Date().toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getPaletteItems() {
  return [
    ...docs.map((doc) => ({
      kind: "PDF",
      title: doc.title,
      meta: doc.type,
      query: doc.title,
      doc: doc.id,
    })),
    ...commandIndex.map((command) => ({
      kind: "CMD",
      title: command.command,
      meta: command.protocol,
      query: command.query,
      doc: command.doc,
    })),
    ...protocolNodes.map((node) => ({
      kind: "PROTO",
      title: node.label,
      meta: "protocol-node",
      query: node.query,
    })),
    ...learningPath.map((step) => ({
      kind: "ROUTE",
      title: step.title,
      meta: "learning-route",
      query: step.query,
    })),
  ];
}

function filteredDocs() {
  const query = state.query.trim().toLowerCase();
  const result = docs.filter((doc) => {
    const haystack = docHaystack(doc);
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
  const mastered = docs.filter((doc) => getStatus(doc.id) === "mastered").length;
  $("#stat-docs").textContent = docs.length;
  $("#stat-tags").textContent = getTags().length;
  $("#stat-uploads").textContent = state.uploads.length;
  $("#stat-progress").textContent = `${mastered}/${docs.length}`;
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
            <span>${doc.type} / ${getStatusLabel(getStatus(doc.id))}</span>
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

function getProtocolStats() {
  return protocolNodes
    .map((node) => {
      const count = docs.filter((doc) => {
        const haystack = docHaystack(doc);
        return node.terms.some((term) => haystack.includes(term.toLowerCase()));
      }).length;
      return { ...node, count };
    })
    .filter((node) => node.count > 0);
}

function renderTopology() {
  const map = $("#topology-map");
  const detail = $("#topology-detail");
  if (!map || !detail) return;

  const nodes = getProtocolStats();
  const points = nodes.map((node, index) => {
    const angle = -90 + (360 / nodes.length) * index;
    const radians = (angle * Math.PI) / 180;
    return {
      ...node,
      x: 50 + Math.cos(radians) * 34,
      y: 50 + Math.sin(radians) * 34,
      angle,
    };
  });

  map.innerHTML = `
    <svg class="topology-lines" viewBox="0 0 100 100" aria-hidden="true">
      ${points
        .map((point) => `<line x1="50" y1="50" x2="${point.x.toFixed(2)}" y2="${point.y.toFixed(2)}"></line>`)
        .join("")}
    </svg>
    <button class="topology-core" data-protocol="H3C" type="button">
      <strong>${docs.length}</strong>
      <span>H3C LAB</span>
    </button>
    ${points
      .map(
        (point, index) => `
          <button
            class="topology-node"
            data-protocol="${point.query}"
            type="button"
            style="--x: ${point.x.toFixed(2)}%; --y: ${point.y.toFixed(2)}%; --delay: ${index * 130}ms"
          >
            <strong>${point.label}</strong>
            <span>${point.count}</span>
          </button>
        `,
      )
      .join("")}
  `;

  detail.innerHTML = points
    .map(
      (point) => `
        <button class="protocol-chip" data-protocol="${point.query}" type="button">
          <span>${point.label}</span>
          <strong>${point.count}</strong>
        </button>
      `,
    )
    .join("");
}

function renderRouteMap() {
  const routeMap = $("#route-map");
  if (!routeMap) return;

  routeMap.innerHTML = learningPath
    .map((step, index) => {
      const total = step.docs.length;
      const done = step.docs.filter((id) => ["reproduced", "mastered"].includes(getStatus(id))).length;
      return `
        <button class="route-step" data-route-query="${step.query}" type="button" style="--step-index: ${index}">
          <span class="route-index">${String(index + 1).padStart(2, "0")}</span>
          <strong>${step.title}</strong>
          <small>${done}/${total} 掌握</small>
        </button>
      `;
    })
    .join("");
}

function renderCommandConsole() {
  const consoleEl = $("#command-console");
  if (!consoleEl) return;

  consoleEl.innerHTML = `
    <div class="terminal-head">
      <span></span><span></span><span></span>
      <strong>lab-cli</strong>
    </div>
    ${commandIndex
      .map(
        (item) => `
          <button class="command-line" data-command-query="${item.query}" data-command-doc="${item.doc}" type="button">
            <code>${item.command}</code>
            <span>${item.protocol}</span>
          </button>
        `,
      )
      .join("")}
  `;
}

function getTodayDrill() {
  const day = Math.floor(Date.now() / 86400000);
  return drillPrompts[day % drillPrompts.length];
}

function renderDailyDrill() {
  const drillEl = $("#daily-drill");
  if (!drillEl) return;

  const drill = getTodayDrill();
  const matches = docs.filter((doc) => docHaystack(doc).includes(drill.query.toLowerCase()));
  const target = matches[0] || docs[0];

  drillEl.innerHTML = `
    <span class="type-pill">${drill.query}</span>
    <h3>${drill.title}</h3>
    <p>${drill.prompt}</p>
    <div class="drill-actions">
      <button class="button primary" data-drill-open="${drill.query}" data-drill-doc="${target?.id || ""}" type="button">
        <i data-lucide="search"></i>
        <span>进入训练</span>
      </button>
      <button class="button secondary" data-drill-complete="${target?.id || ""}" type="button">
        <i data-lucide="shield-check"></i>
        <span>标记复盘</span>
      </button>
    </div>
  `;
}

function renderFaultSim() {
  const faultEl = $("#fault-sim");
  if (!faultEl) return;

  const scenario = faultScenarios[new Date().getDate() % faultScenarios.length];
  faultEl.innerHTML = `
    <span class="type-pill">${scenario.query}</span>
    <h3>${scenario.title}</h3>
    <p>${scenario.symptom}</p>
    <div class="fault-choices">
      ${scenario.choices
        .map(
          (choice, index) => `
            <button data-fault-choice="${index}" data-fault-good="${choice.good}" data-fault-query="${scenario.query}" data-fault-answer="${scenario.answer}" type="button">
              ${choice.label}
            </button>
          `,
        )
        .join("")}
    </div>
    <div class="fault-answer" id="fault-answer"></div>
  `;
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
        <article class="doc-card status-${getStatus(doc.id)} ${state.selectedId === doc.id ? "active" : ""}" data-doc-id="${doc.id}" style="--card-index: ${index}">
          <div class="doc-meta">
            <span class="type-pill">${doc.type}</span>
            <span class="status-pill">${getStatusLabel(getStatus(doc.id))}</span>
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
  if (!doc) {
    $("#detail-panel").innerHTML = `<div class="empty">正在读取资料索引</div>`;
    return;
  }

  const isPdf = doc.file.toLowerCase().endsWith(".pdf");
  const status = getStatus(doc.id);
  const note = getNote(doc.id);
  const relatedCommands = getRelatedCommands(doc);
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
    <div class="status-control" aria-label="学习状态">
      ${statusOptions
        .map(
          (item) => `
            <button class="${status === item.id ? "active" : ""}" data-status="${item.id}" data-status-doc="${doc.id}" type="button">
              ${item.label}
            </button>
          `,
        )
        .join("")}
    </div>
    ${
      isPdf
        ? `<div class="pdf-preview">
            <iframe src="${doc.file}#view=FitH" title="${doc.title} PDF 预览"></iframe>
          </div>
          <div class="mobile-pdf-actions">
            <a class="button primary" href="${doc.file}" target="_blank" rel="noreferrer">
              <i data-lucide="external-link"></i>
              <span>手机打开</span>
            </a>
            <a class="button secondary" href="${doc.file}" download>
              <i data-lucide="download"></i>
              <span>保存PDF</span>
            </a>
          </div>`
        : ""
    }
    ${
      relatedCommands.length
        ? `<div class="related-commands">
            <span>Related CLI</span>
            ${relatedCommands
              .map(
                (command) => `
                  <button class="related-command" data-command-query="${command.query}" data-command-doc="${command.doc}" type="button">
                    <strong>${command.command}</strong>
                    <small>${command.protocol}</small>
                  </button>
                `,
              )
              .join("")}
          </div>`
        : ""
    }
    <label class="note-pad">
      <span>个人笔记</span>
      <textarea data-note="${doc.id}" rows="5" placeholder="关键命令、踩坑点、复盘结论">${note}</textarea>
    </label>
    <div class="detail-actions">
      <a class="button primary" href="${doc.file}" download>
        <i data-lucide="download"></i>
        <span>下载</span>
      </a>
      <a class="button secondary" href="${doc.file}" target="_blank" rel="noreferrer">
        <i data-lucide="external-link"></i>
        <span>新标签打开</span>
      </a>
    </div>
  `;
  refreshIcons();
}

function renderActivityBoard() {
  const board = $("#activity-board");
  if (!board) return;

  const days = Array.from({ length: 35 }, (_, index) => {
    const day = new Date();
    day.setDate(day.getDate() - 34 + index);
    const key = day.toISOString().slice(0, 10);
    const count = state.activity[key]?.count || 0;
    return { key, count, level: Math.min(4, count) };
  });
  const today = new Date().toISOString().slice(0, 10);
  const todayStats = state.activity[today] || {};
  const noteCount = Object.values(state.notes).filter(Boolean).length;
  const reviewCount = docs.filter((doc) => getStatus(doc.id) === "review").length;

  board.innerHTML = `
    <div class="trace-grid" aria-label="最近 35 天实验轨迹">
      ${days
        .map(
          (day) => `
            <span class="trace-cell level-${day.level}" title="${day.key} / ${day.count}"></span>
          `,
        )
        .join("")}
    </div>
    <div class="trace-badges">
      <span><strong>${todayStats.count || 0}</strong><small>today ops</small></span>
      <span><strong>${noteCount}</strong><small>lab notes</small></span>
      <span><strong>${reviewCount}</strong><small>review queue</small></span>
    </div>
  `;
}

function renderPaletteResults() {
  const results = $("#palette-results");
  if (!results) return;
  const query = state.paletteQuery.trim().toLowerCase();
  const items = getPaletteItems()
    .filter((item) => {
      const haystack = `${item.kind} ${item.title} ${item.meta} ${item.query}`.toLowerCase();
      return !query || haystack.includes(query);
    })
    .slice(0, 8);

  results.innerHTML = items.length
    ? items
        .map(
          (item) => `
            <button class="palette-item" data-palette-query="${item.query}" data-palette-doc="${item.doc || ""}" type="button">
              <span>${item.kind}</span>
              <strong>${item.title}</strong>
              <small>${item.meta}</small>
            </button>
          `,
        )
        .join("")
    : `<div class="empty">No command matched</div>`;
}

function openPalette(seed = "") {
  const palette = $("#command-palette");
  const input = $("#palette-input");
  if (!palette || !input) return;
  state.paletteQuery = seed;
  input.value = seed;
  palette.classList.add("open");
  palette.setAttribute("aria-hidden", "false");
  renderPaletteResults();
  window.setTimeout(() => input.focus(), 40);
}

function closePalette() {
  const palette = $("#command-palette");
  if (!palette) return;
  palette.classList.remove("open");
  palette.setAttribute("aria-hidden", "true");
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
  document.body.dataset.view = state.view;
  document.body.classList.toggle("reading-mode", state.view === "library");
  setProtocolTheme();
}

function renderAll() {
  renderNavigation();
  renderStats();
  renderRecent();
  renderTagCloud();
  renderTopology();
  renderRouteMap();
  renderCommandConsole();
  renderDailyDrill();
  renderFaultSim();
  renderActivityBoard();
  renderLibrary();
  renderUploads();
  renderPaletteResults();
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

function bindCyberCanvas() {
  const canvas = $("#cyber-canvas");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const context = canvas.getContext("2d");
  const pointer = { x: 0.5, y: 0.5 };
  let width = 0;
  let height = 0;
  let particles = [];

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.max(42, Math.min(92, Math.floor((width * height) / 17000)));
    particles = Array.from({ length: count }, (_, index) => ({
      x: (index * 97) % width,
      y: (index * 53) % height,
      vx: ((index % 7) - 3) * 0.05,
      vy: (((index + 3) % 9) - 4) * 0.035,
      pulse: Math.random() * Math.PI * 2,
    }));
  };

  const draw = (time) => {
    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = "source-over";
    context.fillStyle = "rgba(8, 12, 11, 0.2)";
    context.fillRect(0, 0, width, height);

    const intensity = document.body.classList.contains("reading-mode") ? 0.35 : 1;
    const px = pointer.x * width;
    const py = pointer.y * height;

    particles.forEach((point, index) => {
      point.x += point.vx + (px - width / 2) * 0.00002;
      point.y += point.vy + (py - height / 2) * 0.000015;

      if (point.x < -30) point.x = width + 30;
      if (point.x > width + 30) point.x = -30;
      if (point.y < -30) point.y = height + 30;
      if (point.y > height + 30) point.y = -30;

      for (let j = index + 1; j < particles.length; j += 1) {
        const other = particles[j];
        const dx = point.x - other.x;
        const dy = point.y - other.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 145) {
          const alpha = (1 - distance / 145) * 0.16 * intensity;
          context.strokeStyle = `rgba(73, 198, 177, ${alpha})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }

      const glow = 0.35 + Math.sin(time * 0.002 + point.pulse) * 0.22;
      context.fillStyle = `rgba(233, 220, 193, ${glow * 0.42 * intensity})`;
      context.beginPath();
      context.arc(point.x, point.y, index % 5 === 0 ? 2.1 : 1.35, 0, Math.PI * 2);
      context.fill();
    });

    const scanY = ((time * 0.045) % (height + 240)) - 120;
    const gradient = context.createLinearGradient(0, scanY - 80, width, scanY + 80);
    gradient.addColorStop(0, "rgba(73, 198, 177, 0)");
    gradient.addColorStop(0.5, `rgba(73, 198, 177, ${0.13 * intensity})`);
    gradient.addColorStop(1, "rgba(215, 171, 95, 0)");
    context.fillStyle = gradient;
    context.fillRect(0, scanY - 55, width, 110);

    const radial = context.createRadialGradient(px, py, 0, px, py, Math.max(width, height) * 0.48);
    radial.addColorStop(0, `rgba(73, 198, 177, ${0.16 * intensity})`);
    radial.addColorStop(1, "rgba(73, 198, 177, 0)");
    context.fillStyle = radial;
    context.fillRect(0, 0, width, height);

    requestAnimationFrame(draw);
  };

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = Math.min(1, Math.max(0, event.clientX / window.innerWidth));
      pointer.y = Math.min(1, Math.max(0, event.clientY / window.innerHeight));
    },
    { passive: true },
  );

  resize();
  requestAnimationFrame(draw);
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
    const protocol = event.target.closest("[data-protocol]");
    const route = event.target.closest("[data-route-query]");
    const command = event.target.closest("[data-command-query]");
    const drillOpen = event.target.closest("[data-drill-open]");
    const drillComplete = event.target.closest("[data-drill-complete]");
    const faultChoice = event.target.closest("[data-fault-choice]");
    const statusButton = event.target.closest("[data-status][data-status-doc]");
    const downloadButton = event.target.closest("[data-download-upload]");
    const deleteButton = event.target.closest("[data-delete-upload]");
    const paletteItem = event.target.closest("[data-palette-query]");

    if (docCard) {
      state.selectedId = docCard.dataset.docId;
      recordActivity("open");
      renderLibrary();
      refreshIcons();
    }

    if (recent) {
      state.selectedId = recent.dataset.selectDoc;
      state.view = "library";
      location.hash = "library";
      recordActivity("open");
    }

    if (tag) {
      runQuery(tag.dataset.tag);
    }

    if (protocol) {
      runQuery(protocol.dataset.protocol);
    }

    if (route) {
      runQuery(route.dataset.routeQuery);
    }

    if (command) {
      runQuery(command.dataset.commandQuery, command.dataset.commandDoc);
    }

    if (drillOpen) {
      runQuery(drillOpen.dataset.drillOpen, drillOpen.dataset.drillDoc);
    }

    if (drillComplete) {
      const targetId = drillComplete.dataset.drillComplete;
      if (targetId) {
        setStatus(targetId, "review");
        renderAll();
        showToast("今日训练已标记为重点复盘");
      }
    }

    if (faultChoice) {
      const answer = $("#fault-answer");
      const good = faultChoice.dataset.faultGood === "true";
      answer.innerHTML = `
        <strong>${good ? "排查方向正确" : "这个动作太粗了"}</strong>
        <span>${faultChoice.dataset.faultAnswer}</span>
        <button class="button secondary" data-protocol="${faultChoice.dataset.faultQuery}" type="button">
          <i data-lucide="search"></i>
          <span>查看相关实验</span>
        </button>
      `;
      refreshIcons();
    }

    if (statusButton) {
      setStatus(statusButton.dataset.statusDoc, statusButton.dataset.status);
      renderAll();
      showToast(`状态已更新为 ${getStatusLabel(statusButton.dataset.status)}`);
    }

    if (downloadButton) {
      downloadUpload(downloadButton.dataset.downloadUpload);
    }

    if (deleteButton) {
      deleteUpload(deleteButton.dataset.deleteUpload);
    }

    if (paletteItem) {
      runQuery(paletteItem.dataset.paletteQuery, paletteItem.dataset.paletteDoc);
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
  document.body.addEventListener("input", (event) => {
    const note = event.target.closest("[data-note]");
    if (!note) return;
    setNote(note.dataset.note, note.value);
    renderActivityBoard();
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
  docs = await loadDocuments();
  state.selectedId = docs[0]?.id || "";
  state.statuses = readLocalMap(statusStorageKey);
  state.notes = readLocalMap(notesStorageKey);
  state.activity = readLocalMap(activityStorageKey);
  updateClock();
  window.setInterval(updateClock, 30000);
  bindEvents();
  state.uploads = await loadUploads();
  setViewFromHash();
}

init().catch((error) => {
  console.error(error);
  showToast("初始化失败，请检查浏览器存储权限");
});
