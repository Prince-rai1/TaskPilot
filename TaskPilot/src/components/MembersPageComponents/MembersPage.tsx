import { useState, useMemo } from 'react';
import Sidebar from '../SharedComponents/Sidebar';
import Topbar from '../SharedComponents/Topbar';
import MembersHeader from './MembersHeader';
import MembersToolbar from './MembersToolbar';
import MembersTable from './MembersTable';
import InviteMemberModal from './InviteMemberModal';
import ConfirmationModal from './ConfirmationModal';
import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import type { Member, MemberRole } from './MemberActionsMenu';
import type { ConfirmationType } from './ConfirmationModal';
import '../DashboardPageComponents/Dashboard.css';
import './Members.css';

// Sample workspace members data
const initialMembers: Member[] = [
  {
    id: '1',
    name: 'Prince Rai',
    email: 'prince@example.com',
    role: 'Admin',
    status: 'Active',
    avatarColor: 'indigo',
    initials: 'PR',
  },
  {
    id: '2',
    name: 'Alex Chen',
    email: 'alex@example.com',
    role: 'Member',
    status: 'Active',
    avatarColor: 'blue',
    initials: 'AC',
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'Member',
    status: 'Away',
    avatarColor: 'rose',
    initials: 'SJ',
  },
  {
    id: '4',
    name: 'Mike Kim',
    email: 'mike@example.com',
    role: 'Guest',
    status: 'Invited',
    avatarColor: 'orange',
    initials: 'MK',
  },
  {
    id: '5',
    name: 'Lisa Wang',
    email: 'lisa@example.com',
    role: 'Member',
    status: 'Deactivated',
    avatarColor: 'purple',
    initials: 'LW',
  },
  {
    id: '6',
    name: 'David Park',
    email: 'david@example.com',
    role: 'Member',
    status: 'Active',
    avatarColor: 'emerald',
    initials: 'DP',
  },
  {
    id: '7',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    role: 'Admin',
    status: 'Active',
    avatarColor: 'amber',
    initials: 'EW',
  },
];

type PageState = 'loading' | 'loaded' | 'error';

function MembersPage() {
  // Page state
  const [pageState] = useState<PageState>('loaded');
  const [members, setMembers] = useState<Member[]>(initialMembers);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modals
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: ConfirmationType;
    member: Member | null;
  }>({ isOpen: false, type: 'deactivate', member: null });

  // Filtered members
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        !searchQuery ||
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = !roleFilter || member.role === roleFilter;
      const matchesStatus = !statusFilter || member.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [members, searchQuery, roleFilter, statusFilter]);

  // Selection handlers
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.size === filteredMembers.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredMembers.map((m) => m.id)));
    }
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  // Action handlers
  const handleChangeRole = (member: Member) => {
    // Cycle through roles for demo
    const roles: MemberRole[] = ['Admin', 'Member', 'Guest'];
    const currentIndex = roles.indexOf(member.role);
    const nextRole = roles[(currentIndex + 1) % roles.length];
    setMembers((prev) =>
      prev.map((m) => (m.id === member.id ? { ...m, role: nextRole } : m))
    );
  };

  const handleDeactivate = (member: Member) => {
    if (member.status === 'Deactivated') {
      // Reactivate
      setMembers((prev) =>
        prev.map((m) => (m.id === member.id ? { ...m, status: 'Active' } : m))
      );
    } else {
      setConfirmModal({ isOpen: true, type: 'deactivate', member });
    }
  };

  const handleRemove = (member: Member) => {
    setConfirmModal({ isOpen: true, type: 'remove', member });
  };

  const handleConfirmAction = () => {
    const { type, member } = confirmModal;
    if (!member) return;

    if (type === 'deactivate') {
      setMembers((prev) =>
        prev.map((m) => (m.id === member.id ? { ...m, status: 'Deactivated' } : m))
      );
    } else if (type === 'remove') {
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(member.id);
        return next;
      });
    }

    setConfirmModal({ isOpen: false, type: 'deactivate', member: null });
  };

  const handleInviteMember = (email: string, role: MemberRole) => {
    const initials = email.substring(0, 2).toUpperCase();
    const colors: string[] = ['indigo', 'blue', 'rose', 'emerald', 'amber', 'purple', 'orange'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newMember: Member = {
      id: Date.now().toString(),
      name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      email,
      role,
      status: 'Invited',
      avatarColor: randomColor,
      initials,
    };
    setMembers((prev) => [...prev, newMember]);
  };

  const handleResendInvite = (_member: Member) => {
    // In a real app, this would trigger an API call
  };

  const handleCancelInvite = (member: Member) => {
    setMembers((prev) => prev.filter((m) => m.id !== member.id));
  };

  const handleBulkDeactivate = () => {
    setMembers((prev) =>
      prev.map((m) =>
        selectedIds.has(m.id) && m.status !== 'Deactivated'
          ? { ...m, status: 'Deactivated' }
          : m
      )
    );
    setSelectedIds(new Set());
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setRoleFilter('');
    setStatusFilter('');
  };

  const hasActiveFilters = searchQuery || roleFilter || statusFilter;

  return (
    <div className="tf-dashboard">
      <Sidebar />

      <main className="tf-main-content">
        <Topbar />

        <div className="tf-members-body">
          <MembersHeader onInviteClick={() => setIsInviteModalOpen(true)} />

          <MembersToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            roleFilter={roleFilter}
            onRoleFilterChange={setRoleFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />

          {pageState === 'loading' && <LoadingState />}

          {pageState === 'error' && <ErrorState onRetry={() => window.location.reload()} />}

          {pageState === 'loaded' && (
            <>
              {members.length === 0 ? (
                <EmptyState
                  type="no-members"
                  onInviteClick={() => setIsInviteModalOpen(true)}
                />
              ) : filteredMembers.length === 0 ? (
                <EmptyState
                  type="no-results"
                  onClearFilters={hasActiveFilters ? handleClearFilters : undefined}
                />
              ) : (
                <MembersTable
                  members={filteredMembers}
                  selectedIds={selectedIds}
                  onToggleSelect={handleToggleSelect}
                  onToggleSelectAll={handleToggleSelectAll}
                  onChangeRole={handleChangeRole}
                  onDeactivate={handleDeactivate}
                  onRemove={handleRemove}
                  onResendInvite={handleResendInvite}
                  onCancelInvite={handleCancelInvite}
                  onClearSelection={handleClearSelection}
                  onBulkDeactivate={handleBulkDeactivate}
                />
              )}
            </>
          )}
        </div>
      </main>

      {/* Modals */}
      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onSubmit={handleInviteMember}
      />

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        type={confirmModal.type}
        memberName={confirmModal.member?.name || ''}
        onClose={() => setConfirmModal({ isOpen: false, type: 'deactivate', member: null })}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}

export default MembersPage;
