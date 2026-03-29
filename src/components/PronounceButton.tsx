// 设计取向（已选定并贯彻全站）：Storybook Arcade
// 发音实现说明：使用浏览器 SpeechSynthesis（无需上传音频）。
// 这不是“真人录音”，但通常足够自然；如需真人录音，可后续替换为 mp3 资源。

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/contexts/I18nContext";

export default function PronounceButton({
  text,
  size = "sm",
  variant = "secondary",
  rate = 0.9,
}: {
  text: string;
  size?: "sm" | "default" | "lg" | "icon";
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  rate?: number;
}) {
  const { t } = useI18n();
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  const utter = useMemo(() => {
    if (!supported) return null;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = rate;
    u.pitch = 1.0;
    u.volume = 1.0;
    return u;
  }, [supported, text, rate]);

  function speak() {
    if (!supported || !utter) {
      toast.error("这台设备不支持语音播放");
      return;
    }
    try {
      // 先停止上一段，避免叠音
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    } catch {
      toast.error("播放失败，请重试");
    }
  }

  return (
    <Button
      type="button"
      size={size}
      variant={variant}
      className={size === "icon" ? "rounded-xl" : "rounded-xl"}
      onClick={speak}
      title="播放发音"
    >
      <Volume2 className="h-4 w-4" />
      {size !== "icon" && <span className="ml-2">{t("pronounce")}</span>}
    </Button>
  );
}
