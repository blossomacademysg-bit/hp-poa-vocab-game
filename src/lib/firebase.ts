// Firebase 客户端初始化（从 Vercel 环境变量读取配置）
// 你需要在 Vercel 里配置：VITE_FIREBASE_API_KEY 等 6 个变量

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};

function assertFirebaseEnv() {
  const missing = Object.entries(firebaseConfig)
    .filter(([, v]) => !v || String(v).trim() === "" || String(v).includes("__FIREBASE"))
    .map(([k]) => k);

  if (missing.length) {
    throw new Error(
      `Missing Firebase env vars: ${missing.join(", ")}. ` +
        `Please set VITE_FIREBASE_* in Vercel and redeploy.`
    );
  }
}

assertFirebaseEnv();

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);