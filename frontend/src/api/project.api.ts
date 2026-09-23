import api from './axiosInstance';
import type { CreateProjectPayload, Project, ProjectStatus } from '../types/project.types';
import type { Task } from '../types/task.types';

export const projectApi = {
  createProject: async (data: CreateProjectPayload): Promise<{ success: boolean; message: string; project: Project }> => {
    const res = await api.post('/projects', data);
    return res.data;
  },

  getAllProjects: async (): Promise<{ success: boolean; message: string; projects: Project[] }> => {
    const res = await api.get('/projects');
    return res.data;
  },

  getProjectById: async (projectId: string): Promise<{ success: boolean; message: string; project: Project }> => {
    const res = await api.get(`/projects/${projectId}`);
    return res.data;
  },

  getProjectTasks: async (projectId: string): Promise<{ success: boolean; message: string; tasks: Task[] }> => {
    const res = await api.get(`/projects/${projectId}/tasks`);
    return res.data;
  },

  updateProjectStatus: async (projectId: string, status: ProjectStatus): Promise<{ success: boolean; message: string; project: Project }> => {
    const res = await api.patch(`/projects/${projectId}/status`, { status });
    return res.data;
  },
};
