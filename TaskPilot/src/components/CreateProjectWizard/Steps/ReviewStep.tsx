import React from 'react';
import type { WizardStepProps } from '../types';
import { ArrowRight } from 'lucide-react';

interface ReviewStepProps extends WizardStepProps {
  onEditStep: (step: number) => void;
}

export default function ReviewStep({ config, onEditStep }: ReviewStepProps) {
  
  const mockUsers = [
    { id: 'u1', name: 'Prince Rai', role: 'Product Designer', avatar: 'PR' },
    { id: 'u2', name: 'Alex Chen', role: 'Developer', avatar: 'AC' },
    { id: 'u3', name: 'Sarah Johnson', role: 'Designer', avatar: 'SJ' },
    { id: 'u4', name: 'Mike Peters', role: 'Developer', avatar: 'MP' },
    { id: 'u5', name: 'Emma Watson', role: 'Project Manager', avatar: 'EW' }
  ];

  const lead = mockUsers.find(u => u.id === config.projectLeadId);

  return (
    <div className="step-container" style={{ overflowY: 'auto' }}>
      <h3 className="step-title">Review your project</h3>
      <p className="step-subtitle">Ensure everything is correct before creating the project.</p>

      {/* PROJECT */}
      <div className="summary-section">
        <div className="summary-header">
          <div className="summary-title">Project</div>
          <button className="summary-edit" onClick={() => onEditStep(1)}>Edit</button>
        </div>
        <div className="summary-grid">
          <div>
            <div className="summary-item-label">Project Name</div>
            <div className="summary-item-value">{config.name || 'Untitled Project'}</div>
          </div>
          <div>
            <div className="summary-item-label">Project Key</div>
            <div className="summary-item-value">{config.key || '-'}</div>
          </div>
          <div>
            <div className="summary-item-label">Icon</div>
            <div className="summary-item-value">{config.icon || '-'}</div>
          </div>
          <div>
            <div className="summary-item-label">Type</div>
            <div className="summary-item-value">{config.projectType}</div>
          </div>
        </div>
      </div>

      {/* PROJECT CONTEXT */}
      <div className="summary-section">
        <div className="summary-header">
          <div className="summary-title">Project Context</div>
          <button className="summary-edit" onClick={() => onEditStep(1)}>Edit</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
          <div>
            <div className="summary-item-label">What are we building?</div>
            <div className="summary-item-value" style={{ whiteSpace: 'pre-wrap' }}>{config.contextWhat || '-'}</div>
          </div>
          <div>
            <div className="summary-item-label">Why are we building it?</div>
            <div className="summary-item-value" style={{ whiteSpace: 'pre-wrap' }}>{config.contextWhy || '-'}</div>
          </div>
          <div>
            <div className="summary-item-label">How are we going to build it?</div>
            <div className="summary-item-value" style={{ whiteSpace: 'pre-wrap' }}>{config.contextHow || '-'}</div>
          </div>
          <div>
            <div className="summary-item-label">Goals</div>
            <div className="summary-item-value">
              {config.goals.length > 0 ? (
                <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                  {config.goals.map((g, i) => <li key={i}>{g}</li>)}
                </ul>
              ) : '-'}
            </div>
          </div>
          <div>
            <div className="summary-item-label">Expected Outcome</div>
            <div className="summary-item-value" style={{ whiteSpace: 'pre-wrap' }}>{config.expectedOutcome || '-'}</div>
          </div>
        </div>
      </div>

      {/* TEAM & ACCESS */}
      <div className="summary-section">
        <div className="summary-header">
          <div className="summary-title">Team & Access</div>
          <button className="summary-edit" onClick={() => onEditStep(3)}>Edit</button>
        </div>
        <div className="summary-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <div className="summary-item-label">Project Lead</div>
            <div className="summary-item-value">{lead ? lead.name : 'Unassigned'}</div>
          </div>
          <div>
            <div className="summary-item-label">Access Level</div>
            <div className="summary-item-value">{config.accessLevel}</div>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <div className="summary-item-label">Team Members & Roles ({config.teamMemberIds.length})</div>
            {config.teamMemberIds.length > 0 ? (
              <div style={{ marginTop: '0.5rem', display: 'grid', gap: '0.25rem' }}>
                {config.teamMemberIds.map(id => {
                  const user = mockUsers.find(u => u.id === id);
                  const role = config.memberRoles[id] || 'Developer';
                  return (
                    <div key={id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <span style={{ color: '#111827' }}>{user?.name || id}</span>
                      <span style={{ color: '#6b7280' }}>{role}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="summary-item-value">None</div>
            )}
          </div>
        </div>
      </div>

      {/* WORKFLOW */}
      <div className="summary-section">
        <div className="summary-header">
          <div className="summary-title">Workflow</div>
          <button className="summary-edit" onClick={() => onEditStep(4)}>Edit</button>
        </div>
        
        <div className="summary-item-label" style={{ marginBottom: '0.5rem' }}>Statuses</div>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', color: '#4b5563', fontSize: '0.875rem', marginBottom: '1rem' }}>
          {config.workflow.map((status, index) => (
            <React.Fragment key={status.id}>
              <span style={{ fontWeight: 500, color: '#111827', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: status.color === 'slate' ? '#94a3b8' : status.color === 'blue' ? '#60a5fa' : status.color === 'green' ? '#4ade80' : '#4f46e5' }} />
                {status.name}
              </span>
              {index < config.workflow.length - 1 && <ArrowRight size={14} color="#9ca3af" />}
            </React.Fragment>
          ))}
        </div>

        <div className="summary-item-label" style={{ marginBottom: '0.5rem' }}>Transitions</div>
        {config.transitions.length > 0 ? (
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: '#374151' }}>
            {config.transitions.map(t => {
              const from = config.workflow.find(s => s.id === t.fromId);
              const to = config.workflow.find(s => s.id === t.toId);
              return (
                <li key={t.id} style={{ marginBottom: '0.25rem' }}>
                  <strong>{t.name}</strong> ({from?.name} → {to?.name})
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="summary-item-value">No transitions defined</div>
        )}
      </div>

      {/* ISSUE CONFIGURATION */}
      <div className="summary-section">
        <div className="summary-header">
          <div className="summary-title">Issue Configuration</div>
          <button className="summary-edit" onClick={() => onEditStep(5)}>Edit</button>
        </div>
        <div className="summary-grid">
          <div>
            <div className="summary-item-label">Issue Types</div>
            <div className="summary-item-value">
              {config.issueTypes.length > 0 ? config.issueTypes.join(', ') : 'None selected'}
            </div>
          </div>
          <div>
            <div className="summary-item-label">Priorities</div>
            <div className="summary-item-value">
              {config.priorities.length > 0 ? config.priorities.join(', ') : 'None selected'}
            </div>
          </div>
          <div>
            <div className="summary-item-label">Components</div>
            <div className="summary-item-value">
              {config.components.length > 0 ? config.components.join(', ') : 'None'}
            </div>
          </div>
          <div>
            <div className="summary-item-label">Default Labels</div>
            <div className="summary-item-value">
              {config.defaultLabels.length > 0 ? config.defaultLabels.join(', ') : 'None'}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
