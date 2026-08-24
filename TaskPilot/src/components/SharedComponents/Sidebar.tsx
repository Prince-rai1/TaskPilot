import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  CheckSquare,
  Calendar,
  Users,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';
import '../DashboardPageComponents/Dashboard.css';

function Sidebar() {
  return (
    <aside className="tf-sidebar-wrapper">
      <div className="tf-sidebar-header">
        <div className="tf-brand-icon">
          <CheckSquare size={20} strokeWidth={2.5} />
        </div>
        <span className="tf-brand-name">TaskPilot</span>
      </div>

      <ul className="tf-nav-list">
        <NavLink to="/dashboard" className={({ isActive }) => `tf-nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => `tf-nav-item ${isActive ? 'active' : ''}`}>
          <Briefcase size={20} />
          <span>Projects</span>
        </NavLink>
        <a href="#" className="tf-nav-item">
          <CheckSquare size={20} />
          <span>My Tasks</span>
        </a>
        <a href="#" className="tf-nav-item">
          <Calendar size={20} />
          <span>Calendar</span>
        </a>
        <a href="#" className="tf-nav-item">
          <Users size={20} />
          <span>Members</span>
        </a>
        <a href="#" className="tf-nav-item">
          <Bell size={20} />
          <span>Notifications</span>
        </a>
        <a href="#" className="tf-nav-item" style={{ marginTop: 'auto' }}>
          <Settings size={20} />
          <span>Settings</span>
        </a>
        <a href="#" className="tf-nav-item">
          <LogOut size={20} />
          <span>Logout</span>
        </a>
      </ul>

      <div className="tf-sidebar-footer">
        <div className="tf-user-profile">
          <div className="tf-avatar">PR</div>
          <div className="tf-user-info">
            <span className="tf-user-name">Prince</span>
            <span className="tf-user-role">Product Designer</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
