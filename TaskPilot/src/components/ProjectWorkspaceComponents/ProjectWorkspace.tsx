import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Sidebar from '../SharedComponents/Sidebar';
import Topbar from '../SharedComponents/Topbar';
import ProjectHeader from './ProjectHeader';
import ProjectNavigation from './ProjectNavigation';
import ProjectOverview from './ProjectOverview';
import ProjectContextMain from './ContextTab/ProjectContextMain';
import ProjectBoard from './ProjectBoard/ProjectBoard';
import ProjectIssues from './ProjectIssues/ProjectIssues';
import ProjectBacklog from './ProjectBacklog/ProjectBacklog';
import ProjectSprints from './ProjectSprints/ProjectSprints';
import ProjectCalendar from './ProjectCalendar/ProjectCalendar';

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

          <div className="tf-project-route-content">
            <Routes>
              {/* Keep the Navigate redirect as is */}
              <Route path="/" element={<Navigate to="overview" replace />} />

              {/* Remove the '/' from the start of all these paths */}
              <Route path="overview" element={<div style={{ flex: 1, overflowY: 'auto' }}><ProjectOverview /></div>} />
              <Route path="context" element={<div style={{ flex: 1, overflowY: 'auto' }}><ProjectContextMain /></div>} />
              <Route path="board" element={<ProjectBoard />} />
              <Route path="issues" element={<ProjectIssues />} />
              <Route path="backlog" element={<ProjectBacklog />} />
              <Route path="sprints" element={<ProjectSprints />} />
              <Route path="calendar" element={<ProjectCalendar />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProjectWorkspace;
