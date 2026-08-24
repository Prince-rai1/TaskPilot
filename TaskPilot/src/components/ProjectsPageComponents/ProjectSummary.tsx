interface ProjectSummaryProps {
  total: number;
  active: number;
  completed: number;
  archived: number;
}

export default function ProjectSummary({ total, active, completed, archived }: ProjectSummaryProps) {
  return (
    <div className="tf-project-summary">
      <h2>All Projects ({total})</h2>
      <div className="tf-summary-indicators">
        <div className="tf-indicator">
          <span className="tf-status-dot in-progress"></span>
          <span>Active ({active})</span>
        </div>
        <div className="tf-indicator">
          <span className="tf-status-dot review"></span>
          <span>Completed ({completed})</span>
        </div>
        <div className="tf-indicator">
          <span className="tf-status-dot todo"></span>
          <span>Archived ({archived})</span>
        </div>
      </div>
    </div>
  );
}
