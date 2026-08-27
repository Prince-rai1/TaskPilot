import { Plus } from 'lucide-react';

interface IssuesHeaderProps {
  totalIssues: number;
}

export default function IssuesHeader({ totalIssues }: IssuesHeaderProps) {
  return (
    <div className="tf-issues-header">
      <div className="tf-issues-title-area">
        <h1 className="tf-issues-title">
          Issues
          <span className="tf-issues-count">{totalIssues} issues</span>
        </h1>
        <p className="tf-issues-subtitle">View and manage all issues in this project.</p>
      </div>

      <button className="tf-btn-primary">
        <Plus size={16} />
        Create Issue
      </button>
    </div>
  );
}
