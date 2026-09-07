import { APP_CONFIG } from "./firebase-config.js";

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const seed = {
  bodies: [
    { id: "organic", internalName: "Organic", code: "ORG", displayName: { ja: "オーガニックコットンTシャツ", en: "Organic Cotton T Shirt", zhTW: "有機棉 T恤" } },
    { id: "vintage", internalName: "Vintage", code: "VNT", displayName: { ja: "ヴィンテージ加工Tシャツ", en: "Vintage Washed T Shirt", zhTW: "復古水洗 T恤" } },
    { id: "mij", internalName: "MIJ", code: "MIJ", displayName: { ja: "日本製Tシャツ", en: "Made in Japan T Shirt", zhTW: "日本製 T恤" } }
  ],
  designs: [
    { id: "whale", internalName: "WHALE", code: "WHALE", displayName: { ja: "クジラ", en: "Whale", zhTW: "鯨魚" } },
    { id: "octopus", internalName: "OCTOPUS", code: "OCT", displayName: { ja: "タコ", en: "Octopus", zhTW: "章魚" } }
  ],
  colors: [
    { id: "green01", internalName: "Green", code: "GR", displayName: { ja: "シーグリーン", en: "Sea Green", zhTW: "海洋綠" } },
    { id: "pink01", internalName: "Pink", code: "PK", displayName: { ja: "コーラルピンク", en: "Coral Pink", zhTW: "珊瑚粉紅" } },
    { id: "white01", internalName: "White", code: "WH", displayName: { ja: "ホワイト", en: "White", zhTW: "白色" } }
  ],
  pinkoiProducts: [],
  inventory: [
    { id: "demo1", bodyId: "organic", designId: "whale", colorId: "green01", size: "M", sku: "TS-ORG-WHALE-GR-M", stock: 5, pinkoiStock: 3, priceTwd: 1200, pinkoiProductId: "" },
    { id: "demo2", bodyId: "organic", designId: "whale", colorId: "green01", size: "L", sku: "TS-ORG-WHALE-GR-L", stock: 2, pinkoiStock: 2, priceTwd: 1200, pinkoiProductId: "" },
    { id: "demo3", bodyId: "vintage", designId: "octopus", colorId: "pink01", size: "M", sku: "TS-VNT-OCT-PK-M", stock: 0, pinkoiStock: 1, priceTwd: 1300, pinkoiProductId: "" }
  ]
};


const ICELOLLY_DEFAULTS = {
  bodies: [
    { internalName: "Organic", code: "ORG", displayName: { ja: "オーガニックコットンTシャツ", en: "Organic Cotton T Shirt", zhTW: "有機棉 T恤" } },
    { internalName: "Vintage", code: "VNT", displayName: { ja: "ヴィンテージ加工Tシャツ", en: "Vintage Washed T Shirt", zhTW: "復古水洗 T恤" } },
    { internalName: "MIJ", code: "MIJ", displayName: { ja: "日本製Tシャツ", en: "Made in Japan T Shirt", zhTW: "日本製 T恤" } }
  ],

  designs: [
    "Bigwave",
    "SALTY",
    "Squids Night",
    "Cherry",
    "Orca Banana",
    "MONSTER BUILDING",
    "Share the Pavement",
    "Good Vibes",
    "Space Odyssey RAY",
    "Coral",
    "Safe Surf",
    "Woo Hoo",
    "Sink",
    "VACAY",
    "DEEP",
    "Gulls and Lemons",
    "Encounters",
    "This is SUMMER",
    "See You in Water",
    "Whole Ocean Dive Club",
    "KYOTO",
    "This is JAPAN"
  ].map(name => {
    const codeMap = {
      "Bigwave": "BIGWAVE",
      "SALTY": "SALTY",
      "Squids Night": "SQUIDS_NIGHT",
      "Cherry": "CHERRY",
      "Orca Banana": "ORCA_BANANA",
      "MONSTER BUILDING": "MONSTER_BUILDING",
      "Share the Pavement": "SHARE_PAVEMENT",
      "Good Vibes": "GOOD_VIBES",
      "Space Odyssey RAY": "SPACE_RAY",
      "Coral": "CORAL",
      "Safe Surf": "SAFE_SURF",
      "Woo Hoo": "WOO_HOO",
      "Sink": "SINK",
      "VACAY": "VACAY",
      "DEEP": "DEEP",
      "Gulls and Lemons": "GULLS_LEMONS",
      "Encounters": "ENCOUNTERS",
      "This is SUMMER": "THIS_SUMMER",
      "See You in Water": "SEE_YOU_WATER",
      "Whole Ocean Dive Club": "WODC",
      "KYOTO": "KYOTO",
      "This is JAPAN": "THIS_JAPAN"
    };
    return {
      internalName: name,
      code: codeMap[name],
      displayName: { ja: name, en: name, zhTW: name }
    };
  }),

  colors: [
    { internalName: "Natural", code: "NAT", displayName: { ja: "Natural", en: "Natural", zhTW: "Natural" }, allowedBodyNames: ["Organic"] },
    { internalName: "Black", code: "BLK", displayName: { ja: "Black", en: "Black", zhTW: "Black" }, allowedBodyNames: ["Organic"] },
    { internalName: "Green", code: "GRN", displayName: { ja: "Green", en: "Green", zhTW: "Green" }, allowedBodyNames: ["Organic"] },
    { internalName: "Light Purple", code: "LPR", displayName: { ja: "Light Purple", en: "Light Purple", zhTW: "Light Purple" }, allowedBodyNames: ["Organic"] },
    { internalName: "Pink", code: "PNK", displayName: { ja: "Pink", en: "Pink", zhTW: "Pink" }, allowedBodyNames: ["Organic"] },
    { internalName: "Beige Grey", code: "BGR", displayName: { ja: "Beige Grey", en: "Beige Grey", zhTW: "Beige Grey" }, allowedBodyNames: ["Organic"] },

    { internalName: "Vintage Black", code: "VBLK", displayName: { ja: "Vintage Black", en: "Vintage Black", zhTW: "Vintage Black" }, allowedBodyNames: ["Vintage"] },
    { internalName: "Vintage Navy", code: "VNVY", displayName: { ja: "Vintage Navy", en: "Vintage Navy", zhTW: "Vintage Navy" }, allowedBodyNames: ["Vintage"] },
    { internalName: "Vintage Light Grey", code: "VLGR", displayName: { ja: "Vintage Light Grey", en: "Vintage Light Grey", zhTW: "Vintage Light Grey" }, allowedBodyNames: ["Vintage"] },
    { internalName: "Vintage Purple", code: "VPUR", displayName: { ja: "Vintage Purple", en: "Vintage Purple", zhTW: "Vintage Purple" }, allowedBodyNames: ["Vintage"] },

    { internalName: "Black JP", code: "JP_BLK", displayName: { ja: "Black", en: "Black", zhTW: "Black" }, allowedBodyNames: ["MIJ"] },
    { internalName: "White JP", code: "JP_WHT", displayName: { ja: "White", en: "White", zhTW: "White" }, allowedBodyNames: ["MIJ"] },
    { internalName: "Grey JP", code: "JP_GRY", displayName: { ja: "Grey", en: "Grey", zhTW: "Grey" }, allowedBodyNames: ["MIJ"] }
  ]
};

