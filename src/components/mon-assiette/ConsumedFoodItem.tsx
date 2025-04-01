
import React from 'react';
import { Trash2 } from 'lucide-react';
import { NutrientBadge } from '@/components/ui/NutrientBadge';
import { foodCategories } from '@/data/healthBenefits';
import { PlateItem } from '@/store/dailyPlateStore';

interface ConsumedFoodItemProps {
  item: PlateItem;
  onRemove: () => void;
}

export const ConsumedFoodItem: React.FC<ConsumedFoodItemProps> = ({ item, onRemove }) => {
  const { food, quantity, unit } = item;
  const categoryInfo = foodCategories.find(c => c.id === food.category);
  
  // Calculate the nutrients based on the quantity
  const factor = quantity / food.portion.amount;
  const calculatedNutrients = {
    glucides: Math.round(food.nutrients.glucides * factor * 10) / 10,
    proteines: Math.round(food.nutrients.proteines * factor * 10) / 10,
    lipides: Math.round(food.nutrients.lipides * factor * 10) / 10,
  };
  
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
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${categoryInfo?.color || 'bg-gray-100'}`}>
                {categoryInfo?.name || food.category}
              </span>
              <span className="text-xs text-gray-500">
                {quantity} {unit}
              </span>
            </div>
          </div>
          <button onClick={onRemove} className="p-1 text-gray-400 hover:text-red-500">
            <Trash2 size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
          <div>
            <p className="text-gray-500">Glucides</p>
            <p className="font-medium">{calculatedNutrients.glucides}g</p>
          </div>
          <div>
            <p className="text-gray-500">Protéines</p>
            <p className="font-medium">{calculatedNutrients.proteines}g</p>
          </div>
          <div>
            <p className="text-gray-500">Lipides</p>
            <p className="font-medium">{calculatedNutrients.lipides}g</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {food.healthBenefits.map((benefit) => (
            <NutrientBadge 
              key={benefit} 
              type={benefit} 
              showName={true} 
              className="text-xs py-1 px-2"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsumedFoodItem;
