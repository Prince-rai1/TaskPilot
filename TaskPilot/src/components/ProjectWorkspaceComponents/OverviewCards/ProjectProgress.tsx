function ProjectProgress() {
  return (
    <div className="tf-card">
      <div className="tf-card-header">
        <h2 className="tf-card-title">Project Progress</h2>
      </div>

      <div className="tf-progress-info">
        <span className="tf-progress-percent">75%</span>
        <span className="tf-progress-label">complete</span>
      </div>

      <div className="tf-progress-bar-container">
        <div className="tf-progress-bar-fill" style={{ width: '75%' }}></div>
      </div>

      <div className="tf-progress-stats">
        <div className="tf-progress-stat">
          <span className="tf-progress-stat-value">93</span>
          <span className="tf-progress-stat-label">completed</span>
        </div>
        <div className="tf-progress-stat">
          <span className="tf-progress-stat-value">31</span>
          <span className="tf-progress-stat-label">remaining</span>
        </div>
        <div className="tf-progress-stat">
          <span className="tf-progress-stat-value">124</span>
          <span className="tf-progress-stat-label">total issues</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectProgress;
