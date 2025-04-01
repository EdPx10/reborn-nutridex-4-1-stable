
export interface Food {
  id: string;
  name: string;
  category: FoodCategory;
  image?: string;
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
  healthBenefits: HealthBenefit[];
  seasons?: Season[];
  portion: {
    amount: number;
    unit: string;
  };
}

export type FoodCategory = 
  | 'fruit' 
  | 'legume' 
  | 'poisson' 
  | 'viande' 
  | 'cereales'
  | 'noix'
  | 'legumineuse';

export type HealthBenefit = 
  | 'antioxydant'
  | 'antiInflammatoire'
  | 'santeIntestinale'
  | 'santeCardiac'
  | 'santeCerebrale'
  | 'immunitaire';

export type Season = 'printemps' | 'ete' | 'automne' | 'hiver';

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
  weight?: number;
  height?: number;
  age?: number;
  goals: {
    glucides: NutrientGoal;
    proteines: NutrientGoal;
    lipides: NutrientGoal;
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
  isActive: boolean;
}

export interface DailyConsumption {
  date: string;
  foods: {
    foodId: string;
    quantity: number;
  }[];
}
