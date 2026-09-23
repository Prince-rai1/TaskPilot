export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'HIGHEST';

export interface TaskUser {
  id: string;
  name: string;
  email: string;
}

export interface TaskCommentAuthor {
  id: string;
  name: string;
  email: string;
  role?: 'ADMIN' | 'EMPLOYEE';
}

export interface TaskComment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  taskId?: string;
  author: TaskCommentAuthor;
}

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string | null;
  createdAt: string;
  updatedAt?: string;
  projectId?: string;
  creator?: TaskUser;
  assignee?: TaskUser | null;
  project?: {
    id: string;
    name: string;
  };
  comments?: TaskComment[];
  _count?: {
    comments: number;
  };
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: string;
  assigneeId?: string | null;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: string;
}
