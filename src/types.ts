
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
      [key: string]: NutrientGoal;
    };
    mineraux: {
      [key: string]: NutrientGoal;
    };
    oligoelements: {
      [key: string]: NutrientGoal;
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
      [key: string]: number;
    };
    mineraux?: {
      [key: string]: number;
    };
    oligoelements?: {
      [key: string]: number;
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
