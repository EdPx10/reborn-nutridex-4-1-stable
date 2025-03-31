
import { PlateItem } from "@/store/dailyPlateStore";

export interface TotalNutrients {
  glucides: number;
  proteines: number;
  lipides: number;
  fibres: number;
  lipids: {
    saturated: number;
    monoUnsaturated: number;
    polyUnsaturated: number;
    omega3: number;
    omega6: number;
  };
  vitamines: {
    [key: string]: number;
  };
  mineraux: {
    [key: string]: number;
  };
}

export const calculateTotalNutrients = (items: PlateItem[]): TotalNutrients => {
  return items.reduce(
    (acc, { food, quantity, unit }) => {
      // Calculate the factor based on the food's portion and the quantity
      const factor = quantity / food.portion.amount;
      
      return {
        glucides: acc.glucides + food.nutrients.glucides * factor,
        proteines: acc.proteines + food.nutrients.proteines * factor,
        lipides: acc.lipides + food.nutrients.lipides * factor,
        fibres: acc.fibres + (food.nutrients.fibres || 0) * factor,
        // Sous-catégories de lipides
        lipids: {
          saturated: acc.lipids.saturated + ((food.nutrients.lipids?.saturated || 0) * factor),
          monoUnsaturated: acc.lipids.monoUnsaturated + ((food.nutrients.lipids?.monoUnsaturated || 0) * factor),
          polyUnsaturated: acc.lipids.polyUnsaturated + ((food.nutrients.lipids?.polyUnsaturated || 0) * factor),
          omega3: acc.lipids.omega3 + ((food.nutrients.lipids?.omega3 || 0) * factor),
          omega6: acc.lipids.omega6 + ((food.nutrients.lipids?.omega6 || 0) * factor),
        },
        // Micronutriments
        vitamines: {
          a: acc.vitamines.a + ((food.nutrients.vitamines?.a || 0) * factor),
          c: acc.vitamines.c + ((food.nutrients.vitamines?.c || 0) * factor),
          d: acc.vitamines.d + ((food.nutrients.vitamines?.d || 0) * factor),
          e: acc.vitamines.e + ((food.nutrients.vitamines?.e || 0) * factor),
          k: acc.vitamines.k + ((food.nutrients.vitamines?.k || 0) * factor),
          b1: acc.vitamines.b1 + ((food.nutrients.vitamines?.b1 || 0) * factor),
          b2: acc.vitamines.b2 + ((food.nutrients.vitamines?.b2 || 0) * factor),
          b3: acc.vitamines.b3 + ((food.nutrients.vitamines?.b3 || 0) * factor),
          b5: acc.vitamines.b5 + ((food.nutrients.vitamines?.b5 || 0) * factor),
          b6: acc.vitamines.b6 + ((food.nutrients.vitamines?.b6 || 0) * factor),
          b9: acc.vitamines.b9 + ((food.nutrients.vitamines?.b9 || 0) * factor),
          b12: acc.vitamines.b12 + ((food.nutrients.vitamines?.b12 || 0) * factor)
        },
        mineraux: {
          calcium: acc.mineraux.calcium + ((food.nutrients.mineraux?.calcium || 0) * factor),
          fer: acc.mineraux.fer + ((food.nutrients.mineraux?.fer || 0) * factor),
          magnesium: acc.mineraux.magnesium + ((food.nutrients.mineraux?.magnesium || 0) * factor),
          zinc: acc.mineraux.zinc + ((food.nutrients.mineraux?.zinc || 0) * factor),
          sodium: acc.mineraux.sodium + ((food.nutrients.mineraux?.sodium || 0) * factor),
          potassium: acc.mineraux.potassium + ((food.nutrients.mineraux?.potassium || 0) * factor),
          phosphore: acc.mineraux.phosphore + ((food.nutrients.mineraux?.phosphore || 0) * factor),
          iode: acc.mineraux.iode + ((food.nutrients.mineraux?.iode || 0) * factor),
          selenium: acc.mineraux.selenium + ((food.nutrients.mineraux?.selenium || 0) * factor)
        }
      };
    },
    { 
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
        a: 0, c: 0, d: 0, e: 0, k: 0, 
        b1: 0, b2: 0, b3: 0, b5: 0, b6: 0, b9: 0, b12: 0
      },
      mineraux: {
        calcium: 0, fer: 0, magnesium: 0, zinc: 0,
        sodium: 0, potassium: 0, phosphore: 0, iode: 0, selenium: 0
      }
    }
  );
};
