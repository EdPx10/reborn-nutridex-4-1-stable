
import React from 'react';
import { Food } from '@/types';
import NutrientSection from './NutrientSection';

interface MacroNutrientsProps {
  food: Food;
}

export const MacroNutrients: React.FC<MacroNutrientsProps> = ({ food }) => {
  // Créer un objet pour les macronutriments
  const macros = {
    glucides: food.nutrients.glucides || 0,
    proteines: food.nutrients.proteines || 0,
    lipides: food.nutrients.lipides || 0,
    fibres: food.nutrients.fibres || 0,
  };
  
  // Formatter les labels pour les macronutriments
  const formatMacroLabel = (key: string) => key.charAt(0).toUpperCase() + key.slice(1);
  
  // Vérifier si des détails de lipides sont disponibles
  const lipidDetails = food.nutrients.lipids || null;
  
  return (
    <div className="space-y-4">
      <NutrientSection
        title="Macronutriments"
        nutrients={macros}
        unit="g"
        labelFormatter={formatMacroLabel}
        category="macro"
      />
      
      {lipidDetails && Object.keys(lipidDetails).length > 0 && (
        <NutrientSection
          title="Détails des lipides"
          nutrients={lipidDetails}
          unit="g"
          labelFormatter={(key) => {
            const labels: Record<string, string> = {
              saturated: 'Saturés',
              monoUnsaturated: 'Mono-insaturés',
              polyUnsaturated: 'Poly-insaturés',
              omega3: 'Oméga-3',
              omega6: 'Oméga-6',
            };
            return labels[key] || key;
          }}
        />
      )}
    </div>
  );
};

export default MacroNutrients;
