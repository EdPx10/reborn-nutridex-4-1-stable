import { foods } from './index';

export const getFilteredFoods = (
  search: string = '',
  category?: string,
  benefit?: string,
  season?: string
) => {
  return foods.filter(food => {
    // Search filtering logic - only match foods whose name contains the search string
    const matchesSearch = search === '' || 
      food.name.toLowerCase().includes(search.toLowerCase());
    
    // Category filtering remains the same
    const matchesCategory = !category || food.category === category;
    
    // Health benefit filtering remains the same
    const matchesBenefit = !benefit || 
      food.healthBenefits.includes(benefit as any);
    
    // Season filtering remains the same
    const matchesSeason = !season || 
      (food.seasons && food.seasons.includes(season as any));
    
    return matchesSearch && matchesCategory && matchesBenefit && matchesSeason;
  });
};

export const getFoodById = (id: string) => {
  return foods.find(food => food.id === id);
};
