import { CalendarDays } from 'lucide-react';
import './Dashboard.css';

const MOCK_TASKS = [
  { id: 1, title: 'Design system updates', project: 'TaskForge Web', priority: 'high', status: 'in-progress', date: 'Today', assignee: 'PR' },
  { id: 2, title: 'API Integration for Auth', project: 'Backend Service', priority: 'high', status: 'todo', date: 'Tomorrow', assignee: 'JD' },
  { id: 3, title: 'Update user documentation', project: 'Documentation', priority: 'medium', status: 'todo', date: 'Oct 25', assignee: 'AS' },
  { id: 4, title: 'Fix navigation bug on mobile', project: 'TaskForge iOS', priority: 'high', status: 'review', date: 'Oct 26', assignee: 'PR' },
  { id: 5, title: 'Prepare Q4 presentation', project: 'Marketing', priority: 'low', status: 'todo', date: 'Nov 1', assignee: 'MK' },
];

function MyTasks() {
  return (
    <div className="tf-card">
      <div className="tf-card-header">
        <h3 className="tf-card-title">My Tasks</h3>
        <a href="#" className="tf-link-action">View all</a>
      </div>
      
      <div className="tf-task-list">
        {MOCK_TASKS.map(task => (
          <div key={task.id} className="tf-task-item">
            <div className="tf-task-main">
              <input type="checkbox" className="tf-task-checkbox" />
              <div className="tf-task-details">
                <h4>{task.title}</h4>
                <div className="tf-task-meta">
                  <span className="tf-status-pill">
                    <span className={`tf-status-dot ${task.status}`}></span>
                    {task.project}
                  </span>
                  <span className={`tf-badge ${task.priority}`}>
                    {task.priority.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="tf-task-end">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                <CalendarDays size={14} />
                <span className="tf-date-sm">{task.date}</span>
              </div>
              <div className="tf-avatar" style={{ width: '28px', height: '28px', fontSize: '0.7rem' }}>
                {task.assignee}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyTasks;
