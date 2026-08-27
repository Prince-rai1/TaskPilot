import React, { useState } from 'react';
import type { IssueData } from '../IssueCard';
import IssueTable from './IssueTable';
import MobileIssueList from './MobileIssueList';
import BulkActionBar from './BulkActionBar';
import Pagination from './Pagination';
import { IssueListEmptyState } from './IssueListViewStates';
import './IssueListView.css';

interface IssueListViewProps {
  issues: IssueData[];
}

function IssueListView({ issues }: IssueListViewProps) {
  const [selectedIssueIds, setSelectedIssueIds] = useState<Set<string>>(new Set());

  const handleToggleSelect = (id: string) => {
    setSelectedIssueIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleToggleSelectAll = () => {
    if (selectedIssueIds.size === issues.length) {
      setSelectedIssueIds(new Set());
    } else {
      setSelectedIssueIds(new Set(issues.map(i => i.id)));
    }
  };

  const handleClearSelection = () => {
    setSelectedIssueIds(new Set());
  };

  if (issues.length === 0) {
    return (
      <div className="tf-issue-list-container">
        <IssueListEmptyState />
      </div>
    );
  }

  return (
    <div className="tf-issue-list-container">
      <BulkActionBar 
        selectedCount={selectedIssueIds.size} 
        onClearSelection={handleClearSelection} 
      />
      
      <IssueTable 
        issues={issues}
        selectedIssueIds={selectedIssueIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
      />
      
      <MobileIssueList issues={issues} />
      
      <Pagination 
        totalItems={issues.length} 
        itemsPerPage={50} 
        currentPage={1} 
      />
    </div>
  );
}

export default IssueListView;
