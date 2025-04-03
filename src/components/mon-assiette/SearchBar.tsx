import React, { useState, useEffect } from 'react';
import { Search, Trash2, Plus } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Command, CommandEmpty, CommandItem, CommandList } from '@/components/ui/command';
import { getFilteredFoods } from '@/data/foods';
import { Food } from '@/types';
import AddToDailyPlateDialog from '@/components/ui/AddToDailyPlateDialog';
import { Link } from 'react-router-dom';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearPlate: () => void;
  itemsCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  clearPlate,
  itemsCount
}) => {
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [quantityDialogOpen, setQuantityDialogOpen] = useState(false);

  // Update search results when search term changes
  useEffect(() => {
    if (searchTerm.length > 0) {
      // This will now use the startsWith() filter from foodUtils.ts
      const results = getFilteredFoods(searchTerm).slice(0, 8); // Limit to 8 results
      setSearchResults(results);
      setShowSearchResults(results.length > 0);
    } else {
      setShowSearchResults(false);
    }
  }, [searchTerm]);

  const handleAddToPlate = (food: Food, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedFood(food);
    setQuantityDialogOpen(true);
    setSearchTerm('');
    setShowSearchResults(false);
  };

  const handleQuantityDialogClose = () => {
    setQuantityDialogOpen(false);
    setTimeout(() => setSelectedFood(null), 300);
  };

  return (
    <div className="relative max-w-md mx-auto mb-6 flex">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Rechercher un aliment à ajouter..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-l-full border-y border-l border-gray-200 focus:outline-none focus:border-nutri-green focus:ring-1 focus:ring-nutri-green"
        />

        {/* Search results dropdown */}
        {showSearchResults && searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-1 rounded-md border border-gray-200 bg-white shadow-lg">
            <Command className="rounded-md">
              <CommandList>
                {searchResults.map((food) => (
                  <CommandItem
                    key={food.id}
                    className="flex items-center justify-between cursor-pointer p-2"
                  >
                    <Link 
                      to={`/aliment/${food.id}`} 
                      className="flex-1 text-left"
                      onClick={() => {
                        setSearchTerm('');
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
                ))}
              </CommandList>
              {searchResults.length === 0 && (
                <CommandEmpty>Aucun aliment trouvé</CommandEmpty>
              )}
            </Command>
          </div>
        )}
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button 
            className="bg-gray-100 px-4 rounded-r-full border-y border-r border-gray-200 hover:bg-gray-200"
            disabled={itemsCount === 0}
          >
            <Trash2 size={20} className={`${itemsCount === 0 ? 'text-gray-300' : 'text-gray-500'}`} />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Vider l'assiette</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer tous les aliments de votre assiette ?
              Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={clearPlate}>Vider l'assiette</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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

export default SearchBar;
