import { X, CheckCircle2 } from 'lucide-react';
import type { SprintData } from './ActiveSprintCard';

interface SprintSummaryProps {
  sprint: SprintData;
  onClose: () => void;
}

export default function SprintSummary({ sprint, onClose }: SprintSummaryProps) {
  const completionPercent =
    sprint.totalIssues > 0
      ? Math.round((sprint.completedIssues / sprint.totalIssues) * 100)
      : 0;

  const pointPercent =
    sprint.totalPoints > 0
      ? Math.round((sprint.completedPoints / sprint.totalPoints) * 100)
      : 0;

  return (
    <div className="tf-sprint-summary-card">
      <div className="tf-sprint-summary-header">
        <div className="tf-sprint-summary-header-left">
          <h2 className="tf-sprint-summary-title">
            {sprint.name} Summary
            <span className="tf-sprint-badge completed">Completed</span>
          </h2>
          <p className="tf-sprint-summary-dates">{sprint.startDate} – {sprint.endDate}</p>
        </div>
        <button className="tf-sprint-modal-close" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="tf-sprint-summary-body">
        {/* Issue Progress */}
        <div className="tf-sprint-progress-section" style={{ marginBottom: 0 }}>
          <div className="tf-sprint-progress-header">
            <span className="tf-sprint-progress-label">
              {sprint.completedIssues} / {sprint.totalIssues} issues completed
            </span>
            <span className="tf-sprint-progress-percent">{completionPercent}%</span>
          </div>
          <div className="tf-sprint-progress-bar">
            <div className="tf-sprint-progress-fill success" style={{ width: `${completionPercent}%` }} />
          </div>
        </div>

        {/* Story Points Progress */}
        <div className="tf-sprint-progress-section" style={{ marginBottom: 0 }}>
          <div className="tf-sprint-progress-header">
            <span className="tf-sprint-progress-label">
              {sprint.completedPoints} / {sprint.totalPoints} story points completed
            </span>
            <span className="tf-sprint-progress-value">{pointPercent}%</span>
          </div>
          <div className="tf-sprint-progress-bar">
            <div className="tf-sprint-progress-fill success" style={{ width: `${pointPercent}%` }} />
          </div>
        </div>

        {/* Goal */}
        {sprint.goal && (
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>Sprint Goal</p>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.5 }}>{sprint.goal}</p>
            <div className="tf-sprint-summary-outcome" style={{ marginTop: 10 }}>
              <CheckCircle2 size={16} />
              Successfully completed the sprint goal.
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="tf-sprint-summary-stats-grid">
          <div className="tf-sprint-summary-stat">
            <span className="tf-sprint-summary-stat-value">{sprint.totalIssues}</span>
            <span className="tf-sprint-summary-stat-label">Total Issues</span>
          </div>
          <div className="tf-sprint-summary-stat">
            <span className="tf-sprint-summary-stat-value">{sprint.totalPoints}</span>
            <span className="tf-sprint-summary-stat-label">Story Points</span>
          </div>
          <div className="tf-sprint-summary-stat">
            <span className="tf-sprint-summary-stat-value">14</span>
            <span className="tf-sprint-summary-stat-label">Duration (days)</span>
          </div>
          <div className="tf-sprint-summary-stat">
            <span className="tf-sprint-summary-stat-value">
              {sprint.teamMembers?.length || 8}
            </span>
            <span className="tf-sprint-summary-stat-label">Team Members</span>
          </div>
        </div>
      </div>
    </div>
  );
}
