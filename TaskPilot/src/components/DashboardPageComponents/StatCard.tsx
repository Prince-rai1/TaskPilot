import type { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import './Dashboard.css';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  iconVariant: 'primary' | 'secondary' | 'success' | 'tertiary';
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
}

function StatCard({ label, value, icon, iconVariant, trend }: StatCardProps) {
  return (
    <div className="tf-stat-card">
      <div className="tf-stat-header">
        <span className="tf-stat-label">{label}</span>
        <div className={`tf-stat-icon ${iconVariant}`}>
          {icon}
        </div>
      </div>

      <div>
        <h3 className="tf-stat-value">{value}</h3>
        {trend && (
          <div className={`tf-stat-trend ${trend.direction}`} style={{ marginTop: '8px' }}>
            {trend.direction === 'up' && <TrendingUp size={16} />}
            {trend.direction === 'down' && <TrendingDown size={16} />}
            {trend.direction === 'neutral' && <Minus size={16} />}
            <span>{trend.value}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
