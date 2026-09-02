import { useState, useMemo } from 'react';
import Sidebar from '../SharedComponents/Sidebar';
import Topbar from '../SharedComponents/Topbar';
import NotificationsHeader from './NotificationsHeader';
import NotificationFilters from './NotificationFilters';
import type { FilterType } from './NotificationFilters';
import NotificationList from './NotificationList';
import { EmptyState, LoadingState, ErrorState } from './NotificationsStateComponents';
import '../DashboardPageComponents/Dashboard.css';
import './Notifications.css';

export interface Notification {
  id: string;
  type: 'assign' | 'mention' | 'comment' | 'status' | 'due_date' | 'sprint' | 'invite';
  message: string;
  context: string;
  timestamp: string;
  isRead: boolean;
  actorAvatar?: string;
}

// Robust dummy data
const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'assign',
    message: '<strong>Prince Rai</strong> assigned you a task',
    context: 'TPW-124 · Fix authentication callback',
    timestamp: '10 min ago',
    isRead: false,
    actorAvatar: 'PR',
  },
  {
    id: '2',
    type: 'mention',
    message: '<strong>Sarah Johnson</strong> mentioned you in a comment',
    context: 'TPW-108 · Dashboard redesign',
    timestamp: '1 hour ago',
    isRead: false,
    actorAvatar: 'SJ',
  },
  {
    id: '3',
    type: 'due_date',
    message: '<strong>Task overdue:</strong> Update deployment scripts',
    context: 'TPW-095 · Infrastructure',
    timestamp: '3 hours ago',
    isRead: true,
  },
  {
    id: '4',
    type: 'comment',
    message: '<strong>Alex Chen</strong> commented on your issue',
    context: 'TPW-104 · Login page',
    timestamp: '5 hours ago',
    isRead: true,
    actorAvatar: 'AC',
  },
  {
    id: '5',
    type: 'sprint',
    message: '<strong>Sprint 42</strong> has been completed',
    context: 'Project Phoenix',
    timestamp: 'Yesterday',
    isRead: true,
  },
  {
    id: '6',
    type: 'status',
    message: 'Issue status changed to <strong>Done</strong>',
    context: 'TPW-101 · Update user settings page',
    timestamp: 'Yesterday',
    isRead: true,
  },
  {
    id: '7',
    type: 'invite',
    message: '<strong>Emma Wilson</strong> invited you to a project',
    context: 'Mobile App V2',
    timestamp: '2 days ago',
    isRead: true,
    actorAvatar: 'EW',
  },
];

type PageState = 'loading' | 'loaded' | 'error';

function NotificationsPage() {
  const [pageState, setPageState] = useState<PageState>('loaded');
  const [notifications, setNotifications] = useState<Notification[]>(DUMMY_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  
  // In a real app, pagination state would go here
  const hasMore = false; 

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notif) => {
      if (activeFilter === 'Unread') return !notif.isRead;
      if (activeFilter === 'Mentions') return notif.type === 'mention';
      return true; // 'All'
    });
  }, [notifications, activeFilter]);

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    // Could add a toast notification here: "All notifications marked as read."
  };

  const handleLoadMore = () => {
    // Implement load more logic
  };

  // To test states, you could add buttons to toggle pageState to 'loading' or 'error'

  return (
    <div className="tf-dashboard">
      <Sidebar />

      <main className="tf-main-content">
        <Topbar />

        <div className="tf-notifications-body">
          <NotificationsHeader onMarkAllAsRead={handleMarkAllAsRead} />

          <NotificationFilters 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />

          {pageState === 'loading' && <LoadingState />}
          
          {pageState === 'error' && (
            <ErrorState onRetry={() => setPageState('loaded')} />
          )}

          {pageState === 'loaded' && (
            <>
              {filteredNotifications.length === 0 ? (
                <EmptyState filter={activeFilter} />
              ) : (
                <NotificationList
                  notifications={filteredNotifications}
                  onToggleRead={handleToggleRead}
                  onDelete={handleDelete}
                  onLoadMore={handleLoadMore}
                  hasMore={hasMore}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default NotificationsPage;
