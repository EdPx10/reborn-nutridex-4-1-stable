
import React from 'react';
import { Food } from '@/types';
import NutrientItem from './NutrientItem';
import NutrientSection from './NutrientSection';

interface MicroNutrientsProps {
  food: Food;
}

export const MicroNutrients: React.FC<MicroNutrientsProps> = ({ food }) => {
  // Format labels for vitamins and minerals
  const formatVitaminLabel = (key: string) => `Vit ${key.toUpperCase()}`;
  const formatMineralLabel = (key: string) => key.charAt(0).toUpperCase() + key.slice(1);
  const formatOligoLabel = (key: string) => key.charAt(0).toUpperCase() + key.slice(1);
  
  const hasVitamins = food.nutrients.vitamines && Object.keys(food.nutrients.vitamines).length > 0;
  const hasMinerals = food.nutrients.mineraux && Object.keys(food.nutrients.mineraux).length > 0;
  const hasOligoelements = food.nutrients.oligoelements && Object.keys(food.nutrients.oligoelements).length > 0;
  
  if (!hasVitamins && !hasMinerals && !hasOligoelements) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {hasVitamins && (
        <NutrientSection
          title="Vitamines"
          nutrients={food.nutrients.vitamines || {}}
          unit="mg"
          labelFormatter={formatVitaminLabel}
          category="vitamines"
        />
      )}
      
      {hasMinerals && (
        <NutrientSection
          title="Minéraux"
          nutrients={food.nutrients.mineraux || {}}
          unit="mg"
          labelFormatter={formatMineralLabel}
          category="mineraux"
        />
      )}
      
      {hasOligoelements && (
        <NutrientSection
          title="Oligo-éléments"
          nutrients={food.nutrients.oligoelements || {}}
          unit="μg"
          labelFormatter={formatOligoLabel}
          category="oligoelements"
        />
      )}
    </div>
  );
};

export default MicroNutrients;
