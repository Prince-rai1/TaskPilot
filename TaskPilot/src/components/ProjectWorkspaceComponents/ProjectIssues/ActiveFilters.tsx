import React from 'react';
import { X } from 'lucide-react';

interface ActiveFiltersProps {
  filters: string[];
  onClearAll: () => void;
  onRemoveFilter: (filter: string) => void;
}

export default function ActiveFilters({ filters, onClearAll, onRemoveFilter }: ActiveFiltersProps) {
  if (filters.length === 0) return null;

  return (
    <div className="tf-active-filters">
      {filters.map((filter, index) => (
        <div key={index} className="tf-filter-chip">
          {filter}
          <button 
            className="tf-filter-chip-remove" 
            onClick={() => onRemoveFilter(filter)}
            aria-label="Remove filter"
          >
            <X size={12} />
          </button>
        </div>
      ))}
      <button className="tf-clear-filters" onClick={onClearAll}>
        Clear all
      </button>
    </div>
  );
}
