import { Search, Bell, HelpCircle } from 'lucide-react';
import './Dashboard.css';

function Topbar() {
  return (
    <header className="tf-topbar-wrapper">
      <div className="tf-search-bar">
        <Search size={18} color="var(--text-muted)" />
        <input type="text" placeholder="Search tasks, projects, or people..." />
      </div>

      <div className="tf-topbar-actions">
        <button className="tf-icon-btn">
          <HelpCircle size={20} />
        </button>
        <button className="tf-icon-btn" style={{ position: 'relative' }}>
          <Bell size={20} />
          <span style={{
            position: 'absolute',
            top: '6px',
            right: '8px',
            width: '8px',
            height: '8px',
            backgroundColor: 'var(--danger)',
            borderRadius: '50%',
            border: '2px solid var(--bg-surface)'
          }}></span>
        </button>
        <div className="tf-avatar" style={{ width: '36px', height: '36px', cursor: 'pointer' }}>
          PR
        </div>
      </div>
    </header>
  );
}

export default Topbar;
