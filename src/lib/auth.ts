import { useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import type { User } from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export type ApprovalState = {
  approved: boolean;
  rejected?: boolean;
  createdAt?: any;
  updatedAt?: any;
  email?: string;
  displayName?: string;
};

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { user, loading };
}

export async function registerWithApproval(email: string, password: string, displayName?: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const u = cred.user;

  // 1) 邮箱验证（Firebase 自带）
  await sendEmailVerification(u);

  // 2) 写入待审批记录（用于管理员后台 + 触发邮件通知）
  const ref = doc(db, "pending_users", u.uid);
  await setDoc(ref, {
    email,
    displayName: displayName || "",
    approved: false,
    rejected: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return u;
}

export async function loginWithApproval(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const u = cred.user;

  // 必须先完成邮箱验证
  await u.reload();
  if (!u.emailVerified) {
    throw new Error("EMAIL_NOT_VERIFIED");
  }

  // 必须管理员审批
  const state = await getApprovalState(u.uid);
  if (!state?.approved) {
    // 未通过：直接登出，避免进入游戏
    await signOut(auth);
    throw new Error(state?.rejected ? "NOT_APPROVED_REJECTED" : "NOT_APPROVED_PENDING");
  }

  return u;
}

export async function getApprovalState(uid: string): Promise<ApprovalState | null> {
  const ref = doc(db, "pending_users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as ApprovalState;
}

export async function adminApprove(uid: string, approved: boolean) {
  const ref = doc(db, "pending_users", uid);
  await updateDoc(ref, {
    approved,
    rejected: !approved,
    updatedAt: serverTimestamp(),
  });
}
