
import React from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { renderNutrientField } from './NutrientFieldRenderer';
import { useEffect } from 'react';

interface LipidsFieldsProps {
  form: UseFormReturn<any>;
}

const LipidsFields: React.FC<LipidsFieldsProps> = ({ form }) => {
  // Watch lipid component values to update totals automatically
  const saturatedGoal = useWatch({
    control: form.control,
    name: "goals.lipids.saturated.goal"
  });
  
  const monoUnsaturatedGoal = useWatch({
    control: form.control,
    name: "goals.lipids.monoUnsaturated.goal"
  });
  
  const omega3Goal = useWatch({
    control: form.control,
    name: "goals.lipids.omega3.goal"
  });
  
  const omega6Goal = useWatch({
    control: form.control,
    name: "goals.lipids.omega6.goal"
  });
  
  // Calculate polyunsaturated automatically from omega3 + omega6
  const polyUnsaturatedGoal = Number(omega3Goal) + Number(omega6Goal);
  
  // Format the polyunsaturated value with at most 1 decimal place
  const formattedPolyUnsaturatedGoal = Number.isInteger(polyUnsaturatedGoal) 
    ? polyUnsaturatedGoal.toString() 
    : polyUnsaturatedGoal.toFixed(1);
  
  // Update polyunsaturated value when omega3 or omega6 changes
  useEffect(() => {
    form.setValue("goals.lipids.polyUnsaturated.goal", polyUnsaturatedGoal);
  }, [omega3Goal, omega6Goal, form]);
  
  // Calculate total lipids as sum of components
  const totalLipids = Number(saturatedGoal) + Number(monoUnsaturatedGoal) + polyUnsaturatedGoal;
  
  // Format total lipids with at most 1 decimal place
  const formattedTotalLipids = Number.isInteger(totalLipids) 
    ? totalLipids.toString() 
    : totalLipids.toFixed(1);
  
  // Update total lipids value when components change
  useEffect(() => {
    form.setValue("goals.lipides.goal", totalLipids);
  }, [saturatedGoal, monoUnsaturatedGoal, polyUnsaturatedGoal, form]);

  return (
    <>
      {/* Lipides total - rendu en lecture seule */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Lipides (Total)</label>
          <span className="text-xs text-gray-500">g</span>
        </div>
        <Input
          value={formattedTotalLipids}
          readOnly
          disabled
          className="bg-gray-100"
        />
        <p className="text-xs text-gray-500">
          Calculé automatiquement comme la somme des acides gras
        </p>
      </div>
      
      <Separator className="my-3" />
      <h4 className="text-sm text-gray-500 mb-2">Lipides détaillés</h4>
      
      {renderNutrientField({
        category: 'macro',
        nutrientKey: 'lipides',
        label: 'Acides gras saturés (AGS)',
        unit: 'g',
        path: 'goals.lipids.saturated.goal',
        form
      })}
      {renderNutrientField({
        category: 'macro',
        nutrientKey: 'lipides',
        label: 'Acides gras mono-insaturés (AMS)',
        unit: 'g',
        path: 'goals.lipids.monoUnsaturated.goal',
        form
      })}
      
      {/* Poly-insaturés - rendu en lecture seule car calculé automatiquement */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Acides gras poly-insaturés (AGP)</label>
          <span className="text-xs text-gray-500">g</span>
        </div>
        <Input
          value={formattedPolyUnsaturatedGoal}
          readOnly
          disabled
          className="bg-gray-100"
        />
        <p className="text-xs text-gray-500">
          Calculé automatiquement comme Oméga-3 + Oméga-6
        </p>
      </div>
      
      {renderNutrientField({
        category: 'macro',
        nutrientKey: 'lipides',
        label: 'Oméga-3',
        unit: 'g',
        path: 'goals.lipids.omega3.goal',
        form
      })}
      {renderNutrientField({
        category: 'macro',
        nutrientKey: 'lipides',
        label: 'Oméga-6',
        unit: 'g',
        path: 'goals.lipids.omega6.goal',
        form
      })}
    </>
  );
};

export default LipidsFields;
