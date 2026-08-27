import GoalItem from './GoalItem';
import type { ProjectGoal } from './GoalItem';

interface GoalListProps {
  goals: ProjectGoal[];
}

function GoalList({ goals }: GoalListProps) {
  if (goals.length === 0) {
    return <span className="tf-context-empty">No goals defined yet.</span>;
  }

  return (
    <div className="tf-context-goal-list">
      {goals.map((goal) => (
        <GoalItem key={goal.id} goal={goal} />
      ))}
    </div>
  );
}

export default GoalList;
