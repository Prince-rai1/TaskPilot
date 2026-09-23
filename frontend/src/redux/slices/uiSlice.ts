import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ToastData {
  message: string;
  type: 'success' | 'error' | 'info';
}

interface UIState {
  isCreateProjectOpen: boolean;
  isCreateTaskOpen: boolean;
  isAddEmployeeOpen: boolean;
  isTaskDrawerOpen: boolean;
  toast: ToastData | null;
}

const initialState: UIState = {
  isCreateProjectOpen: false,
  isCreateTaskOpen: false,
  isAddEmployeeOpen: false,
  isTaskDrawerOpen: false,
  toast: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openCreateProjectModal: (state) => {
      state.isCreateProjectOpen = true;
    },
    closeCreateProjectModal: (state) => {
      state.isCreateProjectOpen = false;
    },
    openCreateTaskModal: (state) => {
      state.isCreateTaskOpen = true;
    },
    closeCreateTaskModal: (state) => {
      state.isCreateTaskOpen = false;
    },
    openAddEmployeeModal: (state) => {
      state.isAddEmployeeOpen = true;
    },
    closeAddEmployeeModal: (state) => {
      state.isAddEmployeeOpen = false;
    },
    openTaskDrawer: (state) => {
      state.isTaskDrawerOpen = true;
    },
    closeTaskDrawer: (state) => {
      state.isTaskDrawerOpen = false;
    },
    showToast: (state, action: PayloadAction<ToastData>) => {
      state.toast = action.payload;
    },
    clearToast: (state) => {
      state.toast = null;
    },
  },
});

export const {
  openCreateProjectModal,
  closeCreateProjectModal,
  openCreateTaskModal,
  closeCreateTaskModal,
  openAddEmployeeModal,
  closeAddEmployeeModal,
  openTaskDrawer,
  closeTaskDrawer,
  showToast,
  clearToast,
} = uiSlice.actions;

export default uiSlice.reducer;