const BODY_COLOR_RULES = {
  Organic: ["Natural", "Black", "Green", "Light Purple", "Pink", "Beige Grey"],
  Vintage: ["Vintage Black", "Vintage Navy", "Vintage Light Grey", "Vintage Purple"],
  MIJ: ["Black JP", "White JP", "Grey JP"]
};

let state = {
  bodies: [],
  designs: [],
  colors: [],
  inventory: [],
  pinkoiProducts: [],
  user: null,
  firebaseReady: false
};

let firebaseApi = null;
let unsubscribers = [];

// Firestore上ではPinkoi専用コレクションを使います。
// 既存のTシャツ在庫と同じFirebaseプロジェクトを使ってもデータは混ざりません。
const FIRESTORE_COLLECTIONS = {
  bodies: "pinkoi_bodies",
  designs: "pinkoi_designs",
  colors: "pinkoi_colors",
  inventory: "pinkoi_inventory",
  pinkoiProducts: "pinkoi_products"
};

function clone(v) { return JSON.parse(JSON.stringify(v)); }
function byId(list, id) { return list.find(x => x.id === id); }
function slug() { return crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function esc(v="") {
  return String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}

function showToast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.remove("hidden");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => el.classList.add("hidden"), 1800);
}

function localLoad() {
  const stored = localStorage.getItem("icelolly-pinkoi-inventory");
  if (stored) {
    try { return JSON.parse(stored); } catch {}
  }
  localStorage.setItem("icelolly-pinkoi-inventory", JSON.stringify(seed));
  return clone(seed);
}

function localSave() {
  localStorage.setItem("icelolly-pinkoi-inventory", JSON.stringify({
    bodies: state.bodies,
    designs: state.designs,
    colors: state.colors,
    inventory: state.inventory,
    pinkoiProducts: state.pinkoiProducts
  }));
}

async function initFirebase() {
  if (APP_CONFIG.demoMode) {
    const data = localLoad();
    Object.assign(state, data);
    $("#modeBadge").textContent = "DEMO";
    $("#loginBtn").classList.add("hidden");
    render();
    return;
  }

  const [
    appMod, authMod, fsMod
  ] = await Promise.all([
    import("https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js"),
    import("https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js"),
    import("https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js")
  ]);

  const app = appMod.initializeApp(APP_CONFIG.firebase);
  const auth = authMod.getAuth(app);
  const db = fsMod.getFirestore(app);
  firebaseApi = { ...authMod, ...fsMod, auth, db };
  state.firebaseReady = true;
  $("#modeBadge").textContent = "FIRESTORE";

  authMod.onAuthStateChanged(auth, user => {
    state.user = user || null;
    $("#userLabel").textContent = user?.email || "";
    $("#loginBtn").classList.toggle("hidden", !!user);
    $("#logoutBtn").classList.toggle("hidden", !user);

    unsubscribers.forEach(fn => fn());
    unsubscribers = [];

    if (user) startRealtime();
    else {
      state.bodies = [];
      state.designs = [];
      state.colors = [];
      state.inventory = [];
      state.pinkoiProducts = [];
      render();
    }
  });
}

async function login() {
  const p = new firebaseApi.GoogleAuthProvider();
  await firebaseApi.signInWithPopup(firebaseApi.auth, p);
}
async function logout() { await firebaseApi.signOut(firebaseApi.auth); }

function startRealtime() {
  const watch = (name) => {
    const q = firebaseApi.collection(firebaseApi.db, FIRESTORE_COLLECTIONS[name]);
    const unsub = firebaseApi.onSnapshot(q, snap => {
      state[name] = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      render();
    }, err => {
      console.error(err);
      showToast("Firestoreの読み込みに失敗しました");
    });
    unsubscribers.push(unsub);
  };
  ["bodies","designs","colors","inventory","pinkoiProducts"].forEach(watch);
}

