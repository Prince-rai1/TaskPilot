import React from 'react';
import { SquareTerminal, Bug, Bookmark, MoreHorizontal } from 'lucide-react';
import type { IssueData } from '../IssueCard';

interface IssueRowProps {
  issue: IssueData;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

const getIssueTypeIcon = (type: string) => {
  switch (type) {
    case 'task': return <SquareTerminal size={14} className="tf-issue-type-icon task" />;
    case 'bug': return <Bug size={14} className="tf-issue-type-icon bug" />;
    case 'story': return <Bookmark size={14} className="tf-issue-type-icon story" />;
    default: return <SquareTerminal size={14} className="tf-issue-type-icon task" />;
  }
};

const getStatusName = (statusId: string) => {
  switch (statusId) {
    case 'todo': return 'To Do';
    case 'in-progress': return 'In Progress';
    case 'done': return 'Done';
    default: return 'Backlog';
  }
};

function IssueRow({ issue, isSelected, onToggleSelect }: IssueRowProps) {
  return (
    <tr className={`tf-issue-row ${isSelected ? 'selected' : ''}`}>
      <td className="tf-cell-checkbox">
        <input 
          type="checkbox" 
          checked={isSelected}
          onChange={() => onToggleSelect(issue.id)}
          onClick={(e) => e.stopPropagation()}
        />
      </td>
      <td>
        <div className="tf-cell-issue">
          {getIssueTypeIcon(issue.type)}
          <span className="tf-issue-key">{issue.key}</span>
          <span className="tf-cell-issue-title">{issue.title}</span>
        </div>
      </td>
      <td className="tf-cell-text-muted" style={{ textTransform: 'capitalize' }}>
        {issue.type}
      </td>
      <td>
        <span className={`tf-cell-status-badge ${issue.statusId}`}>
          {getStatusName(issue.statusId)}
        </span>
      </td>
      <td>
        <span className={`tf-issue-priority-badge ${issue.priority}`}>
          {issue.priority}
        </span>
      </td>
      <td>
        <div className="tf-cell-assignee">
          {issue.assigneeAvatar ? (
             <div className="tf-issue-avatar">{issue.assigneeAvatar}</div>
          ) : (
            <div className="tf-issue-avatar" style={{ backgroundColor: '#f1f5f9', color: '#94a3b8', border: '1px dashed #cbd5e1' }}>?</div>
          )}
          <span>{issue.assigneeName || 'Unassigned'}</span>
        </div>
      </td>
      <td className="tf-cell-text-muted tf-col-sprint">
        {issue.sprint || 'Backlog'}
      </td>
      <td>
        {issue.points ? (
          <span className="tf-cell-text-muted">{issue.points} pts</span>
        ) : (
          <span className="tf-cell-text-muted">-</span>
        )}
      </td>
      <td className="tf-cell-text-muted">
        {issue.dueDate || '-'}
      </td>
      <td className="tf-cell-text-muted tf-col-updated">
        {issue.updatedAt || '-'}
      </td>
      <td className="tf-cell-actions">
        <button className="tf-btn-icon" style={{ padding: '4px' }}>
          <MoreHorizontal size={16} />
        </button>
      </td>
    </tr>
  );
}

export default IssueRow;
