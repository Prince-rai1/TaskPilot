import React, { useState } from 'react';
import type { WizardStepProps, WorkflowStatus, WorkflowTransition } from '../types';
import { ArrowRight, Settings, Trash2, GripVertical, CheckCircle, PlayCircle } from 'lucide-react';

export default function WorkflowStep({ config, updateConfig }: WizardStepProps) {
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
  const [editingTransitionId, setEditingTransitionId] = useState<string | null>(null);
  
  const [statusForm, setStatusForm] = useState<Partial<WorkflowStatus>>({});
  const [transitionForm, setTransitionForm] = useState<Partial<WorkflowTransition>>({});

  const [isAddingStatus, setIsAddingStatus] = useState(false);
  const [isAddingTransition, setIsAddingTransition] = useState(false);

  const colors = ['slate', 'blue', 'indigo', 'green', 'yellow', 'red'];
  const categories = ['To Do', 'In Progress', 'Done'];

  const getColorHex = (color: string) => {
    switch(color) {
      case 'slate': return '#94a3b8';
      case 'blue': return '#60a5fa';
      case 'indigo': return '#818cf8';
      case 'green': return '#4ade80';
      case 'yellow': return '#facc15';
      case 'red': return '#f87171';
      default: return '#94a3b8';
    }
  };

  const handleSaveStatus = () => {
    if (!statusForm.name) return;

    if (isAddingStatus) {
      const newStatus: WorkflowStatus = {
        id: `status-${Date.now()}`,
        name: statusForm.name,
        color: statusForm.color || 'slate',
        category: (statusForm.category as 'To Do' | 'In Progress' | 'Done') || 'To Do',
        isInitial: !!statusForm.isInitial,
        isCompletion: !!statusForm.isCompletion
      };
      
      let newWorkflow = [...config.workflow];
      if (newStatus.isInitial) {
        newWorkflow = newWorkflow.map(s => ({ ...s, isInitial: false }));
      }
      
      updateConfig({ workflow: [...newWorkflow, newStatus] });
    } else if (editingStatusId) {
      let newWorkflow = config.workflow.map(s => {
        if (s.id === editingStatusId) {
          return { ...s, ...statusForm } as WorkflowStatus;
        }
        return s;
      });

      if (statusForm.isInitial) {
        newWorkflow = newWorkflow.map(s => 
          s.id === editingStatusId ? s : { ...s, isInitial: false }
        );
      }

      updateConfig({ workflow: newWorkflow });
    }

    setIsAddingStatus(false);
    setEditingStatusId(null);
    setStatusForm({});
  };

  const handleDeleteStatus = (id: string) => {
    updateConfig({
      workflow: config.workflow.filter(s => s.id !== id),
      transitions: config.transitions.filter(t => t.fromId !== id && t.toId !== id)
    });
  };

  const handleSaveTransition = () => {
    if (!transitionForm.fromId || !transitionForm.toId) return;

    if (isAddingTransition) {
      const newTransition: WorkflowTransition = {
        id: `trans-${Date.now()}`,
        fromId: transitionForm.fromId,
        toId: transitionForm.toId,
        name: transitionForm.name || 'Transition'
      };
      updateConfig({ transitions: [...config.transitions, newTransition] });
    } else if (editingTransitionId) {
      updateConfig({
        transitions: config.transitions.map(t => 
          t.id === editingTransitionId ? { ...t, ...transitionForm } as WorkflowTransition : t
        )
      });
    }

    setIsAddingTransition(false);
    setEditingTransitionId(null);
    setTransitionForm({});
  };

  const handleDeleteTransition = (id: string) => {
    updateConfig({ transitions: config.transitions.filter(t => t.id !== id) });
  };

  return (
    <div className="step-container">
      <h3 className="step-title">Configure your workflow</h3>
      <p className="step-subtitle">Visually define the lifecycle of issues in your project.</p>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', alignItems: 'flex-start' }}>
        
        {/* LEFT COLUMN: STATUSES */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: 0 }}>Statuses</h4>
            <button 
              className="btn btn-ghost" 
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', height: 'auto' }}
              onClick={() => { setIsAddingStatus(true); setStatusForm({ color: 'slate', category: 'To Do' }); }}
            >
              + Add Status
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {config.workflow.map(status => (
              <div key={status.id} style={{ 
                border: '1px solid #e5e7eb', borderRadius: '8px', padding: '0.75rem', 
                backgroundColor: 'white', display: 'flex', alignItems: 'center', gap: '0.75rem',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}>
                <GripVertical size={16} color="#d1d5db" style={{ cursor: 'grab' }} />
                
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: getColorHex(status.color) }}></div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {status.name}
                    {status.isInitial && <span title="Initial Status" style={{ display: 'flex', alignItems: 'center' }}><PlayCircle size={14} color="#6366f1" /></span>}
                    {status.isCompletion && <span title="Completion Status" style={{ display: 'flex', alignItems: 'center' }}><CheckCircle size={14} color="#10b981" /></span>}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{status.category}</div>
                </div>

                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button 
                    className="btn btn-ghost" 
                    style={{ padding: '0.25rem', color: '#6b7280' }}
                    onClick={() => {
                      setEditingStatusId(status.id);
                      setStatusForm(status);
                    }}
                  >
                    <Settings size={16} />
                  </button>
                  <button 
                    className="btn btn-ghost" 
                    style={{ padding: '0.25rem', color: '#ef4444' }}
                    onClick={() => handleDeleteStatus(status.id)}
                    disabled={config.workflow.length <= 1}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: TRANSITIONS */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: 0 }}>Transitions</h4>
            <button 
              className="btn btn-ghost" 
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', height: 'auto' }}
              onClick={() => { setIsAddingTransition(true); setTransitionForm({}); }}
            >
              + Add Transition
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {config.transitions.length === 0 ? (
              <div style={{ fontSize: '0.875rem', color: '#6b7280', padding: '1rem', textAlign: 'center', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px dashed #d1d5db' }}>
                No transitions defined. Issues will not be able to move between statuses.
              </div>
            ) : (
              config.transitions.map(trans => {
                const fromStatus = config.workflow.find(s => s.id === trans.fromId);
                const toStatus = config.workflow.find(s => s.id === trans.toId);
                
                if (!fromStatus || !toStatus) return null;

                return (
                  <div key={trans.id} style={{ 
                    border: '1px solid #e5e7eb', borderRadius: '8px', padding: '0.75rem', 
                    backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', gap: '0.5rem'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.25rem' }}>{trans.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#111827' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getColorHex(fromStatus.color) }}></span>
                          {fromStatus.name}
                        </span>
                        <ArrowRight size={14} color="#9ca3af" />
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#111827' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getColorHex(toStatus.color) }}></span>
                          {toStatus.name}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <button 
                        className="btn btn-ghost" 
                        style={{ padding: '0.25rem', color: '#6b7280' }}
                        onClick={() => {
                          setEditingTransitionId(trans.id);
                          setTransitionForm(trans);
                        }}
                      >
                        <Settings size={16} />
                      </button>
                      <button 
                        className="btn btn-ghost" 
                        style={{ padding: '0.25rem', color: '#ef4444' }}
                        onClick={() => handleDeleteTransition(trans.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* MODALS */}
      {(isAddingStatus || editingStatusId) && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', width: '400px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem' }}>{isAddingStatus ? 'Add Status' : 'Edit Status'}</h4>
            
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" className="form-input" value={statusForm.name || ''} onChange={e => setStatusForm({...statusForm, name: e.target.value})} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={statusForm.category || 'To Do'} onChange={e => setStatusForm({...statusForm, category: e.target.value as 'To Do' | 'In Progress' | 'Done'})}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Color</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {colors.map(c => (
                  <div 
                    key={c}
                    onClick={() => setStatusForm({...statusForm, color: c})}
                    style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: getColorHex(c), cursor: 'pointer', border: statusForm.color === c ? '2px solid #111827' : 'none', outline: statusForm.color === c ? '2px solid white' : 'none', outlineOffset: '-4px' }}
                  />
                ))}
              </div>
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                <input type="checkbox" checked={!!statusForm.isInitial} onChange={e => setStatusForm({...statusForm, isInitial: e.target.checked})} />
                Initial Status
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                <input type="checkbox" checked={!!statusForm.isCompletion} onChange={e => setStatusForm({...statusForm, isCompletion: e.target.checked})} />
                Completion Status
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
              <button className="btn btn-ghost" onClick={() => { setIsAddingStatus(false); setEditingStatusId(null); }}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSaveStatus}>Save Status</button>
            </div>
          </div>
        </div>
      )}

      {(isAddingTransition || editingTransitionId) && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', width: '400px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem' }}>{isAddingTransition ? 'Add Transition' : 'Edit Transition'}</h4>
            
            <div className="form-group">
              <label className="form-label">Transition Name</label>
              <input type="text" className="form-input" placeholder="e.g. Start Progress" value={transitionForm.name || ''} onChange={e => setTransitionForm({...transitionForm, name: e.target.value})} />
            </div>
            
            <div className="form-group">
              <label className="form-label">From Status</label>
              <select className="form-select" value={transitionForm.fromId || ''} onChange={e => setTransitionForm({...transitionForm, fromId: e.target.value})}>
                <option value="" disabled>Select status</option>
                {config.workflow.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">To Status</label>
              <select className="form-select" value={transitionForm.toId || ''} onChange={e => setTransitionForm({...transitionForm, toId: e.target.value})}>
                <option value="" disabled>Select status</option>
                {config.workflow.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
              <button className="btn btn-ghost" onClick={() => { setIsAddingTransition(false); setEditingTransitionId(null); }}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSaveTransition}>Save Transition</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
