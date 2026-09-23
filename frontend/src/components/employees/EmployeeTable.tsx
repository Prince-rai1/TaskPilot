import React from 'react';
import type { Employee } from '../../types/employee.types';
import { useAppDispatch } from '../../redux/hooks';
import { toggleEmployeeStatusAction } from '../../redux/slices/employeeSlice';
import { showToast } from '../../redux/slices/uiSlice';
import { Badge } from '../common/Badge';
import { formatDate } from '../../utils/formatDate';
import { getUserStatusBadge } from '../../utils/enumBadges';
import { UserCheck, UserX, Calendar, Mail } from 'lucide-react';

interface EmployeeTableProps {
  employees: Employee[];
  isLoading?: boolean;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, isLoading }) => {
  const dispatch = useAppDispatch();

  const handleToggleStatus = async (employee: Employee) => {
    const nextStatus = employee.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    try {
      await dispatch(toggleEmployeeStatusAction({ id: employee.id, status: nextStatus })).unwrap();
      dispatch(
        showToast({
          message: `${employee.name} is now ${nextStatus.toLowerCase()}`,
          type: 'success',
        })
      );
    } catch (err: any) {
      dispatch(showToast({ message: err || 'Failed to update employee status', type: 'error' }));
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
        Loading employee directory...
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <p className="text-slate-500 text-sm font-medium">No employees found.</p>
        <p className="text-slate-400 text-xs mt-1">Add your team members using the button above.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/80 text-slate-500 uppercase text-[11px] font-semibold tracking-wider border-b border-slate-200">
            <tr>
              <th className="px-6 py-3.5">Employee</th>
              <th className="px-6 py-3.5">Role</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5">Joined</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {employees.map((emp) => {
              const statusInfo = getUserStatusBadge(emp.status);
              const initials = emp.name.slice(0, 2).toUpperCase();

              return (
                <tr key={emp.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* Name and Email */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-slate-900 block truncate">{emp.name}</span>
                        <span className="text-slate-400 text-xs flex items-center gap-1 truncate">
                          <Mail className="w-3 h-3" />
                          {emp.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <Badge variant="indigo" className="text-[11px]">
                      {emp.role}
                    </Badge>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <Badge className={statusInfo.className}>{statusInfo.label}</Badge>
                  </td>

                  {/* Joined Date */}
                  <td className="px-6 py-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {formatDate(emp.createdAt)}
                    </span>
                  </td>

                  {/* Toggle Status Action */}
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleToggleStatus(emp)}
                      title={emp.status === 'ACTIVE' ? 'Deactivate Employee' : 'Activate Employee'}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                        emp.status === 'ACTIVE'
                          ? 'text-rose-600 hover:bg-rose-50 border border-rose-200'
                          : 'text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
                      }`}
                    >
                      {emp.status === 'ACTIVE' ? (
                        <>
                          <UserX className="w-3 h-3" /> Deactivate
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-3 h-3" /> Activate
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
