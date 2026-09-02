import { useState } from 'react';
import { X, CheckCircle2, Clock, Circle } from 'lucide-react';
import type { SprintData } from './ActiveSprintCard';

type MoveOption = 'backlog' | 'next-sprint' | 'select';

interface CompleteSprintModalProps {
  open: boolean;
  sprint: SprintData | null;
  nextSprintName?: string;
  onClose: () => void;
  onConfirm: (moveOption: MoveOption) => void;
}

export default function CompleteSprintModal({
  open,
  sprint,
  nextSprintName = 'Sprint 5',
  onClose,
  onConfirm,
}: CompleteSprintModalProps) {
  const [moveOption, setMoveOption] = useState<MoveOption>('backlog');

  if (!open || !sprint) return null;

  const incompleteCount = sprint.inProgressIssues + sprint.todoIssues;

  const options: { value: MoveOption; label: string }[] = [
    { value: 'backlog', label: 'Move to Backlog' },
    { value: 'next-sprint', label: `Move to next sprint (${nextSprintName})` },
    { value: 'select', label: 'Select destination...' },
  ];

  return (
    <div className="tf-sprint-modal-backdrop" onClick={onClose}>
      <div className="tf-sprint-modal md" onClick={(e) => e.stopPropagation()}>
        <div className="tf-sprint-modal-header">
          <h2 className="tf-sprint-modal-title">Complete {sprint.name}?</h2>
          <button className="tf-sprint-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="tf-sprint-modal-body">
          {/* Stats */}
          <div className="tf-modal-stats-grid">
            <div className="tf-modal-stat">
              <CheckCircle2 size={18} style={{ color: '#10b981', marginBottom: 4 }} />
              <span className="tf-modal-stat-value success">{sprint.completedIssues}</span>
              <span className="tf-modal-stat-label">Completed</span>
            </div>
            <div className="tf-modal-stat">
              <Clock size={18} style={{ color: '#4f46e5', marginBottom: 4 }} />
              <span className="tf-modal-stat-value primary">{sprint.inProgressIssues}</span>
              <span className="tf-modal-stat-label">In Progress</span>
            </div>
            <div className="tf-modal-stat">
              <Circle size={18} style={{ color: '#64748b', marginBottom: 4 }} />
              <span className="tf-modal-stat-value muted">{sprint.todoIssues}</span>
              <span className="tf-modal-stat-label">Remaining</span>
            </div>
          </div>

          <div className="tf-modal-divider" />

          {/* Where to move incomplete issues */}
          {incompleteCount > 0 && (
            <>
              <p className="tf-modal-question">What should happen to incomplete issues?</p>

              <div className="tf-radio-group">
                {options.map((opt) => (
                  <div
                    key={opt.value}
                    className={`tf-radio-option ${moveOption === opt.value ? 'selected' : ''}`}
                    onClick={() => setMoveOption(opt.value)}
                  >
                    <div className="tf-radio-dot">
                      <div className="tf-radio-dot-inner" />
                    </div>
                    <span>{opt.label}</span>
                  </div>
                ))}
              </div>

              <p className="tf-modal-hint">
                {incompleteCount} incomplete issue{incompleteCount !== 1 ? 's' : ''} will be moved.
              </p>
            </>
          )}
        </div>

        <div className="tf-sprint-modal-footer">
          <button className="tf-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="tf-btn-primary" onClick={() => onConfirm(moveOption)}>
            Complete Sprint
          </button>
        </div>
      </div>
    </div>
  );
}
