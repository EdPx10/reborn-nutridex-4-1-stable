
import React, { useState } from 'react';
import { Food } from '@/types';
import { foodCategories } from '@/data/healthBenefits';
import { NutrientBadge } from './NutrientBadge';
import { Check, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import AddToDailyPlateDialog, { PlateItem } from './AddToDailyPlateDialog';
import { useDailyPlateStore } from '@/store/dailyPlateStore';

interface FoodCardProps {
  food: Food;
  onAddToPlate?: (food: Food) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food, onAddToPlate }) => {
  const { id, name, category, healthBenefits, nutrients, image } = food;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { addItem, getItem } = useDailyPlateStore();
  const isInPlate = getItem(id) !== undefined;
  
  const categoryInfo = foodCategories.find(c => c.id === category);
  
  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDialogOpen(true);
  };
  
  const handleConfirmAdd = (item: PlateItem) => {
    addItem(item.food, item.quantity, item.unit);
    if (onAddToPlate) {
      onAddToPlate(food);
    }
  };
  
  return (
    <>
      <Link to={`/aliment/${id}`} className="block">
        <div className="rounded-2xl overflow-hidden bg-white food-card-shadow hover:shadow-md transition-shadow">
          <div className="relative">
            {image ? (
              <img 
                src={image} 
                alt={name} 
                className="w-full h-40 object-cover"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">{name}</span>
              </div>
            )}
            <div className="absolute top-2 left-2">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryInfo?.color || 'bg-gray-200'}`}>
                {categoryInfo?.name || category}
              </span>
            </div>
            <button 
              onClick={handleAddClick}
              className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md
                ${isInPlate ? 'bg-nutri-green text-white' : 'bg-white hover:bg-gray-50'}`}
            >
              {isInPlate ? (
                <Check size={18} />
              ) : (
                <Plus size={18} className="text-nutri-green" />
              )}
            </button>
          </div>
          
          <div className="p-3">
            <h3 className="font-medium text-lg">{name}</h3>
            
            <div className="grid grid-cols-3 gap-2 my-2 text-sm">
              <div>
                <p className="text-gray-500">Glucides</p>
                <p className="font-medium">{nutrients.glucides}g</p>
              </div>
              <div>
                <p className="text-gray-500">Protéines</p>
                <p className="font-medium">{nutrients.proteines}g</p>
              </div>
              <div>
                <p className="text-gray-500">Lipides</p>
                <p className="font-medium">{nutrients.lipides}g</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-3">
              {healthBenefits.map((benefit) => (
                <NutrientBadge 
                  key={benefit} 
                  type={benefit} 
                  showName={false} 
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
      
      <AddToDailyPlateDialog 
        food={food}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmAdd}
      />
    </>
  );
};

export default FoodCard;
