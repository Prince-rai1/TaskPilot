import { MoreVertical } from 'lucide-react';
import type { ProjectData } from './ProjectCard';

interface ProjectListProps {
  projects: ProjectData[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="tf-projects-list-container">
      <div className="tf-projects-table-wrapper">
        <table className="tf-projects-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Tasks</th>
              <th>Team</th>
              <th>Due Date</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td>
                  <div className="tf-table-project-name">
                    <span>{project.name}</span>
                    <span className="tf-pc-key">{project.key}</span>
                  </div>
                </td>
                <td>
                  <span className="tf-badge" style={{ backgroundColor: project.status === 'Active' ? '#e0f2fe' : project.status === 'Completed' ? '#d1fae5' : '#f3f4f6', color: project.status === 'Active' ? '#0EA5E9' : project.status === 'Completed' ? '#10B981' : '#6B7280' }}>
                    {project.status}
                  </span>
                </td>
                <td>
                  <div className="tf-table-progress-wrapper">
                    <span className="tf-pc-progress-val">{project.progress}%</span>
                    <div className="tf-progress-bar tf-table-progress-bar">
                      <div className="tf-progress-fill" style={{ width: `${project.progress}%`, backgroundColor: project.progress === 100 ? 'var(--success)' : 'var(--primary)' }}></div>
                    </div>
                  </div>
                </td>
                <td>{project.tasks}</td>
                <td>
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
                </td>
                <td>{project.dueDate}</td>
                <td className="tf-text-muted">{project.updated}</td>
                <td>
                  <button className="tf-icon-btn">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
