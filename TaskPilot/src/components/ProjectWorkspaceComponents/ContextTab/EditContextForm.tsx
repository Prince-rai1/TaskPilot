import { useState } from 'react';
import { GripVertical, Trash2, Plus } from 'lucide-react';
import type { ContextData } from './ProjectContextMain';
import type { ProjectGoal } from './GoalItem';

interface EditContextFormProps {
  initialData: ContextData;
  onSave: (data: ContextData) => void;
  onCancel: () => void;
}

function EditContextForm({ initialData, onSave, onCancel }: EditContextFormProps) {
  const [formData, setFormData] = useState<ContextData>({ ...initialData });

  const handleChange = (field: keyof ContextData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGoalChange = (id: string, field: keyof ProjectGoal, value: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.map((g) => (g.id === id ? { ...g, [field]: value } : g)),
    }));
  };

  const addGoal = () => {
    const newGoal: ProjectGoal = {
      id: Math.random().toString(36).substr(2, 9),
      text: '',
      status: 'not-started',
    };
    setFormData((prev) => ({
      ...prev,
      goals: [...prev.goals, newGoal],
    }));
  };

  const removeGoal = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.filter((g) => g.id !== id),
    }));
  };

  const moveGoal = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === formData.goals.length - 1) return;

    const newGoals = [...formData.goals];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    [newGoals[index], newGoals[targetIndex]] = [newGoals[targetIndex], newGoals[index]];

    setFormData((prev) => ({ ...prev, goals: newGoals }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="tf-edit-context-form">
      <div className="tf-form-group">
        <label className="tf-form-label">What are we building?</label>
        <textarea
          className="tf-form-textarea"
          value={formData.what}
          onChange={(e) => handleChange('what', e.target.value)}
          placeholder="Describe what is being built..."
        />
      </div>

      <div className="tf-form-group">
        <label className="tf-form-label">Why are we building it?</label>
        <textarea
          className="tf-form-textarea"
          value={formData.why}
          onChange={(e) => handleChange('why', e.target.value)}
          placeholder="Explain the business value or reasoning..."
        />
      </div>

      <div className="tf-form-group">
        <label className="tf-form-label">How are we going to build it?</label>
        <textarea
          className="tf-form-textarea"
          value={formData.how}
          onChange={(e) => handleChange('how', e.target.value)}
          placeholder="Outline the technical approach..."
        />
      </div>

      <div className="tf-form-group">
        <label className="tf-form-label">Project Goals</label>
        <div className="tf-edit-goal-list">
          {formData.goals.map((goal, index) => (
            <div key={goal.id} className="tf-edit-goal-item">
              <div className="tf-edit-goal-drag">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <button type="button" className="tf-edit-goal-drag-btn" onClick={() => moveGoal(index, 'up')}>▲</button>
                  <button type="button" className="tf-edit-goal-drag-btn" onClick={() => moveGoal(index, 'down')}>▼</button>
                </div>
                <GripVertical size={16} />
              </div>

              <div className="tf-edit-goal-input">
                <input
                  type="text"
                  className="tf-form-input"
                  value={goal.text}
                  onChange={(e) => handleGoalChange(goal.id, 'text', e.target.value)}
                  placeholder="Enter goal description..."
                />
              </div>

              <select
                className="tf-edit-goal-select"
                value={goal.status}
                onChange={(e) => handleGoalChange(goal.id, 'status', e.target.value)}
              >
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <button
                type="button"
                className="tf-btn-icon-danger"
                onClick={() => removeGoal(goal.id)}
                aria-label="Remove goal"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <button type="button" className="tf-btn-text" onClick={addGoal}>
          <Plus size={16} />
          Add goal
        </button>
      </div>

      <div className="tf-form-group">
        <label className="tf-form-label">Expected Outcome</label>
        <textarea
          className="tf-form-textarea"
          value={formData.expectedOutcome}
          onChange={(e) => handleChange('expectedOutcome', e.target.value)}
          placeholder="Describe what success looks like..."
        />
      </div>

      <div className="tf-context-footer">
        <button type="button" className="tf-btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="tf-btn-primary">
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default EditContextForm;
