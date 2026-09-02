import { Search } from 'lucide-react';

interface MembersToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  roleFilter: string;
  onRoleFilterChange: (role: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
}

function MembersToolbar({
  searchQuery,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange,
}: MembersToolbarProps) {
  return (
    <div className="tf-members-toolbar">
      <div className="tf-members-search">
        <Search size={16} />
        <input
          type="text"
          placeholder="Search members..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="tf-members-filters">
        <select
          className="tf-filter-select"
          value={roleFilter}
          onChange={(e) => onRoleFilterChange(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Member">Member</option>
          <option value="Guest">Guest</option>
        </select>
        <select
          className="tf-filter-select"
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Away">Away</option>
          <option value="Invited">Invited</option>
          <option value="Deactivated">Deactivated</option>
        </select>
      </div>
    </div>
  );
}

export default MembersToolbar;
