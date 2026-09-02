import type { CalendarEvent } from '../ProjectCalendar';

export default function MonthView({ events }: { events: CalendarEvent[] }) {
  return (
    <div className="tf-month-view">
      <div style={{ textAlign: 'center' }}>
        <h3>Month View Placeholder</h3>
        <p>A full 7-column grid for August 2026</p>
      </div>
    </div>
  );
}
