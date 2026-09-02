export default function CalendarHeader() {
  return (
    <div className="tf-calendar-header">
      <div className="tf-calendar-header-titles">
        <h1 className="tf-calendar-title">Calendar</h1>
        <p className="tf-calendar-subtitle">View project deadlines, sprints, milestones, and scheduled work.</p>
      </div>
      <div className="tf-calendar-header-actions">
        <button className="tf-btn-secondary">Today</button>
        <button className="tf-btn-primary">+ Create Issue</button>
      </div>
    </div>
  );
}
