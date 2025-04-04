
import React from 'react';
import Accordion from './Accordion';
import MicroNutrientProgress from './MicroNutrientProgress';

// Helper function to format vitamin names
const formatVitaminName = (key: string): string => {
  if (key.startsWith('vitamine')) {
    const letter = key.replace('vitamine', '');
    return `Vitamine ${letter.toUpperCase()}`;
  }
  return key.charAt(0).toUpperCase() + key.slice(1);
};

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
        [key: string]: { goal: number; unit: string; current: number };
      };
      mineraux: {
        [key: string]: { goal: number; unit: string; current: number };
      };
      oligoelements?: {
        [key: string]: { goal: number; unit: string; current: number };
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
          {Object.entries(activeProfile.goals.vitamines).map(([key, value]) => {
            // Only show if there's a value or it's in the totalNutrients
            const currentValue = totalNutrients.vitamines[key] ?? 0;
            
            return (
              <MicroNutrientProgress
                key={key}
                label={formatVitaminName(key)}
                current={currentValue}
                goal={value.goal}
                unit={value.unit}
                category="vitamines"
                nutrientKey={key}
              />
            );
          })}
        </div>
      </Accordion>
      
      <Accordion title="Minéraux">
        <div className="space-y-6 pt-2">
          {Object.entries(activeProfile.goals.mineraux).map(([key, value]) => {
            const currentValue = totalNutrients.mineraux[key] ?? 0;
            
            return (
              <MicroNutrientProgress
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                current={currentValue}
                goal={value.goal}
                unit={value.unit}
                category="mineraux"
                nutrientKey={key}
              />
            );
          })}
        </div>
      </Accordion>
      
      <Accordion title="Oligo-éléments">
        {activeProfile.goals.oligoelements && Object.keys(activeProfile.goals.oligoelements).length > 0 ? (
          <div className="space-y-6 pt-2">
            {Object.entries(activeProfile.goals.oligoelements).map(([key, value]) => {
              const currentValue = totalNutrients.oligoelements?.[key] ?? 0;
              
              return (
                <MicroNutrientProgress
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  current={currentValue}
                  goal={value.goal}
                  unit={value.unit}
                  category="oligoelements"
                  nutrientKey={key}
                />
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
