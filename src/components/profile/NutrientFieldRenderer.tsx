
import React from 'react';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getNutrientIcon } from '@/components/ui/NutrientIcons';
import { UseFormReturn } from 'react-hook-form';

interface NutrientFieldProps {
  category: 'macro' | 'vitamines' | 'mineraux' | 'oligoelements';
  nutrientKey: string;
  label: string;
  unit: string;
  path: string;
  form: UseFormReturn<any>;
}

export const renderNutrientField = ({
  category,
  nutrientKey,
  label,
  unit,
  path,
  form
}: NutrientFieldProps) => {
  return (
    <div className="flex items-center gap-3 my-3">
      <div className="flex items-center gap-2 flex-1">
        {getNutrientIcon(category, nutrientKey, 16)}
        <span className="text-sm">{label}</span>
      </div>
      <FormField
        control={form.control}
        name={path as any}
        render={({ field }) => (
          <FormItem className="flex-none w-28">
            <div className="flex items-center">
              <FormControl>
                <Input
                  type="number"
                  placeholder="Valeur"
                  className="w-20 text-right"
                  {...field}
                />
              </FormControl>
              <span className="ml-1 text-sm text-gray-500">{unit}</span>
            </div>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};
