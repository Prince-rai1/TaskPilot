import { SquareTerminal, Bug, Bookmark } from 'lucide-react';
import React from 'react';

export interface IssueData {
  id: string;
  key: string;
  title: string;
  type: 'task' | 'bug' | 'story' | 'epic' | 'subtask';
  priority: 'highest' | 'high' | 'medium' | 'low' | 'lowest';
  statusId: string;
  assigneeAvatar?: string;
  assigneeName?: string;
  labels?: string[];
  points?: number;
  sprint?: string;
  dueDate?: string;
  updatedAt?: string;
}

interface IssueCardProps {
  issue: IssueData;
  isDragging?: boolean;
}

const getIssueTypeIcon = (type: string) => {
  switch (type) {
    case 'task': return <SquareTerminal size={12} />;
    case 'bug': return <Bug size={12} />;
    case 'story': return <Bookmark size={12} />;
    default: return <SquareTerminal size={12} />;
  }
};

const getPriorityBadge = (priority: string) => {
  return (
    <span className={`tf-issue-priority-badge ${priority}`}>
      {priority}
    </span>
  );
};

function IssueCard({ issue, isDragging }: IssueCardProps) {
  return (
    <div className={`tf-issue-card ${isDragging ? 'is-dragging' : ''}`} draggable>
      <div className="tf-issue-card-top">
        <div className="tf-issue-meta-left">
          <div className={`tf-issue-type-icon ${issue.type}`}>
            {getIssueTypeIcon(issue.type)}
          </div>
          <span className="tf-issue-key">{issue.key}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {getPriorityBadge(issue.priority)}
        </div>
      </div>

      <h4 className="tf-issue-title">{issue.title}</h4>

      {issue.labels && issue.labels.length > 0 && (
        <div className="tf-issue-labels" style={{ marginTop: '-4px', marginBottom: '4px' }}>
          {issue.labels.map((label, i) => (
            <span key={i} className="tf-issue-label">{label}</span>
          ))}
        </div>
      )}

      {(issue.points || issue.assigneeAvatar) && (
        <div className="tf-issue-card-bottom">
          <div className="tf-issue-bottom-left">
             {issue.assigneeAvatar && (
              <div className="tf-issue-avatar">
                {issue.assigneeAvatar}
              </div>
            )}
          </div>

          <div className="tf-issue-bottom-right">
            {issue.points && <span className="tf-issue-points">{issue.points}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

export default IssueCard;
