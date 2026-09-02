function LoadingState() {
  return (
    <div className="tf-members-table-card">
      {[...Array(5)].map((_, i) => (
        <div className="tf-skeleton-row" key={i}>
          <div className="tf-skeleton" style={{ width: 16, height: 16, borderRadius: 4 }} />
          <div className="tf-skeleton tf-skeleton-circle" />
          <div className="tf-skeleton tf-skeleton-text-md" />
          <div className="tf-skeleton tf-skeleton-text-lg" />
          <div className="tf-skeleton tf-skeleton-badge" />
          <div className="tf-skeleton tf-skeleton-badge" />
          <div className="tf-skeleton" style={{ width: 24, height: 24, borderRadius: 6, marginLeft: 'auto' }} />
        </div>
      ))}
    </div>
  );
}

export default LoadingState;
