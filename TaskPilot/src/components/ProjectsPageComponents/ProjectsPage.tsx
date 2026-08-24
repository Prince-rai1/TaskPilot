import { useState } from 'react';
import Sidebar from '../SharedComponents/Sidebar';
import Topbar from '../SharedComponents/Topbar';
import PageHeader from './ProjectPageHeader';
import ProjectToolbar from './ProjectToolbar';
import ProjectSummary from './ProjectSummary';
import ProjectGrid from './ProjectGrid';
import ProjectList from './ProjectList';
import EmptyProjectsState from './EmptyProjectsState';
import CreateProjectModal from './CreateProjectModal';
import type { ProjectData } from './ProjectCard';

import './Projects.css';
import '../DashboardPageComponents/Dashboard.css'; // inherit shell styling

// Sample Data
const sampleProjects: ProjectData[] = [
  {
    id: '1',
    name: 'TaskPilot Web App',
    key: 'TPW',
    description: 'Main frontend application redesign with new component library.',
    status: 'Active',
    progress: 75,
    tasks: 24,
    dueDate: 'Oct 30',
    updated: 'Updated 2 hours ago',
    team: [
      'https://i.pravatar.cc/150?u=1',
      'https://i.pravatar.cc/150?u=2',
      'https://i.pravatar.cc/150?u=3',
      'https://i.pravatar.cc/150?u=4',
      'https://i.pravatar.cc/150?u=5',
      'https://i.pravatar.cc/150?u=6'
    ]
  },
  {
    id: '2',
    name: 'Mobile App V2',
    key: 'MOB',
    description: 'React Native mobile application port for iOS and Android.',
    status: 'Active',
    progress: 40,
    tasks: 18,
    dueDate: 'Nov 12',
    updated: 'Updated Yesterday',
    team: [
      'https://i.pravatar.cc/150?u=7',
      'https://i.pravatar.cc/150?u=8',
      'https://i.pravatar.cc/150?u=9'
    ]
  },
  {
    id: '3',
    name: 'Marketing Website',
    key: 'MKT',
    description: 'SEO optimization and landing page redesign for Q4.',
    status: 'Active',
    progress: 90,
    tasks: 32,
    dueDate: 'Oct 28',
    updated: 'Updated 2 days ago',
    team: [
      'https://i.pravatar.cc/150?u=10',
      'https://i.pravatar.cc/150?u=11'
    ]
  },
  {
    id: '4',
    name: 'Backend Service',
    key: 'API',
    description: 'Authentication and API infrastructure migration.',
    status: 'Completed',
    progress: 100,
    tasks: 46,
    dueDate: 'Oct 15',
    updated: 'Updated 1 week ago',
    team: [
      'https://i.pravatar.cc/150?u=12',
      'https://i.pravatar.cc/150?u=13',
      'https://i.pravatar.cc/150?u=14'
    ]
  },
  {
    id: '5',
    name: 'Design System',
    key: 'DS',
    description: 'Reusable UI component library and styling guide.',
    status: 'Active',
    progress: 60,
    tasks: 17,
    dueDate: 'Nov 5',
    updated: 'Updated 3 hours ago',
    team: [
      'https://i.pravatar.cc/150?u=15'
    ]
  }
];

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeCount = sampleProjects.filter(p => p.status === 'Active').length;
  const completedCount = sampleProjects.filter(p => p.status === 'Completed').length;
  const archivedCount = sampleProjects.filter(p => p.status === 'Archived').length;

  return (
    <div className="tf-dashboard">
      <Sidebar />

      <main className="tf-main-content">
        <Topbar />

        <div className="tf-projects-page">
          <PageHeader onNewProject={() => setIsModalOpen(true)} />

          <ProjectToolbar viewMode={viewMode} setViewMode={setViewMode} />

          {sampleProjects.length > 0 ? (
            <>
              <ProjectSummary
                total={sampleProjects.length}
                active={activeCount}
                completed={completedCount}
                archived={archivedCount}
              />

              {viewMode === 'grid' ? (
                <ProjectGrid projects={sampleProjects} />
              ) : (
                <ProjectList projects={sampleProjects} />
              )}
            </>
          ) : (
            <EmptyProjectsState onNewProject={() => setIsModalOpen(true)} />
          )}
        </div>
      </main>

      {isModalOpen && <CreateProjectModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
