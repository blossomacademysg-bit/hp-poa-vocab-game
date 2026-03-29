import { useEffect, useMemo, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuthUser, adminApprove } from "@/lib/auth";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

type PendingRow = {
  id: string;
  email: string;
  displayName?: string;
  approved: boolean;
  rejected?: boolean;
  createdAt?: any;
};

function fmt(t: any) {
  try {
    if (!t) return "";
    if (t instanceof Timestamp) return t.toDate().toLocaleString();
    if (typeof t.toDate === "function") return t.toDate().toLocaleString();
    return "";
  } catch {
    return "";
  }
}

export default function Admin() {
  const { user, loading } = useAuthUser();
  const [rows, setRows] = useState<PendingRow[]>([]);
  const [adminEmail, setAdminEmail] = useState("blossomacademy.sg@gmail.com");

  const isAdmin = useMemo(() => {
    return user?.email?.toLowerCase() === adminEmail.toLowerCase();
  }, [user?.email, adminEmail]);

  useEffect(() => {
    if (!isAdmin) return;

    const q = query(collection(db, "pending_users"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const list: PendingRow[] = [];
      snap.forEach((d) => {
        const data = d.data() as any;
        list.push({
          id: d.id,
          email: data.email || "",
          displayName: data.displayName || "",
          approved: Boolean(data.approved),
          rejected: Boolean(data.rejected),
          createdAt: data.createdAt,
        });
      });
      setRows(list);
    });

    return () => unsub();
  }, [isAdmin]);

  async function doApprove(uid: string, ok: boolean) {
    try {
      await adminApprove(uid, ok);
      toast.success(ok ? "已通过" : "已拒绝");
    } catch (e: any) {
      toast.error(e?.message || "操作失败");
    }
  }

  async function logout() {
    await signOut(auth);
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>管理员审批</CardTitle>
            <div className="text-sm text-muted-foreground">
              说明：为了安全，管理员页只允许指定邮箱访问。
            </div>
          </CardHeader>
          <CardContent className="p-6 flex flex-col gap-4">
            <div className="grid gap-2 max-w-md">
              <Label>管理员邮箱（用于判断是否管理员）</Label>
              <Input value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
              <div className="text-xs text-muted-foreground">
                默认：blossomacademy.sg@gmail.com（可改成你团队的管理员邮箱）
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="text-sm">
                当前登录：<span className="font-semibold">{loading ? "..." : user?.email || "未登录"}</span>
              </div>
              <Button variant="outline" className="rounded-2xl" onClick={logout}>
                退出登录
              </Button>
            </div>

            {!loading && !user && (
              <div className="rounded-2xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                你需要先用管理员邮箱登录，然后才能审批。
              </div>
            )}

            {!loading && user && !isAdmin && (
              <div className="rounded-2xl border border-border bg-destructive/15 p-4 text-sm">
                这个账号不是管理员（邮箱不匹配）。请用管理员邮箱登录。
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>待审批列表</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {!isAdmin ? (
              <div className="text-sm text-muted-foreground">登录管理员账号后可查看。</div>
            ) : (
              <div className="grid gap-3">
                {rows.map((r) => (
                  <div key={r.id} className="rounded-2xl border border-border bg-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="font-bold">{r.displayName || "(未填姓名)"}</div>
                      <div className="text-sm text-muted-foreground">{r.email}</div>
                      <div className="text-xs text-muted-foreground mt-1">申请时间：{fmt(r.createdAt)}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      {r.approved ? (
                        <Badge className="rounded-full">已通过</Badge>
                      ) : r.rejected ? (
                        <Badge variant="destructive" className="rounded-full">已拒绝</Badge>
                      ) : (
                        <Badge variant="secondary" className="rounded-full">待审批</Badge>
                      )}

                      <Button className="rounded-2xl" onClick={() => doApprove(r.id, true)} disabled={r.approved}>
                        通过
                      </Button>
                      <Button variant="destructive" className="rounded-2xl" onClick={() => doApprove(r.id, false)} disabled={r.rejected}>
                        拒绝
                      </Button>
                    </div>
                  </div>
                ))}

                {rows.length === 0 && (
                  <div className="text-sm text-muted-foreground">暂无申请。</div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>邮件审批（给 Blossom 邮箱）怎么做？</CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-sm text-muted-foreground space-y-2">
            <div>
              本站已经把“待审批”写入 Firestore 的 <code>pending_users</code> 集合。
            </div>
            <div>
              你可以在 Firebase 里安装 Extension：<b>Trigger Email</b>（或用 SendGrid / SMTP），
              让它在有新申请时自动给 <b>blossomacademy.sg@gmail.com</b> 发送一封邮件。
            </div>
            <div>
              邮件里放一个链接：<code>/#/admin</code>（管理员打开后在后台点“通过/拒绝”）。
              这样满足“收到邮件 → 点击进去审批”。
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
