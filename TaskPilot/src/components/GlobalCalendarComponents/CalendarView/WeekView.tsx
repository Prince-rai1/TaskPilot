const WEEK_EVENTS: Record<number, Array<{ id: string; title: string; type: 'task' | 'milestone' | 'meeting'; project?: string }>> = {
  24: [{ id: 'TPW-121', title: 'Write unit tests', type: 'task', project: 'TaskPilot Web App' }],
  25: [{ id: 'M-5', title: 'Sprint Retro', type: 'meeting' }],
  26: [{ id: 'MOB-040', title: 'Push notifications', type: 'task', project: 'Mobile App' }],
  27: [
    { id: 'TPW-123', title: 'Refactor state mgmt', type: 'task', project: 'TaskPilot Web App' },
    { id: 'TPW-124', title: 'Fix auth callback', type: 'task', project: 'TaskPilot Web App' },
    { id: 'M-2', title: 'Team Sync', type: 'meeting' }
  ],
  28: [{ id: 'MOB-042', title: 'Mobile nav revamp', type: 'task', project: 'Mobile App' }],
  30: [{ id: 'ML-02', title: 'MVP Launch', type: 'milestone' }]
};

export default function WeekView() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="tf-week-wrapper">
      <div className="tf-week-grid">
        {days.map((day, i) => {
          const dateNum = 24 + i;
          const isToday = dateNum === 27;
          const events = WEEK_EVENTS[dateNum] || [];

          return (
            <div key={day} className={`tf-week-col ${isToday ? 'today' : ''}`}>
              <div className="tf-week-col-header">
                <span className="tf-week-col-day">{day}</span>
                <span className="tf-week-col-date">{dateNum}</span>
              </div>
              <div className="tf-week-col-body">
                {events.map((evt, idx) => (
                  <div key={idx} className={`tf-event-pill tf-event-pill--${evt.type}`} title={evt.title}>
                    {evt.type === 'task' ? `${evt.id} · ${evt.title}` : evt.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
