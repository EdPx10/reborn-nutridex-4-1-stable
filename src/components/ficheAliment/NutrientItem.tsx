
import React from 'react';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface NutrientItemProps {
  label: string;
  value: number;
  unit: string;
  color?: string;
  percentage?: number;
}

export const NutrientItem: React.FC<NutrientItemProps> = ({ 
  label, 
  value, 
  unit, 
  color = 'bg-blue-500',
  percentage = 0
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{label}</span>
        <div className="text-sm space-x-2">
          <span>{value.toFixed(1)} {unit}</span>
          <span className="text-gray-500">({percentage.toFixed(0)}%)</span>
        </div>
      </div>
      <ProgressBar 
        value={percentage} 
        max={100} 
        color={color}
      />
    </div>
  );
};

export default NutrientItem;
