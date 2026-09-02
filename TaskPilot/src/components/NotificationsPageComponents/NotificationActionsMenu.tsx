import { useState, useRef, useEffect } from 'react';
import { MoreVertical, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import type { Notification } from './NotificationsPage';

interface NotificationActionsMenuProps {
  notification: Notification;
  onToggleRead: (id: string) => void;
  onDelete: (id: string) => void;
}

function NotificationActionsMenu({ notification, onToggleRead, onDelete }: NotificationActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
    setIsOpen(false);
  };

  return (
    <div className="tf-notification-actions" ref={menuRef}>
      <button
        className="tf-actions-btn"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label="Notification actions"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div className="tf-actions-menu">
          <button
            className="tf-actions-menu-item"
            onClick={(e) => handleAction(e, () => onToggleRead(notification.id))}
          >
            {notification.isRead ? (
              <>
                <Circle size={14} />
                Mark as Unread
              </>
            ) : (
              <>
                <CheckCircle2 size={14} />
                Mark as Read
              </>
            )}
          </button>
          <button
            className="tf-actions-menu-item danger"
            onClick={(e) => handleAction(e, () => onDelete(notification.id))}
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default NotificationActionsMenu;
