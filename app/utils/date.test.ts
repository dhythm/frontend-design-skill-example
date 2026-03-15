import { describe, it, expect } from "vitest";
import { formatDateJP, formatDateISO, getWeekdayJP } from "./date";

describe("formatDateJP", () => {
  it("日付を日本語形式でフォーマットする", () => {
    const date = new Date(2026, 2, 15); // 3月15日
    expect(formatDateJP(date)).toBe("3月15日（日）");
  });

  it("1月1日をフォーマットする", () => {
    const date = new Date(2026, 0, 1); // 1月1日（木）
    expect(formatDateJP(date)).toBe("1月1日（木）");
  });
});

describe("formatDateISO", () => {
  it("ISO形式の日付文字列を返す", () => {
    const date = new Date(2026, 2, 15);
    expect(formatDateISO(date)).toBe("2026-03-15");
  });

  it("月と日を0埋めする", () => {
    const date = new Date(2026, 0, 5);
    expect(formatDateISO(date)).toBe("2026-01-05");
  });
});

describe("getWeekdayJP", () => {
  it("日曜日を返す", () => {
    const date = new Date(2026, 2, 15); // 日曜
    expect(getWeekdayJP(date)).toBe("日");
  });

  it("月曜日を返す", () => {
    const date = new Date(2026, 2, 16); // 月曜
    expect(getWeekdayJP(date)).toBe("月");
  });

  it("土曜日を返す", () => {
    const date = new Date(2026, 2, 14); // 土曜
    expect(getWeekdayJP(date)).toBe("土");
  });
});
