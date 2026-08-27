import { Link } from 'react-router-dom';

function UpcomingDeadlines() {
  const deadlines = [
    { id: 'TPW-102', title: 'Fix authentication callback', date: 'Aug 28', priority: 'High' },
    { id: 'TPW-108', title: 'Notification system', date: 'Aug 30', priority: 'Medium' },
    { id: 'TPW-115', title: 'Responsive dashboard', date: 'Sep 02', priority: 'Low' }
  ];

  const getPriorityClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'tf-priority-high';
      case 'medium': return 'tf-priority-medium';
      case 'low': return 'tf-priority-low';
      default: return '';
    }
  };

  return (
    <div className="tf-card">
      <div className="tf-card-header">
        <h2 className="tf-card-title">Upcoming Deadlines</h2>
        <Link to="issues" className="tf-card-action">View all</Link>
      </div>

      <div className="tf-item-list">
        {deadlines.map(item => (
          <div key={item.id} className="tf-list-item">
            <div className="tf-deadline-content">
              <div className="tf-deadline-title">{item.title}</div>
              <div className="tf-deadline-meta">
                <span>{item.id}</span>
                <span>•</span>
                <span>Due {item.date}</span>
              </div>
            </div>
            <div className={`tf-priority-badge ${getPriorityClass(item.priority)}`}>
              {item.priority}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingDeadlines;
