
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
  // Récupérer les nutriments liés à cet aliment
  const { data: nutrientsData } = await supabase
    .from('food_nutrients')
    .select(`
      *,
      nutrient:nutrients(*)
    `)
    .eq('food_id', foodData.id);

  // Organiser les nutriments par catégorie
  const nutrients: any = {
    glucides: 0,
    proteines: 0,
    lipides: 0,
    fibres: 0
  };

  // Vitamines, minéraux et oligoéléments
  const vitamines: Record<string, number> = {};
  const mineraux: Record<string, number> = {};
  const oligoelements: Record<string, number> = {};

  if (nutrientsData) {
    nutrientsData.forEach((item: NutrientData) => {
      const nutrientSlug = item.nutrient.slug;
      const value = item.value;

      // Assigner les valeurs en fonction des slugs
      if (nutrientSlug === 'glucides') nutrients.glucides = value;
      else if (nutrientSlug === 'proteines') nutrients.proteines = value;
      else if (nutrientSlug === 'lipides') nutrients.lipides = value;
      else if (nutrientSlug === 'fibres') nutrients.fibres = value;
      else {
        // Catégoriser par type de nutriment
        const category = item.nutrient.category;
        if (category === 'vitamine') {
          // Conversion des clés de vitamines au format attendu (vitamineC, vitamineB12, etc.)
          const vitamineName = nutrientSlug.startsWith('vitamine') 
            ? nutrientSlug 
            : `vitamine${nutrientSlug.toUpperCase()}`;
          vitamines[vitamineName] = value;
        } else if (category === 'mineral') {
          mineraux[nutrientSlug] = value;
        } else if (category === 'oligoelement') {
          oligoelements[nutrientSlug] = value;
        }
      }
    });
  }

  // Ajouter les catégories si des valeurs existent
  if (Object.keys(vitamines).length > 0) nutrients.vitamines = vitamines;
  if (Object.keys(mineraux).length > 0) nutrients.mineraux = mineraux;
  if (Object.keys(oligoelements).length > 0) nutrients.oligoelements = oligoelements;

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
      query = query.ilike('name', `${searchTerm}%`);
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
