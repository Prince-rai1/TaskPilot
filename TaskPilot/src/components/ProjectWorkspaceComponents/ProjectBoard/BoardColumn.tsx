import { useState } from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';
import IssueCard, { type IssueData } from './IssueCard';

export interface ColumnData {
  id: string;
  title: string;
  statusId: string;
  wipLimit?: number;
  isCollapsed?: boolean;
}

interface BoardColumnProps {
  column: ColumnData;
  issues: IssueData[];
  onToggleCollapse: (colId: string) => void;
}

const getStatusColorClass = (statusId: string) => {
  switch (statusId) {
    case 'todo': return 'todo';
    case 'in-progress': return 'in-progress';
    case 'done': return 'done';
    default: return 'todo';
  }
};

function BoardColumn({ column, issues, onToggleCollapse }: BoardColumnProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const isAtLimit = column.wipLimit ? issues.length >= column.wipLimit : false;

  if (column.isCollapsed) {
    return (
      <div
        className="tf-board-column collapsed"
        onClick={() => onToggleCollapse(column.id)}
        title="Click to expand"
      >
        <div className="tf-column-header-collapsed">
          <div className={`tf-column-status-dot ${getStatusColorClass(column.statusId)}`} />
          <span className="tf-column-count">{issues.length}</span>
          <span className="tf-column-title-collapsed">{column.title}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="tf-board-column">
      <div className="tf-column-header">
        <div className="tf-column-header-left">
          <div className={`tf-column-status-dot ${getStatusColorClass(column.statusId)}`} />
          <span className="tf-column-title">{column.title}</span>
          <span className="tf-column-count">{issues.length}</span>
          {column.wipLimit && (
            <span className={`tf-column-wip ${isAtLimit ? 'at-limit' : ''}`}>
              / {column.wipLimit}
            </span>
          )}
        </div>
        <button
          className="tf-btn-icon"
          style={{ padding: '4px' }}
          onClick={() => onToggleCollapse(column.id)}
          title="Collapse column"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      <div className="tf-column-body">
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
        {issues.length === 0 && !isAdding && (
          <div style={{ padding: '16px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
            No issues
          </div>
        )}
      </div>

      <div className="tf-column-footer">
        {isAdding ? (
          <div className="tf-quick-add-form">
            <textarea
              className="tf-quick-add-input"
              autoFocus
              placeholder="What needs to be done?"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              rows={2}
            />
            <div className="tf-quick-add-actions">
              <button
                className="tf-btn-icon"
                onClick={() => { setIsAdding(false); setNewTitle(''); }}
                style={{ fontSize: 13, padding: '4px 8px' }}
              >
                Cancel
              </button>
              <button
                className="tf-btn-primary"
                style={{ padding: '4px 12px', fontSize: 13 }}
                onClick={() => { setIsAdding(false); setNewTitle(''); }}
              >
                Create
              </button>
            </div>
          </div>
        ) : (
          <button className="tf-add-issue-btn" onClick={() => setIsAdding(true)}>
            <Plus size={16} />
            Add Issue
          </button>
        )}
      </div>
    </div>
  );
}

export default BoardColumn;
