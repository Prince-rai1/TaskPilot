import { Search, Filter, ArrowUpDown } from 'lucide-react';

export default function TaskToolbar() {
  return (
    <div className="tf-task-toolbar">
      <div className="tf-task-search">
        <Search size={16} color="#777587" style={{ position: 'absolute', left: 12, top: 10 }} />
        <input type="text" placeholder="Search tasks..." />
      </div>
      <div className="tf-task-filters">
        <button className="tf-filter-btn">Project <Filter size={14} /></button>
        <button className="tf-filter-btn">Status <Filter size={14} /></button>
        <button className="tf-filter-btn">Priority <Filter size={14} /></button>
        <button className="tf-filter-btn">Due Date <Filter size={14} /></button>
        <div style={{ width: 1, backgroundColor: '#e2e8f0', margin: '0 8px' }} />
        <button className="tf-filter-btn">Sort: Due Date <ArrowUpDown size={14} /></button>
      </div>
    </div>
  );
}
