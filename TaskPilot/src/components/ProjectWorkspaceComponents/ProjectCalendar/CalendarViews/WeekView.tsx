import type { CalendarEvent } from '../ProjectCalendar';

export default function WeekView({ events }: { events: CalendarEvent[] }) {
  return (
    <div className="tf-week-view">
      <div style={{ textAlign: 'center' }}>
        <h3>Week View Placeholder</h3>
        <p>Mon 24 | Tue 25 | Wed 26 | Thu 27 | Fri 28 | Sat 29 | Sun 30</p>
      </div>
    </div>
  );
}
