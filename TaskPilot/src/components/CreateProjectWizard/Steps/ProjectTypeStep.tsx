import { type WizardStepProps } from '../types';
import { Monitor, Box, PenTool, Megaphone, Briefcase, User, Settings } from 'lucide-react';

export default function ProjectTypeStep({ config, updateConfig }: WizardStepProps) {
  const projectTypes = [
    {
      id: 'Software',
      title: 'Software Development',
      description: 'For development teams managing issues, sprints, bugs, and releases.',
      icon: <Monitor size={20} />
    },
    {
      id: 'Product',
      title: 'Product',
      description: 'For product planning, roadmaps, feature development, and discovery.',
      icon: <Box size={20} />
    },
    {
      id: 'Design',
      title: 'Design',
      description: 'For design teams managing creative work and reviews.',
      icon: <PenTool size={20} />
    },
    {
      id: 'Marketing',
      title: 'Marketing',
      description: 'For campaigns, content, launches, and marketing tasks.',
      icon: <Megaphone size={20} />
    },
    {
      id: 'Business',
      title: 'Business',
      description: 'For general team workflows and operations.',
      icon: <Briefcase size={20} />
    },
    {
      id: 'Personal',
      title: 'Personal',
      description: 'For individual task and project management.',
      icon: <User size={20} />
    },
    {
      id: 'Custom',
      title: 'Custom',
      description: 'Build the workflow and configuration yourself.',
      icon: <Settings size={20} />
    }
  ];

  return (
    <div className="step-container">
      <h3 className="step-title">What type of project are you creating?</h3>
      <p className="step-subtitle">Select the category that best matches your team's goal.</p>

      <div className="selection-grid">
        {projectTypes.map(type => (
          <div
            key={type.id}
            className={`selection-card ${config.projectType === type.id ? 'selected' : ''}`}
            onClick={() => updateConfig({ projectType: type.id })}
          >
            <div className="selection-card-icon">
              {type.icon}
            </div>
            <div className="selection-card-title">{type.title}</div>
            <div className="selection-card-desc">{type.description}</div>

            {config.projectType === type.id && (
              <div className="selection-card-check">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" fill="currentColor" />
                  <path d="M7.75 12L10.58 14.83L16.25 9.17004" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
