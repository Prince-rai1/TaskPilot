import { Plus } from 'lucide-react';
import './Dashboard.css';

function WelcomeSection() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="tf-welcome">
      <div>
        <span className="tf-date">{currentDate}</span>
        <div className="tf-welcome-text">
          <h1>Good morning, Prince 👋</h1>
          <p>You have 12 tasks to complete today. Let's make it a productive day!</p>
        </div>
      </div>
      <button className="tf-btn-primary">
        <Plus size={18} />
        Create Task
      </button>
    </div>
  );
}

export default WelcomeSection;