async function saveCollectionItem(collectionName, item) {
  if (APP_CONFIG.demoMode) {
    const list = state[collectionName];
    const ix = list.findIndex(x => x.id === item.id);
    if (ix >= 0) list[ix] = item;
    else list.push(item);
    localSave();
    render();
    return;
  }
  await firebaseApi.setDoc(firebaseApi.doc(firebaseApi.db, FIRESTORE_COLLECTIONS[collectionName], item.id), item, { merge: true });
}

async function deleteCollectionItem(collectionName, id) {
  if (!confirm("削除しますか？")) return;
  if (APP_CONFIG.demoMode) {
    state[collectionName] = state[collectionName].filter(x => x.id !== id);
    localSave();
    render();
    return;
  }
  await firebaseApi.deleteDoc(firebaseApi.doc(firebaseApi.db, FIRESTORE_COLLECTIONS[collectionName], id));
}

function displayName(item, lang="en") {
  return item?.displayName?.[lang] || item?.displayName?.ja || item?.internalName || "";
}

function generatedTitle(bodyId, designId, lang="en") {
  const body = byId(state.bodies, bodyId);
  const design = byId(state.designs, designId);
  const parts = APP_CONFIG.titleOrder.map(key => key === "design" ? displayName(design, lang) : displayName(body, lang));
  return parts.filter(Boolean).join(" ");
}

function render() {
  renderSummary();
  renderFilters();
  renderPinkoiFilters();
  renderInventory();
  renderMasters();
  renderPinkoi();
}

function renderSummary() {
  const total = state.inventory.reduce((a,b) => a + Number(b.stock || 0), 0);
  const ptotal = state.inventory.reduce((a,b) => a + Number(b.pinkoiStock || 0), 0);
  const diff = state.inventory.filter(v => Number(v.stock || 0) !== Number(v.pinkoiStock || 0)).length;
  const out = state.inventory.filter(v => Number(v.stock || 0) === 0).length;
  $("#totalStock").textContent = total;
  $("#totalPinkoiStock").textContent = ptotal;
  $("#needsUpdate").textContent = diff;
  $("#soldOut").textContent = out;
}



function allowedDesignsForBody(bodyId) {
  const body = byId(state.bodies, bodyId);
  if (!body) return state.designs;

  return state.designs.filter(d => {
    if (!Array.isArray(d.allowedBodyNames) || d.allowedBodyNames.length === 0) return true;
    return d.allowedBodyNames.includes(body.internalName);
  });
}

function renderVariantDesignOptions(selectedDesignId = "") {
  const bodyId = $("#variantBody").value;
  const designs = allowedDesignsForBody(bodyId);

  $("#variantDesign").innerHTML =
    `<option value="">Select design</option>` +
    designs.map(d =>
      `<option value="${esc(d.id)}">${esc(d.internalName)}</option>`
    ).join("");

  if (selectedDesignId && designs.some(d => d.id === selectedDesignId)) {
    $("#variantDesign").value = selectedDesignId;
  } else if (designs[0]) {
    $("#variantDesign").value = designs[0].id;
  }
}

function defaultColorBodies(color) {
  const matches = [];
  for (const [bodyName, colorNames] of Object.entries(BODY_COLOR_RULES)) {
    if (colorNames.includes(color?.internalName)) matches.push(bodyName);
  }
  return matches;
}

function allowedColorsForBody(bodyId) {
  const body = byId(state.bodies, bodyId);
  if (!body) return state.colors;

  return state.colors.filter(c => {
    if (Array.isArray(c.allowedBodyNames) && c.allowedBodyNames.length > 0) {
      return c.allowedBodyNames.includes(body.internalName);
    }

    const defaults = defaultColorBodies(c);
    if (defaults.length > 0) {
      return defaults.includes(body.internalName);
    }

    return true;
  });
}

function renderVariantColorOptions(selectedColorId = "") {
  const bodyId = $("#variantBody").value;
  const colors = allowedColorsForBody(bodyId);

  $("#variantColor").innerHTML =
    `<option value="">Select color</option>` +
    colors.map(c =>
      `<option value="${esc(c.id)}">${esc(c.internalName)}</option>`
    ).join("");

  if (selectedColorId && colors.some(c => c.id === selectedColorId)) {
    $("#variantColor").value = selectedColorId;
  } else if (colors[0]) {
    $("#variantColor").value = colors[0].id;
  }
}

function renderPinkoiFilters() {
  const bodySelect = $("#pinkoiBodyFilter");
  if (!bodySelect) return;

  const current = bodySelect.value;
  bodySelect.innerHTML =
    `<option value="">All Bodies</option>` +
    state.bodies.map(b =>
      `<option value="${esc(b.id)}">${esc(b.internalName)}</option>`
    ).join("");

  if (current && state.bodies.some(b => b.id === current)) {
    bodySelect.value = current;
  }
}

function renderFilters() {
  const current = $("#bodyFilter").value;
  $("#bodyFilter").innerHTML = `<option value="">All Bodies</option>` +
    state.bodies.map(b => `<option value="${esc(b.id)}">${esc(b.internalName)}</option>`).join("");
  $("#bodyFilter").value = current;

  const options = (list, label) => `<option value="">${label}</option>` + list.map(x =>
    `<option value="${esc(x.id)}">${esc(x.internalName)}</option>`).join("");

  const currentVariantBody = $("#variantBody").value;
  const currentVariantColor = $("#variantColor").value;

  $("#variantBody").innerHTML = options(state.bodies, "Select body");

  if (currentVariantBody && state.bodies.some(b => b.id === currentVariantBody)) {
    $("#variantBody").value = currentVariantBody;
  }

  renderVariantDesignOptions();
  renderVariantColorOptions(currentVariantColor);
}

