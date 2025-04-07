
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

// Map English nutrient slugs to French property names
const NUTRIENT_SLUG_MAP = {
  'proteins': 'proteines',
  'carbohydrates': 'glucides',
  'fats': 'lipides',
  'fiber': 'fibres'
};

// Function to map Supabase data to Food format
const mapSupabaseDataToFood = async (foodData: any): Promise<Food> => {
  // Fetch relevant nutrients for this food
  const { data: nutrientsData, error } = await supabase
    .from('food_nutrients')
    .select(`
      *,
      nutrient:nutrients(*)
    `)
    .eq('food_id', foodData.id)
    .in('nutrient.slug', ['proteins', 'carbohydrates', 'fats', 'fiber']);

  if (error) {
    console.error('Error fetching nutrients:', error);
  }

  // Initialize nutrients with default values
  const nutrients: any = {
    glucides: 0,
    proteines: 0,
    lipides: 0,
    fibres: 0
  };

  // Map nutrients if available
  if (nutrientsData && nutrientsData.length > 0) {
    nutrientsData.forEach((item: NutrientData) => {
      const nutrientSlug = item.nutrient.slug;
      const value = item.value;

      // Map English slug to French property name
      if (nutrientSlug in NUTRIENT_SLUG_MAP) {
        const frenchProperty = NUTRIENT_SLUG_MAP[nutrientSlug as keyof typeof NUTRIENT_SLUG_MAP];
        nutrients[frenchProperty] = value;
      }
    });
  }

  // Convert food data to expected format
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

// Fetch all foods from Supabase
export const fetchAllFoods = async (): Promise<Food[]> => {
  try {
    const { data, error } = await supabase
      .from('foods')
      .select('*');

    if (error) {
      console.error('Error fetching foods:', error);
      return [];
    }

    console.log(`Retrieved ${data.length} foods from database`);
    
    // Transform each food to Food format
    const foodsPromises = data.map(mapSupabaseDataToFood);
    return Promise.all(foodsPromises);
  } catch (error) {
    console.error('Error fetching foods:', error);
    return [];
  }
};

// Fetch a food by ID
export const fetchFoodById = async (id: string): Promise<Food | null> => {
  try {
    const { data, error } = await supabase
      .from('foods')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('Error fetching food:', error);
      return null;
    }

    return mapSupabaseDataToFood(data);
  } catch (error) {
    console.error('Error fetching food:', error);
    return null;
  }
};

// Search foods with filters
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
      console.error('Error searching foods:', error);
      return [];
    }
    
    console.log(`Search returned ${data.length} foods`);
    
    // Transform each food to Food format
    const foodsPromises = data.map(mapSupabaseDataToFood);
    return Promise.all(foodsPromises);
  } catch (error) {
    console.error('Error searching foods:', error);
    return [];
  }
};
