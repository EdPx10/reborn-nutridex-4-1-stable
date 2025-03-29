
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
    <span className={cn('nutri-badge', color, className)}>
      {showIcon && <Icon size={14} />}
      {showName && <span>{name}</span>}
    </span>
  );
};

export default NutrientBadge;
