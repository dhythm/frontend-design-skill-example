import type { CalendarDay } from "../types";

export function getCalendarDays(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month - 1, 1);
  const startOffset = firstDay.getDay(); // 0=日曜
  const startDate = new Date(year, month - 1, 1 - startOffset);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days: CalendarDay[] = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push({
      date,
      isCurrentMonth: date.getMonth() === month - 1,
      isToday:
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate(),
    });
  }

  return days;
}

export function getMonthLabel(year: number, month: number): string {
  return `${year}年${month}月`;
}

export function navigateMonth(
  year: number,
  month: number,
  direction: 1 | -1,
): { year: number; month: number } {
  const date = new Date(year, month - 1 + direction, 1);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
}
