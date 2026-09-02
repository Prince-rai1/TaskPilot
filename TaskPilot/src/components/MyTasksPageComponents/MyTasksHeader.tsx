export default function MyTasksHeader() {
  return (
    <div className="tf-my-tasks-header">
      <div className="tf-my-tasks-title-group">
        <h1>My Tasks <span>12 open tasks</span></h1>
        <p>Manage all work assigned to you across your projects.</p>
      </div>
      <button className="tf-btn-primary">+ Create Issue</button>
    </div>
  );
}
