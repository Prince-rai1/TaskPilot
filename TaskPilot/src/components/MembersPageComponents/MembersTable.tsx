import MemberActionsMenu from './MemberActionsMenu';
import type { Member } from './MemberActionsMenu';

interface MembersTableProps {
  members: Member[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onChangeRole: (member: Member) => void;
  onDeactivate: (member: Member) => void;
  onRemove: (member: Member) => void;
  onResendInvite: (member: Member) => void;
  onCancelInvite: (member: Member) => void;
  onClearSelection: () => void;
  onBulkDeactivate: () => void;
}

function MembersTable({
  members,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onChangeRole,
  onDeactivate,
  onRemove,
  onResendInvite,
  onCancelInvite,
  onClearSelection,
  onBulkDeactivate,
}: MembersTableProps) {
  const allSelected = members.length > 0 && selectedIds.size === members.length;
  const someSelected = selectedIds.size > 0;

  return (
    <div className="tf-members-table-card">
      {/* Bulk Actions Bar */}
      {someSelected && (
        <div className="tf-bulk-actions-bar">
          <span>{selectedIds.size} member{selectedIds.size > 1 ? 's' : ''} selected</span>
          <button className="tf-bulk-deactivate-btn" onClick={onBulkDeactivate}>
            Deactivate
          </button>
          <button className="tf-bulk-clear-btn" onClick={onClearSelection}>
            Clear selection
          </button>
        </div>
      )}

      <div className="tf-members-table-wrapper">
        <table className="tf-members-table">
          <thead>
            <tr>
              <th className="tf-col-checkbox">
                <input
                  type="checkbox"
                  className="tf-member-checkbox"
                  checked={allSelected}
                  onChange={onToggleSelectAll}
                />
              </th>
              <th className="tf-col-member">Member</th>
              <th className="tf-col-email">Email</th>
              <th className="tf-col-role">Role</th>
              <th className="tf-col-status">Status</th>
              <th className="tf-col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td className="tf-col-checkbox">
                  <input
                    type="checkbox"
                    className="tf-member-checkbox"
                    checked={selectedIds.has(member.id)}
                    onChange={() => onToggleSelect(member.id)}
                  />
                </td>
                <td className="tf-col-member">
                  <div className="tf-member-info">
                    <div className={`tf-member-avatar ${member.avatarColor}`}>
                      {member.initials}
                    </div>
                    <span className="tf-member-name">{member.name}</span>
                  </div>
                </td>
                <td className="tf-col-email">
                  <span className="tf-member-email">{member.email}</span>
                </td>
                <td className="tf-col-role">
                  <span className={`tf-role-badge ${member.role.toLowerCase()}`}>
                    {member.role}
                  </span>
                </td>
                <td className="tf-col-status">
                  <span className={`tf-status-badge ${member.status.toLowerCase()}`}>
                    {(member.status === 'Active' || member.status === 'Away') && (
                      <span className="tf-status-dot" />
                    )}
                    {member.status}
                  </span>
                </td>
                <td className="tf-col-actions">
                  <MemberActionsMenu
                    member={member}
                    onChangeRole={onChangeRole}
                    onDeactivate={onDeactivate}
                    onRemove={onRemove}
                    onResendInvite={onResendInvite}
                    onCancelInvite={onCancelInvite}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MembersTable;
