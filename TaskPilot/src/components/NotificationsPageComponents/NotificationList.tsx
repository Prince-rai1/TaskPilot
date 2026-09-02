import NotificationItem from './NotificationItem';
import type { Notification } from './NotificationsPage';

interface NotificationListProps {
  notifications: Notification[];
  onToggleRead: (id: string) => void;
  onDelete: (id: string) => void;
  onLoadMore: () => void;
  hasMore: boolean;
}

function NotificationList({
  notifications,
  onToggleRead,
  onDelete,
  onLoadMore,
  hasMore,
}: NotificationListProps) {
  return (
    <div className="tf-notifications-list">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClick={onToggleRead} // clicking row marks as read if unread (or toggles)
          onToggleRead={onToggleRead}
          onDelete={onDelete}
        />
      ))}

      {hasMore && (
        <div className="tf-load-more">
          <button onClick={onLoadMore}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
}

export default NotificationList;
