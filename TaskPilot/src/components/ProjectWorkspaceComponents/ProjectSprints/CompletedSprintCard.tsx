import { Calendar, MoreHorizontal } from 'lucide-react';
import type { SprintData } from './ActiveSprintCard';

interface CompletedSprintCardProps {
  sprint: SprintData;
  onViewSummary?: () => void;
}

export default function CompletedSprintCard({ sprint, onViewSummary }: CompletedSprintCardProps) {
  const completionPercent =
    sprint.totalIssues > 0
      ? Math.round((sprint.completedIssues / sprint.totalIssues) * 100)
      : 0;

  return (
    <div className="tf-sprint-card completed">
      <div className="tf-sprint-card-header">
        <span className="tf-sprint-card-name">{sprint.name}</span>
        <span className="tf-sprint-badge completed">Completed</span>
      </div>

      <div className="tf-sprint-card-dates">
        <Calendar size={13} />
        <span>{sprint.startDate} – {sprint.endDate}</span>
      </div>

      <div className="tf-sprint-card-progress">
        <div className="tf-sprint-card-progress-text">
          <span>{sprint.completedIssues} / {sprint.totalIssues} issues completed</span>
          <span>{completionPercent}%</span>
        </div>
        <div className="tf-sprint-card-progress-bar">
          <div
            className="tf-sprint-card-progress-fill"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      <div className="tf-sprint-card-points">
        {sprint.completedPoints} / {sprint.totalPoints} story points
      </div>

      <div className="tf-sprint-card-footer">
        <button className="tf-sprint-card-link" onClick={onViewSummary}>
          View Summary
        </button>
        <button className="tf-sprint-more-btn" style={{ border: 'none', padding: 4 }}>
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}
