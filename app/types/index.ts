// 保護者 → 園 の入力データ
export type ParentEntry = {
  date: string; // "2026-03-15"
  temperature: number | null;
  bedtime: string | null; // "21:00"
  wakeTime: string | null; // "07:00"
  breakfast: string;
  bowelMovement: "あり" | "なし" | null;
  mood: "良い" | "普通" | "悪い" | null;
  condition: string;
  homeNotes: string;
  pickupTime: string | null; // "18:00"
  pickupPerson: string;
  message: string;
};

// 園 → 保護者 の報告データ
export type NurseryReport = {
  date: string;
  lunch: string;
  snack: string;
  napStart: string | null;
  napEnd: string | null;
  bowelCount: number;
  mood: "良い" | "普通" | "悪い" | null;
  condition: string;
  activities: string;
  nurseryNotes: string;
  message: string;
};

// カレンダー表示用の日付ステータス
export type DayStatus = "none" | "draft" | "submitted" | "has-report";

// カレンダーグリッド用の日データ
export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
};
