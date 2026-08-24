import Sidebar from '../SharedComponents/Sidebar';
import Topbar from '../SharedComponents/Topbar';
import WelcomeSection from './WelcomeSection';
import StatCard from './StatCard';
import MyTasks from './MyTasks';
import RecentProjects from './RecentProjects';
import ActivityFeed from './ActivityFeed';
import AnalyticsCard from './AnalyticsCard';
import { LayoutList, CheckSquare, ListChecks, Users } from 'lucide-react';

import './Dashboard.css';

function DashboardLayout() {
  return (
    <div className="tf-dashboard">
      <Sidebar />
      
      <main className="tf-main-content">
        <Topbar />
        
        <div className="tf-dashboard-body">
          <WelcomeSection />
          
          <div className="tf-kpi-grid">
            <StatCard 
              label="Total Projects" 
              value="12" 
              icon={<LayoutList size={20} />} 
              iconVariant="primary" 
            />
            <StatCard 
              label="Active Tasks" 
              value="48" 
              icon={<CheckSquare size={20} />} 
              iconVariant="secondary" 
              trend={{ value: '5% this week', direction: 'up' }}
            />
            <StatCard 
              label="Completed Tasks" 
              value="156" 
              icon={<ListChecks size={20} />} 
              iconVariant="success" 
            />
            <StatCard 
              label="Team Members" 
              value="24" 
              icon={<Users size={20} />} 
              iconVariant="tertiary" 
            />
          </div>
          
          <div className="tf-content-grid">
            <MyTasks />
            <RecentProjects />
          </div>
          
          <div className="tf-content-grid tf-content-grid-even">
            <ActivityFeed />
            <AnalyticsCard />
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