function filteredInventory() {
  const q = $("#searchInput").value.trim().toLowerCase();
  const bodyId = $("#bodyFilter").value;
  let rows = state.inventory.filter(v => {
    if (bodyId && v.bodyId !== bodyId) return false;
    if (!q) return true;
    const b = byId(state.bodies, v.bodyId);
    const d = byId(state.designs, v.designId);
    const c = byId(state.colors, v.colorId);
    const hay = [
      b?.internalName, b?.code, d?.internalName, d?.code, c?.internalName, c?.code,
      displayName(b), displayName(d), displayName(c), v.size, v.sku
    ].filter(Boolean).join(" ").toLowerCase();
    return hay.includes(q);
  });

  const sort = $("#sortSelect").value;
  rows.sort((a,b) => {
    if (sort === "stockAsc") return Number(a.stock) - Number(b.stock);
    if (sort === "stockDesc") return Number(b.stock) - Number(a.stock);
    if (sort === "diff") {
      const da = Math.abs(Number(a.stock) - Number(a.pinkoiStock));
      const db = Math.abs(Number(b.stock) - Number(b.pinkoiStock));
      return db - da;
    }
    const ka = `${byId(state.bodies,a.bodyId)?.internalName||""}|${byId(state.designs,a.designId)?.internalName||""}|${a.size}`;
    const kb = `${byId(state.bodies,b.bodyId)?.internalName||""}|${byId(state.designs,b.designId)?.internalName||""}|${b.size}`;
    return ka.localeCompare(kb);
  });
  return rows;
}

function renderInventory() {
  const variants = filteredInventory();
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const bodyFilter = $("#bodyFilter").value;

  if (!variants.length) {
    $("#inventoryRows").innerHTML =
      `<tr><td colspan="7" class="muted">在庫データがありません</td></tr>`;
    return;
  }

  const groups = new Map();

  for (const v of variants) {
    const key = `${v.bodyId}|${v.designId}|${v.colorId}`;
    if (!groups.has(key)) {
      groups.set(key, {
        bodyId: v.bodyId,
        designId: v.designId,
        colorId: v.colorId,
        variants: new Map()
      });
    }
    groups.get(key).variants.set(String(v.size || "").toUpperCase(), v);
  }

  const rows = [...groups.values()].sort((a, b) => {
    const bodyA = byId(state.bodies, a.bodyId)?.internalName || "";
    const bodyB = byId(state.bodies, b.bodyId)?.internalName || "";
    const designA = byId(state.designs, a.designId)?.internalName || "";
    const designB = byId(state.designs, b.designId)?.internalName || "";
    const colorA = byId(state.colors, a.colorId)?.internalName || "";
    const colorB = byId(state.colors, b.colorId)?.internalName || "";

    return (
      bodyA.localeCompare(bodyB) ||
      designA.localeCompare(designB) ||
      colorA.localeCompare(colorB)
    );
  });

  let currentBodyId = null;
  const html = [];

  for (const row of rows) {
    const body = byId(state.bodies, row.bodyId);
    const design = byId(state.designs, row.designId);
    const color = byId(state.colors, row.colorId);

    if (!bodyFilter && row.bodyId !== currentBodyId) {
      currentBodyId = row.bodyId;
      html.push(`
        <tr class="body-section-row">
          <td colspan="7">${esc(body?.internalName || "Body")}</td>
        </tr>
      `);
    }

    const sizeCells = sizes.map(size => {
      const v = row.variants.get(size);

      if (!v) {
        return `<td class="size-cell empty-size">—</td>`;
      }

      const stock = Number(v.stock || 0);
      const pinkoi = Number(v.pinkoiStock || 0);
      const different = stock !== pinkoi;

      return `
        <td class="size-cell">
          <button class="size-stock-button ${different ? "needs-sync" : ""}"
                  data-edit-variant="${esc(v.id)}"
                  title="${esc(v.sku || "")}">
            <span class="size-stock-number">${stock}</span>
            <span class="size-pinkoi-number">P ${pinkoi}</span>
          </button>
        </td>
      `;
    }).join("");

    html.push(`
      <tr>
        <td class="design-cell">${esc(design?.internalName || "?")}</td>
        <td class="color-cell">${esc(color?.internalName || "?")}</td>
        ${sizeCells}
      </tr>
    `);
  }

  $("#inventoryRows").innerHTML = html.join("");
}

function renderMasters() {
  const renderList = (type, list, target) => {
    $(target).innerHTML = list.map(x => `
      <div class="master-item">
        <div>
          <strong>${esc(x.internalName)} ${x.code ? `<small>${esc(x.code)}</small>` : ""}</strong>
          <small>${esc(displayName(x,"en"))}</small>
          ${type === "design" && Array.isArray(x.allowedBodyNames) && x.allowedBodyNames.length
            ? `<small>${esc(x.allowedBodyNames.join(" / "))}</small>`
            : ""}
          ${type === "color"
            ? `<small>${esc(
                (Array.isArray(x.allowedBodyNames) && x.allowedBodyNames.length
                  ? x.allowedBodyNames
                  : (defaultColorBodies(x).length ? defaultColorBodies(x) : ["Organic", "Vintage", "MIJ"])
                ).join(" / ")
              )}</small>`
            : ""}
        </div>
        <div>
          <button class="link-button" data-edit-master="${type}" data-id="${esc(x.id)}">編集</button>
        </div>
      </div>
    `).join("") || `<div class="muted">未登録</div>`;
  };
  renderList("body", state.bodies, "#bodyList");
  renderList("design", state.designs, "#designList");
  renderList("color", state.colors, "#colorList");
}

