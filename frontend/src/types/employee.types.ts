import type { UserStatus } from './auth.types';

export type { UserStatus };

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'EMPLOYEE';
  status: UserStatus;
  organizationId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateEmployeePayload {
  name: string;
  email: string;
  password: string;
}

export interface UpdateEmployeeStatusPayload {
  status: UserStatus;
}
