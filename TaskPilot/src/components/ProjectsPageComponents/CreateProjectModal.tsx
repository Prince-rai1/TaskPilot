import { X } from 'lucide-react';

interface CreateProjectModalProps {
  onClose: () => void;
}

export default function CreateProjectModal({ onClose }: CreateProjectModalProps) {
  return (
    <div className="tf-modal-overlay">
      <div className="tf-modal-card">
        <div className="tf-modal-header">
          <h2>Create New Project</h2>
          <button className="tf-icon-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>
        
        <div className="tf-modal-body">
          <div className="tf-form-group">
            <label htmlFor="projectName">Project Name</label>
            <input type="text" id="projectName" placeholder="e.g., Marketing Website" />
          </div>
          
          <div className="tf-form-group">
            <label htmlFor="projectKey">Project Key</label>
            <input type="text" id="projectKey" placeholder="e.g., MKT" maxLength={5} style={{ width: '120px' }} />
          </div>
          
          <div className="tf-form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" placeholder="Briefly describe the project..." />
          </div>
          
          <div className="tf-form-row">
            <div className="tf-form-group">
              <label htmlFor="status">Status</label>
              <select id="status" defaultValue="Active">
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            
            <div className="tf-form-group">
              <label htmlFor="team">Team Members</label>
              <select id="team" multiple defaultValue={['member1', 'member2']} style={{ height: '42px' }}>
                <option value="member1">Sarah Connor</option>
                <option value="member2">John Smith</option>
                <option value="member3">Emma Watson</option>
                <option value="member4">Mike Johnson</option>
              </select>
            </div>
          </div>
          
          <div className="tf-form-row">
            <div className="tf-form-group">
              <label htmlFor="startDate">Start Date</label>
              <input type="date" id="startDate" />
            </div>
            <div className="tf-form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input type="date" id="dueDate" />
            </div>
          </div>
        </div>
        
        <div className="tf-modal-footer">
          <button className="tf-btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="tf-btn-primary" onClick={onClose}>
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}
