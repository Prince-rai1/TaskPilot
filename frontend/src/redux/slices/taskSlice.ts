import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { taskApi } from '../../api/task.api';
import type { CreateTaskPayload, Task, TaskComment, TaskStatus, UpdateTaskPayload } from '../../types/task.types';

interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
  comments: TaskComment[];
  isLoading: boolean;
  isUpdatingStatus: boolean;
  previousTaskStatus: TaskStatus | null;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
  comments: [],
  isLoading: false,
  isUpdatingStatus: false,
  previousTaskStatus: null,
  error: null,
};

export const fetchMyTasks = createAsyncThunk(
  'tasks/fetchMyTasks',
  async (_, { rejectWithValue }) => {
    try {
      const res = await taskApi.getMyTasks();
      return res.tasks;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchTaskDetails = createAsyncThunk(
  'tasks/fetchDetails',
  async (taskId: string, { rejectWithValue }) => {
    try {
      const res = await taskApi.getTaskById(taskId);
      return res.task;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const createTaskAction = createAsyncThunk(
  'tasks/create',
  async ({ projectId, data }: { projectId: string; data: CreateTaskPayload }, { rejectWithValue }) => {
    try {
      const res = await taskApi.createTask(projectId, data);
      return res.task;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateTaskAction = createAsyncThunk(
  'tasks/update',
  async ({ taskId, data }: { taskId: string; data: UpdateTaskPayload }, { rejectWithValue }) => {
    try {
      const res = await taskApi.updateTask(taskId, data);
      return res.task;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const assignTaskAction = createAsyncThunk(
  'tasks/assign',
  async ({ taskId, assigneeId }: { taskId: string; assigneeId: string }, { rejectWithValue }) => {
    try {
      const res = await taskApi.assignTask(taskId, assigneeId);
      return res.task;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const changeTaskStatusAction = createAsyncThunk(
  'tasks/changeStatus',
  async ({ taskId, status }: { taskId: string; status: TaskStatus }, { rejectWithValue }) => {
    try {
      const res = await taskApi.changeTaskStatus(taskId, status);
      return res.task;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteTaskAction = createAsyncThunk(
  'tasks/delete',
  async (taskId: string, { rejectWithValue }) => {
    try {
      await taskApi.deleteTask(taskId);
      return taskId;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchTaskComments = createAsyncThunk(
  'tasks/fetchComments',
  async (taskId: string, { rejectWithValue }) => {
    try {
      const res = await taskApi.getComments(taskId);
      return res.comments;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const addCommentAction = createAsyncThunk(
  'tasks/addComment',
  async ({ taskId, content }: { taskId: string; content: string }, { rejectWithValue }) => {
    try {
      const res = await taskApi.createComment(taskId, content);
      return res.comment;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
      state.comments = action.payload?.comments || [];
    },
    clearSelectedTask: (state) => {
      state.selectedTask = null;
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch My Tasks
      .addCase(fetchMyTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchMyTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch details
      .addCase(fetchTaskDetails.fulfilled, (state, action) => {
        state.selectedTask = action.payload;
        state.comments = action.payload.comments || [];
      })
      // Create
      .addCase(createTaskAction.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      // Update
      .addCase(updateTaskAction.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
        if (state.selectedTask?.id === action.payload.id) {
          state.selectedTask = action.payload;
        }
      })
      // Assign
      .addCase(assignTaskAction.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
        if (state.selectedTask?.id === action.payload.id) {
          state.selectedTask.assignee = action.payload.assignee;
        }
      })
      // Status (Optimistic Update)
      .addCase(changeTaskStatusAction.pending, (state, action) => {
        state.isUpdatingStatus = true;
        state.error = null;
        const { taskId, status } = action.meta.arg;
        if (state.selectedTask && state.selectedTask.id === taskId) {
          state.previousTaskStatus = state.selectedTask.status;
          state.selectedTask.status = status;
        }
        const task = state.tasks.find((t) => t.id === taskId);
        if (task) {
          task.status = status;
        }
      })
      .addCase(changeTaskStatusAction.fulfilled, (state, action) => {
        state.isUpdatingStatus = false;
        state.previousTaskStatus = null;
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = { ...state.tasks[index], ...action.payload };
        }
        if (state.selectedTask?.id === action.payload.id) {
          state.selectedTask = { ...state.selectedTask, ...action.payload };
        }
      })
      .addCase(changeTaskStatusAction.rejected, (state, action) => {
        state.isUpdatingStatus = false;
        // Rollback on failure
        if (state.selectedTask && state.previousTaskStatus) {
          state.selectedTask.status = state.previousTaskStatus;
          const task = state.tasks.find((t) => t.id === state.selectedTask!.id);
          if (task) {
            task.status = state.previousTaskStatus;
          }
        }
        state.previousTaskStatus = null;
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteTaskAction.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
        if (state.selectedTask?.id === action.payload) {
          state.selectedTask = null;
          state.comments = [];
        }
      })
      // Comments
      .addCase(fetchTaskComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(addCommentAction.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
        const comment = action.payload;
        const task = state.tasks.find((t) => t.id === comment.taskId);
        if (task) {
          if (!task._count) task._count = { comments: 0 };
          task._count.comments = (task._count.comments || 0) + 1;
        }
        if (state.selectedTask && (state.selectedTask.id === comment.taskId || !comment.taskId)) {
          if (!state.selectedTask._count) state.selectedTask._count = { comments: 0 };
          state.selectedTask._count.comments = (state.selectedTask._count.comments || 0) + 1;
        }
      });
  },
});

export const { setSelectedTask, clearSelectedTask } = taskSlice.actions;
export default taskSlice.reducer;
