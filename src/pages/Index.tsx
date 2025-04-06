import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // adapte si besoin
import { FoodGrid } from '@/components/ui/FoodGrid';
import { Food } from '@/types';

const Index = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  
  useEffect(() => {
    const fetchFoods = async () => {
      const { data, error } = await supabase
        .from('foods')
        .select(`
          *,
          food_nutrients (
            value,
            nutrient: nutrient_id (
              slug,
              unit
            )
          )
        `);
        
      if (error) console.error(error);
      else setFoods(data);
    };

    fetchFoods();
  }, []);

  return (
    <div className="p-4">
      <FoodGrid foods={foods} />
    </div>
  );
};

export default Index;
