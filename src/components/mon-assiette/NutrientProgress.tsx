
import React from 'react';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface NutrientProgressProps {
  label: string;
  current: number;
  goal: number;
  unit: string;
  color: string;
  indent?: boolean;
}

export const NutrientProgress: React.FC<NutrientProgressProps> = ({ 
  label, 
  current, 
  goal, 
  unit, 
  color,
  indent = false
}) => {
  const percentage = Math.round((current / goal) * 100);
  
  return (
    <div className={indent ? "ml-6" : ""}>
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium">{label}</span>
        <span>
          {current.toFixed(1)}/{goal} {unit}
        </span>
      </div>
      <ProgressBar 
        value={current} 
        max={goal} 
        color={color}
        height="h-3"
      />
      <div className="text-right text-sm text-gray-500 mt-1">
        {percentage}% {goal > current ? `(Recommandation: ${goal} ${unit})` : '(Objectif atteint)'}
      </div>
    </div>
  );
};

export default NutrientProgress;
