import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchAllEmployees } from '../redux/slices/employeeSlice';
import { openAddEmployeeModal } from '../redux/slices/uiSlice';
import { AppLayout } from '../components/layout/AppLayout';
import { EmployeeTable } from '../components/employees/EmployeeTable';
import { AddEmployeeModal } from '../components/employees/AddEmployeeModal';
import { Button } from '../components/common/Button';
import { Plus, Search, Users, UserCheck, UserX } from 'lucide-react';

export const EmployeesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { employees, isLoading } = useAppSelector((state) => state.employees);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [dispatch]);

  const filteredEmployees = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCount = employees.length;
  const activeCount = employees.filter((e) => e.status === 'ACTIVE').length;
  const inactiveCount = employees.filter((e) => e.status === 'INACTIVE').length;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Employees Directory</h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage organization members, onboard team members, and configure workspace access.
            </p>
          </div>
          <Button
            onClick={() => dispatch(openAddEmployeeModal())}
            variant="primary"
            className="shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Employee
          </Button>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Total Staff</span>
              <p className="text-xl font-bold text-slate-900">{totalCount}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Active Members</span>
              <p className="text-xl font-bold text-emerald-700">{activeCount}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <UserX className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Inactive Members</span>
              <p className="text-xl font-bold text-slate-700">{inactiveCount}</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by employee name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
            />
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Showing {filteredEmployees.length} of {totalCount} team members
          </span>
        </div>

        {/* Employee Table */}
        <EmployeeTable employees={filteredEmployees} isLoading={isLoading} />
      </div>

      {/* Add Employee Modal */}
      <AddEmployeeModal />
    </AppLayout>
  );
};
