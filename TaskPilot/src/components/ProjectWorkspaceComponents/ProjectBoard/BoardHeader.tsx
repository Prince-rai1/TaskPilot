import React from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';

function BoardHeader() {
  return (
    <div className="tf-board-header">
      <div className="tf-board-header-left">
        <h1 className="tf-board-title">Board</h1>
        <p className="tf-board-subtitle">TaskPilot Web App · TPW</p>
      </div>
      <div className="tf-board-header-right">
        <button className="tf-btn-primary">
          <Plus size={16} />
          Create Issue
        </button>
        <button className="tf-btn-icon" style={{ padding: '8px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}

export default BoardHeader;
