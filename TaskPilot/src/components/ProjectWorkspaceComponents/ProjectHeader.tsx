import { Link } from 'react-router-dom';
import { Plus, MoreHorizontal } from 'lucide-react';

interface ProjectHeaderProps {
  projectId?: string;
}

function ProjectHeader({ projectId }: ProjectHeaderProps) {
  return (
    <header className="tf-project-header">
      <div className="tf-breadcrumb">
        <Link to="/projects">Projects</Link>
        <span className="tf-breadcrumb-separator">/</span>
        <span>TaskPilot Web App</span>
      </div>

      <div className="tf-project-header-main">
        <div className="tf-project-identity">
          <div className="tf-project-icon">TW</div>

          <div className="tf-project-title-area">
            <div className="tf-project-title-row">
              <h1 className="tf-project-title">TaskPilot Web App</h1>
              <span className="tf-project-key">TPW</span>
              <span className="tf-project-status">Active</span>
            </div>
            <span className="tf-project-description">Main frontend application redesign</span>
          </div>
        </div>

        <div className="tf-project-actions-area">
          <div className="tf-team-avatars">
            <div className="tf-avatar">PR</div>
            <div className="tf-avatar">AC</div>
            <div className="tf-avatar">SJ</div>
            <div className="tf-avatar">MP</div>
            <div className="tf-avatar tf-avatar-more">+5</div>
          </div>

          <div className="tf-header-actions">
            <button className="tf-btn-primary">
              <Plus size={16} />
              Create Issue
            </button>
            <button className="tf-btn-icon" aria-label="More actions">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ProjectHeader;
