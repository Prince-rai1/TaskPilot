import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { ProjectDetailsPage } from '../pages/ProjectDetailsPage';
import { EmployeesPage } from '../pages/EmployeesPage';
import { EmployeeWorkspacePage } from '../pages/EmployeeWorkspacePage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const AppRoutes: React.FC = () => {
  const { isAuthenticated, role, isLoading } = useAppSelector((state) => state.auth);

  const getRootRedirect = () => {
    if (isLoading) return null;
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (role === 'ADMIN') return <Navigate to="/projects" replace />;
    return <Navigate to="/my-tasks" replace />;
  };

  return (
    <Routes>
      {/* Public Login Route */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={role === 'ADMIN' ? '/projects' : '/my-tasks'} replace />
          ) : (
            <LoginPage />
          )
        }
      />

      {/* Public Register Route */}
      <Route
        path="/register"
        element={
          isAuthenticated ? (
            <Navigate to={role === 'ADMIN' ? '/projects' : '/my-tasks'} replace />
          ) : (
            <RegisterPage />
          )
        }
      />

      {/* Alias for signup & signin */}
      <Route path="/signup" element={<Navigate to="/register" replace />} />
      <Route path="/signin" element={<Navigate to="/login" replace />} />

      {/* Projects Overview (Admin & Member) */}
      <Route
        path="/projects"
        element={
          <ProtectedRoute allowedRoles={['ADMIN', 'EMPLOYEE']}>
            <ProjectsPage />
          </ProtectedRoute>
        }
      />

      {/* Admin & Member: Project Details Page */}
      <Route
        path="/projects/:projectId"
        element={
          <ProtectedRoute allowedRoles={['ADMIN', 'EMPLOYEE']}>
            <ProjectDetailsPage />
          </ProtectedRoute>
        }
      />

      {/* Admin: Employees Management */}
      <Route
        path="/employees"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <EmployeesPage />
          </ProtectedRoute>
        }
      />

      {/* Employee & Admin: Personalized Workspace (My Tasks) */}
      <Route
        path="/my-tasks"
        element={
          <ProtectedRoute allowedRoles={['EMPLOYEE', 'ADMIN']}>
            <EmployeeWorkspacePage />
          </ProtectedRoute>
        }
      />

      {/* Root redirect depending on role */}
      <Route path="/" element={getRootRedirect()} />

      {/* 404 Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
