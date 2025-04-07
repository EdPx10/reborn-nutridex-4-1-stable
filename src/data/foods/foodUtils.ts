
import { Food } from '@/types';
import { getFoods } from './index';
import { fetchFoodById, searchFoods } from '@/services/foodService';

// Function to filter foods with given criteria
export const getFilteredFoods = async (
  search: string = '',
  category?: string,
  benefit?: string,
  season?: string
): Promise<Food[]> => {
  try {
    // Use the Supabase search function
    const filteredFoods = await searchFoods(search, category, benefit, season);
    
    console.log(`Search: "${search}" - Found ${filteredFoods.length} matching foods`);
    
    return filteredFoods;
  } catch (error) {
    console.error('Error filtering foods:', error);
    return [];
  }
};

// Function to get a food by its ID
export const getFoodById = async (id: string): Promise<Food | null> => {
  try {
    return await fetchFoodById(id);
  } catch (error) {
    console.error(`Error retrieving food ${id}:`, error);
    return null;
  }
};
