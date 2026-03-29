import { useMemo, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { useI18n } from "@/contexts/I18nContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { VOCAB_WORDS } from "@/lib/vocab";
import { loadProgress, resetProgress, saveProgress } from "@/lib/progress";
import { BookOpenCheck, RotateCcw, Sparkles, Trophy } from "lucide-react";

export default function ProgressPage() {
  const { t } = useI18n();
  const [tick, setTick] = useState(0);
  const prog = useMemo(() => {
    void tick;
    return loadProgress();
  }, [tick]);

  const mastered = useMemo(() => new Set(prog.masteredIds), [prog.masteredIds]);
  const masteredCount = mastered.size;
  const percent = Math.round((masteredCount / VOCAB_WORDS.length) * 100);

  const badges = useMemo(() => {
    const list: { title: string; desc: string; unlocked: boolean }[] = [
      {
        title: "新手巫师",
        desc: "掌握 6 个单词",
        unlocked: masteredCount >= 6,
      },
      {
        title: "连击高手",
        desc: "快速选择拿到 70 分",
        unlocked: prog.bestQuickQuiz >= 70,
      },
      {
        title: "拼写小魔王",
        desc: "拼写挑战拿到 80 分",
        unlocked: prog.bestSpell >= 80,
      },
      {
        title: "全词通关",
        desc: "掌握 72 个单词",
        unlocked: masteredCount >= 72,
      },
    ];
    return list;
  }, [masteredCount, prog.bestQuickQuiz, prog.bestSpell]);

  function onReset() {
    resetProgress();
    saveProgress(loadProgress());
    setTick((v) => v + 1);
    toast.success("已清空本机进度");
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-black tracking-tight">{t("prog_title")}</h1>
            <p className="text-muted-foreground">{t("prog_sub")}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-full">{t("prog_mastered")}{masteredCount}/72</Badge>
            <Badge className="rounded-full">{t("prog_best_levels")}{prog.bestQuickQuiz}</Badge>
            <Badge className="rounded-full">{t("prog_best_spell")}{prog.bestSpell}</Badge>
          </div>
        </div>

        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2">
                <BookOpenCheck className="h-5 w-5" /> 掌握进度
              </span>
              <span className="text-sm font-semibold text-muted-foreground">{percent}%</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <Progress value={percent} className="h-3" />
            <div className="mt-3 text-sm text-muted-foreground">
              建议：每天 5 分钟，连着练一周，会非常明显。
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" /> 成就徽章
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-2 gap-3">
                {badges.map((b) => (
                  <div
                    key={b.title}
                    className={
                      "rounded-2xl border border-border p-4 " +
                      (b.unlocked ? "bg-card" : "bg-muted/40 opacity-70")
                    }
                  >
                    <div className="font-extrabold flex items-center gap-2">
                      <Sparkles className={"h-4 w-4 " + (b.unlocked ? "text-primary" : "text-muted-foreground")} />
                      {b.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{b.desc}</div>
                    <div className="text-xs mt-2">
                      {b.unlocked ? (
                        <span className="text-primary font-bold">已解锁</span>
                      ) : (
                        <span className="text-muted-foreground">未解锁</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle>家长/老师使用建议</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-2">
                <li>想“稳”：先单词卡，再快速选择。</li>
                <li>想“会拼”：每天做一次拼写挑战（8题）。</li>
                <li>想“更像游戏”：用记忆翻牌做热身。</li>
              </ul>

              <Separator className="my-4" />

              <Button variant="destructive" className="rounded-2xl" onClick={onReset}>
                <RotateCcw className="h-4 w-4" /> {t("prog_clear")}
              </Button>
              <div className="text-xs text-muted-foreground mt-2">{t("prog_clear_note")}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
