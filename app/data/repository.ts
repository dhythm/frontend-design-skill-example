import type { ParentEntry, NurseryReport, DayStatus } from "../types";
import { mockEntries } from "./mock-entries";
import { mockReports } from "./mock-reports";

let entries: Map<string, ParentEntry>;
let reports: Map<string, NurseryReport>;

function initData(): void {
  entries = new Map(mockEntries.map((e) => [e.date, e]));
  reports = new Map(mockReports.map((r) => [r.date, r]));
}

initData();

export function resetRepository(): void {
  initData();
}

export function getParentEntry(date: string): ParentEntry | undefined {
  return entries.get(date);
}

export function saveParentEntry(entry: ParentEntry): void {
  entries.set(entry.date, entry);
}

export function getNurseryReport(date: string): NurseryReport | undefined {
  return reports.get(date);
}

export function getDayStatus(date: string): DayStatus {
  const hasReport = reports.has(date);
  const hasEntry = entries.has(date);

  if (hasReport) return "has-report";
  if (hasEntry) return "submitted";
  return "none";
}

export function getMonthStatuses(
  year: number,
  month: number,
): Map<string, DayStatus> {
  const statuses = new Map<string, DayStatus>();
  const daysInMonth = new Date(year, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    statuses.set(dateStr, getDayStatus(dateStr));
  }

  return statuses;
}
