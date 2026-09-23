import React from 'react';
import { MessageSquare, Calendar, UserPlus } from 'lucide-react';
import type { Task } from '../../types/task.types';
import { Badge } from '../common/Badge';
import { formatDate } from '../../utils/formatDate';
import { getPriorityBadge, getTaskStatusBadge } from '../../utils/enumBadges';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const priorityInfo = getPriorityBadge(task.priority);
  const statusInfo = getTaskStatusBadge(task.status);
  const commentsCount = task._count?.comments ?? task.comments?.length ?? 0;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200 border-l-4 ${statusInfo.accentBorder} p-4 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group flex flex-col justify-between`}
    >
      <div>
        {/* Header Tags: Priority & Status */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <Badge className={`inline-flex items-center gap-1.5 font-bold tracking-wider text-[10px] ${priorityInfo.className}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${priorityInfo.dotColor}`} />
            {priorityInfo.label}
          </Badge>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusInfo.className}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotColor}`} />
            {statusInfo.label}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {task.title}
        </h4>

        {/* Description snippet */}
        {task.description && (
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {task.description}
          </p>
        )}
      </div>

      {/* Footer Details: Due date, Assignee, Comments */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-3">
          {task.dueDate && (
            <span className="flex items-center gap-1 text-[11px]">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {formatDate(task.dueDate)}
            </span>
          )}

          <span className="flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-slate-600">
            <MessageSquare className="w-3.5 h-3.5" />
            {commentsCount}
          </span>
        </div>

        {/* Assignee Avatar or Unassigned */}
        <div>
          {task.assignee ? (
            <div
              title={`Assigned to ${task.assignee.name}`}
              className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px]"
            >
              {task.assignee.name.slice(0, 2).toUpperCase()}
            </div>
          ) : (
            <span
              title="Unassigned"
              className="inline-flex items-center gap-1 text-[10px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-dashed border-slate-300"
            >
              <UserPlus className="w-2.5 h-2.5" /> Unassigned
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