function pinkoiProductKey(bodyId, designId) {
  return `${bodyId}__${designId}`;
}

function getPinkoiProduct(bodyId, designId) {
  const key = pinkoiProductKey(bodyId, designId);
  return state.pinkoiProducts.find(p => p.id === key) || null;
}

function effectivePinkoiTitle(bodyId, designId) {
  const product = getPinkoiProduct(bodyId, designId);
  return product?.customTitle?.trim() || generatedTitle(bodyId, designId, "en");
}

function pinkoiStatusLabel(status) {
  if (status === "selling") return "Selling";
  if (status === "hidden") return "Hidden";
  return "Draft";
}

function openPinkoiProduct(bodyId, designId) {
  const body = byId(state.bodies, bodyId);
  const design = byId(state.designs, designId);
  const product = getPinkoiProduct(bodyId, designId);
  const key = pinkoiProductKey(bodyId, designId);

  $("#pinkoiProductKey").value = key;
  $("#pinkoiProductBodyId").value = bodyId;
  $("#pinkoiProductDesignId").value = designId;
  $("#pinkoiManageName").textContent =
    `${design?.internalName || "?"} / ${body?.internalName || "?"}`;
  $("#pinkoiAutoTitle").textContent =
    `Auto: ${generatedTitle(bodyId, designId, "en")}`;
  $("#pinkoiCustomTitle").value = product?.customTitle || "";
  $("#pinkoiProductId").value = product?.pinkoiProductId || "";
  $("#pinkoiProductPrice").value = product?.priceTwd ?? 1200;
  $("#pinkoiProductStatus").value = product?.status || "draft";
  $("#pinkoiProductNote").value = product?.note || "";

  $("#pinkoiProductDialog").showModal();
}

async function submitPinkoiProduct(e) {
  e.preventDefault();

  const bodyId = $("#pinkoiProductBodyId").value;
  const designId = $("#pinkoiProductDesignId").value;
  const id = $("#pinkoiProductKey").value || pinkoiProductKey(bodyId, designId);

  const item = {
    id,
    bodyId,
    designId,
    customTitle: $("#pinkoiCustomTitle").value.trim(),
    pinkoiProductId: $("#pinkoiProductId").value.trim(),
    priceTwd: Number($("#pinkoiProductPrice").value || 0),
    status: $("#pinkoiProductStatus").value || "draft",
    note: $("#pinkoiProductNote").value.trim(),
    updatedAt: new Date().toISOString()
  };

  await saveCollectionItem("pinkoiProducts", item);
  $("#pinkoiProductDialog").close();
  showToast("Pinkoi商品情報を保存しました");
}

function renderPinkoi() {
  const q = ($("#pinkoiSearchInput")?.value || "").trim().toLowerCase();
  const bodyFilter = $("#pinkoiBodyFilter")?.value || "";
  const statusFilter = $("#pinkoiStatusFilter")?.value || "";

  const groups = new Map();

  state.inventory.forEach(v => {
    const key = `${v.bodyId}|${v.designId}`;
    if (!groups.has(key)) {
      groups.set(key, {
        bodyId: v.bodyId,
        designId: v.designId,
        variants: []
      });
    }
    groups.get(key).variants.push(v);
  });

  const cards = [...groups.values()]
    .filter(group => {
      if (bodyFilter && group.bodyId !== bodyFilter) return false;

      const body = byId(state.bodies, group.bodyId);
      const design = byId(state.designs, group.designId);
      const product = getPinkoiProduct(group.bodyId, group.designId);
      const status = product?.status || "draft";

      if (statusFilter && status !== statusFilter) return false;

      if (!q) return true;

      const hay = [
        body?.internalName,
        design?.internalName,
        generatedTitle(group.bodyId, group.designId, "en"),
        product?.customTitle,
        product?.pinkoiProductId
      ].filter(Boolean).join(" ").toLowerCase();

      return hay.includes(q);
    })
    .sort((a, b) => {
      const da = byId(state.designs, a.designId)?.internalName || "";
      const db = byId(state.designs, b.designId)?.internalName || "";
      const ba = byId(state.bodies, a.bodyId)?.internalName || "";
      const bb = byId(state.bodies, b.bodyId)?.internalName || "";
      return da.localeCompare(db) || ba.localeCompare(bb);
    });

  $("#pinkoiCards").innerHTML = cards.map(group => {
    const body = byId(state.bodies, group.bodyId);
    const design = byId(state.designs, group.designId);
    const product = getPinkoiProduct(group.bodyId, group.designId);

    const title = effectivePinkoiTitle(group.bodyId, group.designId);
    const status = product?.status || "draft";
    const price = product?.priceTwd ?? group.variants[0]?.priceTwd ?? 1200;
    const productId = product?.pinkoiProductId || "未設定";

    const colorGroups = new Map();

    group.variants.forEach(v => {
      if (!colorGroups.has(v.colorId)) colorGroups.set(v.colorId, []);
      colorGroups.get(v.colorId).push(v);
    });

    const colorHtml = [...colorGroups.entries()].map(([colorId, vars]) => {
      const color = byId(state.colors, colorId);
      const bySize = new Map(vars.map(v => [String(v.size).toUpperCase(), v]));
      const sizes = ["S", "M", "L", "XL", "XXL"];

      const sizeText = sizes.map(size => {
        const v = bySize.get(size);
        if (!v) return `${size} —`;
        return `${size} ${Number(v.stock || 0)} / P${Number(v.pinkoiStock || 0)}`;
      }).join("   ");

      return `
        <div class="pinkoi-color-row">
          <strong>${esc(displayName(color, "en") || color?.internalName || "?")}</strong>
          <span>${esc(sizeText)}</span>
        </div>
      `;
    }).join("");

    return `
      <article class="pinkoi-product-card">
        <div class="pinkoi-card-head">
          <div>
            <div class="pinkoi-manage-name">
              ${esc(design?.internalName || "?")} / ${esc(body?.internalName || "?")}
            </div>
            <h3>${esc(title)}</h3>
          </div>
          <span class="pinkoi-status ${esc(status)}">${esc(pinkoiStatusLabel(status))}</span>
        </div>

        <div class="pinkoi-meta">
          <span>ID: ${esc(productId)}</span>
          <span>TWD ${Number(price || 0).toLocaleString()}</span>
        </div>

        <div class="pinkoi-color-list">
          ${colorHtml}
        </div>

        <div class="pinkoi-card-actions">
          <button class="button secondary small"
                  data-edit-pinkoi-product
                  data-body-id="${esc(group.bodyId)}"
                  data-design-id="${esc(group.designId)}">
            商品情報を編集
          </button>
        </div>
      </article>
    `;
  }).join("") || `<div class="muted">Pinkoi商品がありません。</div>`;
}

