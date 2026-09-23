import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { employeeApi } from '../../api/employee.api';
import type { CreateEmployeePayload, Employee, UserStatus } from '../../types/employee.types';

interface EmployeeState {
  employees: Employee[];
  isLoading: boolean;
  isCreating: boolean;
  isUpdatingStatus: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  isLoading: false,
  isCreating: false,
  isUpdatingStatus: false,
  error: null,
};

export const fetchAllEmployees = createAsyncThunk(
  'employees/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await employeeApi.getAllEmployees();
      return res.employees;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const createEmployeeAction = createAsyncThunk(
  'employees/create',
  async (data: CreateEmployeePayload, { rejectWithValue }) => {
    try {
      const res = await employeeApi.createEmployee(data);
      return res.employee;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const toggleEmployeeStatusAction = createAsyncThunk(
  'employees/toggleStatus',
  async ({ id, status }: { id: string; status: UserStatus }, { rejectWithValue }) => {
    try {
      const res = await employeeApi.updateEmployeeStatus(id, { status });
      return res.employee;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllEmployees.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees = action.payload;
      })
      .addCase(fetchAllEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create
      .addCase(createEmployeeAction.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createEmployeeAction.fulfilled, (state, action) => {
        state.isCreating = false;
        state.employees.unshift(action.payload);
      })
      .addCase(createEmployeeAction.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      })
      // Status Toggle
      .addCase(toggleEmployeeStatusAction.pending, (state) => {
        state.isUpdatingStatus = true;
        state.error = null;
      })
      .addCase(toggleEmployeeStatusAction.fulfilled, (state, action) => {
        state.isUpdatingStatus = false;
        const index = state.employees.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(toggleEmployeeStatusAction.rejected, (state, action) => {
        state.isUpdatingStatus = false;
        state.error = action.payload as string;
      });
  },
});

export default employeeSlice.reducer;
