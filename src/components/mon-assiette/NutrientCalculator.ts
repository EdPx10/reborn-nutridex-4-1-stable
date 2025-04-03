
import { PlateItem } from '@/store/dailyPlateStore';

export const calculateTotalNutrients = (items: PlateItem[]) => {
  const initialTotal = {
    glucides: 0,
    proteines: 0,
    lipides: 0,
    fibres: 0,
    lipids: {
      saturated: 0,
      monoUnsaturated: 0,
      polyUnsaturated: 0,
      omega3: 0,
      omega6: 0
    },
    vitamines: {} as { [key: string]: number },
    mineraux: {} as { [key: string]: number },
    oligoelements: {} as { [key: string]: number }
  };
  
  return items.reduce((total, item) => {
    const { food, quantity, unit } = item;
    const conversionFactor = (unit === food.portion.unit) 
      ? quantity / food.portion.amount 
      : quantity; // Besoin d'améliorer la gestion des conversions d'unités
    
    // Macronutriments de base
    total.glucides += (food.nutrients.glucides || 0) * conversionFactor;
    total.proteines += (food.nutrients.proteines || 0) * conversionFactor;
    total.lipides += (food.nutrients.lipides || 0) * conversionFactor;
    total.fibres += (food.nutrients.fibres || 0) * conversionFactor;
    
    // Lipides détaillés
    if (food.nutrients.lipids) {
      total.lipids.saturated += (food.nutrients.lipids.saturated || 0) * conversionFactor;
      total.lipids.monoUnsaturated += (food.nutrients.lipids.monoUnsaturated || 0) * conversionFactor;
      total.lipids.polyUnsaturated += (food.nutrients.lipids.polyUnsaturated || 0) * conversionFactor;
      total.lipids.omega3 += (food.nutrients.lipids.omega3 || 0) * conversionFactor;
      total.lipids.omega6 += (food.nutrients.lipids.omega6 || 0) * conversionFactor;
    }
    
    // Vitamines
    if (food.nutrients.vitamines) {
      Object.entries(food.nutrients.vitamines).forEach(([key, value]) => {
        if (!total.vitamines[key]) {
          total.vitamines[key] = 0;
        }
        total.vitamines[key] += value * conversionFactor;
      });
    }
    
    // Minéraux
    if (food.nutrients.mineraux) {
      Object.entries(food.nutrients.mineraux).forEach(([key, value]) => {
        if (!total.mineraux[key]) {
          total.mineraux[key] = 0;
        }
        total.mineraux[key] += value * conversionFactor;
      });
    }
    
    // Oligo-éléments
    if (food.nutrients.oligoelements) {
      Object.entries(food.nutrients.oligoelements).forEach(([key, value]) => {
        if (!total.oligoelements[key]) {
          total.oligoelements[key] = 0;
        }
        total.oligoelements[key] += value * conversionFactor;
      });
    }
    
    return total;
  }, initialTotal);
};
