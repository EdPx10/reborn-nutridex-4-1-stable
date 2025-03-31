
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MacronutrientTab from './MacronutrientTab';
import MicronutrientTab from './MicronutrientTab';
import { UserProfile } from '@/types';

interface NutrientSummaryProps {
  totalNutrients: {
    glucides: number;
    proteines: number;
    lipides: number;
    fibres: number;
    lipids: {
      saturated: number;
      monoUnsaturated: number;
      polyUnsaturated: number;
      omega3: number;
      omega6: number;
    };
    vitamines: {
      [key: string]: number;
    };
    mineraux: {
      [key: string]: number;
    };
  };
  activeProfile: UserProfile;
}

export const NutrientSummary: React.FC<NutrientSummaryProps> = ({ totalNutrients, activeProfile }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6">
      <Tabs defaultValue="macronutriments" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="macronutriments" className="flex-1">Macronutriments</TabsTrigger>
          <TabsTrigger value="micronutriments" className="flex-1">Micronutriments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="macronutriments">
          <MacronutrientTab 
            totalNutrients={totalNutrients} 
            activeProfile={activeProfile} 
          />
        </TabsContent>
        
        <TabsContent value="micronutriments">
          <MicronutrientTab
            totalNutrients={totalNutrients}
            activeProfile={activeProfile}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NutrientSummary;
