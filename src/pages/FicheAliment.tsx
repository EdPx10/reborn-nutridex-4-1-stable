
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
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadFood = async () => {
      setLoading(true);
      if (id) {
        try {
          const foundFood = await getFoodById(id);
          setFood(foundFood);
        } catch (error) {
          console.error("Erreur lors du chargement de l'aliment:", error);
          setFood(null);
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadFood();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nutri-green"></div>
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
          {/* Nutriments */}
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
