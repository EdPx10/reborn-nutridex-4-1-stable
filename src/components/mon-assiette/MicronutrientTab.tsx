
import React from 'react';
import Accordion from './Accordion';
import MicroNutrientProgress from './MicroNutrientProgress';
import { getNutrientIcon } from '@/components/ui/NutrientIcons';

interface MicronutrientTabProps {
  totalNutrients: {
    vitamines: {
      [key: string]: number;
    };
    mineraux: {
      [key: string]: number;
    };
    oligoelements?: {
      [key: string]: number;
    };
  };
  activeProfile: {
    goals: {
      vitamines: {
        [key: string]: { goal: number; unit: string };
      };
      mineraux: {
        [key: string]: { goal: number; unit: string };
      };
      oligoelements?: {
        [key: string]: { goal: number; unit: string };
      };
    };
  };
}

export const MicronutrientTab: React.FC<MicronutrientTabProps> = ({ 
  totalNutrients, 
  activeProfile 
}) => {
  return (
    <div className="space-y-4">
      <Accordion title="Vitamines" defaultOpen={true}>
        <div className="space-y-6 pt-2">
          {Object.entries(totalNutrients.vitamines).map(([key, value]) => {
            const vitaminGoal = activeProfile.goals.vitamines[key];
            if (!vitaminGoal) return null;
            
            return (
              <div key={key} className="flex items-center gap-2">
                {getNutrientIcon('vitamines', key, 16)}
                <MicroNutrientProgress
                  label={`Vitamine ${key.toUpperCase()}`}
                  current={value}
                  goal={vitaminGoal.goal}
                  unit={vitaminGoal.unit}
                />
              </div>
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
              <div key={key} className="flex items-center gap-2">
                {getNutrientIcon('mineraux', key, 16)}
                <MicroNutrientProgress
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  current={value}
                  goal={mineralGoal.goal}
                  unit={mineralGoal.unit}
                />
              </div>
            );
          })}
        </div>
      </Accordion>
      
      <Accordion title="Oligo-éléments">
        {totalNutrients.oligoelements && activeProfile.goals.oligoelements && 
         Object.keys(totalNutrients.oligoelements).length > 0 ? (
          <div className="space-y-6 pt-2">
            {Object.entries(totalNutrients.oligoelements).map(([key, value]) => {
              const oligoGoal = activeProfile.goals.oligoelements?.[key];
              if (!oligoGoal) return null;
              
              return (
                <div key={key} className="flex items-center gap-2">
                  {getNutrientIcon('oligoelements', key, 16)}
                  <MicroNutrientProgress
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    current={value}
                    goal={oligoGoal.goal}
                    unit={oligoGoal.unit}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 italic pt-2">
            Aucun objectif défini pour les oligo-éléments
          </p>
        )}
      </Accordion>
    </div>
  );
};

export default MicronutrientTab;
