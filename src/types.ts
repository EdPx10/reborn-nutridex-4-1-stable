
// Types alimentaires
export type HealthBenefit = 'santeCerebrale' | 'santeCardiac' | 'antiInflammatoire' | 'santeIntestinale' | 'antioxydant' | 'immunitaire';
export type FoodCategory = 'fruit' | 'legume' | 'poisson' | 'viande' | 'cereales' | 'noix' | 'legumineuse';
export type Season = 'printemps' | 'ete' | 'automne' | 'hiver';

// Types de profil utilisateur
export interface NutrientGoal {
  current: number;
  goal: number;
  unit: string;
  recommended?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  gender: 'homme' | 'femme' | 'autre';
  weight: number;
  height: number;
  age: number;
  goals: {
    glucides: NutrientGoal;
    proteines: NutrientGoal;
    lipides: NutrientGoal;
    // Ajout des objectifs détaillés pour les lipides
    lipids?: {
      saturated: NutrientGoal;
      monoUnsaturated: NutrientGoal;
      polyUnsaturated: NutrientGoal;
      omega3: NutrientGoal;
      omega6: NutrientGoal;
    };
    fibres: NutrientGoal;
    vitamines: {
      vitamineA: NutrientGoal;
      vitamineD: NutrientGoal;
      vitamineE: NutrientGoal;
      vitamineK1: NutrientGoal;
      vitamineC: NutrientGoal;
      vitamineB1: NutrientGoal;
      vitamineB2: NutrientGoal;
      vitamineB3: NutrientGoal;
      vitamineB5: NutrientGoal;
      vitamineB6: NutrientGoal;
      vitamineB8: NutrientGoal;
      vitamineB9: NutrientGoal;
      vitamineB12: NutrientGoal;
    };
    mineraux: {
      calcium: NutrientGoal;
      magnesium: NutrientGoal;
      phosphore: NutrientGoal;
      potassium: NutrientGoal;
      sodium: NutrientGoal;
    };
    oligoelements: {
      fer: NutrientGoal;
      zinc: NutrientGoal;
      cuivre: NutrientGoal;
      manganese: NutrientGoal;
      selenium: NutrientGoal;
      iode: NutrientGoal;
      chrome: NutrientGoal;
      molybdene: NutrientGoal;
    };
  };
}

// Type d'aliment
export interface Food {
  id: string;
  name: string;
  category: FoodCategory;
  image?: string;
  description?: string;
  healthBenefits: HealthBenefit[];
  nutrients: {
    glucides: number;
    proteines: number;
    lipides: number;
    fibres?: number;
    lipids?: {
      saturated: number;
      monoUnsaturated: number;
      polyUnsaturated: number;
      omega3: number;
      omega6: number;
    };
    vitamines?: {
      vitamineA?: number;
      vitamineD?: number;
      vitamineE?: number;
      vitamineK1?: number;
      vitamineC?: number;
      vitamineB1?: number;
      vitamineB2?: number;
      vitamineB3?: number;
      vitamineB5?: number;
      vitamineB6?: number;
      vitamineB8?: number;
      vitamineB9?: number;
      vitamineB12?: number;
    };
    mineraux?: {
      calcium?: number;
      magnesium?: number;
      phosphore?: number;
      potassium?: number;
      sodium?: number;
    };
    oligoelements?: {
      fer?: number;
      zinc?: number;
      cuivre?: number;
      manganese?: number;
      selenium?: number;
      iode?: number;
      chrome?: number;
      molybdene?: number;
    };
  };
  seasons?: Season[];
  portion: {
    amount: number;
    unit: string;
  };
}

// Types de l'assiette quotidienne
export interface PlateItem {
  id: string;
  food: Food;
  quantity: number;
  unit: string;
  addedAt: Date;
}
