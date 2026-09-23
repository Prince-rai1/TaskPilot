import api from './axiosInstance';
import type { CreateTaskPayload, Task, TaskComment, TaskStatus, UpdateTaskPayload } from '../types/task.types';

export const taskApi = {
  createTask: async (projectId: string, data: CreateTaskPayload): Promise<{ success: boolean; message: string; task: Task }> => {
    const res = await api.post(`/tasks/${projectId}`, data);
    return res.data;
  },

  getMyTasks: async (): Promise<{ success: boolean; tasks: Task[] }> => {
    const res = await api.get('/tasks/my-tasks');
    return res.data;
  },

  getTaskById: async (taskId: string): Promise<{ success: boolean; task: Task }> => {
    const res = await api.get(`/tasks/${taskId}`);
    return res.data;
  },

  updateTask: async (taskId: string, data: UpdateTaskPayload): Promise<{ success: boolean; message: string; task: Task }> => {
    const res = await api.put(`/tasks/${taskId}`, data);
    return res.data;
  },

  assignTask: async (taskId: string, assigneeId: string): Promise<{ success: boolean; message: string; task: Task }> => {
    const res = await api.patch(`/tasks/${taskId}/assign`, { assigneeId });
    return res.data;
  },

  changeTaskStatus: async (taskId: string, status: TaskStatus): Promise<{ success: boolean; message: string; task: Task }> => {
    const res = await api.patch(`/tasks/${taskId}/status`, { status });
    return res.data;
  },

  deleteTask: async (taskId: string): Promise<{ success: boolean; message: string }> => {
    const res = await api.delete(`/tasks/${taskId}`);
    return res.data;
  },

  // Task Comments
  getComments: async (taskId: string): Promise<{ success: boolean; comments: TaskComment[] }> => {
    const res = await api.get(`/tasks/${taskId}/comments`);
    return res.data;
  },

  createComment: async (taskId: string, content: string): Promise<{ success: boolean; message: string; comment: TaskComment }> => {
    const res = await api.post(`/tasks/${taskId}/comments`, { content });
    return res.data;
  },
};
