import { useMemo, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { useI18n } from "@/contexts/I18nContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { CH1_WORDS, CH2_WORDS, VOCAB_WORDS } from "@/lib/vocab";
import type { VocabWord } from "@/lib/vocab";
import { loadProgress, saveProgress, toggleMastered } from "@/lib/progress";
import PronounceButton from "@/components/PronounceButton";
import RepeatAndCorrect from "@/components/RepeatAndCorrect";
import { BookOpen, CheckCircle2, Filter, Search } from "lucide-react";

export default function WordBank() {
  const { t } = useI18n();
  const [q, setQ] = useState("");
  const [onlyUnmastered, setOnlyUnmastered] = useState(false);
  const [chapter, setChapter] = useState<"all" | "1" | "2">("all");
  const [tick, setTick] = useState(0);

  const prog = useMemo(() => {
    void tick;
    return loadProgress();
  }, [tick]);

  const masteredSet = useMemo(() => new Set(prog.masteredIds), [prog.masteredIds]);

  const list = useMemo(() => {
    let base: VocabWord[] = VOCAB_WORDS;
    if (chapter === "1") base = CH1_WORDS;
    if (chapter === "2") base = CH2_WORDS;

    const keyword = q.trim().toLowerCase();
    if (keyword) {
      base = base.filter((w) =>
        [w.word, w.meaningEasyEn, w.exampleEasyEn].some((s) => s.toLowerCase().includes(keyword))
      );
    }
    if (onlyUnmastered) {
      base = base.filter((w) => !masteredSet.has(w.id));
    }
    return base;
  }, [q, onlyUnmastered, chapter, masteredSet]);

  function setMastered(id: string, mastered: boolean) {
    toggleMastered(id, mastered);
    const p = loadProgress();
    saveProgress(p);
    setTick((v) => v + 1);
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-black tracking-tight">{t("bank_title")}</h1>
            <p className="text-muted-foreground">{t("bank_sub")}</p>
          </div>
          <Badge variant="secondary" className="rounded-full">{t("bank_badge")}</Badge>
        </div>

        <Card className="rounded-3xl">
          <CardContent className="p-4 sm:p-5">
            <div className="grid md:grid-cols-12 gap-3">
              <div className="md:col-span-6 rounded-2xl border border-border bg-muted/40 px-4 py-3 flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t("bank_search")}
                  className="w-full bg-transparent outline-none"
                />
              </div>

              <div className="md:col-span-3 flex items-center gap-2 rounded-2xl border border-border bg-muted/40 px-4 py-3">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <button
                  className={chipClass(chapter === "all")}
                  onClick={() => setChapter("all")}
                >
                  {t("bank_all")}
                </button>
                <button className={chipClass(chapter === "1")} onClick={() => setChapter("1")}>
                  Ch.1
                </button>
                <button className={chipClass(chapter === "2")} onClick={() => setChapter("2")}>
                  Ch.2
                </button>
              </div>

              <div className="md:col-span-3 flex items-center justify-between rounded-2xl border border-border bg-muted/40 px-4 py-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm font-semibold">{t("bank_only_unmastered")}</div>
                </div>
                <Switch checked={onlyUnmastered} onCheckedChange={setOnlyUnmastered} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((w) => {
            const mastered = masteredSet.has(w.id);
            return (
              <WordCard
                key={w.id}
                w={w}
                mastered={mastered}
                onToggle={(next) => setMastered(w.id, next)}
              />
            );
          })}
        </div>

        {list.length === 0 && (
          <Card className="rounded-3xl">
            <CardContent className="p-8 text-center text-muted-foreground">
              {t("bank_none")}
            </CardContent>
          </Card>
        )}

        <Separator />

        <div className="rounded-2xl border border-border bg-muted/40 p-4">
          <div className="flex items-center gap-2 font-bold">
            <BookOpen className="h-4 w-4" /> 使用建议
          </div>
          <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>孩子会读但不会用：让他读例句，然后换一个人物/地点再说一遍。</li>
            <li>孩子会用但拼写弱：去“拼写挑战”练5题即可。</li>
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}

function WordCard({
  w,
  mastered,
  onToggle,
}: {
  w: VocabWord;
  mastered: boolean;
  onToggle: (next: boolean) => void;
}) {
  return (
    <Card className="rounded-3xl overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,.20)]">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-start justify-between gap-3">
          <div>
            <div className="text-2xl font-black tracking-tight leading-none">{w.word}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {w.pos} · {w.syllables} · Ch.{w.chapter}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <PronounceButton text={w.word} />
            </div>
            <div className="mt-3">
              <RepeatAndCorrect targetWord={w.word} />
            </div>
          </div>
          <Button
            size="sm"
            variant={mastered ? "default" : "secondary"}
            className="rounded-xl"
            onClick={() => onToggle(!mastered)}
          >
            {mastered ? "已掌握" : "未掌握"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <img src={w.imageSrc} alt={w.word} className="h-44 w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.35))]" />
        </div>
        <div className="p-4">
          <div className="text-xs text-muted-foreground">Meaning (easy English)</div>
          <div className="font-semibold mt-1">{w.meaningEasyEn}</div>
          <div className="text-xs text-muted-foreground mt-3">Example</div>
          <div className="text-sm mt-1">{w.exampleEasyEn}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function chipClass(active: boolean) {
  return (
    "text-xs font-bold px-3 py-1 rounded-full transition " +
    (active ? "bg-primary text-primary-foreground" : "bg-background/60 text-muted-foreground hover:text-foreground")
  );
}
