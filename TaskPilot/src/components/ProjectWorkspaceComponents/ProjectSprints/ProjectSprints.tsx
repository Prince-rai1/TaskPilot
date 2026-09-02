import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SprintsHeader from './SprintsHeader';
import SprintToolbar from './SprintToolbar';
import type { StatusFilter, SortOption, ViewMode } from './SprintToolbar';
import ActiveSprintCard from './ActiveSprintCard';
import type { SprintData } from './ActiveSprintCard';
import SprintCard from './SprintCard';
import CompletedSprintCard from './CompletedSprintCard';
import SprintSummary from './SprintSummary';
import CreateSprintModal from './CreateSprintModal';
import StartSprintModal from './StartSprintModal';
import CompleteSprintModal from './CompleteSprintModal';
import {
  NoActiveSprintEmpty,
  NoUpcomingSprintsEmpty,
  NoCompletedSprintsEmpty,
} from './StateComponents';

import '../ProjectIssues/ProjectIssues.css';
import './ProjectSprints.css';

/* ===== Demo Data ===== */
const teamMembers = [
  { initials: 'JD', name: 'John Doe' },
  { initials: 'AS', name: 'Alice Smith' },
  { initials: 'PR', name: 'Paul Rudd' },
  { initials: 'MK', name: 'Maya Kim' },
  { initials: 'BT', name: 'Brian Taylor' },
  { initials: 'LR', name: 'Lisa Rogers' },
  { initials: 'DM', name: 'Dave Moore' },
  { initials: 'KJ', name: 'Karen Jones' },
];

const allSprints: SprintData[] = [
  {
    id: 'sprint-4',
    name: 'Sprint 4',
    status: 'active',
    startDate: 'Aug 20',
    endDate: 'Sep 03',
    goal: 'Complete authentication and dashboard redesign',
    totalIssues: 32,
    completedIssues: 24,
    inProgressIssues: 6,
    todoIssues: 2,
    totalPoints: 32,
    completedPoints: 24,
    daysRemaining: 5,
    health: 'on-track',
    teamMembers,
  },
  {
    id: 'sprint-5',
    name: 'Sprint 5',
    status: 'upcoming',
    startDate: 'Sep 04',
    endDate: 'Sep 18',
    goal: 'Prepare release candidate',
    totalIssues: 18,
    completedIssues: 0,
    inProgressIssues: 0,
    todoIssues: 18,
    totalPoints: 24,
    completedPoints: 0,
  },
  {
    id: 'sprint-6',
    name: 'Sprint 6',
    status: 'upcoming',
    startDate: 'Sep 19',
    endDate: 'Oct 03',
    goal: 'Performance optimization',
    totalIssues: 12,
    completedIssues: 0,
    inProgressIssues: 0,
    todoIssues: 12,
    totalPoints: 18,
    completedPoints: 0,
  },
  {
    id: 'sprint-7',
    name: 'Sprint 7',
    status: 'upcoming',
    startDate: 'Oct 04',
    endDate: 'Oct 18',
    goal: 'QA and bug fixes',
    totalIssues: 8,
    completedIssues: 0,
    inProgressIssues: 0,
    todoIssues: 8,
    totalPoints: 12,
    completedPoints: 0,
  },
  {
    id: 'sprint-3',
    name: 'Sprint 3',
    status: 'completed',
    startDate: 'Aug 05',
    endDate: 'Aug 19',
    goal: 'Complete authentication MVP',
    totalIssues: 30,
    completedIssues: 28,
    inProgressIssues: 0,
    todoIssues: 2,
    totalPoints: 45,
    completedPoints: 42,
    teamMembers,
  },
  {
    id: 'sprint-2',
    name: 'Sprint 2',
    status: 'completed',
    startDate: 'Jul 22',
    endDate: 'Aug 04',
    goal: 'User onboarding flow',
    totalIssues: 25,
    completedIssues: 22,
    inProgressIssues: 0,
    todoIssues: 3,
    totalPoints: 40,
    completedPoints: 36,
    teamMembers,
  },
];

