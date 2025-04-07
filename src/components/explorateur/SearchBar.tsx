
import React, { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { Food } from '@/types';
import { Command, CommandEmpty, CommandItem, CommandList } from '@/components/ui/command';
import AddToDailyPlateDialog from '@/components/ui/AddToDailyPlateDialog';
import { Link } from 'react-router-dom';
import { getFilteredFoods } from '@/data/foods';

interface SearchBarProps {
  onSearch: (term: string) => void;
  searchTerm: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, searchTerm }) => {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [quantityDialogOpen, setQuantityDialogOpen] = useState(false);

  // Update search results when search term changes
  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm.length > 0) {
        try {
          const results = await getFilteredFoods(searchTerm);
          setSearchResults(results.slice(0, 8)); // Now we can safely slice the results
          setShowSearchResults(true);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setSearchResults([]);
        }
      } else {
        setShowSearchResults(false);
      }
    };

    fetchResults();
  }, [searchTerm]);

  const handleAddToPlate = (food: Food, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedFood(food);
    setQuantityDialogOpen(true);
  };

  const handleQuantityDialogClose = () => {
    setQuantityDialogOpen(false);
    setTimeout(() => setSelectedFood(null), 300);
  };

  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Rechercher un aliment par nom..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-nutri-green focus:ring-1 focus:ring-nutri-green"
      />

      {/* Search results dropdown */}
      {showSearchResults && (
        <div className="absolute z-10 w-full mt-1 rounded-md border border-gray-200 bg-white shadow-lg">
          <Command className="rounded-md">
            <CommandList>
              {searchResults.length > 0 ? (
                searchResults.map((food) => (
                  <CommandItem
                    key={food.id}
                    className="flex items-center justify-between cursor-pointer p-2"
                  >
                    <Link 
                      to={`/aliment/${food.id}`} 
                      className="flex-1 text-left"
                      onClick={() => {
                        onSearch('');
                        setShowSearchResults(false);
                      }}
                    >
                      <div>{food.name}</div>
                      <div className="text-xs text-gray-500">{food.category}</div>
                    </Link>
                    <button 
                      onClick={(e) => handleAddToPlate(food, e)}
                      className="ml-2 p-1 rounded-full hover:bg-gray-100"
                      aria-label="Ajouter à mon assiette"
                    >
                      <Plus size={18} className="text-nutri-green" />
                    </button>
                  </CommandItem>
                ))
              ) : (
                <CommandEmpty>Aucun aliment trouvé</CommandEmpty>
              )}
            </CommandList>
          </Command>
        </div>
      )}

      {/* Quantity Dialog for adding selected food to daily plate */}
      {selectedFood && (
        <AddToDailyPlateDialog
          food={selectedFood}
          isOpen={quantityDialogOpen}
          onClose={handleQuantityDialogClose}
        />
      )}
    </div>
  );
};

export { SearchBar, type SearchBarProps };
