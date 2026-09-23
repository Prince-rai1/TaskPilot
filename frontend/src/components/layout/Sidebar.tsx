import React from 'react';
import { NavLink as RouterNavLink, useNavigate as useRouterNavigate } from 'react-router-dom';
import { FolderKanban, Users, CheckSquare, LogOut, Briefcase } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutUser } from '../../redux/slices/authSlice';
import { Badge } from '../common/Badge';

export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useRouterNavigate();
  const { user, role } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  const isAdmin = role === 'ADMIN';

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed top-0 left-0 z-30">
      {/* Brand & Organization */}
      <div className="p-5 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-100">
          <Briefcase className="w-5 h-5" />
        </div>
        <div className="overflow-hidden">
          <h1 className="font-bold text-sm text-slate-900 truncate">
            {user?.organization?.name || 'TaskPilot'}
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            {isAdmin ? 'Admin Workspace' : 'Team Workspace'}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {isAdmin ? (
          <>
            <RouterNavLink
              to="/projects"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <FolderKanban className="w-4 h-4 text-inherit" />
              Projects
            </RouterNavLink>

            <RouterNavLink
              to="/employees"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <Users className="w-4 h-4 text-inherit" />
              Employees
            </RouterNavLink>
          </>
        ) : (
          /* Employee Links */
          <>
            <RouterNavLink
              to="/my-tasks"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <CheckSquare className="w-4 h-4 text-inherit" />
              My Assigned Tasks
            </RouterNavLink>

            <RouterNavLink
              to="/projects"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <FolderKanban className="w-4 h-4 text-inherit" />
              Projects
            </RouterNavLink>
          </>
        )}
      </nav>

      {/* User Footer Profile */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/60">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
              {user?.name?.slice(0, 2).toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">{user?.name || 'User'}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Badge variant={isAdmin ? 'indigo' : 'slate'} className="text-[10px] py-0 px-1.5">
                  {role || 'MEMBER'}
                </Badge>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
