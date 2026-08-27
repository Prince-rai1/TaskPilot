import React from 'react';
import type { IssueData } from '../IssueCard';

interface MobileIssueListProps {
  issues: IssueData[];
}

function MobileIssueList({ issues }: MobileIssueListProps) {
  if (issues.length === 0) return null;

  return (
    <div className="tf-mobile-issue-list">
      {issues.map(issue => (
        <div key={issue.id} className="tf-mobile-issue-card">
          <div className="tf-mobile-issue-card-top">
            <span className="tf-issue-key">{issue.key}</span>
            <span className={`tf-issue-priority-badge ${issue.priority}`}>
              {issue.priority}
            </span>
          </div>
          <h4 className="tf-issue-title" style={{ marginBottom: 8 }}>{issue.title}</h4>
          
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <span className={`tf-cell-status-badge ${issue.statusId}`}>
              {issue.statusId.toUpperCase()}
            </span>
          </div>

          <div className="tf-mobile-issue-card-bottom">
            <div className="tf-cell-assignee">
              {issue.assigneeAvatar ? (
                <div className="tf-issue-avatar">{issue.assigneeAvatar}</div>
              ) : (
                <div className="tf-issue-avatar" style={{ backgroundColor: '#f1f5f9', color: '#94a3b8', border: '1px dashed #cbd5e1' }}>?</div>
              )}
              <span>{issue.assigneeName || 'Unassigned'}</span>
            </div>
            <span className="tf-cell-text-muted">
              {issue.dueDate || issue.updatedAt || ''}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MobileIssueList;
