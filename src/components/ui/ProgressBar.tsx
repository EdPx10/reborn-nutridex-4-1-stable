
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  className?: string;
  showValue?: boolean;
  showPercentage?: boolean;
  height?: string;
}

const getColorClass = (value: number, max: number): string => {
  const percentage = (value / max) * 100;
  
  if (percentage < 25) return 'bg-nutri-blue';
  if (percentage < 50) return 'bg-nutri-green';
  if (percentage < 75) return 'bg-nutri-yellow';
  return 'bg-nutri-orange';
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  max, 
  color,
  className,
  showValue = false,
  showPercentage = false,
  height = 'h-2'
}) => {
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  const colorClass = color || getColorClass(value, max);
  
  return (
    <div className="w-full">
      <div className={cn('nutri-progress-bar', height, className)}>
        <div 
          className={cn('nutri-progress-fill', colorClass)} 
          style={{ width: `${percentage}%` }}
        />
      </div>
      {(showValue || showPercentage) && (
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          {showValue && (
            <span>{value}/{max}</span>
          )}
          {showPercentage && (
            <span>{percentage}%</span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
