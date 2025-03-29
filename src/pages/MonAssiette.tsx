
import React, { useState, useEffect } from 'react';
import { Search, Trash2, Check } from 'lucide-react';
import { getFoodById } from '@/data/foods';
import { Food } from '@/types';
import { foodCategories, healthBenefitsInfo } from '@/data/healthBenefits';
import { NutrientBadge } from '@/components/ui/NutrientBadge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useUserProfile } from '@/hooks/useUserProfile';

interface ConsumedFood {
  food: Food;
  quantity: number;
}

const MonAssiette: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [consumedFoods, setConsumedFoods] = useState<ConsumedFood[]>([]);
  const { activeProfile } = useUserProfile();
  
  // Charger les aliments depuis localStorage
  useEffect(() => {
    const storedFoods = localStorage.getItem('nutridex-consumed-foods');
    if (storedFoods) {
      try {
        const parsedFoods = JSON.parse(storedFoods);
        // Convertir les données pour avoir les objets Food complets
        const foods = parsedFoods.map((item: {foodId: string, quantity: number}) => ({
          food: getFoodById(item.foodId) as Food,
          quantity: item.quantity
        })).filter((item: {food: Food | undefined}) => item.food !== undefined);
        
        setConsumedFoods(foods as ConsumedFood[]);
      } catch (error) {
        console.error('Error loading consumed foods:', error);
      }
    }
  }, []);
  
  // Sauvegarder les aliments dans localStorage
  useEffect(() => {
    if (consumedFoods.length > 0) {
      const foodsToSave = consumedFoods.map(item => ({
        foodId: item.food.id,
        quantity: item.quantity
      }));
      localStorage.setItem('nutridex-consumed-foods', JSON.stringify(foodsToSave));
    }
  }, [consumedFoods]);
  
  const handleRemoveFood = (index: number) => {
    setConsumedFoods(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };
  
  // Calculer les nutriments totaux
  const totalNutrients = consumedFoods.reduce(
    (acc, { food, quantity }) => {
      const factor = quantity / food.portion.amount;
      
      return {
        glucides: acc.glucides + food.nutrients.glucides * factor,
        proteines: acc.proteines + food.nutrients.proteines * factor,
        lipides: acc.lipides + food.nutrients.lipides * factor,
        fibres: acc.fibres + (food.nutrients.fibres || 0) * factor,
      };
    },
    { glucides: 0, proteines: 0, lipides: 0, fibres: 0 }
  );
  
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Mon assiette du jour</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Suivez vos apports nutritionnels quotidiens en ajoutant les aliments consommés.
        </p>
      </div>
      
      <div className="relative max-w-md mx-auto mb-6 flex">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un aliment à ajouter..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-l-full border-y border-l border-gray-200 focus:outline-none focus:border-nutri-green focus:ring-1 focus:ring-nutri-green"
          />
        </div>
        <button 
          className="bg-gray-100 px-4 rounded-r-full border-y border-r border-gray-200 hover:bg-gray-200"
        >
          <Trash2 size={20} className="text-gray-500" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        {/* Liste des aliments consommés */}
        <div>
          <h2 className="text-xl font-medium mb-4">Aliments consommés ({consumedFoods.length})</h2>
          
          {consumedFoods.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg border border-gray-100">
              <p className="text-gray-500">Aucun aliment ajouté à votre assiette</p>
              <p className="text-sm text-gray-400 mt-2">
                Recherchez et ajoutez des aliments pour suivre vos apports nutritionnels
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {consumedFoods.map((item, index) => (
                <ConsumedFoodItem 
                  key={`${item.food.id}-${index}`}
                  item={item}
                  onRemove={() => handleRemoveFood(index)}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Graphiques des apports nutritionnels */}
        <div>
          <h2 className="text-xl font-medium mb-4">Mes apports du jour</h2>
          
          <div className="bg-white rounded-lg border border-gray-100 p-6 space-y-6">
            {activeProfile && (
              <>
                <NutrientProgress
                  label="Glucides"
                  current={totalNutrients.glucides}
                  goal={activeProfile.goals.glucides.goal}
                  unit="g"
                  color="bg-nutri-blue"
                />
                <NutrientProgress
                  label="Protéines"
                  current={totalNutrients.proteines}
                  goal={activeProfile.goals.proteines.goal}
                  unit="g"
                  color="bg-nutri-red"
                />
                <NutrientProgress
                  label="Lipides"
                  current={totalNutrients.lipides}
                  goal={activeProfile.goals.lipides.goal}
                  unit="g"
                  color="bg-nutri-yellow"
                />
                <NutrientProgress
                  label="Fibres"
                  current={totalNutrients.fibres}
                  goal={activeProfile.goals.fibres.goal}
                  unit="g"
                  color="bg-nutri-green"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ConsumedFoodItemProps {
  item: ConsumedFood;
  onRemove: () => void;
}

const ConsumedFoodItem: React.FC<ConsumedFoodItemProps> = ({ item, onRemove }) => {
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

interface NutrientProgressProps {
  label: string;
  current: number;
  goal: number;
  unit: string;
  color: string;
}

const NutrientProgress: React.FC<NutrientProgressProps> = ({ 
  label, 
  current, 
  goal, 
  unit, 
  color 
}) => {
  const percentage = Math.round((current / goal) * 100);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium">{label}</span>
        <span>
          {current.toFixed(1)}/{goal} {unit}
        </span>
      </div>
      <ProgressBar 
        value={current} 
        max={goal} 
        color={color}
        height="h-3"
      />
      <div className="text-right text-sm text-gray-500 mt-1">
        {percentage}% {goal > current ? `(Recommandation: ${goal} ${unit})` : '(Objectif atteint)'}
      </div>
    </div>
  );
};

export default MonAssiette;
