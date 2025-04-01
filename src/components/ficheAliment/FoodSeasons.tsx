
import React from 'react';
import { Food } from '@/types';

interface FoodSeasonsProps {
  food: Food;
}

export const FoodSeasons: React.FC<FoodSeasonsProps> = ({ food }) => {
  if (!food.seasons || food.seasons.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-10">
      <h2 className="font-medium text-xl mb-4">Saisons</h2>
      <div className="flex flex-wrap gap-2">
        {food.seasons.map((season) => (
          <span 
            key={season}
            className="px-3 py-1 bg-nutri-light text-nutri-green rounded-full text-sm"
          >
            {season.charAt(0).toUpperCase() + season.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FoodSeasons;
