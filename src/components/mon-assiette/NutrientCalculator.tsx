
import { Food } from '@/types';

interface FoodWithQuantity {
  food: Food;
  quantity: number;
}

export const calculateTotalNutrients = (items: FoodWithQuantity[]) => {
  // Initialiser les valeurs par défaut
  const totalNutrients = {
    glucides: 0,
    proteines: 0,
    lipides: 0,
    fibres: 0,
    lipids: {
      saturated: 0,
      monoUnsaturated: 0,
      polyUnsaturated: 0,
      omega3: 0,
      omega6: 0,
    },
    vitamines: {} as Record<string, number>,
    mineraux: {} as Record<string, number>,
    oligoelements: {} as Record<string, number>
  };
  
  // Calculer les totaux pour chaque aliment
  items.forEach(item => {
    const { food, quantity } = item;
    const portionRatio = quantity / food.portion.amount;
    
    // Macronutriments
    totalNutrients.glucides += (food.nutrients.glucides * portionRatio) || 0;
    totalNutrients.proteines += (food.nutrients.proteines * portionRatio) || 0;
    totalNutrients.lipides += (food.nutrients.lipides * portionRatio) || 0;
    
    if (food.nutrients.fibres) {
      totalNutrients.fibres += (food.nutrients.fibres * portionRatio) || 0;
    }
    
    // Détails des lipides - important de gérer le cas où lipids est undefined
    if (food.nutrients.lipids) {
      totalNutrients.lipids.saturated += (food.nutrients.lipids.saturated || 0) * portionRatio;
      totalNutrients.lipids.monoUnsaturated += (food.nutrients.lipids.monoUnsaturated || 0) * portionRatio;
      totalNutrients.lipids.polyUnsaturated += (food.nutrients.lipids.polyUnsaturated || 0) * portionRatio;
      totalNutrients.lipids.omega3 += (food.nutrients.lipids.omega3 || 0) * portionRatio;
      totalNutrients.lipids.omega6 += (food.nutrients.lipids.omega6 || 0) * portionRatio;
    }
    
    // Vitamines
    if (food.nutrients.vitamines) {
      Object.entries(food.nutrients.vitamines).forEach(([key, value]) => {
        if (!totalNutrients.vitamines[key]) {
          totalNutrients.vitamines[key] = 0;
        }
        totalNutrients.vitamines[key] += (value * portionRatio) || 0;
      });
    }
    
    // Minéraux
    if (food.nutrients.mineraux) {
      Object.entries(food.nutrients.mineraux).forEach(([key, value]) => {
        if (!totalNutrients.mineraux[key]) {
          totalNutrients.mineraux[key] = 0;
        }
        totalNutrients.mineraux[key] += (value * portionRatio) || 0;
      });
    }
    
    // Oligo-éléments
    if (food.nutrients.oligoelements) {
      Object.entries(food.nutrients.oligoelements).forEach(([key, value]) => {
        if (!totalNutrients.oligoelements[key]) {
          totalNutrients.oligoelements[key] = 0;
        }
        totalNutrients.oligoelements[key] += (value * portionRatio) || 0;
      });
    }
  });
  
  // Ensure the Omega-3 + Omega-6 don't exceed polyUnsaturated total (for data consistency)
  const totalOmegas = totalNutrients.lipids.omega3 + totalNutrients.lipids.omega6;
  if (totalOmegas > totalNutrients.lipids.polyUnsaturated && totalNutrients.lipids.polyUnsaturated > 0) {
    // Adjust omega values proportionally if their sum exceeds polyUnsaturated total
    const adjustmentRatio = totalNutrients.lipids.polyUnsaturated / totalOmegas;
    totalNutrients.lipids.omega3 *= adjustmentRatio;
    totalNutrients.lipids.omega6 *= adjustmentRatio;
  }
  
  return totalNutrients;
};
