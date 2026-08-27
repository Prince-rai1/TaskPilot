import { NavLink, useParams } from 'react-router-dom';

function ProjectNavigation() {
  const { projectId } = useParams();

  const navItems = [
    { label: 'Overview', path: 'overview' },
    { label: 'Context', path: 'context' },
    { label: 'Board', path: 'board' },
    { label: 'Issues', path: 'issues' },
    { label: 'Backlog', path: 'backlog' },
    { label: 'Sprints', path: 'sprints' },
    { label: 'Timeline', path: 'timeline' },
    { label: 'Calendar', path: 'calendar' },
    { label: 'Releases', path: 'releases' },
    { label: 'Reports', path: 'reports' },
    { label: 'Settings', path: 'settings' }
  ];

  return (
    <nav className="tf-project-nav">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={`/projects/${projectId}/${item.path}`}
          className={({ isActive }) => `tf-nav-item ${isActive ? 'active' : ''}`}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default ProjectNavigation;