async function adjustStock(id, delta) {
  const item = state.inventory.find(v => v.id === id);
  if (!item) return;
  const updated = { ...item, stock: Math.max(0, Number(item.stock || 0) + Number(delta)), updatedAt: new Date().toISOString() };
  await saveCollectionItem("inventory", updated);
}


function bodyCode(bodyId) {
  return byId(state.bodies, bodyId)?.code || "BODY";
}

function designCode(designId) {
  return byId(state.designs, designId)?.code || "DESIGN";
}

function colorCode(colorId) {
  return byId(state.colors, colorId)?.code || "COLOR";
}

function cleanSkuPart(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function generatedSkuPrefix(bodyId, designId, colorId) {
  return [
    "TS",
    cleanSkuPart(bodyCode(bodyId)),
    cleanSkuPart(designCode(designId)),
    cleanSkuPart(colorCode(colorId))
  ].filter(Boolean).join("_");
}

function renderBulkDesignOptions(selectedDesignId = "") {
  const bodyId = $("#bulkBody").value;
  const designs = allowedDesignsForBody(bodyId);

  $("#bulkDesign").innerHTML =
    `<option value="">Select design</option>` +
    designs.map(d => `<option value="${esc(d.id)}">${esc(d.internalName)}</option>`).join("");

  if (selectedDesignId && designs.some(d => d.id === selectedDesignId)) {
    $("#bulkDesign").value = selectedDesignId;
  } else if (designs[0]) {
    $("#bulkDesign").value = designs[0].id;
  }
}

function renderBulkColorOptions(selectedColorId = "") {
  const bodyId = $("#bulkBody").value;
  const colors = allowedColorsForBody(bodyId);

  $("#bulkColor").innerHTML =
    `<option value="">Select color</option>` +
    colors.map(c => `<option value="${esc(c.id)}">${esc(c.internalName)}</option>`).join("");

  if (selectedColorId && colors.some(c => c.id === selectedColorId)) {
    $("#bulkColor").value = selectedColorId;
  } else if (colors[0]) {
    $("#bulkColor").value = colors[0].id;
  }
}

function updateBulkSkuRows() {
  const prefix = $("#bulkSkuPrefix").value.trim() ||
    generatedSkuPrefix($("#bulkBody").value, $("#bulkDesign").value, $("#bulkColor").value);

  $$("#bulkSizeRows tr").forEach(row => {
    const size = row.dataset.size;
    const skuInput = row.querySelector("[data-bulk-sku]");
    if (skuInput && !skuInput.dataset.manual) {
      skuInput.value = `${prefix}_${cleanSkuPart(size)}`;
    }
  });
}

function renderBulkSizeRows() {
  const sizes = APP_CONFIG.sizes || ["S", "M", "L", "XL", "XXL"];

  $("#bulkSizeRows").innerHTML = sizes.map(size => `
    <tr data-size="${esc(size)}">
      <td>${esc(size)}</td>
      <td><input type="number" min="0" value="0" data-bulk-stock></td>
      <td><input type="number" min="0" value="0" data-bulk-pinkoi></td>
      <td><input data-bulk-sku></td>
    </tr>
  `).join("");

  $$("#bulkSizeRows [data-bulk-sku]").forEach(input => {
    input.addEventListener("input", () => {
      input.dataset.manual = input.value.trim() ? "1" : "";
    });
  });

  updateBulkSkuRows();
}

function openBulkVariantDialog() {
  $("#bulkBody").innerHTML =
    `<option value="">Select body</option>` +
    state.bodies.map(b => `<option value="${esc(b.id)}">${esc(b.internalName)}</option>`).join("");

  $("#bulkBody").value = state.bodies[0]?.id || "";
  renderBulkDesignOptions();
  renderBulkColorOptions();
  $("#bulkPrice").value = 1200;
  $("#bulkPinkoiId").value = "";
  $("#bulkSkuPrefix").value = "";
  renderBulkSizeRows();
  $("#bulkVariantDialog").showModal();
}

async function submitBulkVariant(e) {
  e.preventDefault();

  const bodyId = $("#bulkBody").value;
  const designId = $("#bulkDesign").value;
  const colorId = $("#bulkColor").value;
  const priceTwd = Number($("#bulkPrice").value || 0);
  const pinkoiProductId = $("#bulkPinkoiId").value.trim();

  if (!bodyId || !designId || !colorId) {
    alert("Body、Design、Colorを選択してください。");
    return;
  }

  const rows = $$("#bulkSizeRows tr");
  let saved = 0;

  for (const row of rows) {
    const size = row.dataset.size;
    const stock = Number(row.querySelector("[data-bulk-stock]").value || 0);
    const pinkoiStock = Number(row.querySelector("[data-bulk-pinkoi]").value || 0);
    const sku = row.querySelector("[data-bulk-sku]").value.trim();

    const existing = state.inventory.find(v =>
      v.bodyId === bodyId &&
      v.designId === designId &&
      v.colorId === colorId &&
      String(v.size).toUpperCase() === String(size).toUpperCase()
    );

    const item = {
      id: existing?.id || slug(),
      bodyId,
      designId,
      colorId,
      size,
      sku,
      stock,
      pinkoiStock,
      priceTwd,
      pinkoiProductId,
      updatedAt: new Date().toISOString()
    };

    await saveCollectionItem("inventory", item);
    saved++;
  }

  $("#bulkVariantDialog").close();
  showToast(`${saved}サイズを保存しました`);
}

function openVariant(id=null) {
  const v = id ? state.inventory.find(x => x.id === id) : null;
  $("#variantDialogTitle").textContent = v ? "在庫を編集" : "在庫を追加";
  $("#variantId").value = v?.id || "";
  $("#variantBody").value = v?.bodyId || state.bodies[0]?.id || "";
  renderVariantDesignOptions(v?.designId || "");
  renderVariantColorOptions(v?.colorId || "");
  $("#variantSize").value = v?.size || "M";
  $("#variantSku").value = v?.sku || "";
  $("#variantStock").value = v?.stock ?? 0;
  $("#variantPinkoiStock").value = v?.pinkoiStock ?? 0;
  $("#variantPrice").value = v?.priceTwd ?? 1200;
  $("#variantPinkoiId").value = v?.pinkoiProductId || "";
  $("#variantDialog").showModal();
}

async function submitVariant(e) {
  e.preventDefault();
  const item = {
    id: $("#variantId").value || slug(),
    bodyId: $("#variantBody").value,
    designId: $("#variantDesign").value,
    colorId: $("#variantColor").value,
    size: $("#variantSize").value.trim(),
    sku: $("#variantSku").value.trim(),
    stock: Number($("#variantStock").value || 0),
    pinkoiStock: Number($("#variantPinkoiStock").value || 0),
    priceTwd: Number($("#variantPrice").value || 0),
    pinkoiProductId: $("#variantPinkoiId").value.trim(),
    updatedAt: new Date().toISOString()
  };
  await saveCollectionItem("inventory", item);
  $("#variantDialog").close();
  showToast("保存しました");
}

function openMaster(type, id=null) {
  const collectionName = type === "body" ? "bodies" : type === "design" ? "designs" : "colors";
  const item = id ? state[collectionName].find(x => x.id === id) : null;
  $("#masterType").value = type;
  $("#masterId").value = item?.id || "";
  $("#masterInternalName").value = item?.internalName || "";
  $("#masterCode").value = item?.code || "";
  $("#masterJa").value = item?.displayName?.ja || "";
  $("#masterEn").value = item?.displayName?.en || "";
  $("#masterZh").value = item?.displayName?.zhTW || "";

  const designBodiesField = $("#designBodiesField");
  const designChecks = $$(".design-body-check");
  designBodiesField.classList.toggle("hidden", type !== "design");

  if (type === "design") {
    const selected = Array.isArray(item?.allowedBodyNames) && item.allowedBodyNames.length
      ? new Set(item.allowedBodyNames)
      : new Set(["Organic", "Vintage", "MIJ"]);

    designChecks.forEach(ch => {
      ch.checked = selected.has(ch.value);
    });
  }

  const colorBodiesField = $("#colorBodiesField");
  const colorChecks = $$(".color-body-check");
  colorBodiesField.classList.toggle("hidden", type !== "color");

  if (type === "color") {
    let selectedNames;

    if (Array.isArray(item?.allowedBodyNames) && item.allowedBodyNames.length) {
      selectedNames = item.allowedBodyNames;
    } else {
      const defaults = defaultColorBodies(item);
      selectedNames = defaults.length ? defaults : ["Organic", "Vintage", "MIJ"];
    }

    const selected = new Set(selectedNames);
    colorChecks.forEach(ch => {
      ch.checked = selected.has(ch.value);
    });
  }

  $("#masterDialogTitle").textContent = `${type[0].toUpperCase()+type.slice(1)} Master`;
  $("#masterDialog").showModal();
}

async function submitMaster(e) {
  e.preventDefault();
  const type = $("#masterType").value;
  const collectionName = type === "body" ? "bodies" : type === "design" ? "designs" : "colors";
  const item = {
    id: $("#masterId").value || slug(),
    internalName: $("#masterInternalName").value.trim(),
    code: $("#masterCode").value.trim(),
    displayName: {
      ja: $("#masterJa").value.trim(),
      en: $("#masterEn").value.trim(),
      zhTW: $("#masterZh").value.trim()
    },
    updatedAt: new Date().toISOString()
  };

  if (type === "design") {
    item.allowedBodyNames = $$(".design-body-check")
      .filter(ch => ch.checked)
      .map(ch => ch.value);
  }

  if (type === "color") {
    item.allowedBodyNames = $$(".color-body-check")
      .filter(ch => ch.checked)
      .map(ch => ch.value);
  }
  await saveCollectionItem(collectionName, item);
  $("#masterDialog").close();
  showToast("保存しました");
}


function normalizeName(value) {
  return String(value || "").trim().toLowerCase();
}

function stableMasterId(prefix, internalName) {
  const cleaned = String(internalName || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return `${prefix}_${cleaned || slug()}`;
}

async function loadIcelollyDefaults() {
  const confirmed = confirm(
    "ICELOLLYのBodies、Designs、Colorsを一括登録します。\n同じ管理用名称がすでにある場合は重複登録しません。"
  );
  if (!confirmed) return;

  const btn = $("#loadDefaultsBtn");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "登録中...";
  }

  try {
    const configs = [
      ["bodies", ICELOLLY_DEFAULTS.bodies, "body"],
      ["designs", ICELOLLY_DEFAULTS.designs, "design"],
      ["colors", ICELOLLY_DEFAULTS.colors, "color"]
    ];

    let added = 0;
    let skipped = 0;

    for (const [collectionName, items, prefix] of configs) {
      const existingNames = new Set(
        state[collectionName].map(x => normalizeName(x.internalName))
      );

      for (const source of items) {
        const key = normalizeName(source.internalName);
        if (existingNames.has(key)) {
          skipped++;
          continue;
        }

        const item = {
          ...source,
          id: stableMasterId(prefix, source.internalName),
          updatedAt: new Date().toISOString()
        };

        await saveCollectionItem(collectionName, item);
        existingNames.add(key);
        added++;
      }
    }

    showToast(`初期データを登録しました 追加 ${added} / 既存 ${skipped}`);
  } catch (err) {
    console.error(err);
    alert("初期データの登録に失敗しました。Google LoginとFirestore Rulesを確認してください。");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = "ICELOLLY初期データを登録";
    }
  }
}

