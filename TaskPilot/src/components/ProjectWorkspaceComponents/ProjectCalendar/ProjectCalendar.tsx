import { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarToolbar from './CalendarToolbar';
import UpcomingEvents from './UpcomingEvents';
import MonthView from './CalendarViews/MonthView';
import WeekView from './CalendarViews/WeekView';
import DayView from './CalendarViews/DayView';
import './ProjectCalendar.css';

export interface CalendarEvent {
  id: string;
  type: 'issue' | 'sprint' | 'milestone' | 'release';
  title: string;
  startDate: string; // ISO string
  endDate?: string;
  key?: string;
  status?: string;
  priority?: string;
  assigneeName?: string;
}

const mockEvents: CalendarEvent[] = [
  { id: '1', type: 'issue', title: 'Fix authentication callback', key: 'TPW-102', startDate: '2026-08-28', status: 'In Progress', priority: 'High', assigneeName: 'Prince Rai' },
  { id: '2', type: 'milestone', title: 'MVP Dashboard', startDate: '2026-08-30' },
  { id: '3', type: 'sprint', title: 'Sprint 4 ends', startDate: '2026-09-03' },
  { id: '4', type: 'release', title: 'v1.0 Release', startDate: '2026-09-10' },
];

export type ViewMode = 'Month' | 'Week' | 'Day';

export default function ProjectCalendar() {
  const [viewMode, setViewMode] = useState<ViewMode>('Month');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="tf-calendar-page">
      <div className="tf-calendar-main">
        <CalendarHeader />
        <CalendarToolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="tf-calendar-content">
          {viewMode === 'Month' && <MonthView events={mockEvents} />}
          {viewMode === 'Week' && <WeekView events={mockEvents} />}
          {viewMode === 'Day' && <DayView events={mockEvents} />}
        </div>
      </div>

      <div className="tf-calendar-sidebar">
        <UpcomingEvents events={mockEvents} />
      </div>
    </div>
  );
}
