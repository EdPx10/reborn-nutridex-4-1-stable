
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { foodCategories, healthBenefitsInfo, seasons } from '@/data/healthBenefits';
import { useIsMobile } from '@/hooks/use-mobile';

interface FiltersSectionProps {
  selectedCategory: string | undefined;
  selectedBenefit: string | undefined;
  selectedSeason: string | undefined;
  toggleCategory: (categoryId: string) => void;
  toggleBenefit: (benefitId: string) => void;
  toggleSeason: (seasonId: string) => void;
  showFilters: boolean;
  toggleFilters: () => void;
}

const FiltersSection: React.FC<FiltersSectionProps> = ({
  selectedCategory,
  selectedBenefit,
  selectedSeason,
  toggleCategory,
  toggleBenefit,
  toggleSeason,
  showFilters,
  toggleFilters,
}) => {
  const isMobile = useIsMobile();
  
  // Déterminer si on affiche les filtres basé sur la taille d'écran et l'état
  const displayFilters = !isMobile || showFilters;
  
  return (
    <>
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
    </>
  );
};

export { FiltersSection, type FiltersSectionProps };
