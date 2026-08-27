import { SquareTerminal, Bug, Bookmark, MoreHorizontal, CheckSquare, GitPullRequest, ListTodo } from 'lucide-react';
import type { Issue } from './ProjectIssues';

interface IssueRowProps {
  issue: Issue;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function IssueRow({ issue, isSelected, onSelect }: IssueRowProps) {
  const getIssueIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'bug': return <Bug size={16} className="tf-priority-highest" />;
      case 'story': return <Bookmark size={16} className="tf-priority-high" />;
      case 'task': return <CheckSquare size={16} className="tf-priority-medium" />;
      case 'epic': return <ListTodo size={16} style={{ color: '#9333ea' }} />;
      case 'subtask': return <SquareTerminal size={16} className="tf-priority-low" />;
      case 'improvement': return <GitPullRequest size={16} className="tf-status-in-progress" />;
      default: return <SquareTerminal size={16} className="tf-priority-low" />;
    }
  };

  const getPriorityClass = (priority: string) => {
    return `tf-priority-text tf-priority-${priority.toLowerCase()}`;
  };

  return (
    <tr className="tf-issue-row">
      <td onClick={(e) => e.stopPropagation()}>
        <div
          className={`tf-checkbox ${isSelected ? 'checked' : ''}`}
          onClick={() => onSelect(issue.id)}
        >
          {isSelected && <CheckSquare size={14} />}
        </div>
      </td>
      <td>
        <div className="tf-cell-issue">
          {getIssueIcon(issue.type)}
          <span className="tf-issue-key">{issue.key}</span>
          <span className="tf-issue-title-text" title={issue.title}>{issue.title}</span>
        </div>
      </td>
      <td>{issue.type}</td>
      <td>
        <span className={`tf-badge tf-status-${issue.statusId}`}>
          {issue.statusId.toUpperCase().replace('-', ' ')}
        </span>
      </td>
      <td>
        <span className={getPriorityClass(issue.priority)}>
          {issue.priority.toUpperCase()}
        </span>
      </td>
      <td>
        {issue.assigneeName ? (
          <div className="tf-cell-user">
            <div className="tf-small-avatar">{issue.assigneeAvatar}</div>
            <span>{issue.assigneeName}</span>
          </div>
        ) : (
          <span className="tf-unassigned">Unassigned</span>
        )}
      </td>
      <td>
        {issue.reporterName ? (
          <div className="tf-cell-user">
            <div className="tf-small-avatar">{issue.reporterAvatar}</div>
            <span>{issue.reporterName}</span>
          </div>
        ) : (
          <span className="tf-unassigned">System</span>
        )}
      </td>
      <td>{issue.sprint || '-'}</td>
      <td>{issue.points ? `${issue.points} pts` : '-'}</td>
      <td>
        <span style={{ color: issue.isOverdue ? '#dc2626' : 'inherit' }}>
          {issue.dueDate || '-'}
        </span>
      </td>
      <td>{issue.updatedAt}</td>
      <td>
        <div className="tf-row-actions">
          <button className="tf-btn-icon" aria-label="More actions">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
