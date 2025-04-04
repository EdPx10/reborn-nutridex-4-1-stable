
import React from 'react';
import { Food } from '@/types';
import NutrientSection from './NutrientSection';

interface MicroNutrientsProps {
  food: Food;
}

export const MicroNutrients: React.FC<MicroNutrientsProps> = ({ food }) => {
  // Format labels for vitamins
  const formatVitaminLabel = (key: string) => {
    if (key.startsWith('vitamine')) {
      const letter = key.replace('vitamine', '');
      return `Vit. ${letter.toUpperCase()}`;
    }
    return key;
  };
  
  // Format labels for minerals and oligo-elements
  const formatNutrientLabel = (key: string) => key.charAt(0).toUpperCase() + key.slice(1);
  
  const hasVitamins = food.nutrients.vitamines && Object.values(food.nutrients.vitamines).some(val => val && val > 0);
  const hasMinerals = food.nutrients.mineraux && Object.values(food.nutrients.mineraux).some(val => val && val > 0);
  const hasOligoelements = food.nutrients.oligoelements && Object.values(food.nutrients.oligoelements).some(val => val && val > 0);
  
  if (!hasVitamins && !hasMinerals && !hasOligoelements) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {hasVitamins && (
        <NutrientSection
          title="Vitamines"
          nutrients={food.nutrients.vitamines || {}}
          unit="µg"
          labelFormatter={formatVitaminLabel}
          category="vitamines"
        />
      )}
      
      {hasMinerals && (
        <NutrientSection
          title="Minéraux"
          nutrients={food.nutrients.mineraux || {}}
          unit="mg"
          labelFormatter={formatNutrientLabel}
          category="mineraux"
        />
      )}
      
      {hasOligoelements && (
        <NutrientSection
          title="Oligo-éléments"
          nutrients={food.nutrients.oligoelements || {}}
          unit="µg"
          labelFormatter={formatNutrientLabel}
          category="oligoelements"
        />
      )}
    </div>
  );
};

export default MicroNutrients;
