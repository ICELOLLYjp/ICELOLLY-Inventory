export const APP_CONFIG = {
  // Firebase設定が終わるまでは true のままで構いません。
  // true: localStorageを使うデモモード
  // false: Firebase Authentication + Firestore
  demoMode: false,

firebase: {
  apiKey: "AIzaSyA1AZlnCYr5cfHG3HDcyvG17jokBnr5lO8",
  authDomain: "t-shirtstock.firebaseapp.com",
  projectId: "t-shirtstock",
  storageBucket: "t-shirtstock.firebasestorage.app",
  messagingSenderId: "485805702075",
  appId: "1:485805702075:web:f9d8668ca57d9f58c4229e",
  measurementId: "G-TXEHB9FGSR"
},

  sizes: ["S", "M", "L", "XL", "XXL"],

  // Pinkoi商品名の基本ルール
  // デザイン名 + ボディ名
  titleOrder: ["design", "body"]
};
