import { useSearchParams } from "react-router";
import { CalendarHeader } from "../components/calendar/CalendarHeader";
import { CalendarGrid } from "../components/calendar/CalendarGrid";
import { getCalendarDays, navigateMonth } from "../utils/calendar";
import { getMonthStatuses } from "../data/repository";

export function meta() {
  return [{ title: "れんらくちょう" }];
}

export default function CalendarPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const now = new Date();
  const year = Number(searchParams.get("year")) || now.getFullYear();
  const month = Number(searchParams.get("month")) || now.getMonth() + 1;

  const days = getCalendarDays(year, month);
  const statuses = getMonthStatuses(year, month);

  function handleNavigate(direction: 1 | -1) {
    const next = navigateMonth(year, month, direction);
    setSearchParams({ year: String(next.year), month: String(next.month) });
  }

  return (
    <>
      <CalendarHeader
        year={year}
        month={month}
        onNavigate={handleNavigate}
      />
      <CalendarGrid days={days} statuses={statuses} />
    </>
  );
}
