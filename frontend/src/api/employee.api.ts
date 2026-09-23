import api from './axiosInstance';
import type { CreateEmployeePayload, Employee, UpdateEmployeeStatusPayload } from '../types/employee.types';

export const employeeApi = {
  createEmployee: async (data: CreateEmployeePayload): Promise<{ success: boolean; message: string; employee: Employee }> => {
    const res = await api.post('/auth/create-employee', data);
    return res.data;
  },

  getAllEmployees: async (): Promise<{ success: boolean; message: string; employees: Employee[] }> => {
    const res = await api.get('/auth/all-employees');
    return res.data;
  },

  getEmployeeById: async (id: string): Promise<{ success: boolean; employee: Employee }> => {
    const res = await api.get(`/auth/employee/${id}`);
    return res.data;
  },

  updateEmployeeStatus: async (id: string, data: UpdateEmployeeStatusPayload): Promise<{ success: boolean; message: string; employee: Employee }> => {
    const res = await api.patch(`/auth/employee/${id}/status`, data);
    return res.data;
  },
};