function bindEvents() {
  $$(".tab").forEach(btn => btn.addEventListener("click", () => {
    $$(".tab").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    const name = btn.dataset.tab;
    $$(".tabpanel").forEach(x => x.classList.add("hidden"));
    $(`#${name}Tab`).classList.remove("hidden");
  }));

  $("#searchInput").addEventListener("input", renderInventory);
  $("#bodyFilter").addEventListener("change", renderInventory);
  $("#sortSelect").addEventListener("change", renderInventory);
  $("#variantBody").addEventListener("change", () => {
    renderVariantDesignOptions();
    renderVariantColorOptions();
  });
  $("#addVariantBtn").addEventListener("click", openBulkVariantDialog);
  $("#variantForm").addEventListener("submit", submitVariant);
  $("#bulkVariantForm").addEventListener("submit", submitBulkVariant);
  $("#pinkoiProductForm").addEventListener("submit", submitPinkoiProduct);

  $("#pinkoiSearchInput")?.addEventListener("input", renderPinkoi);
  $("#pinkoiBodyFilter")?.addEventListener("change", renderPinkoi);
  $("#pinkoiStatusFilter")?.addEventListener("change", renderPinkoi);

  $("#bulkBody").addEventListener("change", () => {
    renderBulkDesignOptions();
    renderBulkColorOptions();
    $("#bulkSkuPrefix").value = "";
    updateBulkSkuRows();
  });

  $("#bulkDesign").addEventListener("change", () => {
    $("#bulkSkuPrefix").value = "";
    updateBulkSkuRows();
  });

  $("#bulkColor").addEventListener("change", () => {
    $("#bulkSkuPrefix").value = "";
    updateBulkSkuRows();
  });

  $("#bulkSkuPrefix").addEventListener("input", () => {
    $$("#bulkSizeRows [data-bulk-sku]").forEach(input => delete input.dataset.manual);
    updateBulkSkuRows();
  });
  $("#masterForm").addEventListener("submit", submitMaster);
  $("#loginBtn").addEventListener("click", login);
  $("#logoutBtn").addEventListener("click", logout);
  $("#loadDefaultsBtn")?.addEventListener("click", loadIcelollyDefaults);

  document.addEventListener("click", async e => {
    const stockBtn = e.target.closest("[data-stock]");
    if (stockBtn) return adjustStock(stockBtn.dataset.stock, Number(stockBtn.dataset.delta));

    const editVariant = e.target.closest("[data-edit-variant]");
    if (editVariant) return openVariant(editVariant.dataset.editVariant);

    const editPinkoi = e.target.closest("[data-edit-pinkoi-product]");
    if (editPinkoi) {
      return openPinkoiProduct(
        editPinkoi.dataset.bodyId,
        editPinkoi.dataset.designId
      );
    }

    const addMaster = e.target.closest("[data-add-master]");
    if (addMaster) return openMaster(addMaster.dataset.addMaster);

    const editMaster = e.target.closest("[data-edit-master]");
    if (editMaster) return openMaster(editMaster.dataset.editMaster, editMaster.dataset.id);
  });
}

bindEvents();
initFirebase().catch(err => {
  console.error(err);
  alert("初期化に失敗しました。firebase-config.js を確認してください。");
});
