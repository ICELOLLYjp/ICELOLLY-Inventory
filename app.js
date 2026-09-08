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



const PINKOI_TSHIRT_SIZES = ["S", "M", "L", "XL", "XXL"];

const DEFAULT_PINKOI_PRICES_JPY = {
  Vintage: 6380,
  Organic: 6820,
  MIJ: 8800
};

function defaultPinkoiPriceJpy(bodyId) {
  const body = byId(state.bodies, bodyId);
  return Number(DEFAULT_PINKOI_PRICES_JPY[body?.internalName] || 0);
}

function normalizePinkoiTshirtSize(value) {
  const raw = String(value || "")
    .trim()
    .toUpperCase()
    .replaceAll("Ｓ", "S")
    .replaceAll("Ｍ", "M")
    .replaceAll("Ｌ", "L")
    .replaceAll("Ｘ", "X")
    .replace(/\s+/g, "");

  const aliases = {
    "S": "S",
    "M": "M",
    "L": "L",
    "XL": "XL",
    "LL": "XL",
    "XXL": "XXL",
    "2XL": "XXL",
    "2X": "XXL"
  };

  return aliases[raw] || raw;
}

function isValidPinkoiTshirtSize(value) {
  return PINKOI_TSHIRT_SIZES.includes(normalizePinkoiTshirtSize(value));
}

const DEFAULT_BODY_SIZE_CHARTS = {
  Organic: {
    model: "TRUSS OGB-910",
    source: "https://www.truss-wear.jp/items/index.php?page=info&code=OGB-910",
    sizeChart: {
      S:   { length: 65, width: 48, shoulder: 43, sleeve: 18 },
      M:   { length: 68, width: 52, shoulder: 46, sleeve: 19 },
      L:   { length: 71, width: 56, shoulder: 49, sleeve: 20 },
      XL:  { length: 74, width: 60, shoulder: 52, sleeve: 21 },
      XXL: { length: 77, width: 64, shoulder: 55, sleeve: 22 }
    }
  },

  Vintage: {
    model: "D-FACTORY DF1101D",
    source: "https://sloth-ethical.com/product.php?id=43",
    sizeChart: {
      S:   { length: 65, width: 49, shoulder: 42, sleeve: 19 },
      M:   { length: 69, width: 52, shoulder: 46, sleeve: 20 },
      L:   { length: 73, width: 55, shoulder: 50, sleeve: 22 },
      XL:  { length: 77, width: 58, shoulder: 54, sleeve: 24 },
      XXL: { length: 81, width: 61, shoulder: 57, sleeve: 25 }
    }
  },

  MIJ: {
    model: "TRUSS JPC-001",
    source: "https://www.truss-wear.jp/items/index.php?page=info&code=JPC-001",
    sizeChart: {
      S:   { length: 68, width: 47, shoulder: 45, sleeve: 23 },
      M:   { length: 71, width: 51, shoulder: 48, sleeve: 24 },
      L:   { length: 74, width: 56, shoulder: 51, sleeve: 25 },
      XL:  { length: 77, width: 61, shoulder: 54, sleeve: 26 },
      XXL: { length: 80, width: 66, shoulder: 57, sleeve: 27 }
    }
  }
};

function defaultSizeChartForBody(body) {
  return DEFAULT_BODY_SIZE_CHARTS[body?.internalName] || null;
}

