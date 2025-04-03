
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { renderNutrientField } from './NutrientFieldRenderer';
import LipidsFields from './LipidsFields';

interface MacronutrientFieldsProps {
  form: UseFormReturn<any>;
}

const MacronutrientFields: React.FC<MacronutrientFieldsProps> = ({ form }) => {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-medium mb-2">Macronutriments</h3>
      
      {renderNutrientField({
        category: 'macro',
        nutrientKey: 'glucides',
        label: 'Glucides',
        unit: 'g',
        path: 'goals.glucides.goal',
        form
      })}
      {renderNutrientField({
        category: 'macro',
        nutrientKey: 'proteines',
        label: 'Protéines',
        unit: 'g',
        path: 'goals.proteines.goal',
        form
      })}
      
      <LipidsFields form={form} />

      {renderNutrientField({
        category: 'macro',
        nutrientKey: 'fibres',
        label: 'Fibres',
        unit: 'g',
        path: 'goals.fibres.goal',
        form
      })}
    </div>
  );
};

export default MacronutrientFields;
