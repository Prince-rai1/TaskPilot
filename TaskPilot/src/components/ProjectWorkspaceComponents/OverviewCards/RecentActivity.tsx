import { Link } from 'react-router-dom';
import { User, MessageSquare, CheckCircle, FilePlus } from 'lucide-react';

function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: 'Prince',
      action: 'moved "Authentication callback" to In Progress',
      time: '10 minutes ago',
      icon: <User size={14} color="#64748b" />
    },
    {
      id: 2,
      user: 'Sarah',
      action: 'commented on TPW-104',
      time: '1 hour ago',
      icon: <MessageSquare size={14} color="#64748b" />
    },
    {
      id: 3,
      user: 'Alex',
      action: 'completed "Dashboard redesign"',
      time: '3 hours ago',
      icon: <CheckCircle size={14} color="#10b981" />
    },
    {
      id: 4,
      user: 'Mike',
      action: 'created TPW-112',
      time: 'Yesterday',
      icon: <FilePlus size={14} color="#4f46e5" />
    }
  ];

  return (
    <div className="tf-card">
      <div className="tf-card-header">
        <h2 className="tf-card-title">Recent Activity</h2>
        <Link to="/timeline" className="tf-card-action">View all</Link>
      </div>

      <div className="tf-item-list">
        {activities.map(activity => (
          <div key={activity.id} className="tf-activity-item">
            <div style={{ marginTop: 6, backgroundColor: '#f1f5f9', borderRadius: '50%', padding: 4, zIndex: 1 }}>
              {activity.icon}
            </div>
            <div className="tf-activity-content">
              <div className="tf-activity-text">
                <span>{activity.user}</span> {activity.action}
              </div>
              <div className="tf-activity-time">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
