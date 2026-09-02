import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { Issue } from './ProjectBacklog';
import BacklogIssueRow from './BacklogIssueRow';

interface FutureBacklogProps {
  issues: Issue[];
}

export default function FutureBacklog({ issues }: FutureBacklogProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const totalPoints = issues.reduce((acc, issue) => acc + (issue.points || 0), 0);

  return (
    <div className="tf-backlog-sprint-section">
      <div className="tf-issue-group-header" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <span style={{ fontWeight: 600, color: '#0f172a', fontSize: 14 }}>Backlog</span>
        <span style={{ fontSize: 12, color: '#94a3b8' }}>Issues not assigned to a sprint</span>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: '#64748b' }}>
          <span>{issues.length} Issues · {totalPoints} pts</span>
        </div>
      </div>

      {isExpanded && (
        <div className="tf-issues-content" style={{ overflow: 'visible' }}>
          {issues.length > 0 ? (
            <table className="tf-issues-table" style={{ minWidth: 'auto' }}>
              <thead>
                <tr>
                  <th style={{ width: 32 }}></th>
                  <th>Issue</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Assignee</th>
                  <th>Points</th>
                  <th style={{ width: 40 }}></th>
                </tr>
              </thead>
              <tbody>
                {issues.map(issue => <BacklogIssueRow key={issue.id} issue={issue} />)}
              </tbody>
            </table>
          ) : (
            <div className="tf-empty-state" style={{ padding: 32 }}>
              <p className="tf-empty-title" style={{ fontSize: 14 }}>No unassigned issues</p>
              <p className="tf-empty-desc" style={{ fontSize: 13, marginBottom: 0 }}>All issues are currently assigned to a sprint.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
