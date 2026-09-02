import { useState } from 'react';
import { X } from 'lucide-react';

interface CreateSprintModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    startDate: string;
    endDate: string;
    goal: string;
    capacity: string;
  }) => void;
  nextSprintNumber: number;
}

export default function CreateSprintModal({
  open,
  onClose,
  onSubmit,
  nextSprintNumber,
}: CreateSprintModalProps) {
  const [name, setName] = useState(`Sprint ${nextSprintNumber}`);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [goal, setGoal] = useState('');
  const [capacity, setCapacity] = useState('');

  if (!open) return null;

  const handleSubmit = () => {
    onSubmit({ name, startDate, endDate, goal, capacity });
    onClose();
  };

  return (
    <div className="tf-sprint-modal-backdrop" onClick={onClose}>
      <div className="tf-sprint-modal lg" onClick={(e) => e.stopPropagation()}>
        <div className="tf-sprint-modal-header">
          <h2 className="tf-sprint-modal-title">Create Sprint</h2>
          <button className="tf-sprint-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="tf-sprint-modal-body">
          <div className="tf-form-field">
            <label className="tf-form-label">Sprint Name</label>
            <input
              type="text"
              className="tf-form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sprint name"
            />
          </div>

          <div className="tf-form-row">
            <div className="tf-form-field">
              <label className="tf-form-label">Start Date</label>
              <input
                type="date"
                className="tf-form-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="tf-form-field">
              <label className="tf-form-label">End Date</label>
              <input
                type="date"
                className="tf-form-input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="tf-form-field">
            <label className="tf-form-label">Sprint Goal</label>
            <textarea
              className="tf-form-input tf-form-textarea"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="What is the goal for this sprint?"
              rows={3}
            />
          </div>

          <div className="tf-form-field">
            <label className="tf-form-label">
              Story Point Capacity
              <span className="tf-form-optional">Optional</span>
            </label>
            <input
              type="number"
              className="tf-form-input"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="30"
              min={0}
            />
            <span className="tf-form-helper">Maximum story points for this sprint</span>
          </div>
        </div>

        <div className="tf-sprint-modal-footer">
          <button className="tf-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="tf-btn-primary" onClick={handleSubmit}>
            Create Sprint
          </button>
        </div>
      </div>
    </div>
  );
}
