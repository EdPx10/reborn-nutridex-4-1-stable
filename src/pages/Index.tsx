
import { useState, useEffect } from 'react';
import { FoodGrid } from '@/components/explorateur/FoodGrid';
import { Food } from '@/types';
import { fruits } from '@/data/foods/fruits';
import { grains } from '@/data/foods/grains';
import { nuts } from '@/data/foods/nuts';
import { proteins } from '@/data/foods/proteins';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  // Combine all food categories
  const allFoods: Food[] = [...fruits, ...grains, ...nuts, ...proteins];
  
  // Get filtered foods based on selected category
  const getFoodsByCategory = () => {
    if (!selectedCategory) return allFoods;
    
    switch (selectedCategory) {
      case 'fruit':
        return fruits;
      case 'cereales':
        return grains;
      case 'noix':
        return nuts;
      case 'poisson':
        return proteins;
      default:
        return allFoods;
    }
  };

  const filteredFoods = getFoodsByCategory();

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-3">Découvrez la composition</h1>
        <h2 className="text-3xl font-bold mb-4">nutritionnelle des aliments</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Explorez les bienfaits santé et les valeurs nutritives des aliments pour mieux comprendre ce que vous mangez.
        </p>
        
        <Button 
          variant="outline" 
          className="mx-1"
          onClick={() => navigate('/explorateur')}
        >
          Accéder à l'explorateur avancé
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <h3 className="font-medium text-lg mb-4">Catégories d'aliments</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="px-4 py-2"
            >
              Tous
            </Button>
            <Button
              variant={selectedCategory === 'fruit' ? "default" : "outline"}
              onClick={() => setSelectedCategory('fruit')}
              className="px-4 py-2"
            >
              Fruits
            </Button>
            <Button
              variant={selectedCategory === 'cereales' ? "default" : "outline"}
              onClick={() => setSelectedCategory('cereales')}
              className="px-4 py-2"
            >
              Céréales
            </Button>
            <Button
              variant={selectedCategory === 'noix' ? "default" : "outline"}
              onClick={() => setSelectedCategory('noix')}
              className="px-4 py-2"
            >
              Noix et graines
            </Button>
            <Button
              variant={selectedCategory === 'poisson' ? "default" : "outline"}
              onClick={() => setSelectedCategory('poisson')}
              className="px-4 py-2"
            >
              Protéines
            </Button>
          </div>
        </CardContent>
      </Card>

      <FoodGrid foods={filteredFoods} />
    </div>
  );
};

export default Index;
