import { Link } from 'react-router-dom';

function ProjectTeam() {
  const members = [
    { initials: 'PR', name: 'Prince Rai', role: 'Project Admin' },
    { initials: 'AC', name: 'Alex Chen', role: 'Developer' },
    { initials: 'SJ', name: 'Sarah Johnson', role: 'Designer' },
    { initials: 'MP', name: 'Mike Peters', role: 'Developer' }
  ];

  return (
    <div className="tf-card">
      <div className="tf-card-header">
        <h2 className="tf-card-title">Project Team</h2>
        <Link to="/timeline" className="tf-card-action">View all</Link>
      </div>

      <div className="tf-item-list">
        {members.map((member, index) => (
          <div key={index} className="tf-team-member">
            <div className="tf-avatar" style={{ margin: 0 }}>
              {member.initials}
            </div>
            <div className="tf-team-member-info">
              <span className="tf-team-member-name">{member.name}</span>
              <span className="tf-team-member-role">{member.role}</span>
            </div>
          </div>
        ))}

        <div className="tf-team-member" style={{ marginTop: 8 }}>
          <span className="tf-card-action" style={{ cursor: 'pointer', fontSize: 14 }}>+4 more members</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectTeam;
