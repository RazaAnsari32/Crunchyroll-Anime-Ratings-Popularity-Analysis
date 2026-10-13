import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  sublabel: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  borderColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  sublabel,
  icon: Icon,
  iconBgColor,
  iconColor,
  borderColor = 'border-[#15233D]',
}) => {
  return (
    <div
      className={`glass-panel glass-panel-hover rounded-2xl p-5 border ${borderColor} flex items-center justify-between gap-4`}
    >
      <div className="flex items-center gap-4">
        {/* Icon container */}
        <div
          className={`w-13 h-13 rounded-2xl ${iconBgColor} flex items-center justify-center shrink-0 shadow-inner`}
        >
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>

        {/* Text content */}
        <div>
          <span className="text-xs font-medium text-slate-400 block tracking-wide">
            {label}
          </span>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight tabular-nums mt-0.5">
            {value}
          </div>
          <span className="text-[11px] font-medium text-slate-400 block mt-0.5">
            {sublabel}
          </span>
        </div>
      </div>
    </div>
  );
};
