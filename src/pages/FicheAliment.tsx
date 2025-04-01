
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFoodById } from '@/data/foods';
import { Food } from '@/types';
import { foodCategories } from '@/data/healthBenefits';
import { NutrientBadge } from '@/components/ui/NutrientBadge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ChevronLeft, Plus, Check } from 'lucide-react';
import { useDailyPlateStore } from '@/store/dailyPlateStore';
import { toast } from '@/hooks/use-toast';

const FicheAliment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [food, setFood] = useState<Food | null>(null);
  
  const { getItem, addItem, removeItem } = useDailyPlateStore();
  const isInPlate = id ? getItem(id) !== undefined : false;
  
  useEffect(() => {
    if (id) {
      const foundFood = getFoodById(id);
      setFood(foundFood || null);
    }
  }, [id]);
  
  const handleTogglePlate = () => {
    if (!food) return;
    
    if (isInPlate && id) {
      removeItem(id);
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
  
  if (!food) {
    return (
      <div className="text-center py-10">
        <p>Aliment non trouvé</p>
        <Link to="/" className="text-nutri-green mt-4 inline-block">Retour à l'explorateur</Link>
      </div>
    );
  }
  
  const categoryInfo = foodCategories.find(c => c.id === food.category);
  
  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-nutri-green">
          <ChevronLeft size={20} />
          <span>Retour à l'explorateur</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Macronutriments */}
            <div>
              <h2 className="font-medium text-xl mb-4">Macronutriments</h2>
              <div className="space-y-4">
                <NutrientItem 
                  label="Glucides" 
                  value={food.nutrients.glucides} 
                  unit="g" 
                  color="bg-nutri-blue"
                />
                <NutrientItem 
                  label="Protéines" 
                  value={food.nutrients.proteines} 
                  unit="g" 
                  color="bg-nutri-red"
                />
                <NutrientItem 
                  label="Lipides" 
                  value={food.nutrients.lipides} 
                  unit="g" 
                  color="bg-nutri-yellow"
                />
                {food.nutrients.fibres && (
                  <NutrientItem 
                    label="Fibres" 
                    value={food.nutrients.fibres} 
                    unit="g" 
                    color="bg-nutri-green"
                  />
                )}
              </div>
            </div>
            
            {/* Vitamines */}
            {food.nutrients.vitamines && Object.keys(food.nutrients.vitamines).length > 0 && (
              <div>
                <h2 className="font-medium text-xl mb-4">Vitamines</h2>
                <div className="space-y-4">
                  {Object.entries(food.nutrients.vitamines).map(([key, value]) => (
                    <NutrientItem 
                      key={key} 
                      label={`Vitamine ${key.toUpperCase()}`} 
                      value={value} 
                      unit={key === 'd' ? 'µg' : 'mg'} 
                      color="bg-nutri-orange"
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Minéraux */}
            {food.nutrients.mineraux && Object.keys(food.nutrients.mineraux).length > 0 && (
              <div>
                <h2 className="font-medium text-xl mb-4">Minéraux</h2>
                <div className="space-y-4">
                  {Object.entries(food.nutrients.mineraux).map(([key, value]) => (
                    <NutrientItem 
                      key={key} 
                      label={key.charAt(0).toUpperCase() + key.slice(1)} 
                      value={value} 
                      unit="mg" 
                      color="bg-nutri-purple"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-10">
            <h2 className="font-medium text-xl mb-4">Bienfaits pour la santé</h2>
            <div className="flex flex-wrap gap-2">
              {food.healthBenefits.map((benefit) => (
                <NutrientBadge key={benefit} type={benefit} />
              ))}
            </div>
          </div>
          
          {food.seasons && food.seasons.length > 0 && (
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
          )}
        </div>
      </div>
    </div>
  );
};

interface NutrientItemProps {
  label: string;
  value: number;
  unit: string;
  color?: string;
}

const NutrientItem: React.FC<NutrientItemProps> = ({ 
  label, 
  value, 
  unit, 
  color = 'bg-blue-500' 
}) => {
  // Pour des besoins de visualisation, nous allons simuler une valeur cible
  const targetValue = value * 2;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm">
          {value} {unit}
        </span>
      </div>
      <ProgressBar 
        value={value} 
        max={targetValue} 
        color={color}
      />
    </div>
  );
};

export default FicheAliment;
