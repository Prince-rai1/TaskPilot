import { AlertCircle, Calendar, MessageSquare, AtSign, CheckSquare, Clock } from 'lucide-react';
import NotificationActionsMenu from './NotificationActionsMenu';
import type { Notification } from './NotificationsPage';

interface NotificationItemProps {
  notification: Notification;
  onClick: (id: string) => void;
  onToggleRead: (id: string) => void;
  onDelete: (id: string) => void;
}

function getIconForType(type: Notification['type']) {
  switch (type) {
    case 'assign':
      return <CheckSquare size={20} color="#4F46E5" />;
    case 'mention':
      return <AtSign size={20} color="#0284c7" />;
    case 'comment':
      return <MessageSquare size={20} color="#d97706" />;
    case 'status':
      return <AlertCircle size={20} color="#059669" />;
    case 'due_date':
      return <Clock size={20} color="#dc2626" />;
    case 'sprint':
      return <Calendar size={20} color="#7c3aed" />;
    default:
      return <AlertCircle size={20} color="#64748B" />;
  }
}

function getIconBgColor(type: Notification['type']) {
  switch (type) {
    case 'assign': return '#eef2ff';
    case 'mention': return '#e0f2fe';
    case 'comment': return '#fef3c7';
    case 'status': return '#d1fae5';
    case 'due_date': return '#fee2e2';
    case 'sprint': return '#f3e8ff';
    default: return '#f1f5f9';
  }
}

function NotificationItem({ notification, onClick, onToggleRead, onDelete }: NotificationItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    // Prevent navigating if clicking the menu
    if ((e.target as HTMLElement).closest('.tf-notification-actions')) {
      return;
    }
    onClick(notification.id);
  };

  return (
    <a
      href="#"
      className={`tf-notification-item ${!notification.isRead ? 'unread' : ''}`}
      onClick={handleClick}
    >
      {!notification.isRead && <div className="tf-unread-indicator" />}

      {notification.actorAvatar ? (
        <div className="tf-notification-avatar" style={{ backgroundColor: '#eef2ff', color: '#4F46E5' }}>
          {notification.actorAvatar}
        </div>
      ) : (
        <div className="tf-notification-icon" style={{ backgroundColor: getIconBgColor(notification.type) }}>
          {getIconForType(notification.type)}
        </div>
      )}

      <div className="tf-notification-content">
        <div className="tf-notification-message">
          {/* We will dangerously set inner html just to render bold tags easily from mock data, or we could split by strong */}
          <span dangerouslySetInnerHTML={{ __html: notification.message }} />
        </div>
        <div className="tf-notification-context">
          {notification.context}
        </div>
      </div>

      <div className="tf-notification-meta">
        <span className="tf-notification-time">{notification.timestamp}</span>
        <NotificationActionsMenu
          notification={notification}
          onToggleRead={onToggleRead}
          onDelete={onDelete}
        />
      </div>
      {!notification.isRead && <div className="tf-unread-dot" />}
    </a>
  );
}

export default NotificationItem;
