/* src/components/visualization/StatGrid.tsx */
import styles from "./StatGrid.module.css";

export function StatGrid({ source }: { source: string }) {
  const rows = source.split("\n").map(line => line.split("|").map(s => s.trim()));

  return (
    <div className={styles.container}>
      {rows.map(([value, label], i) => (
        <div key={i} className={styles.statCard}>
          <div className={styles.value}>{value}</div>
          <div className={styles.label}>{label}</div>
        </div>
      ))}
    </div>
  );
}