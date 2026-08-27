import { Search, Filter, ArrowUpDown, LayoutGrid, Bookmark } from 'lucide-react';

interface IssuesToolbarProps {
  onSearchChange: (val: string) => void;
}

export default function IssuesToolbar({ onSearchChange }: IssuesToolbarProps) {
  return (
    <div className="tf-issues-toolbar">
      <div className="tf-toolbar-group">
        <div className="tf-search-input-wrapper">
          <Search className="tf-search-icon" />
          <input
            type="text"
            className="tf-search-input"
            placeholder="Search issues..."
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <button className="tf-btn-secondary">
          <Filter size={16} />
          Filter
        </button>
      </div>

      <div className="tf-toolbar-group">
        <button className="tf-btn-secondary">
          <ArrowUpDown size={16} />
          Sort
        </button>
        <button className="tf-btn-secondary">
          <LayoutGrid size={16} />
          Group By
        </button>
        <button className="tf-btn-secondary">
          <Bookmark size={16} />
          Views
        </button>
      </div>
    </div>
  );
}
