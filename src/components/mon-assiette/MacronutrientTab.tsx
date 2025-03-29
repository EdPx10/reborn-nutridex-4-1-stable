
import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import NutrientProgress from './NutrientProgress';
import getNutrientIcon from '@/components/ui/NutrientIcons';

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
    };
  };
}

export const MacronutrientTab: React.FC<MacronutrientTabProps> = ({ 
  totalNutrients, 
  activeProfile 
}) => {
  const [lipidsExpanded, setLipidsExpanded] = useState(false);
  const [polyUnsaturatedExpanded, setPolyUnsaturatedExpanded] = useState(false);

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
              current={totalNutrients.lipides}
              goal={activeProfile.goals.lipides.goal}
              unit="g"
              color="bg-nutri-yellow"
              indent={false}
            />
            
            <NutrientProgress
              label="Acides gras saturés"
              current={totalNutrients.lipids.saturated}
              goal={activeProfile.goals.lipides.goal * 0.33} // Approximation
              unit="g"
              color="bg-nutri-yellow"
              indent={true}
            />
            
            <NutrientProgress
              label="Acides gras mono-insaturés"
              current={totalNutrients.lipids.monoUnsaturated}
              goal={activeProfile.goals.lipides.goal * 0.33} // Approximation
              unit="g"
              color="bg-nutri-yellow"
              indent={true}
            />
            
            <div className="border-t border-b border-gray-50 py-2 ml-6">
              <button 
                className="flex justify-between items-center w-full py-2 text-left"
                onClick={() => setPolyUnsaturatedExpanded(!polyUnsaturatedExpanded)}
              >
                <span>Acides gras poly-insaturés</span>
                {polyUnsaturatedExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {polyUnsaturatedExpanded ? (
                <div className="pt-2 pb-3 space-y-6">
                  <NutrientProgress
                    label="Acides gras poly-insaturés (Total)"
                    current={totalNutrients.lipids.polyUnsaturated}
                    goal={activeProfile.goals.lipides.goal * 0.33} // Approximation
                    unit="g"
                    color="bg-nutri-yellow"
                    indent={true}
                  />
                  
                  <NutrientProgress
                    label="Oméga-3"
                    current={totalNutrients.lipids.omega3}
                    goal={2} // Recommandation générale
                    unit="g"
                    color="bg-nutri-yellow"
                    indent={true}
                  />
                  
                  <NutrientProgress
                    label="Oméga-6"
                    current={totalNutrients.lipids.omega6}
                    goal={10} // Recommandation générale
                    unit="g"
                    color="bg-nutri-yellow"
                    indent={true}
                  />
                </div>
              ) : null}
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
