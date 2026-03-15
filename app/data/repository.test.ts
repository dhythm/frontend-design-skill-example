import { describe, it, expect, beforeEach } from "vitest";
import {
  getParentEntry,
  saveParentEntry,
  getNurseryReport,
  getDayStatus,
  getMonthStatuses,
  resetRepository,
} from "./repository";
import type { ParentEntry } from "../types";

beforeEach(() => {
  resetRepository();
});

describe("getParentEntry", () => {
  it("モックデータに存在する日付のエントリを返す", () => {
    const entry = getParentEntry("2026-03-10");
    expect(entry).toBeDefined();
    expect(entry!.temperature).toBe(36.5);
    expect(entry!.breakfast).toBe("ごはん、味噌汁、卵焼き");
  });

  it("存在しない日付はundefinedを返す", () => {
    const entry = getParentEntry("2026-03-01");
    expect(entry).toBeUndefined();
  });
});

describe("saveParentEntry", () => {
  it("新しいエントリを保存できる", () => {
    const newEntry: ParentEntry = {
      date: "2026-03-20",
      temperature: 36.8,
      bedtime: "21:00",
      wakeTime: "07:00",
      breakfast: "パン",
      bowelMovement: "あり",
      mood: "良い",
      condition: "元気",
      homeNotes: "",
      pickupTime: "18:00",
      pickupPerson: "母",
      message: "",
    };
    saveParentEntry(newEntry);
    const saved = getParentEntry("2026-03-20");
    expect(saved).toEqual(newEntry);
  });

  it("既存のエントリを上書きできる", () => {
    const updated: ParentEntry = {
      date: "2026-03-10",
      temperature: 37.0,
      bedtime: "22:00",
      wakeTime: "07:30",
      breakfast: "おかゆ",
      bowelMovement: "なし",
      mood: "悪い",
      condition: "熱っぽい",
      homeNotes: "",
      pickupTime: "16:00",
      pickupPerson: "父",
      message: "早めのお迎えをお願いします",
    };
    saveParentEntry(updated);
    const saved = getParentEntry("2026-03-10");
    expect(saved!.temperature).toBe(37.0);
    expect(saved!.breakfast).toBe("おかゆ");
  });
});

describe("getNurseryReport", () => {
  it("モックデータに存在する日付のレポートを返す", () => {
    const report = getNurseryReport("2026-03-10");
    expect(report).toBeDefined();
    expect(report!.lunch).toContain("カレーライス");
  });

  it("存在しない日付はundefinedを返す", () => {
    const report = getNurseryReport("2026-03-01");
    expect(report).toBeUndefined();
  });
});

describe("getDayStatus", () => {
  it("エントリもレポートもない日はnoneを返す", () => {
    expect(getDayStatus("2026-03-01")).toBe("none");
  });

  it("エントリがある日はsubmittedを返す", () => {
    expect(getDayStatus("2026-03-16")).toBe("submitted");
  });

  it("レポートがある日はhas-reportを返す", () => {
    expect(getDayStatus("2026-03-10")).toBe("has-report");
  });
});

describe("getMonthStatuses", () => {
  it("指定月の全日のステータスを返す", () => {
    const statuses = getMonthStatuses(2026, 3);
    expect(statuses.get("2026-03-10")).toBe("has-report");
    expect(statuses.get("2026-03-16")).toBe("submitted");
    expect(statuses.get("2026-03-01")).toBe("none");
  });
});
