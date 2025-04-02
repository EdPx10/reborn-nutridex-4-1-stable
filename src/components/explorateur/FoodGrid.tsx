
import React from 'react';
import { Food } from '@/types';
import FoodCard from '@/components/ui/FoodCard';

interface FoodGridProps {
  foods: Food[];
}

const FoodGrid: React.FC<FoodGridProps> = ({ foods }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {foods.map(food => (
        <FoodCard 
          key={food.id} 
          food={food}
        />
      ))}
      {foods.length === 0 && (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">Aucun aliment ne correspond à vos critères</p>
        </div>
      )}
    </div>
  );
};

export { FoodGrid, type FoodGridProps };
