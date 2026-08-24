import { MoreVertical } from 'lucide-react';

export interface ProjectData {
  id: string;
  name: string;
  key: string;
  description: string;
  status: 'Active' | 'Completed' | 'Archived';
  progress: number;
  tasks: number;
  dueDate: string;
  updated: string;
  team: string[]; // array of avatar image URLs
}

export default function ProjectCard({ project }: { project: ProjectData }) {
  const getBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'tf-badge low';
      case 'archived': return 'tf-badge medium';
      default: return 'tf-badge high'; // Use existing colors or customize later
    }
  };

  return (
    <div className="tf-project-card-full">
      <div className="tf-pc-header">
        <div className="tf-pc-title-wrapper">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
            <span className="tf-pc-key">{project.key}</span>
            <span className={getBadgeClass(project.status)} style={{ backgroundColor: project.status === 'Active' ? '#e0f2fe' : project.status === 'Completed' ? '#d1fae5' : '#f3f4f6', color: project.status === 'Active' ? '#0EA5E9' : project.status === 'Completed' ? '#10B981' : '#6B7280' }}>
              {project.status}
            </span>
          </div>
          <h3>{project.name}</h3>
        </div>
        <button className="tf-icon-btn" title="More actions">
          <MoreVertical size={18} />
        </button>
      </div>
      
      <p className="tf-pc-desc">{project.description}</p>
      
      <div className="tf-pc-progress-section">
        <div className="tf-pc-progress-header">
          <span className="tf-pc-progress-label">Progress</span>
          <span className="tf-pc-progress-val">{project.progress}%</span>
        </div>
        <div className="tf-progress-bar">
          <div className="tf-progress-fill" style={{ width: `${project.progress}%`, backgroundColor: project.progress === 100 ? 'var(--success)' : 'var(--primary)' }}></div>
        </div>
      </div>
      
      <div className="tf-pc-metrics">
        <div className="tf-pc-metric">
          <span className="tf-pc-metric-label">Tasks</span>
          <span className="tf-pc-metric-val">{project.tasks} tasks</span>
        </div>
        <div className="tf-pc-metric">
          <span className="tf-pc-metric-label">Due Date</span>
          <span className="tf-pc-metric-val">{project.dueDate}</span>
        </div>
      </div>
      
      <div className="tf-pc-footer">
        <div className="tf-avatar-group">
          {project.team.slice(0, 3).map((avatar, idx) => (
            <div key={idx} className="tf-avatar">
              <img src={avatar} alt="Team member" />
            </div>
          ))}
          {project.team.length > 3 && (
            <div className="tf-avatar" style={{ backgroundColor: '#F1F5F9' }}>
              +{project.team.length - 3}
            </div>
          )}
        </div>
        <span className="tf-pc-updated">{project.updated}</span>
      </div>
    </div>
  );
}
