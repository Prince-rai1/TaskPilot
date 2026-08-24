import { Plus } from 'lucide-react';

interface PageHeaderProps {
  onNewProject: () => void;
}

export default function PageHeader({ onNewProject }: PageHeaderProps) {
  return (
    <div className="tf-page-header">
      <div className="tf-page-header-text">
        <h1>Projects</h1>
        <p>Manage your projects, track progress, and keep your team aligned.</p>
      </div>
      <button className="tf-btn-primary" onClick={onNewProject}>
        <Plus size={20} />
        New Project
      </button>
    </div>
  );
}
