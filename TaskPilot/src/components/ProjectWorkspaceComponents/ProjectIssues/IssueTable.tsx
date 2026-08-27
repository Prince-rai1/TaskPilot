import IssueRow from './IssueRow';
import type { Issue } from './ProjectIssues';
import { CheckSquare } from 'lucide-react';

interface IssueTableProps {
  issues: Issue[];
  selectedIssues: string[];
  onToggleSelectAll: () => void;
  onSelectIssue: (id: string) => void;
}

export default function IssueTable({ issues, selectedIssues, onToggleSelectAll, onSelectIssue }: IssueTableProps) {
  const allSelected = issues.length > 0 && selectedIssues.length === issues.length;

  return (
    <div className="tf-issues-content">
      <table className="tf-issues-table">
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <div
                className={`tf-checkbox ${allSelected ? 'checked' : ''}`}
                onClick={onToggleSelectAll}
              >
                {allSelected && <CheckSquare size={14} />}
              </div>
            </th>
            <th>Issue</th>
            <th>Type</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assignee</th>
            <th>Reporter</th>
            <th>Sprint</th>
            <th>Points</th>
            <th>Due Date</th>
            <th>Updated</th>
            <th style={{ width: 60 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <IssueRow
              key={issue.id}
              issue={issue}
              isSelected={selectedIssues.includes(issue.id)}
              onSelect={onSelectIssue}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
