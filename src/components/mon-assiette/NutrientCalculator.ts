
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
    vitamines: {
      vitamineA: 0,
      vitamineD: 0,
      vitamineE: 0,
      vitamineK1: 0,
      vitamineC: 0,
      vitamineB1: 0,
      vitamineB2: 0,
      vitamineB3: 0,
      vitamineB5: 0,
      vitamineB6: 0,
      vitamineB8: 0,
      vitamineB9: 0,
      vitamineB12: 0
    },
    mineraux: {
      calcium: 0,
      magnesium: 0,
      phosphore: 0,
      potassium: 0,
      sodium: 0
    },
    oligoelements: {
      fer: 0,
      zinc: 0,
      cuivre: 0,
      manganese: 0,
      selenium: 0,
      iode: 0,
      chrome: 0,
      molybdene: 0
    }
  };
  
  const totals = items.reduce((total, item) => {
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
      total.lipids.omega3 += (food.nutrients.lipids.omega3 || 0) * conversionFactor;
      total.lipids.omega6 += (food.nutrients.lipids.omega6 || 0) * conversionFactor;
    } else {
      // Si les lipides détaillés ne sont pas disponibles, utiliser l'approximation de base
      total.lipids.saturated += (food.nutrients.lipides || 0) * 0.33 * conversionFactor;
      total.lipids.monoUnsaturated += (food.nutrients.lipides || 0) * 0.33 * conversionFactor;
      total.lipids.polyUnsaturated += (food.nutrients.lipides || 0) * 0.34 * conversionFactor;
    }
    
    // Vitamines
    if (food.nutrients.vitamines) {
      for (const [key, value] of Object.entries(food.nutrients.vitamines)) {
        if (key in total.vitamines && value !== undefined) {
          (total.vitamines as any)[key] += value * conversionFactor;
        }
      }
    }
    
    // Minéraux
    if (food.nutrients.mineraux) {
      for (const [key, value] of Object.entries(food.nutrients.mineraux)) {
        if (key in total.mineraux && value !== undefined) {
          (total.mineraux as any)[key] += value * conversionFactor;
        }
      }
    }
    
    // Oligo-éléments
    if (food.nutrients.oligoelements) {
      for (const [key, value] of Object.entries(food.nutrients.oligoelements)) {
        if (key in total.oligoelements && value !== undefined) {
          (total.oligoelements as any)[key] += value * conversionFactor;
        }
      }
    }
    
    return total;
  }, initialTotal);

  // Calculer les AGP comme Oméga-3 + Oméga-6
  totals.lipids.polyUnsaturated = totals.lipids.omega3 + totals.lipids.omega6;
  
  return totals;
};
