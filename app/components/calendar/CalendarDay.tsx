import { Link } from "react-router";
import type { CalendarDay as CalendarDayType, DayStatus } from "../../types";
import { formatDateISO } from "../../utils/date";
import styles from "./CalendarDay.module.css";

type CalendarDayProps = {
  day: CalendarDayType;
  status: DayStatus;
};

export function CalendarDay({ day, status }: CalendarDayProps) {
  const dayOfWeek = day.date.getDay();
  const dateStr = formatDateISO(day.date);

  const classNames = [
    styles.day,
    !day.isCurrentMonth && styles.otherMonth,
    day.isToday && styles.today,
  ]
    .filter(Boolean)
    .join(" ");

  const numberClassNames = [
    styles.dateNumber,
    dayOfWeek === 0 && styles.sunday,
    dayOfWeek === 6 && styles.saturday,
  ]
    .filter(Boolean)
    .join(" ");

  const dotClassName = [
    styles.statusDot,
    status === "submitted" && styles.submitted,
    status === "has-report" && styles.hasReport,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link to={`/day/${dateStr}`} className={classNames}>
      <span className={numberClassNames}>{day.date.getDate()}</span>
      {status !== "none" && <span className={dotClassName} />}
    </Link>
  );
}
