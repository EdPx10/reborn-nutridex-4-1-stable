
import React from 'react';
import { Food } from '@/types';
import { NutrientBadge } from '@/components/ui/NutrientBadge';

interface HealthBenefitsProps {
  food: Food;
}

export const HealthBenefits: React.FC<HealthBenefitsProps> = ({ food }) => {
  return (
    <div className="mt-10">
      <h2 className="font-medium text-xl mb-4">Bienfaits pour la santé</h2>
      <div className="flex flex-wrap gap-2">
        {food.healthBenefits.map((benefit) => (
          <NutrientBadge key={benefit} type={benefit} />
        ))}
      </div>
    </div>
  );
};

export default HealthBenefits;
