import React from 'react';
import BoardColumn, { type ColumnData } from './BoardColumn';
import type { IssueData } from './IssueCard';

interface KanbanBoardProps {
  columns: ColumnData[];
  issues: IssueData[];
  onToggleCollapse: (colId: string) => void;
}

function KanbanBoard({ columns, issues, onToggleCollapse }: KanbanBoardProps) {
  // Simple mock mapping based on a hardcoded id assignment just for demonstration.
  // In reality, this would filter based on issue.statusId === column.id
  const getIssuesForColumn = (colId: string) => {
    switch (colId) {
      case 'c0': return issues.slice(0, 1);
      case 'c1': return issues.slice(1, 2);
      case 'c2': return issues.slice(2, 4);
      case 'c3': return issues.slice(4, 5);
      case 'c4': return issues.slice(5);
      default: return [];
    }
  };

  return (
    <div className="tf-kanban-board">
      {columns.map((col) => (
        <BoardColumn
          key={col.id}
          column={col}
          issues={getIssuesForColumn(col.id)}
          onToggleCollapse={onToggleCollapse}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;
