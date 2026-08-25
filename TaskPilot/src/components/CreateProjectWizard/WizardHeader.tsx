import { X } from 'lucide-react';

interface WizardHeaderProps {
  onClose: () => void;
}

export default function WizardHeader({ onClose }: WizardHeaderProps) {
  return (
    <div className="wizard-header">
      <h2>Create New Project</h2>
      <button className="wizard-close-btn" onClick={onClose} aria-label="Close wizard">
        <X size={20} />
      </button>
    </div>
  );
}
