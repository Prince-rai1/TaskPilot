import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createEmployeeAction } from '../../redux/slices/employeeSlice';
import { closeAddEmployeeModal, showToast } from '../../redux/slices/uiSlice';
import type { CreateEmployeePayload } from '../../types/employee.types';
import { Info, Lock } from 'lucide-react';

export const AddEmployeeModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isAddEmployeeOpen);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateEmployeePayload>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = async (data: CreateEmployeePayload) => {
    try {
      await dispatch(createEmployeeAction(data)).unwrap();
      dispatch(showToast({ message: 'Employee account created successfully!', type: 'success' }));
      dispatch(closeAddEmployeeModal());
    } catch (err: any) {
      dispatch(showToast({ message: err || 'Failed to create employee', type: 'error' }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeAddEmployeeModal())}
      title="Add New Employee"
      subtitle="Set up credentials and workspace access for a new team member."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <Input
          label="Full Name *"
          placeholder="e.g. Elena Rostova"
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message}
        />

        {/* Email */}
        <Input
          type="email"
          label="Work Email *"
          placeholder="e.g. elena.r@acme.com"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          error={errors.email?.message}
        />

        {/* Password */}
        <Input
          type="password"
          label="Initial Password *"
          placeholder="Enter temporary password"
          icon={<Lock className="w-4 h-4" />}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          error={errors.password?.message}
        />

        {/* Helper Callout Notice */}
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-blue-50/70 border border-blue-100 text-blue-800 text-xs">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <span>
            The employee can use these credentials to log in to their TaskPilot workspace and collaborate on assigned tasks.
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button
            type="button"
            variant="outline"
            onClick={() => dispatch(closeAddEmployeeModal())}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Create Employee
          </Button>
        </div>
      </form>
    </Modal>
  );
};
