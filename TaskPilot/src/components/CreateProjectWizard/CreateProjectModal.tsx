import { useState } from 'react';
import { type ProjectConfig, initialProjectConfig } from './types';
import WizardHeader from './WizardHeader';
import WizardProgress from './WizardProgress';
import WizardFooter from './WizardFooter';
import './CreateProjectWizard.css';

import BasicsStep from './Steps/BasicsStep';
import ProjectTypeStep from './Steps/ProjectTypeStep';
import TeamAccessStep from './Steps/TeamAccessStep';
import WorkflowStep from './Steps/WorkflowStep';
import IssueConfigStep from './Steps/IssueConfigStep';
import ReviewStep from './Steps/ReviewStep';
import SuccessState from './Steps/SuccessState';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOTAL_STEPS = 6;

export default function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<ProjectConfig>(initialProjectConfig);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const updateConfig = (updates: Partial<ProjectConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    } else {
      console.log('Project created:', config);
      setIsSuccess(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleCancel = () => {
    onClose();
    setTimeout(() => {
      setCurrentStep(1);
      setConfig(initialProjectConfig);
      setIsSuccess(false);
    }, 300);
  };

  const renderStepContent = () => {
    if (isSuccess) {
      return <SuccessState config={config} onClose={handleCancel} />;
    }

    const stepProps = {
      config,
      updateConfig,
      onNext: handleNext,
      onBack: handleBack,
      onCancel: handleCancel
    };

    switch (currentStep) {
      case 1: return <BasicsStep {...stepProps} />;
      case 2: return <ProjectTypeStep {...stepProps} />;
      case 3: return <TeamAccessStep {...stepProps} />;
      case 4: return <WorkflowStep {...stepProps} />;
      case 5: return <IssueConfigStep {...stepProps} />;
      case 6: return <ReviewStep {...stepProps} onEditStep={setCurrentStep} />;
      default: return null;
    }
  };

  return (
    <div className="wizard-overlay">
      <div className="wizard-modal">
        {!isSuccess && <WizardHeader onClose={handleCancel} />}
        {!isSuccess && (
          <WizardProgress
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
          />
        )}

        <div className="wizard-content">
          {renderStepContent()}
        </div>

        {!isSuccess && (
          <WizardFooter
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            onBack={handleBack}
            onNext={handleNext}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}
