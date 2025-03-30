
import React from 'react';
import { NutrientGoal } from '@/types';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { MacroIcons, getNutrientIcon } from '@/components/ui/NutrientIcons';

interface MacroNutrientProps {
  label: string;
  nutrientKey: string;
  goal: NutrientGoal;
  showIcon?: boolean;
  indent?: boolean;
  subGoalPercentage?: number;
}

const MacroNutrient: React.FC<MacroNutrientProps> = ({ 
  label, 
  nutrientKey,
  goal,
  showIcon = true,
  indent = false,
  subGoalPercentage
}) => {
  const adjustedGoal = subGoalPercentage ? {
    ...goal,
    current: goal.current * subGoalPercentage,
    goal: goal.goal * subGoalPercentage
  } : goal;
  
  const percentage = Math.round((adjustedGoal.current / adjustedGoal.goal) * 100);

  // Map the color based on the nutrient type
  const getColorClass = () => {
    if (label.includes('Lipides') || label.includes('gras') || label.includes('Oméga')) 
      return 'bg-nutri-yellow';
    if (label.includes('Glucides')) 
      return 'bg-nutri-blue';
    if (label.includes('Protéines')) 
      return 'bg-nutri-red';
    return 'bg-nutri-green';
  };
  
  return (
    <div className={indent ? "ml-6" : ""}>
      <div className="flex items-center gap-2 mb-1">
        {showIcon && (
          getNutrientIcon('macro', nutrientKey, 18)
        )}
        <span className="font-medium">{label}</span>
      </div>
      
      <ProgressBar 
        value={adjustedGoal.current} 
        max={adjustedGoal.goal}
        height="h-2.5"
        color={getColorClass()}
      />
      
      <div className="flex justify-between mt-1 text-sm text-gray-600">
        <div>{percentage}% de l'objectif</div>
        <div>
          {adjustedGoal.current} / {adjustedGoal.goal} {adjustedGoal.unit} 
          {adjustedGoal.recommended && ` (recommandé: ${adjustedGoal.recommended} ${adjustedGoal.unit})`}
        </div>
      </div>
    </div>
  );
};

export default MacroNutrient;
