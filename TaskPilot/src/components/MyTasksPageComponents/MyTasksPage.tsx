import { useState } from 'react';
import Sidebar from '../SharedComponents/Sidebar';
import Topbar from '../SharedComponents/Topbar';
import MyTasksHeader from './MyTasksHeader';
import TaskSummary from './TaskSummary';
import QuickFilters from './QuickFilters';
import TaskToolbar from './TaskToolbar';
import TaskList from './TaskList';
import Pagination from './Pagination';
import './MyTasks.css';

export default function MyTasksPage() {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="tf-my-tasks-wrapper">
      <Sidebar />
      <div className="tf-my-tasks-main">
        <Topbar />
        <div className="tf-my-tasks-content">
          <div className="tf-my-tasks-container">
            <MyTasksHeader />
            <TaskSummary />
            <QuickFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            <TaskToolbar />
            <TaskList
              selectedTasks={selectedTasks}
              onSelectionChange={setSelectedTasks}
            />
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
