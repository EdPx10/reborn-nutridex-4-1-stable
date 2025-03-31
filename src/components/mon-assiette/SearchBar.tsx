
import React from 'react';
import { Search, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

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
    </div>
  );
};

export default SearchBar;
