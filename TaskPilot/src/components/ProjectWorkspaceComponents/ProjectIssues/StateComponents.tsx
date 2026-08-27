import { FileQuestion, SearchX, FilterX, AlertCircle } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="tf-empty-state">
      <FileQuestion className="tf-empty-icon" />
      <h3 className="tf-empty-title">No issues yet</h3>
      <p className="tf-empty-desc">Create your first issue to start tracking project work.</p>
      <button className="tf-btn-primary">+ Create Issue</button>
    </div>
  );
}

export function SearchEmptyState() {
  return (
    <div className="tf-empty-state">
      <SearchX className="tf-empty-icon" />
      <h3 className="tf-empty-title">No issues found</h3>
      <p className="tf-empty-desc">Try a different search term.</p>
    </div>
  );
}

export function FilterEmptyState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <div className="tf-empty-state">
      <FilterX className="tf-empty-icon" />
      <h3 className="tf-empty-title">No issues match your filters</h3>
      <p className="tf-empty-desc">Try changing your filters or clear them.</p>
      <button className="tf-clear-filters" onClick={onClearFilters}>
        Clear filters
      </button>
    </div>
  );
}

export function ErrorState() {
  return (
    <div className="tf-empty-state">
      <AlertCircle className="tf-empty-icon" style={{ color: '#ef4444' }} />
      <h3 className="tf-empty-title">Unable to load issues</h3>
      <p className="tf-empty-desc">Something went wrong while loading this project's issues.</p>
      <button className="tf-btn-secondary">Try again</button>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="tf-issues-content" style={{ padding: 32 }}>
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{
          display: 'flex', gap: 16, marginBottom: 16,
          padding: 16, border: '1px solid #e2e8f0', borderRadius: 8,
          opacity: 1 - i * 0.15
        }}>
          <div style={{ width: 16, height: 16, backgroundColor: '#e2e8f0', borderRadius: 4 }}></div>
          <div style={{ width: 80, height: 16, backgroundColor: '#e2e8f0', borderRadius: 4 }}></div>
          <div style={{ flex: 1, height: 16, backgroundColor: '#f1f5f9', borderRadius: 4 }}></div>
          <div style={{ width: 60, height: 16, backgroundColor: '#e2e8f0', borderRadius: 4 }}></div>
          <div style={{ width: 100, height: 16, backgroundColor: '#e2e8f0', borderRadius: 4 }}></div>
        </div>
      ))}
    </div>
  );
}
