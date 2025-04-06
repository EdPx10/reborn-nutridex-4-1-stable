
import React, { useState, useEffect } from 'react';
import { getFilteredFoods } from '@/data/foods';
import { Food } from '@/types';
import { SearchBar } from '@/components/explorateur/SearchBar';
import { FiltersSection } from '@/components/explorateur/FiltersSection';
import { FoodGrid } from '@/components/explorateur/FoodGrid';

const Explorateur: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedBenefit, setSelectedBenefit] = useState<string | undefined>(undefined);
  const [selectedSeason, setSelectedSeason] = useState<string | undefined>(undefined);
  const [foods, setFoods] = useState<Food[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Définir une fonction asynchrone pour charger les données
    const loadFoods = async () => {
      setLoading(true);
      try {
        // Utiliser la fonction asynchrone getFilteredFoods
        const filtered = await getFilteredFoods(searchTerm, selectedCategory, selectedBenefit, selectedSeason);
        setFoods(filtered);
        // Console log pour déboguer
        console.log(`Search term: "${searchTerm}", found ${filtered.length} foods`);
      } catch (error) {
        console.error("Erreur lors du chargement des aliments:", error);
        setFoods([]);
      } finally {
        setLoading(false);
      }
    };

    // Charger les aliments
    loadFoods();
  }, [searchTerm, selectedCategory, selectedBenefit, selectedSeason]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
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
    // Effacer complètement la sélection précédente de saison avant d'en définir une nouvelle
    if (selectedSeason === seasonId) {
      setSelectedSeason(undefined);
    } else {
      setSelectedSeason(seasonId);
    }
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-3">Découvrez la composition</h1>
        <h2 className="text-3xl font-bold mb-4">nutritionnelle détaillée des aliments</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explorez les bienfaits santé et les valeurs nutritives des aliments pour mieux comprendre ce que vous mangez.
        </p>
      </div>
      
      <SearchBar 
        searchTerm={searchTerm} 
        onSearch={handleSearch} 
      />
      
      <FiltersSection
        selectedCategory={selectedCategory}
        selectedBenefit={selectedBenefit}
        selectedSeason={selectedSeason}
        toggleCategory={toggleCategory}
        toggleBenefit={toggleBenefit}
        toggleSeason={toggleSeason}
        showFilters={showFilters}
        toggleFilters={toggleFilters}
      />
      
      {loading ? (
        <div className="flex justify-center my-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nutri-green"></div>
        </div>
      ) : (
        <FoodGrid foods={foods} />
      )}
    </div>
  );
};

export default Explorateur;
