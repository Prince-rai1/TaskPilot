import { useState } from 'react';
import { X } from 'lucide-react';
import type { MemberRole } from './MemberActionsMenu';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, role: MemberRole) => void;
}

function InviteMemberModal({ isOpen, onClose, onSubmit }: InviteMemberModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<MemberRole>('Member');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (email.trim()) {
      onSubmit(email.trim(), role);
      setEmail('');
      setRole('Member');
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="tf-modal-overlay" onClick={handleOverlayClick}>
      <div className="tf-modal invite">
        <div className="tf-modal-header">
          <h3>Invite Member</h3>
          <button className="tf-modal-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="tf-modal-body">
          <div className="tf-modal-field">
            <label htmlFor="invite-email">Email address</label>
            <input
              id="invite-email"
              type="email"
              placeholder="colleague@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </div>
          <div className="tf-modal-field">
            <label htmlFor="invite-role">Role</label>
            <select
              id="invite-role"
              value={role}
              onChange={(e) => setRole(e.target.value as MemberRole)}
            >
              <option value="Admin">Admin</option>
              <option value="Member">Member</option>
              <option value="Guest">Guest</option>
            </select>
          </div>
        </div>

        <div className="tf-modal-footer">
          <button className="tf-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="tf-btn-primary" onClick={handleSubmit}>
            Send Invite
          </button>
        </div>
      </div>
    </div>
  );
}

export default InviteMemberModal;
