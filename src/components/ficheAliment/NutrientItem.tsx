
import React from 'react';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface NutrientItemProps {
  label: string;
  value: number;
  unit: string;
  color?: string;
}

export const NutrientItem: React.FC<NutrientItemProps> = ({ 
  label, 
  value, 
  unit, 
  color = 'bg-blue-500' 
}) => {
  // For visual purposes, simulate a target value
  const targetValue = value * 2;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm">
          {value} {unit}
        </span>
      </div>
      <ProgressBar 
        value={value} 
        max={targetValue} 
        color={color}
      />
    </div>
  );
};

export default NutrientItem;
