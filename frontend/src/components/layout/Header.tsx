import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useAppSelector } from '../../redux/hooks';

interface HeaderProps {
  breadcrumb?: { label: string; href?: string }[];
  title?: string;
  action?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ breadcrumb, title, action }) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-8 py-4 flex items-center justify-between">
      <div>
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <span>{user?.organization?.name || 'Workspace'}</span>
            {breadcrumb.map((item, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className={idx === breadcrumb.length - 1 ? 'font-medium text-slate-700' : ''}>
                  {item.label}
                </span>
              </React.Fragment>
            ))}
          </nav>
        )}
        {title && <h2 className="text-xl font-bold text-slate-900">{title}</h2>}
      </div>
      {action && <div>{action}</div>}
    </header>
  );
};
