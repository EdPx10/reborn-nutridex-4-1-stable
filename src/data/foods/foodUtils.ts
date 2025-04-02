
import { foods } from './index';

export const getFilteredFoods = (
  search: string = '',
  category?: string,
  benefit?: string,
  season?: string
) => {
  return foods.filter(food => {
    const matchesSearch = search === '' || 
      food.name.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = !category || food.category === category;
    
    const matchesBenefit = !benefit || 
      food.healthBenefits.includes(benefit as any);
    
    // Fixed season filtering logic
    const matchesSeason = !season || 
      (food.seasons && food.seasons.includes(season as any));
    
    return matchesSearch && matchesCategory && matchesBenefit && matchesSeason;
  });
};

export const getFoodById = (id: string) => {
  return foods.find(food => food.id === id);
};
