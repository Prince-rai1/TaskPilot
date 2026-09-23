import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchProjects } from '../redux/slices/projectSlice';
import { openCreateProjectModal } from '../redux/slices/uiSlice';
import { AppLayout } from '../components/layout/AppLayout';
import { ProjectCard } from '../components/projects/ProjectCard';
import { CreateProjectModal } from '../components/projects/CreateProjectModal';
import { Button } from '../components/common/Button';
import { Spinner } from '../components/common/Spinner';
import type { ProjectStatus } from '../types/project.types';
import { Plus, Search, FolderKanban, CheckCircle2, Clock } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projects, isLoading } = useAppSelector((state) => state.projects);
  const { role } = useAppSelector((state) => state.auth);
  const isAdmin = role === 'ADMIN';

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | ProjectStatus>('ALL');

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = projects.length;
  const inProgressCount = projects.filter((p) => p.status === 'IN_PROGRESS').length;
  const completedCount = projects.filter((p) => p.status === 'COMPLETED').length;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Projects Hub</h1>
            <p className="text-xs text-slate-500 mt-1">
              {isAdmin
                ? 'Manage organization deliverables, assign team members, and track real-time progress.'
                : 'Browse projects you belong to, inspect team rosters, and track your deliverables.'}
            </p>
          </div>
          {isAdmin && (
            <Button
              onClick={() => dispatch(openCreateProjectModal())}
              variant="primary"
              className="shrink-0"
            >
              <Plus className="w-4 h-4" /> Create Project
            </Button>
          )}
        </div>

        {/* Quick Stats Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 border-l-4 border-l-indigo-600 p-4 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FolderKanban className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Total Projects</span>
              <p className="text-xl font-bold text-slate-900">{totalCount}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 border-l-4 border-l-indigo-500 p-4 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">In Progress</span>
              <p className="text-xl font-bold text-indigo-700">{inProgressCount}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 border-l-4 border-l-emerald-500 p-4 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Completed</span>
              <p className="text-xl font-bold text-emerald-700">{completedCount}</p>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
            />
          </div>

          {/* Status Tabs with Color Dots */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {[
              { id: 'ALL', label: 'All Projects', dot: null, activeClass: 'bg-indigo-600 text-white shadow-xs' },
              { id: 'NOT_STARTED', label: 'Not Started', dot: 'bg-amber-500', activeClass: 'bg-amber-600 text-white shadow-xs' },
              { id: 'IN_PROGRESS', label: 'In Progress', dot: 'bg-indigo-600', activeClass: 'bg-indigo-600 text-white shadow-xs' },
              { id: 'COMPLETED', label: 'Completed', dot: 'bg-emerald-500', activeClass: 'bg-emerald-600 text-white shadow-xs' },
              { id: 'ARCHIVED', label: 'Archived', dot: 'bg-zinc-400', activeClass: 'bg-zinc-700 text-white shadow-xs' },
            ].map(({ id, label, dot, activeClass }) => (
              <button
                key={id}
                onClick={() => setStatusFilter(id as any)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === id
                    ? activeClass
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {dot && <span className={`w-2 h-2 rounded-full ${dot}`} />}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        {isLoading ? (
          <div className="py-16 flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <FolderKanban className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No projects found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchQuery || statusFilter !== 'ALL'
                ? 'Try adjusting your search criteria or filter to see more projects.'
                : 'Get started by creating your first workspace project and assigning active employees.'}
            </p>
            {(!searchQuery && statusFilter === 'ALL') && (
              <Button
                onClick={() => dispatch(openCreateProjectModal())}
                variant="primary"
                size="sm"
                className="mt-4"
              >
                <Plus className="w-3.5 h-3.5" /> Create First Project
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal />
    </AppLayout>
  );
};
