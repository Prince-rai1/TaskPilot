import { ChevronLeft, ChevronRight, Search, SlidersHorizontal } from 'lucide-react';

interface Props {
  view: 'Month' | 'Week' | 'Day';
  onViewChange: (view: 'Month' | 'Week' | 'Day') => void;
}

export default function CalendarToolbar({ view, onViewChange }: Props) {
  return (
    <div className="tf-cal-toolbar">
      {/* Left: Navigation */}
      <div className="tf-cal-toolbar-left">
        <div className="tf-cal-nav-controls">
          <button className="tf-cal-icon-btn" aria-label="Previous month">
            <ChevronLeft size={18} />
          </button>
          <button className="tf-cal-pill-btn">Today</button>
          <button className="tf-cal-icon-btn" aria-label="Next month">
            <ChevronRight size={18} />
          </button>
        </div>
        <h2 className="tf-cal-month-title">August 2026</h2>
      </div>

      {/* Right: View switcher, search, filters */}
      <div className="tf-cal-toolbar-right">
        <div className="tf-cal-view-switcher">
          {(['Month', 'Week', 'Day'] as const).map((v) => (
            <button
              key={v}
              className={`tf-cal-view-btn ${view === v ? 'active' : ''}`}
              onClick={() => onViewChange(v)}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="tf-cal-search-box">
          <Search size={15} className="tf-cal-search-icon" />
          <input type="text" placeholder="Search events..." />
        </div>

        <div className="tf-cal-filter-group">
          <button className="tf-cal-filter-btn">
            <SlidersHorizontal size={14} />
            Project
          </button>
          <button className="tf-cal-filter-btn">
            <SlidersHorizontal size={14} />
            Priority
          </button>
        </div>
      </div>
    </div>
  );
}
