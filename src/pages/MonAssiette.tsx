import React, { useState, useEffect } from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useDailyPlateStore } from '@/store/dailyPlateStore';
import SearchBar from '@/components/mon-assiette/SearchBar';
import FoodList from '@/components/mon-assiette/FoodList';
import NutrientSummary from '@/components/mon-assiette/NutrientSummary';
import { calculateTotalNutrients } from '@/components/mon-assiette/NutrientCalculator';

const MonAssiette: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { activeProfile, updateNutrientIntake } = useUserProfile();
  const { items, removeItem, clearPlate, updateItem } = useDailyPlateStore();
  
  // Calculate total nutrients using the utility function
  const totalNutrients = calculateTotalNutrients(items);
  
  // Synchroniser les apports nutritionnels avec le profil utilisateur
  useEffect(() => {
    if (activeProfile) {
      // Créer une copie des nutriments pour éviter les mises à jour en boucle
      const nutrientsSnapshot = {
        glucides: totalNutrients.glucides,
        proteines: totalNutrients.proteines,
        lipides: totalNutrients.lipides,
        fibres: totalNutrients.fibres,
        lipids: totalNutrients.lipids,
        vitamines: { ...totalNutrients.vitamines },
        mineraux: { ...totalNutrients.mineraux },
        oligoelements: { ...totalNutrients.oligoelements }
      };
      
      updateNutrientIntake(nutrientsSnapshot);
    }
  }, [items, activeProfile, updateNutrientIntake]);
  
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Mon assiette du jour</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Suivez vos apports nutritionnels quotidiens en ajoutant les aliments consommés.
        </p>
      </div>
      
      {/* Search and clear buttons */}
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        clearPlate={clearPlate}
        itemsCount={items.length}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        {/* List of consumed foods */}
        <div>
          <h2 className="text-xl font-medium mb-4">Aliments consommés ({items.length})</h2>
          <FoodList 
            items={items} 
            onRemoveItem={removeItem} 
            onUpdateItem={updateItem}
          />
        </div>
        
        {/* Nutrition charts and summaries */}
        <div>
          <h2 className="text-xl font-medium mb-4">Mes apports du jour</h2>
          
          {activeProfile && (
            <NutrientSummary 
              totalNutrients={totalNutrients}
              activeProfile={activeProfile}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MonAssiette;
