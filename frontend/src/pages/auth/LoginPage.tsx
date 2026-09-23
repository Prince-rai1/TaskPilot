import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/slices/authSlice';
import { showToast } from '../../redux/slices/uiSlice';
import type { LoginPayload } from '../../types/auth.types';
import { AuthLayout } from './AuthLayout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginPayload) => {
    try {
      const user = await dispatch(loginUser(data)).unwrap();
      dispatch(showToast({ message: `Welcome back, ${user?.name || 'User'}!`, type: 'success' }));
      if (user?.role === 'ADMIN') {
        navigate('/projects');
      } else {
        navigate('/my-tasks');
      }
    } catch (err: any) {
      dispatch(showToast({ message: err || 'Invalid login credentials', type: 'error' }));
    }
  };

  return (
    <AuthLayout
      activeMode="login"
      title="Welcome back to TaskPilot"
      subtitle="Enter your credentials to access your organization workspace."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Work Email */}
        <Input
          type="email"
          label="Work Email"
          placeholder="name@company.com"
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

        {/* Password with Show/Hide toggle & Forgot password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Password
            </label>
            <button
              type="button"
              onClick={() => alert('Please contact your organization administrator to reset credentials.')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
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

        {/* Remember Device Checkbox */}
        <div className="flex items-center gap-2 pt-1">
          <input
            id="remember-device"
            type="checkbox"
            checked={rememberDevice}
            onChange={(e) => setRememberDevice(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <label htmlFor="remember-device" className="text-xs text-slate-600 select-none cursor-pointer">
            Remember this device for 30 days
          </label>
        </div>

        {/* Primary Login CTA */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            className="w-full h-11 text-sm font-semibold shadow-sm"
            isLoading={isSubmitting}
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Switch to Register link */}
        <p className="text-xs text-center text-slate-500 pt-1">
          Don't have an organization workspace?{' '}
          <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
            Register Organization
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
