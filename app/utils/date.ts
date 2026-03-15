const WEEKDAYS_JP = ["日", "月", "火", "水", "木", "金", "土"] as const;

export function getWeekdayJP(date: Date): string {
  return WEEKDAYS_JP[date.getDay()]!;
}

export function formatDateISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDateJP(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = getWeekdayJP(date);
  return `${month}月${day}日（${weekday}）`;
}
