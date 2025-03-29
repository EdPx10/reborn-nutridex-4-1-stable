
import React from 'react';
import { healthBenefitsInfo } from '@/data/healthBenefits';
import { HealthBenefit } from '@/types';
import { cn } from '@/lib/utils';

interface NutrientBadgeProps {
  type: HealthBenefit;
  className?: string;
  showIcon?: boolean;
  showName?: boolean;
}

export const NutrientBadge: React.FC<NutrientBadgeProps> = ({ 
  type, 
  className,
  showIcon = true,
  showName = true
}) => {
  const benefit = healthBenefitsInfo[type];
  
  if (!benefit) return null;
  
  const { name, icon: Icon, color } = benefit;
  
  return (
    <span className={cn(`inline-flex items-center gap-1 text-xs rounded-full px-2 py-1 font-medium ${color}`, className)}>
      {showIcon && <Icon size={14} className="shrink-0" />}
      {showName && <span className="whitespace-nowrap">{name}</span>}
    </span>
  );
};

export default NutrientBadge;
