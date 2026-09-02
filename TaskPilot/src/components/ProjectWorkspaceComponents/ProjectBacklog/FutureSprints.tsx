import { useState } from 'react';
import { Plus } from 'lucide-react';
import SprintSection from './SprintSection';
import type { Issue } from './ProjectBacklog';

interface FutureSprintsProps {
  issues: Issue[];
}

export default function FutureSprints({ issues }: FutureSprintsProps) {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <>
      <SprintSection
        title="Sprint 5"
        dateRange="Sep 04 – Sep 18"
        issues={issues}
        isActive={false}
        onStartSprint={() => alert('Start sprint clicked')}
      />

      <div style={{ padding: '8px 32px 16px', display: 'flex', justifyContent: 'flex-end' }}>
        {!isCreating ? (
          <button className="tf-btn-secondary" style={{ gap: 6 }} onClick={() => setIsCreating(true)}>
            <Plus size={14} />
            Create Sprint
          </button>
        ) : (
          <div style={{ width: '100%', maxWidth: 560, padding: 20, border: '1px solid #e2e8f0', borderRadius: 8, backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <input type="text" className="tf-search-input" style={{ paddingLeft: 12, flex: 1 }} placeholder="Sprint Name (e.g. Sprint 6)" />
              <input type="date" className="tf-search-input" style={{ paddingLeft: 12, width: 'auto' }} />
              <input type="date" className="tf-search-input" style={{ paddingLeft: 12, width: 'auto' }} />
            </div>
            <input type="text" className="tf-search-input" style={{ paddingLeft: 12 }} placeholder="Sprint Goal (optional)" />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button className="tf-btn-secondary" onClick={() => setIsCreating(false)}>Cancel</button>
              <button className="tf-btn-primary" style={{ padding: '8px 16px' }} onClick={() => setIsCreating(false)}>Create Sprint</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
