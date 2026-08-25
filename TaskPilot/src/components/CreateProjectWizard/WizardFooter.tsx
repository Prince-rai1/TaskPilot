interface WizardFooterProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onCancel: () => void;
}

export default function WizardFooter({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onCancel
}: WizardFooterProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="wizard-footer">
      <button className="btn btn-ghost" onClick={onCancel}>
        Cancel
      </button>

      <div className="wizard-footer-right">
        {!isFirstStep && (
          <button className="btn btn-secondary" onClick={onBack}>
            Back
          </button>
        )}

        <button className="btn btn-primary" onClick={onNext}>
          {isLastStep ? 'Create Project' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
