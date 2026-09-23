import React, { useEffect, useState } from 'react';
import { X, Trash2, Calendar, AlertTriangle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  clearSelectedTask,
  changeTaskStatusAction,
  assignTaskAction,
  deleteTaskAction,
  fetchMyTasks,
} from '../../redux/slices/taskSlice';
import { fetchProjectTasks } from '../../redux/slices/projectSlice';
import { closeTaskDrawer, showToast } from '../../redux/slices/uiSlice';
import type { TaskStatus } from '../../types/task.types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Spinner } from '../common/Spinner';
import { formatDate } from '../../utils/formatDate';
import { getPriorityBadge, getTaskStatusBadge } from '../../utils/enumBadges';
import { TaskCommentsFeed } from './TaskCommentsFeed';

export const TaskDetailDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isTaskDrawerOpen);
  const { selectedTask, comments, isUpdatingStatus } = useAppSelector((state) => state.tasks);
  const { activeProject } = useAppSelector((state) => state.projects);
  const { role, user } = useAppSelector((state) => state.auth);
  const isAdmin = role === 'ADMIN';
  const isAssignee = user && selectedTask?.assignee && selectedTask.assignee.id === user.id;
  const canChangeStatus = isAdmin || isAssignee || role === 'EMPLOYEE';

  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen || !selectedTask) return null;

  const handleClose = () => {
    dispatch(closeTaskDrawer());
    dispatch(clearSelectedTask());
    setShowConfirmDelete(false);
  };

  const handleStatusChange = async (newStatus: TaskStatus) => {
    try {
      await dispatch(changeTaskStatusAction({ taskId: selectedTask.id, status: newStatus })).unwrap();
      if (selectedTask.projectId) {
        dispatch(fetchProjectTasks(selectedTask.projectId));
      }
      if (role === 'EMPLOYEE') {
        dispatch(fetchMyTasks());
      }
      dispatch(showToast({ message: `Status updated to ${newStatus}`, type: 'success' }));
    } catch (err: any) {
      dispatch(showToast({ message: err || 'Failed to update status', type: 'error' }));
    }
  };

  const handleAssigneeChange = async (assigneeId: string) => {
    try {
      await dispatch(assignTaskAction({ taskId: selectedTask.id, assigneeId })).unwrap();
      if (selectedTask.projectId) {
        dispatch(fetchProjectTasks(selectedTask.projectId));
      }
      dispatch(showToast({ message: 'Task assigned successfully', type: 'success' }));
    } catch (err: any) {
      dispatch(showToast({ message: err || 'Failed to assign task', type: 'error' }));
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteTaskAction(selectedTask.id)).unwrap();
      if (selectedTask.projectId) {
        dispatch(fetchProjectTasks(selectedTask.projectId));
      }
      dispatch(showToast({ message: 'Task deleted successfully', type: 'success' }));
      handleClose();
    } catch (err: any) {
      dispatch(showToast({ message: err || 'Failed to delete task', type: 'error' }));
    } finally {
      setIsDeleting(false);
    }
  };

  const priorityInfo = getPriorityBadge(selectedTask.priority);
  const statusInfo = getTaskStatusBadge(selectedTask.status);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Slide-over Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-600 truncate">
              {selectedTask.project?.name || activeProject?.name || 'Task Details'}
            </span>
            <div className="flex items-center gap-2">
              {isAdmin && (
                <button
                  onClick={() => setShowConfirmDelete(true)}
                  title="Delete Task"
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleClose}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Delete Confirmation Alert Banner */}
          {showConfirmDelete && (
            <div className="mx-6 mt-4 p-3.5 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs">
                <p className="font-bold text-rose-800">Delete this task?</p>
                <p className="text-rose-600 mt-0.5">
                  All discussion comments will be permanently lost. This action cannot be undone.
                </p>
                <div className="flex items-center gap-2 mt-2.5">
                  <Button
                    size="sm"
                    variant="danger"
                    isLoading={isDeleting}
                    onClick={handleDelete}
                  >
                    Yes, Delete
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowConfirmDelete(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {/* Title & Priority */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge className={`inline-flex items-center gap-1.5 font-bold tracking-wider text-[10px] ${priorityInfo.className}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${priorityInfo.dotColor}`} />
                  {priorityInfo.label}
                </Badge>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusInfo.className}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotColor}`} />
                  {statusInfo.label}
                </span>
                {selectedTask.dueDate && (
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Due: {formatDate(selectedTask.dueDate)}
                  </span>
                )}
              </div>
              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                {selectedTask.title}
              </h2>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Description
              </h4>
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                {selectedTask.description || <span className="italic text-slate-400">No description provided.</span>}
              </div>
            </div>

            {/* Status Selector & Assignee Selector Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50/70 border border-slate-200 text-xs">
              {/* Status */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-semibold uppercase tracking-wider text-slate-500 text-[10px]">
                    Status
                  </label>
                  {isUpdatingStatus && (
                    <span className="flex items-center gap-1 text-[10px] font-medium text-indigo-600 animate-pulse">
                      <Spinner size="sm" className="w-2.5 h-2.5" />
                      <span>Saving...</span>
                    </span>
                  )}
                </div>
                {canChangeStatus ? (
                  <div className="relative">
                    <select
                      value={selectedTask.status}
                      disabled={isUpdatingStatus}
                      onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
                      className={`w-full bg-white border border-slate-300 rounded-lg pl-7 pr-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-200 outline-none transition-all ${
                        isUpdatingStatus
                          ? 'opacity-60 cursor-not-allowed bg-slate-100'
                          : 'cursor-pointer hover:border-slate-400'
                      }`}
                    >
                      <option value="TODO">To Do</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                    <span
                      className={`w-2.5 h-2.5 rounded-full absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${statusInfo.dotColor}`}
                    />
                  </div>
                ) : (
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusInfo.className}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotColor}`} />
                    {statusInfo.label}
                  </span>
                )}
              </div>

              {/* Assignee */}
              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-500 text-[10px] mb-1">
                  Assignee
                </label>
                {isAdmin ? (
                  <select
                    value={selectedTask.assignee?.id || ''}
                    onChange={(e) => handleAssigneeChange(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-200 outline-none cursor-pointer"
                  >
                    <option value="">Unassigned</option>
                    {(activeProject?.members || []).map((m) => (
                      <option key={m.user.id} value={m.user.id}>
                        {m.user.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="font-bold text-slate-800">
                    {selectedTask.assignee?.name || 'Unassigned'}
                  </span>
                )}
              </div>
            </div>

            {/* Task Comments & Discussions Section */}
            <div className="pt-2">
              <TaskCommentsFeed taskId={selectedTask.id} comments={comments} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
