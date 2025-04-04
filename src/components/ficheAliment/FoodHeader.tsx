
import React, { useState } from 'react';
import { Food } from '@/types';
import { foodCategories } from '@/data/healthBenefits';
import { useDailyPlateStore } from '@/store/dailyPlateStore';
import { toast } from '@/hooks/use-toast';
import { Plus, Check } from 'lucide-react';
import AddToDailyPlateDialog from '@/components/ui/AddToDailyPlateDialog';
import FoodImage from '@/components/ui/FoodImage';

interface FoodHeaderProps {
  food: Food;
}

export const FoodHeader: React.FC<FoodHeaderProps> = ({ food }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { getItem, removeItem } = useDailyPlateStore();
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
      setIsDialogOpen(true);
    }
  };
  
  return (
    <>
      <div className="relative">
        <FoodImage 
          src={food.image} 
          alt={food.name} 
          category={food.category}
          size="lg"
        />
        
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full ${categoryInfo?.color || 'bg-gray-200'}`}>
            {categoryInfo?.name || food.category}
          </span>
        </div>
        <button 
          onClick={handleTogglePlate}
          className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md
            ${isInPlate ? 'bg-nutri-green text-white' : 'bg-white hover:bg-gray-50'}`}
          aria-label={isInPlate ? "Retirer de mon assiette" : "Ajouter à mon assiette"}
        >
          {isInPlate ? (
            <Check size={20} />
          ) : (
            <Plus size={20} className="text-nutri-green" />
          )}
        </button>
      </div>
      
      <div className="p-6">
        <h1 className="text-3xl font-bold">{food.name}</h1>
      </div>

      <AddToDailyPlateDialog 
        food={food}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default FoodHeader;
