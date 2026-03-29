export type ProgressState = {
  masteredIds: string[]; // 已掌握
  bestQuickQuiz: number; // 最高分（快速选择）
  bestSpell: number; // 最高分（拼写挑战）
  lastPlayedAt?: number;
};

const KEY = "hp_poa_vocab_game_progress_v1";

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      return { masteredIds: [], bestQuickQuiz: 0, bestSpell: 0 };
    }
    const parsed = JSON.parse(raw) as ProgressState;
    return {
      masteredIds: Array.isArray(parsed.masteredIds) ? parsed.masteredIds : [],
      bestQuickQuiz: typeof parsed.bestQuickQuiz === "number" ? parsed.bestQuickQuiz : 0,
      bestSpell: typeof parsed.bestSpell === "number" ? parsed.bestSpell : 0,
      lastPlayedAt: typeof parsed.lastPlayedAt === "number" ? parsed.lastPlayedAt : undefined,
    };
  } catch {
    return { masteredIds: [], bestQuickQuiz: 0, bestSpell: 0 };
  }
}

export function saveProgress(next: ProgressState) {
  const payload: ProgressState = {
    ...next,
    masteredIds: Array.from(new Set(next.masteredIds)),
    lastPlayedAt: Date.now(),
  };
  localStorage.setItem(KEY, JSON.stringify(payload));
}

export function toggleMastered(id: string, mastered: boolean) {
  const p = loadProgress();
  const set = new Set(p.masteredIds);
  if (mastered) set.add(id);
  else set.delete(id);
  saveProgress({ ...p, masteredIds: Array.from(set) });
}

export function resetProgress() {
  localStorage.removeItem(KEY);
}
