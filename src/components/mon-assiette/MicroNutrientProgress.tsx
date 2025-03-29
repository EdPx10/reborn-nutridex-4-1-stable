
import React from 'react';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface MicroNutrientProgressProps {
  label: string;
  current: number;
  goal: number;
  unit: string;
}

export const MicroNutrientProgress: React.FC<MicroNutrientProgressProps> = ({ 
  label, 
  current, 
  goal, 
  unit
}) => {
  const percentage = Math.round((current / goal) * 100);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span>{label}</span>
        <span className="text-sm text-gray-600">
          {current.toFixed(1)} / {goal} {unit}
        </span>
      </div>
      
      <ProgressBar 
        value={current} 
        max={goal} 
        color="bg-nutri-orange"
        height="h-2"
      />
      
      <div className="text-right mt-1 text-sm text-gray-500">
        {percentage}% de l'objectif
      </div>
    </div>
  );
};

export default MicroNutrientProgress;
