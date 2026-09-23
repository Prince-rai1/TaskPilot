import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { projectApi } from '../../api/project.api';
import type { CreateProjectPayload, Project, ProjectStatus } from '../../types/project.types';
import type { Task } from '../../types/task.types';

interface ProjectState {
  projects: Project[];
  activeProject: Project | null;
  activeProjectTasks: Task[];
  isLoading: boolean;
  isProjectLoading: boolean;
  isTasksLoading: boolean;
  isUpdatingStatus: boolean;
  previousStatus: ProjectStatus | null;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  activeProject: null,
  activeProjectTasks: [],
  isLoading: false,
  isProjectLoading: false,
  isTasksLoading: false,
  isUpdatingStatus: false,
  previousStatus: null,
  error: null,
};

export const fetchProjects = createAsyncThunk(
  'projects/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await projectApi.getAllProjects();
      return res.projects;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  'projects/fetchById',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const res = await projectApi.getProjectById(projectId);
      console.log(res)
      return res.project;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchProjectTasks = createAsyncThunk(
  'projects/fetchTasks',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const res = await projectApi.getProjectTasks(projectId);
      return res.tasks;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const createNewProject = createAsyncThunk(
  'projects/create',
  async (payload: CreateProjectPayload, { rejectWithValue }) => {
    try {
      const res = await projectApi.createProject(payload);
      return res.project;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateProjectStatusAction = createAsyncThunk(
  'projects/updateStatus',
  async ({ projectId, status }: { projectId: string; status: ProjectStatus }, { rejectWithValue }) => {
    try {
      const res = await projectApi.updateProjectStatus(projectId, status);
      return res.project;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearProjectError: (state) => {
      state.error = null;
    },
    setActiveProject: (state, action) => {
      state.activeProject = action.payload;
    },
    clearActiveProject: (state) => {
      state.activeProject = null;
      state.activeProjectTasks = [];
      state.error = null;
      state.isProjectLoading = false;
      state.isTasksLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Single Project
      .addCase(fetchProjectById.pending, (state) => {
        state.isProjectLoading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.isProjectLoading = false;
        state.activeProject = action.payload;
        state.error = null;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.isProjectLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Project Tasks
      .addCase(fetchProjectTasks.pending, (state) => {
        state.isTasksLoading = true;
      })
      .addCase(fetchProjectTasks.fulfilled, (state, action) => {
        state.isTasksLoading = false;
        state.activeProjectTasks = action.payload;
      })
      .addCase(fetchProjectTasks.rejected, (state) => {
        state.isTasksLoading = false;
      })
      // Create Project
      .addCase(createNewProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects.unshift(action.payload);
      })
      // Task updates reflected in activeProjectTasks
      .addCase('tasks/changeStatus/pending', (state: any, action: any) => {
        const { taskId, status } = action.meta.arg;
        const task = state.activeProjectTasks.find((t: any) => t.id === taskId);
        if (task) {
          task.status = status;
        }
      })
      .addCase('tasks/changeStatus/fulfilled', (state: any, action: any) => {
        const index = state.activeProjectTasks.findIndex((t: any) => t.id === action.payload.id);
        if (index !== -1) {
          state.activeProjectTasks[index] = { ...state.activeProjectTasks[index], ...action.payload };
        }
      })
      .addCase('tasks/addComment/fulfilled', (state: any, action: any) => {
        const comment = action.payload;
        const task = state.activeProjectTasks.find((t: any) => t.id === comment.taskId);
        if (task) {
          if (!task._count) task._count = { comments: 0 };
          task._count.comments = (task._count.comments || 0) + 1;
        }
      })
      // Update Status (Optimistic Update)
      .addCase(updateProjectStatusAction.pending, (state, action) => {
        state.isUpdatingStatus = true;
        state.error = null;
        const { projectId, status } = action.meta.arg;
        if (state.activeProject && state.activeProject.id === projectId) {
          state.previousStatus = state.activeProject.status;
          state.activeProject.status = status;
        }
        const proj = state.projects.find((p) => p.id === projectId);
        if (proj) {
          proj.status = status;
        }
      })
      .addCase(updateProjectStatusAction.fulfilled, (state, action) => {
        state.isUpdatingStatus = false;
        state.previousStatus = null;
        const index = state.projects.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        if (state.activeProject?.id === action.payload.id) {
          state.activeProject = action.payload;
        }
      })
      .addCase(updateProjectStatusAction.rejected, (state, action) => {
        state.isUpdatingStatus = false;
        // Rollback on failure
        if (state.activeProject && state.previousStatus) {
          state.activeProject.status = state.previousStatus;
          const proj = state.projects.find((p) => p.id === state.activeProject!.id);
          if (proj) {
            proj.status = state.previousStatus;
          }
        }
        state.previousStatus = null;
        state.error = action.payload as string;
      });
  },
});

export const { clearProjectError, setActiveProject, clearActiveProject } = projectSlice.actions;
export default projectSlice.reducer;
