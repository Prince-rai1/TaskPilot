import { useState } from 'react';
import EventPopover from '../EventPopover';

const DUMMY_EVENTS: Record<number, Array<{ id: string; title: string; type: 'task' | 'milestone' | 'meeting'; project?: string; status?: string; priority?: string }>> = {
  2:  [{ id: 'TPW-112', title: 'Update dependencies', type: 'task', project: 'TaskPilot Web App', status: 'Done', priority: 'LOW' }],
  5:  [{ id: 'MOB-034', title: 'Fix iOS padding issue', type: 'task', project: 'Mobile App', status: 'In Review', priority: 'MEDIUM' }],
  8:  [{ id: 'M-1', title: 'Design Review', type: 'meeting' }],
  12: [
    { id: 'TPW-118', title: 'Design system audit', type: 'task', project: 'TaskPilot Web App', status: 'In Progress', priority: 'HIGH' },
    { id: 'M-3', title: 'Q3 Planning', type: 'meeting' }
  ],
  15: [{ id: 'ML-01', title: 'Alpha Release', type: 'milestone' }],
  18: [{ id: 'TPW-119', title: 'Perf optimization', type: 'task', project: 'TaskPilot Web App', status: 'To Do', priority: 'MEDIUM' }],
  20: [{ id: 'TPW-120', title: 'Build Calendar UI', type: 'task', project: 'TaskPilot Web App', status: 'In Progress', priority: 'HIGH' }],
  22: [{ id: 'M-4', title: 'Stakeholder Demo', type: 'meeting' }],
  26: [{ id: 'MOB-040', title: 'Push notifications', type: 'task', project: 'Mobile App', status: 'To Do', priority: 'HIGH' }],
  27: [
    { id: 'TPW-123', title: 'Refactor state mgmt', type: 'task', project: 'TaskPilot Web App', status: 'In Progress', priority: 'MEDIUM' },
    { id: 'TPW-124', title: 'Fix auth callback', type: 'task', project: 'TaskPilot Web App', status: 'In Progress', priority: 'HIGH' },
    { id: 'M-2', title: 'Team Sync', type: 'meeting' }
  ],
  28: [{ id: 'MOB-042', title: 'Mobile nav revamp', type: 'task', project: 'Mobile App', status: 'To Do', priority: 'HIGH' }],
  30: [{ id: 'ML-02', title: 'MVP Launch', type: 'milestone' }]
};

export default function MonthView() {
  const [popoverEvent, setPopoverEvent] = useState<any>(null);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Aug 2026 starts on a Saturday → offset of 5 empty cells before the 1st
  const cells = Array.from({ length: 35 }).map((_, i) => {
    const dateNum = i - 4; // 1st Aug lands at index 5
    const isOtherMonth = dateNum < 1 || dateNum > 31;
    const displayNum = isOtherMonth
      ? (dateNum < 1 ? 31 + dateNum : dateNum - 31)
      : dateNum;
    const isToday = dateNum === 27;
    return { dateNum, displayNum, isOtherMonth, isToday };
  });

  return (
    <div className="tf-month-wrapper">
      {popoverEvent && (
        <>
          <div className="tf-popover-backdrop" onClick={() => setPopoverEvent(null)} />
          <EventPopover event={popoverEvent} onClose={() => setPopoverEvent(null)} />
        </>
      )}

      <div className="tf-month-header-row">
        {days.map((d) => (
          <div key={d} className="tf-month-day-label">{d}</div>
        ))}
      </div>

      <div className="tf-month-grid">
        {cells.map((cell, i) => {
          const events = !cell.isOtherMonth ? (DUMMY_EVENTS[cell.dateNum] || []) : [];
          const visible = events.slice(0, 2);
          const extra = events.length - 2;

          return (
            <div
              key={i}
              className={`tf-month-cell ${cell.isOtherMonth ? 'other-month' : ''} ${cell.isToday ? 'today' : ''}`}
            >
              <span className="tf-month-date">{cell.displayNum}</span>

              {visible.map((evt, idx) => (
                <button
                  key={idx}
                  className={`tf-event-pill tf-event-pill--${evt.type}`}
                  onClick={() => setPopoverEvent(evt)}
                  title={evt.title}
                >
                  {evt.type === 'task' ? `${evt.id} · ${evt.title}` : evt.title}
                </button>
              ))}

              {extra > 0 && (
                <span className="tf-month-more">+{extra} more</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
