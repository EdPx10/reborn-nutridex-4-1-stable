
import React from 'react';
import { Food } from '@/types';
import NutrientItem from './NutrientItem';

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

  // Filter out nutrients with value 0
  const filterNonZeroNutrients = (nutrients: Record<string, number>) => {
    return Object.entries(nutrients || {})
      .filter(([_, value]) => value > 0)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  };
  
  const vitamines = hasVitamins ? filterNonZeroNutrients(food.nutrients.vitamines!) : {};
  const mineraux = hasMinerals ? filterNonZeroNutrients(food.nutrients.mineraux!) : {};
  const oligoelements = hasOligoelements ? filterNonZeroNutrients(food.nutrients.oligoelements!) : {};
  
  return (
    <div className="grid grid-cols-1 gap-6">
      {Object.keys(vitamines).length > 0 && (
        <div>
          <h2 className="font-medium text-xl mb-3">Vitamines</h2>
          <div className="flex flex-wrap">
            {Object.entries(vitamines)
              .sort(([, a], [, b]) => b - a) // Sort by value (highest first)
              .map(([key, value]) => (
                <NutrientItem 
                  key={key}
                  label={formatVitaminLabel(key)}
                  value={value}
                  unit="mg"
                  nutrientKey={key}
                  category="vitamines"
                />
              ))}
          </div>
        </div>
      )}
      
      {Object.keys(mineraux).length > 0 && (
        <div>
          <h2 className="font-medium text-xl mb-3">Minéraux</h2>
          <div className="flex flex-wrap">
            {Object.entries(mineraux)
              .sort(([, a], [, b]) => b - a) // Sort by value (highest first)
              .map(([key, value]) => (
                <NutrientItem 
                  key={key}
                  label={formatMineralLabel(key)}
                  value={value}
                  unit="mg"
                  nutrientKey={key}
                  category="mineraux"
                />
              ))}
          </div>
        </div>
      )}
      
      {Object.keys(oligoelements).length > 0 && (
        <div>
          <h2 className="font-medium text-xl mb-3">Oligo-éléments</h2>
          <div className="flex flex-wrap">
            {Object.entries(oligoelements)
              .sort(([, a], [, b]) => b - a) // Sort by value (highest first)
              .map(([key, value]) => (
                <NutrientItem 
                  key={key}
                  label={formatOligoLabel(key)}
                  value={value}
                  unit="μg"
                  nutrientKey={key}
                  category="oligoelements"
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MicroNutrients;
