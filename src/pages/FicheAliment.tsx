
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Loader2 } from 'lucide-react';
import FoodHeader from '@/components/ficheAliment/FoodHeader';
import MacroNutrients from '@/components/ficheAliment/MacroNutrients';
import MicroNutrients from '@/components/ficheAliment/MicroNutrients';
import HealthBenefits from '@/components/ficheAliment/HealthBenefits';
import FoodSeasons from '@/components/ficheAliment/FoodSeasons';
import { useAliment } from '@/hooks/useAliments';

const FicheAliment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: food, isLoading } = useAliment(id!);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-nutri-green" />
      </div>
    );
  }
  
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
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Composition nutritionnelle</h2>
            <div className="space-y-6">
              <MacroNutrients food={food} />
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
