import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setSelectedTask, fetchTaskComments, fetchMyTasks } from '../redux/slices/taskSlice';
import { openTaskDrawer } from '../redux/slices/uiSlice';
import { AppLayout } from '../components/layout/AppLayout';
import { TaskCard } from '../components/tasks/TaskCard';
import { TaskDetailDrawer } from '../components/tasks/TaskDetailDrawer';
import { Spinner } from '../components/common/Spinner';
import type { Task, TaskPriority, TaskStatus } from '../types/task.types';
import {
  CheckSquare,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Filter,
} from 'lucide-react';

export const EmployeeWorkspacePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { tasks: myTasks, isLoading } = useAppSelector((state) => state.tasks);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | TaskStatus>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | TaskPriority>('ALL');

  useEffect(() => {
    dispatch(fetchMyTasks());
  }, [dispatch]);

  const filteredTasks = myTasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'ALL' || t.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalAssigned = myTasks.length;
  const inProgressCount = myTasks.filter((t) => t.status === 'IN_PROGRESS').length;
  const completedCount = myTasks.filter((t) => t.status === 'COMPLETED').length;
  const todoCount = myTasks.filter((t) => t.status === 'TODO').length;

  const handleTaskClick = (task: Task) => {
    dispatch(setSelectedTask(task));
    dispatch(fetchTaskComments(task.id));
    dispatch(openTaskDrawer());
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Personalized Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-indigo-100 mb-3 border border-white/10">
              <Briefcase className="w-3.5 h-3.5" />
              {user?.organization?.name || 'TaskPilot Workspace'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Hello, {user?.name || 'Team Member'}!
            </h1>
            <p className="text-indigo-100 text-xs sm:text-sm mt-1 leading-relaxed">
              Here are all the tasks currently assigned to you across your team’s active projects.
              Review requirements, update statuses, and collaborate via comments.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-10 pointer-events-none">
            <CheckSquare className="w-72 h-72 text-white" />
          </div>
        </div>

        {/* Color-Coded Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 border-l-4 border-l-indigo-600 p-4 shadow-xs">
            <span className="text-xs text-slate-500 font-medium block">Total Assigned</span>
            <p className="text-xl font-bold text-slate-900 mt-1">{totalAssigned}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 border-l-4 border-l-slate-400 p-4 shadow-xs">
            <span className="text-xs text-slate-500 font-medium block">To Do / Pending</span>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xl font-bold text-slate-700">{todoCount}</p>
              <AlertCircle className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 border-l-4 border-l-indigo-500 p-4 shadow-xs">
            <span className="text-xs text-slate-500 font-medium block">In Progress</span>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xl font-bold text-indigo-700">{inProgressCount}</p>
              <Clock className="w-4 h-4 text-indigo-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 border-l-4 border-l-emerald-500 p-4 shadow-xs">
            <span className="text-xs text-slate-500 font-medium block">Completed</span>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xl font-bold text-emerald-700">{completedCount}</p>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
        </div>

        {/* Filter & Search Controls */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search assigned tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
              />
            </div>

            {/* Status Filter Buttons with Color Dots */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">
                Status:
              </span>
              {[
                { id: 'ALL', label: 'All Statuses', dot: null },
                { id: 'TODO', label: 'To Do', dot: 'bg-slate-400' },
                { id: 'IN_PROGRESS', label: 'In Progress', dot: 'bg-indigo-600' },
                { id: 'COMPLETED', label: 'Completed', dot: 'bg-emerald-500' },
              ].map(({ id, label, dot }) => (
                <button
                  key={id}
                  onClick={() => setStatusFilter(id as any)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    statusFilter === id
                      ? id === 'TODO'
                        ? 'bg-slate-700 text-white shadow-xs'
                        : id === 'IN_PROGRESS'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : id === 'COMPLETED'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                  }`}
                >
                  {dot && <span className={`w-2 h-2 rounded-full ${dot}`} />}
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Priority Quick Filter Row */}
          <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 overflow-x-auto">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-slate-400" /> Priority:
            </span>
            {[
              { id: 'ALL', label: 'All Priorities', dot: null, activeClass: 'bg-slate-800 text-white' },
              { id: 'HIGHEST', label: 'Highest', dot: 'bg-rose-500', activeClass: 'bg-rose-600 text-white' },
              { id: 'HIGH', label: 'High', dot: 'bg-orange-500', activeClass: 'bg-orange-600 text-white' },
              { id: 'MEDIUM', label: 'Medium', dot: 'bg-amber-500', activeClass: 'bg-amber-600 text-white' },
              { id: 'LOW', label: 'Low', dot: 'bg-sky-500', activeClass: 'bg-sky-600 text-white' },
            ].map(({ id, label, dot, activeClass }) => (
              <button
                key={id}
                onClick={() => setPriorityFilter(id as any)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                  priorityFilter === id
                    ? `${activeClass} shadow-xs font-semibold`
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/50'
                }`}
              >
                {dot && <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tasks List */}
        {isLoading && myTasks.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-16 text-center flex flex-col items-center justify-center">
            <Spinner size="lg" />
            <p className="text-xs text-slate-500 mt-3 font-medium">Loading your assigned tasks...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <CheckSquare className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No tasks found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchQuery || statusFilter !== 'ALL'
                ? 'Try adjusting your search criteria or status filter.'
                : 'You have no assigned tasks pending at the moment. Great job!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => handleTaskClick(task)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Task Drawer for details & comments feed */}
      <TaskDetailDrawer />
    </AppLayout>
  );
};
