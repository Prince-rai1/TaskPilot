import React, { useState } from 'react';
import type { WizardStepProps } from '../types';
import { Settings, Trash2, Plus } from 'lucide-react';

export default function IssueConfigStep({ config, updateConfig }: WizardStepProps) {
  const [newComponent, setNewComponent] = useState('');
  const [newLabel, setNewLabel] = useState('');

  const [editingComponent, setEditingComponent] = useState<{ old: string, new: string } | null>(null);

  const availableIssueTypes = ['Task', 'Story', 'Bug', 'Epic', 'Subtask', 'Improvement', 'Change Request'];
  const availablePriorities = ['Highest', 'High', 'Medium', 'Low', 'Lowest'];

  const toggleIssueType = (type: string) => {
    const types = config.issueTypes.includes(type)
      ? config.issueTypes.filter(t => t !== type)
      : [...config.issueTypes, type];
    updateConfig({ issueTypes: types });
  };

  const togglePriority = (p: string) => {
    updateConfig({ priorities: [p] });
  };

  const handleAddComponent = () => {
    if (newComponent.trim() && !config.components.includes(newComponent.trim())) {
      updateConfig({ components: [...config.components, newComponent.trim()] });
      setNewComponent('');
    }
  };

  const handleRenameComponent = () => {
    if (editingComponent && editingComponent.new.trim()) {
      const newComponents = config.components.map(c =>
        c === editingComponent.old ? editingComponent.new.trim() : c
      );
      updateConfig({ components: newComponents });
      setEditingComponent(null);
    }
  };

  const handleAddLabel = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newLabel.trim()) {
      e.preventDefault();
      if (!config.defaultLabels.includes(newLabel.trim())) {
        updateConfig({ defaultLabels: [...config.defaultLabels, newLabel.trim()] });
      }
      setNewLabel('');
    }
  };

  const removeComponent = (comp: string) => {
    updateConfig({ components: config.components.filter(c => c !== comp) });
  };

  const removeLabel = (label: string) => {
    updateConfig({ defaultLabels: config.defaultLabels.filter(l => l !== label) });
  };

  return (
    <div className="step-container">
      <h3 className="step-title">Configure issue structure</h3>
      <p className="step-subtitle">Select the issue types, priorities, and classifications for your project.</p>

      <div className="form-group">
        <label className="form-label">Issue Types</label>
        <div className="checkbox-grid">
          {availableIssueTypes.map(type => (
            <label key={type} className="checkbox-item" style={{ cursor: 'pointer' }}>
              <input
                type="checkbox"
                className="checkbox-input"
                checked={config.issueTypes.includes(type)}
                onChange={() => toggleIssueType(type)}
              />
              <span className="checkbox-label-text">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="section-divider" style={{ margin: '1.5rem 0', borderTop: '1px solid #e5e7eb' }}></div>

      <div className="form-group">
        <label className="form-label">Priorities</label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {availablePriorities.map(p => (
            <div key={p} style={{
              padding: '0.35rem 1rem',
              backgroundColor: config.priorities.includes(p) ? '#e0e7ff' : '#f3f4f6',
              color: config.priorities.includes(p) ? '#4f46e5' : '#4b5563',
              borderRadius: '9999px',
              fontSize: '0.8125rem',
              fontWeight: 500,
              cursor: 'pointer',
              border: config.priorities.includes(p) ? '1px solid #a5b4fc' : '1px solid transparent'
            }}
              onClick={() => togglePriority(p)}
            >
              {p}
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider" style={{ margin: '1.5rem 0', borderTop: '1px solid #e5e7eb' }}></div>

      <div className="form-group">
        <label className="form-label">Components (Optional)</label>
        <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.75rem' }}>
          Break your project into specific areas (e.g. Frontend, Backend).
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
          {config.components.map(comp => (
            <div key={comp} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.5rem 0.75rem', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb'
            }}>
              {editingComponent?.old === comp ? (
                <div style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
                  <input
                    type="text"
                    className="form-input"
                    style={{ marginBottom: 0, padding: '0.25rem 0.5rem', minHeight: 'auto' }}
                    value={editingComponent.new}
                    onChange={e => setEditingComponent({ ...editingComponent, new: e.target.value })}
                    autoFocus
                  />
                  <button className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', minHeight: 'auto' }} onClick={handleRenameComponent}>Save</button>
                  <button className="btn btn-ghost" style={{ padding: '0.25rem 0.75rem', minHeight: 'auto' }} onClick={() => setEditingComponent(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>{comp}</span>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <button className="btn btn-ghost" style={{ padding: '0.25rem' }} onClick={() => setEditingComponent({ old: comp, new: comp })}>
                      <Settings size={14} />
                    </button>
                    <button className="btn btn-ghost" style={{ padding: '0.25rem', color: '#ef4444' }} onClick={() => removeComponent(comp)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Add new component..."
            value={newComponent}
            onChange={e => setNewComponent(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddComponent(); } }}
            style={{ marginBottom: 0 }}
          />
          <button className="btn btn-secondary" onClick={handleAddComponent}>
            <Plus size={16} /> Add
          </button>
        </div>
      </div>

      <div className="section-divider" style={{ margin: '1.5rem 0', borderTop: '1px solid #e5e7eb' }}></div>

      <div className="form-group">
        <label className="form-label" htmlFor="labelsInput">Default Labels (Optional)</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
          {config.defaultLabels.map(label => (
            <span key={label} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
              padding: '0.25rem 0.5rem', backgroundColor: '#e0e7ff', color: '#4f46e5', borderRadius: '4px', fontSize: '0.8125rem', fontWeight: 500
            }}>
              {label}
              <button onClick={() => removeLabel(label)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#a5b4fc', padding: 0 }}>&times;</button>
            </span>
          ))}
        </div>
        <input
          type="text"
          id="labelsInput"
          className="form-input"
          placeholder="e.g. urgent, technical-debt (Press Enter to add)"
          value={newLabel}
          onChange={e => setNewLabel(e.target.value)}
          onKeyDown={handleAddLabel}
        />
      </div>
    </div>
  );
}
