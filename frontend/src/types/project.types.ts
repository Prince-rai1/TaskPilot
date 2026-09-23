export type ProjectStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED';

export interface ProjectMemberUser {
  id: string;
  name: string;
  email: string;
  role?: 'ADMIN' | 'EMPLOYEE';
}

export interface ProjectMember {
  id?: string;
  addedAt?: string;
  user: ProjectMemberUser;
}

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  status: ProjectStatus;
  deadline?: string | null;
  createdAt: string;
  updatedAt?: string;
  creator?: {
    id: string;
    name: string;
    email: string;
  };
  members: ProjectMember[];
}

export interface CreateProjectPayload {
  projectName: string;
  description?: string;
  deadline?: string;
  memberIds: string[];
}
