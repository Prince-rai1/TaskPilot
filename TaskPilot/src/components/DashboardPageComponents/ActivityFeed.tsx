import { MessageSquare, CheckCircle2, PlayCircle } from 'lucide-react';
import './Dashboard.css';

const MOCK_ACTIVITY = [
  { id: 1, type: 'comment', user: 'Sarah J.', text: 'commented on Design System', time: '2 hours ago', icon: <MessageSquare size={16} /> },
  { id: 2, type: 'status', user: 'Mike T.', text: 'completed API Integration', time: '4 hours ago', icon: <CheckCircle2 size={16} color="var(--success)" /> },
  { id: 3, type: 'creation', user: 'You', text: 'created Project TaskForge', time: 'Yesterday', icon: 'PR' },
  { id: 4, type: 'status', user: 'Alex S.', text: 'started Mobile App V2', time: 'Yesterday', icon: <PlayCircle size={16} color="var(--primary)" /> },
];

function ActivityFeed() {
  return (
    <div className="tf-card" style={{ height: '100%' }}>
      <div className="tf-card-header">
        <h3 className="tf-card-title">Recent Activity</h3>
      </div>
      
      <div className="tf-activity-list">
        {MOCK_ACTIVITY.map(activity => (
          <div key={activity.id} className="tf-activity-item">
            {typeof activity.icon === 'string' ? (
              <div className="tf-activity-icon avatar">{activity.icon}</div>
            ) : (
              <div className="tf-activity-icon">{activity.icon}</div>
            )}
            
            <div className="tf-activity-content">
              <p><strong>{activity.user}</strong> {activity.text}</p>
              <span className="tf-activity-time">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityFeed;
