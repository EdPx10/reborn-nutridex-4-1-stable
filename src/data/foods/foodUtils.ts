
import { Food } from '@/types';
import { getFoods } from './index';
import { fetchFoodById, searchFoods } from '@/services/foodService';

// Fonction pour filtrer les aliments avec les critères donnés
export const getFilteredFoods = async (
  search: string = '',
  category?: string,
  benefit?: string,
  season?: string
): Promise<Food[]> => {
  try {
    // Utiliser la fonction de recherche de Supabase
    const filteredFoods = await searchFoods(search, category, benefit, season);
    
    console.log(`Search: "${search}" - Found ${filteredFoods.length} matching foods`);
    
    return filteredFoods;
  } catch (error) {
    console.error('Erreur lors du filtrage des aliments:', error);
    return [];
  }
};

// Fonction pour obtenir un aliment par son ID
export const getFoodById = async (id: string): Promise<Food | null> => {
  try {
    return await fetchFoodById(id);
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'aliment ${id}:`, error);
    return null;
  }
};
