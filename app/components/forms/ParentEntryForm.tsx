import { useState } from "react";
import type { ParentEntry } from "../../types";
import styles from "./ParentEntryForm.module.css";

type ParentEntryFormProps = {
  date: string;
  initialData?: ParentEntry;
  onSubmit: (entry: ParentEntry) => void;
};

function createEmptyEntry(date: string): ParentEntry {
  return {
    date,
    temperature: null,
    bedtime: null,
    wakeTime: null,
    breakfast: "",
    bowelMovement: null,
    mood: null,
    condition: "",
    homeNotes: "",
    pickupTime: null,
    pickupPerson: "",
    message: "",
  };
}

export function ParentEntryForm({
  date,
  initialData,
  onSubmit,
}: ParentEntryFormProps) {
  const [entry, setEntry] = useState<ParentEntry>(
    initialData ?? createEmptyEntry(date),
  );
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(entry);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* 体温 */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>体温</label>
        <input
          type="number"
          className={styles.input}
          step="0.1"
          min="35.0"
          max="42.0"
          placeholder="36.5"
          value={entry.temperature ?? ""}
          onChange={(e) =>
            setEntry({
              ...entry,
              temperature: e.target.value ? Number(e.target.value) : null,
            })
          }
        />
      </div>

      {/* 就寝・起床時間 */}
      <div className={styles.row}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>就寝時間</label>
          <input
            type="time"
            className={styles.input}
            value={entry.bedtime ?? ""}
            onChange={(e) =>
              setEntry({
                ...entry,
                bedtime: e.target.value || null,
              })
            }
          />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>起床時間</label>
          <input
            type="time"
            className={styles.input}
            value={entry.wakeTime ?? ""}
            onChange={(e) =>
              setEntry({
                ...entry,
                wakeTime: e.target.value || null,
              })
            }
          />
        </div>
      </div>

      {/* 朝食 */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>朝食の内容</label>
        <textarea
          className={styles.textarea}
          placeholder="朝食の内容を入力してください"
          value={entry.breakfast}
          onChange={(e) => setEntry({ ...entry, breakfast: e.target.value })}
        />
      </div>

      {/* 排便 */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>排便</label>
        <div className={styles.radioGroup}>
          {(["あり", "なし"] as const).map((value) => (
            <label key={value} className={styles.radioLabel}>
              <input
                type="radio"
                name="bowelMovement"
                checked={entry.bowelMovement === value}
                onChange={() => setEntry({ ...entry, bowelMovement: value })}
              />
              {value}
            </label>
          ))}
        </div>
      </div>

      {/* 機嫌・体調 */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>機嫌・体調</label>
        <div className={styles.radioGroup}>
          {(["良い", "普通", "悪い"] as const).map((value) => (
            <label key={value} className={styles.radioLabel}>
              <input
                type="radio"
                name="mood"
                checked={entry.mood === value}
                onChange={() => setEntry({ ...entry, mood: value })}
              />
              {value}
            </label>
          ))}
        </div>
      </div>

      {/* 体調メモ */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>体調の詳細</label>
        <input
          type="text"
          className={styles.input}
          placeholder="例: 元気です / 少し鼻水が出ています"
          value={entry.condition}
          onChange={(e) => setEntry({ ...entry, condition: e.target.value })}
        />
      </div>

      {/* 家庭での様子 */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>家庭での様子</label>
        <textarea
          className={styles.textarea}
          placeholder="ご家庭での様子があれば入力してください"
          value={entry.homeNotes}
          onChange={(e) => setEntry({ ...entry, homeNotes: e.target.value })}
        />
      </div>

      {/* お迎え */}
      <div className={styles.row}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>お迎え予定時間</label>
          <input
            type="time"
            className={styles.input}
            value={entry.pickupTime ?? ""}
            onChange={(e) =>
              setEntry({
                ...entry,
                pickupTime: e.target.value || null,
              })
            }
          />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>お迎え者</label>
          <input
            type="text"
            className={styles.input}
            placeholder="例: 母"
            value={entry.pickupPerson}
            onChange={(e) =>
              setEntry({ ...entry, pickupPerson: e.target.value })
            }
          />
        </div>
      </div>

      {/* 連絡事項 */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>連絡事項</label>
        <textarea
          className={styles.textarea}
          placeholder="園への連絡事項があれば入力してください"
          value={entry.message}
          onChange={(e) => setEntry({ ...entry, message: e.target.value })}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        保存する
      </button>
      {saved && (
        <p className={styles.savedMessage}>保存しました</p>
      )}
    </form>
  );
}
