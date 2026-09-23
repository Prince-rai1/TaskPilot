import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { registerUser } from '../../redux/slices/authSlice';
import { showToast } from '../../redux/slices/uiSlice';
import type { RegisterPayload } from '../../types/auth.types';
import { AuthLayout } from './AuthLayout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Mail, Lock, Building2, User, Eye, EyeOff, ArrowRight } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterPayload>({
    defaultValues: {
      name: '',
      organizationName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterPayload) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      dispatch(showToast({ message: 'Registration successful! Please sign in with your credentials.', type: 'success' }));
      navigate('/login');
    } catch (err: any) {
      dispatch(showToast({ message: err || 'Registration failed', type: 'error' }));
    }
  };

  return (
    <AuthLayout
      activeMode="register"
      title="Get Started with TaskPilot"
      subtitle="Create your organization workspace to get started."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        {/* Full Name */}
        <Input
          label="Full Name *"
          placeholder="e.g. Alex Morgan"
          icon={<User className="w-4 h-4" />}
          {...register('name', { required: 'Full name is required' })}
          error={errors.name?.message}
        />

        {/* Organization Name */}
        <Input
          label="Organization Name *"
          placeholder="e.g. Acme Technologies"
          icon={<Building2 className="w-4 h-4" />}
          {...register('organizationName', {
            required: 'Organization name is required',
          })}
          error={errors.organizationName?.message}
        />

        {/* Work Email */}
        <Input
          type="email"
          label="Work Email *"
          placeholder="alex@acme.com"
          icon={<Mail className="w-4 h-4" />}
          {...register('email', {
            required: 'Work email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          error={errors.email?.message}
        />

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Password *
            </label>
            <span className="text-[11px] text-slate-400">Min. 6 characters</span>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a secure password"
              className={`w-full text-sm bg-white text-slate-900 border rounded-lg pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 transition-all ${
                errors.password
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-indigo-600 focus:ring-indigo-100'
              }`}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-rose-600 font-medium">{errors.password.message}</p>
          )}
        </div>

        {/* Primary Action */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            className="w-full h-11 text-sm font-semibold shadow-sm"
            isLoading={isSubmitting}
          >
            <span>Create Organization</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Terms and Privacy policy */}
        <p className="text-[11px] text-center text-slate-400 leading-relaxed pt-1">
          By continuing, you agree to TaskPilot's{' '}
          <a href="#" className="underline hover:text-indigo-600">Terms of Service</a> and{' '}
          <a href="#" className="underline hover:text-indigo-600">Privacy Policy</a>.
        </p>

        {/* Switch to Login */}
        <p className="text-xs text-center text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
