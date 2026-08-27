import ProjectSummaryCard from './OverviewCards/ProjectSummaryCard';
import ProjectProgress from './OverviewCards/ProjectProgress';
import UpcomingDeadlines from './OverviewCards/UpcomingDeadlines';
import SprintSummary from './OverviewCards/SprintSummary';
import RecentActivity from './OverviewCards/RecentActivity';
import ProjectTeam from './OverviewCards/ProjectTeam';
import ProjectContext from './OverviewCards/ProjectContext';
import ProjectGoals from './OverviewCards/ProjectGoals';
import ProjectStatus from './OverviewCards/ProjectStatus';
import { Activity, CheckCircle, ListTodo, Users } from 'lucide-react';

function ProjectOverview() {
  return (
    <div className="tf-project-overview">
      <div className="tf-overview-summary-row">
        <ProjectSummaryCard
          label="Progress"
          value="75%"
          icon={<Activity size={24} />}
          variant="progress"
        />
        <ProjectSummaryCard
          label="Open Issues"
          value="124"
          icon={<ListTodo size={24} />}
          variant="issues"
        />
        <ProjectSummaryCard
          label="Completed"
          value="93"
          icon={<CheckCircle size={24} />}
          variant="completed"
        />
        <ProjectSummaryCard
          label="Team"
          value="8"
          icon={<Users size={24} />}
          variant="team"
        />
      </div>

      <div className="tf-overview-main-grid">
        <div className="tf-overview-column">
          <ProjectProgress />
          <SprintSummary />
          <UpcomingDeadlines />
          <ProjectContext />
          <ProjectGoals />
        </div>

        <div className="tf-overview-column">
          <ProjectStatus />
          <RecentActivity />
          <ProjectTeam />
        </div>
      </div>
    </div>
  );
}

export default ProjectOverview;
