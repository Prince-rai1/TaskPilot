import { X, CheckSquare, UserPlus, Tag, ArrowRight, Trash2 } from 'lucide-react';

interface BulkActionBarProps {
  selectedCount: number;
  onClear: () => void;
}

export default function BulkActionBar({ selectedCount, onClear }: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="tf-bulk-action-bar">
      <div className="tf-bulk-selection-info">
        <span>{selectedCount} issues selected</span>
        <button className="tf-bulk-close tf-btn-icon" onClick={onClear} aria-label="Clear selection">
          <X size={16} />
        </button>
      </div>

      <div className="tf-bulk-actions">
        <button className="tf-btn-bulk">
          <CheckSquare size={14} /> Change Status
        </button>
        <button className="tf-btn-bulk">
          <UserPlus size={14} /> Assign
        </button>
        <button className="tf-btn-bulk">
          <ArrowRight size={14} /> Change Priority
        </button>
        <button className="tf-btn-bulk">
          <Tag size={14} /> Add Label
        </button>
        <button className="tf-btn-bulk">
          <ArrowRight size={14} /> Move to Sprint
        </button>
        <button className="tf-btn-bulk tf-btn-bulk-danger">
          <Trash2 size={14} /> Delete
        </button>
        <button className="tf-btn-bulk">
          More
        </button>
      </div>
    </div>
  );
}
