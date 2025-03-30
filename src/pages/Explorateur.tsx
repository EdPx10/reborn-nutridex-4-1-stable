
import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { FoodCard } from '@/components/ui/FoodCard';
import { foodCategories, healthBenefitsInfo, seasons } from '@/data/healthBenefits';
import { getFilteredFoods } from '@/data/foods';
import { Food, FoodCategory, HealthBenefit, Season } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const Explorateur: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedBenefit, setSelectedBenefit] = useState<string | undefined>(undefined);
  const [selectedSeason, setSelectedSeason] = useState<string | undefined>(undefined);
  const [foods, setFoods] = useState<Food[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const filtered = getFilteredFoods(searchTerm, selectedCategory, selectedBenefit, selectedSeason);
    setFoods(filtered);
  }, [searchTerm, selectedCategory, selectedBenefit, selectedSeason]);
  
  const handleAddToPlate = (food: Food) => {
    console.log('Add food to plate:', food);
    // TODO: Implement adding to plate functionality
  };

  const toggleCategory = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(undefined);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const toggleBenefit = (benefitId: string) => {
    if (selectedBenefit === benefitId) {
      setSelectedBenefit(undefined);
    } else {
      setSelectedBenefit(benefitId);
    }
  };

  const toggleSeason = (seasonId: string) => {
    if (selectedSeason === seasonId) {
      setSelectedSeason(undefined);
    } else {
      setSelectedSeason(seasonId);
    }
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Déterminer si on affiche les filtres basé sur la taille d'écran et l'état
  const displayFilters = !isMobile || showFilters;
  
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-3">Découvrez la composition</h1>
        <h2 className="text-3xl font-bold mb-4">nutritionnelle détaillée des aliments</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explorez les bienfaits santé et les valeurs nutritives des aliments pour mieux comprendre ce que vous mangez.
        </p>
      </div>
      
      <div className="relative max-w-2xl mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Rechercher un aliment par nom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-nutri-green focus:ring-1 focus:ring-nutri-green"
        />
      </div>
      
      {isMobile && (
        <div className="mb-4 flex justify-center">
          <Button 
            variant="outline" 
            onClick={toggleFilters}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm"
          >
            <Filter size={16} />
            Filtres
            {showFilters ? (
              <span className="ml-1 text-xs bg-nutri-green text-white rounded-full h-5 w-5 flex items-center justify-center">
                {(selectedCategory ? 1 : 0) + (selectedBenefit ? 1 : 0) + (selectedSeason ? 1 : 0)}
              </span>
            ) : null}
          </Button>
        </div>
      )}
      
      <div className={`mb-8 ${isMobile ? 'overflow-hidden transition-all duration-300 ease-in-out' : ''}`} 
           style={{ 
             maxHeight: isMobile ? (displayFilters ? '1000px' : '0px') : 'auto',
             opacity: isMobile ? (displayFilters ? 1 : 0) : 1,
           }}>
        {displayFilters && (
          <div className={`space-y-4 ${isMobile ? 'animate-fade-in' : ''}`}>
            <h3 className="font-medium text-lg mb-3">Filtres</h3>
            
            <div>
              <h4 className="text-sm text-gray-500 mb-2">Catégories</h4>
              <div className="flex flex-wrap gap-2">
                {foodCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={`px-3 py-1 text-sm rounded-full transition ${
                      selectedCategory === category.id 
                        ? `${category.color} font-medium` 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-500 mb-2">Propriétés santé</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(healthBenefitsInfo).map(([id, benefit]) => (
                  <button
                    key={id}
                    onClick={() => toggleBenefit(id)}
                    className={`px-3 py-1 text-sm rounded-full flex items-center gap-1 transition ${
                      selectedBenefit === id
                        ? benefit.color
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <benefit.icon size={14} />
                    <span>{benefit.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-500 mb-2">Saisons</h4>
              <div className="flex flex-wrap gap-2">
                {seasons.map(season => (
                  <button
                    key={season.id}
                    onClick={() => toggleSeason(season.id)}
                    className={`px-3 py-1 text-sm rounded-full transition ${
                      selectedSeason === season.id 
                        ? 'bg-nutri-green text-white font-medium' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {season.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map(food => (
          <FoodCard 
            key={food.id} 
            food={food} 
            onAddToPlate={handleAddToPlate}
          />
        ))}
        {foods.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">Aucun aliment ne correspond à vos critères</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explorateur;
