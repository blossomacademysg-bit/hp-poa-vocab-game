import { useMemo, useState } from "react";
import heroImg from "@/assets/hero.jpg";
import AppLayout from "@/components/AppLayout";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { VOCAB_WORDS, pickRandom } from "@/lib/vocab";
import { loadProgress } from "@/lib/progress";
import { Link } from "wouter";
import PronounceButton from "@/components/PronounceButton";
import { BookOpen, Gamepad2, Sparkles, Trophy } from "lucide-react";

interface HomeProps {
  targetSection?: string;
}

export default function Home(_props: HomeProps) {
  const { t } = useI18n();
  const [progressTick, setProgressTick] = useState(0);
  const prog = useMemo(() => {
    void progressTick;
    return loadProgress();
  }, [progressTick]);

  const masteredCount = prog.masteredIds.length;
  const total = VOCAB_WORDS.length;
  const percent = Math.round((masteredCount / total) * 100);

  const sample = useMemo(() => pickRandom(VOCAB_WORDS, 6), []);

  return (
    <AppLayout>
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_80px_rgba(0,0,0,.35)]">
            <img
              src={heroImg}
              alt="Hero"
              className="absolute inset-0 h-full w-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,255,255,.25),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(255,215,0,.18),transparent_45%),linear-gradient(180deg,rgba(10,10,14,.92),rgba(10,10,14,.55))]" />

            <div className="relative p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className="rounded-full">{t("home_badge_words")}</Badge>
                <Badge variant="secondary" className="rounded-full">{t("home_badge_age")}</Badge>
                <Badge variant="outline" className="rounded-full">{t("home_badge_ui")}</Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                {t("home_title_1")}
                <span className="text-neon">{t("home_title_2")}</span>
              </h1>
              <p className="mt-3 text-muted-foreground max-w-prose">{t("home_desc")}</p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link href="/play">
                  <Button size="lg" className="rounded-2xl bg-primary text-primary-foreground hover:opacity-95">
                    <Gamepad2 className="h-5 w-5" /> {t("home_cta_play")}
                  </Button>
                </Link>
                <Link href="/word-bank">
                  <Button size="lg" variant="secondary" className="rounded-2xl">
                    <BookOpen className="h-5 w-5" /> {t("home_cta_cards")}
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-2xl"
                  onClick={() => setProgressTick((v) => v + 1)}
                >
                  <Sparkles className="h-5 w-5" /> {t("home_cta_refresh")}
                </Button>
              </div>

              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                <Card className="rounded-2xl bg-black/25 border-white/10">
                  <CardContent className="p-4">
                    <div className="text-xs text-white/70">{t("home_mastered")}</div>
                    <div className="text-2xl font-black text-white">{masteredCount} / {total}</div>
                    <div className="mt-2">
                      <Progress value={percent} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl bg-black/25 border-white/10">
                  <CardContent className="p-4">
                    <div className="text-xs text-white/70">{t("home_best_quick")}</div>
                    <div className="text-2xl font-black text-white">{prog.bestQuickQuiz}</div>
                    <div className="text-xs text-white/60 mt-1">10题满分：100</div>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl bg-black/25 border-white/10">
                  <CardContent className="p-4">
                    <div className="text-xs text-white/70">{t("home_best_spell")}</div>
                    <div className="text-2xl font-black text-white">{prog.bestSpell}</div>
                    <div className="text-xs text-white/60 mt-1">越快越高分</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            <FeatureCard
              icon={<Gamepad2 className="h-5 w-5" />}
              title={t("home_feature_1_t")}
              desc={t("home_feature_1_d")}
            />
            <FeatureCard
              icon={<Trophy className="h-5 w-5" />}
              title={t("home_feature_2_t")}
              desc={t("home_feature_2_d")}
            />
            <FeatureCard
              icon={<Sparkles className="h-5 w-5" />}
              title={t("home_feature_3_t")}
              desc={t("home_feature_3_d")}
            />
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-border bg-card p-5 shadow-[0_20px_60px_rgba(0,0,0,.25)]">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-sm font-bold">{t("home_draw_title")}</div>
                <div className="text-xs text-muted-foreground">{t("home_draw_sub")}</div>
              </div>
              <Link href="/word-bank">
                <Button size="sm" variant="secondary" className="rounded-xl">{t("home_go_cards")}</Button>
              </Link>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {sample.map((w) => (
                <div
                  key={w.id}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-muted/30"
                >
                  <img src={w.imageSrc} alt={w.word} className="h-28 w-full object-cover opacity-90" />
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-extrabold tracking-tight">{w.word}</div>
                      <PronounceButton text={w.word} size="icon" variant="outline" />
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-2">{w.meaningEasyEn}</div>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.55))]" />
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-border bg-muted/40 p-4">
              <div className="text-sm font-bold">{t("home_teacher_tip")}</div>
              <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li>{t("tip_1")}</li>
                <li>{t("tip_2")}</li>
                <li>{t("tip_3")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-[0_12px_30px_rgba(0,0,0,.2)]">
      <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary grid place-items-center">
        {icon}
      </div>
      <div className="mt-3 font-extrabold tracking-tight">{title}</div>
      <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
    </div>
  );
}
