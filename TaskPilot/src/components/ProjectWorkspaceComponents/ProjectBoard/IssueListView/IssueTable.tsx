import React, { useState } from 'react';
import IssueTableHeader from './IssueTableHeader';
import GroupedIssueList from './GroupedIssueList';
import type { IssueData } from '../IssueCard';

interface IssueTableProps {
  issues: IssueData[];
  selectedIssueIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
}

function IssueTable({ issues, selectedIssueIds, onToggleSelect, onToggleSelectAll }: IssueTableProps) {
  const allSelected = issues.length > 0 && selectedIssueIds.size === issues.length;

  return (
    <div className="tf-issue-table-wrapper">
      <table className="tf-issue-table">
        <IssueTableHeader 
          allSelected={allSelected} 
          onToggleSelectAll={onToggleSelectAll} 
        />
        <GroupedIssueList 
          issues={issues} 
          selectedIssueIds={selectedIssueIds} 
          onToggleSelect={onToggleSelect} 
        />
      </table>
    </div>
  );
}

export default IssueTable;
