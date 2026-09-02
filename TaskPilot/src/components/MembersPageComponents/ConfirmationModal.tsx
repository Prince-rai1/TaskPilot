import { AlertTriangle, Trash2 } from 'lucide-react';

type ConfirmationType = 'deactivate' | 'remove';

interface ConfirmationModalProps {
  isOpen: boolean;
  type: ConfirmationType;
  memberName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const config = {
  deactivate: {
    title: 'Deactivate Member?',
    description: 'This member will lose access to the workspace until reactivated.',
    confirmLabel: 'Deactivate',
    icon: AlertTriangle,
    iconClass: 'warning',
    buttonClass: 'tf-btn-danger',
  },
  remove: {
    title: 'Remove Member?',
    description: 'This will permanently remove this member from the workspace. This action cannot be undone.',
    confirmLabel: 'Remove',
    icon: Trash2,
    iconClass: 'danger',
    buttonClass: 'tf-btn-danger',
  },
};

function ConfirmationModal({ isOpen, type, memberName, onClose, onConfirm }: ConfirmationModalProps) {
  if (!isOpen) return null;

  const { title, description, confirmLabel, icon: Icon, iconClass, buttonClass } = config[type];

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="tf-modal-overlay" onClick={handleOverlayClick}>
      <div className="tf-modal confirm">
        <div className="tf-modal-body">
          <div className="tf-confirm-body">
            <div className={`tf-confirm-icon ${iconClass}`}>
              <Icon size={24} />
            </div>
            <h4>{title}</h4>
            <p>
              {description.replace('this member', memberName ? `"${memberName}"` : 'this member')}
            </p>
          </div>
        </div>
        <div className="tf-modal-footer">
          <button className="tf-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className={buttonClass} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
export type { ConfirmationType };
