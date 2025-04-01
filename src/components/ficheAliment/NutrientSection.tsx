
import React from 'react';
import NutrientItem from './NutrientItem';
import getNutrientIcon from '@/components/ui/NutrientIcons';

interface NutrientSectionProps {
  title: string;
  nutrients: Record<string, number>;
  unit?: string;
  color?: string;
  labelFormatter?: (key: string) => string;
  calculateProportions?: boolean;
}

export const NutrientSection: React.FC<NutrientSectionProps> = ({ 
  title, 
  nutrients, 
  unit = 'mg', 
  color,
  labelFormatter,
  calculateProportions = false
}) => {
  if (!nutrients || Object.keys(nutrients).length === 0) {
    return null;
  }

  // Calculate total and percentages if needed
  let total = 0;
  const percentages: Record<string, number> = {};

  if (calculateProportions) {
    // Calculate total
    total = Object.values(nutrients).reduce((sum, value) => sum + value, 0);
    
    // Calculate percentages
    Object.entries(nutrients).forEach(([key, value]) => {
      percentages[key] = total > 0 ? (value / total) * 100 : 0;
    });
  }

  // Get category for icons based on title
  const iconCategory = title.toLowerCase() === 'vitamines' 
    ? 'vitamines' 
    : title.toLowerCase() === 'minéraux' 
      ? 'mineraux' 
      : 'oligoelements';

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h2 className="font-medium text-xl mb-4 flex items-center gap-2">
        {title}
        {total > 0 && (
          <span className="text-sm font-normal text-gray-500">
            (Total: {total.toFixed(1)} {unit})
          </span>
        )}
      </h2>
      <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
        {Object.entries(nutrients)
          .sort(([, valueA], [, valueB]) => valueB - valueA) // Sort by value (highest first)
          .map(([key, value]) => {
            const formattedLabel = labelFormatter ? labelFormatter(key) : key;
            const iconElement = getNutrientIcon(iconCategory, key, 16, "mr-1");
            
            return (
              <div key={key} className="flex items-start">
                {iconElement && (
                  <span className="mt-0.5">{iconElement}</span>
                )}
                <div className="flex-1">
                  <NutrientItem 
                    label={formattedLabel}
                    value={value} 
                    unit={unit} 
                    color={color}
                    percentage={calculateProportions ? percentages[key] : 0}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default NutrientSection;
