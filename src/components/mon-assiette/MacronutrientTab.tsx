
import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import NutrientProgress from './NutrientProgress';
import { getNutrientIcon } from '@/components/ui/NutrientIcons';

interface MacronutrientTabProps {
  totalNutrients: {
    glucides: number;
    proteines: number;
    lipides: number;
    fibres: number;
    lipids: {
      saturated: number;
      monoUnsaturated: number;
      polyUnsaturated: number;
      omega3: number;
      omega6: number;
    };
  };
  activeProfile: {
    goals: {
      glucides: { goal: number };
      proteines: { goal: number };
      lipides: { goal: number };
      fibres: { goal: number };
      lipids?: {
        saturated: { goal: number };
        monoUnsaturated: { goal: number };
        polyUnsaturated: { goal: number };
        omega3: { goal: number };
        omega6: { goal: number };
      };
    };
  };
}

export const MacronutrientTab: React.FC<MacronutrientTabProps> = ({ 
  totalNutrients, 
  activeProfile 
}) => {
  const [lipidsExpanded, setLipidsExpanded] = useState(false);

  // Ensure lipids data is properly accessed
  const totalLipids = totalNutrients.lipides || 0;
  const saturatedFats = totalNutrients.lipids?.saturated || 0;
  const monoUnsaturated = totalNutrients.lipids?.monoUnsaturated || 0;
  const polyUnsaturated = totalNutrients.lipids?.polyUnsaturated || 0;
  const omega3 = totalNutrients.lipids?.omega3 || 0;
  const omega6 = totalNutrients.lipids?.omega6 || 0;

  // Lipid goals from profile or defaults
  const lipidGoal = activeProfile.goals.lipides.goal || 78;
  const saturatedGoal = activeProfile.goals.lipids?.saturated.goal || Math.round(lipidGoal * 0.33);
  const monoUnsaturatedGoal = activeProfile.goals.lipids?.monoUnsaturated.goal || Math.round(lipidGoal * 0.33);
  const polyUnsaturatedGoal = activeProfile.goals.lipids?.polyUnsaturated.goal || Math.round(lipidGoal * 0.33);
  const omega3Goal = activeProfile.goals.lipids?.omega3.goal || 2;
  const omega6Goal = activeProfile.goals.lipids?.omega6.goal || 10;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        {getNutrientIcon('macro', 'glucides', 20)}
        <NutrientProgress
          label="Glucides"
          current={totalNutrients.glucides}
          goal={activeProfile.goals.glucides.goal}
          unit="g"
          color="bg-nutri-blue"
        />
      </div>
      
      <div className="flex items-center gap-2">
        {getNutrientIcon('macro', 'proteines', 20)}
        <NutrientProgress
          label="Protéines"
          current={totalNutrients.proteines}
          goal={activeProfile.goals.proteines.goal}
          unit="g"
          color="bg-nutri-red"
        />
      </div>
      
      <div className="border-t border-b border-gray-100 py-2">
        <button 
          className="flex justify-between items-center w-full py-2 text-left font-medium"
          onClick={() => setLipidsExpanded(!lipidsExpanded)}
        >
          <div className="flex items-center gap-2">
            {getNutrientIcon('macro', 'lipides', 20)}
            <span>Lipides</span>
          </div>
          {lipidsExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {lipidsExpanded && (
          <div className="pt-2 pb-3 space-y-6">
            <NutrientProgress
              label="Lipides (Total)"
              current={totalLipids}
              goal={lipidGoal}
              unit="g"
              color="bg-nutri-yellow"
              indent={false}
            />
            
            <NutrientProgress
              label="Acides gras saturés"
              current={saturatedFats}
              goal={saturatedGoal}
              unit="g"
              color="bg-nutri-yellow"
              indent={true}
            />
            
            <NutrientProgress
              label="Acides gras mono-insaturés"
              current={monoUnsaturated}
              goal={monoUnsaturatedGoal}
              unit="g"
              color="bg-nutri-yellow"
              indent={true}
            />
            
            <NutrientProgress
              label="Acides gras poly-insaturés (Total)"
              current={polyUnsaturated}
              goal={polyUnsaturatedGoal}
              unit="g"
              color="bg-nutri-yellow"
              indent={true}
            />
            
            <div className="ml-6">
              <NutrientProgress
                label="Oméga-3"
                current={omega3}
                goal={omega3Goal}
                unit="g"
                color="bg-nutri-yellow"
                indent={true}
              />
              
              <NutrientProgress
                label="Oméga-6"
                current={omega6}
                goal={omega6Goal}
                unit="g"
                color="bg-nutri-yellow"
                indent={true}
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {getNutrientIcon('macro', 'fibres', 20)}
        <NutrientProgress
          label="Fibres"
          current={totalNutrients.fibres}
          goal={activeProfile.goals.fibres.goal}
          unit="g"
          color="bg-nutri-green"
        />
      </div>
    </div>
  );
};

export default MacronutrientTab;
