
import React, { useState, useEffect } from 'react';
import { Food } from '@/types';
import { SearchBar } from '@/components/explorateur/SearchBar';
import { FiltersSection } from '@/components/explorateur/FiltersSection';
import { FoodGrid } from '@/components/explorateur/FoodGrid';
import { useAliments } from '@/hooks/useAliments';
import { Loader2 } from 'lucide-react';

const Explorateur: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedBenefit, setSelectedBenefit] = useState<string | undefined>(undefined);
  const [selectedSeason, setSelectedSeason] = useState<string | undefined>(undefined);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const { data: foods = [], isLoading } = useAliments();
  
  useEffect(() => {
    let filtered = [...foods];

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(food => 
        food.name.toLowerCase().startsWith(term)
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(food => food.category === selectedCategory);
    }

    // Filter by health benefit
    if (selectedBenefit) {
      filtered = filtered.filter(food => 
        food.healthBenefits.includes(selectedBenefit as any)
      );
    }

    // Filter by season
    if (selectedSeason) {
      filtered = filtered.filter(food => 
        food.seasons && food.seasons.includes(selectedSeason as any)
      );
    }

    setFilteredFoods(filtered);
    console.log(`Search term: "${searchTerm}", found ${filtered.length} foods`);
  }, [searchTerm, selectedCategory, selectedBenefit, selectedSeason, foods]);

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
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-nutri-green" />
        </div>
      ) : (
        <FoodGrid foods={filteredFoods} />
      )}
    </div>
  );
};

export default Explorateur;
