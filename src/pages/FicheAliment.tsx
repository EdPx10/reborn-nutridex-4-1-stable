
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFoodById } from '@/data/foods';
import { Food } from '@/types';
import { ChevronLeft } from 'lucide-react';
import FoodHeader from '@/components/ficheAliment/FoodHeader';
import MacroNutrients from '@/components/ficheAliment/MacroNutrients';
import MicroNutrients from '@/components/ficheAliment/MicroNutrients';
import HealthBenefits from '@/components/ficheAliment/HealthBenefits';
import FoodSeasons from '@/components/ficheAliment/FoodSeasons';

const FicheAliment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [food, setFood] = useState<Food | null>(null);
  
  useEffect(() => {
    if (id) {
      const foundFood = getFoodById(id);
      setFood(foundFood || null);
    }
  }, [id]);
  
  if (!food) {
    return (
      <div className="text-center py-10">
        <p>Aliment non trouvé</p>
        <Link to="/" className="text-nutri-green mt-4 inline-block">Retour à l'explorateur</Link>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-nutri-green">
          <ChevronLeft size={20} />
          <span>Retour à l'explorateur</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <FoodHeader food={food} />
        
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Macronutriments */}
            <div>
              <MacroNutrients food={food} />
            </div>
            
            {/* Micronutriments (Vitamines et Minéraux) */}
            <div className="col-span-1 md:col-span-2">
              <MicroNutrients food={food} />
            </div>
          </div>
          
          <HealthBenefits food={food} />
          
          <FoodSeasons food={food} />
        </div>
      </div>
    </div>
  );
};

export default FicheAliment;
