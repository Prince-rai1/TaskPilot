import './Dashboard.css';

const MOCK_PROJECTS = [
  { id: 1, name: 'TaskForge Web App', desc: 'Main frontend application redesign', progress: 75, tasks: 124, members: ['PR', 'JD', 'AS'] },
  { id: 2, name: 'Mobile App V2', desc: 'React Native mobile application', progress: 40, tasks: 86, members: ['PR', 'MK'] },
  { id: 3, name: 'Marketing Website', desc: 'SEO optimization and new landing pages', progress: 90, tasks: 32, members: ['AS', 'JD', 'MK', 'PR'] },
];

function RecentProjects() {
  return (
    <div className="tf-card">
      <div className="tf-card-header">
        <h3 className="tf-card-title">Recent Projects</h3>
        <a href="#" className="tf-link-action">View all</a>
      </div>
      
      <div className="tf-project-list">
        {MOCK_PROJECTS.map(project => (
          <div key={project.id} className="tf-project-card">
            <div className="tf-project-header">
              <div>
                <h4>{project.name}</h4>
                <p>{project.desc}</p>
              </div>
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px', fontWeight: '500' }}>
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="tf-progress-bar">
                <div className="tf-progress-fill" style={{ width: `${project.progress}%` }}></div>
              </div>
            </div>
            
            <div className="tf-project-footer">
              <span>{project.tasks} tasks</span>
              <div className="tf-avatar-group">
                {project.members.slice(0, 3).map((member, idx) => (
                  <div key={idx} className="tf-avatar">{member}</div>
                ))}
                {project.members.length > 3 && (
                  <div className="tf-avatar" style={{ backgroundColor: 'var(--bg-canvas)' }}>
                    +{project.members.length - 3}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentProjects;
