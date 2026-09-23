import type { ProjectStatus } from '../types/project.types';
import type { TaskPriority, TaskStatus } from '../types/task.types';
import type { UserStatus } from '../types/auth.types';

export const getPriorityBadge = (priority: TaskPriority) => {
  switch (priority) {
    case 'HIGHEST':
      return {
        label: 'HIGHEST',
        className: 'bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-200/60',
        dotColor: 'bg-rose-500',
        textColor: 'text-rose-700',
        borderColor: 'border-rose-200',
      };
    case 'HIGH':
      return {
        label: 'HIGH',
        className: 'bg-orange-50 text-orange-700 border-orange-200 ring-1 ring-orange-200/60',
        dotColor: 'bg-orange-500',
        textColor: 'text-orange-700',
        borderColor: 'border-orange-200',
      };
    case 'MEDIUM':
      return {
        label: 'MEDIUM',
        className: 'bg-amber-50 text-amber-800 border-amber-200 ring-1 ring-amber-200/60',
        dotColor: 'bg-amber-500',
        textColor: 'text-amber-800',
        borderColor: 'border-amber-200',
      };
    case 'LOW':
      return {
        label: 'LOW',
        className: 'bg-sky-50 text-sky-700 border-sky-200 ring-1 ring-sky-200/60',
        dotColor: 'bg-sky-500',
        textColor: 'text-sky-700',
        borderColor: 'border-sky-200',
      };
    default:
      return {
        label: priority,
        className: 'bg-slate-100 text-slate-700 border-slate-200',
        dotColor: 'bg-slate-400',
        textColor: 'text-slate-700',
        borderColor: 'border-slate-200',
      };
  }
};

export const getTaskStatusBadge = (status: TaskStatus) => {
  switch (status) {
    case 'TODO':
      return {
        label: 'To Do',
        className: 'bg-slate-100 text-slate-700 border-slate-200',
        dotColor: 'bg-slate-400',
        textColor: 'text-slate-700',
        activeBg: 'bg-slate-700',
        accentBorder: 'border-l-slate-400',
      };
    case 'IN_PROGRESS':
      return {
        label: 'In Progress',
        className: 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-1 ring-indigo-200/50',
        dotColor: 'bg-indigo-600',
        textColor: 'text-indigo-700',
        activeBg: 'bg-indigo-600',
        accentBorder: 'border-l-indigo-600',
      };
    case 'COMPLETED':
      return {
        label: 'Completed',
        className: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-200/50',
        dotColor: 'bg-emerald-500',
        textColor: 'text-emerald-700',
        activeBg: 'bg-emerald-600',
        accentBorder: 'border-l-emerald-500',
      };
    default:
      return {
        label: status,
        className: 'bg-slate-100 text-slate-700 border-slate-200',
        dotColor: 'bg-slate-400',
        textColor: 'text-slate-700',
        activeBg: 'bg-slate-700',
        accentBorder: 'border-l-slate-400',
      };
  }
};

export const getProjectStatusBadge = (status: ProjectStatus) => {
  switch (status) {
    case 'NOT_STARTED':
      return {
        label: 'Not Started',
        className: 'bg-amber-50 text-amber-800 border-amber-200 ring-1 ring-amber-200/60',
        dotColor: 'bg-amber-500',
        textColor: 'text-amber-800',
        activeBg: 'bg-amber-600',
        accentBorder: 'border-l-amber-500',
      };
    case 'IN_PROGRESS':
      return {
        label: 'In Progress',
        className: 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-1 ring-indigo-200/60',
        dotColor: 'bg-indigo-600',
        textColor: 'text-indigo-700',
        activeBg: 'bg-indigo-600',
        accentBorder: 'border-l-indigo-600',
      };
    case 'COMPLETED':
      return {
        label: 'Completed',
        className: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-200/60',
        dotColor: 'bg-emerald-500',
        textColor: 'text-emerald-700',
        activeBg: 'bg-emerald-600',
        accentBorder: 'border-l-emerald-500',
      };
    case 'ARCHIVED':
      return {
        label: 'Archived',
        className: 'bg-zinc-100 text-zinc-700 border-zinc-300 ring-1 ring-zinc-200/60',
        dotColor: 'bg-zinc-400',
        textColor: 'text-zinc-700',
        activeBg: 'bg-zinc-700',
        accentBorder: 'border-l-zinc-400',
      };
    default:
      return {
        label: status,
        className: 'bg-slate-100 text-slate-700 border-slate-200',
        dotColor: 'bg-slate-400',
        textColor: 'text-slate-700',
        activeBg: 'bg-slate-700',
        accentBorder: 'border-l-slate-400',
      };
  }
};

export const getUserStatusBadge = (status: UserStatus) => {
  switch (status) {
    case 'ACTIVE':
      return { label: 'Active', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    case 'INACTIVE':
      return { label: 'Inactive', className: 'bg-slate-100 text-slate-600 border-slate-300' };
    default:
      return { label: status, className: 'bg-slate-100 text-slate-600 border-slate-300' };
  }
};
