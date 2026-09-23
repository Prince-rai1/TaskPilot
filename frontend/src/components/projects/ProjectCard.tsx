import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight, UserCheck } from 'lucide-react';
import type { Project } from '../../types/project.types';
import { formatDate } from '../../utils/formatDate';
import { getProjectStatusBadge } from '../../utils/enumBadges';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  const statusInfo = getProjectStatusBadge(project.status);

  return (
    <div className={`bg-white rounded-xl border border-slate-200 border-l-4 ${statusInfo.accentBorder} p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group`}>
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusInfo.className}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotColor}`} />
            {statusInfo.label}
          </span>
          {project.deadline && (
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {formatDate(project.deadline)}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {project.name}
        </h3>

        <p className="text-xs text-slate-500 mt-2 line-clamp-2 min-h-[32px]">
          {project.description || 'No description provided for this project.'}
        </p>

        {/* Creator info */}
        {project.creator && (
          <p className="text-[11px] text-slate-400 mt-3 flex items-center gap-1">
            <UserCheck className="w-3 h-3" />
            Created by {project.creator.name}
          </p>
        )}
      </div>

      <div className="pt-4 border-t border-slate-100 mt-5 flex items-center justify-between">
        {/* Members Avatar Stack */}
        <div className="flex -space-x-2 overflow-hidden">
          {project.members.slice(0, 4).map((member, i) => (
            <div
              key={member.user.id || i}
              title={member.user.name}
              className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 border-2 border-white text-indigo-700 font-bold text-[10px]"
            >
              {member.user.name.slice(0, 2).toUpperCase()}
            </div>
          ))}
          {project.members.length > 4 && (
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 border-2 border-white text-slate-600 font-bold text-[10px]">
              +{project.members.length - 4}
            </div>
          )}
        </div>

        {/* View Project Button */}
        <button
          onClick={() => navigate(`/projects/${project.id}`)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer"
        >
          View Project <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
