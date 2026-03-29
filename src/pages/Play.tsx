// 设计取向：Storybook Arcade
// 五关卡闯关模式（按你的规则）：
// 1) 发音 + 图片 + 英文解释 + 例句(遮掉目标词) → 选择正确单词
// 2) 发音 + 英文解释 → 选择正确单词
// 3) 只有发音 → 选择正确单词
// 4) 只有发音 + 打乱字母 → 拼出单词
// 5) 只有发音 → 手打单词

import { useMemo, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useI18n } from "@/contexts/I18nContext";
import { VOCAB_WORDS, pickRandom } from "@/lib/vocab";
import type { VocabWord } from "@/lib/vocab";
import { loadProgress, saveProgress } from "@/lib/progress";
import PronounceButton from "@/components/PronounceButton";
import { CheckCircle2, Keyboard, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Level = 1 | 2 | 3 | 4 | 5;

type QChoice = {
  answer: VocabWord;
  options: VocabWord[];
};

function maskWordInSentence(sentence: string, word: string) {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`\\b${escaped}\\b`, "gi");
  const masked = sentence.replace(re, "____");
  return masked;
}

function shuffleLetters(s: string) {
  const arr = s.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Play() {
  const { t } = useI18n();
  const [seed, setSeed] = useState(0);
  const [level, setLevel] = useState<Level>(1);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [doneLevel, setDoneLevel] = useState(false);

  const questionsPerLevel = 6;

  const pool = useMemo(() => {
    void seed;
    // 每次闯关从词库里抽题
    return [...VOCAB_WORDS];
  }, [seed]);

  const choiceQs = useMemo(() => {
    void seed;
    const picked = pickRandom(pool, questionsPerLevel);
    return picked.map((answer) => {
      const distractors = pickRandom(
        pool.filter((w) => w.id !== answer.id),
        3
      );
      const options = pickRandom([answer, ...distractors], 4);
      return { answer, options };
    });
  }, [seed, pool]);

  const levelTitle: Record<Level, string> = {
    1: "第1关：看图 + 解释 + 例句",
    2: "第2关：只有解释",
    3: "第3关：只有发音",
    4: "第4关：拼字母",
    5: "第5关：手打单词",
  };

  const current = choiceQs[idx];
  const progressPct = Math.round(((idx + (doneLevel ? 1 : 0)) / questionsPerLevel) * 100);

  function hardReset() {
    setSeed((v) => v + 1);
    setLevel(1);
    setIdx(0);
    setScore(0);
    setStreak(0);
    setDoneLevel(false);
  }

  function nextLevel() {
    if (level === 5) {
      toast.success("五关通关！")
      return;
    }
    setLevel((l) => (Math.min(5, (l + 1) as Level) as Level));
    setIdx(0);
    setStreak(0);
    setDoneLevel(false);
  }

  function finishRunMaybe() {
    if (level !== 5) return;
    const p = loadProgress();
    // 这里先用 bestSpell 作为“闯关最高分”的临时容器，避免改动 storage 结构
    saveProgress({ ...p, bestSpell: Math.max(p.bestSpell, score), masteredIds: [...p.masteredIds] });
  }

  function onCorrect(wordId: string, gained: number) {
    setScore((s) => s + gained);
    setStreak((s) => s + 1);

    const p = loadProgress();
    saveProgress({
      ...p,
      masteredIds: [...p.masteredIds, wordId],
      bestQuickQuiz: Math.max(p.bestQuickQuiz, score + gained),
    });
  }

  function onWrong() {
    setStreak(0);
  }

  function goNextQuestion() {
    if (idx >= questionsPerLevel - 1) {
      setDoneLevel(true);
      if (level === 5) finishRunMaybe();
    } else {
      setIdx((i) => i + 1);
    }
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-black tracking-tight">{t("play_title")}</h1>
            <p className="text-muted-foreground">{t("play_sub")}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="rounded-full">{t("play_current")}{levelTitle[level]}</Badge>
            <Badge variant="secondary" className="rounded-full">{t("play_score")}{score}</Badge>
            <Badge variant="outline" className="rounded-full">{t("play_streak")}{streak}</Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-8 rounded-3xl overflow-hidden">
            <CardHeader className="bg-[linear-gradient(90deg,rgba(0,255,255,.12),rgba(255,215,0,.10))]">
              <CardTitle className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" /> {levelTitle[level]}
                </span>
                <span className="text-sm font-semibold text-muted-foreground">
                  第 {Math.min(idx + 1, questionsPerLevel)} / {questionsPerLevel} 题
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <Progress value={progressPct} className="h-2" />

              <div className="mt-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${level}_${current.answer.id}_${idx}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18 }}
                  >
                    {level <= 3 ? (
                      <LevelChoice
                        level={level}
                        q={current}
                        streak={streak}
                        onCorrect={(gain) => {
                          toast.success(`答对！+${gain}分`);
                          onCorrect(current.answer.id, gain);
                          goNextQuestion();
                        }}
                        onWrong={() => {
                          toast.error(`正确是 “${current.answer.word}”`);
                          onWrong();
                        }}
                      />
                    ) : level === 4 ? (
                      <LevelArrangeLetters
                        word={current.answer}
                        streak={streak}
                        onCorrect={(gain) => {
                          toast.success(`拼对了！+${gain}分`);
                          onCorrect(current.answer.id, gain);
                          goNextQuestion();
                        }}
                        onWrong={() => {
                          toast.error(`正确是 “${current.answer.word}”`);
                          onWrong();
                        }}
                      />
                    ) : (
                      <LevelTypeWord
                        word={current.answer}
                        streak={streak}
                        onCorrect={(gain) => {
                          toast.success(`写对了！+${gain}分`);
                          onCorrect(current.answer.id, gain);
                          goNextQuestion();
                        }}
                        onWrong={() => {
                          toast.error(`正确是 “${current.answer.word}”`);
                          onWrong();
                        }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {doneLevel && (
                  <div className="mt-5 rounded-2xl border border-border bg-muted/40 p-4">
                    <div className="font-extrabold flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-primary" />
                      本关完成！当前得分：{score}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {level < 5 ? "准备进入下一关？" : "你已经完成五关卡！"}
                    </div>
                    <div className="mt-3 flex gap-2">
                      {level < 5 ? (
                        <Button className="rounded-2xl" onClick={nextLevel}>
                          进入第{level + 1}关
                        </Button>
                      ) : (
                        <Button className="rounded-2xl" onClick={hardReset}>
                          再来一局
                        </Button>
                      )}
                      <Button variant="secondary" className="rounded-2xl" onClick={hardReset}>
                        <RotateCcw className="h-4 w-4" /> 重开（从第1关）
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <Card className="rounded-3xl">
              <CardContent className="p-5">
                <div className="text-xs text-muted-foreground">本局目标</div>
                <div className="mt-2 text-sm text-muted-foreground space-y-2">
                  <div>• 1关：用“看图+解释”建立理解</div>
                  <div>• 2关：只靠解释抓住词义</div>
                  <div>• 3关：只听发音能选对</div>
                  <div>• 4关：听音拼写（字母拼图）</div>
                  <div>• 5关：听音默写（最难）</div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardContent className="p-5 flex flex-col gap-3">
                <Button onClick={hardReset} className="rounded-2xl">
                  <RotateCcw className="h-4 w-4" /> 重开
                </Button>
                <div className="text-xs text-muted-foreground">
                  小提示：低年级可以先多刷第1–2关；P3再挑战第4–5关。
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function LevelChoice({
  level,
  q,
  streak,
  onCorrect,
  onWrong,
}: {
  level: Level;
  q: QChoice;
  streak: number;
  onCorrect: (gain: number) => void;
  onWrong: () => void;
}) {
  const gain = Math.min(20, 10 + streak * 2);
  const showImg = level === 1;
  const showMeaning = level === 1 || level === 2;
  const showExample = level === 1;

  const exampleMasked = useMemo(() => maskWordInSentence(q.answer.exampleEasyEn, q.answer.word), [q.answer]);

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="rounded-2xl overflow-hidden border border-border bg-muted/30">
        {showImg ? (
          <img src={q.answer.imageSrc} alt={q.answer.word} className="h-56 w-full object-cover" />
        ) : (
          <div className="h-56 w-full grid place-items-center">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Only audio</div>
              <div className="mt-2">
                <PronounceButton text={q.answer.word} size="lg" variant="default" />
              </div>
            </div>
          </div>
        )}

        <div className="p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="text-sm font-bold">听发音</div>
            <PronounceButton text={q.answer.word} size="sm" variant="outline" />
          </div>

          {showMeaning && (
            <div className="mt-3">
              <div className="text-xs text-muted-foreground">Meaning (easy English)</div>
              <div className="font-semibold mt-1">{q.answer.meaningEasyEn}</div>
            </div>
          )}

          {showExample && (
            <div className="mt-3">
              <div className="text-xs text-muted-foreground">Example (word hidden)</div>
              <div className="text-sm mt-1">{exampleMasked}</div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-sm font-bold">在选项里选对的生词：</div>
        <div className="grid grid-cols-1 gap-3">
          {q.options.map((o) => (
            <Button
              key={o.id}
              variant="secondary"
              className="justify-start rounded-2xl py-6 text-base"
              onClick={() => {
                const correct = o.id === q.answer.id;
                if (correct) onCorrect(gain);
                else onWrong();
              }}
            >
              {o.word}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

function LevelArrangeLetters({
  word,
  streak,
  onCorrect,
  onWrong,
}: {
  word: VocabWord;
  streak: number;
  onCorrect: (gain: number) => void;
  onWrong: () => void;
}) {
  const gain = Math.min(25, 12 + streak * 2);
  const [seed, setSeed] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [used, setUsed] = useState<boolean[]>([]);

  const letters = useMemo(() => {
    void seed;
    const arr = shuffleLetters(word.word);
    setPicked([]);
    setUsed(arr.map(() => false));
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word.id, seed]);

  const attempt = picked.join("");

  function pick(i: number) {
    if (used[i]) return;
    setUsed((u) => {
      const next = [...u];
      next[i] = true;
      return next;
    });
    setPicked((p) => [...p, letters[i]]);
  }

  function backspace() {
    if (picked.length === 0) return;
    const last = picked[picked.length - 1];
    // 找到最后一个被用掉且字母相同的位置（从后往前）
    for (let i = letters.length - 1; i >= 0; i--) {
      if (used[i] && letters[i] === last) {
        setUsed((u) => {
          const next = [...u];
          next[i] = false;
          return next;
        });
        break;
      }
    }
    setPicked((p) => p.slice(0, -1));
  }

  function resetLetters() {
    setSeed((v) => v + 1);
  }

  function submit() {
    const correct = attempt.toLowerCase() === word.word.toLowerCase();
    if (correct) onCorrect(gain);
    else onWrong();
  }

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="rounded-2xl border border-border bg-muted/30 p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm font-bold">听发音</div>
          <PronounceButton text={word.word} size="sm" variant="outline" />
        </div>
        <div className="mt-3 text-xs text-muted-foreground">第4关：只有发音 + 打乱字母</div>
        <div className="mt-4 rounded-2xl border border-border bg-card px-4 py-3">
          <div className="text-xs text-muted-foreground">你拼出来的是</div>
          <div className="mt-1 text-2xl font-black tracking-wider min-h-[32px]">{attempt || ""}</div>
        </div>
        <div className="mt-3 flex gap-2">
          <Button variant="secondary" className="rounded-2xl" onClick={backspace}>
            <Keyboard className="h-4 w-4" /> 删除
          </Button>
          <Button variant="outline" className="rounded-2xl" onClick={resetLetters}>
            <RotateCcw className="h-4 w-4" /> 重新打乱
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-sm font-bold">点字母，拼出正确单词：</div>
        <div className="flex flex-wrap gap-2">
          {letters.map((ch, i) => (
            <Button
              key={i}
              variant={used[i] ? "ghost" : "secondary"}
              className="rounded-2xl w-12 justify-center"
              onClick={() => pick(i)}
              disabled={used[i]}
            >
              {ch}
            </Button>
          ))}
        </div>
        <div className="mt-2">
          <Button className="rounded-2xl" onClick={submit} disabled={attempt.length !== word.word.length}>
            <CheckCircle2 className="h-4 w-4" /> 提交
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">提示：可以先看音节（syllables）分段拼。</div>
      </div>
    </div>
  );
}

function LevelTypeWord({
  word,
  streak,
  onCorrect,
  onWrong,
}: {
  word: VocabWord;
  streak: number;
  onCorrect: (gain: number) => void;
  onWrong: () => void;
}) {
  const gain = Math.min(30, 15 + streak * 2);
  const [input, setInput] = useState("");

  function submit() {
    const guess = input.trim().toLowerCase();
    const correct = guess === word.word.toLowerCase();
    if (correct) {
      onCorrect(gain);
      setInput("");
    } else {
      onWrong();
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="rounded-2xl border border-border bg-muted/30 p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm font-bold">只听发音</div>
          <PronounceButton text={word.word} size="sm" variant="outline" />
        </div>
        <div className="mt-3 text-xs text-muted-foreground">第5关：只有发音，写出正确的生词</div>
        <div className="mt-4 rounded-2xl border border-border bg-card px-4 py-3">
          <div className="text-xs text-muted-foreground">请输入单词（不区分大小写）</div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            placeholder="type here..."
            className="mt-2 w-full bg-transparent outline-none text-lg font-extrabold tracking-wide"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <div className="mt-3">
          <Button className="rounded-2xl" onClick={submit}>
            <CheckCircle2 className="h-4 w-4" /> 提交
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="font-bold">老师可选加分玩法</div>
        <div className="mt-2 text-sm text-muted-foreground space-y-2">
          <div>• P1：只要写对前2~3个字母也算对（你可以口头放宽）。</div>
          <div>• P2–P3：要求完整拼写。</div>
          <div>• 如果孩子卡住：先去单词卡看图+解释，再回来挑战。</div>
        </div>
      </div>
    </div>
  );
}
