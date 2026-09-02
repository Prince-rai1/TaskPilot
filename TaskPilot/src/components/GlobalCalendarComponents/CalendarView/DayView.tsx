import { CheckSquare, Users, Flag } from 'lucide-react';

export default function DayView() {
  return (
    <div className="tf-day-view">
      {/* Tasks */}
      <section className="tf-day-section">
        <div className="tf-day-section-header">
          <CheckSquare size={18} className="tf-day-section-icon tf-icon-task" />
          <h3>Tasks</h3>
          <span className="tf-day-section-count">3</span>
        </div>
        <div className="tf-day-cards">
          <div className="tf-day-card tf-day-card--task">
            <div className="tf-day-card-main">
              <span className="tf-day-card-key">TPW-123</span>
              <span className="tf-day-card-title">Refactor state management</span>
              <span className="tf-day-card-project">TaskPilot Web App</span>
            </div>
            <span className="tf-day-card-badge tf-badge-progress">In Progress</span>
          </div>
          <div className="tf-day-card tf-day-card--task">
            <div className="tf-day-card-main">
              <span className="tf-day-card-key">TPW-124</span>
              <span className="tf-day-card-title">Fix authentication callback</span>
              <span className="tf-day-card-project">TaskPilot Web App</span>
            </div>
            <span className="tf-day-card-badge tf-badge-progress">In Progress</span>
          </div>
          <div className="tf-day-card tf-day-card--task">
            <div className="tf-day-card-main">
              <span className="tf-day-card-key">MOB-042</span>
              <span className="tf-day-card-title">Mobile navigation revamp</span>
              <span className="tf-day-card-project">Mobile App</span>
            </div>
            <span className="tf-day-card-badge tf-badge-todo">To Do</span>
          </div>
        </div>
      </section>

      {/* Meetings */}
      <section className="tf-day-section">
        <div className="tf-day-section-header">
          <Users size={18} className="tf-day-section-icon tf-icon-meeting" />
          <h3>Meetings</h3>
          <span className="tf-day-section-count">1</span>
        </div>
        <div className="tf-day-cards">
          <div className="tf-day-card tf-day-card--meeting">
            <div className="tf-day-card-main">
              <span className="tf-day-card-title">Team Sync</span>
              <span className="tf-day-card-project">All Teams · 10:00 AM – 11:00 AM</span>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="tf-day-section">
        <div className="tf-day-section-header">
          <Flag size={18} className="tf-day-section-icon tf-icon-milestone" />
          <h3>Milestones</h3>
          <span className="tf-day-section-count">0</span>
        </div>
        <div className="tf-day-empty">
          <span>No milestones today</span>
        </div>
      </section>
    </div>
  );
}
