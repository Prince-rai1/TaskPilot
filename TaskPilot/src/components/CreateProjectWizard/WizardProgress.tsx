import { Check } from 'lucide-react';

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function WizardProgress({ currentStep, totalSteps }: WizardProgressProps) {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="wizard-progress-container">
      <div className="wizard-progress">
        <div className="wizard-progress-line"></div>
        <div
          className="wizard-progress-line-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>

        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          let className = 'wizard-step-indicator';
          if (isCompleted) className += ' completed';
          if (isActive) className += ' active';

          return (
            <div key={stepNumber} className={className}>
              {isCompleted ? <Check size={14} strokeWidth={3} /> : stepNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
}
