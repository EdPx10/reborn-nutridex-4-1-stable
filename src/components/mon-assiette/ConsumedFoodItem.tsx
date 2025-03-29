
import React from 'react';
import { Food } from '@/types';
import { Check, Trash2 } from 'lucide-react';
import { NutrientBadge } from '@/components/ui/NutrientBadge';
import { foodCategories } from '@/data/healthBenefits';

interface ConsumedFoodItemProps {
  item: {
    food: Food;
    quantity: number;
  };
  onRemove: () => void;
}

export const ConsumedFoodItem: React.FC<ConsumedFoodItemProps> = ({ item, onRemove }) => {
  const { food, quantity } = item;
  const categoryInfo = foodCategories.find(c => c.id === food.category);
  
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-4 flex items-center gap-3">
      {food.image ? (
        <img 
          src={food.image} 
          alt={food.name} 
          className="w-16 h-16 rounded-md object-cover"
        />
      ) : (
        <div className={`w-16 h-16 rounded-md flex items-center justify-center ${categoryInfo?.color || 'bg-gray-100'}`}>
          {food.name.charAt(0)}
        </div>
      )}
      
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{food.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${categoryInfo?.color || 'bg-gray-100'}`}>
              {categoryInfo?.name || food.category}
            </span>
          </div>
          <button onClick={onRemove} className="p-1 text-gray-400 hover:text-red-500">
            <Trash2 size={16} />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {food.healthBenefits.slice(0, 2).map((benefit) => (
            <NutrientBadge 
              key={benefit} 
              type={benefit} 
              showName={false} 
            />
          ))}
          {food.healthBenefits.length > 2 && (
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100">
              +{food.healthBenefits.length - 2}
            </span>
          )}
        </div>
      </div>
      
      <div className="text-right">
        <div className="font-medium">
          {quantity}{food.portion.unit}
        </div>
        <div className="text-sm text-gray-500 mt-1">
          <Check size={12} className="inline-block text-nutri-green" />
        </div>
      </div>
    </div>
  );
};

export default ConsumedFoodItem;
