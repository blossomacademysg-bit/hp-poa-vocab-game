import { Link } from "wouter";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <AppLayout>
      <div className="rounded-3xl border border-border bg-card p-10 text-center">
        <div className="text-3xl font-black">找不到这个页面</div>
        <div className="text-muted-foreground mt-2">回到首页继续闯关吧。</div>
        <div className="mt-6">
          <Link href="/">
            <Button className="rounded-2xl">返回首页</Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
