
import React from 'react';
import { Food } from '@/types';
import NutrientItem from './NutrientItem';

interface MacroNutrientsProps {
  food: Food;
}

export const MacroNutrients: React.FC<MacroNutrientsProps> = ({ food }) => {
  return (
    <div>
      <h2 className="font-medium text-xl mb-4">Macronutriments</h2>
      <div className="space-y-4">
        <NutrientItem 
          label="Glucides" 
          value={food.nutrients.glucides} 
          unit="g" 
          color="bg-nutri-blue"
        />
        <NutrientItem 
          label="Protéines" 
          value={food.nutrients.proteines} 
          unit="g" 
          color="bg-nutri-red"
        />
        <NutrientItem 
          label="Lipides" 
          value={food.nutrients.lipides} 
          unit="g" 
          color="bg-nutri-yellow"
        />
        {food.nutrients.fibres && (
          <NutrientItem 
            label="Fibres" 
            value={food.nutrients.fibres} 
            unit="g" 
            color="bg-nutri-green"
          />
        )}
      </div>
    </div>
  );
};

export default MacroNutrients;
