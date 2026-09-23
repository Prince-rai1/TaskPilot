import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  fetchProjectById,
  fetchProjectTasks,
  updateProjectStatusAction,
  clearActiveProject,
} from '../redux/slices/projectSlice';
import { setSelectedTask, fetchTaskComments } from '../redux/slices/taskSlice';
import { openCreateTaskModal, openTaskDrawer, showToast } from '../redux/slices/uiSlice';
import { AppLayout } from '../components/layout/AppLayout';
import { ProjectAnalyticsBar } from '../components/projects/ProjectAnalyticsBar';
import { ProjectTeamRoster } from '../components/projects/ProjectTeamRoster';
import { KanbanBoard } from '../components/tasks/KanbanBoard';
import { CreateTaskModal } from '../components/tasks/CreateTaskModal';
import { TaskDetailDrawer } from '../components/tasks/TaskDetailDrawer';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Spinner } from '../components/common/Spinner';
import { formatDate } from '../utils/formatDate';
import { getProjectStatusBadge, getPriorityBadge, getTaskStatusBadge } from '../utils/enumBadges';
import type { ProjectStatus } from '../types/project.types';
import type { Task } from '../types/task.types';
import {
  ArrowLeft,
  Calendar,
  Plus,
  Kanban,
  List,
  UserCheck,
  Clock,
} from 'lucide-react';

