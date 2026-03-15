import { getMonthLabel } from "../../utils/calendar";
import styles from "./CalendarHeader.module.css";

type CalendarHeaderProps = {
  year: number;
  month: number;
  onNavigate: (direction: 1 | -1) => void;
};

export function CalendarHeader({
  year,
  month,
  onNavigate,
}: CalendarHeaderProps) {
  return (
    <header className={styles.header}>
      <button
        className={styles.navButton}
        onClick={() => onNavigate(-1)}
        aria-label="前の月"
      >
        ‹
      </button>
      <h1 className={styles.title}>{getMonthLabel(year, month)}</h1>
      <button
        className={styles.navButton}
        onClick={() => onNavigate(1)}
        aria-label="次の月"
      >
        ›
      </button>
    </header>
  );
}
