import SprintSection from './SprintSection';
import type { Issue } from './ProjectBacklog';

interface ActiveSprintProps {
  issues: Issue[];
}

export default function ActiveSprint({ issues }: ActiveSprintProps) {
  return (
    <SprintSection
      title="Sprint 4"
      dateRange="Aug 20 – Sep 03"
      goal="Deliver the new unified checkout experience and squash remaining P1 checkout bugs."
      issues={issues}
      isActive={true}
      onCompleteSprint={() => alert('Complete sprint clicked')}
    />
  );
}
