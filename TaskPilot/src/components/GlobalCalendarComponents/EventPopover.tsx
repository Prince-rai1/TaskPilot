import { X, ExternalLink } from 'lucide-react';

interface Props {
  event: {
    id: string;
    title: string;
    type: 'task' | 'milestone' | 'meeting';
    project?: string;
    status?: string;
    priority?: string;
  };
  onClose: () => void;
}

export default function EventPopover({ event, onClose }: Props) {
  const isTask = event.type === 'task';
  const priorityColor = event.priority === 'HIGH' ? '#e11d48' : event.priority === 'MEDIUM' ? '#f59e0b' : '#10b981';

  return (
    <div className="tf-popover">
      <div className="tf-popover-header">
        <div>
          {isTask && <span className="tf-popover-key">{event.id}</span>}
          {!isTask && <span className="tf-popover-key" style={{ textTransform: 'capitalize' }}>{event.type}</span>}
          <h4 className="tf-popover-title">{event.title}</h4>
        </div>
        <button className="tf-popover-close" onClick={onClose}>
          <X size={16} />
        </button>
      </div>

      {isTask && (
        <div className="tf-popover-details">
          <div className="tf-popover-row">
            <span className="tf-popover-label">Project</span>
            <span className="tf-popover-value">{event.project}</span>
          </div>
          <div className="tf-popover-row">
            <span className="tf-popover-label">Status</span>
            <span className="tf-popover-value tf-popover-status">{event.status}</span>
          </div>
          <div className="tf-popover-row">
            <span className="tf-popover-label">Priority</span>
            <span className="tf-popover-value" style={{ color: priorityColor, fontWeight: 700 }}>{event.priority}</span>
          </div>
        </div>
      )}

      <button className="tf-popover-action">
        <ExternalLink size={14} />
        {isTask ? 'Open Issue' : 'View Details'}
      </button>
    </div>
  );
}
