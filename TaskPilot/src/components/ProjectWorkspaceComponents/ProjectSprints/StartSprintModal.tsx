import { X, AlertTriangle } from 'lucide-react';
import type { SprintData } from './ActiveSprintCard';

interface StartSprintModalProps {
  open: boolean;
  sprint: SprintData | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function StartSprintModal({ open, sprint, onClose, onConfirm }: StartSprintModalProps) {
  if (!open || !sprint) return null;

  return (
    <div className="tf-sprint-modal-backdrop" onClick={onClose}>
      <div className="tf-sprint-modal sm" onClick={(e) => e.stopPropagation()}>
        <div className="tf-sprint-modal-header">
          <h2 className="tf-sprint-modal-title">Start {sprint.name}?</h2>
          <button className="tf-sprint-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="tf-sprint-modal-body">
          <div className="tf-modal-info-panel">
            <div className="tf-modal-info-row">
              <span className="tf-modal-info-label">Start Date</span>
              <span className="tf-modal-info-value">{sprint.startDate}</span>
            </div>
            <div className="tf-modal-info-row">
              <span className="tf-modal-info-label">End Date</span>
              <span className="tf-modal-info-value">{sprint.endDate}</span>
            </div>
            <div className="tf-modal-divider" />
            <div className="tf-modal-info-row">
              <span className="tf-modal-info-label">Issues</span>
              <span className="tf-modal-info-value">{sprint.totalIssues}</span>
            </div>
            <div className="tf-modal-info-row">
              <span className="tf-modal-info-label">Story Points</span>
              <span className="tf-modal-info-value">{sprint.totalPoints}</span>
            </div>
          </div>

          {sprint.goal && (
            <div style={{ fontSize: 14, color: '#475569' }}>
              <span style={{ fontWeight: 500, color: '#334155' }}>Goal: </span>
              {sprint.goal}
            </div>
          )}

          <div className="tf-warning-banner">
            <AlertTriangle size={16} className="tf-warning-banner-icon" />
            <span>Starting this sprint will set it as the active sprint.</span>
          </div>
        </div>

        <div className="tf-sprint-modal-footer">
          <button className="tf-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="tf-btn-primary" onClick={onConfirm}>
            Start Sprint
          </button>
        </div>
      </div>
    </div>
  );
}
