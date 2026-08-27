import React, { useState } from 'react';
import BoardHeader from './BoardHeader';
import BoardToolbar from './BoardToolbar';
import ActiveFilters from './ActiveFilters';
import KanbanBoard from './KanbanBoard';
import IssueListView from './IssueListView/IssueListView';
import type { ColumnData } from './BoardColumn';
import type { IssueData } from './IssueCard';
import './ProjectBoard.css';

const mockColumns: ColumnData[] = [
  { id: 'c0', title: 'Backlog', statusId: 'todo' },
  { id: 'c1', title: 'To Do', statusId: 'todo' },
  { id: 'c2', title: 'In Progress', statusId: 'in-progress', wipLimit: 5 },
  { id: 'c3', title: 'In Review', statusId: 'in-progress' },
  { id: 'c4', title: 'Done', statusId: 'done' },
];

const mockIssues: IssueData[] = [
  {
    id: 'i1',
    key: 'TPW-124',
    title: 'Fix authentication callback redirect loop in production',
    type: 'bug',
    statusId: 'in-progress',
    priority: 'highest',
    labels: ['#backend', '#auth'],
    points: 5,
    assigneeAvatar: 'PR',
    assigneeName: 'Prince Rai',
    sprint: 'Sprint 4',
    dueDate: 'Aug 28',
    updatedAt: '10 min ago'
  },
  {
    id: 'i2',
    key: 'TPW-125',
    title: 'Implement Kanban drag and drop functionality',
    type: 'story',
    statusId: 'todo',
    priority: 'high',
    labels: ['#frontend'],
    points: 8,
    assigneeAvatar: 'PR',
    assigneeName: 'Prince Rai',
    sprint: 'Sprint 4',
    updatedAt: '1 hour ago'
  },
  {
    id: 'i3',
    key: 'TPW-126',
    title: 'Design Project Board empty states',
    type: 'task',
    statusId: 'todo',
    priority: 'medium',
    assigneeAvatar: 'DJ',
    assigneeName: 'Dev Jon',
    sprint: 'Backlog',
    updatedAt: 'Yesterday'
  },
  {
    id: 'i4',
    key: 'TPW-127',
    title: 'Write documentation for new API endpoints',
    type: 'task',
    statusId: 'in-progress',
    priority: 'low',
    labels: ['#docs'],
    points: 2,
    dueDate: 'Sep 2',
    updatedAt: '3 days ago'
  },
  {
    id: 'i5',
    key: 'TPW-128',
    title: 'Update dependencies to React 19',
    type: 'task',
    statusId: 'done',
    priority: 'medium',
    labels: ['#chore'],
    updatedAt: '1 week ago'
  }
];

const mockActiveFilters = ['Assignee: Prince', 'Priority: High', 'Sprint: Sprint 4'];

export type ViewMode = 'board' | 'list';

function ProjectBoard() {
  const [columns, setColumns] = useState<ColumnData[]>(mockColumns);
  const [viewMode, setViewMode] = useState<ViewMode>('list'); // Default to list for development of this feature

  const handleToggleCollapse = (colId: string) => {
    setColumns(columns.map(col => 
      col.id === colId ? { ...col, isCollapsed: !col.isCollapsed } : col
    ));
  };

  return (
    <div className="tf-board-workspace">
      <BoardHeader />
      <BoardToolbar viewMode={viewMode} onViewModeChange={setViewMode} />
      <ActiveFilters filters={mockActiveFilters} />
      
      {viewMode === 'board' ? (
        <KanbanBoard 
          columns={columns} 
          issues={mockIssues} 
          onToggleCollapse={handleToggleCollapse}
        />
      ) : (
        <IssueListView issues={mockIssues} />
      )}
    </div>
  );
}

export default ProjectBoard;
