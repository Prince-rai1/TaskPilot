import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createTaskAction } from '../../redux/slices/taskSlice';
import { fetchProjectTasks } from '../../redux/slices/projectSlice';
import { closeCreateTaskModal, showToast } from '../../redux/slices/uiSlice';
import type { CreateTaskPayload, TaskPriority } from '../../types/task.types';

interface FormValues {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  assigneeId: string;
}

interface CreateTaskModalProps {
  projectId: string;
  projectName?: string;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ projectId, projectName }) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isCreateTaskOpen);
  const { activeProject } = useAppSelector((state) => state.projects);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      priority: 'MEDIUM',
      dueDate: '',
      assigneeId: '',
    },
  });

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      const payload: CreateTaskPayload = {
        title: data.title,
        description: data.description || undefined,
        priority: data.priority,
        dueDate: data.dueDate || undefined,
        assigneeId: data.assigneeId ? data.assigneeId : null,
      };

      await dispatch(createTaskAction({ projectId, data: payload })).unwrap();
      // Re-fetch project tasks to update analytics and list
      dispatch(fetchProjectTasks(projectId));
      dispatch(showToast({ message: 'Task created successfully!', type: 'success' }));
      dispatch(closeCreateTaskModal());
    } catch (err: any) {
      dispatch(showToast({ message: err || 'Failed to create task', type: 'error' }));
    }
  };

  const priorityOptions = [
    { value: 'LOW', label: 'LOW Priority' },
    { value: 'MEDIUM', label: 'MEDIUM Priority (Default)' },
    { value: 'HIGH', label: 'HIGH Priority' },
    { value: 'HIGHEST', label: 'HIGHEST Priority' },
  ];

  // Assignee options from project members
  const memberOptions = [
    { value: '', label: 'Unassigned (Assign Later)' },
    ...(activeProject?.members || []).map((m) => ({
      value: m.user.id,
      label: `${m.user.name} (${m.user.email})`,
    })),
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeCreateTaskModal())}
      title="Create New Task"
      subtitle={`Project: ${projectName || activeProject?.name || 'Current Project'}`}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <Input
          label="Task Title *"
          placeholder="e.g. Implement OAuth2 Refresh Token Rotation"
          {...register('title', { required: 'Task title is required' })}
          error={errors.title?.message}
        />

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Describe technical requirements, dependencies, or acceptance criteria..."
            className="w-full text-sm bg-white text-slate-900 border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:border-indigo-600 focus:ring-indigo-100 transition-all"
            {...register('description')}
          />
        </div>

        {/* Priority & Due Date in 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Priority *"
            options={priorityOptions}
            {...register('priority')}
          />

          <Input
            type="date"
            label="Due Date"
            {...register('dueDate')}
          />
        </div>

        {/* Assignee (Optional) */}
        <Select
          label="Assignee (Optional)"
          options={memberOptions}
          {...register('assigneeId')}
        />

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-[11px] text-slate-400">
            Esc to cancel
          </span>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => dispatch(closeCreateTaskModal())}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Create Task
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
