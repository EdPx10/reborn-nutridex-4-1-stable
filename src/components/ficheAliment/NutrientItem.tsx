
import React from 'react';
import getNutrientIcon from '@/components/ui/NutrientIcons';

interface NutrientItemProps {
  label: string;
  value: number;
  unit: string;
  nutrientKey?: string;
  category?: string;
}

// Helper function to format numbers to 1 decimal place if needed
const formatValue = (value: number): string => {
  return Number.isInteger(value) ? value.toString() : value.toFixed(1);
};

export const NutrientItem: React.FC<NutrientItemProps> = ({ 
  label, 
  value, 
  unit,
  nutrientKey,
  category
}) => {
  // Don't display if value is 0
  if (value <= 0) return null;
  
  const iconElement = category && nutrientKey ? 
    getNutrientIcon(category, nutrientKey, 16, "mr-1.5") : null;
  
  return (
    <div className="inline-flex items-center mr-4 mb-2">
      {iconElement}
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm ml-1">{formatValue(value)} {unit}</span>
    </div>
  );
};

export default NutrientItem;
