
import { supabase } from '@/integrations/supabase/client';
import { Food } from '@/types';

interface NutrientData {
  id: string;
  nutrient_id: string;
  value: number;
  nutrient: {
    name: string;
    slug: string;
    category: string;
    unit: string;
  };
}

// Fonction pour transformer les données Supabase en format Food
const mapSupabaseDataToFood = async (foodData: any): Promise<Food> => {
  // Récupérer uniquement les nutriments pertinents pour cet aliment
  const { data: nutrientsData } = await supabase
    .from('food_nutrients')
    .select(`
      *,
      nutrient:nutrients(*)
    `)
    .eq('food_id', foodData.id)
    .in('nutrient.slug', ['proteines', 'glucides', 'lipides', 'fibres']);

  // Initialiser les nutriments avec des valeurs par défaut
  const nutrients: any = {
    glucides: 0,
    proteines: 0,
    lipides: 0,
    fibres: 0
  };

  // Assigner les valeurs des nutriments si disponibles
  if (nutrientsData) {
    nutrientsData.forEach((item: NutrientData) => {
      const nutrientSlug = item.nutrient.slug;
      const value = item.value;

      switch (nutrientSlug) {
        case 'proteines':
          nutrients.proteines = value;
          break;
        case 'glucides':
          nutrients.glucides = value;
          break;
        case 'lipides':
          nutrients.lipides = value;
          break;
        case 'fibres':
          nutrients.fibres = value;
          break;
      }
    });
  }

  // Convertir les données de l'aliment au format attendu
  return {
    id: foodData.id,
    name: foodData.name,
    category: foodData.category,
    image: foodData.image_url,
    seasons: foodData.seasons || [],
    healthBenefits: foodData.health_benefits || [],
    nutrients,
    portion: {
      amount: 100,
      unit: 'g'
    }
  };
};

// Récupérer tous les aliments depuis Supabase
export const fetchAllFoods = async (): Promise<Food[]> => {
  try {
    const { data, error } = await supabase
      .from('foods')
      .select('*');

    if (error) {
      console.error('Erreur lors de la récupération des aliments:', error);
      return [];
    }

    // Transformer chaque aliment au format Food
    const foodsPromises = data.map(mapSupabaseDataToFood);
    return Promise.all(foodsPromises);
  } catch (error) {
    console.error('Erreur lors de la récupération des aliments:', error);
    return [];
  }
};

// Récupérer un aliment par son ID
export const fetchFoodById = async (id: string): Promise<Food | null> => {
  try {
    const { data, error } = await supabase
      .from('foods')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('Erreur lors de la récupération de l\'aliment:', error);
      return null;
    }

    return mapSupabaseDataToFood(data);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'aliment:', error);
    return null;
  }
};

// Recherche d'aliments avec filtres
export const searchFoods = async (
  searchTerm: string = '',
  category?: string,
  benefit?: string,
  season?: string
): Promise<Food[]> => {
  try {
    let query = supabase.from('foods').select('*');
    
    if (searchTerm) {
      query = query.ilike('name', `%${searchTerm}%`);
    }
    
    if (category) {
      query = query.eq('category', category);
    }
    
    if (benefit && benefit.trim() !== '') {
      query = query.contains('health_benefits', [benefit]);
    }
    
    if (season && season.trim() !== '') {
      query = query.contains('seasons', [season]);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Erreur lors de la recherche des aliments:', error);
      return [];
    }
    
    // Transformer chaque aliment au format Food
    const foodsPromises = data.map(mapSupabaseDataToFood);
    return Promise.all(foodsPromises);
  } catch (error) {
    console.error('Erreur lors de la recherche des aliments:', error);
    return [];
  }
};
