export default function Pagination() {
  return (
    <div className="tf-pagination">
      <span style={{ fontSize: 14, color: '#464555' }}>Showing 1–25 of 86 tasks</span>
      <div style={{ display: 'flex', gap: 4 }}>
        <button className="tf-btn-secondary" style={{ padding: '4px 8px' }}>Previous</button>
        <button className="tf-btn-primary" style={{ padding: '4px 12px' }}>1</button>
        <button className="tf-btn-secondary" style={{ padding: '4px 12px' }}>2</button>
        <button className="tf-btn-secondary" style={{ padding: '4px 12px' }}>3</button>
        <button className="tf-btn-secondary" style={{ padding: '4px 8px' }}>Next</button>
      </div>
    </div>
  );
}
