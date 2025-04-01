
import React from 'react';
import { Food } from '@/types';
import { foodCategories } from '@/data/healthBenefits';
import { useDailyPlateStore } from '@/store/dailyPlateStore';
import { toast } from '@/hooks/use-toast';
import { Plus, Check } from 'lucide-react';

interface FoodHeaderProps {
  food: Food;
}

export const FoodHeader: React.FC<FoodHeaderProps> = ({ food }) => {
  const { getItem, addItem, removeItem } = useDailyPlateStore();
  const isInPlate = getItem(food.id) !== undefined;
  const categoryInfo = foodCategories.find(c => c.id === food.category);
  
  const handleTogglePlate = () => {
    if (isInPlate) {
      removeItem(food.id);
      toast({
        title: "Aliment retiré",
        description: `${food.name} a été retiré de votre assiette du jour`,
      });
    } else {
      addItem({
        id: food.id,
        food: food,
        quantity: 1,
        unit: food.portion.unit
      });
      toast({
        title: "Aliment ajouté",
        description: `${food.name} a été ajouté à votre assiette du jour`,
      });
    }
  };
  
  return (
    <>
      <div className="relative">
        {food.image ? (
          <img 
            src={food.image} 
            alt={food.name} 
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">{food.name}</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full ${categoryInfo?.color || 'bg-gray-200'}`}>
            {categoryInfo?.name || food.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold">{food.name}</h1>
          <button
            onClick={handleTogglePlate}
            className={`px-4 py-2 rounded-full flex items-center gap-2 ${
              isInPlate 
                ? 'bg-green-100 text-green-700' 
                : 'bg-nutri-green text-white'
            }`}
          >
            {isInPlate ? (
              <>
                <Check size={18} />
                <span>Retiré</span>
              </>
            ) : (
              <>
                <Plus size={18} />
                <span>Ajouter à mon assiette</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default FoodHeader;
