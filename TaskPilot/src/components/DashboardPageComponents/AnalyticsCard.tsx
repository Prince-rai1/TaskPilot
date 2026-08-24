import './Dashboard.css';

function AnalyticsCard() {
  return (
    <div className="tf-card" style={{ height: '100%' }}>
      <div className="tf-card-header">
        <h3 className="tf-card-title">Productivity Analytics</h3>
      </div>
      
      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        Task completion trends over the last 7 days
      </p>
      
      <div className="tf-analytics-placeholder">
        {/* Simple CSS bar chart representation */}
        <div className="tf-bar" style={{ height: '30%' }}></div>
        <div className="tf-bar" style={{ height: '50%' }}></div>
        <div className="tf-bar" style={{ height: '40%' }}></div>
        <div className="tf-bar" style={{ height: '70%' }}></div>
        <div className="tf-bar" style={{ height: '60%' }}></div>
        <div className="tf-bar" style={{ height: '90%' }}></div>
        <div className="tf-bar" style={{ height: '80%' }}></div>
      </div>
      
      <div className="tf-analytics-stats">
        <div className="tf-analytics-stat-item">
          <span>Completed</span>
          <span>48</span>
        </div>
        <div className="tf-analytics-stat-item">
          <span>Created</span>
          <span>32</span>
        </div>
        <div className="tf-analytics-stat-item">
          <span>Completion Rate</span>
          <span style={{ color: 'var(--success)' }}>+15%</span>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCard;
