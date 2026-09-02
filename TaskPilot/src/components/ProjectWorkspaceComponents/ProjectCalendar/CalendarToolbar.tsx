import type { ViewMode } from './ProjectCalendar';

interface Props {
  viewMode: ViewMode;
  onViewModeChange: (v: ViewMode) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function CalendarToolbar({ viewMode, onViewModeChange, searchQuery, onSearchChange }: Props) {
  return (
    <div className="tf-calendar-toolbar">
      <div className="tf-calendar-toolbar-left">
        <div className="tf-date-nav">
          <button className="tf-btn-secondary" style={{ padding: '4px 8px' }}>&lt;</button>
          <span className="tf-date-range">August 2026</span>
          <button className="tf-btn-secondary" style={{ padding: '4px 8px' }}>&gt;</button>
        </div>
      </div>
      
      <div className="tf-calendar-toolbar-right">
        <div className="tf-search-input-wrapper">
          <input 
            type="text" 
            className="tf-search-input" 
            placeholder="Search calendar..." 
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>
        
        <button className="tf-btn-secondary">Filters</button>
        
        <div className="tf-view-switcher">
          {(['Month', 'Week', 'Day'] as ViewMode[]).map(mode => (
            <button 
              key={mode}
              className={`tf-view-btn ${viewMode === mode ? 'active' : ''}`}
              onClick={() => onViewModeChange(mode)}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
