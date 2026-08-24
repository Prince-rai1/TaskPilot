import { Search, LayoutGrid, List } from 'lucide-react';

interface ProjectToolbarProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

export default function ProjectToolbar({ viewMode, setViewMode }: ProjectToolbarProps) {
  return (
    <div className="tf-project-toolbar">
      <div className="tf-toolbar-left">
        <div className="tf-toolbar-search">
          <Search size={18} className="tf-text-muted" />
          <input type="text" placeholder="Search projects..." />
        </div>
      </div>
      
      <div className="tf-toolbar-right">
        <div className="tf-toolbar-filter">
          <select defaultValue="all">
            <option value="all">All Projects</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
          
          <select defaultValue="updated">
            <option value="updated">Recently Updated</option>
            <option value="created">Recently Created</option>
            <option value="name">Name</option>
            <option value="progress">Progress</option>
            <option value="due">Due Date</option>
          </select>
        </div>
        
        <div className="tf-view-switcher">
          <button 
            className={`tf-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            className={`tf-view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="List View"
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
