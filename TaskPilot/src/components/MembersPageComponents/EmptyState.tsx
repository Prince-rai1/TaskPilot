import { Users, UserPlus, SearchX } from 'lucide-react';

type EmptyStateType = 'no-members' | 'no-results';

interface EmptyStateProps {
  type: EmptyStateType;
  onInviteClick?: () => void;
  onClearFilters?: () => void;
}

function EmptyState({ type, onInviteClick, onClearFilters }: EmptyStateProps) {
  if (type === 'no-members') {
    return (
      <div className="tf-members-empty">
        <div className="tf-members-empty-icon">
          <Users size={28} />
        </div>
        <h3>No members yet</h3>
        <p>Invite your team members to start collaborating.</p>
        {onInviteClick && (
          <button className="tf-btn-primary" onClick={onInviteClick}>
            <UserPlus size={16} />
            Invite Member
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="tf-members-empty">
      <div className="tf-members-empty-icon">
        <SearchX size={28} />
      </div>
      <h3>No members found</h3>
      <p>Try a different search or clear your filters.</p>
      {onClearFilters && (
        <button className="tf-clear-filters-btn" onClick={onClearFilters}>
          Clear Filters
        </button>
      )}
    </div>
  );
}

export default EmptyState;
