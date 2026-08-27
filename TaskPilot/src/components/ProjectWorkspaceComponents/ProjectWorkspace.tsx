import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Sidebar from '../SharedComponents/Sidebar';
import Topbar from '../SharedComponents/Topbar';
import ProjectHeader from './ProjectHeader';
import ProjectNavigation from './ProjectNavigation';
import ProjectOverview from './ProjectOverview';
import ProjectContextMain from './ContextTab/ProjectContextMain';
import ProjectBoard from './ProjectBoard/ProjectBoard';
import ProjectIssues from './ProjectIssues/ProjectIssues';

import './ProjectWorkspace.css';

function ProjectWorkspace() {
  const { projectId } = useParams();

  return (
    <div className="tf-project-workspace">
      <Sidebar />

      <main className="tf-project-main">
        <Topbar />

        <div className="tf-project-content">
          <ProjectHeader projectId={projectId} />
          <ProjectNavigation />

          <Routes>
            {/* Keep the Navigate redirect as is */}
            <Route path="/" element={<Navigate to="overview" replace />} />

            {/* Remove the '/' from the start of all these paths */}
            <Route path="overview" element={<ProjectOverview />} />
            <Route path="context" element={<ProjectContextMain />} />
            <Route path="board" element={<ProjectBoard />} />
            <Route path="issues" element={<ProjectIssues />} />
            <Route path="backlog" element={<div style={{ padding: 32 }}>Backlog Content</div>} />
            <Route path="sprints" element={<div style={{ padding: 32 }}>Sprints Content</div>} />
            <Route path="timeline" element={<div style={{ padding: 32 }}>Timeline Content</div>} />
            <Route path="calendar" element={<div style={{ padding: 32 }}>Calendar Content</div>} />
            <Route path="releases" element={<div style={{ padding: 32 }}>Releases Content</div>} />
            <Route path="reports" element={<div style={{ padding: 32 }}>Reports Content</div>} />
            <Route path="settings" element={<div style={{ padding: 32 }}>Settings Content</div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default ProjectWorkspace;
