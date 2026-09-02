import { UserPlus } from 'lucide-react';

interface MembersHeaderProps {
  onInviteClick: () => void;
}

function MembersHeader({ onInviteClick }: MembersHeaderProps) {
  return (
    <div className="tf-members-header">
      <div className="tf-members-header-text">
        <h2>Members</h2>
        <p>Manage your workspace members.</p>
      </div>
      <button className="tf-btn-primary" onClick={onInviteClick}>
        <UserPlus size={16} />
        Invite Member
      </button>
    </div>
  );
}

export default MembersHeader;
