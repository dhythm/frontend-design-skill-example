import type { NurseryReport as NurseryReportType } from "../../types";
import styles from "./NurseryReport.module.css";

type NurseryReportProps = {
  report: NurseryReportType | undefined;
};

export function NurseryReport({ report }: NurseryReportProps) {
  if (!report) {
    return (
      <div className={styles.emptyMessage}>
        まだ園からの報告はありません
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>昼食</div>
        <div className={styles.sectionContent}>{report.lunch}</div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>おやつ</div>
        <div className={styles.sectionContent}>{report.snack}</div>
      </div>

      <div className={styles.row}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>お昼寝</div>
          <div className={styles.sectionContent}>
            {report.napStart && report.napEnd
              ? `${report.napStart}〜${report.napEnd}`
              : "なし"}
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>排便</div>
          <div className={styles.sectionContent}>{report.bowelCount}回</div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>機嫌・体調</div>
        <div className={styles.sectionContent}>
          {report.mood && `【${report.mood}】`}
          {report.condition}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>活動内容</div>
        <div className={styles.sectionContent}>{report.activities}</div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>園での様子</div>
        <div className={styles.sectionContent}>{report.nurseryNotes}</div>
      </div>

      {report.message && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>園からの連絡</div>
          <div className={styles.sectionContent}>{report.message}</div>
        </div>
      )}
    </div>
  );
}