/* ===== Component ===== */
export default function ProjectSprints() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  // Toolbar state
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('startDate');
  const [viewMode, setViewMode] = useState<ViewMode>('card');

  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [startTarget, setStartTarget] = useState<SprintData | null>(null);
  const [completeTarget, setCompleteTarget] = useState<SprintData | null>(null);
  const [summaryTarget, setSummaryTarget] = useState<SprintData | null>(null);

  // Categorize sprints
  const activeSprints = allSprints.filter((s) => s.status === 'active');
  const upcomingSprints = allSprints.filter((s) => s.status === 'upcoming');
  const completedSprints = allSprints.filter((s) => s.status === 'completed');

  // Filter & search
  const filterSprints = (sprints: SprintData[]) => {
    let result = sprints;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.goal?.toLowerCase().includes(q)
      );
    }
    return result;
  };

  const filteredActive = filterSprints(activeSprints);
  const filteredUpcoming = filterSprints(upcomingSprints);
  const filteredCompleted = filterSprints(completedSprints);

  // Determine which sections to show
  const showActive = statusFilter === 'all' || statusFilter === 'active';
  const showUpcoming = statusFilter === 'all' || statusFilter === 'upcoming';
  const showCompleted = statusFilter === 'all' || statusFilter === 'completed';

  const totalSprints = allSprints.length;

  return (
    <div className="tf-issues-page">
      <SprintsHeader totalSprints={totalSprints} onCreateSprint={() => setShowCreateModal(true)} />
      <SprintToolbar
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className="tf-sprints-scroll">
        <div className="tf-sprints-container">
          {/* Sprint Summary Overlay */}
          {summaryTarget && (
            <SprintSummary sprint={summaryTarget} onClose={() => setSummaryTarget(null)} />
          )}

          {/* Active Sprint Section */}
          {showActive && !summaryTarget && (
            <section>
              <h2 className="tf-sprints-section-title">
                <span className="tf-sprints-section-dot active" />
                Active Sprint
              </h2>
              {filteredActive.length > 0 ? (
                filteredActive.map((sprint) => (
                  <ActiveSprintCard
                    key={sprint.id}
                    sprint={sprint}
                    onComplete={() => setCompleteTarget(sprint)}
                    onViewBoard={() => navigate(`/projects/${projectId}/board`)}
                    onViewBacklog={() => navigate(`/projects/${projectId}/backlog`)}
                  />
                ))
              ) : (
                <NoActiveSprintEmpty onCreateSprint={() => setShowCreateModal(true)} />
              )}
            </section>
          )}

          {/* Upcoming Sprints Section */}
          {showUpcoming && !summaryTarget && (
            <section>
              <h2 className="tf-sprints-section-title">
                <span className="tf-sprints-section-dot upcoming" />
                Upcoming Sprints
              </h2>
              {filteredUpcoming.length > 0 ? (
                viewMode === 'card' ? (
                  <div className="tf-sprints-grid">
                    {filteredUpcoming.map((sprint) => (
                      <SprintCard
                        key={sprint.id}
                        sprint={sprint}
                        onOpen={() => setStartTarget(sprint)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="tf-sprints-list">
                    {filteredUpcoming.map((sprint) => (
                      <div
                        key={sprint.id}
                        className="tf-sprint-list-item"
                        onClick={() => setStartTarget(sprint)}
                      >
                        <div className="tf-sprint-list-left">
                          <span className="tf-sprint-list-name">{sprint.name}</span>
                          <span className="tf-sprint-badge not-started" style={{ flexShrink: 0 }}>Not Started</span>
                          <span className="tf-sprint-list-goal">{sprint.goal}</span>
                        </div>
                        <div className="tf-sprint-list-right">
                          <span className="tf-sprint-list-meta">{sprint.startDate} – {sprint.endDate}</span>
                          <span className="tf-sprint-list-meta">{sprint.totalIssues} issues</span>
                          <span className="tf-sprint-list-meta">{sprint.totalPoints} pts</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <NoUpcomingSprintsEmpty onCreateSprint={() => setShowCreateModal(true)} />
              )}
            </section>
          )}

          {/* Completed Sprints Section */}
          {showCompleted && !summaryTarget && (
            <section>
              <h2 className="tf-sprints-section-title">
                <span className="tf-sprints-section-dot completed" />
                Completed Sprints
              </h2>
              {filteredCompleted.length > 0 ? (
                viewMode === 'card' ? (
                  <div className="tf-completed-sprints-grid">
                    {filteredCompleted.map((sprint) => (
                      <CompletedSprintCard
                        key={sprint.id}
                        sprint={sprint}
                        onViewSummary={() => setSummaryTarget(sprint)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="tf-sprints-list">
                    {filteredCompleted.map((sprint) => {
                      const pct = sprint.totalIssues > 0
                        ? Math.round((sprint.completedIssues / sprint.totalIssues) * 100)
                        : 0;
                      return (
                        <div
                          key={sprint.id}
                          className="tf-sprint-list-item"
                          onClick={() => setSummaryTarget(sprint)}
                          style={{ opacity: 0.85 }}
                        >
                          <div className="tf-sprint-list-left">
                            <span className="tf-sprint-list-name">{sprint.name}</span>
                            <span className="tf-sprint-badge completed" style={{ flexShrink: 0 }}>Completed</span>
                            <span className="tf-sprint-list-goal">
                              {sprint.completedIssues}/{sprint.totalIssues} completed · {pct}%
                            </span>
                          </div>
                          <div className="tf-sprint-list-right">
                            <span className="tf-sprint-list-meta">{sprint.startDate} – {sprint.endDate}</span>
                            <span className="tf-sprint-list-meta">{sprint.completedPoints}/{sprint.totalPoints} pts</span>
                            <button className="tf-sprint-card-link" onClick={(e) => { e.stopPropagation(); setSummaryTarget(sprint); }}>
                              View Summary
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              ) : (
                <NoCompletedSprintsEmpty />
              )}
            </section>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateSprintModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={(data) => {
          console.log('Create Sprint:', data);
          setShowCreateModal(false);
        }}
        nextSprintNumber={allSprints.length + 1}
      />

      <StartSprintModal
        open={!!startTarget}
        sprint={startTarget}
        onClose={() => setStartTarget(null)}
        onConfirm={() => {
          console.log('Start Sprint:', startTarget?.name);
          setStartTarget(null);
        }}
      />

      <CompleteSprintModal
        open={!!completeTarget}
        sprint={completeTarget}
        nextSprintName={upcomingSprints[0]?.name}
        onClose={() => setCompleteTarget(null)}
        onConfirm={(moveOption) => {
          console.log('Complete Sprint:', completeTarget?.name, 'Move to:', moveOption);
          setCompleteTarget(null);
        }}
      />
    </div>
  );
}