export const ProjectDetailsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    activeProject,
    activeProjectTasks,
    isProjectLoading,
    error,
    isUpdatingStatus,
  } = useAppSelector((state) => state.projects);
  const { role } = useAppSelector((state) => state.auth);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  useEffect(() => {
    if (projectId) {
      dispatch(clearActiveProject());
      dispatch(fetchProjectById(projectId));
      dispatch(fetchProjectTasks(projectId));
    }
    return () => {
      dispatch(clearActiveProject());
    };
  }, [dispatch, projectId]);

  // Loading state: display spinner while fetching project or waiting for initial load
  if (isProjectLoading || (!activeProject && !error)) {
    return (
      <AppLayout>
        <div className="py-24 flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </AppLayout>
    );
  }

  // Not Found state: ONLY shown when project request finishes with an error / 404
  if (!activeProject && error) {
    return (
      <AppLayout>
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-12 shadow-xs">
          <h2 className="text-base font-bold text-slate-800">Project Not Found</h2>
          <p className="text-xs text-slate-500 mt-1">
            {error || 'This project does not exist or you do not have permission.'}
          </p>
          <Button onClick={() => navigate('/projects')} variant="primary" size="sm" className="mt-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
          </Button>
        </div>
      </AppLayout>
    );
  }

  const statusInfo = getProjectStatusBadge(activeProject!.status);
  const isAdmin = role === 'ADMIN';

  const handleProjectStatusChange = async (newStatus: ProjectStatus) => {
    if (!projectId) return;
    try {
      await dispatch(updateProjectStatusAction({ projectId, status: newStatus })).unwrap();
      dispatch(showToast({ message: `Project status updated to ${newStatus}`, type: 'success' }));
    } catch (err: any) {
      dispatch(showToast({ message: err || 'Failed to update project status', type: 'error' }));
    }
  };

  const handleTaskRowClick = (task: Task) => {
    dispatch(setSelectedTask(task));
    dispatch(fetchTaskComments(task.id));
    dispatch(openTaskDrawer());
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-1 hover:text-indigo-600 transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Projects Hub
          </button>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate max-w-xs">{activeProject!.name}</span>
        </div>

        {/* Project Header Banner */}
        <div className={`bg-white rounded-xl border border-slate-200 border-l-4 ${statusInfo.accentBorder} p-6 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-6`}>
          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{activeProject!.name}</h1>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusInfo.className}`}>
                <span className={`w-2 h-2 rounded-full ${statusInfo.dotColor}`} />
                {statusInfo.label}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              {activeProject!.description || 'No description provided for this project.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500">
              {activeProject!.deadline && (
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Deadline: <strong className="text-slate-800">{formatDate(activeProject!.deadline)}</strong>
                </span>
              )}
              {activeProject!.creator && (
                <span className="flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-slate-400" />
                  Created by <strong className="text-slate-800">{activeProject!.creator.name}</strong>
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                Created {formatDate(activeProject!.createdAt)}
              </span>
            </div>
          </div>

          {/* Action Header Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* Status Select for Admin */}
            {isAdmin && (
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-slate-500 whitespace-nowrap">Status:</label>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <select
                      value={activeProject!.status}
                      disabled={isUpdatingStatus}
                      onChange={(e) => handleProjectStatusChange(e.target.value as ProjectStatus)}
                      className={`bg-white border border-slate-300 rounded-lg pl-7 pr-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-100 outline-none transition-all ${
                        isUpdatingStatus
                          ? 'opacity-60 cursor-not-allowed bg-slate-100'
                          : 'cursor-pointer hover:border-slate-400'
                      }`}
                    >
                      <option value="NOT_STARTED">Not Started</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                    <span
                      className={`w-2.5 h-2.5 rounded-full absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${statusInfo.dotColor}`}
                    />
                  </div>
                  {isUpdatingStatus && (
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-indigo-50 border border-indigo-100 rounded-md text-[11px] font-medium text-indigo-600 animate-pulse">
                      <Spinner size="sm" />
                      <span className="hidden sm:inline">Saving...</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Create Task Button */}
            {isAdmin && (
              <Button
                onClick={() => dispatch(openCreateTaskModal())}
                variant="primary"
                size="md"
              >
                <Plus className="w-4 h-4" /> Create Task
              </Button>
            )}
          </div>
        </div>

        {/* 1. Analytics Bar: % Work Pending & Deliverables Progress (Admin Only) */}
        {isAdmin && <ProjectAnalyticsBar tasks={activeProjectTasks} />}

        {/* 2. Team Working on This Project (Roster) */}
        <ProjectTeamRoster members={activeProject!.members} />

        {/* 3. Tasks Management Header & View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {isAdmin ? `Project Tasks (${activeProjectTasks.length})` : `My Tasks in this Project (${activeProjectTasks.length})`}
            </h3>
            <p className="text-xs text-slate-500">
              {isAdmin
                ? 'Track and manage tasks assigned to project members'
                : 'Tasks assigned to you in this project (other members’ tasks are kept private)'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1 border border-slate-200">
              <button
                onClick={() => setViewMode('kanban')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  viewMode === 'kanban'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Kanban className="w-3.5 h-3.5" /> Kanban Board
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <List className="w-3.5 h-3.5" /> List View
              </button>
            </div>
          </div>
        </div>

        {/* Task Views */}
        {viewMode === 'kanban' ? (
          <KanbanBoard tasks={activeProjectTasks} />
        ) : (
          /* List / Table View */
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3.5">Task Title</th>
                    <th className="px-6 py-3.5">Priority</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5">Assignee</th>
                    <th className="px-6 py-3.5">Due Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {activeProjectTasks.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-xs italic">
                        No tasks created yet for this project.
                      </td>
                    </tr>
                  ) : (
                    activeProjectTasks.map((task) => {
                      const priorityInfo = getPriorityBadge(task.priority);
                      const taskStatusInfo = getTaskStatusBadge(task.status);

                      return (
                        <tr
                          key={task.id}
                          onClick={() => handleTaskRowClick(task)}
                          className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                        >
                          <td className="px-6 py-4">
                            <span className="font-semibold text-slate-900 block">{task.title}</span>
                            {task.description && (
                              <span className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                                {task.description}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <Badge className={`inline-flex items-center gap-1.5 font-bold tracking-wider text-[10px] ${priorityInfo.className}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${priorityInfo.dotColor}`} />
                              {priorityInfo.label}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${taskStatusInfo.className}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${taskStatusInfo.dotColor}`} />
                              {taskStatusInfo.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs">
                            {task.assignee ? (
                              <span className="font-medium text-slate-800">{task.assignee.name}</span>
                            ) : (
                              <span className="text-slate-400 italic">Unassigned</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-500">
                            {task.dueDate ? formatDate(task.dueDate) : '-'}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Task Creation Modal */}
      {projectId && (
        <CreateTaskModal
          projectId={projectId}
          projectName={activeProject?.name}
        />
      )}

      {/* Task Details Drawer */}
      <TaskDetailDrawer />
    </AppLayout>
  );
};