const ICELOLLY_DEFAULTS = {
  bodies: [
    { internalName: "Organic", code: "ORG", displayName: { ja: "オーガニックコットンTシャツ", en: "Organic Cotton T Shirt", zhTW: "有機棉 T恤" }, bodyModel: "TRUSS OGB-910", sizeChartSource: "https://www.truss-wear.jp/items/index.php?page=info&code=OGB-910", sizeChart: DEFAULT_BODY_SIZE_CHARTS.Organic.sizeChart },
    { internalName: "Vintage", code: "VNT", displayName: { ja: "ヴィンテージ加工Tシャツ", en: "Vintage Washed T Shirt", zhTW: "復古水洗 T恤" }, bodyModel: "D-FACTORY DF1101D", sizeChartSource: "https://sloth-ethical.com/product.php?id=43", sizeChart: DEFAULT_BODY_SIZE_CHARTS.Vintage.sizeChart },
    { internalName: "MIJ", code: "MIJ", displayName: { ja: "日本製Tシャツ", en: "Made in Japan T Shirt", zhTW: "日本製 T恤" }, bodyModel: "TRUSS JPC-001", sizeChartSource: "https://www.truss-wear.jp/items/index.php?page=info&code=JPC-001", sizeChart: DEFAULT_BODY_SIZE_CHARTS.MIJ.sizeChart }
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


const DEFAULT_PINKOI_COPY = {
  highlightJa: "ICELOLLYのオリジナルイラストをプリントしたTシャツです。日常でも旅先でも着やすいデザインで、シンプルなコーディネートのアクセントになります。",
  descriptionJa: `ICELOLLYのオリジナルイラストを使ったTシャツです。海や自然、旅からインスピレーションを受けたデザインを中心に制作しています。

一枚でも着やすく、パンツやスカートなどさまざまなスタイルに合わせやすいアイテムです。

デザインごとに使用しているTシャツのボディやカラーが異なります。サイズや素材については商品情報をご確認ください。`,
  highlightEn: "An original ICELOLLY T shirt with our illustration. Easy to wear every day and also great for travel.",
  descriptionEn: `This T shirt features an original illustration by ICELOLLY.

Our designs are inspired by the ocean, nature, travel, and everyday moments.

It is easy to wear on its own and simple to match with many styles.

The T shirt body, color, and material may be different depending on the design. Please check the product details for size and material information.`,
  highlightZh: "印有 ICELOLLY 原創插畫的 T 恤。適合日常穿著，也很適合旅行時搭配。",
  descriptionZh: `這款 T 恤使用 ICELOLLY 的原創插畫設計。

我們的作品主要從海洋、自然、旅行與日常生活中獲得靈感。

單穿也很好搭配，可以輕鬆搭配不同風格的服裝。

不同設計所使用的 T 恤版型、顏色與材質可能有所不同。尺寸與材質資訊請確認商品頁面的詳細說明。`
};





const BODY_PINKOI_COPY = {
  Organic: {
    highlightJa: "ICELOLLYのオリジナルイラストをプリントした、100％オーガニックコットンのTシャツです。やわらかく肌触りのよい生地で、毎日気持ちよく着られる一枚です。",
    descriptionJa: `ICELOLLYのオリジナルイラストを使ったTシャツです。海や自然、旅からインスピレーションを受けたデザインを中心に制作しています。

100％オーガニックコットンを使用した、やわらかく肌触りのよい生地です。素肌にも心地よく、日常の中で気軽に着られるTシャツに仕上がっています。

襟は二本針縫製で、着用を重ねても伸びにくい仕様。胴は脇に縫い目のない丸胴仕様です。

素材にも心地よさにも目を向けた一枚として、ICELOLLYのイラストとともに長く楽しんでもらえたら嬉しいです。サイズは商品ページのサイズ表をご確認ください。`,
    highlightEn: "An original ICELOLLY T shirt made with 100% organic cotton. The fabric has a soft, comfortable feel that is easy to enjoy every day.",
    descriptionEn: `This T shirt features an original illustration by ICELOLLY, inspired by the ocean, nature, travel, and everyday moments.

Made with 100% organic cotton, the fabric has a soft and comfortable feel against the skin and is easy to wear every day.

The collar has double needle stitching to help reduce stretching, and the body has a tubular construction without side seams.

A comfortable everyday piece that brings together thoughtful material choice and original ICELOLLY illustration. Please check the size chart on the product page.`,
    highlightZh: "印有 ICELOLLY 原創插畫的 T 恤，使用 100％ 有機棉製作。布料柔軟親膚，適合每天舒適穿著。",
    descriptionZh: `這款 T 恤使用 ICELOLLY 的原創插畫設計，作品靈感來自海洋、自然、旅行與日常生活。

使用 100％ 有機棉製作。布料柔軟、觸感舒適，貼近肌膚穿著也很舒服，適合日常輕鬆搭配。

領口採用雙針縫製，較不易因反覆穿著而鬆弛；衣身採圓筒無側縫結構。

我們希望把舒適的素材選擇與 ICELOLLY 的原創插畫結合成一件可以長久享受的日常 T 恤。尺寸請參考商品頁面的尺寸表。`
  },

  Vintage: {
    highlightJa: "6.6ozのコットン100％ボディにピグメント染めを施し、着古したようなヴィンテージ感を楽しめるTシャツです。着用や洗濯を重ねることで独特のエイジングが加わります。",
    descriptionJa: `ICELOLLYのオリジナルイラストを使ったTシャツです。海や自然、旅からインスピレーションを受けたデザインを中心に制作しています。

コットン100％の6.6oz生地にピグメント染めを施し、着古したような自然なヴィンテージ感に仕上げています。着用や洗濯を重ねることで、色合いの変化や独特のエイジングを楽しめます。

襟は二本針縫製、胴は丸胴仕様です。

染め製品の特性上、色合いやサイズ感には個体差があります。また、水濡れや摩擦、洗濯により色落ちや移染が生じる場合があります。`,
    highlightEn: "A 6.6 oz 100% cotton T shirt with pigment dye for a worn in vintage look. The color develops more character with wear and washing.",
    descriptionEn: `This T shirt features an original illustration by ICELOLLY, inspired by the ocean, nature, travel, and everyday moments.

Made from 100% cotton in a 6.6 oz fabric, it is pigment dyed for a naturally worn in vintage look. The color develops more character with wear and washing.

The collar uses double needle stitching and the body has a tubular construction.

Because this is a pigment dyed garment, color and size may vary slightly. Color may also fade or transfer with water, friction, or washing.`,
    highlightZh: "6.6 oz 的 100％ 棉質 T 恤，以顏料染色呈現自然的復古舊衣感。隨著穿著與清洗，顏色會逐漸產生獨特變化。",
    descriptionZh: `這款 T 恤使用 ICELOLLY 的原創插畫設計，作品靈感來自海洋、自然、旅行與日常生活。

採用 100％ 棉、6.6 oz 布料與顏料染色，呈現自然的復古舊衣質感。隨著穿著與清洗，顏色會逐漸產生獨特的變化。

領口採雙針縫製，衣身為圓筒結構。

由於染色製品的特性，顏色與尺寸可能有些微個體差異。遇水、摩擦或清洗時也可能產生褪色或移色情況。`
  },

  MIJ: {
    highlightJa: "全工程を日本国内で行った6.6ozの日本製Tシャツです。USAコットン100％のオープンエンド糸による、ドライで軽やかな風合いが特徴です。",
    descriptionJa: `ICELOLLYのオリジナルイラストを使ったTシャツです。海や自然、旅からインスピレーションを受けたデザインを中心に制作しています。

紡績から生地、縫製まで全ての工程を日本国内で行った日本製Tシャツです。USAコットン100％のオープンエンド糸を使用した6.6oz生地は、一般的なTシャツよりやや厚みがありながら、ごわつきにくく軽やかなドライタッチが特徴です。

繊維の中に空気を含むオープンエンド糸ならではの吸湿性と速乾性があり、さらっとした着心地を楽しめます。

胴は脇に縫い目のない丸胴仕様。袖と裾はクラシックなシングルステッチで仕上げ、肩から首周りには縫い目の凹凸を抑えながら強度を高める補強が施されています。

サイズは商品ページのサイズ表をご確認ください。`,
    highlightEn: "A 6.6 oz T shirt made entirely in Japan from 100% USA cotton. Open end yarn gives the fabric a dry, light feel with comfortable moisture absorption and quick drying performance.",
    descriptionEn: `This T shirt features an original illustration by ICELOLLY, inspired by the ocean, nature, travel, and everyday moments.

Every production process, from yarn and fabric to sewing, is completed in Japan. The 6.6 oz fabric is made from 100% USA cotton with open end yarn. It has a slightly heavier weight than a typical T shirt while keeping a light, dry feel without excessive stiffness.

The open end yarn structure helps provide moisture absorption and quick drying comfort.

The body has a tubular construction without side seams. The sleeves and hem use classic single stitching, while reinforcement around the shoulders and back of the neck helps reduce seam bulk and improve strength.

Please check the size chart on the product page.`,
    highlightZh: "全程於日本國內製作的 6.6 oz 日本製 T 恤，使用 100％ 美國棉開端紡紗，具有乾爽、輕盈的穿著質感。",
    descriptionZh: `這款 T 恤使用 ICELOLLY 的原創插畫設計，作品靈感來自海洋、自然、旅行與日常生活。

從紡紗、布料到縫製，所有製作工程均在日本國內完成。6.6 oz 布料使用 100％ 美國棉開端紡紗，比一般 T 恤稍有厚度，同時保有不易僵硬的輕盈乾爽質感。

開端紡紗的結構讓纖維中含有較多空氣，具有良好的吸濕與快乾特性，穿著感舒適清爽。

衣身採圓筒無側縫結構，袖口與下擺使用經典單針縫製，肩部至後領周圍另有補強縫製，可減少縫線凹凸感並提高強度。

尺寸請參考商品頁面的尺寸表。`
  }
};

function defaultPinkoiCopyForBody(bodyId) {
  const body = byId(state.bodies, bodyId);
  return BODY_PINKOI_COPY[body?.internalName] || DEFAULT_PINKOI_COPY;
}

function isLegacyBodyDescription(value) {
  const text = String(value || "").toLowerCase();

  return [
    "truss ogb",
    "ogb-910",
    "ogb 910",
    "d factory",
    "d-factory",
    "df1101d",
    "cotton research club",
    "jpc-001",
    "jpc 001"
  ].some(marker => text.includes(marker));
}

function pinkoiCopyValue(product, key, bodyId) {
  const saved = product?.[key];
  const bodyDefaults = defaultPinkoiCopyForBody(bodyId);

  // Blank values use the body specific default.
  if (!saved) return bodyDefaults[key] || "";

  // Upgrade the former generic default.
  if (saved === DEFAULT_PINKOI_COPY[key]) {
    return bodyDefaults[key] || saved;
  }

  // Upgrade older body-specific copy that exposed maker names or model numbers.
  if (isLegacyBodyDescription(saved)) {
    return bodyDefaults[key] || saved;
  }

  // User-edited copy that does not contain legacy maker/model references is preserved.
  return saved;
}

function effectivePinkoiCopy(product, key) {
  return pinkoiCopyValue(product, key, product?.bodyId);
}


const DESIGN_TAGS = {
  "Bigwave": ["波", "wave", "海浪", "海"],
  "SALTY": ["海", "ocean", "海洋", "summer"],
  "Squids Night": ["イカ", "squid", "魷魚", "海洋"],
  "Cherry": ["さくらんぼ", "cherry", "櫻桃", "フルーツ"],
  "Orca Banana": ["シャチ", "orca", "虎鯨", "banana"],
  "MONSTER BUILDING": ["建築", "architecture", "建築設計", "city"],
  "Share the Pavement": ["ストリート", "street", "街頭", "urban"],
  "Good Vibes": ["ポップ", "pop art", "流行插畫", "good vibes"],
  "Space Odyssey RAY": ["エイ", "ray", "魟魚", "space"],
  "Coral": ["サンゴ", "coral", "珊瑚", "海洋"],
  "Safe Surf": ["サーフィン", "surf", "衝浪", "海"],
  "Woo Hoo": ["ポップ", "pop art", "流行插畫", "fun"],
  "Sink": ["イラスト", "illustration", "插畫", "graphic"],
  "VACAY": ["旅行", "travel", "旅行設計", "vacation"],
  "DEEP": ["ダイビング", "diving", "潛水", "海洋"],
  "Gulls and Lemons": ["カモメ", "seagull", "海鷗", "lemon"],
  "Encounters": ["イラスト", "illustration", "插畫", "encounter"],
  "This is SUMMER": ["夏", "summer", "夏天", "海"],
  "See You in Water": ["海", "ocean", "海洋", "water"],
  "Whole Ocean Dive Club": ["ダイビング", "diving", "潛水", "海洋"],
  "KYOTO": ["京都", "Kyoto", "日本", "Japan"],
  "This is JAPAN": ["日本", "Japan", "日本設計", "Japanese design"]
};

function splitCommaList(value) {
  return String(value || "")
    .split(",")
    .map(x => x.trim())
    .filter(Boolean);
}

function uniqueLimited(values, limit = 10) {
  const result = [];
  const seen = new Set();

  for (const value of values) {
    const clean = String(value || "").trim();
    if (!clean) continue;

    const key = clean.toLowerCase();
    if (seen.has(key)) continue;

    seen.add(key);
    result.push(clean);
    if (result.length >= limit) break;
  }

  return result;
}

function bodyTagDefaults(body) {
  if (body?.internalName === "Organic") {
    return ["オーガニックコットン", "organic cotton", "有機棉"];
  }
  if (body?.internalName === "Vintage") {
    return ["ヴィンテージ", "vintage", "復古"];
  }
  if (body?.internalName === "MIJ") {
    return ["日本製", "made in Japan", "日本製造"];
  }
  return [];
}

function generatedPinkoiTags(bodyId, designId) {
  const body = byId(state.bodies, bodyId);
  const design = byId(state.designs, designId);

  return uniqueLimited([
    "Tシャツ",
    "T shirt",
    "T恤",
    ...bodyTagDefaults(body),
    ...(DESIGN_TAGS[design?.internalName] || ["イラスト", "illustration", "插畫", "graphic"])
  ], 10);
}

function effectivePinkoiTags(product) {
  const current = splitCommaList(product?.tags);
  const generated = generatedPinkoiTags(product?.bodyId, product?.designId);

  // Keep user-entered tags first and fill remaining slots with generated tags.
  return uniqueLimited([...current, ...generated], 10).join(", ");
}

function isOrganicBodyId(bodyId) {
  return byId(state.bodies, bodyId)?.internalName === "Organic";
}

function withoutEcoFriendlyOther(value) {
  return splitCommaList(value)
    .filter(x => x !== "環境に優しい商品")
    .join(", ");
}

function effectivePinkoiOther(product) {
  const items = splitCommaList(product?.other);

  if (isOrganicBodyId(product?.bodyId) && !items.includes("環境に優しい商品")) {
    items.unshift("環境に優しい商品");
  }

  return uniqueLimited(items, 5).join(", ");
}

function composePinkoiOther(rawOther, bodyId, ecoChecked) {
  const items = splitCommaList(rawOther)
    .filter(x => x !== "環境に優しい商品");

  if (ecoChecked || isOrganicBodyId(bodyId)) {
    items.unshift("環境に優しい商品");
  }

  return uniqueLimited(items, 5).join(", ");
}


// Existing T-shirt inventory app compatibility layer.
// Pinkoi Inventory names are canonical. Legacy names are used only when
// reading/writing tshirtStock/shared so the old app keeps working unchanged.
const LEGACY_TSHIRT_DESIGN_MAP = {
  "Bigwave": "Bigwave",
  "Share the Pavement": "Share the pavement",
  "Gulls and Lemons": "Gull",
  "Sink": "Sink",
  "Space Odyssey RAY": "Rays",
  "Cherry": "Cherry",
  "Squids Night": "Squids",
  "Whole Ocean Dive Club": "Whole ocean dive club",
  "See You in Water": "See you in water",
  "DEEP": "DEEP",
  "Safe Surf": "Safe Surf",
  "SALTY": "SALTY"
};

const LEGACY_TSHIRT_COLOR_MAP = {
  Organic: {
    "Natural": "ナチュラル",
    "Black": "ブラック",
    "Green": "グリーン",
    "Light Purple": "パープル",
    "Pink": "ピンク",
    "Beige Grey": "ベージュ"
  },
  Vintage: {
    "Vintage Black": "VB",
    "Vintage Navy": "VN",
    "Vintage Light Grey": "VG",
    "Vintage Purple": "VP"
  }
};

let legacyStockState = {
  ready: false,
  designs: {},
  syncing: false,
  lastSyncedAt: null,
  error: ""
};

let legacyReconcileTimer = null;

function canonicalMasterByName(list, internalName) {
  return list.find(item => item.internalName === internalName) || null;
}

function legacyDesignKeyForCanonical(canonicalName) {
  const alias = LEGACY_TSHIRT_DESIGN_MAP[canonicalName];
  if (!alias) return null;

  // If a canonical key already exists in the legacy document, prefer it.
  // Otherwise use the known legacy alias so the old app stays compatible.
  if (legacyStockState.designs?.[canonicalName]) return canonicalName;
  if (legacyStockState.designs?.[alias]) return alias;
  return alias;
}

function legacyMappingForInventoryItem(item) {
  const body = byId(state.bodies, item?.bodyId);
  const design = byId(state.designs, item?.designId);
  const color = byId(state.colors, item?.colorId);

  if (!body || !design || !color) return null;

  const legacyDesign = legacyDesignKeyForCanonical(design.internalName);
  const legacyColor = LEGACY_TSHIRT_COLOR_MAP[body.internalName]?.[color.internalName];
  const size = normalizePinkoiTshirtSize(item.size);

  if (!legacyDesign || !legacyColor || !PINKOI_TSHIRT_SIZES.includes(size)) {
    return null;
  }

  return {
    bodyName: body.internalName,
    designName: design.internalName,
    colorName: color.internalName,
    legacyDesign,
    legacyColor,
    size
  };
}

function setLegacySyncStatus(message, stateName = "") {
  const el = $("#legacySyncStatus");
  if (!el) return;
  el.textContent = message;
  el.dataset.state = stateName;
}

function scheduleLegacyStockReconcile(delay = 180) {
  if (APP_CONFIG.demoMode || !state.user) return;
  clearTimeout(legacyReconcileTimer);
  legacyReconcileTimer = setTimeout(() => {
    reconcileLegacyStockToPinkoi().catch(err => {
      console.error("legacy stock reconcile failed", err);
      legacyStockState.error = err?.message || String(err);
      setLegacySyncStatus("Tシャツ在庫同期エラー", "error");
    });
  }, delay);
}

async function reconcileLegacyStockToPinkoi(force = false) {
  if (APP_CONFIG.demoMode || !state.user || !firebaseApi) return;
  if (!legacyStockState.ready) return;
  if (legacyStockState.syncing && !force) return;
  if (!state.bodies.length || !state.designs.length || !state.colors.length) return;

  legacyStockState.syncing = true;
  setLegacySyncStatus("Tシャツ在庫を同期中…", "syncing");

  try {
    const writes = [];
    let changed = 0;

    for (const [canonicalDesignName] of Object.entries(LEGACY_TSHIRT_DESIGN_MAP)) {
      const designMaster = canonicalMasterByName(state.designs, canonicalDesignName);
      if (!designMaster) continue;

      const legacyDesignKey = legacyDesignKeyForCanonical(canonicalDesignName);
      const legacyDesign = legacyStockState.designs?.[legacyDesignKey];
      if (!legacyDesign) continue;

      for (const [bodyName, colorMap] of Object.entries(LEGACY_TSHIRT_COLOR_MAP)) {
        const bodyMaster = canonicalMasterByName(state.bodies, bodyName);
        if (!bodyMaster) continue;

        // A deleted Design × Body combination must not be recreated by the
        // legacy T-shirt stock realtime sync.
        if (Array.isArray(designMaster.disabledBodyNames) &&
            designMaster.disabledBodyNames.includes(bodyName)) {
          continue;
        }

        for (const [canonicalColorName, legacyColorName] of Object.entries(colorMap)) {
          const colorMaster = canonicalMasterByName(state.colors, canonicalColorName);
          if (!colorMaster) continue;

          const disabledInventoryKey = `${bodyName}__${canonicalColorName}`;
          if (Array.isArray(designMaster.disabledInventoryKeys) &&
              designMaster.disabledInventoryKeys.includes(disabledInventoryKey)) {
            continue;
          }

          for (const size of PINKOI_TSHIRT_SIZES) {
            const legacyStock = Number(legacyDesign.stock?.[legacyColorName]?.[size] ?? 0);

            const existing = state.inventory.find(v =>
              v.bodyId === bodyMaster.id &&
              v.designId === designMaster.id &&
              v.colorId === colorMaster.id &&
              normalizePinkoiTshirtSize(v.size) === size
            );

            // Do not create hundreds of empty variants. Existing variants are
            // still pulled to zero when the legacy stock becomes zero.
            if (!existing && legacyStock === 0) continue;
            if (existing && Number(existing.stock || 0) === legacyStock) continue;

            const item = {
              id: existing?.id || `legacy_${cleanSkuPart(bodyMaster.code || bodyName)}_${cleanSkuPart(designMaster.code || canonicalDesignName)}_${cleanSkuPart(colorMaster.code || canonicalColorName)}_${cleanSkuPart(size)}`,
              bodyId: bodyMaster.id,
              designId: designMaster.id,
              colorId: colorMaster.id,
              size,
              sku: existing?.sku || `${generatedSkuPrefix(bodyMaster.id, designMaster.id, colorMaster.id)}_${cleanSkuPart(size)}`,
              stock: legacyStock,
              pinkoiStock: Number(existing?.pinkoiStock || 0),
              priceJpy: Number(existing?.priceJpy || 0),
              pinkoiProductId: existing?.pinkoiProductId || "",
              updatedAt: new Date().toISOString(),
              stockSource: "tshirtStock/shared"
            };

            writes.push(
              firebaseApi.setDoc(
                firebaseApi.doc(firebaseApi.db, FIRESTORE_COLLECTIONS.inventory, item.id),
                item,
                { merge: true }
              )
            );
            changed++;
          }
        }
      }
    }

    if (writes.length) await Promise.all(writes);

    legacyStockState.lastSyncedAt = new Date();
    legacyStockState.error = "";
    const time = legacyStockState.lastSyncedAt.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
    setLegacySyncStatus(`Tシャツ在庫 同期済み ${time}${changed ? ` / ${changed}件更新` : ""}`, "ok");
  } finally {
    legacyStockState.syncing = false;
  }
}

async function ensureLegacyStockLoaded() {
  if (legacyStockState.ready) return true;
  if (!firebaseApi || !state.user) return false;

  const ref = firebaseApi.doc(firebaseApi.db, "tshirtStock", "shared");
  const snap = await firebaseApi.getDoc(ref);
  if (!snap.exists()) return false;

  legacyStockState.designs = snap.data()?.designs || {};
  legacyStockState.ready = true;
  return true;
}

async function syncInventoryItemToLegacy(item) {
  if (APP_CONFIG.demoMode || !firebaseApi || !state.user) return;

  const mapping = legacyMappingForInventoryItem(item);
  if (!mapping) return; // MIJ and unmapped designs stay Pinkoi-only.

  try {
    const loaded = await ensureLegacyStockLoaded();
    if (!loaded) return;

    // Do not create a malformed design object in the old app. Sync only
    // designs that are already present in tshirtStock/shared.
    if (!legacyStockState.designs?.[mapping.legacyDesign]) return;

    const ref = firebaseApi.doc(firebaseApi.db, "tshirtStock", "shared");
    const field = new firebaseApi.FieldPath(
      "designs",
      mapping.legacyDesign,
      "stock",
      mapping.legacyColor,
      mapping.size
    );

    await firebaseApi.updateDoc(
      ref,
      field,
      Math.max(0, Number(item.stock || 0)),
      "updatedAt",
      firebaseApi.serverTimestamp()
    );
  } catch (err) {
    console.error("legacy stock push failed", err);
    legacyStockState.error = err?.message || String(err);
    setLegacySyncStatus("Tシャツ在庫 書き込みエラー", "error");
  }
}

function startLegacyStockRealtime() {
  const ref = firebaseApi.doc(firebaseApi.db, "tshirtStock", "shared");

  const unsub = firebaseApi.onSnapshot(ref, snap => {
    if (!snap.exists()) {
      legacyStockState.ready = false;
      legacyStockState.designs = {};
      setLegacySyncStatus("旧Tシャツ在庫データがありません", "error");
      return;
    }

    legacyStockState.designs = snap.data()?.designs || {};
    legacyStockState.ready = true;
    legacyStockState.error = "";
    scheduleLegacyStockReconcile(80);
  }, err => {
    console.error("legacy tshirt stock snapshot failed", err);
    legacyStockState.ready = false;
    legacyStockState.error = err?.message || String(err);
    setLegacySyncStatus("Tシャツ在庫 同期エラー", "error");
  });

  unsubscribers.push(unsub);
}

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
let XLSXLib = null;
let selectedPinkoiProductKeys = new Set();
let selectedInventoryColorKeys = new Set();

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
      legacyStockState.ready = false;
      legacyStockState.designs = {};
      legacyStockState.error = "";
      setLegacySyncStatus("ログインするとTシャツ在庫と同期します");
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

      if (["bodies", "designs", "colors", "inventory"].includes(name)) {
        scheduleLegacyStockReconcile();
      }
    }, err => {
      console.error(err);
      showToast("Firestoreの読み込みに失敗しました");
    });
    unsubscribers.push(unsub);
  };

  ["bodies","designs","colors","inventory","pinkoiProducts"].forEach(watch);
  startLegacyStockRealtime();
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

  if (collectionName === "inventory") {
    await syncInventoryItemToLegacy(item);
  }
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

