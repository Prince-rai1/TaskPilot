function ProjectStatus() {
  return (
    <div className="tf-card">
      <div className="tf-card-header">
        <h2 className="tf-card-title">Project Health</h2>
      </div>

      <div className="tf-status-indicator">
        <div className="tf-status-dot on-track"></div>
        <span className="tf-status-text">On Track</span>
      </div>

      <div className="tf-status-desc">
        Everything is progressing according to plan.
      </div>
    </div>
  );
}

export default ProjectStatus;
