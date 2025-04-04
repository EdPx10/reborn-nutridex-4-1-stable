
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { renderNutrientField } from './NutrientFieldRenderer';
import { UserProfile } from '@/types';

interface MicronutrientFieldsProps {
  form: UseFormReturn<any>;
  profile: UserProfile;
}

const MicronutrientFields: React.FC<MicronutrientFieldsProps> = ({ form, profile }) => {
  return (
    <>
      <div className="rounded-lg border p-4">
        <h3 className="font-medium mb-2">Vitamines</h3>
        
        {Object.entries(profile.goals.vitamines).map(([key, value]) => {
          let label = key;
          if (key.startsWith('vitamine')) {
            const letter = key.replace('vitamine', '');
            label = `Vitamine ${letter.toUpperCase()}`;
          }
          
          return renderNutrientField({
            category: 'vitamines',
            nutrientKey: key,
            label: label,
            unit: value.unit,
            path: `goals.vitamines.${key}.goal`,
            form
          });
        })}
      </div>
      
      <div className="rounded-lg border p-4">
        <h3 className="font-medium mb-2">Minéraux</h3>
        
        {Object.entries(profile.goals.mineraux).map(([key, value]) => (
          renderNutrientField({
            category: 'mineraux',
            nutrientKey: key,
            label: key.charAt(0).toUpperCase() + key.slice(1),
            unit: value.unit,
            path: `goals.mineraux.${key}.goal`,
            form
          })
        ))}
      </div>
      
      {Object.keys(profile.goals.oligoelements).length > 0 && (
        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-2">Oligo-éléments</h3>
          
          {Object.entries(profile.goals.oligoelements).map(([key, value]) => (
            renderNutrientField({
              category: 'oligoelements',
              nutrientKey: key,
              label: key.charAt(0).toUpperCase() + key.slice(1),
              unit: value.unit,
              path: `goals.oligoelements.${key}.goal`,
              form
            })
          ))}
        </div>
      )}
    </>
  );
};

export default MicronutrientFields;
