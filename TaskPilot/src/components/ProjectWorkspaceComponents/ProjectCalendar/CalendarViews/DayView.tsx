import type { CalendarEvent } from '../ProjectCalendar';

export default function DayView({ events }: { events: CalendarEvent[] }) {
  return (
    <div className="tf-day-view">
      <div style={{ textAlign: 'center' }}>
        <h3>Day View Placeholder</h3>
        <p>Thursday, August 27 with hourly timeline</p>
      </div>
    </div>
  );
}
