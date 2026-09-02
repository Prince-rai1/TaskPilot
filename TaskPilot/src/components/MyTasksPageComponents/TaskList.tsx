import BulkActionBar from './BulkActionBar';

interface Props {
  selectedTasks: string[];
  onSelectionChange: (selected: string[]) => void;
}

const mockTasks = [
  {
    id: 'TPW-124', title: 'Fix authentication callback', project: 'TaskPilot Web App',
    status: 'In Progress', statusClass: 'tf-status-in-progress',
    priority: 'HIGH', priorityClass: 'tf-priority-high',
    sprint: 'Sprint 4', points: 5, due: 'Today', updated: '10 min ago'
  },
  {
    id: 'MOB-042', title: 'Fix mobile navigation', project: 'Mobile App',
    status: 'In Review', statusClass: 'tf-status-review',
    priority: 'MEDIUM', priorityClass: 'tf-priority-medium',
    sprint: 'Sprint 3', points: 3, due: 'Aug 30', updated: 'Yesterday'
  },
  {
    id: 'TPW-138', title: 'Refactor data layer', project: 'TaskPilot Web App',
    status: 'To Do', statusClass: '',
    priority: 'LOWEST', priorityClass: 'tf-priority-low',
    sprint: 'Sprint 4', points: 8, due: 'Sep 05', updated: '2 days ago'
  }
];

export default function TaskList({ selectedTasks, onSelectionChange }: Props) {
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onSelectionChange(mockTasks.map(t => t.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelect = (id: string) => {
    if (selectedTasks.includes(id)) {
      onSelectionChange(selectedTasks.filter(t => t !== id));
    } else {
      onSelectionChange([...selectedTasks, id]);
    }
  };

  return (
    <>
      <BulkActionBar count={selectedTasks.length} onClear={() => onSelectionChange([])} />
      <div className="tf-task-list-wrapper">
        <table className="tf-task-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}><input type="checkbox" onChange={handleSelectAll} checked={selectedTasks.length === mockTasks.length && mockTasks.length > 0} /></th>
              <th>Issue</th>
              <th>Project</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Sprint</th>
              <th>Pts</th>
              <th>Due Date</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {mockTasks.map(task => (
              <tr key={task.id} className="tf-task-row">
                <td>
                  <input 
                    type="checkbox" 
                    checked={selectedTasks.includes(task.id)} 
                    onChange={() => handleSelect(task.id)} 
                  />
                </td>
                <td>
                  <div className="tf-task-issue">
                    <span className="tf-task-key">{task.id}</span>
                    <span className="tf-task-title">{task.title}</span>
                  </div>
                </td>
                <td>{task.project}</td>
                <td><span className={`tf-status-badge ${task.statusClass}`}>{task.status}</span></td>
                <td><span className={`tf-priority ${task.priorityClass}`}>{task.priority}</span></td>
                <td>{task.sprint}</td>
                <td><span className="tf-story-points">{task.points}</span></td>
                <td>{task.due}</td>
                <td style={{ color: '#777587' }}>{task.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
