import { foods } from './index';

export const getFilteredFoods = (
  search: string = '',
  category?: string,
  benefit?: string,
  season?: string
) => {
  let filteredFoods = [...foods];
  
  if (search && search.trim() !== '') {
    const normalizedSearch = search.trim().toLowerCase();
    filteredFoods = filteredFoods.filter(food => 
      food.name.toLowerCase().startsWith(normalizedSearch)
    );
  }
  
  if (category) {
    filteredFoods = filteredFoods.filter(food => food.category === category);
  }
  
  if (benefit) {
    filteredFoods = filteredFoods.filter(food => 
      food.healthBenefits.includes(benefit as any)
    );
  }
  
  if (season) {
    filteredFoods = filteredFoods.filter(food => 
      food.seasons && food.seasons.includes(season as any)
    );
  }
  
  console.log(`Search: "${search}" - Found ${filteredFoods.length} matching foods`);
  
  return filteredFoods;
};

export const getFoodById = (id: string) => {
  return foods.find(food => food.id === id);
};
