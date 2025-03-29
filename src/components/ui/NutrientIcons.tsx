
import { 
  Wheat, 
  Beef, 
  Droplet, 
  Salad, 
  Pill, 
  CircleDot, 
  AtomIcon, 
  Sun, 
  Banana, 
  CircleDashed 
} from 'lucide-react';

export const MacroIcons = {
  glucides: { 
    icon: Wheat, 
    color: 'text-nutri-blue' 
  },
  proteines: { 
    icon: Beef, 
    color: 'text-nutri-red' 
  },
  lipides: { 
    icon: Droplet, 
    color: 'text-nutri-yellow' 
  },
  fibres: { 
    icon: Salad, 
    color: 'text-nutri-green' 
  },
};

export const MicroIcons = {
  // Vitamines
  vitamines: {
    a: { icon: Sun, color: 'text-amber-500' }, // Vitamine liposoluble
    d: { icon: Sun, color: 'text-amber-400' }, // Vitamine liposoluble
    e: { icon: Sun, color: 'text-amber-300' }, // Vitamine liposoluble
    k: { icon: Sun, color: 'text-amber-200' }, // Vitamine liposoluble
    c: { icon: Banana, color: 'text-orange-400' }, // Vitamine hydrosoluble
    b1: { icon: Pill, color: 'text-green-400' }, // Vitamine hydrosoluble
    b2: { icon: Pill, color: 'text-green-500' }, // Vitamine hydrosoluble
    b3: { icon: Pill, color: 'text-green-600' }, // Vitamine hydrosoluble
    b5: { icon: Pill, color: 'text-green-700' }, // Vitamine hydrosoluble
    b6: { icon: Pill, color: 'text-teal-400' }, // Vitamine hydrosoluble
    b9: { icon: Pill, color: 'text-teal-500' }, // Vitamine hydrosoluble
    b12: { icon: Pill, color: 'text-teal-600' }, // Vitamine hydrosoluble
    default: { icon: CircleDot, color: 'text-purple-500' }, // Pour les autres
  },
  
  // Minéraux
  mineraux: {
    calcium: { icon: AtomIcon, color: 'text-blue-400' },
    magnesium: { icon: AtomIcon, color: 'text-blue-500' },
    potassium: { icon: AtomIcon, color: 'text-blue-600' }, 
    sodium: { icon: AtomIcon, color: 'text-blue-700' },
    fer: { icon: AtomIcon, color: 'text-red-400' },
    zinc: { icon: AtomIcon, color: 'text-red-500' },
    cuivre: { icon: AtomIcon, color: 'text-red-600' },
    default: { icon: CircleDashed, color: 'text-gray-500' },
  },
  
  // Oligo-éléments
  oligoelements: {
    iode: { icon: CircleDashed, color: 'text-indigo-400' },
    selenium: { icon: CircleDashed, color: 'text-indigo-500' },
    manganese: { icon: CircleDashed, color: 'text-indigo-600' },
    chrome: { icon: CircleDashed, color: 'text-indigo-700' },
    default: { icon: CircleDashed, color: 'text-gray-400' },
  }
};

export const getNutrientIcon = (
  category: string, 
  nutrient: string, 
  size: number = 18,
  className: string = ""
) => {
  let iconInfo;
  
  if (category === 'macro') {
    iconInfo = MacroIcons[nutrient as keyof typeof MacroIcons];
  } else if (category === 'vitamines') {
    iconInfo = MicroIcons.vitamines[nutrient as keyof typeof MicroIcons.vitamines] || 
               MicroIcons.vitamines.default;
  } else if (category === 'mineraux') {
    iconInfo = MicroIcons.mineraux[nutrient as keyof typeof MicroIcons.mineraux] || 
               MicroIcons.mineraux.default;
  } else if (category === 'oligoelements') {
    iconInfo = MicroIcons.oligoelements[nutrient as keyof typeof MicroIcons.oligoelements] || 
               MicroIcons.oligoelements.default;
  } else {
    // Fallback par défaut
    return <CircleDot size={size} className={`text-gray-400 ${className}`} />;
  }
  
  if (!iconInfo) return null;
  
  const Icon = iconInfo.icon;
  return <Icon size={size} className={`${iconInfo.color} ${className}`} />;
};

export default getNutrientIcon;
