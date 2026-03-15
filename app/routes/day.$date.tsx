import { useState } from "react";
import { Link, useParams } from "react-router";
import { TabSwitcher } from "../components/ui/TabSwitcher";
import { ParentEntryForm } from "../components/forms/ParentEntryForm";
import { NurseryReport } from "../components/report/NurseryReport";
import {
  getParentEntry,
  saveParentEntry,
  getNurseryReport,
} from "../data/repository";
import { formatDateJP } from "../utils/date";
import type { ParentEntry } from "../types";

const TABS = [
  { key: "input", label: "保護者入力" },
  { key: "report", label: "園からの報告" },
];

export function meta() {
  return [{ title: "れんらくちょう - 日別詳細" }];
}

export default function DayDetailPage() {
  const { date } = useParams<{ date: string }>();
  const [activeTab, setActiveTab] = useState("input");

  if (!date) {
    return <div>日付が指定されていません</div>;
  }

  const parsedDate = new Date(date + "T00:00:00");
  const dateLabel = formatDateJP(parsedDate);
  const entry = getParentEntry(date);
  const report = getNurseryReport(date);

  function handleSubmit(newEntry: ParentEntry) {
    saveParentEntry(newEntry);
  }

  return (
    <>
      <header className="page-header">
        <Link to="/" className="back-button" aria-label="カレンダーに戻る">
          ‹
        </Link>
        <h1>{dateLabel}</h1>
        <div style={{ width: 44 }} />
      </header>

      <TabSwitcher
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === "input" ? (
        <ParentEntryForm
          date={date}
          initialData={entry}
          onSubmit={handleSubmit}
        />
      ) : (
        <NurseryReport report={report} />
      )}
    </>
  );
}
