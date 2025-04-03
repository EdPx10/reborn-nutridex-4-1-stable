
import React, { useState } from 'react';
import { Food } from '@/types';
import { foodCategories, healthBenefitsInfo, seasons } from '@/data/healthBenefits';
import { NutrientBadge } from './NutrientBadge';
import { Check, Plus, CloudSun, Snowflake, Leaf, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import AddToDailyPlateDialog from './AddToDailyPlateDialog';
import { useDailyPlateStore } from '@/store/dailyPlateStore';
import { toast } from '@/hooks/use-toast';

interface FoodCardProps {
  food: Food;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const { id, name, category, healthBenefits, nutrients, image, seasons: foodSeasons = [] } = food;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { getItem, removeItem } = useDailyPlateStore();
  const isInPlate = getItem(id) !== undefined;
  
  const categoryInfo = foodCategories.find(c => c.id === category);
  
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInPlate) {
      removeItem(id);
      toast({
        title: "Aliment retiré",
        description: `${name} a été retiré de votre assiette du jour`,
      });
    } else {
      setIsDialogOpen(true);
    }
  };
  
  const getSeasonIcon = (season: string) => {
    switch (season) {
      case 'printemps':
        return <Leaf size={18} className="text-nutri-green" />;
      case 'ete':
        return <Sun size={18} className="text-amber-500" />;
      case 'automne':
        return <CloudSun size={18} className="text-orange-500" />;
      case 'hiver':
        return <Snowflake size={18} className="text-blue-500" />;
      default:
        return null;
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
            {foodSeasons && foodSeasons.length > 0 && (
              <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm flex gap-1">
                {foodSeasons.map((season, index) => (
                  <div key={`${season}-${index}`}>
                    {getSeasonIcon(season)}
                  </div>
                ))}
              </div>
            )}
            <button 
              onClick={handleButtonClick}
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
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-2 text-xs sm:text-sm">
              <div>
                <p className="text-gray-500">Glucides</p>
                <p className="font-medium">{nutrients.glucides.toFixed(2)}g</p>
              </div>
              <div>
                <p className="text-gray-500">Protéines</p>
                <p className="font-medium">{nutrients.proteines.toFixed(2)}g</p>
              </div>
              <div>
                <p className="text-gray-500">Lipides</p>
                <p className="font-medium">{nutrients.lipides.toFixed(2)}g</p>
              </div>
              <div>
                <p className="text-gray-500">Fibres</p>
                <p className="font-medium">{(nutrients.fibres || 0).toFixed(2)}g</p>
              </div>
            </div>
            
            <div className="mt-3 space-y-2">
              <p className="text-sm text-gray-600 font-medium">Bienfaits santé:</p>
              <div className="flex flex-col gap-2">
                {healthBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <NutrientBadge 
                      key={benefit} 
                      type={benefit} 
                      showName={true} 
                      className="text-xs py-1 px-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      <AddToDailyPlateDialog 
        food={food}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default FoodCard;
