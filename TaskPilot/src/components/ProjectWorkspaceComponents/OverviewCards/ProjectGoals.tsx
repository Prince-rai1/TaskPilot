import { CheckCircle2, Circle, Clock } from 'lucide-react';

function ProjectGoals() {
  const goals = [
    { id: 1, text: 'Launch MVP', status: 'completed' },
    { id: 2, text: 'Complete authentication', status: 'in-progress' },
    { id: 3, text: 'Release responsive dashboard', status: 'pending' },
    { id: 4, text: 'Improve collaboration workflow', status: 'pending' }
  ];

  const getIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={20} className="tf-goal-icon completed" />;
      case 'in-progress': return <Clock size={20} className="tf-goal-icon in-progress" />;
      default: return <Circle size={20} className="tf-goal-icon pending" />;
    }
  };

  return (
    <div className="tf-card">
      <div className="tf-card-header">
        <h2 className="tf-card-title">Project Goals</h2>
      </div>

      <div className="tf-item-list" style={{ gap: 8 }}>
        {goals.map(goal => (
          <div key={goal.id} className="tf-goal-item">
            {getIcon(goal.status)}
            <span className={`tf-goal-text ${goal.status === 'completed' ? 'completed' : ''}`}>
              {goal.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectGoals;
