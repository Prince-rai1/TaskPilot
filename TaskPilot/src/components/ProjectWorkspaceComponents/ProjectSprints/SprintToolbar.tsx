import { Search, ArrowUpDown, LayoutGrid, List } from 'lucide-react';

export type StatusFilter = 'active' | 'upcoming' | 'completed' | 'all';
export type SortOption = 'startDate' | 'endDate' | 'name' | 'progress' | 'storyPoints';
export type ViewMode = 'card' | 'list';

interface SprintToolbarProps {
  statusFilter: StatusFilter;
  onStatusFilterChange: (f: StatusFilter) => void;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  sortBy: SortOption;
  onSortChange: (s: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (v: ViewMode) => void;
}

const statusOptions: { label: string; value: StatusFilter }[] = [
  { label: 'Active', value: 'active' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Completed', value: 'completed' },
  { label: 'All', value: 'all' },
];

const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'Start Date', value: 'startDate' },
  { label: 'End Date', value: 'endDate' },
  { label: 'Name', value: 'name' },
  { label: 'Progress', value: 'progress' },
  { label: 'Story Points', value: 'storyPoints' },
];

export default function SprintToolbar({
  statusFilter,
  onStatusFilterChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: SprintToolbarProps) {
  return (
    <div className="tf-sprints-toolbar">
      <div className="tf-sprints-toolbar-left">
        <div className="tf-status-filter-group">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              className={`tf-status-filter-pill ${statusFilter === opt.value ? 'active' : ''}`}
              onClick={() => onStatusFilterChange(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="tf-search-input-wrapper">
          <Search className="tf-search-icon" />
          <input
            type="text"
            className="tf-search-input"
            placeholder="Search sprints..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="tf-sprints-toolbar-right">
        <div style={{ position: 'relative' }}>
          <button className="tf-btn-secondary" onClick={() => {
            const sortValues = sortOptions.map(s => s.value);
            const idx = sortValues.indexOf(sortBy);
            onSortChange(sortValues[(idx + 1) % sortValues.length]);
          }}>
            <ArrowUpDown size={16} />
            {sortOptions.find(s => s.value === sortBy)?.label}
          </button>
        </div>

        <div className="tf-view-toggle">
          <button
            className={`tf-view-toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
            onClick={() => onViewModeChange('card')}
            title="Card View"
          >
            <LayoutGrid size={16} />
          </button>
          <button
            className={`tf-view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => onViewModeChange('list')}
            title="List View"
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
