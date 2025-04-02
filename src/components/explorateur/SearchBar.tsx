
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Food } from '@/types';
import { Command, CommandEmpty, CommandItem, CommandList } from '@/components/ui/command';
import AddToDailyPlateDialog from '@/components/ui/AddToDailyPlateDialog';

interface SearchBarProps {
  onSearch: (term: string) => void;
  searchTerm: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, searchTerm }) => {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [quantityDialogOpen, setQuantityDialogOpen] = useState(false);

  // This function would be called from the parent to update search results
  const updateSearchResults = (results: Food[]) => {
    setSearchResults(results);
    setShowSearchResults(results.length > 0 && searchTerm.length > 0);
  };

  const handleSelectFood = (food: Food) => {
    setSelectedFood(food);
    setQuantityDialogOpen(true);
    onSearch(''); // Clear search term
    setShowSearchResults(false);
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
      {showSearchResults && searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-1 rounded-md border border-gray-200 bg-white shadow-lg">
          <Command className="rounded-md">
            <CommandList>
              {searchResults.map((food) => (
                <CommandItem
                  key={food.id}
                  onSelect={() => handleSelectFood(food)}
                  className="flex items-center gap-2 cursor-pointer p-2"
                >
                  <div className="flex-1">
                    <div>{food.name}</div>
                    <div className="text-xs text-gray-500">{food.category}</div>
                  </div>
                </CommandItem>
              ))}
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
