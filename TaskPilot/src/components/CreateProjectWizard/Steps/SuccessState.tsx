import type { ProjectConfig } from '../types';
import { CheckCircle } from 'lucide-react';

interface SuccessStateProps {
  config: ProjectConfig;
  onClose: () => void;
}

export default function SuccessState({ config, onClose }: SuccessStateProps) {
  return (
    <div className="step-container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: '#10b981' }}>
        <CheckCircle size={64} strokeWidth={1.5} />
      </div>

      <h3 className="step-title" style={{ marginBottom: '1rem' }}>Project created successfully</h3>
      <p className="step-subtitle" style={{ fontSize: '1.125rem', color: '#374151' }}>
        {config.name || 'Your new project'} is ready.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem' }}>
        <button className="btn btn-secondary" onClick={onClose}>
          Go to Dashboard
        </button>
        <button className="btn btn-primary" onClick={onClose}>
          Open Project
        </button>
      </div>
    </div>
  );
}