function variantPriceJpy(v) {
  // Legacy priceTwd values must never be treated as JPY.
  return Number(v?.priceJpy ?? 0);
}

function productPriceJpy(p, fallbackVariant = null, bodyId = null) {
  // Pinkoi v2.1 template price is JPY.
  // Do not fall back to old TWD values.
  const productPrice = Number(p?.priceJpy ?? 0);
  if (productPrice > 0) return productPrice;

  const variantPrice = variantPriceJpy(fallbackVariant);
  if (variantPrice > 0) return variantPrice;

  return defaultPinkoiPriceJpy(
    bodyId || p?.bodyId || fallbackVariant?.bodyId || ""
  );
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
  renderTaskFilters();
  renderInventory();
  renderStockTasks();
  renderSizeCharts();
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


function renderTaskFilters() {
  const select = $("#taskBodyFilter");
  if (!select) return;

  const current = select.value;
  select.innerHTML =
    `<option value="">All Bodies</option>` +
    state.bodies.map(b =>
      `<option value="${esc(b.id)}">${esc(b.internalName)}</option>`
    ).join("");

  if (current && state.bodies.some(b => b.id === current)) {
    select.value = current;
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



function inventoryColorKey(bodyId, designId, colorId) {
  return `${bodyId}__${designId}__${colorId}`;
}

function inventoryColorParts(key) {
  const [bodyId, designId, colorId] = String(key || "").split("__");
  return { bodyId, designId, colorId };
}

function visibleInventoryColorKeys() {
  const keys = new Set();
  filteredInventory().forEach(v => {
    keys.add(inventoryColorKey(v.bodyId, v.designId, v.colorId));
  });
  return [...keys];
}

function updateInventorySelectionCount() {
  const el = $("#inventorySelectedCount");
  if (el) el.textContent = selectedInventoryColorKeys.size;
}

function selectVisibleInventoryProducts() {
  visibleInventoryColorKeys().forEach(key => selectedInventoryColorKeys.add(key));
  updateInventorySelectionCount();
  renderInventory();
}

function clearInventorySelection() {
  selectedInventoryColorKeys.clear();
  updateInventorySelectionCount();
  renderInventory();
}

async function clearInventoryDeletionBlock(bodyId, designId, colorId) {
  const design = byId(state.designs, designId);
  const body = byId(state.bodies, bodyId);
  const color = byId(state.colors, colorId);
  if (!design || !body || !color) return;

  const bodyName = body.internalName;
  const colorName = color.internalName;
  const currentKey = `${bodyName}__${colorName}`;

  const disabledBodies = new Set(
    Array.isArray(design.disabledBodyNames) ? design.disabledBodyNames : []
  );
  const disabledKeys = new Set(
    Array.isArray(design.disabledInventoryKeys) ? design.disabledInventoryKeys : []
  );

  let changed = false;

  // Compatibility with the previous Design × Body deletion version.
  // If that older block exists, convert it to color-level blocks so only the
  // color being manually restored becomes active again.
  if (disabledBodies.has(bodyName)) {
    disabledBodies.delete(bodyName);

    Object.keys(LEGACY_TSHIRT_COLOR_MAP[bodyName] || {}).forEach(name => {
      disabledKeys.add(`${bodyName}__${name}`);
    });

    changed = true;
  }

  if (disabledKeys.delete(currentKey)) {
    changed = true;
  }

  if (!changed) return;

  const payload = {
    disabledBodyNames: [...disabledBodies],
    disabledInventoryKeys: [...disabledKeys],
    updatedAt: new Date().toISOString()
  };

  if (APP_CONFIG.demoMode) {
    design.disabledBodyNames = payload.disabledBodyNames;
    design.disabledInventoryKeys = payload.disabledInventoryKeys;
    localSave();
    return;
  }

  await firebaseApi.setDoc(
    firebaseApi.doc(firebaseApi.db, FIRESTORE_COLLECTIONS.designs, design.id),
    payload,
    { merge: true }
  );

  design.disabledBodyNames = payload.disabledBodyNames;
  design.disabledInventoryKeys = payload.disabledInventoryKeys;
}

function selectedInventoryVariants() {
  if (!selectedInventoryColorKeys.size) return [];

  return state.inventory.filter(v =>
    selectedInventoryColorKeys.has(
      inventoryColorKey(v.bodyId, v.designId, v.colorId)
    )
  );
}

async function bulkSetSelectedPinkoiStock(mode) {
  const variants = selectedInventoryVariants();

  if (!variants.length) {
    alert("処理するDesign × Colorを選択してください。");
    return;
  }

  const label = mode === "zero"
    ? "選択したDesign × ColorのPinkoi在庫をすべて0にしますか？"
    : "選択したDesign × ColorのPinkoi在庫を実在庫と同じ数に揃えますか？";

  if (!confirm(label)) return;

  let changed = 0;

  if (APP_CONFIG.demoMode) {
    for (const v of variants) {
      const nextPinkoi = mode === "zero" ? 0 : Math.max(0, Number(v.stock || 0));
      if (Number(v.pinkoiStock || 0) === nextPinkoi) continue;
      v.pinkoiStock = nextPinkoi;
      v.updatedAt = new Date().toISOString();
      changed++;
    }

    localSave();
    render();
    showToast(`${changed}件のPinkoi在庫を更新しました`);
    return;
  }

  const writes = [];

  for (const v of variants) {
    const nextPinkoi = mode === "zero" ? 0 : Math.max(0, Number(v.stock || 0));
    if (Number(v.pinkoiStock || 0) === nextPinkoi) continue;

    writes.push(
      firebaseApi.setDoc(
        firebaseApi.doc(firebaseApi.db, FIRESTORE_COLLECTIONS.inventory, v.id),
        {
          pinkoiStock: nextPinkoi,
          updatedAt: new Date().toISOString()
        },
        { merge: true }
      )
    );
    changed++;
  }

  if (writes.length) await Promise.all(writes);
  showToast(`${changed}件のPinkoi在庫を更新しました`);
}

async function deleteSelectedInventoryProducts() {
  if (!selectedInventoryColorKeys.size) {
    alert("削除するDesign × Colorを選択してください。");
    return;
  }

  const selected = [...selectedInventoryColorKeys].map(key => ({
    key,
    ...inventoryColorParts(key)
  }));

  const labels = selected.map(({ bodyId, designId, colorId }) => {
    const body = byId(state.bodies, bodyId)?.internalName || "?";
    const design = byId(state.designs, designId)?.internalName || "?";
    const color = byId(state.colors, colorId)?.internalName || "?";
    return `${design} / ${color} / ${body}`;
  });

  const ok = confirm(
    `選択した ${selected.length} 件のDesign × Colorを削除します。\n\n` +
    `${labels.slice(0, 10).join("\n")}${labels.length > 10 ? "\n…" : ""}\n\n` +
    `選択カラーの全サイズ在庫をPinkoi Inventoryから削除します。\n` +
    `同じDesignに他のカラーが残っている場合、Pinkoi商品情報は残します。\n` +
    `旧Tシャツ在庫アプリの実在庫は削除しません。\n` +
    `Pinkoiサイト本体の商品も削除されません。`
  );
  if (!ok) return;

  const selectedSet = new Set(selected.map(x => x.key));

  const shouldDeleteVariant = v =>
    selectedSet.has(inventoryColorKey(v.bodyId, v.designId, v.colorId));

  // Save color-level sync exclusions first so the old inventory app cannot
  // recreate the deleted combinations.
  const designUpdates = new Map();

  for (const { bodyId, designId, colorId } of selected) {
    const body = byId(state.bodies, bodyId);
    const design = byId(state.designs, designId);
    const color = byId(state.colors, colorId);
    if (!body || !design || !color) continue;

    if (!designUpdates.has(designId)) {
      designUpdates.set(designId, {
        design,
        disabledBodyNames: new Set(
          Array.isArray(design.disabledBodyNames) ? design.disabledBodyNames : []
        ),
        disabledInventoryKeys: new Set(
          Array.isArray(design.disabledInventoryKeys) ? design.disabledInventoryKeys : []
        )
      });
    }

    designUpdates.get(designId).disabledInventoryKeys.add(
      `${body.internalName}__${color.internalName}`
    );
  }

  const remainingInventory = state.inventory.filter(v => !shouldDeleteVariant(v));

  // pinkoiProducts is a Body × Design record, so delete that record only when
  // the last color for that Body × Design has been removed.
  const productKeysWithRemainingVariants = new Set(
    remainingInventory.map(v => `${v.bodyId}__${v.designId}`)
  );

  const productsToDelete = state.pinkoiProducts.filter(p =>
    !productKeysWithRemainingVariants.has(`${p.bodyId}__${p.designId}`) &&
    selected.some(x => x.bodyId === p.bodyId && x.designId === p.designId)
  );

  if (APP_CONFIG.demoMode) {
    for (const update of designUpdates.values()) {
      update.design.disabledBodyNames = [...update.disabledBodyNames];
      update.design.disabledInventoryKeys = [...update.disabledInventoryKeys];
    }

    state.inventory = remainingInventory;
    const deleteIds = new Set(productsToDelete.map(p => p.id));
    state.pinkoiProducts = state.pinkoiProducts.filter(p => !deleteIds.has(p.id));

    selectedInventoryColorKeys.clear();
    localSave();
    render();
    showToast(`${selected.length}件のDesign × Colorを削除しました`);
    return;
  }

  for (const [designId, update] of designUpdates.entries()) {
    const payload = {
      disabledBodyNames: [...update.disabledBodyNames],
      disabledInventoryKeys: [...update.disabledInventoryKeys],
      updatedAt: new Date().toISOString()
    };

    await firebaseApi.setDoc(
      firebaseApi.doc(firebaseApi.db, FIRESTORE_COLLECTIONS.designs, designId),
      payload,
      { merge: true }
    );

    update.design.disabledBodyNames = payload.disabledBodyNames;
    update.design.disabledInventoryKeys = payload.disabledInventoryKeys;
  }

  const inventoryToDelete = state.inventory.filter(shouldDeleteVariant);

  const deletions = [
    ...inventoryToDelete.map(v =>
      firebaseApi.deleteDoc(
        firebaseApi.doc(firebaseApi.db, FIRESTORE_COLLECTIONS.inventory, v.id)
      )
    ),
    ...productsToDelete.map(p =>
      firebaseApi.deleteDoc(
        firebaseApi.doc(firebaseApi.db, FIRESTORE_COLLECTIONS.pinkoiProducts, p.id)
      )
    )
  ];

  if (deletions.length) await Promise.all(deletions);

  selectedInventoryColorKeys.clear();
  updateInventorySelectionCount();
  showToast(`${selected.length}件のDesign × Colorを削除しました`);
}

function renderInventory() {
  const variants = filteredInventory();
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const bodyFilter = $("#bodyFilter").value;

  if (!variants.length) {
    $("#inventoryRows").innerHTML =
      `<tr><td colspan="8" class="muted">在庫データがありません</td></tr>`;
    updateInventorySelectionCount();
    return;
  }

  const productGroups = new Map();

  for (const v of variants) {
    const productKey = `${v.bodyId}__${v.designId}`;

    if (!productGroups.has(productKey)) {
      productGroups.set(productKey, {
        bodyId: v.bodyId,
        designId: v.designId,
        colors: new Map()
      });
    }

    const product = productGroups.get(productKey);

    if (!product.colors.has(v.colorId)) {
      product.colors.set(v.colorId, new Map());
    }

    product.colors.get(v.colorId).set(
      String(v.size || "").toUpperCase(),
      v
    );
  }

  const products = [...productGroups.values()].sort((a, b) => {
    const bodyA = byId(state.bodies, a.bodyId)?.internalName || "";
    const bodyB = byId(state.bodies, b.bodyId)?.internalName || "";
    const designA = byId(state.designs, a.designId)?.internalName || "";
    const designB = byId(state.designs, b.designId)?.internalName || "";

    return bodyA.localeCompare(bodyB) || designA.localeCompare(designB);
  });

  let currentBodyId = null;
  const html = [];

  for (const product of products) {
    const body = byId(state.bodies, product.bodyId);
    const design = byId(state.designs, product.designId);

    if (!bodyFilter && product.bodyId !== currentBodyId) {
      currentBodyId = product.bodyId;
      html.push(`
        <tr class="body-section-row">
          <td colspan="8">${esc(body?.internalName || "Body")}</td>
        </tr>
      `);
    }

    const colorRows = [...product.colors.entries()].sort(([colorA], [colorB]) => {
      const a = byId(state.colors, colorA)?.internalName || "";
      const b = byId(state.colors, colorB)?.internalName || "";
      return a.localeCompare(b);
    });

    colorRows.forEach(([colorId, variantsBySize], index) => {
      const color = byId(state.colors, colorId);
      const selectionKey = inventoryColorKey(
        product.bodyId,
        product.designId,
        colorId
      );
      const selected = selectedInventoryColorKeys.has(selectionKey);

      const sizeCells = sizes.map(size => {
        const v = variantsBySize.get(size);

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
        <tr class="${selected ? "inventory-row-selected" : ""}">
          <td class="inventory-select-cell">
            <input
              class="inventory-design-checkbox"
              type="checkbox"
              data-select-inventory-product
              data-key="${esc(selectionKey)}"
              ${selected ? "checked" : ""}
              aria-label="${esc(design?.internalName || "Design")} / ${esc(color?.internalName || "Color")}を選択"
            >
          </td>
          ${index === 0
            ? `<td class="design-cell" rowspan="${colorRows.length}">${esc(design?.internalName || "?")}</td>`
            : ""}
          <td class="color-cell">${esc(color?.internalName || "?")}</td>
          ${sizeCells}
        </tr>
      `);
    });
  }

  $("#inventoryRows").innerHTML = html.join("");
  updateInventorySelectionCount();
}


function stockTaskRows() {
  const q = ($("#taskSearchInput")?.value || "").trim().toLowerCase();
  const bodyFilter = $("#taskBodyFilter")?.value || "";
  const typeFilter = $("#taskTypeFilter")?.value || "all";

  return state.inventory
    .map(v => {
      const body = byId(state.bodies, v.bodyId);
      const design = byId(state.designs, v.designId);
      const color = byId(state.colors, v.colorId);
      const stock = Number(v.stock || 0);
      const pinkoi = Number(v.pinkoiStock || 0);

      let taskType = "ok";
      if (stock < pinkoi) taskType = "production";
      else if (stock > pinkoi) taskType = "increase";

      const soldOut = stock === 0;

      return {
        ...v,
        body,
        design,
        color,
        stock,
        pinkoi,
        taskType,
        soldOut,
        difference: Math.abs(stock - pinkoi)
      };
    })
    .filter(v => {
      if (bodyFilter && v.bodyId !== bodyFilter) return false;

      if (typeFilter === "production" && v.taskType !== "production") return false;
      if (typeFilter === "increase" && v.taskType !== "increase") return false;
      if (typeFilter === "soldout" && !v.soldOut) return false;
      if (typeFilter === "all" && v.taskType === "ok" && !v.soldOut) return false;

      if (!q) return true;

      const hay = [
        v.body?.internalName,
        v.design?.internalName,
        v.color?.internalName,
        v.size,
        v.sku
      ].filter(Boolean).join(" ").toLowerCase();

      return hay.includes(q);
    });
}

function renderStockTasks() {
  if (!$("#tasksTab")) return;

  const all = state.inventory.map(v => ({
    ...v,
    stockNum: Number(v.stock || 0),
    pinkoiNum: Number(v.pinkoiStock || 0)
  }));

  const needsUpdate = all.filter(v => v.stockNum !== v.pinkoiNum).length;
  const productionCount = all.filter(v => v.stockNum < v.pinkoiNum).length;
  const increaseCount = all.filter(v => v.stockNum > v.pinkoiNum).length;
  const soldOutCount = all.filter(v => v.stockNum === 0).length;

  $("#taskNeedsUpdate").textContent = needsUpdate;
  $("#taskProductionCount").textContent = productionCount;
  $("#taskCanIncreaseCount").textContent = increaseCount;
  $("#taskSoldOutCount").textContent = soldOutCount;

  const rows = stockTaskRows();

  const production = rows
    .filter(v => v.taskType === "production")
    .sort((a, b) =>
      (b.pinkoi - b.stock) - (a.pinkoi - a.stock) ||
      (a.design?.internalName || "").localeCompare(b.design?.internalName || "")
    );

  const increase = rows
    .filter(v => v.taskType === "increase")
    .sort((a, b) =>
      (b.stock - b.pinkoi) - (a.stock - a.pinkoi) ||
      (a.design?.internalName || "").localeCompare(b.design?.internalName || "")
    );

  const makeRows = (items, mode) => items.map(v => {
    const delta = mode === "production"
      ? v.pinkoi - v.stock
      : v.stock - v.pinkoi;

    return `
      <tr>
        <td>${esc(v.body?.internalName || "?")}</td>
        <td>${esc(v.design?.internalName || "?")}</td>
        <td>${esc(v.color?.internalName || "?")}</td>
        <td>${esc(v.size || "")}</td>
        <td>${v.stock}</td>
        <td>${v.pinkoi}</td>
        <td class="${mode === "production" ? "status-warn" : "status-ok"}">${delta}</td>
        <td>
          <button class="link-button" data-edit-variant="${esc(v.id)}">編集</button>
        </td>
      </tr>
    `;
  }).join("");

  $("#productionTaskRows").innerHTML =
    makeRows(production, "production") ||
    `<tr><td colspan="8" class="muted">制作候補はありません</td></tr>`;

  $("#increaseTaskRows").innerHTML =
    makeRows(increase, "increase") ||
    `<tr><td colspan="8" class="muted">Pinkoi在庫を増やせる商品はありません</td></tr>`;
}


const SIZE_CHART_FIELDS = [
  { key: "shoulder", label: "A 肩幅" },
  { key: "width", label: "B バスト" },
  { key: "length", label: "C 身丈" },
  { key: "sleeve", label: "D 袖丈" }
];

function sizeChartValue(body, size, key) {
  const saved = body?.sizeChart?.[size]?.[key];
  if (saved !== undefined && saved !== null && saved !== "") return saved;

  const defaults = defaultSizeChartForBody(body);
  const fallback = defaults?.sizeChart?.[size]?.[key];
  return fallback === undefined || fallback === null ? "" : fallback;
}

function renderSizeCharts() {
  const target = $("#sizeChartCards");
  if (!target) return;

  const sizes = APP_CONFIG.sizes || ["S", "M", "L", "XL", "XXL"];

  target.innerHTML = state.bodies.map(body => {
    const rows = sizes.map(size => `
      <tr>
        <th>${esc(size)}</th>
        <td>${esc(sizeChartValue(body, size, "shoulder") || "—")}</td>
        <td>${esc(sizeChartValue(body, size, "width") || "—")}</td>
        <td>${esc(sizeChartValue(body, size, "length") || "—")}</td>
        <td>${esc(sizeChartValue(body, size, "sleeve") || "—")}</td>
      </tr>
    `).join("");

    return `
      <article class="size-chart-card">
        <div class="section-title">
          <div>
            <h2>${esc(body.internalName)}</h2>
            <p class="muted">${esc(displayName(body, "en") || "")}</p>
          </div>
          <button class="button secondary small"
                  data-edit-size-chart="${esc(body.id)}">
            サイズ表を編集
          </button>
        </div>

        <div class="table-wrap">
          <table class="size-chart-display-table pinkoi-size-chart">
            <thead>
              <tr>
                <th>仕様</th>
                <th>A 肩幅</th>
                <th>B バスト</th>
                <th>C 身丈</th>
                <th>D 袖丈</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>

        <p class="muted size-chart-note">
          Pinkoi入力順：A 肩幅 / B バスト / C 身丈 / D 袖丈
        </p>
      </article>
    `;
  }).join("") || `<div class="muted">Bodyが登録されていません。</div>`;
}

async function applyDefaultSizeCharts() {
  const targets = state.bodies.filter(body => defaultSizeChartForBody(body));

  if (!targets.length) {
    alert("対象Bodyがありません。");
    return;
  }

  const confirmed = confirm(
    "Organic / Vintage / MIJ にメーカー標準サイズを反映します。\n現在のサイズ表はメーカー標準値で上書きされます。"
  );
  if (!confirmed) return;

  const btn = $("#applyDefaultSizeChartsBtn");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "反映中...";
  }

  try {
    for (const body of targets) {
      const defaults = defaultSizeChartForBody(body);

      await saveCollectionItem("bodies", {
        ...body,
        bodyModel: defaults.model,
        sizeChartSource: defaults.source,
        sizeChart: JSON.parse(JSON.stringify(defaults.sizeChart)),
        updatedAt: new Date().toISOString()
      });
    }

    showToast("メーカー標準サイズを反映しました");
  } catch (err) {
    console.error(err);
    alert("サイズ表の反映に失敗しました。");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = "メーカー標準サイズを反映";
    }
  }
}

function openSizeChartDialog(bodyId) {
  const body = byId(state.bodies, bodyId);
  if (!body) return;

  const sizes = APP_CONFIG.sizes || ["S", "M", "L", "XL", "XXL"];

  $("#sizeChartBodyId").value = bodyId;
  $("#sizeChartDialogBodyName").textContent =
    `${body.internalName} / ${displayName(body, "en") || ""}`;

  $("#sizeChartEditRows").innerHTML = sizes.map(size => `
    <tr data-size="${esc(size)}">
      <th>${esc(size)}</th>
      ${SIZE_CHART_FIELDS.map(field => `
        <td>
          <input
            type="number"
            step="0.1"
            min="0"
            data-size-field="${esc(field.key)}"
            value="${esc(sizeChartValue(body, size, field.key))}"
            placeholder="cm"
          >
        </td>
      `).join("")}
    </tr>
  `).join("");

  $("#sizeChartDialog").showModal();
}

async function submitSizeChart(e) {
  e.preventDefault();

  const bodyId = $("#sizeChartBodyId").value;
  const body = byId(state.bodies, bodyId);
  if (!body) return;

  const sizeChart = {};

  for (const row of $$("#sizeChartEditRows tr[data-size]")) {
    const size = row.dataset.size;
    const values = {};
    let hasValue = false;

    row.querySelectorAll("[data-size-field]").forEach(input => {
      const key = input.dataset.sizeField;
      const raw = input.value.trim();

      if (raw !== "") {
        values[key] = Number(raw);
        hasValue = true;
      }
    });

    if (hasValue) sizeChart[size] = values;
  }

  await saveCollectionItem("bodies", {
    ...body,
    sizeChart,
    updatedAt: new Date().toISOString()
  });

  $("#sizeChartDialog").close();
  showToast("サイズ表を保存しました");
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
  return product?.titleEn?.trim() || product?.customTitle?.trim() || generatedTitle(bodyId, designId, "en");
}

function pinkoiStatusLabel(status) {
  if (status === "selling") return "Selling";
  if (status === "hidden") return "Hidden";
  return "Draft";
}

function updateShippingLeadTimeUi(orderType, preserveValue = true) {
  const type = orderType === "general" ? "general" : "madeToOrder";
  const input = $("#pinkoiShipDays");
  const label = $("#pinkoiShipDaysLabel");

  if (type === "general") {
    label.textContent = "一般注文 発送までの日数";
    input.min = "0";
    input.max = "5";
    input.placeholder = "0〜5";

    if (!preserveValue || Number(input.value) > 5 || Number(input.value) < 0 || input.value === "") {
      input.value = "3";
    }
  } else {
    label.textContent = "受注制作 発送までの日数";
    input.min = "1";
    input.max = "90";
    input.placeholder = "1〜90";

    if (!preserveValue || Number(input.value) < 1 || Number(input.value) > 90 || input.value === "") {
      input.value = "14";
    }
  }
}

function openProductInventoryDialog(bodyId, designId) {
  const body = byId(state.bodies, bodyId);
  const design = byId(state.designs, designId);
  const colors = allowedColorsForBody(bodyId);
  const sizes = APP_CONFIG.sizes || ["S", "M", "L", "XL", "XXL"];

  $("#productInventoryBodyId").value = bodyId;
  $("#productInventoryDesignId").value = designId;
  $("#productInventoryLabel").textContent =
    `${design?.internalName || "?"} / ${body?.internalName || "?"}`;

  $("#productInventoryHead").innerHTML = `
    <tr>
      <th>Color</th>
      ${sizes.map(size => `<th class="size-head">${esc(size)}</th>`).join("")}
    </tr>
  `;

  $("#productInventoryRows").innerHTML = colors.map(color => {
    const cells = sizes.map(size => {
      const existing = state.inventory.find(v =>
        v.bodyId === bodyId &&
        v.designId === designId &&
        v.colorId === color.id &&
        String(v.size || "").toUpperCase() === String(size).toUpperCase()
      );

      return `
        <td class="product-stock-cell" data-color-id="${esc(color.id)}" data-size="${esc(size)}">
          <div class="dual-stock-input">
            <input type="number" min="0" value="${Number(existing?.stock || 0)}" data-product-stock title="実在庫">
            <input type="number" min="0" value="${Number(existing?.pinkoiStock || 0)}" data-product-pinkoi-stock title="Pinkoi掲載在庫">
          </div>
        </td>
      `;
    }).join("");

    return `<tr><td class="color-cell">${esc(color.internalName)}</td>${cells}</tr>`;
  }).join("");

  $("#productInventoryDialog").showModal();
}

async function submitProductInventory(e) {
  e.preventDefault();

  const bodyId = $("#productInventoryBodyId").value;
  const designId = $("#productInventoryDesignId").value;
  const body = byId(state.bodies, bodyId);
  const design = byId(state.designs, designId);
  let saved = 0;

  for (const cell of $$("#productInventoryRows .product-stock-cell")) {
    const colorId = cell.dataset.colorId;
    const size = cell.dataset.size;
    const stock = Number(cell.querySelector("[data-product-stock]").value || 0);
    const pinkoiStock = Number(cell.querySelector("[data-product-pinkoi-stock]").value || 0);

    const existing = state.inventory.find(v =>
      v.bodyId === bodyId &&
      v.designId === designId &&
      v.colorId === colorId &&
      String(v.size || "").toUpperCase() === String(size).toUpperCase()
    );

    if (!existing && stock === 0 && pinkoiStock === 0) continue;

    await clearInventoryDeletionBlock(bodyId, designId, colorId);

    const color = byId(state.colors, colorId);
    const sku = existing?.sku ||
      `TS_${cleanSkuPart(body?.code || body?.internalName)}_${cleanSkuPart(design?.code || design?.internalName)}_${cleanSkuPart(color?.code || color?.internalName)}_${cleanSkuPart(size)}`;

    await saveCollectionItem("inventory", {
      id: existing?.id || slug(),
      bodyId,
      designId,
      colorId,
      size,
      sku,
      stock,
      pinkoiStock,
      priceJpy: existing?.priceJpy ?? 0,
      pinkoiProductId: existing?.pinkoiProductId || "",
      updatedAt: new Date().toISOString()
    });
    saved++;
  }

  $("#productInventoryDialog").close();
  showToast(`${saved}件の在庫を保存しました`);
}


function normalizedPinkoiTshirtCategory(value) {
  const category = String(value || "").trim();

  if (
    !category ||
    category === "ファッション > Tシャツ - 1" ||
    category === "ファッション > Tシャツ メンズ - 16" ||
    category === "Tシャツ" ||
    category === "Tシャツ メンズ"
  ) {
    return "ファッション > Tシャツ - 1";
  }

  return category;
}


function buildDefaultPinkoiProduct(bodyId, designId) {
  const id = pinkoiProductKey(bodyId, designId);

  return {
    id,
    bodyId,
    designId,

    titleJa: generatedTitle(bodyId, designId, "ja"),
    titleEn: generatedTitle(bodyId, designId, "en"),
    titleZh: generatedTitle(bodyId, designId, "zhTW"),
    customTitle: generatedTitle(bodyId, designId, "en"),

    pinkoiProductId: "",
    priceJpy: defaultPinkoiPriceJpy(bodyId),

    category: "ファッション > Tシャツ - 1",
    productionMethod: "工場生産",
    origin: "JP 日本",
    orderType: "general",
    shipDays: 3,
    material: "コットン",
    target: "ユニセックス",
    shippingPlan: "Tシャツ発送",
    other: composePinkoiOther("", bodyId, isOrganicBodyId(bodyId)),
    imageUrls: "",
    tags: effectivePinkoiTags({ bodyId, designId }),

    highlightJa: pinkoiCopyValue(null, "highlightJa", bodyId),
    descriptionJa: pinkoiCopyValue(null, "descriptionJa", bodyId),
    highlightEn: pinkoiCopyValue(null, "highlightEn", bodyId),
    descriptionEn: pinkoiCopyValue(null, "descriptionEn", bodyId),
    highlightZh: pinkoiCopyValue(null, "highlightZh", bodyId),
    descriptionZh: pinkoiCopyValue(null, "descriptionZh", bodyId),

    status: "draft",
    note: "",
    updatedAt: new Date().toISOString()
  };
}

async function ensurePinkoiProduct(bodyId, designId) {
  const existing = getPinkoiProduct(bodyId, designId);
  if (existing) {
    // Fill a missing/zero price with the Body default without overwriting
    // an explicitly saved non-zero price.
    if (Number(existing.priceJpy || 0) <= 0) {
      const nextPrice = defaultPinkoiPriceJpy(bodyId);

      if (APP_CONFIG.demoMode) {
        existing.priceJpy = nextPrice;
        localSave();
      } else {
        await firebaseApi.setDoc(
          firebaseApi.doc(
            firebaseApi.db,
            FIRESTORE_COLLECTIONS.pinkoiProducts,
            existing.id
          ),
          {
            priceJpy: nextPrice,
            updatedAt: new Date().toISOString()
          },
          { merge: true }
        );
      }

      existing.priceJpy = nextPrice;
    }

    return existing;
  }

  const item = buildDefaultPinkoiProduct(bodyId, designId);
  await saveCollectionItem("pinkoiProducts", item);

  // Keep local state immediately usable while Firestore snapshot catches up.
  if (!state.pinkoiProducts.some(p => p.id === item.id)) {
    state.pinkoiProducts.push(item);
  }

  return item;
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
    `Auto EN: ${generatedTitle(bodyId, designId, "en")}`;

  $("#pinkoiTitleJa").value =
    product?.titleJa || generatedTitle(bodyId, designId, "ja");

  $("#pinkoiTitleEn").value =
    product?.titleEn || product?.customTitle || generatedTitle(bodyId, designId, "en");

  $("#pinkoiTitleZh").value =
    product?.titleZh || generatedTitle(bodyId, designId, "zhTW");

  $("#pinkoiProductId").value = product?.pinkoiProductId || "";
  $("#pinkoiProductPrice").value = productPriceJpy(product, null, bodyId);

  $("#pinkoiCategory").value =
    normalizedPinkoiTshirtCategory(product?.category);

  $("#pinkoiProductionMethod").value =
    product?.productionMethod || "工場生産";

  const savedOrigin = product?.origin || "";
  $("#pinkoiOrigin").value =
    savedOrigin === "日本" || savedOrigin === "Japan" || !savedOrigin
      ? "JP 日本"
      : savedOrigin;

  const orderType = product
    ? (product.orderType === "madeToOrder" ? "madeToOrder" : "general")
    : "general";
  $("#pinkoiOrderType").value = orderType;
  $("#pinkoiShipDays").value = product?.shipDays ?? (orderType === "general" ? 3 : 14);
  updateShippingLeadTimeUi(orderType, true);

  $("#pinkoiMaterial").value = product?.material || "コットン";
  $("#pinkoiTarget").value = product?.target || "ユニセックス";
  $("#pinkoiShippingPlan").value = product?.shippingPlan || "Tシャツ発送";
  $("#pinkoiOther").value = withoutEcoFriendlyOther(product?.other || "");
  $("#pinkoiEcoFriendly").checked =
    isOrganicBodyId(bodyId) ||
    splitCommaList(product?.other).includes("環境に優しい商品");

  $("#pinkoiImageUrls").value = product?.imageUrls || "";
  $("#pinkoiTags").value = effectivePinkoiTags({
    ...(product || {}),
    bodyId,
    designId
  });

  $("#pinkoiHighlightJa").value = pinkoiCopyValue(product, "highlightJa", bodyId);
  $("#pinkoiDescriptionJa").value = pinkoiCopyValue(product, "descriptionJa", bodyId);
  $("#pinkoiHighlightEn").value = pinkoiCopyValue(product, "highlightEn", bodyId);
  $("#pinkoiDescriptionEn").value = pinkoiCopyValue(product, "descriptionEn", bodyId);
  $("#pinkoiHighlightZh").value = pinkoiCopyValue(product, "highlightZh", bodyId);
  $("#pinkoiDescriptionZh").value = pinkoiCopyValue(product, "descriptionZh", bodyId);

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

    titleJa: $("#pinkoiTitleJa").value.trim(),
    titleEn: $("#pinkoiTitleEn").value.trim(),
    titleZh: $("#pinkoiTitleZh").value.trim(),

    // compatibility with earlier version
    customTitle: $("#pinkoiTitleEn").value.trim(),

    pinkoiProductId: $("#pinkoiProductId").value.trim(),
    priceJpy: Number($("#pinkoiProductPrice").value || 0),

    category: normalizedPinkoiTshirtCategory($("#pinkoiCategory").value),
    productionMethod: $("#pinkoiProductionMethod").value,
    origin: (() => {
      const value = $("#pinkoiOrigin").value.trim();
      if (value === "日本" || value.toLowerCase() === "japan") return "JP 日本";
      return value;
    })(),
    orderType: $("#pinkoiOrderType").value === "madeToOrder" ? "madeToOrder" : "general",
    shipDays: $("#pinkoiShipDays").value === "" ? null : Number($("#pinkoiShipDays").value),
    material: $("#pinkoiMaterial").value.trim(),
    target: $("#pinkoiTarget").value,
    shippingPlan: $("#pinkoiShippingPlan").value.trim(),
    other: composePinkoiOther(
      $("#pinkoiOther").value.trim(),
      bodyId,
      $("#pinkoiEcoFriendly").checked
    ),
    imageUrls: $("#pinkoiImageUrls").value.trim(),
    tags: uniqueLimited(splitCommaList($("#pinkoiTags").value), 10).join(", "),

    highlightJa: $("#pinkoiHighlightJa").value.trim(),
    descriptionJa: $("#pinkoiDescriptionJa").value.trim(),
    highlightEn: $("#pinkoiHighlightEn").value.trim(),
    descriptionEn: $("#pinkoiDescriptionEn").value.trim(),
    highlightZh: $("#pinkoiHighlightZh").value.trim(),
    descriptionZh: $("#pinkoiDescriptionZh").value.trim(),

    status: $("#pinkoiProductStatus").value || "draft",
    note: $("#pinkoiProductNote").value.trim(),
    updatedAt: new Date().toISOString()
  };

  await saveCollectionItem("pinkoiProducts", item);
  $("#pinkoiProductDialog").close();
  showToast("Pinkoi商品情報を保存しました");
}


function selectedPinkoiGroups() {
  const groups = [];

  for (const key of selectedPinkoiProductKeys) {
    const product = state.pinkoiProducts.find(p => p.id === key);
    if (!product) continue;

    const variants = state.inventory.filter(v =>
      v.bodyId === product.bodyId &&
      v.designId === product.designId
    );

    if (!variants.length) continue;
    groups.push({ product, variants });
  }

  return groups;
}

function updatePinkoiSelectionCount() {
  const el = $("#pinkoiSelectedCount");
  if (el) el.textContent = selectedPinkoiProductKeys.size;
}

async function selectAllDraftProducts() {
  selectedPinkoiProductKeys.clear();

  const keys = new Map();

  state.inventory.forEach(v => {
    const key = pinkoiProductKey(v.bodyId, v.designId);
    if (!keys.has(key)) keys.set(key, { bodyId: v.bodyId, designId: v.designId });
  });

  for (const { bodyId, designId } of keys.values()) {
    const product = await ensurePinkoiProduct(bodyId, designId);
    if ((product.status || "draft") === "draft") {
      selectedPinkoiProductKeys.add(product.id);
    }
  }

  updatePinkoiSelectionCount();
  renderPinkoi();
}

function clearPinkoiSelection() {
  selectedPinkoiProductKeys.clear();
  updatePinkoiSelectionCount();
  renderPinkoi();
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
        product?.titleJa,
        product?.titleEn,
        product?.titleZh,
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
    const price = productPriceJpy(product, group.variants[0], group.bodyId) || 0;
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
      <article class="pinkoi-product-card ${selectedPinkoiProductKeys.has(product?.id || pinkoiProductKey(group.bodyId, group.designId)) ? "selected" : ""}">
        <div class="pinkoi-card-head">
          <label class="pinkoi-product-select">
            <input
              type="checkbox"
              data-select-pinkoi-product
              data-key="${esc(product?.id || pinkoiProductKey(group.bodyId, group.designId))}"
              ${selectedPinkoiProductKeys.has(product?.id || pinkoiProductKey(group.bodyId, group.designId)) ? "checked" : ""}
            >
            <span>${product ? "選択" : "選択"}</span>
          </label>

          <div class="pinkoi-card-main">
            <div class="pinkoi-manage-name">
              ${esc(design?.internalName || "?")} / ${esc(body?.internalName || "?")}
            </div>
            <h3>${esc(title)}</h3>
          </div>
          <span class="pinkoi-status ${esc(status)}">${esc(pinkoiStatusLabel(status))}</span>
        </div>
        </div>

        <div class="pinkoi-meta">
          <span>ID: ${esc(productId)}</span>
          ${!product ? `<span class="pinkoi-unregistered">商品情報 未登録</span>` : ""}
          <span>JPY ${Number(price || 0).toLocaleString()}</span>
          <span>${product?.orderType === "madeToOrder" ? "受注制作" : "一般注文"} ${Number(product?.shipDays ?? (product?.orderType === "madeToOrder" ? 14 : 3))}日</span>
        </div>

        <div class="pinkoi-color-list">
          ${colorHtml}
        </div>

        <div class="pinkoi-card-actions">
          <button class="button secondary small"
                  data-edit-product-inventory
                  data-body-id="${esc(group.bodyId)}"
                  data-design-id="${esc(group.designId)}">
            在庫を一括編集
          </button>
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

  updatePinkoiSelectionCount();
}


function excelSetCell(ws, row, col, value) {
  const addr = XLSXLib.utils.encode_cell({ r: row - 1, c: col - 1 });
  if (value === undefined || value === null || value === "") {
    delete ws[addr];
    return;
  }
  ws[addr] = {
    t: typeof value === "number" ? "n" : "s",
    v: value
  };
}

function getDraftPinkoiGroups() {
  const groups = [];

  for (const product of state.pinkoiProducts) {
    if ((product.status || "draft") !== "draft") continue;

    const variants = state.inventory.filter(v =>
      v.bodyId === product.bodyId &&
      v.designId === product.designId
    );

    if (!variants.length) continue;

    groups.push({ product, variants });
  }

  return groups;
}

function validatePinkoiExport(groups) {
  const problems = [];

  if (!groups.length) {
    problems.push("Draftの商品がありません。");
    return problems;
  }

  groups.forEach(({ product, variants }) => {
    const body = byId(state.bodies, product.bodyId);
    const design = byId(state.designs, product.designId);
    const label = `${design?.internalName || "?"} / ${body?.internalName || "?"}`;

    const titleJa = product.titleJa || generatedTitle(product.bodyId, product.designId, "ja");
    const price = productPriceJpy(product, variants[0]);

    if (!titleJa || titleJa.length < 3) problems.push(`${label}: 日本語の商品名が必要です。`);
    const normalizedCategory = normalizedPinkoiTshirtCategory(product.category);
    if (!normalizedCategory) problems.push(`${label}: 商品カテゴリーが必要です。`);
    if (!product.productionMethod) problems.push(`${label}: 制作方法が必要です。`);
    if (!product.origin) {
      problems.push(`${label}: 製造地が必要です。`);
    } else if (product.origin === "日本" || product.origin.toLowerCase?.() === "japan") {
      problems.push(`${label}: 製造地は「JP 日本」で保存してください。`);
    }

    if (!["ハンドメイド", "工場生産", "その他"].includes(product.productionMethod)) {
      problems.push(`${label}: 制作方法を選択してください。`);
    }

    if (!["男性へ", "女性へ", "ユニセックス"].includes(product.target)) {
      problems.push(`${label}: ターゲットを選択してください。`);
    }
    const orderType = product.orderType === "madeToOrder" ? "madeToOrder" : "general";
    const shipDays = Number(product.shipDays);

    if (orderType === "general") {
      if (
        product.shipDays === null ||
        product.shipDays === undefined ||
        product.shipDays === "" ||
        shipDays < 0 ||
        shipDays > 5
      ) {
        problems.push(`${label}: 一般注文の発送までの日数は0〜5日で入力してください。`);
      }
    } else {
      if (
        product.shipDays === null ||
        product.shipDays === undefined ||
        product.shipDays === "" ||
        shipDays < 1 ||
        shipDays > 90
      ) {
        problems.push(`${label}: 受注制作の発送までの日数は1〜90日で入力してください。`);
      }
    }
    if (!product.material) problems.push(`${label}: 素材が必要です。`);
    if (!product.target) problems.push(`${label}: ターゲットが必要です。`);

    const effectiveTags = splitCommaList(effectivePinkoiTags(product));
    if (effectiveTags.length > 10) {
      problems.push(`${label}: タグは10個以内にしてください。`);
    }
    if (!product.highlightJa || product.highlightJa.length < 15) {
      problems.push(`${label}: 日本語のおすすめポイントを15文字以上入力してください。`);
    }
    if (!product.descriptionJa || product.descriptionJa.length < 15) {
      problems.push(`${label}: 日本語の商品説明を15文字以上入力してください。`);
    }

    variants.forEach(v => {
      const color = byId(state.colors, v.colorId);
      const size = normalizePinkoiTshirtSize(v.size);
      const qty = Number(v.pinkoiStock ?? 0);

      if (!color?.internalName) {
        problems.push(`${label}: Colorが未設定の在庫があります。`);
      }
      if (!size) {
        problems.push(`${label}: Sizeが未設定の在庫があります。`);
      } else if (!isValidPinkoiTshirtSize(size)) {
        problems.push(`${label}: サイズ「${v.size}」は使用できません。S / M / L / XL / XXL のいずれかにしてください。`);
      }
      if (!Number.isFinite(qty) || qty < 0 || qty > 50000) {
        problems.push(`${label}: Pinkoi在庫は0〜50000で入力してください。`);
      }
    });
    if (!price || Number(price) < 1) {
      problems.push(`${label}: 価格 JPY を設定してください。`);
    } else if (Number(price) > 999999) {
      problems.push(`${label}: 価格 JPY は999999円以下で入力してください。`);
    }
  });

  return problems;
}

function pinkoiVariantRows(product, variants) {
  const sizeOrder = new Map(PINKOI_TSHIRT_SIZES.map((s, i) => [s, i]));

  return [...variants].sort((a, b) => {
    const ca = byId(state.colors, a.colorId)?.internalName || "";
    const cb = byId(state.colors, b.colorId)?.internalName || "";
    const sa = sizeOrder.get(normalizePinkoiTshirtSize(a.size)) ?? 99;
    const sb = sizeOrder.get(normalizePinkoiTshirtSize(b.size)) ?? 99;
    return ca.localeCompare(cb) || sa - sb;
  });
}

async function exportPinkoiXlsx() {
  try {
    const groups = selectedPinkoiGroups();

    if (!groups.length) {
      alert("XLSXに出力する商品を選択してください。");
      return;
    }

    const nonDraft = groups.filter(({ product }) => (product.status || "draft") !== "draft");
    if (nonDraft.length) {
      alert("新規登録用XLSXにはDraftの商品だけを選択してください。");
      return;
    }

    const problems = validatePinkoiExport(groups);

    if (problems.length) {
      alert(
        "XLSXを出力する前に以下を確認してください。\n\n" +
        problems.slice(0, 20).join("\n") +
        (problems.length > 20 ? `\nほか ${problems.length - 20} 件` : "")
      );
      return;
    }

    const btn = $("#exportPinkoiXlsxBtn");
    btn.disabled = true;
    btn.textContent = "XLSX作成中...";

    const XLSXModule = await import(
      "https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs"
    );
    XLSXLib = XLSXModule;

    const response = await fetch("./pinkoi-template.xlsx", { cache: "no-store" });
    if (!response.ok) throw new Error("pinkoi-template.xlsx を読み込めません。");

    const buffer = await response.arrayBuffer();
    const workbook = XLSXLib.read(buffer, {
      type: "array",
      cellStyles: true,
      cellFormula: true,
      cellDates: true
    });

    const sheetName = "2. 入力用 - 商品情報テンプレート";
    const ws = workbook.Sheets[sheetName];
    if (!ws) throw new Error("Pinkoi入力用シートが見つかりません。");

    // Data begins on row 10. Keep A1:AY9 untouched.
    let row = 10;
    let uploadNo = 1;

    for (const { product, variants } of groups) {
      const body = byId(state.bodies, product.bodyId);
      const design = byId(state.designs, product.designId);
      const orderedVariants = pinkoiVariantRows(product, variants);

      const titleJa =
        product.titleJa || generatedTitle(product.bodyId, product.designId, "ja");
      const titleEn =
        product.titleEn || generatedTitle(product.bodyId, product.designId, "en");
      const titleZh =
        product.titleZh || generatedTitle(product.bodyId, product.designId, "zhTW");

      const price = productPriceJpy(product, orderedVariants[0]);

      orderedVariants.forEach((v, index) => {
        const color = byId(state.colors, v.colorId);
        const first = index === 0;
        const size = normalizePinkoiTshirtSize(v.size);
        const stock = Number(v.pinkoiStock || 0);

        // A:AY = 1:51
        excelSetCell(ws, row, 1, uploadNo);

        if (first) {
          excelSetCell(ws, row, 2, "オリジナル商品");
          excelSetCell(ws, row, 4, product.imageUrls || "");
          excelSetCell(ws, row, 5, titleJa);
          excelSetCell(ws, row, 6, normalizedPinkoiTshirtCategory(product.category));
          excelSetCell(ws, row, 7, product.productionMethod);
          const exportOrigin =
            product.origin === "日本" || product.origin?.toLowerCase?.() === "japan"
              ? "JP 日本"
              : product.origin;
          excelSetCell(ws, row, 8, exportOrigin);

          // Pinkoi template
          // I = 一般注文 発送までの日数
          // J = 受注制作 発送までの日数
          const orderType = product.orderType === "madeToOrder" ? "madeToOrder" : "general";

          if (orderType === "general") {
            excelSetCell(ws, row, 9, Number(product.shipDays ?? 3));
            excelSetCell(ws, row, 10, "");
          } else {
            excelSetCell(ws, row, 9, "");
            excelSetCell(ws, row, 10, Number(product.shipDays ?? 14));
          }
        }

        // Exact sales color names use custom specification.
        excelSetCell(ws, row, 12, "自分で設定");
        excelSetCell(ws, row, 13, displayName(color, "ja") || color?.internalName || "");

        excelSetCell(ws, row, 14, "サイズ -- 規定");
        excelSetCell(ws, row, 15, size);

        excelSetCell(ws, row, 16, v.sku || "");
        excelSetCell(ws, row, 17, stock);
        excelSetCell(ws, row, 18, price);

        if (first) {
          excelSetCell(ws, row, 19, product.material);
          excelSetCell(ws, row, 21, effectivePinkoiOther(product));
          excelSetCell(ws, row, 22, product.target);
          excelSetCell(ws, row, 23, effectivePinkoiTags(product));
          excelSetCell(ws, row, 24, effectivePinkoiCopy(product, "highlightJa"));
          excelSetCell(ws, row, 25, effectivePinkoiCopy(product, "descriptionJa"));
          excelSetCell(ws, row, 27, product.shippingPlan || "");

          excelSetCell(ws, row, 28, titleEn || "");
          excelSetCell(ws, row, 29, effectivePinkoiCopy(product, "highlightEn") || "");
          excelSetCell(ws, row, 30, effectivePinkoiCopy(product, "descriptionEn") || "");

          excelSetCell(ws, row, 34, titleZh || "");
          excelSetCell(ws, row, 35, effectivePinkoiCopy(product, "highlightZh") || "");
          excelSetCell(ws, row, 36, effectivePinkoiCopy(product, "descriptionZh") || "");
        }

        // Color is a custom specification, so localized values are supplied.
        excelSetCell(ws, row, 31, displayName(color, "en") || color?.internalName || "");
        excelSetCell(ws, row, 37, displayName(color, "zhTW") || color?.internalName || "");

        // Size is Pinkoi's regulated specification ("サイズ -- 規定").
        // For regulated specifications, localized item fields must stay blank.
        // Pinkoi handles their translation automatically.
        excelSetCell(ws, row, 32, "");
        excelSetCell(ws, row, 38, "");

        row++;
      });

      uploadNo++;
    }

    // Remove original example / stale data below generated rows.
    // We only clear rows 10 through 2000 in the input sheet while keeping headers intact.
    const maxClearRow = Math.max(row + 20, 200);
    for (let r = row; r <= maxClearRow; r++) {
      for (let c = 1; c <= 51; c++) {
        const addr = XLSXLib.utils.encode_cell({ r: r - 1, c: c - 1 });
        if (ws[addr]) delete ws[addr];
      }
    }

    ws["!ref"] = `A1:AY${Math.max(9, row - 1)}`;

    const today = new Date();
    const stamp =
      today.getFullYear().toString() +
      String(today.getMonth() + 1).padStart(2, "0") +
      String(today.getDate()).padStart(2, "0");

    XLSXLib.writeFile(
      workbook,
      `Pinkoi_ICELOLLY_new_products_${stamp}.xlsx`,
      { compression: true }
    );

    showToast(`${groups.length}商品をXLSXに出力しました`);
  } catch (err) {
    console.error(err);
    alert(`XLSX出力に失敗しました。\n${err.message || err}`);
  } finally {
    const btn = $("#exportPinkoiXlsxBtn");
    if (btn) {
      btn.disabled = false;
      btn.textContent = "選択商品をXLSX出力";
    }
  }
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
  $("#bulkPrice").value = defaultPinkoiPriceJpy($("#bulkBody").value);
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
  const priceJpy = Number($("#bulkPrice").value || 0);
  const pinkoiProductId = $("#bulkPinkoiId").value.trim();

  if (!bodyId || !designId || !colorId) {
    alert("Body、Design、Colorを選択してください。");
    return;
  }

  await clearInventoryDeletionBlock(bodyId, designId, colorId);

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
      priceJpy,
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
  $("#variantSize").value = normalizePinkoiTshirtSize(v?.size || "M");
  $("#variantSku").value = v?.sku || "";
  $("#variantStock").value = v?.stock ?? 0;
  $("#variantPinkoiStock").value = v?.pinkoiStock ?? 0;
  $("#variantPrice").value = Number(v?.priceJpy || 0) > 0 ? Number(v.priceJpy) : defaultPinkoiPriceJpy($("#variantBody").value);
  $("#variantPinkoiId").value = v?.pinkoiProductId || "";
  $("#variantDialog").showModal();
}

async function submitVariant(e) {
  e.preventDefault();
  const bodyId = $("#variantBody").value;
  const designId = $("#variantDesign").value;
  const colorId = $("#variantColor").value;

  await clearInventoryDeletionBlock(bodyId, designId, colorId);

  const item = {
    id: $("#variantId").value || slug(),
    bodyId,
    designId,
    colorId,
    size: normalizePinkoiTshirtSize($("#variantSize").value),
    sku: $("#variantSku").value.trim(),
    stock: Number($("#variantStock").value || 0),
    pinkoiStock: Number($("#variantPinkoiStock").value || 0),
    priceJpy: Number($("#variantPrice").value || 0),
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

  $("#selectVisibleInventoryBtn")?.addEventListener("click", selectVisibleInventoryProducts);
  $("#clearInventorySelectionBtn")?.addEventListener("click", clearInventorySelection);
  $("#inventoryReflectPinkoiBtn")?.addEventListener("click", () => bulkSetSelectedPinkoiStock("reflect"));
  $("#inventoryZeroPinkoiBtn")?.addEventListener("click", () => bulkSetSelectedPinkoiStock("zero"));
  $("#inventoryDeleteProductsBtn")?.addEventListener("click", deleteSelectedInventoryProducts);

  $("#taskSearchInput")?.addEventListener("input", renderStockTasks);
  $("#taskBodyFilter")?.addEventListener("change", renderStockTasks);
  $("#taskTypeFilter")?.addEventListener("change", renderStockTasks);
  $("#variantBody").addEventListener("change", () => {
    renderVariantDesignOptions();
    renderVariantColorOptions();

    if (!$("#variantId").value) {
      $("#variantPrice").value = defaultPinkoiPriceJpy($("#variantBody").value);
    }
  });
  $("#addVariantBtn").addEventListener("click", openBulkVariantDialog);
  $("#legacySyncNowBtn")?.addEventListener("click", async () => {
    const btn = $("#legacySyncNowBtn");
    if (btn) btn.disabled = true;
    try {
      await reconcileLegacyStockToPinkoi(true);
      showToast("Tシャツ在庫を同期しました");
    } finally {
      if (btn) btn.disabled = false;
    }
  });
  $("#variantForm").addEventListener("submit", submitVariant);
  $("#bulkVariantForm").addEventListener("submit", submitBulkVariant);
  $("#pinkoiProductForm").addEventListener("submit", submitPinkoiProduct);
  $("#productInventoryForm").addEventListener("submit", submitProductInventory);
  $("#sizeChartForm").addEventListener("submit", submitSizeChart);
  $("#applyDefaultSizeChartsBtn")?.addEventListener("click", applyDefaultSizeCharts);

  $("#pinkoiSearchInput")?.addEventListener("input", renderPinkoi);
  $("#pinkoiBodyFilter")?.addEventListener("change", renderPinkoi);
  $("#pinkoiStatusFilter")?.addEventListener("change", renderPinkoi);
  $("#exportPinkoiXlsxBtn")?.addEventListener("click", exportPinkoiXlsx);
  $("#selectAllDraftBtn")?.addEventListener("click", selectAllDraftProducts);
  $("#clearPinkoiSelectionBtn")?.addEventListener("click", clearPinkoiSelection);

  $("#pinkoiOrderType")?.addEventListener("change", e => {
    updateShippingLeadTimeUi(e.target.value, false);
  });

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

  document.addEventListener("change", async e => {
    const inventoryCheckbox = e.target.closest("[data-select-inventory-product]");
    if (inventoryCheckbox) {
      const key = inventoryCheckbox.dataset.key;
      if (!key) return;

      if (inventoryCheckbox.checked) selectedInventoryColorKeys.add(key);
      else selectedInventoryColorKeys.delete(key);

      updateInventorySelectionCount();
      renderInventory();
      return;
    }

    const checkbox = e.target.closest("[data-select-pinkoi-product]");
    if (!checkbox) return;

    const key = checkbox.dataset.key;
    if (!key) return;

    if (checkbox.checked) {
      let product = state.pinkoiProducts.find(p => p.id === key);

      if (!product) {
        const [bodyId, designId] = key.split("__");
        checkbox.disabled = true;

        try {
          product = await ensurePinkoiProduct(bodyId, designId);
        } catch (err) {
          console.error("default Pinkoi product creation failed", err);
          checkbox.checked = false;
          alert("商品情報の初期設定を作成できませんでした。");
          return;
        } finally {
          checkbox.disabled = false;
        }
      } else if (Number(product.priceJpy || 0) <= 0) {
        await ensurePinkoiProduct(product.bodyId, product.designId);
      }

      selectedPinkoiProductKeys.add(key);
    } else {
      selectedPinkoiProductKeys.delete(key);
    }

    updatePinkoiSelectionCount();
    renderPinkoi();
  });

  document.addEventListener("click", async e => {
    const stockBtn = e.target.closest("[data-stock]");
    if (stockBtn) return adjustStock(stockBtn.dataset.stock, Number(stockBtn.dataset.delta));

    const editVariant = e.target.closest("[data-edit-variant]");
    if (editVariant) return openVariant(editVariant.dataset.editVariant);

    const editSizeChart = e.target.closest("[data-edit-size-chart]");
    if (editSizeChart) {
      return openSizeChartDialog(editSizeChart.dataset.editSizeChart);
    }

    const editInventory = e.target.closest("[data-edit-product-inventory]");
    if (editInventory) {
      return openProductInventoryDialog(
        editInventory.dataset.bodyId,
        editInventory.dataset.designId
      );
    }

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
