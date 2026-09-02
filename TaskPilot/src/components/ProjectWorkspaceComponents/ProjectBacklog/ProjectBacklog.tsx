import { useState } from 'react';
import BacklogHeader from './BacklogHeader';
import BacklogToolbar from './BacklogToolbar';
import ActiveSprint from './ActiveSprint';
import FutureSprints from './FutureSprints';
import FutureBacklog from './FutureBacklog';
import { EmptyBacklogState } from './StateComponents';
import '../ProjectIssues/ProjectIssues.css';
import './ProjectBacklog.css';

export interface Issue {
  id: string;
  key: string;
  title: string;
  type: 'bug' | 'story' | 'task' | 'epic' | 'subtask' | 'improvement';
  statusId: 'todo' | 'in-progress' | 'code-review' | 'testing' | 'done';
  priority: 'highest' | 'high' | 'medium' | 'low' | 'lowest';
  assigneeName?: string;
  assigneeAvatar?: string;
  points?: number;
}

const activeSprintIssues: Issue[] = [
  { id: '1', key: 'TPW-124', title: 'Fix race condition in payment gateway callback', type: 'bug', priority: 'high', statusId: 'done', assigneeAvatar: 'JD', assigneeName: 'John Doe', points: 5 },
  { id: '2', key: 'TPW-125', title: 'Create login page with OAuth flow', type: 'task', priority: 'medium', statusId: 'done', assigneeAvatar: 'AS', assigneeName: 'Alice Smith', points: 3 },
  { id: '3', key: 'TPW-127', title: 'Implement new empty state for cart page', type: 'task', priority: 'medium', statusId: 'in-progress', assigneeAvatar: 'PR', assigneeName: 'Paul Rudd', points: 3 },
  { id: '10', key: 'TPW-126', title: 'Add notification system with WebSocket support', type: 'story', priority: 'high', statusId: 'todo', assigneeAvatar: 'MK', assigneeName: 'Maya Kim', points: 5 },
];

const futureSprintIssues: Issue[] = [
  { id: '4', key: 'TPW-142', title: 'As a user, I want to save my payment method for faster checkout', type: 'story', priority: 'high', statusId: 'todo', points: 8 },
  { id: '5', key: 'TPW-143', title: 'Implement address auto-complete with Google Maps API', type: 'task', priority: 'medium', statusId: 'todo', assigneeAvatar: 'AS', assigneeName: 'Alice Smith', points: 5 },
  { id: '11', key: 'TPW-144', title: 'Performance audit on product listing page', type: 'improvement', priority: 'highest', statusId: 'todo', points: 13 },
];

const backlogIssues: Issue[] = [
  { id: '6', key: 'TPW-150', title: 'Update third-party analytics scripts to latest versions', type: 'task', priority: 'low', statusId: 'todo', points: 3 },
  { id: '7', key: 'TPW-151', title: 'Dark mode support for entire application', type: 'story', priority: 'high', statusId: 'todo', points: 13 },
  { id: '8', key: 'TPW-152', title: 'Export reports to CSV and PDF formats', type: 'task', priority: 'medium', statusId: 'todo', points: 5 },
  { id: '9', key: 'TPW-153', title: 'User analytics tracking dashboard', type: 'epic', priority: 'highest', statusId: 'todo', points: 21 },
  { id: '12', key: 'TPW-154', title: 'Implement multi-language support (i18n)', type: 'story', priority: 'medium', statusId: 'todo', points: 8 },
  { id: '13', key: 'TPW-155', title: 'Fix broken email notification templates', type: 'bug', priority: 'high', statusId: 'todo', points: 3 },
];

export default function ProjectBacklog() {
  const [searchQuery, setSearchQuery] = useState('');

  const allIssues = [...activeSprintIssues, ...futureSprintIssues, ...backlogIssues];

  const filterIssues = (issues: Issue[]) => {
    if (!searchQuery) return issues;
    return issues.filter(i =>
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.key.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredActive = filterIssues(activeSprintIssues);
  const filteredFuture = filterIssues(futureSprintIssues);
  const filteredBacklog = filterIssues(backlogIssues);

  const isTotalEmpty = activeSprintIssues.length === 0 && futureSprintIssues.length === 0 && backlogIssues.length === 0;

  return (
    <div className="tf-issues-page">
      <BacklogHeader totalIssues={allIssues.length} />
      <BacklogToolbar onSearchChange={setSearchQuery} />

      <div className="tf-issues-content">
        {isTotalEmpty ? (
          <EmptyBacklogState />
        ) : (
          <>
            <ActiveSprint issues={filteredActive} />
            <FutureSprints issues={filteredFuture} />
            <FutureBacklog issues={filteredBacklog} />
          </>
        )}
      </div>
    </div>
  );
}
