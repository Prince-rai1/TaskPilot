import React, { useState } from 'react';
import type { WizardStepProps } from '../types';
import { Search, Check } from 'lucide-react';

const mockUsers = [
  { id: 'u1', name: 'Prince Rai', role: 'Product Designer', avatar: 'PR' },
  { id: 'u2', name: 'Alex Chen', role: 'Developer', avatar: 'AC' },
  { id: 'u3', name: 'Sarah Johnson', role: 'Designer', avatar: 'SJ' },
  { id: 'u4', name: 'Mike Peters', role: 'Developer', avatar: 'MP' },
  { id: 'u5', name: 'Emma Watson', role: 'Project Manager', avatar: 'EW' }
];

const availableRoles = ['Project Admin', 'Project Manager', 'Developer', 'Designer', 'Viewer'];

export default function TeamAccessStep({ config, updateConfig }: WizardStepProps) {
  const [memberSearch, setMemberSearch] = useState('');
  const [leadSearch, setLeadSearch] = useState('');
  const [showLeadDropdown, setShowLeadDropdown] = useState(false);

  const filteredMembers = mockUsers.filter(u => 
    u.name.toLowerCase().includes(memberSearch.toLowerCase()) || 
    u.role.toLowerCase().includes(memberSearch.toLowerCase())
  );

  const filteredLeads = mockUsers.filter(u => 
    u.name.toLowerCase().includes(leadSearch.toLowerCase())
  );

  const toggleMember = (userId: string) => {
    let newMembers = [...config.teamMemberIds];
    const newRoles = { ...config.memberRoles };

    if (newMembers.includes(userId)) {
      newMembers = newMembers.filter(id => id !== userId);
      delete newRoles[userId];
    } else {
      newMembers.push(userId);
      newRoles[userId] = config.defaultRole; // Assign default role
    }
    
    updateConfig({ teamMemberIds: newMembers, memberRoles: newRoles });
  };

  const updateMemberRole = (userId: string, role: string) => {
    updateConfig({
      memberRoles: {
        ...config.memberRoles,
        [userId]: role
      }
    });
  };

  const selectedLead = mockUsers.find(u => u.id === config.projectLeadId);

  return (
    <div className="step-container">
      <h3 className="step-title">Set up your team</h3>
      <p className="step-subtitle">Configure who has access to this project and their roles.</p>

      {/* PROJECT LEAD */}
      <div className="form-group">
        <label className="form-label">Project Lead</label>
        <div style={{ position: 'relative' }}>
          {selectedLead && !showLeadDropdown ? (
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer' }}
              onClick={() => setShowLeadDropdown(true)}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 600 }}>
                {selectedLead.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#111827' }}>{selectedLead.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{selectedLead.role}</div>
              </div>
            </div>
          ) : (
            <div style={{ position: 'relative' }}>
              <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input 
                type="text" 
                className="form-input" 
                placeholder="Search and select project lead..." 
                value={leadSearch}
                onChange={e => setLeadSearch(e.target.value)}
                onFocus={() => setShowLeadDropdown(true)}
                style={{ paddingLeft: '36px' }}
                autoFocus={showLeadDropdown}
              />
              {showLeadDropdown && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', marginTop: '4px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', zIndex: 10, maxHeight: '200px', overflowY: 'auto' }}>
                  {filteredLeads.map(u => (
                    <div 
                      key={u.id}
                      style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', borderBottom: '1px solid #f3f4f6' }}
                      onClick={() => {
                        updateConfig({ projectLeadId: u.id });
                        setShowLeadDropdown(false);
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600 }}>{u.avatar}</div>
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#111827' }}>{u.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{u.role}</div>
                      </div>
                    </div>
                  ))}
                  {filteredLeads.length === 0 && <div style={{ padding: '1rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>No members found</div>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="section-divider" style={{ margin: '2rem 0', borderTop: '1px solid #e5e7eb' }}></div>

      {/* TEAM MEMBERS */}
      <div className="form-group">
        <label className="form-label">Add Team Members</label>
        
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Search size={16} color="#9ca3af" />
            <input 
              type="text" 
              placeholder="Search members..." 
              value={memberSearch}
              onChange={e => setMemberSearch(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.875rem', width: '100%' }}
            />
          </div>
          
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {filteredMembers.map(u => {
              const isSelected = config.teamMemberIds.includes(u.id);
              return (
                <label 
                  key={u.id}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', 
                    borderBottom: '1px solid #f3f4f6', cursor: 'pointer',
                    backgroundColor: isSelected ? '#f5f7ff' : 'transparent'
                  }}
                >
                  <div style={{ 
                    width: '18px', height: '18px', border: isSelected ? 'none' : '1px solid #d1d5db', 
                    backgroundColor: isSelected ? '#4f46e5' : 'white', borderRadius: '4px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {isSelected && <Check size={14} color="white" strokeWidth={3} />}
                  </div>
                  
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 600 }}>
                    {u.avatar}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#111827' }}>{u.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{u.role}</div>
                  </div>
                  
                  <input 
                    type="checkbox" 
                    checked={isSelected}
                    onChange={() => toggleMember(u.id)}
                    style={{ display: 'none' }}
                  />
                </label>
              );
            })}
          </div>
          <div style={{ padding: '0.75rem 1rem', backgroundColor: '#f9fafb', fontSize: '0.75rem', color: '#6b7280', borderTop: '1px solid #e5e7eb' }}>
            Selected members: {config.teamMemberIds.length}
          </div>
        </div>
      </div>

      {/* MEMBER ROLES TABLE */}
      {config.teamMemberIds.length > 0 && (
        <div className="form-group" style={{ marginTop: '1.5rem' }}>
          <label className="form-label">Project Roles</label>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            {config.teamMemberIds.map((userId, idx) => {
              const user = mockUsers.find(u => u.id === userId);
              if (!user) return null;
              return (
                <div key={userId} style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                  padding: '0.75rem 1rem', borderBottom: idx < config.teamMemberIds.length - 1 ? '1px solid #f3f4f6' : 'none'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 600 }}>
                      {user.avatar}
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>{user.name}</span>
                  </div>
                  
                  <select 
                    className="form-select"
                    style={{ width: 'auto', padding: '0.25rem 2rem 0.25rem 0.75rem', fontSize: '0.8125rem', margin: 0, minHeight: '32px' }}
                    value={config.memberRoles[userId] || config.defaultRole}
                    onChange={(e) => updateMemberRole(userId, e.target.value)}
                  >
                    {availableRoles.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="section-divider" style={{ margin: '2rem 0', borderTop: '1px solid #e5e7eb' }}></div>

      {/* ACCESS LEVEL */}
      <div className="form-group">
        <label className="form-label">Project Access</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginTop: '0.5rem' }}>
          {['Private', 'Team', 'Organization'].map(level => {
            const isSelected = config.accessLevel === level;
            const description = level === 'Private' ? 'Only invited members can access the project.' :
                               level === 'Team' ? 'Everyone in the workspace team can access it.' :
                               'Everyone in the organization can access it.';
            return (
              <label key={level} style={{ 
                display: 'flex', alignItems: 'flex-start', gap: '1rem', cursor: 'pointer',
                padding: '1rem', border: isSelected ? '2px solid #4f46e5' : '1px solid #d1d5db',
                borderRadius: '8px', backgroundColor: isSelected ? '#f5f7ff' : 'white'
              }}>
                <div style={{ 
                  width: '18px', height: '18px', borderRadius: '50%', border: isSelected ? '5px solid #4f46e5' : '1px solid #9ca3af',
                  marginTop: '2px'
                }}></div>
                <div>
                  <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>{level}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>{description}</div>
                </div>
                <input 
                  type="radio" 
                  name="accessLevel" 
                  value={level}
                  checked={isSelected}
                  onChange={() => updateConfig({ accessLevel: level as 'Private' | 'Team' | 'Organization' })}
                  style={{ display: 'none' }}
                />
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
