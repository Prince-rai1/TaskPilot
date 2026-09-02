import { Calendar, MoreHorizontal } from 'lucide-react';
import type { SprintData } from './ActiveSprintCard';

interface SprintCardProps {
  sprint: SprintData;
  onOpen?: () => void;
  onStartSprint?: () => void;
}

export default function SprintCard({ sprint, onOpen }: SprintCardProps) {
  return (
    <div className="tf-sprint-card" onClick={onOpen}>
      <div className="tf-sprint-card-header">
        <span className="tf-sprint-card-name">{sprint.name}</span>
        <span className="tf-sprint-badge not-started">Not Started</span>
      </div>

      <div className="tf-sprint-card-dates">
        <Calendar size={13} />
        <span>{sprint.startDate} – {sprint.endDate}</span>
      </div>

      {sprint.goal && (
        <p className="tf-sprint-card-goal">{sprint.goal}</p>
      )}

      <div className="tf-sprint-card-stats">
        <span>{sprint.totalIssues} issues</span>
        <span className="tf-sprint-card-stats-divider" />
        <span>{sprint.totalPoints} story points</span>
      </div>

      <div className="tf-sprint-card-footer">
        <button className="tf-sprint-card-link" onClick={(e) => { e.stopPropagation(); onOpen?.(); }}>
          Open
        </button>
        <button
          className="tf-sprint-more-btn"
          onClick={(e) => e.stopPropagation()}
          style={{ border: 'none', padding: 4 }}
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}
