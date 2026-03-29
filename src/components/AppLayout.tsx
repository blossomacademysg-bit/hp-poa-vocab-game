import TopNav from "@/components/TopNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-app text-foreground">
      <TopNav />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-6 text-xs text-muted-foreground">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <div>Blossom Education · 博乐学院 · Harry Potter vocab review (teacher-made examples)</div>
          <div>提示：不需要登录，进度会保存在本机浏览器。</div>
        </div>
      </footer>
    </div>
  );
}
