
import React from 'react';
import { Food } from '@/types';
import NutrientItem from './NutrientItem';

interface MacroNutrientsProps {
  food: Food;
}

export const MacroNutrients: React.FC<MacroNutrientsProps> = ({ food }) => {
  // Calculate the total of all macronutrients
  const glucides = food.nutrients.glucides || 0;
  const proteines = food.nutrients.proteines || 0;
  const lipides = food.nutrients.lipides || 0;
  const fibres = food.nutrients.fibres || 0;
  
  const total = glucides + proteines + lipides + fibres;
  
  // Calculate percentages
  const calculatePercentage = (value: number): number => {
    return total > 0 ? (value / total) * 100 : 0;
  };
  
  const glucidesPercentage = calculatePercentage(glucides);
  const proteinesPercentage = calculatePercentage(proteines);
  const lipidesPercentage = calculatePercentage(lipides);
  const fibresPercentage = calculatePercentage(fibres);
  
  return (
    <div>
      <h2 className="font-medium text-xl mb-4">Macronutriments</h2>
      <div className="space-y-4">
        <NutrientItem 
          label="Glucides" 
          value={glucides} 
          unit="g" 
          color="bg-nutri-blue"
          percentage={glucidesPercentage}
        />
        <NutrientItem 
          label="Protéines" 
          value={proteines} 
          unit="g" 
          color="bg-nutri-red"
          percentage={proteinesPercentage}
        />
        <NutrientItem 
          label="Lipides" 
          value={lipides} 
          unit="g" 
          color="bg-nutri-yellow"
          percentage={lipidesPercentage}
        />
        {fibres > 0 && (
          <NutrientItem 
            label="Fibres" 
            value={fibres} 
            unit="g" 
            color="bg-nutri-green"
            percentage={fibresPercentage}
          />
        )}
        
        <div className="mt-2 pt-2 border-t border-gray-100">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Total</span>
            <span>{total.toFixed(1)} g</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacroNutrients;
