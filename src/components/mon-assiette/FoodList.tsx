
import React from 'react';
import { PlateItem } from '@/store/dailyPlateStore';
import ConsumedFoodItem from './ConsumedFoodItem';

interface FoodListProps {
  items: PlateItem[];
  onRemoveItem: (foodId: string) => void;
  onUpdateItem: (foodId: string, quantity: number, unit: string) => void;
}

export const FoodList: React.FC<FoodListProps> = ({ items, onRemoveItem, onUpdateItem }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg border border-gray-100">
        <p className="text-gray-500">Aucun aliment ajouté à votre assiette</p>
        <p className="text-sm text-gray-400 mt-2">
          Recherchez et ajoutez des aliments pour suivre vos apports nutritionnels
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <ConsumedFoodItem 
          key={`${item.food.id}-${item.addedAt.toISOString()}`}
          item={item}
          onRemove={() => onRemoveItem(item.food.id)}
          onUpdate={(quantity, unit) => onUpdateItem(item.food.id, quantity, unit)}
        />
      ))}
    </div>
  );
};

export default FoodList;
