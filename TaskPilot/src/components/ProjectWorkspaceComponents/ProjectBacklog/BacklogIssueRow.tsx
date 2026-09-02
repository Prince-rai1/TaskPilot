import { Bug, CheckSquare, Bookmark, ListTodo, SquareTerminal, GitPullRequest, GripVertical, MoreHorizontal } from 'lucide-react';
import type { Issue } from './ProjectBacklog';

interface BacklogIssueRowProps {
  issue: Issue;
}

export default function BacklogIssueRow({ issue }: BacklogIssueRowProps) {
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

  const isDone = issue.statusId === 'done';

  return (
    <tr className="tf-issue-row">
      <td style={{ width: 32, padding: '10px 8px' }}>
        <div style={{ cursor: 'grab', color: '#94a3b8', display: 'flex', justifyContent: 'center' }}>
          <GripVertical size={16} />
        </div>
      </td>
      <td>
        <div className="tf-cell-issue">
          {getIssueIcon(issue.type)}
          <span className="tf-issue-key">{issue.key}</span>
          <span className={`tf-issue-title-text ${isDone ? 'tf-issue-done' : ''}`} title={issue.title}>
            {issue.title}
          </span>
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
      <td>{issue.points ? `${issue.points} pts` : '-'}</td>
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
