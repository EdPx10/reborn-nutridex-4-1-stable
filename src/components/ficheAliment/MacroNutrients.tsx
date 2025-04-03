
import React from 'react';
import { Food } from '@/types';
import NutrientItem from './NutrientItem';
import { Separator } from '@/components/ui/separator';

interface MacroNutrientsProps {
  food: Food;
}

export const MacroNutrients: React.FC<MacroNutrientsProps> = ({ food }) => {
  const glucides = food.nutrients.glucides || 0;
  const proteines = food.nutrients.proteines || 0;
  const lipides = food.nutrients.lipides || 0;
  const fibres = food.nutrients.fibres || 0;
  
  // Extract lipid details if available
  const lipidDetails = food.nutrients.lipids || null;
  
  return (
    <div className="mb-6">
      <h2 className="font-medium text-xl mb-3">Macronutriments</h2>
      <div className="flex flex-wrap">
        <NutrientItem 
          label="Glucides" 
          value={glucides} 
          unit="g" 
          nutrientKey="glucides"
          category="macro"
        />
        <NutrientItem 
          label="Protéines" 
          value={proteines} 
          unit="g" 
          nutrientKey="proteines"
          category="macro"
        />
        <NutrientItem 
          label="Lipides" 
          value={lipides} 
          unit="g" 
          nutrientKey="lipides"
          category="macro"
        />
        <NutrientItem 
          label="Fibres" 
          value={fibres} 
          unit="g" 
          nutrientKey="fibres"
          category="macro"
        />
      </div>
      
      {lipidDetails && (
        <div className="mt-4">
          <h3 className="font-medium text-md mb-2">Détails des lipides</h3>
          <div className="flex flex-wrap">
            <NutrientItem 
              label="Saturés" 
              value={lipidDetails.saturated} 
              unit="g" 
            />
            <NutrientItem 
              label="Mono-insaturés" 
              value={lipidDetails.monoUnsaturated} 
              unit="g" 
            />
            <NutrientItem 
              label="Poly-insaturés" 
              value={lipidDetails.polyUnsaturated} 
              unit="g" 
            />
            <NutrientItem 
              label="Oméga-3" 
              value={lipidDetails.omega3} 
              unit="g" 
            />
            <NutrientItem 
              label="Oméga-6" 
              value={lipidDetails.omega6} 
              unit="g" 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MacroNutrients;
