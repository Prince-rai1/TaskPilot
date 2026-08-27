import { useState } from 'react';
import { Pencil } from 'lucide-react';
import ContextView from './ContextView';
import EditContextForm from './EditContextForm';
import type { ProjectGoal } from './GoalItem';
import './ContextTab.css';

export interface ContextData {
  what: string;
  why: string;
  how: string;
  expectedOutcome: string;
  goals: ProjectGoal[];
}

const initialContextData: ContextData = {
  what: 'A completely redesigned frontend for the core TaskPilot web application using modern React and a scalable design system.',
  why: 'To improve application performance, ensure visual consistency across all modules, and provide a better user experience for enterprise teams.',
  how: 'Using React 19, custom CSS architecture matching our new design language, and replacing legacy class components with hooks.',
  expectedOutcome: '99.99% uptime and 50% reduction in infrastructure costs. A unified design system accelerating future feature development.',
  goals: [
    { id: '1', text: 'Identify all legacy dependencies', status: 'completed' },
    { id: '2', text: 'Develop new Identity Service', status: 'in-progress' },
    { id: '3', text: 'Migrate first 500 enterprise accounts', status: 'not-started' },
  ],
};

function ProjectContextMain() {
  const [isEditing, setIsEditing] = useState(false);
  const [contextData, setContextData] = useState<ContextData>(initialContextData);

  const handleSave = (newData: ContextData) => {
    setContextData(newData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="tf-context-tab">
      <div className="tf-context-header">
        <div>
          <h2 className="tf-context-title">Project Context</h2>
          <p className="tf-context-subtitle">Understand the purpose, direction, and goals of this project.</p>
        </div>

        {!isEditing && (
          <button className="tf-btn-secondary" onClick={() => setIsEditing(true)}>
            <Pencil size={14} />
            Edit Context
          </button>
        )}
      </div>

      <div className="tf-context-card">
        {isEditing ? (
          <EditContextForm
            initialData={contextData}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <ContextView data={contextData} />
        )}
      </div>
    </div>
  );
}

export default ProjectContextMain;
