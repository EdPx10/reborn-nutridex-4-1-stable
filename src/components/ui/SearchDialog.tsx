
import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Search, X } from 'lucide-react';
import { Food } from '@/types';
import { getFilteredFoods } from '@/data/foods';
import AddToDailyPlateDialog from './AddToDailyPlateDialog';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [quantityDialogOpen, setQuantityDialogOpen] = useState(false);
  
  // Update search results when search term changes
  useEffect(() => {
    if (searchTerm.length > 0) {
      setSearchResults(getFilteredFoods(searchTerm).slice(0, 10));
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSelectFood = (food: Food) => {
    setSelectedFood(food);
    setQuantityDialogOpen(true);
  };

  const handleQuantityDialogClose = () => {
    setQuantityDialogOpen(false);
    // Wait for animation to complete before clearing selection
    setTimeout(() => setSelectedFood(null), 300);
  };
  
  const handleClose = () => {
    onClose();
    // Clear search term when dialog closes
    setTimeout(() => setSearchTerm(''), 300);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent side="top" className="w-full h-auto py-4 max-h-[85vh]">
          <SheetHeader className="mb-2">
            <SheetTitle>Rechercher un aliment</SheetTitle>
          </SheetHeader>
          
          <div className="flex items-center border rounded-md pr-2 mt-4">
            <div className="px-3">
              <Search size={18} className="text-gray-500" />
            </div>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Nom d'aliment..."
              autoFocus
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')}>
                <X size={16} className="text-gray-500" />
              </button>
            )}
          </div>

          {searchTerm && (
            <Command className="rounded-lg border mt-2">
              <CommandList>
                {searchResults.length === 0 ? (
                  <CommandEmpty>Aucun aliment trouvé</CommandEmpty>
                ) : (
                  searchResults.map((food) => (
                    <CommandItem
                      key={food.id}
                      onSelect={() => handleSelectFood(food)}
                      className="flex items-center gap-2 cursor-pointer p-2"
                    >
                      <div className="flex-1 text-left">
                        <div>{food.name}</div>
                        <div className="text-xs text-gray-500">{food.category}</div>
                      </div>
                    </CommandItem>
                  ))
                )}
              </CommandList>
            </Command>
          )}
        </SheetContent>
      </Sheet>

      {selectedFood && (
        <AddToDailyPlateDialog
          food={selectedFood}
          isOpen={quantityDialogOpen}
          onClose={handleQuantityDialogClose}
        />
      )}
    </>
  );
};

export default SearchDialog;
