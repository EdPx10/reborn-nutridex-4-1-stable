
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
    totalNutrients.glucides += (food.nutrients.glucides * portionRatio);
    totalNutrients.proteines += (food.nutrients.proteines * portionRatio);
    totalNutrients.lipides += (food.nutrients.lipides * portionRatio);
    
    if (food.nutrients.fibres) {
      totalNutrients.fibres += (food.nutrients.fibres * portionRatio);
    }
    
    // Détails des lipides
    if (food.nutrients.lipids) {
      totalNutrients.lipids.saturated += (food.nutrients.lipids.saturated * portionRatio) || 0;
      totalNutrients.lipids.monoUnsaturated += (food.nutrients.lipids.monoUnsaturated * portionRatio) || 0;
      totalNutrients.lipids.polyUnsaturated += (food.nutrients.lipids.polyUnsaturated * portionRatio) || 0;
      totalNutrients.lipids.omega3 += (food.nutrients.lipids.omega3 * portionRatio) || 0;
      totalNutrients.lipids.omega6 += (food.nutrients.lipids.omega6 * portionRatio) || 0;
    }
    
    // Vitamines
    if (food.nutrients.vitamines) {
      Object.entries(food.nutrients.vitamines).forEach(([key, value]) => {
        if (!totalNutrients.vitamines[key]) {
          totalNutrients.vitamines[key] = 0;
        }
        totalNutrients.vitamines[key] += (value * portionRatio);
      });
    }
    
    // Minéraux
    if (food.nutrients.mineraux) {
      Object.entries(food.nutrients.mineraux).forEach(([key, value]) => {
        if (!totalNutrients.mineraux[key]) {
          totalNutrients.mineraux[key] = 0;
        }
        totalNutrients.mineraux[key] += (value * portionRatio);
      });
    }
    
    // Oligo-éléments
    if (food.nutrients.oligoelements) {
      Object.entries(food.nutrients.oligoelements).forEach(([key, value]) => {
        if (!totalNutrients.oligoelements[key]) {
          totalNutrients.oligoelements[key] = 0;
        }
        totalNutrients.oligoelements[key] += (value * portionRatio);
      });
    }
  });
  
  return totalNutrients;
};
