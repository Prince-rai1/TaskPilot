import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface IssueTableHeaderProps {
  allSelected: boolean;
  onToggleSelectAll: () => void;
}

function IssueTableHeader({ allSelected, onToggleSelectAll }: IssueTableHeaderProps) {
  return (
    <thead>
      <tr>
        <th className="tf-cell-checkbox">
          <input 
            type="checkbox" 
            checked={allSelected} 
            onChange={onToggleSelectAll} 
          />
        </th>
        <th className="sortable">
          Issue <ArrowUpDown size={12} style={{ marginLeft: 4, display: 'inline' }} />
        </th>
        <th>Type</th>
        <th>Status</th>
        <th className="sortable">
          Priority <ArrowUpDown size={12} style={{ marginLeft: 4, display: 'inline' }} />
        </th>
        <th>Assignee</th>
        <th className="tf-col-sprint">Sprint</th>
        <th className="sortable">
          Points <ArrowUpDown size={12} style={{ marginLeft: 4, display: 'inline' }} />
        </th>
        <th className="sortable">
          Due Date <ArrowUpDown size={12} style={{ marginLeft: 4, display: 'inline' }} />
        </th>
        <th className="sortable tf-col-updated">
          Updated <ArrowUpDown size={12} style={{ marginLeft: 4, display: 'inline' }} />
        </th>
        <th className="tf-cell-actions"></th>
      </tr>
    </thead>
  );
}

export default IssueTableHeader;
