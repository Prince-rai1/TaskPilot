import type { CalendarEvent } from './ProjectCalendar';

export default function UpcomingEvents({ events }: { events: CalendarEvent[] }) {
  return (
    <>
      <div className="tf-upcoming-header">
        Upcoming
      </div>
      <div className="tf-upcoming-list">
        {events.map(event => (
          <div key={event.id} className="tf-upcoming-item">
            <span className="tf-upcoming-date">{new Date(event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            <div className="tf-upcoming-card">
              <div className="tf-upcoming-card-title">{event.title}</div>
              <div className="tf-upcoming-card-meta">
                <span className={`tf-event-badge ${event.type}`}>{event.type.charAt(0).toUpperCase() + event.type.slice(1)}</span>
                {event.key && <span>{event.key}</span>}
              </div>
            </div>
          </div>
        ))}
        <button className="tf-btn-secondary" style={{ marginTop: 8 }}>View all</button>
      </div>
    </>
  );
}
