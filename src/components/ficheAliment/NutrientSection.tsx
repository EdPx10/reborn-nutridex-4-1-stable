
import React from 'react';
import NutrientItem from './NutrientItem';

interface NutrientSectionProps {
  title: string;
  nutrients: Record<string, number>;
  unit?: string;
  color?: string;
  labelFormatter?: (key: string) => string;
}

export const NutrientSection: React.FC<NutrientSectionProps> = ({ 
  title, 
  nutrients, 
  unit = 'mg', 
  color,
  labelFormatter
}) => {
  if (!nutrients || Object.keys(nutrients).length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="font-medium text-xl mb-4">{title}</h2>
      <div className="space-y-4">
        {Object.entries(nutrients).map(([key, value]) => (
          <NutrientItem 
            key={key} 
            label={labelFormatter ? labelFormatter(key) : key}
            value={value} 
            unit={unit} 
            color={color}
          />
        ))}
      </div>
    </div>
  );
};

export default NutrientSection;
