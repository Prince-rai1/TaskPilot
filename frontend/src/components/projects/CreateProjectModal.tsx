import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createNewProject } from '../../redux/slices/projectSlice';
import { fetchAllEmployees } from '../../redux/slices/employeeSlice';
import { closeCreateProjectModal, showToast } from '../../redux/slices/uiSlice';
import type { CreateProjectPayload } from '../../types/project.types';
import { Info } from 'lucide-react';

interface FormValues {
  projectName: string;
  description: string;
  deadline: string;
  memberIds: string[];
}

export const CreateProjectModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isCreateProjectOpen);
  const { employees } = useAppSelector((state) => state.employees);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      projectName: '',
      description: '',
      deadline: '',
      memberIds: [],
    },
  });

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchAllEmployees());
      reset();
    }
  }, [isOpen, dispatch, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      const payload: CreateProjectPayload = {
        projectName: data.projectName,
        description: data.description || undefined,
        deadline: data.deadline || undefined,
        memberIds: data.memberIds,
      };

      await dispatch(createNewProject(payload)).unwrap();
      dispatch(showToast({ message: 'Project created successfully!', type: 'success' }));
      dispatch(closeCreateProjectModal());
    } catch (err: any) {
      dispatch(showToast({ message: err || 'Failed to create project', type: 'error' }));
    }
  };

  const activeEmployees = employees.filter((e) => e.status === 'ACTIVE');

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeCreateProjectModal())}
      title="Create New Project"
      subtitle="Set up a workspace project and assign initial team members."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Project Name */}
        <Input
          label="Project Name *"
          placeholder="e.g. Infrastructure Migration 2026"
          {...register('projectName', { required: 'Project name is required' })}
          error={errors.projectName?.message}
        />

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Outline project goals, scope, and deliverables..."
            className="w-full text-sm bg-white text-slate-900 border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:border-indigo-600 focus:ring-indigo-100 transition-all"
            {...register('description')}
          />
        </div>

        {/* Deadline */}
        <Input
          type="date"
          label="Deadline"
          {...register('deadline')}
        />

        {/* Mandatory Employees Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
            <span>Assign Employees (Members) *</span>
            <span className="text-[11px] font-normal text-indigo-600">
              {activeEmployees.length} active available
            </span>
          </label>

          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-50/70 border border-blue-100 text-blue-800 text-xs mb-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>At least 1 active employee must be selected to create a project.</span>
          </div>

          <Controller
            name="memberIds"
            control={control}
            rules={{
              validate: (val) => (val && val.length > 0) || 'At least 1 active employee must be selected',
            }}
            render={({ field }) => (
              <div className="max-h-44 overflow-y-auto border border-slate-200 rounded-lg p-2 space-y-1 bg-slate-50/50">
                {activeEmployees.length === 0 ? (
                  <p className="text-xs text-slate-500 p-2 italic text-center">
                    No active employees found. Please add employees first from the Employees tab.
                  </p>
                ) : (
                  activeEmployees.map((emp) => {
                    const isChecked = field.value.includes(emp.id);
                    return (
                      <label
                        key={emp.id}
                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors text-xs ${
                          isChecked ? 'bg-indigo-50/70 border border-indigo-200' : 'hover:bg-white'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, emp.id]);
                            } else {
                              field.onChange(field.value.filter((id: string) => id !== emp.id));
                            }
                          }}
                          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                        />
                        <div className="flex-1 flex items-center justify-between min-w-0">
                          <span className="font-semibold text-slate-800 truncate">{emp.name}</span>
                          <span className="text-slate-400 text-[11px] truncate">{emp.email}</span>
                        </div>
                      </label>
                    );
                  })
                )}
              </div>
            )}
          />
          {errors.memberIds && (
            <p className="mt-1 text-xs text-rose-600 font-medium">{errors.memberIds.message}</p>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button
            type="button"
            variant="outline"
            onClick={() => dispatch(closeCreateProjectModal())}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
};
