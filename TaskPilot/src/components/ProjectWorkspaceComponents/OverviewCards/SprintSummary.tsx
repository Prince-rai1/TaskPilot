function SprintSummary() {
  return (
    <div className="tf-card">
      <div className="tf-card-header">
        <h2 className="tf-card-title">Current Sprint</h2>
      </div>

      <div className="tf-context-subtitle">Sprint 4</div>
      <div className="tf-activity-time" style={{ marginBottom: 16 }}>Aug 20 – Sep 03</div>

      <div className="tf-progress-info" style={{ fontSize: 14, fontWeight: 500 }}>
        24 / 32 issues completed
      </div>

      <div className="tf-progress-bar-container">
        <div className="tf-progress-bar-fill" style={{ width: '75%' }}></div>
      </div>

      <div className="tf-progress-stats" style={{ marginBottom: 24 }}>
        <div className="tf-progress-stat">
          <span className="tf-progress-stat-value">24</span>
          <span className="tf-progress-stat-label">completed</span>
        </div>
        <div className="tf-progress-stat">
          <span className="tf-progress-stat-value">6</span>
          <span className="tf-progress-stat-label">in progress</span>
        </div>
        <div className="tf-progress-stat">
          <span className="tf-progress-stat-value">2</span>
          <span className="tf-progress-stat-label">remaining</span>
        </div>
      </div>

      <div className="tf-context-subtitle">Sprint goal:</div>
      <div className="tf-context-text">Complete authentication and dashboard redesign</div>
    </div>
  );
}

export default SprintSummary;
