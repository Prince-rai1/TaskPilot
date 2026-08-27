import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardPageComponents/DashboardLayout';
import ProjectsPage from './components/ProjectsPageComponents/ProjectsPage';
import ProjectWorkspace from './components/ProjectWorkspaceComponents/ProjectWorkspace';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId/*" element={<ProjectWorkspace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;