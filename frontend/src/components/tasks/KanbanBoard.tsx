import React from 'react';
import type { Task, TaskStatus } from '../../types/task.types';
import { TaskCard } from './TaskCard';
import { useAppDispatch } from '../../redux/hooks';
import { setSelectedTask, fetchTaskComments } from '../../redux/slices/taskSlice';
import { openTaskDrawer } from '../../redux/slices/uiSlice';

interface KanbanBoardProps {
  tasks: Task[];
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks }) => {
  const dispatch = useAppDispatch();

  const handleTaskClick = (task: Task) => {
    dispatch(setSelectedTask(task));
    dispatch(fetchTaskComments(task.id));
    dispatch(openTaskDrawer());
  };

  const columns: { status: TaskStatus; title: string; color: string }[] = [
    { status: 'TODO', title: 'To Do', color: 'bg-slate-400' },
    { status: 'IN_PROGRESS', title: 'In Progress', color: 'bg-indigo-600' },
    { status: 'COMPLETED', title: 'Completed', color: 'bg-emerald-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {columns.map((col) => {
        const columnTasks = tasks.filter((t) => t.status === col.status);

        return (
          <div
            key={col.status}
            className="bg-slate-50/80 rounded-xl border border-slate-200 p-4 flex flex-col min-h-[420px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {col.title}
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                {columnTasks.length}
              </span>
            </div>

            {/* Task List in Column */}
            <div className="space-y-3 flex-1 overflow-y-auto">
              {columnTasks.length === 0 ? (
                <div className="p-8 text-center rounded-lg border-2 border-dashed border-slate-200 text-slate-400 text-xs">
                  No tasks in {col.title.toLowerCase()}
                </div>
              ) : (
                columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => handleTaskClick(task)}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
