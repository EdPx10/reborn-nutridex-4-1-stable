
import { useEffect, useState } from 'react';
import { FoodGrid } from '@/components/explorateur/FoodGrid';
import { Food } from '@/types';
import { fetchAllFoods } from '@/services/foodService';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const data = await fetchAllFoods();
        setFoods(data);
        console.log('Foods fetched:', data.length);
      } catch (error) {
        console.error('Error fetching foods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-3">Découvrez la composition</h1>
        <h2 className="text-3xl font-bold mb-4">nutritionnelle détaillée des aliments</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explorez les bienfaits santé et les valeurs nutritives des aliments pour mieux comprendre ce que vous mangez.
        </p>
      </div>
      
      {loading ? (
        <div className="flex justify-center my-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nutri-green"></div>
        </div>
      ) : foods.length > 0 ? (
        <FoodGrid foods={foods} />
      ) : (
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <p>Aucun aliment trouvé dans la base de données.</p>
            <p className="text-sm text-gray-500 mt-2">
              Vérifiez que votre base de données Supabase contient des aliments avec les nutriments correspondants.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Index;
