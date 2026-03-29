import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";
import blossomLogo from "@/assets/blossom-logo.jpg";
import { BookOpen, Gamepad2, Languages, Sparkles, Trophy } from "lucide-react";

const nav = [
  { href: "/", labelKey: "nav_start", icon: Sparkles },
  { href: "/play", labelKey: "nav_play", icon: Gamepad2 },
  { href: "/word-bank", labelKey: "nav_wordbank", icon: BookOpen },
  { href: "/progress", labelKey: "nav_progress", icon: Trophy },
  // 登录/注册入口放在右侧按钮区，这里不占导航位
];

export default function TopNav() {
  const [loc] = useLocation();
  const { lang, toggleLang, t } = useI18n();

  return (
    <div className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="group flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl overflow-hidden border border-border bg-card shadow-[0_10px_30px_rgba(0,0,0,.25)]">
            <img src={blossomLogo} alt="Blossom Education logo" className="h-full w-full object-cover" />
          </div>
          <div className="leading-tight">
            <div className="font-extrabold tracking-tight">生词街机</div>
            <div className="text-xs text-muted-foreground">{t("nav_subtitle")}</div>
            <div className="text-[11px] text-muted-foreground">Blossom Education · 博乐学院</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <Badge variant="secondary" className="rounded-full">{t("badge_p")}</Badge>
          <Badge className="rounded-full">{t("badge_ui")}</Badge>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden sm:inline">
            <Button size="sm" variant="secondary" className="rounded-xl">登录</Button>
          </Link>
          <Link href="/register" className="hidden sm:inline">
            <Button size="sm" variant="outline" className="rounded-xl">注册</Button>
          </Link>

          <Button
            size="sm"
            variant="outline"
            className="rounded-xl"
            onClick={toggleLang}
            title={lang === "zh" ? "Switch to English" : "切换中文"}
          >
            <Languages className="h-4 w-4" />
            <span className="hidden md:inline ml-2">{lang === "zh" ? "EN" : "中文"}</span>
          </Button>

          {nav.map((item) => {
            const active = loc === item.href || (item.href !== "/" && loc.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition",
                  "hover:bg-accent hover:text-accent-foreground",
                  active ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4", active ? "" : "opacity-70")} />
                <span className="hidden sm:inline">{t(item.labelKey)}</span>
                {active && <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-primary" />}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
