import React from 'react';
import type { ProjectMember } from '../../types/project.types';
import { Users, Lock } from 'lucide-react';
import { useAppSelector } from '../../redux/hooks';

interface ProjectTeamRosterProps {
  members: ProjectMember[];
}

export const ProjectTeamRoster: React.FC<ProjectTeamRosterProps> = ({ members }) => {
  const { user, role } = useAppSelector((state) => state.auth);
  const isEmployee = role === 'EMPLOYEE';

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900">
            Team Working on This Project ({members.length} Members)
          </h3>
        </div>
        {isEmployee && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200/70">
            <Lock className="w-3 h-3 text-amber-500" /> Task details hidden per RBAC policy
          </span>
        )}
      </div>

      {members.length === 0 ? (
        <p className="text-xs text-slate-500 italic">No members assigned to this project yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {members.map((member, idx) => {
            const initials = member.user.name.slice(0, 2).toUpperCase();
            const isMe = user?.id === member.user.id;
            const memberRole = member.user.role || 'EMPLOYEE';

            return (
              <div
                key={member.user.id || idx}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  isMe
                    ? 'border-indigo-200 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-200/50'
                    : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    memberRole === 'ADMIN'
                      ? 'bg-purple-100 text-purple-700 ring-1 ring-purple-200'
                      : isMe
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-indigo-100 text-indigo-700'
                  }`}
                >
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-semibold text-slate-900 truncate">{member.user.name}</p>
                    {isMe && (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-1 py-0.2 rounded shrink-0">
                        You
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] text-slate-500 truncate">{member.user.email}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
