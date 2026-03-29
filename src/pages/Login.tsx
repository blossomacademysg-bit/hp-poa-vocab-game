import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";
import { loginWithApproval } from "@/lib/auth";

export default function Login() {
  const [, setLoc] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    try {
      await loginWithApproval(email.trim(), password);
      toast.success("登录成功");
      setLoc("/play");
    } catch (e: any) {
      const msg = e?.message || "登录失败";
      if (msg === "EMAIL_NOT_VERIFIED") {
        toast.error("请先到邮箱完成验证，再回来登录");
      } else if (msg === "NOT_APPROVED_PENDING") {
        toast.error("管理员还未审批。请稍后再试或联系老师。");
      } else if (msg === "NOT_APPROVED_REJECTED") {
        toast.error("你的注册申请未通过，请联系老师。");
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>登录</CardTitle>
            <div className="text-sm text-muted-foreground">
              需要：邮箱验证 + 管理员审批通过。
            </div>
          </CardHeader>
          <CardContent className="p-6 flex flex-col gap-4">
            <div className="grid gap-2">
              <Label>邮箱</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@email.com" />
            </div>
            <div className="grid gap-2">
              <Label>密码</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <Button className="rounded-2xl" onClick={submit} disabled={loading}>
              {loading ? "登录中..." : "登录"}
            </Button>

            <div className="text-sm text-muted-foreground">
              没有账号？<Link href="/register" className="underline">去注册</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
