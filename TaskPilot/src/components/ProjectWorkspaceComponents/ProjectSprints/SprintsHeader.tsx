import { Plus } from 'lucide-react';

interface SprintsHeaderProps {
  totalSprints: number;
  onCreateSprint: () => void;
}

export default function SprintsHeader({ totalSprints, onCreateSprint }: SprintsHeaderProps) {
  return (
    <div className="tf-issues-header">
      <div className="tf-issues-title-area">
        <h1 className="tf-issues-title">
          Sprints
          <span className="tf-issues-count">{totalSprints} sprints</span>
        </h1>
        <p className="tf-issues-subtitle">Plan, track, and manage your project sprints.</p>
        <span style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>TaskPilot Web App · TPW</span>
      </div>

      <button className="tf-btn-primary" onClick={onCreateSprint}>
        <Plus size={16} />
        Create Sprint
      </button>
    </div>
  );
}
