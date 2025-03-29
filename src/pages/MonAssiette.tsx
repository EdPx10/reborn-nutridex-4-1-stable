
import React, { useState, useEffect } from 'react';
import { Search, Trash2, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { getFoodById } from '@/data/foods';
import { Food } from '@/types';
import { foodCategories } from '@/data/healthBenefits';
import { NutrientBadge } from '@/components/ui/NutrientBadge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ConsumedFood {
  food: Food;
  quantity: number;
}

interface SubLipids {
  saturated: number;
  monoUnsaturated: number;
  polyUnsaturated: number;
  omega3: number;
  omega6: number;
}

const MonAssiette: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [consumedFoods, setConsumedFoods] = useState<ConsumedFood[]>([]);
  const [lipidsExpanded, setLipidsExpanded] = useState(false);
  const [polyUnsaturatedExpanded, setPolyUnsaturatedExpanded] = useState(false);
  const { activeProfile } = useUserProfile();
  
  // Charger les aliments depuis localStorage
  useEffect(() => {
    const storedFoods = localStorage.getItem('nutridex-consumed-foods');
    if (storedFoods) {
      try {
        const parsedFoods = JSON.parse(storedFoods);
        // Convertir les données pour avoir les objets Food complets
        const foods = parsedFoods.map((item: {foodId: string, quantity: number}) => ({
          food: getFoodById(item.foodId) as Food,
          quantity: item.quantity
        })).filter((item: {food: Food | undefined}) => item.food !== undefined);
        
        setConsumedFoods(foods as ConsumedFood[]);
      } catch (error) {
        console.error('Error loading consumed foods:', error);
      }
    }
  }, []);
  
  // Sauvegarder les aliments dans localStorage
  useEffect(() => {
    if (consumedFoods.length > 0) {
      const foodsToSave = consumedFoods.map(item => ({
        foodId: item.food.id,
        quantity: item.quantity
      }));
      localStorage.setItem('nutridex-consumed-foods', JSON.stringify(foodsToSave));
    }
  }, [consumedFoods]);
  
  const handleRemoveFood = (index: number) => {
    setConsumedFoods(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };
  
  // Calculer les nutriments totaux
  const totalNutrients = consumedFoods.reduce(
    (acc, { food, quantity }) => {
      const factor = quantity / food.portion.amount;
      
      return {
        glucides: acc.glucides + food.nutrients.glucides * factor,
        proteines: acc.proteines + food.nutrients.proteines * factor,
        lipides: acc.lipides + food.nutrients.lipides * factor,
        fibres: acc.fibres + (food.nutrients.fibres || 0) * factor,
        // Sous-catégories de lipides
        lipids: {
          saturated: acc.lipids.saturated + ((food.nutrients.lipids?.saturated || 0) * factor),
          monoUnsaturated: acc.lipids.monoUnsaturated + ((food.nutrients.lipids?.monoUnsaturated || 0) * factor),
          polyUnsaturated: acc.lipids.polyUnsaturated + ((food.nutrients.lipids?.polyUnsaturated || 0) * factor),
          omega3: acc.lipids.omega3 + ((food.nutrients.lipids?.omega3 || 0) * factor),
          omega6: acc.lipids.omega6 + ((food.nutrients.lipids?.omega6 || 0) * factor),
        },
        // Micronutriments
        vitamines: {
          a: acc.vitamines.a + ((food.nutrients.vitamines?.a || 0) * factor),
          c: acc.vitamines.c + ((food.nutrients.vitamines?.c || 0) * factor),
          d: acc.vitamines.d + ((food.nutrients.vitamines?.d || 0) * factor),
          e: acc.vitamines.e + ((food.nutrients.vitamines?.e || 0) * factor),
          k: acc.vitamines.k + ((food.nutrients.vitamines?.k || 0) * factor),
          b1: acc.vitamines.b1 + ((food.nutrients.vitamines?.b1 || 0) * factor),
          b2: acc.vitamines.b2 + ((food.nutrients.vitamines?.b2 || 0) * factor),
          b3: acc.vitamines.b3 + ((food.nutrients.vitamines?.b3 || 0) * factor),
          b5: acc.vitamines.b5 + ((food.nutrients.vitamines?.b5 || 0) * factor),
          b6: acc.vitamines.b6 + ((food.nutrients.vitamines?.b6 || 0) * factor),
          b9: acc.vitamines.b9 + ((food.nutrients.vitamines?.b9 || 0) * factor),
          b12: acc.vitamines.b12 + ((food.nutrients.vitamines?.b12 || 0) * factor)
        },
        mineraux: {
          calcium: acc.mineraux.calcium + ((food.nutrients.mineraux?.calcium || 0) * factor),
          fer: acc.mineraux.fer + ((food.nutrients.mineraux?.fer || 0) * factor),
          magnesium: acc.mineraux.magnesium + ((food.nutrients.mineraux?.magnesium || 0) * factor),
          zinc: acc.mineraux.zinc + ((food.nutrients.mineraux?.zinc || 0) * factor),
          sodium: acc.mineraux.sodium + ((food.nutrients.mineraux?.sodium || 0) * factor),
          potassium: acc.mineraux.potassium + ((food.nutrients.mineraux?.potassium || 0) * factor),
          phosphore: acc.mineraux.phosphore + ((food.nutrients.mineraux?.phosphore || 0) * factor),
          iode: acc.mineraux.iode + ((food.nutrients.mineraux?.iode || 0) * factor),
          selenium: acc.mineraux.selenium + ((food.nutrients.mineraux?.selenium || 0) * factor)
        }
      };
    },
    { 
      glucides: 0, 
      proteines: 0, 
      lipides: 0, 
      fibres: 0,
      lipids: {
        saturated: 0,
        monoUnsaturated: 0,
        polyUnsaturated: 0,
        omega3: 0,
        omega6: 0
      },
      vitamines: {
        a: 0, c: 0, d: 0, e: 0, k: 0, 
        b1: 0, b2: 0, b3: 0, b5: 0, b6: 0, b9: 0, b12: 0
      },
      mineraux: {
        calcium: 0, fer: 0, magnesium: 0, zinc: 0,
        sodium: 0, potassium: 0, phosphore: 0, iode: 0, selenium: 0
      }
    }
  );
  
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Mon assiette du jour</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Suivez vos apports nutritionnels quotidiens en ajoutant les aliments consommés.
        </p>
      </div>
      
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
        <button 
          className="bg-gray-100 px-4 rounded-r-full border-y border-r border-gray-200 hover:bg-gray-200"
        >
          <Trash2 size={20} className="text-gray-500" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        {/* Liste des aliments consommés */}
        <div>
          <h2 className="text-xl font-medium mb-4">Aliments consommés ({consumedFoods.length})</h2>
          
          {consumedFoods.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg border border-gray-100">
              <p className="text-gray-500">Aucun aliment ajouté à votre assiette</p>
              <p className="text-sm text-gray-400 mt-2">
                Recherchez et ajoutez des aliments pour suivre vos apports nutritionnels
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {consumedFoods.map((item, index) => (
                <ConsumedFoodItem 
                  key={`${item.food.id}-${index}`}
                  item={item}
                  onRemove={() => handleRemoveFood(index)}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Graphiques des apports nutritionnels */}
        <div>
          <h2 className="text-xl font-medium mb-4">Mes apports du jour</h2>
          
          {activeProfile && (
            <div className="bg-white rounded-lg border border-gray-100 p-6">
              <Tabs defaultValue="macronutriments" className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="macronutriments" className="flex-1">Macronutriments</TabsTrigger>
                  <TabsTrigger value="micronutriments" className="flex-1">Micronutriments</TabsTrigger>
                </TabsList>
                
                <TabsContent value="macronutriments" className="space-y-6">
                  <NutrientProgress
                    label="Glucides"
                    current={totalNutrients.glucides}
                    goal={activeProfile.goals.glucides.goal}
                    unit="g"
                    color="bg-nutri-blue"
                  />
                  <NutrientProgress
                    label="Protéines"
                    current={totalNutrients.proteines}
                    goal={activeProfile.goals.proteines.goal}
                    unit="g"
                    color="bg-nutri-red"
                  />
                  
                  <div className="border-t border-b border-gray-100 py-2">
                    <button 
                      className="flex justify-between items-center w-full py-2 text-left font-medium"
                      onClick={() => setLipidsExpanded(!lipidsExpanded)}
                    >
                      <span>Lipides</span>
                      {lipidsExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    
                    {lipidsExpanded && (
                      <div className="pt-2 pb-3 space-y-6">
                        <NutrientProgress
                          label="Lipides (Total)"
                          current={totalNutrients.lipides}
                          goal={activeProfile.goals.lipides.goal}
                          unit="g"
                          color="bg-nutri-yellow"
                          indent={false}
                        />
                        
                        <NutrientProgress
                          label="Acides gras saturés"
                          current={totalNutrients.lipids.saturated}
                          goal={activeProfile.goals.lipides.goal * 0.33} // Approximation
                          unit="g"
                          color="bg-nutri-yellow"
                          indent={true}
                        />
                        
                        <NutrientProgress
                          label="Acides gras mono-insaturés"
                          current={totalNutrients.lipids.monoUnsaturated}
                          goal={activeProfile.goals.lipides.goal * 0.33} // Approximation
                          unit="g"
                          color="bg-nutri-yellow"
                          indent={true}
                        />
                        
                        <div className="border-t border-b border-gray-50 py-2 ml-6">
                          <button 
                            className="flex justify-between items-center w-full py-2 text-left"
                            onClick={() => setPolyUnsaturatedExpanded(!polyUnsaturatedExpanded)}
                          >
                            <span>Acides gras poly-insaturés</span>
                            {polyUnsaturatedExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                          
                          {polyUnsaturatedExpanded ? (
                            <div className="pt-2 pb-3 space-y-6">
                              <NutrientProgress
                                label="Acides gras poly-insaturés (Total)"
                                current={totalNutrients.lipids.polyUnsaturated}
                                goal={activeProfile.goals.lipides.goal * 0.33} // Approximation
                                unit="g"
                                color="bg-nutri-yellow"
                                indent={true}
                              />
                              
                              <NutrientProgress
                                label="Oméga-3"
                                current={totalNutrients.lipids.omega3}
                                goal={2} // Recommandation générale
                                unit="g"
                                color="bg-nutri-yellow"
                                indent={true}
                              />
                              
                              <NutrientProgress
                                label="Oméga-6"
                                current={totalNutrients.lipids.omega6}
                                goal={10} // Recommandation générale
                                unit="g"
                                color="bg-nutri-yellow"
                                indent={true}
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <NutrientProgress
                    label="Fibres"
                    current={totalNutrients.fibres}
                    goal={activeProfile.goals.fibres.goal}
                    unit="g"
                    color="bg-nutri-green"
                  />
                </TabsContent>
                
                <TabsContent value="micronutriments" className="space-y-4">
                  <Accordion title="Vitamines" defaultOpen={true}>
                    <div className="space-y-6 pt-2">
                      {Object.entries(totalNutrients.vitamines).map(([key, value]) => {
                        const vitaminGoal = activeProfile.goals.vitamines[key];
                        if (!vitaminGoal) return null;
                        
                        return (
                          <MicroNutrientProgress
                            key={key}
                            label={`Vitamine ${key.toUpperCase()}`}
                            current={value}
                            goal={vitaminGoal.goal}
                            unit={vitaminGoal.unit}
                          />
                        );
                      })}
                    </div>
                  </Accordion>
                  
                  <Accordion title="Minéraux">
                    <div className="space-y-6 pt-2">
                      {Object.entries(totalNutrients.mineraux).map(([key, value]) => {
                        const mineralGoal = activeProfile.goals.mineraux[key];
                        if (!mineralGoal) return null;
                        
                        return (
                          <MicroNutrientProgress
                            key={key}
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            current={value}
                            goal={mineralGoal.goal}
                            unit={mineralGoal.unit}
                          />
                        );
                      })}
                    </div>
                  </Accordion>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ConsumedFoodItemProps {
  item: ConsumedFood;
  onRemove: () => void;
}

const ConsumedFoodItem: React.FC<ConsumedFoodItemProps> = ({ item, onRemove }) => {
  const { food, quantity } = item;
  const categoryInfo = foodCategories.find(c => c.id === food.category);
  
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-4 flex items-center gap-3">
      {food.image ? (
        <img 
          src={food.image} 
          alt={food.name} 
          className="w-16 h-16 rounded-md object-cover"
        />
      ) : (
        <div className={`w-16 h-16 rounded-md flex items-center justify-center ${categoryInfo?.color || 'bg-gray-100'}`}>
          {food.name.charAt(0)}
        </div>
      )}
      
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{food.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${categoryInfo?.color || 'bg-gray-100'}`}>
              {categoryInfo?.name || food.category}
            </span>
          </div>
          <button onClick={onRemove} className="p-1 text-gray-400 hover:text-red-500">
            <Trash2 size={16} />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {food.healthBenefits.slice(0, 2).map((benefit) => (
            <NutrientBadge 
              key={benefit} 
              type={benefit} 
              showName={false} 
            />
          ))}
          {food.healthBenefits.length > 2 && (
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100">
              +{food.healthBenefits.length - 2}
            </span>
          )}
        </div>
      </div>
      
      <div className="text-right">
        <div className="font-medium">
          {quantity}{food.portion.unit}
        </div>
        <div className="text-sm text-gray-500 mt-1">
          <Check size={12} className="inline-block text-nutri-green" />
        </div>
      </div>
    </div>
  );
};

interface NutrientProgressProps {
  label: string;
  current: number;
  goal: number;
  unit: string;
  color: string;
  indent?: boolean;
}

const NutrientProgress: React.FC<NutrientProgressProps> = ({ 
  label, 
  current, 
  goal, 
  unit, 
  color,
  indent = false
}) => {
  const percentage = Math.round((current / goal) * 100);
  
  return (
    <div className={indent ? "ml-6" : ""}>
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium">{label}</span>
        <span>
          {current.toFixed(1)}/{goal} {unit}
        </span>
      </div>
      <ProgressBar 
        value={current} 
        max={goal} 
        color={color}
        height="h-3"
      />
      <div className="text-right text-sm text-gray-500 mt-1">
        {percentage}% {goal > current ? `(Recommandation: ${goal} ${unit})` : '(Objectif atteint)'}
      </div>
    </div>
  );
};

interface MicroNutrientProgressProps {
  label: string;
  current: number;
  goal: number;
  unit: string;
}

const MicroNutrientProgress: React.FC<MicroNutrientProgressProps> = ({ 
  label, 
  current, 
  goal, 
  unit
}) => {
  const percentage = Math.round((current / goal) * 100);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span>{label}</span>
        <span className="text-sm text-gray-600">
          {current.toFixed(1)} / {goal} {unit}
        </span>
      </div>
      
      <ProgressBar 
        value={current} 
        max={goal} 
        color="bg-nutri-orange"
        height="h-2"
      />
      
      <div className="text-right mt-1 text-sm text-gray-500">
        {percentage}% de l'objectif
      </div>
    </div>
  );
};

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-t border-b border-gray-100 py-2">
      <button 
        className="flex justify-between items-center w-full py-2 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{title}</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      
      {isOpen && (
        <div className="pt-2 pb-3">
          {children}
        </div>
      )}
    </div>
  );
};

export default MonAssiette;
