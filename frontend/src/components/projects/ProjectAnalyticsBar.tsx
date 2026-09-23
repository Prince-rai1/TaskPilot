import React from 'react';
import type { Task } from '../../types/task.types';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface ProjectAnalyticsBarProps {
  tasks: Task[];
}

export const ProjectAnalyticsBar: React.FC<ProjectAnalyticsBarProps> = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'COMPLETED').length;
  const inProgress = tasks.filter((t) => t.status === 'IN_PROGRESS').length;
  const pending = tasks.filter((t) => t.status === 'TODO').length;

  const completedPct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const inProgressPct = total > 0 ? Math.round((inProgress / total) * 100) : 0;
  const pendingPct = total > 0 ? Math.round((pending / total) * 100) : 0;
  const workPendingTotalPct = 100 - completedPct;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Work Progress & Task Completion</h3>
          <p className="text-xs text-slate-500 mt-0.5">Real-time status overview of project deliverables</p>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-slate-900">{completedPct}%</span>
          <span className="text-xs text-slate-500 font-medium ml-1">Completed</span>
          <span className="text-xs text-slate-400 mx-1.5">•</span>
          <span className="text-xs text-rose-600 font-medium">{workPendingTotalPct}% Work Pending</span>
        </div>
      </div>

      {/* Multi-Segmented Visual Progress Bar */}
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex gap-0.5 my-3">
        {completedPct > 0 && (
          <div
            style={{ width: `${completedPct}%` }}
            className="bg-emerald-500 h-full transition-all duration-500"
            title={`Completed: ${completed} (${completedPct}%)`}
          />
        )}
        {inProgressPct > 0 && (
          <div
            style={{ width: `${inProgressPct}%` }}
            className="bg-indigo-600 h-full transition-all duration-500"
            title={`In Progress: ${inProgress} (${inProgressPct}%)`}
          />
        )}
        {pendingPct > 0 && (
          <div
            style={{ width: `${pendingPct}%` }}
            className="bg-slate-300 h-full transition-all duration-500"
            title={`To Do / Pending: ${pending} (${pendingPct}%)`}
          />
        )}
      </div>

      {/* Key Metric Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0" />
          <div>
            <span className="text-slate-500 block">Total Tasks</span>
            <strong className="text-sm text-slate-800 font-bold">{total}</strong>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <div>
            <span className="text-slate-500 block">Completed</span>
            <strong className="text-sm text-emerald-700 font-bold">{completed} ({completedPct}%)</strong>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-indigo-50/50 border border-indigo-100 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <div>
            <span className="text-slate-500 block">In Progress</span>
            <strong className="text-sm text-indigo-700 font-bold">{inProgress} ({inProgressPct}%)</strong>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <div>
            <span className="text-slate-500 block">Pending / To Do</span>
            <strong className="text-sm text-slate-700 font-bold">{pending} ({pendingPct}%)</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
