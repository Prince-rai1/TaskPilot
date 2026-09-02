import { Rocket, CalendarPlus, History, AlertTriangle, Plus } from 'lucide-react';

/* ============ Empty States ============ */

interface EmptyStateProps {
  onCreateSprint?: () => void;
}

export function NoActiveSprintEmpty({ onCreateSprint }: EmptyStateProps) {
  return (
    <div className="tf-sprints-empty">
      <Rocket size={48} className="tf-sprints-empty-icon" />
      <h3 className="tf-sprints-empty-title">No active sprint</h3>
      <p className="tf-sprints-empty-desc">Start a sprint to begin focused project work.</p>
      <button className="tf-btn-primary" onClick={onCreateSprint}>
        <Plus size={16} />
        Create Sprint
      </button>
    </div>
  );
}

export function NoUpcomingSprintsEmpty({ onCreateSprint }: EmptyStateProps) {
  return (
    <div className="tf-sprints-empty">
      <CalendarPlus size={48} className="tf-sprints-empty-icon" />
      <h3 className="tf-sprints-empty-title">No upcoming sprints</h3>
      <p className="tf-sprints-empty-desc">Create your next sprint to plan future work.</p>
      <button className="tf-sprint-card-link" onClick={onCreateSprint} style={{ fontSize: 14, marginTop: -4 }}>
        + Create Sprint
      </button>
    </div>
  );
}

export function NoCompletedSprintsEmpty() {
  return (
    <div className="tf-sprints-empty" style={{ borderStyle: 'solid', opacity: 0.7, padding: '36px 32px' }}>
      <History size={40} className="tf-sprints-empty-icon" />
      <h3 className="tf-sprints-empty-title">No completed sprints yet</h3>
      <p className="tf-sprints-empty-desc" style={{ marginBottom: 0 }}>
        Completed sprints will appear here.
      </p>
    </div>
  );
}

/* ============ Error State ============ */

interface ErrorStateProps {
  onRetry?: () => void;
}

export function SprintsErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="tf-sprints-error">
      <AlertTriangle size={48} className="tf-sprints-error-icon" />
      <h3 className="tf-sprints-empty-title">Unable to load sprints</h3>
      <p className="tf-sprints-empty-desc">Something went wrong while loading this project's sprints.</p>
      <button className="tf-btn-secondary" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}

/* ============ Loading State ============ */

export function SprintsLoadingState() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Active Sprint Skeleton */}
      <div className="tf-skeleton-card">
        <div className="tf-skeleton tf-skeleton-line h-20 w-40" />
        <div className="tf-skeleton tf-skeleton-line w-60" />
        <div className="tf-skeleton tf-skeleton-line w-80" style={{ marginTop: 16 }} />
        <div className="tf-skeleton tf-skeleton-line h-8 w-full" style={{ marginTop: 8 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 20 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="tf-skeleton" style={{ height: 60, borderRadius: 8 }} />
          ))}
        </div>
        <div className="tf-skeleton tf-skeleton-line w-60" style={{ marginTop: 20 }} />
      </div>

      {/* Upcoming Sprint Skeletons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="tf-skeleton-card">
            <div className="tf-skeleton tf-skeleton-line h-20 w-60" />
            <div className="tf-skeleton tf-skeleton-line w-80" />
            <div className="tf-skeleton tf-skeleton-line w-40" />
          </div>
        ))}
      </div>
    </div>
  );
}
