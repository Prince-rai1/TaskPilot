import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import IssueRow from './IssueRow';
import type { IssueData } from '../IssueCard';

interface GroupedIssueListProps {
  issues: IssueData[];
  selectedIssueIds: Set<string>;
  onToggleSelect: (id: string) => void;
}

// Helper to group issues by statusId
const groupIssuesByStatus = (issues: IssueData[]) => {
  const groups: Record<string, IssueData[]> = {
    'todo': [],
    'in-progress': [],
    'done': []
  };

  issues.forEach(issue => {
    const status = issue.statusId || 'todo';
    if (!groups[status]) groups[status] = [];
    groups[status].push(issue);
  });

  return groups;
};

const getStatusDisplayName = (statusId: string) => {
  switch (statusId) {
    case 'todo': return 'TO DO';
    case 'in-progress': return 'IN PROGRESS';
    case 'done': return 'DONE';
    default: return statusId.toUpperCase();
  }
};

function IssueGroup({ 
  statusId, 
  issues, 
  selectedIssueIds, 
  onToggleSelect 
}: { 
  statusId: string; 
  issues: IssueData[]; 
  selectedIssueIds: Set<string>;
  onToggleSelect: (id: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (issues.length === 0) return null;

  return (
    <>
      <tr>
        <td colSpan={11} style={{ padding: 0 }}>
          <div className="tf-issue-group-header" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <span className="tf-issue-group-title">
              {getStatusDisplayName(statusId)} ({issues.length})
            </span>
          </div>
        </td>
      </tr>
      {isExpanded && issues.map(issue => (
        <IssueRow 
          key={issue.id} 
          issue={issue} 
          isSelected={selectedIssueIds.has(issue.id)}
          onToggleSelect={onToggleSelect}
        />
      ))}
    </>
  );
}

function GroupedIssueList({ issues, selectedIssueIds, onToggleSelect }: GroupedIssueListProps) {
  const groupedIssues = groupIssuesByStatus(issues);

  return (
    <tbody>
      {Object.entries(groupedIssues).map(([statusId, groupIssues]) => (
        <IssueGroup 
          key={statusId}
          statusId={statusId}
          issues={groupIssues}
          selectedIssueIds={selectedIssueIds}
          onToggleSelect={onToggleSelect}
        />
      ))}
    </tbody>
  );
}

export default GroupedIssueList;
