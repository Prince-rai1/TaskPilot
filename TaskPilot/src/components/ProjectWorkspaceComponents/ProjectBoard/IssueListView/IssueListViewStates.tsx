import React from 'react';

export function IssueListEmptyState() {
  return (
    <div style={{ padding: '64px 32px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 16 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>No issues yet</h3>
      <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>Create your first issue to start tracking work.</p>
      <button className="tf-btn-primary">+ Create Issue</button>
    </div>
  );
}

export function IssueListFilteredEmptyState() {
  return (
    <div style={{ padding: '64px 32px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 16 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>No issues match your filters</h3>
      <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>Try changing or clearing the filters.</p>
      <button className="tf-toolbar-btn" style={{ margin: '0 auto' }}>Clear filters</button>
    </div>
  );
}

export function IssueListErrorState() {
  return (
    <div style={{ padding: '64px 32px', textAlign: 'center', backgroundColor: '#fef2f2', borderRadius: 8, border: '1px solid #fecaca', marginTop: 16 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: '#b91c1c', marginBottom: 8 }}>Unable to load issues</h3>
      <p style={{ fontSize: 14, color: '#ef4444', marginBottom: 24 }}>Something went wrong while loading the issues.</p>
      <button className="tf-toolbar-btn" style={{ margin: '0 auto', borderColor: '#fca5a5', color: '#b91c1c' }}>Try again</button>
    </div>
  );
}
