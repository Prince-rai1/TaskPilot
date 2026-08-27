import { CheckCircle2, Circle, Clock } from 'lucide-react';

export interface ProjectGoal {
  id: string;
  text: string;
  status: 'not-started' | 'in-progress' | 'completed';
}

interface GoalItemProps {
  goal: ProjectGoal;
}

function GoalItem({ goal }: GoalItemProps) {
  const getIcon = () => {
    switch (goal.status) {
      case 'completed':
        return <CheckCircle2 size={20} />;
      case 'in-progress':
        return <Clock size={20} />;
      default:
        return <Circle size={20} />;
    }
  };

  const getLabel = () => {
    switch (goal.status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      default: return 'Not Started';
    }
  };

  return (
    <div className="tf-context-goal-item">
      <div className="tf-context-goal-left">
        <span className={`tf-context-goal-icon ${goal.status}`}>
          {getIcon()}
        </span>
        <span className="tf-context-goal-text">{goal.text}</span>
      </div>
      <span className={`tf-context-goal-badge ${goal.status}`}>
        {getLabel()}
      </span>
    </div>
  );
}

export default GoalItem;
