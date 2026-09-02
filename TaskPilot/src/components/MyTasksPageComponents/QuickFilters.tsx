interface Props {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function QuickFilters({ activeFilter, onFilterChange }: Props) {
  const filters = ['All', 'Today', 'Upcoming', 'Overdue', 'Completed'];

  return (
    <div className="tf-quick-filters">
      {filters.map(filter => (
        <button
          key={filter}
          className={`tf-quick-filter-btn ${activeFilter === filter ? 'active' : ''}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
