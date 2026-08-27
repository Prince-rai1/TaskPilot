import React from 'react';
import { Search, Filter, List, LayoutGrid, ChevronDown } from 'lucide-react';
import type { ViewMode } from './ProjectBoard';

interface BoardToolbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

function BoardToolbar({ viewMode, onViewModeChange }: BoardToolbarProps) {
  return (
    <div className="tf-board-toolbar">
      <div className="tf-board-toolbar-group">
        <div className="tf-search-input-wrapper">
          <Search size={16} className="tf-search-icon" />
          <input 
            type="text" 
            className="tf-search-input" 
            placeholder="Search issues..." 
          />
        </div>
      </div>
      
      <div className="tf-board-toolbar-group">
        <button className="tf-toolbar-btn">
          <Filter size={16} />
          Filters
        </button>
        <button className="tf-toolbar-btn">
          Group: Status
          <ChevronDown size={14} style={{ marginLeft: 2 }} />
        </button>
        <button className="tf-toolbar-btn">
          Sort: Priority
          <ChevronDown size={14} style={{ marginLeft: 2 }} />
        </button>
        <div style={{ width: '1px', height: '24px', backgroundColor: '#e2e8f0', margin: '0 4px' }} />
        <button 
          className={`tf-toolbar-btn ${viewMode === 'board' ? 'active' : ''}`}
          onClick={() => onViewModeChange('board')}
        >
          <LayoutGrid size={16} />
          Board
        </button>
        <button 
          className={`tf-toolbar-btn ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => onViewModeChange('list')}
        >
          <List size={16} />
          List
        </button>
      </div>
    </div>
  );
}

export default BoardToolbar;
