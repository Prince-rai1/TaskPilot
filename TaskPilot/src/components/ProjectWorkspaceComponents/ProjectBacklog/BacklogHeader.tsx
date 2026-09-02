import { Plus } from 'lucide-react';

interface BacklogHeaderProps {
  totalIssues: number;
}

export default function BacklogHeader({ totalIssues }: BacklogHeaderProps) {
  return (
    <div className="tf-issues-header">
      <div className="tf-issues-title-area">
        <h1 className="tf-issues-title">
          Backlog
          <span className="tf-issues-count">{totalIssues} issues</span>
        </h1>
        <p className="tf-issues-subtitle">Plan upcoming work and organize issues into sprints.</p>
      </div>

      <button className="tf-btn-primary">
        <Plus size={16} />
        Create Issue
      </button>
    </div>
  );
}
