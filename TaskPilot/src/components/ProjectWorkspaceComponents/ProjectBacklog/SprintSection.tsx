import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { Issue } from './ProjectBacklog';
import BacklogIssueRow from './BacklogIssueRow';
import { EmptySprintState } from './StateComponents';

interface SprintSectionProps {
  title: string;
  dateRange?: string;
  goal?: string;
  issues: Issue[];
  isActive?: boolean;
  onStartSprint?: () => void;
  onCompleteSprint?: () => void;
}

export default function SprintSection({
  title,
  dateRange,
  goal,
  issues,
  isActive,
  onStartSprint,
  onCompleteSprint,
}: SprintSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const completedIssues = issues.filter(i => i.statusId === 'done').length;
  const inProgressIssues = issues.filter(i => i.statusId === 'in-progress').length;
  const todoIssues = issues.length - completedIssues - inProgressIssues;
  const totalPoints = issues.reduce((acc, issue) => acc + (issue.points || 0), 0);
  const completedPercent = issues.length > 0 ? (completedIssues / issues.length) * 100 : 0;
  const inProgressPercent = issues.length > 0 ? (inProgressIssues / issues.length) * 100 : 0;

  return (
    <div className="tf-backlog-sprint-section">
      {/* Sprint Header */}
      <div className="tf-issue-group-header" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <span style={{ fontWeight: 600, color: '#0f172a', fontSize: 14 }}>{title}</span>
        {dateRange && <span style={{ fontSize: 12, color: '#94a3b8' }}>{dateRange}</span>}
        {isActive && (
          <span className="tf-badge tf-status-in-progress" style={{ fontSize: 10, padding: '2px 6px' }}>
            ACTIVE
          </span>
        )}

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: '#64748b' }}>
          {isActive ? (
            <>
              <span style={{ color: '#16a34a' }}>{completedIssues} Done</span>
              <span style={{ color: '#4f46e5' }}>{inProgressIssues} In Progress</span>
              <span style={{ color: '#64748b' }}>{todoIssues} To Do</span>
            </>
          ) : (
            <span>{issues.length} Issues · {totalPoints} pts</span>
          )}

          <div onClick={e => e.stopPropagation()} style={{ display: 'flex', gap: 8 }}>
            {isActive && (
              <button className="tf-btn-secondary" style={{ padding: '4px 12px', fontSize: 12 }} onClick={onCompleteSprint}>
                Complete Sprint
              </button>
            )}
            {!isActive && onStartSprint && (
              <button className="tf-btn-secondary" style={{ padding: '4px 12px', fontSize: 12 }} onClick={onStartSprint}>
                Start Sprint
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sprint Goal + Progress (Active only) */}
      {isActive && isExpanded && goal && (
        <div style={{ padding: '10px 32px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#fafbfc' }}>
          <p style={{ fontSize: 13, color: '#475569', margin: 0 }}>
            <span style={{ fontWeight: 600, color: '#0f172a' }}>Sprint Goal: </span>
            {goal}
          </p>
          <div style={{ width: '100%', backgroundColor: '#e2e8f0', height: 4, borderRadius: 4, marginTop: 8, overflow: 'hidden', display: 'flex' }}>
            <div style={{ width: `${completedPercent}%`, backgroundColor: '#16a34a', height: '100%', borderRadius: '4px 0 0 4px' }} />
            <div style={{ width: `${inProgressPercent}%`, backgroundColor: '#4f46e5', height: '100%' }} />
          </div>
        </div>
      )}

      {/* Issue Table */}
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
            <EmptySprintState />
          )}
        </div>
      )}
    </div>
  );
}
