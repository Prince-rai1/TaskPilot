import { CheckCircle2 } from 'lucide-react';

interface NotificationsHeaderProps {
  onMarkAllAsRead: () => void;
}

function NotificationsHeader({ onMarkAllAsRead }: NotificationsHeaderProps) {
  return (
    <div className="tf-notifications-header">
      <div className="tf-notifications-header-text">
        <h2>Notifications</h2>
        <p>Stay updated on activity that matters to you.</p>
      </div>
      <button className="tf-btn-ghost" onClick={onMarkAllAsRead}>
        <CheckCircle2 size={16} />
        Mark all as read
      </button>
    </div>
  );
}

export default NotificationsHeader;
