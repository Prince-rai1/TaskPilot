function SummaryCard({ label, value, alert = false }: { label: string, value: number, alert?: boolean }) {
  return (
    <div className="tf-summary-card">
      <span className="tf-summary-card-label">{label}</span>
      <span className={`tf-summary-card-value ${alert ? 'alert' : ''}`}>{value}</span>
    </div>
  );
}

export default function TaskSummary() {
  return (
    <div className="tf-task-summary">
      <SummaryCard label="Open Tasks" value={12} />
      <SummaryCard label="In Progress" value={7} />
      <SummaryCard label="Due Today" value={3} alert />
      <SummaryCard label="Overdue" value={2} alert />
    </div>
  );
}
