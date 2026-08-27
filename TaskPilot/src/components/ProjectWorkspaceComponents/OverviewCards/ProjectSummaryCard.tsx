import type { ReactNode } from 'react';

interface ProjectSummaryCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  variant: 'progress' | 'issues' | 'completed' | 'team';
}

function ProjectSummaryCard({ label, value, icon, variant }: ProjectSummaryCardProps) {
  return (
    <div className="tf-summary-card">
      <div className={`tf-summary-icon-wrapper ${variant}`}>
        {icon}
      </div>
      <div className="tf-summary-content">
        <span className="tf-summary-label">{label}</span>
        <span className="tf-summary-value">{value}</span>
      </div>
    </div>
  );
}

export default ProjectSummaryCard;
