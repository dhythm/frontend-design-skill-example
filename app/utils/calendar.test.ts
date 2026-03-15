import { describe, it, expect } from "vitest";
import { getCalendarDays, getMonthLabel, navigateMonth } from "./calendar";

describe("getCalendarDays", () => {
  it("2026年3月のカレンダー日付を返す（42日分）", () => {
    const days = getCalendarDays(2026, 3);
    expect(days).toHaveLength(42);
  });

  it("最初の日は日曜日から始まる", () => {
    const days = getCalendarDays(2026, 3);
    // 2026年3月1日は日曜日なので最初の日は3/1
    expect(days[0]!.date.getDate()).toBe(1);
    expect(days[0]!.date.getMonth()).toBe(2); // 3月
    expect(days[0]!.date.getDay()).toBe(0); // 日曜
  });

  it("当月の日はisCurrentMonth=trueになる", () => {
    const days = getCalendarDays(2026, 3);
    const marchDays = days.filter((d) => d.isCurrentMonth);
    expect(marchDays).toHaveLength(31);
  });

  it("前月・翌月の日はisCurrentMonth=falseになる", () => {
    const days = getCalendarDays(2026, 3);
    const otherDays = days.filter((d) => !d.isCurrentMonth);
    expect(otherDays).toHaveLength(11); // 42 - 31
  });

  it("2026年2月のカレンダーで前月末を含む", () => {
    const days = getCalendarDays(2026, 2);
    // 2026年2月1日は日曜日
    expect(days[0]!.date.getDate()).toBe(1);
    expect(days[0]!.date.getMonth()).toBe(1); // 2月
  });

  it("月初が日曜でない場合、前月の日を含む", () => {
    // 2026年4月1日は水曜日
    const days = getCalendarDays(2026, 4);
    expect(days[0]!.date.getDay()).toBe(0); // 日曜から開始
    expect(days[0]!.isCurrentMonth).toBe(false);
  });
});

describe("getMonthLabel", () => {
  it("年月ラベルを返す", () => {
    expect(getMonthLabel(2026, 3)).toBe("2026年3月");
  });

  it("1月のラベル", () => {
    expect(getMonthLabel(2026, 1)).toBe("2026年1月");
  });

  it("12月のラベル", () => {
    expect(getMonthLabel(2025, 12)).toBe("2025年12月");
  });
});

describe("navigateMonth", () => {
  it("次の月に進む", () => {
    expect(navigateMonth(2026, 3, 1)).toEqual({ year: 2026, month: 4 });
  });

  it("前の月に戻る", () => {
    expect(navigateMonth(2026, 3, -1)).toEqual({ year: 2026, month: 2 });
  });

  it("12月から翌年1月に進む", () => {
    expect(navigateMonth(2025, 12, 1)).toEqual({ year: 2026, month: 1 });
  });

  it("1月から前年12月に戻る", () => {
    expect(navigateMonth(2026, 1, -1)).toEqual({ year: 2025, month: 12 });
  });
});
