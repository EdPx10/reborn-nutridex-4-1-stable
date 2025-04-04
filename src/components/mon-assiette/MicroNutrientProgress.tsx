
import React from 'react';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { getNutrientIcon } from '@/components/ui/NutrientIcons';

interface MicroNutrientProgressProps {
  label: string;
  current: number;
  goal: number;
  unit: string;
  category?: 'vitamines' | 'mineraux' | 'oligoelements';
  nutrientKey?: string;
}

export const MicroNutrientProgress: React.FC<MicroNutrientProgressProps> = ({ 
  label, 
  current, 
  goal, 
  unit,
  category,
  nutrientKey
}) => {
  const percentage = Math.round((current / goal) * 100);
  const iconElement = category && nutrientKey ? 
    getNutrientIcon(category, nutrientKey, 16, "mr-1.5") : null;
  
  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-1">
        {iconElement && <span className="mr-1">{iconElement}</span>}
        <span className="flex-grow">{label}</span>
        <span className="text-sm text-gray-600">
          {current.toFixed(1)} / {goal.toFixed(1)} {unit}
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
