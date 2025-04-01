
import React from 'react';
import { Food } from '@/types';
import NutrientSection from './NutrientSection';

interface MicroNutrientsProps {
  food: Food;
}

export const MicroNutrients: React.FC<MicroNutrientsProps> = ({ food }) => {
  // Format labels for vitamins and minerals
  const formatVitaminLabel = (key: string) => `Vitamine ${key.toUpperCase()}`;
  const formatMineralLabel = (key: string) => key.charAt(0).toUpperCase() + key.slice(1);
  
  const hasVitamins = food.nutrients.vitamines && Object.keys(food.nutrients.vitamines).length > 0;
  const hasMinerals = food.nutrients.mineraux && Object.keys(food.nutrients.mineraux).length > 0;
  
  // We'll eventually use these for trace elements (oligoéléments)
  const hasOligoelements = false; // Placeholder for future implementation
  const oligoelements = {}; // Placeholder for future implementation
  
  if (!hasVitamins && !hasMinerals && !hasOligoelements) {
    return null;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {hasVitamins && (
        <NutrientSection
          title="Vitamines"
          nutrients={food.nutrients.vitamines || {}}
          unit="mg"
          color="bg-nutri-orange"
          labelFormatter={formatVitaminLabel}
          calculateProportions={true}
        />
      )}
      
      {hasMinerals && (
        <NutrientSection
          title="Minéraux"
          nutrients={food.nutrients.mineraux || {}}
          unit="mg"
          color="bg-nutri-purple"
          labelFormatter={formatMineralLabel}
          calculateProportions={true}
        />
      )}
      
      {hasOligoelements && (
        <NutrientSection
          title="Oligo-éléments"
          nutrients={oligoelements}
          unit="μg"
          color="bg-nutri-blue"
          calculateProportions={true}
        />
      )}
    </div>
  );
};

export default MicroNutrients;
