import { X } from 'lucide-react';

interface ActiveFiltersProps {
  filters: string[];
}

function ActiveFilters({ filters }: ActiveFiltersProps) {
  if (!filters || filters.length === 0) return null;

  return (
    <div className="tf-active-filters">
      {filters.map((filter, index) => (
        <span key={index} className="tf-filter-chip">
          {filter}
          <button className="tf-filter-chip-remove" aria-label={`Remove ${filter} filter`}>
            <X size={12} strokeWidth={3} />
          </button>
        </span>
      ))}
      <button className="tf-filter-clear">
        Clear all
      </button>
    </div>
  );
}

export default ActiveFilters;
