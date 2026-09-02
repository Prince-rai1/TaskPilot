export type FilterType = 'All' | 'Unread' | 'Mentions';

interface NotificationFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

function NotificationFilters({ activeFilter, onFilterChange }: NotificationFiltersProps) {
  const filters: FilterType[] = ['All', 'Unread', 'Mentions'];

  return (
    <div className="tf-notifications-filters">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`tf-filter-tab ${activeFilter === filter ? 'active' : ''}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default NotificationFilters;
