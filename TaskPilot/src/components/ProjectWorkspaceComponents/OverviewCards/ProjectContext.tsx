function ProjectContext() {
  return (
    <div className="tf-card">
      <div className="tf-card-header">
        <h2 className="tf-card-title">Project Context</h2>
        <button className="tf-btn-icon" style={{ padding: 0 }} aria-label="Edit Context">
          <span className="tf-card-action">Edit</span>
        </button>
      </div>

      <div className="tf-context-section">
        <div className="tf-context-subtitle">What are we building?</div>
        <div className="tf-context-text">
          A completely redesigned frontend for the core TaskPilot web application using modern React and a scalable design system.
        </div>
      </div>

      <div className="tf-context-section">
        <div className="tf-context-subtitle">Why are we building it?</div>
        <div className="tf-context-text">
          To improve application performance, ensure visual consistency across all modules, and provide a better user experience for enterprise teams.
        </div>
      </div>

      <div className="tf-context-section">
        <div className="tf-context-subtitle">How are we going to build it?</div>
        <div className="tf-context-text">
          Using React 19, custom CSS architecture matching our new design language, and replacing legacy class components with hooks.
        </div>
      </div>
    </div>
  );
}

export default ProjectContext;
