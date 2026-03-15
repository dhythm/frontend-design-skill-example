import styles from "./TabSwitcher.module.css";

type TabSwitcherProps = {
  tabs: { key: string; label: string }[];
  activeTab: string;
  onTabChange: (key: string) => void;
};

export function TabSwitcher({ tabs, activeTab, onTabChange }: TabSwitcherProps) {
  return (
    <div className={styles.tabs} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`${styles.tab} ${activeTab === tab.key ? styles.active : ""}`}
          role="tab"
          aria-selected={activeTab === tab.key}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
