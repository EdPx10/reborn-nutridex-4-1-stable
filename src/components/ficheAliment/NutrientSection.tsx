
import React from 'react';
import NutrientItem from './NutrientItem';

interface NutrientSectionProps {
  title: string;
  nutrients: Record<string, number>;
  unit?: string;
  labelFormatter?: (key: string) => string;
  category?: string;
}

export const NutrientSection: React.FC<NutrientSectionProps> = ({ 
  title, 
  nutrients, 
  unit = 'mg', 
  labelFormatter,
  category
}) => {
  if (!nutrients || Object.keys(nutrients).length === 0) {
    return null;
  }

  // Filter out nutrients with value 0
  const nonZeroNutrients = Object.entries(nutrients)
    .filter(([_, value]) => value > 0)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  if (Object.keys(nonZeroNutrients).length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg">
      <h2 className="font-medium text-xl mb-3">{title}</h2>
      <div className="flex flex-wrap">
        {Object.entries(nonZeroNutrients)
          .sort(([, valueA], [, valueB]) => valueB - valueA) // Sort by value (highest first)
          .map(([key, value]) => {
            const formattedLabel = labelFormatter ? labelFormatter(key) : key;
            
            return (
              <NutrientItem 
                key={key}
                label={formattedLabel}
                value={value} 
                unit={unit}
                nutrientKey={key}
                category={category}
              />
            );
          })}
      </div>
    </div>
  );
};

export default NutrientSection;
