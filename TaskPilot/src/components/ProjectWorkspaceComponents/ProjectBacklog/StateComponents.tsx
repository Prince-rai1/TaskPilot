import { Plus } from 'lucide-react';

export function EmptyBacklogState() {
  return (
    <div className="tf-empty-state">
      <h3 className="tf-empty-title">Your backlog is empty</h3>
      <p className="tf-empty-desc">Create an issue to start planning future work.</p>
      <button className="tf-btn-primary">
        <Plus size={16} />
        Create Issue
      </button>
    </div>
  );
}

export function NoActiveSprintState() {
  return (
    <div className="tf-empty-state">
      <h3 className="tf-empty-title">No active sprint</h3>
      <p className="tf-empty-desc">Create a sprint to start organizing work into focused cycles.</p>
      <button className="tf-btn-primary" style={{ padding: '8px 16px' }}>
        Create Sprint
      </button>
    </div>
  );
}

export function EmptySprintState() {
  return (
    <div className="tf-empty-state" style={{ padding: 32 }}>
      <p className="tf-empty-title" style={{ fontSize: 14 }}>No issues in this sprint</p>
      <p className="tf-empty-desc" style={{ fontSize: 13 }}>Drag issues from the backlog here or create a new issue.</p>
      <button className="tf-btn-secondary" style={{ gap: 6 }}>
        <Plus size={14} />
        Create Issue
      </button>
    </div>
  );
}

export function ErrorState() {
  return (
    <div className="tf-empty-state">
      <h3 className="tf-empty-title">Unable to load backlog</h3>
      <p className="tf-empty-desc">Something went wrong while loading the project backlog.</p>
      <button className="tf-btn-secondary">Try again</button>
    </div>
  );
}
