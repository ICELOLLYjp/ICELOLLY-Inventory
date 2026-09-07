export const APP_CONFIG = {
  // Firebase設定が終わるまでは true のままで構いません。
  // true: localStorageを使うデモモード
  // false: Firebase Authentication + Firestore
  demoMode: true,

  firebase: {
    apiKey: "REPLACE_ME",
    authDomain: "REPLACE_ME.firebaseapp.com",
    projectId: "REPLACE_ME",
    storageBucket: "REPLACE_ME.firebasestorage.app",
    messagingSenderId: "REPLACE_ME",
    appId: "REPLACE_ME"
  },

  sizes: ["S", "M", "L", "XL", "XXL"],

  // Pinkoi商品名の基本ルール
  // デザイン名 + ボディ名
  titleOrder: ["design", "body"]
};
