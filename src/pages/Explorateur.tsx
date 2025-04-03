
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
  
  useEffect(() => {
    // Reset foods array when filters change to prevent stale data
    const filtered = getFilteredFoods(searchTerm, selectedCategory, selectedBenefit, selectedSeason);
    setFoods(filtered);
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
    // Clear previous season selection completely before setting new one
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
      
      <FoodGrid foods={foods} />
    </div>
  );
};

export default Explorateur;
