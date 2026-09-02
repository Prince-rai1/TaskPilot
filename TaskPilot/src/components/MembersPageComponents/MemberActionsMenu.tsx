import { useState, useRef, useEffect } from 'react';
import { MoreVertical, RefreshCw, ShieldCheck, UserMinus, XCircle, Send } from 'lucide-react';

export type MemberRole = 'Admin' | 'Member' | 'Guest';
export type MemberStatus = 'Active' | 'Away' | 'Invited' | 'Deactivated';

export interface Member {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  avatarColor: string;
  initials: string;
}

interface MemberActionsMenuProps {
  member: Member;
  onChangeRole: (member: Member) => void;
  onDeactivate: (member: Member) => void;
  onRemove: (member: Member) => void;
  onResendInvite?: (member: Member) => void;
  onCancelInvite?: (member: Member) => void;
}

function MemberActionsMenu({
  member,
  onChangeRole,
  onDeactivate,
  onRemove,
  onResendInvite,
  onCancelInvite,
}: MemberActionsMenuProps) {
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

  return (
    <div className="tf-member-actions-wrapper" ref={menuRef}>
      <button
        className="tf-actions-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Actions for ${member.name}`}
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div className="tf-actions-menu">
          {member.status === 'Invited' ? (
            <>
              <button
                className="tf-actions-menu-item"
                onClick={() => { onResendInvite?.(member); setIsOpen(false); }}
              >
                <Send size={14} />
                Resend Invitation
              </button>
              <button
                className="tf-actions-menu-item danger"
                onClick={() => { onCancelInvite?.(member); setIsOpen(false); }}
              >
                <XCircle size={14} />
                Cancel Invitation
              </button>
            </>
          ) : (
            <>
              <button
                className="tf-actions-menu-item"
                onClick={() => { onChangeRole(member); setIsOpen(false); }}
              >
                <ShieldCheck size={14} />
                Change Role
              </button>
              <div className="tf-actions-menu-divider" />
              {member.status !== 'Deactivated' ? (
                <button
                  className="tf-actions-menu-item danger"
                  onClick={() => { onDeactivate(member); setIsOpen(false); }}
                >
                  <UserMinus size={14} />
                  Deactivate
                </button>
              ) : (
                <button
                  className="tf-actions-menu-item"
                  onClick={() => { onDeactivate(member); setIsOpen(false); }}
                >
                  <RefreshCw size={14} />
                  Reactivate
                </button>
              )}
              <button
                className="tf-actions-menu-item danger"
                onClick={() => { onRemove(member); setIsOpen(false); }}
              >
                <XCircle size={14} />
                Remove
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default MemberActionsMenu;
