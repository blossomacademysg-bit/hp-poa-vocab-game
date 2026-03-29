import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";
import { registerWithApproval } from "@/lib/auth";

export default function Register() {
  const [, setLoc] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    try {
      await registerWithApproval(email.trim(), password, name.trim());
      toast.success("注册成功：已发送邮箱验证邮件。完成验证后，等待管理员审批。");
      setLoc("/login");
    } catch (e: any) {
      toast.error(e?.message || "注册失败");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>学生注册</CardTitle>
            <div className="text-sm text-muted-foreground">
              注册后：
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>系统会发送一封“邮箱验证”邮件到你的邮箱</li>
                <li>你完成验证后，系统会通知管理员（Blossom）审批</li>
                <li>管理员通过后，你才能登录使用</li>
              </ol>
            </div>
          </CardHeader>
          <CardContent className="p-6 flex flex-col gap-4">
            <div className="grid gap-2">
              <Label>姓名（可选）</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Student name" />
            </div>
            <div className="grid gap-2">
              <Label>邮箱</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@email.com" />
            </div>
            <div className="grid gap-2">
              <Label>密码</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="至少6位" />
            </div>

            <Button className="rounded-2xl" onClick={submit} disabled={loading}>
              {loading ? "提交中..." : "注册"}
            </Button>

            <div className="text-sm text-muted-foreground">
              已有账号？<Link href="/login" className="underline">去登录</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
