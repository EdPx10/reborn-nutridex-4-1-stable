
import React from 'react';
import { NutrientGoal } from '@/types';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { getNutrientIcon } from '@/components/ui/NutrientIcons';

interface MicroNutrientProps {
  label: string;
  category: 'vitamines' | 'mineraux' | 'oligoelements';
  nutrientKey: string;
  goal: NutrientGoal;
}

const MicroNutrient: React.FC<MicroNutrientProps> = ({ label, category, nutrientKey, goal }) => {
  const percentage = Math.round((goal.current / goal.goal) * 100);
  
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        {getNutrientIcon(category, nutrientKey, 16)}
        <span>{label}</span>
      </div>
      
      <ProgressBar 
        value={goal.current} 
        max={goal.goal} 
        height="h-2"
        color="bg-nutri-orange"
      />
      
      <div className="flex justify-between mt-1 text-sm">
        <div className="text-gray-700">
          {goal.current.toFixed(1)} {goal.unit}
        </div>
        <div className="text-gray-500">
          {percentage}% de l'objectif
        </div>
      </div>
    </div>
  );
};

export default MicroNutrient;
