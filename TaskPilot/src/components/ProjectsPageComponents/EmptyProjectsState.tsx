import { FolderOpen } from 'lucide-react';

interface EmptyProjectsStateProps {
  onNewProject: () => void;
}

export default function EmptyProjectsState({ onNewProject }: EmptyProjectsStateProps) {
  return (
    <div className="tf-empty-projects">
      <div className="tf-empty-icon">
        <FolderOpen size={32} />
      </div>
      <h3>No projects found</h3>
      <p>Get started by creating your first project to manage tasks and collaborate with your team.</p>
      <button className="tf-btn-primary" onClick={onNewProject}>
        Create Project
      </button>
    </div>
  );
}
