import { Bell, BellOff, AtSign, AlertCircle, RefreshCw } from 'lucide-react';
import type { FilterType } from './NotificationFilters';

export function EmptyState({ filter }: { filter: FilterType }) {
  let icon = <Bell size={28} />;
  let title = 'No notifications';
  let description = "You're all caught up.";

  if (filter === 'Unread') {
    icon = <BellOff size={28} />;
    title = 'No unread notifications';
    description = 'All your notifications have been read.';
  } else if (filter === 'Mentions') {
    icon = <AtSign size={28} />;
    title = 'No mentions';
    description = "You don't have any new mentions.";
  }

  return (
    <div className="tf-notifications-empty">
      <div className="tf-notifications-empty-icon">
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="tf-notifications-list">
      {[...Array(5)].map((_, i) => (
        <div className="tf-notification-item" key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="tf-skeleton" style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 16 }} />
          <div className="tf-notification-content">
            <div className="tf-skeleton" style={{ width: '60%', height: 14, marginBottom: 8 }} />
            <div className="tf-skeleton" style={{ width: '40%', height: 12 }} />
          </div>
          <div className="tf-notification-meta">
            <div className="tf-skeleton" style={{ width: 40, height: 12, marginBottom: 12 }} />
            <div className="tf-skeleton" style={{ width: 16, height: 16, borderRadius: '4px' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="tf-notifications-empty" style={{ borderColor: '#fecaca', backgroundColor: '#fef2f2' }}>
      <div className="tf-notifications-empty-icon" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
        <AlertCircle size={28} />
      </div>
      <h3 style={{ color: '#dc2626' }}>Unable to load notifications</h3>
      <p>Something went wrong while loading your notifications.</p>
      <button className="tf-btn-primary" onClick={onRetry} style={{ marginTop: 8 }}>
        <RefreshCw size={16} />
        Try Again
      </button>
    </div>
  );
}
