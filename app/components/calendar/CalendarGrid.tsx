import type { CalendarDay as CalendarDayType, DayStatus } from "../../types";
import { formatDateISO } from "../../utils/date";
import { CalendarDay } from "./CalendarDay";
import styles from "./CalendarGrid.module.css";

const WEEKDAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];

type CalendarGridProps = {
  days: CalendarDayType[];
  statuses: Map<string, DayStatus>;
};

export function CalendarGrid({ days, statuses }: CalendarGridProps) {
  return (
    <div className={styles.container}>
      <div className={styles.weekdayHeader}>
        {WEEKDAY_LABELS.map((label) => (
          <span key={label} className={styles.weekdayLabel}>
            {label}
          </span>
        ))}
      </div>
      <div className={styles.grid}>
        {days.map((day) => {
          const dateStr = formatDateISO(day.date);
          return (
            <CalendarDay
              key={dateStr}
              day={day}
              status={statuses.get(dateStr) ?? "none"}
            />
          );
        })}
      </div>
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendSubmitted}`} />
          入力済
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendReport}`} />
          園から報告あり
        </span>
      </div>
    </div>
  );
}
