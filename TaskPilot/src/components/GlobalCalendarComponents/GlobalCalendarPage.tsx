import { useState } from 'react';
import Sidebar from '../SharedComponents/Sidebar';
import Topbar from '../SharedComponents/Topbar';
import CalendarHeader from './CalendarHeader';
import CalendarToolbar from './CalendarToolbar';
import MonthView from './CalendarView/MonthView';
import WeekView from './CalendarView/WeekView';
import DayView from './CalendarView/DayView';
// import UpcomingPanel from './UpcomingPanel';
import './GlobalCalendar.css';

export default function GlobalCalendarPage() {
  const [view, setView] = useState<'Month' | 'Week' | 'Day'>('Month');

  return (
    <div className="tf-calendar-wrapper">
      <Sidebar />
      <div className="tf-calendar-main">
        <Topbar />
        <div className="tf-calendar-content">
          <div className="tf-calendar-container">
            <CalendarHeader />
            <CalendarToolbar view={view} onViewChange={setView} />
            <div className="tf-calendar-body">
              <div className="tf-calendar-view-area">
                {view === 'Month' && <MonthView />}
                {view === 'Week' && <WeekView />}
                {view === 'Day' && <DayView />}
              </div>
              {/* <UpcomingPanel /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
