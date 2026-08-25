import React, { useState } from 'react';
import type { WizardStepProps } from '../types';
import { Layout, Globe, Box, PenTool, Database, Server, Smartphone, Zap } from 'lucide-react';

export default function BasicsStep({ config, updateConfig }: WizardStepProps) {
  const [newGoal, setNewGoal] = useState('');

  const availableIcons = [
    { name: 'layout', component: <Layout size={20} /> },
    { name: 'globe', component: <Globe size={20} /> },
    { name: 'box', component: <Box size={20} /> },
    { name: 'pentool', component: <PenTool size={20} /> },
    { name: 'database', component: <Database size={20} /> },
    { name: 'server', component: <Server size={20} /> },
    { name: 'smartphone', component: <Smartphone size={20} /> },
    { name: 'zap', component: <Zap size={20} /> },
  ];

  const handleAddGoal = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newGoal.trim()) {
      e.preventDefault();
      if (!config.goals.includes(newGoal.trim())) {
        updateConfig({ goals: [...config.goals, newGoal.trim()] });
      }
      setNewGoal('');
    }
  };

  const removeGoal = (goalToRemove: string) => {
    updateConfig({ goals: config.goals.filter(g => g !== goalToRemove) });
  };

  return (
    <div className="step-container">
      <h3 className="step-title">Create your project</h3>
      <p className="step-subtitle">Start with the basic information and context for your project.</p>

      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 2 }}>
          <label className="form-label" htmlFor="projectName">Project Name <span style={{color: '#ef4444'}}>*</span></label>
          <input 
            type="text" 
            id="projectName"
            className="form-input" 
            placeholder="e.g. TaskPilot Web App" 
            value={config.name}
            onChange={(e) => updateConfig({ name: e.target.value })}
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label className="form-label" htmlFor="projectKey">Project Key <span style={{color: '#ef4444'}}>*</span></label>
          <input 
            type="text" 
            id="projectKey"
            className="form-input" 
            placeholder="e.g. TPW" 
            value={config.key}
            onChange={(e) => updateConfig({ key: e.target.value })}
          />
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
            Used for issue IDs (e.g. TPW-101)
          </p>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Project Icon</label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {availableIcons.map(icon => (
            <button
              key={icon.name}
              type="button"
              onClick={() => updateConfig({ icon: icon.name })}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '40px', height: '40px', borderRadius: '8px',
                border: config.icon === icon.name ? '2px solid #4f46e5' : '1px solid #d1d5db',
                backgroundColor: config.icon === icon.name ? '#e0e7ff' : '#ffffff',
                color: config.icon === icon.name ? '#4f46e5' : '#4b5563',
                cursor: 'pointer'
              }}
            >
              {icon.component}
            </button>
          ))}
          <button
            type="button"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '40px', height: '40px', borderRadius: '8px',
              border: '1px dashed #9ca3af',
              backgroundColor: '#f9fafb',
              color: '#6b7280',
              cursor: 'pointer',
              fontSize: '0.75rem'
            }}
            title="Upload custom icon"
          >
            +
          </button>
        </div>
      </div>

      <div className="section-divider" style={{ margin: '2rem 0 1.5rem', borderTop: '1px solid #e5e7eb' }}></div>
      <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', marginBottom: '1rem' }}>Project Context</h4>

      <div className="form-group">
        <label className="form-label" htmlFor="contextWhat">What are we building?</label>
        <textarea 
          id="contextWhat"
          className="form-textarea" 
          placeholder="Explain the product, application, service, or project being built..." 
          value={config.contextWhat}
          onChange={(e) => updateConfig({ contextWhat: e.target.value })}
          style={{ minHeight: '80px' }}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="contextWhy">Why are we building it?</label>
        <textarea 
          id="contextWhy"
          className="form-textarea" 
          placeholder="Explain the problem, business need, user need, or opportunity behind the project..." 
          value={config.contextWhy}
          onChange={(e) => updateConfig({ contextWhy: e.target.value })}
          style={{ minHeight: '80px' }}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="contextHow">How are we going to build it?</label>
        <textarea 
          id="contextHow"
          className="form-textarea" 
          placeholder="Describe the planned technical, product, design, or execution approach..." 
          value={config.contextHow}
          onChange={(e) => updateConfig({ contextHow: e.target.value })}
          style={{ minHeight: '80px' }}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="goalsInput">Project Goals</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
          {config.goals.map(goal => (
            <span key={goal} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
              padding: '0.25rem 0.5rem', backgroundColor: '#e0e7ff', color: '#4f46e5', borderRadius: '4px', fontSize: '0.8125rem', fontWeight: 500
            }}>
              {goal}
              <button type="button" onClick={() => removeGoal(goal)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#a5b4fc', padding: 0 }}>&times;</button>
            </span>
          ))}
        </div>
        <input 
          type="text" 
          id="goalsInput"
          className="form-input" 
          placeholder="e.g. Launch MVP (Press Enter to add)" 
          value={newGoal}
          onChange={e => setNewGoal(e.target.value)}
          onKeyDown={handleAddGoal}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="expectedOutcome">Expected Outcome</label>
        <textarea 
          id="expectedOutcome"
          className="form-textarea" 
          placeholder="What should success look like when the project is completed?" 
          value={config.expectedOutcome}
          onChange={(e) => updateConfig({ expectedOutcome: e.target.value })}
          style={{ minHeight: '80px' }}
        />
      </div>
    </div>
  );
}
