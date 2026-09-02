import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardPageComponents/DashboardLayout';
import ProjectsPage from './components/ProjectsPageComponents/ProjectsPage';
import ProjectWorkspace from './components/ProjectWorkspaceComponents/ProjectWorkspace';
import MyTasksPage from './components/MyTasksPageComponents/MyTasksPage';
import GlobalCalendarPage from './components/GlobalCalendarComponents/GlobalCalendarPage';
import MembersPage from './components/MembersPageComponents/MembersPage';
import NotificationsPage from './components/NotificationsPageComponents/NotificationsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/my-tasks" element={<MyTasksPage />} />
        <Route path="/calendar" element={<GlobalCalendarPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId/*" element={<ProjectWorkspace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;