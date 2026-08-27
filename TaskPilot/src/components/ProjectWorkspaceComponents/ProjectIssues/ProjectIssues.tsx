import { useState } from 'react';
import IssuesHeader from './IssuesHeader';
import IssuesToolbar from './IssuesToolbar';
import ActiveFilters from './ActiveFilters';
import IssueTable from './IssueTable';
import BulkActionBar from './BulkActionBar';
import Pagination from './Pagination';
import { EmptyState, SearchEmptyState, FilterEmptyState, LoadingState, ErrorState } from './StateComponents';
import './ProjectIssues.css';

export interface Issue {
  id: string;
  key: string;
  title: string;
  type: 'bug' | 'story' | 'task' | 'epic' | 'subtask' | 'improvement';
  statusId: 'todo' | 'in-progress' | 'code-review' | 'testing' | 'done';
  priority: 'highest' | 'high' | 'medium' | 'low' | 'lowest';
  assigneeName?: string;
  assigneeAvatar?: string;
  reporterName?: string;
  reporterAvatar?: string;
  sprint?: string;
  points?: number;
  dueDate?: string;
  updatedAt: string;
  isOverdue?: boolean;
}

const mockIssues: Issue[] = [
  {
    id: 'i1',
    key: 'TPW-124',
    title: 'Fix authentication callback redirect loop in production',
    type: 'bug',
    statusId: 'in-progress',
    priority: 'highest',
    assigneeName: 'Prince Rai',
    assigneeAvatar: 'PR',
    reporterName: 'Dev Jon',
    reporterAvatar: 'DJ',
    sprint: 'Sprint 4',
    dueDate: 'Aug 28',
    isOverdue: true,
    points: 5,
    updatedAt: '10 min ago'
  },
  {
    id: 'i2',
    key: 'TPW-125',
    title: 'Implement drag and drop for table rows',
    type: 'story',
    statusId: 'todo',
    priority: 'high',
    assigneeName: 'Prince Rai',
    assigneeAvatar: 'PR',
    reporterName: 'Admin',
    reporterAvatar: 'AD',
    sprint: 'Sprint 4',
    points: 8,
    updatedAt: '1 hour ago'
  },
  {
    id: 'i3',
    key: 'TPW-126',
    title: 'Design Project Board empty states',
    type: 'task',
    statusId: 'todo',
    priority: 'medium',
    assigneeName: 'Dev Jon',
    assigneeAvatar: 'DJ',
    reporterName: 'Prince Rai',
    reporterAvatar: 'PR',
    sprint: 'Backlog',
    updatedAt: 'Yesterday'
  },
  {
    id: 'i4',
    key: 'TPW-127',
    title: 'Update documentation for API',
    type: 'task',
    statusId: 'in-progress',
    priority: 'low',
    reporterName: 'Dev Jon',
    reporterAvatar: 'DJ',
    points: 2,
    dueDate: 'Sep 2',
    updatedAt: '3 days ago'
  },
  {
    id: 'i5',
    key: 'TPW-128',
    title: 'Update dependencies to React 19',
    type: 'improvement',
    statusId: 'done',
    priority: 'lowest',
    assigneeName: 'Prince Rai',
    assigneeAvatar: 'PR',
    sprint: 'Sprint 3',
    updatedAt: '1 week ago'
  }
];

export default function ProjectIssues() {
  const [issues] = useState<Issue[]>(mockIssues);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Hardcoded for mockup
  const [activeFilters, setActiveFilters] = useState<string[]>([
    'Assignee: Prince', 'Priority: High', 'Sprint: Sprint 4'
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewState, setViewState] = useState<'loaded' | 'loading' | 'error' | 'empty' | 'search-empty' | 'filter-empty'>('loaded');

  const filteredIssues = issues.filter(i =>
    i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleSelectAll = () => {
    if (selectedIssues.length === filteredIssues.length) {
      setSelectedIssues([]);
    } else {
      setSelectedIssues(filteredIssues.map(i => i.id));
    }
  };

  const handleSelectIssue = (id: string) => {
    if (selectedIssues.includes(id)) {
      setSelectedIssues(selectedIssues.filter(iId => iId !== id));
    } else {
      setSelectedIssues([...selectedIssues, id]);
    }
  };

  const handleClearFilters = () => setActiveFilters([]);
  const handleRemoveFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  return (
    <div className="tf-issues-page">
      <IssuesHeader totalIssues={124} />

      <IssuesToolbar onSearchChange={setSearchQuery} />

      <ActiveFilters
        filters={activeFilters}
        onClearAll={handleClearFilters}
        onRemoveFilter={handleRemoveFilter}
      />

      {viewState === 'loading' && <LoadingState />}
      {viewState === 'error' && <ErrorState />}
      {viewState === 'empty' && <EmptyState />}
      {viewState === 'search-empty' && <SearchEmptyState />}
      {viewState === 'filter-empty' && <FilterEmptyState onClearFilters={handleClearFilters} />}

      {viewState === 'loaded' && (
        <>
          {filteredIssues.length > 0 ? (
            <IssueTable
              issues={filteredIssues}
              selectedIssues={selectedIssues}
              onToggleSelectAll={handleToggleSelectAll}
              onSelectIssue={handleSelectIssue}
            />
          ) : (
            <SearchEmptyState />
          )}

          <Pagination
            totalItems={124}
            itemsPerPage={50}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <BulkActionBar
        selectedCount={selectedIssues.length}
        onClear={() => setSelectedIssues([])}
      />
    </div>
  );
}
