// 设计取向：Storybook Arcade
// 复读纠音：使用浏览器 Web Speech API（SpeechRecognition）进行本地语音识别，再与目标单词做相似度比对。
// 限制：不同设备/浏览器支持度不同（iOS Safari 可能不支持）。若不支持，会提示改用“发音”按钮跟读。

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Mic, MicOff, RotateCcw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/contexts/I18nContext";

// TS 的 DOM 类型里可能没有 SpeechRecognition；这里用最小声明避免报错
type SpeechRecognitionAny = any;
type SpeechRecognitionEventAny = any;
type SpeechRecognitionCtor = new () => SpeechRecognitionAny;

function getSpeechRecognitionCtor(): SpeechRecognitionCtor | null {
  const w = window as any;
  return (w.SpeechRecognition || w.webkitSpeechRecognition || null) as SpeechRecognitionCtor | null;
}

function normalizeWord(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, "");
}

function levenshtein(a: string, b: string) {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

function scoreSimilarity(target: string, spoken: string) {
  const t = normalizeWord(target);
  const s = normalizeWord(spoken);
  if (!t || !s) return 0;
  const dist = levenshtein(t, s);
  const maxLen = Math.max(t.length, s.length);
  const sim = Math.max(0, 1 - dist / maxLen);
  return Math.round(sim * 100);
}

export default function RepeatAndCorrect({
  targetWord,
  size = "sm",
  compact = false,
}: {
  targetWord: string;
  size?: "sm" | "default" | "lg";
  compact?: boolean;
}) {
  const { t, lang } = useI18n();
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState<string>("");
  const [confidence, setConfidence] = useState<number | null>(null);

  const recRef = useRef<SpeechRecognitionAny | null>(null);

  const supported = useMemo(() => {
    if (typeof window === "undefined") return false;
    return Boolean(getSpeechRecognitionCtor());
  }, []);

  const similarity = useMemo(() => {
    if (!transcript) return null;
    return scoreSimilarity(targetWord, transcript);
  }, [targetWord, transcript]);

  function start() {
    if (!supported) {
      toast.error(lang === "zh" ? "这台设备不支持语音识别（可先用“发音”按钮跟读）" : "Speech recognition is not supported on this device.");
      return;
    }

    try {
      const Ctor = getSpeechRecognitionCtor();
      if (!Ctor) return;

      // 若正在识别，先停
      stop();

      const rec = new Ctor();
      rec.lang = "en-US";
      rec.continuous = false;
      rec.interimResults = true;
      rec.maxAlternatives = 3;

      rec.onresult = (ev: SpeechRecognitionEventAny) => {
        const res = ev.results[0];
        if (!res) return;
        const best = res[0];
        if (!best) return;
        setTranscript(best.transcript);
        setConfidence(typeof best.confidence === "number" ? best.confidence : null);
      };

      rec.onerror = () => {
        toast.error(lang === "zh" ? "没听清楚，再试一次" : "Didn’t catch that. Try again.");
        setListening(false);
      };

      rec.onend = () => {
        setListening(false);
      };

      recRef.current = rec;
      setTranscript("");
      setConfidence(null);
      setListening(true);
      rec.start();
    } catch {
      toast.error(lang === "zh" ? "启动失败，请重试" : "Failed to start. Please try again.");
      setListening(false);
    }
  }

  function stop() {
    try {
      recRef.current?.stop();
    } catch {
      // ignore
    }
    setListening(false);
  }

  function reset() {
    stop();
    setTranscript("");
    setConfidence(null);
  }

  const badge = similarity == null ? null : similarity >= 90 ? "很准" : similarity >= 70 ? "差不多" : "再练练";
  const badgeVariant = similarity == null ? "secondary" : similarity >= 90 ? "default" : similarity >= 70 ? "secondary" : "outline";

  const core = (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          size={size}
          variant={listening ? "destructive" : "secondary"}
          className="rounded-xl"
          onClick={listening ? stop : start}
          title={
            supported
              ? lang === "zh"
                ? "点击开始跟读"
                : "Tap to speak"
              : lang === "zh"
                ? "设备不支持语音识别"
                : "Not supported"
          }
        >
          {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          <span className="ml-2">{t("repeat")}</span>
        </Button>

        <Button type="button" size={size} variant="outline" className="rounded-xl" onClick={reset}>
          <RotateCcw className="h-4 w-4" />
          <span className="ml-2">{lang === "zh" ? "重来" : "Reset"}</span>
        </Button>

        {badge && (
          <Badge variant={badgeVariant as any} className="rounded-full">
            <Sparkles className="h-3 w-3 mr-1" /> {badge} {similarity}%
          </Badge>
        )}
      </div>

      <div className={cn("rounded-2xl border border-border bg-muted/40 px-4 py-3", !supported && "opacity-70")}> 
        <div className="text-xs text-muted-foreground">{lang === "zh" ? "你说的是（系统识别）：" : "We heard:"}</div>
        <div className="mt-1 font-extrabold tracking-wide">
          {transcript ? transcript : (
            <span className="text-muted-foreground">{lang === "zh" ? "（点击“复读纠音”开始）" : "(Tap Repeat to start)"}</span>
          )}
        </div>
        <div className="mt-2 text-xs text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
          <span>
            {lang === "zh" ? "目标单词：" : "Target: "}<span className="text-primary font-bold">{targetWord}</span>
          </span>
          {confidence != null && (
            <span>{lang === "zh" ? "识别信心：" : "Confidence: "}{Math.round(confidence * 100)}%</span>
          )}
        </div>
      </div>

      {similarity != null && similarity < 90 && (
        <div className="text-xs text-muted-foreground">
          {lang === "zh"
            ? "小提示：把单词分成音节读更容易准确（例如看“syllables”）。"
            : "Tip: say it by syllables to improve accuracy (see syllables)."}
        </div>
      )}
    </div>
  );

  if (!compact) return core;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" size={size} variant="secondary" className="rounded-xl">
          <Mic className="h-4 w-4" />
          <span className="ml-2">{t("repeat")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>复读纠音：{targetWord}</DialogTitle>
        </DialogHeader>
        {core}
      </DialogContent>
    </Dialog>
  );
}

