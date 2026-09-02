import {
  Target,
  Calendar,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  Circle,
} from 'lucide-react';

export interface SprintData {
  id: string;
  name: string;
  status: 'active' | 'upcoming' | 'completed';
  startDate: string;
  endDate: string;
  goal?: string;
  totalIssues: number;
  completedIssues: number;
  inProgressIssues: number;
  todoIssues: number;
  totalPoints: number;
  completedPoints: number;
  daysRemaining?: number;
  health?: 'on-track' | 'at-risk' | 'behind';
  teamMembers?: { initials: string; name: string }[];
}

interface ActiveSprintCardProps {
  sprint: SprintData;
  onComplete: () => void;
  onViewBoard: () => void;
  onViewBacklog: () => void;
}

const healthMessages = {
  'on-track': 'Sprint progress is aligned with the planned timeline.',
  'at-risk': 'Remaining work may exceed the sprint timeline.',
  'behind': 'The sprint is behind its planned progress.',
};

export default function ActiveSprintCard({
  sprint,
  onComplete,
  onViewBoard,
  onViewBacklog,
}: ActiveSprintCardProps) {
  const completionPercent =
    sprint.totalIssues > 0
      ? Math.round((sprint.completedIssues / sprint.totalIssues) * 100)
      : 0;

  const pointPercent =
    sprint.totalPoints > 0
      ? Math.round((sprint.completedPoints / sprint.totalPoints) * 100)
      : 0;

  const health = sprint.health || 'on-track';
  const remaining = sprint.totalIssues - sprint.completedIssues - sprint.inProgressIssues;

  return (
    <div className="tf-active-sprint-card">
      {/* Top Row */}
      <div className="tf-active-sprint-top">
        <div className="tf-active-sprint-identity">
          <div className="tf-sprint-name-row">
            <span className="tf-sprint-name">{sprint.name}</span>
            <span className="tf-sprint-badge active">Active</span>
          </div>
          <div className="tf-sprint-dates">
            <Calendar size={14} />
            <span>{sprint.startDate} – {sprint.endDate}</span>
            {sprint.daysRemaining !== undefined && (
              <span className="tf-sprint-remaining">
                <Clock size={13} />
                {sprint.daysRemaining} days remaining
              </span>
            )}
          </div>
        </div>
        <button className="tf-sprint-more-btn">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Goal */}
      <div className="tf-sprint-goal">
        <Target size={16} className="tf-sprint-goal-icon" />
        {sprint.goal ? (
          <span className="tf-sprint-goal-text">{sprint.goal}</span>
        ) : (
          <span className="tf-sprint-goal-text tf-sprint-goal-empty">No sprint goal defined</span>
        )}
      </div>

      {/* Progress */}
      <div className="tf-sprint-progress-section">
        <div className="tf-sprint-progress-header">
          <span className="tf-sprint-progress-label">
            {sprint.completedIssues} / {sprint.totalIssues} issues completed
          </span>
          <span className="tf-sprint-progress-percent">{completionPercent}%</span>
        </div>
        <div className="tf-sprint-progress-bar">
          <div
            className="tf-sprint-progress-fill primary"
            style={{ width: `${completionPercent}%` }}
          />
        </div>

        {/* Story Points sub-progress */}
        <div className="tf-sprint-progress-header" style={{ marginTop: 12 }}>
          <span className="tf-sprint-progress-label">
            {sprint.completedPoints} / {sprint.totalPoints} story points
          </span>
          <span className="tf-sprint-progress-value">{pointPercent}%</span>
        </div>
        <div className="tf-sprint-progress-bar">
          <div
            className="tf-sprint-progress-fill primary"
            style={{ width: `${pointPercent}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="tf-sprint-stats-row">
        <div className="tf-sprint-stat-box">
          <span className="tf-sprint-stat-value">{sprint.totalPoints}</span>
          <span className="tf-sprint-stat-label">Story Points</span>
        </div>
        <div className="tf-sprint-stat-box">
          <span className="tf-sprint-stat-value success">{sprint.completedIssues}</span>
          <span className="tf-sprint-stat-label">Completed</span>
        </div>
        <div className="tf-sprint-stat-box">
          <span className="tf-sprint-stat-value primary">{sprint.inProgressIssues}</span>
          <span className="tf-sprint-stat-label">In Progress</span>
        </div>
        <div className="tf-sprint-stat-box">
          <span className="tf-sprint-stat-value muted">{remaining}</span>
          <span className="tf-sprint-stat-label">Remaining</span>
        </div>
      </div>

      {/* Health */}
      <div className={`tf-sprint-health ${health}`}>
        <div className="tf-sprint-health-dot" />
        <span className="tf-sprint-health-label">
          {health === 'on-track' ? 'On Track' : health === 'at-risk' ? 'At Risk' : 'Behind'}
        </span>
        <span className="tf-sprint-health-text">{healthMessages[health]}</span>
      </div>

      {/* Team */}
      {sprint.teamMembers && sprint.teamMembers.length > 0 && (
        <div className="tf-sprint-team-row">
          <span className="tf-sprint-team-label">Team</span>
          <div className="tf-sprint-team-avatars">
            {sprint.teamMembers.slice(0, 5).map((m, i) => (
              <div key={i} className="tf-sprint-avatar" title={m.name}>
                {m.initials}
              </div>
            ))}
            {sprint.teamMembers.length > 5 && (
              <div className="tf-sprint-avatar more">+{sprint.teamMembers.length - 5}</div>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="tf-sprint-actions">
        <button className="tf-btn-secondary" onClick={onViewBoard}>
          View Board
        </button>
        <button className="tf-btn-secondary" onClick={onViewBacklog}>
          View Backlog
        </button>
        <button className="tf-btn-primary" onClick={onComplete}>
          <CheckCircle2 size={16} />
          Complete Sprint
        </button>
      </div>
    </div>
  );
}
