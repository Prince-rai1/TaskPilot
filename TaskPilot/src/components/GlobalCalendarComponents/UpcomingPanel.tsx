import { CheckSquare, Flag, Users } from 'lucide-react';

const upcomingEvents = [
  { id: 'TPW-124', title: 'Fix auth callback', project: 'TaskPilot Web App', date: 'Today', type: 'task' as const },
  { id: 'TPW-123', title: 'Refactor state management', project: 'TaskPilot Web App', date: 'Today', type: 'task' as const },
  { id: 'M-2', title: 'Team Sync', project: 'All Teams', date: 'Today', type: 'meeting' as const },
  { id: 'MOB-042', title: 'Mobile navigation revamp', project: 'Mobile App', date: 'Tomorrow', type: 'task' as const },
  { id: 'ML-02', title: 'MVP Launch', project: 'TaskPilot Web App', date: 'Aug 30', type: 'milestone' as const },
  { id: 'TPW-130', title: 'API rate limiting', project: 'TaskPilot Web App', date: 'Sep 01', type: 'task' as const },
  { id: 'MOB-050', title: 'App Store submission', project: 'Mobile App', date: 'Sep 03', type: 'milestone' as const },
];

function getDotClass(type: string) {
  if (type === 'task') return 'tf-upcoming-dot-task';
  if (type === 'milestone') return 'tf-upcoming-dot-milestone';
  return 'tf-upcoming-dot-meeting';
}

export default function UpcomingPanel() {
  return (
    <aside className="tf-upcoming-panel">
      {/* Upcoming Events */}
      <div className="tf-upcoming-section">
        <div className="tf-upcoming-section-header">
          <h3>Upcoming</h3>
          <span className="tf-upcoming-count">7</span>
        </div>
        <div className="tf-upcoming-list">
          {upcomingEvents.map((evt, i) => (
            <div key={i} className="tf-upcoming-item">
              <div className={`tf-upcoming-dot ${getDotClass(evt.type)}`} />
              <div className="tf-upcoming-item-content">
                <span className="tf-upcoming-item-title">{evt.title}</span>
                <span className="tf-upcoming-item-meta">{evt.project}</span>
              </div>
              <span className={`tf-upcoming-item-date ${evt.date === 'Today' ? 'today' : ''}`}>{evt.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Summary */}
      <div className="tf-upcoming-section">
        <div className="tf-upcoming-section-header">
          <h3>Today's Summary</h3>
        </div>
        <div className="tf-today-summary">
          <div className="tf-today-summary-item">
            <div className="tf-today-summary-icon tf-summary-icon-task">
              <CheckSquare size={16} />
            </div>
            <div className="tf-today-summary-info">
              <span className="tf-today-summary-count">3</span>
              <span className="tf-today-summary-label">Tasks</span>
            </div>
          </div>
          <div className="tf-today-summary-item">
            <div className="tf-today-summary-icon tf-summary-icon-meeting">
              <Users size={16} />
            </div>
            <div className="tf-today-summary-info">
              <span className="tf-today-summary-count">1</span>
              <span className="tf-today-summary-label">Meeting</span>
            </div>
          </div>
          <div className="tf-today-summary-item">
            <div className="tf-today-summary-icon tf-summary-icon-milestone">
              <Flag size={16} />
            </div>
            <div className="tf-today-summary-info">
              <span className="tf-today-summary-count">0</span>
              <span className="tf-today-summary-label">Milestones</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="tf-cal-legend">
        <div className="tf-cal-legend-item">
          <span className="tf-cal-legend-dot tf-upcoming-dot-task" />
          <span>Tasks</span>
        </div>
        <div className="tf-cal-legend-item">
          <span className="tf-cal-legend-dot tf-upcoming-dot-milestone" />
          <span>Milestones</span>
        </div>
        <div className="tf-cal-legend-item">
          <span className="tf-cal-legend-dot tf-upcoming-dot-meeting" />
          <span>Meetings</span>
        </div>
      </div>
    </aside>
  );
}
