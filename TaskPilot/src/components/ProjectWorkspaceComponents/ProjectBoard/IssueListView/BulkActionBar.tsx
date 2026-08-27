import React from 'react';
import { X, CheckSquare, UserPlus, Tag, ArrowRight, Trash2 } from 'lucide-react';

interface BulkActionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
}

function BulkActionBar({ selectedCount, onClearSelection }: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="tf-bulk-action-bar">
      <div className="tf-bulk-action-text">
        {selectedCount} issue{selectedCount > 1 ? 's' : ''} selected
      </div>
      <div className="tf-bulk-actions">
        <button className="tf-toolbar-btn">
          <CheckSquare size={14} />
          Change Status
        </button>
        <button className="tf-toolbar-btn">
          <UserPlus size={14} />
          Assign
        </button>
        <button className="tf-toolbar-btn">
          <Tag size={14} />
          Labels
        </button>
        <button className="tf-toolbar-btn">
          <ArrowRight size={14} />
          Move to Sprint
        </button>
        <div style={{ width: '1px', height: '16px', backgroundColor: '#e2e8f0', margin: '0 4px' }} />
        <button className="tf-toolbar-btn" style={{ color: '#ef4444' }}>
          <Trash2 size={14} />
          Delete
        </button>
        <button className="tf-btn-icon" onClick={onClearSelection} style={{ padding: '4px', marginLeft: '4px' }}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

export default BulkActionBar;
