
import { Food } from '@/types';
import { fetchAllFoods } from '@/services/foodService';

// Variable pour stocker les aliments une fois chargés
let cachedFoods: Food[] = [];

// Fonction pour obtenir tous les aliments
export const getFoods = async (): Promise<Food[]> => {
  if (cachedFoods.length === 0) {
    cachedFoods = await fetchAllFoods();
  }
  return cachedFoods;
};

// Re-export les fonctions de filtrage
export { getFilteredFoods, getFoodById } from './foodUtils';
