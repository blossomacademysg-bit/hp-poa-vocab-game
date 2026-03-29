// 语言切换：中文 / English
// 轻量 i18n：字典 + React context（不引入额外依赖）

import React, { createContext, useContext, useMemo, useState } from "react";

export type Lang = "zh" | "en";

type Dict = Record<string, { zh: string; en: string }>;

const DICT: Dict = {
  // Nav
  nav_start: { zh: "开始", en: "Start" },
  nav_play: { zh: "小游戏", en: "Play" },
  nav_wordbank: { zh: "单词卡", en: "Word Cards" },
  nav_progress: { zh: "进度", en: "Progress" },
  nav_subtitle: { zh: "72个词 · 闯关复习", en: "72 words · Level-up review" },
  badge_p: { zh: "P1–P3", en: "P1–P3" },
  badge_ui: { zh: "界面：中文/英文", en: "UI: Chinese/English" },

  // Home
  home_badge_words: { zh: "72个生词", en: "72 words" },
  home_badge_age: { zh: "适合P1–P3", en: "For P1–P3" },
  home_badge_ui: { zh: "中文指引 · 英文练习", en: "Bilingual UI" },
  home_title_1: { zh: "变身小巫师，", en: "Be a little wizard—" },
  home_title_2: { zh: "用小游戏把生词记牢", en: "learn words through games" },
  home_desc: {
    zh: "每个单词都有插画 + 简单英文释义。闯关得分、连击加成，错题会自动更常出现。",
    en: "Every word has an illustration + easy English meaning. Earn points, build streaks, and review mistakes more often.",
  },
  home_cta_play: { zh: "开始闯关", en: "Start Levels" },
  home_cta_cards: { zh: "先看单词卡", en: "View Word Cards" },
  home_cta_refresh: { zh: "刷新进度", en: "Refresh" },
  home_mastered: { zh: "已掌握", en: "Mastered" },
  home_best_quick: { zh: "最高分（闯关）", en: "Best (Levels)" },
  home_best_spell: { zh: "最高分（拼写）", en: "Best (Spelling)" },
  home_feature_1_t: { zh: "五关卡闯关", en: "5-level journey" },
  home_feature_1_d: { zh: "从看图理解一路升级到听音默写。", en: "From picture support to audio dictation." },
  home_feature_2_t: { zh: "越玩越难", en: "Gets harder" },
  home_feature_2_d: { zh: "第1–3关选择题，第4关拼字母，第5关听音默写。", en: "L1–3 multiple choice, L4 letter puzzle, L5 dictation." },
  home_feature_3_t: { zh: "聪明复习", en: "Smart review" },
  home_feature_3_d: { zh: "错的单词更常出现，越练越稳。", en: "Mistakes show up more often—practice smarter." },
  home_draw_title: { zh: "今日抽卡（随机6个）", en: "Today’s draw (6 random)" },
  home_draw_sub: { zh: "点开卡片，先把读音和意思过一遍", en: "Tap a card: listen, then read meaning." },
  home_go_cards: { zh: "去单词卡", en: "Go to cards" },
  home_teacher_tip: { zh: "老师小提示", en: "Teacher tips" },
  tip_1: { zh: "先看图 → 再读单词 → 最后看释义。", en: "Look → say the word → read meaning." },
  tip_2: { zh: "孩子答对后，鼓励他用这个词造句。", en: "After correct, ask for a new sentence." },
  tip_3: { zh: "每次5分钟，胜过一次30分钟。", en: "5 minutes daily beats 30 minutes once." },

  // Play
  play_title: { zh: "五关卡闯关", en: "5-Level Challenge" },
  play_sub: { zh: "从“看图理解”一路升级到“听音默写”。", en: "Level up from pictures to audio dictation." },
  play_current: { zh: "当前：", en: "Now: " },
  play_score: { zh: "本局得分：", en: "Score: " },
  play_streak: { zh: "连击：", en: "Streak: " },

  // Word bank
  bank_title: { zh: "单词卡（72个）", en: "Word Cards (72)" },
  bank_sub: { zh: "点卡片就能读：看图 → 读单词 → 看意思 → 读例句。", en: "Use cards: look → say → meaning → example." },
  bank_badge: { zh: "可手动标记“已掌握”", en: "You can mark as mastered" },
  bank_search: { zh: "搜索：单词 / 意思 / 例句", en: "Search: word / meaning / example" },
  bank_all: { zh: "全部", en: "All" },
  bank_only_unmastered: { zh: "只看未掌握", en: "Unmastered only" },
  bank_none: { zh: "没有找到匹配的单词。换个关键词试试？", en: "No matches. Try another keyword." },

  // Progress
  prog_title: { zh: "学习进度", en: "Progress" },
  prog_sub: { zh: "不需要登录：你的进度保存在这台设备的浏览器里。", en: "No login. Progress is saved on this device." },
  prog_mastered: { zh: "已掌握：", en: "Mastered: " },
  prog_best_levels: { zh: "闯关最高：", en: "Best (Levels): " },
  prog_best_spell: { zh: "拼写最高：", en: "Best (Spelling): " },
  prog_clear: { zh: "清空本机进度", en: "Reset on this device" },
  prog_clear_note: { zh: "只会清掉这台设备上的记录，不影响别的设备。", en: "Only resets this device." },

  // Generic
  pronounce: { zh: "发音", en: "Sound" },
  repeat: { zh: "复读纠音", en: "Repeat & Check" },
};

const KEY = "hp_poa_vocab_game_lang_v1";

function loadLang(): Lang {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "en" || v === "zh") return v;
  } catch {
    // ignore
  }
  return "zh";
}

function saveLang(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    // ignore
  }
}

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (key: string) => string;
};

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => (typeof window === "undefined" ? "zh" : loadLang()));

  const value = useMemo<I18nCtx>(() => {
    const setLang = (l: Lang) => {
      setLangState(l);
      saveLang(l);
    };

    const toggleLang = () => {
      setLang(lang === "zh" ? "en" : "zh");
    };

    const t = (key: string) => {
      const entry = DICT[key];
      if (!entry) return key;
      return entry[lang] ?? key;
    };

    return { lang, setLang, toggleLang, t };
  }, [lang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
