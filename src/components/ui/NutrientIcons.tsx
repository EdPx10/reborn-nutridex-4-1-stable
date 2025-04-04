
import { 
  Wheat, 
  Beef, 
  Droplet, 
  Salad, 
  Pill, 
  CircleDot, 
  AtomIcon, 
  Sun, 
  Citrus, 
  CircleDashed, 
  Flower, 
  Milk, 
  FlaskConical
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
    vitamineA: { icon: Sun, color: 'text-amber-500' }, // Vitamine liposoluble
    vitamineD: { icon: Sun, color: 'text-amber-400' }, // Vitamine liposoluble
    vitamineE: { icon: Sun, color: 'text-amber-300' }, // Vitamine liposoluble
    vitamineK1: { icon: Flower, color: 'text-green-800' }, // Vitamine liposoluble
    vitamineC: { icon: Citrus, color: 'text-orange-400' }, // Vitamine hydrosoluble
    vitamineB1: { icon: Pill, color: 'text-green-400' }, // Vitamine hydrosoluble
    vitamineB2: { icon: Pill, color: 'text-green-500' }, // Vitamine hydrosoluble
    vitamineB3: { icon: Pill, color: 'text-green-600' }, // Vitamine hydrosoluble
    vitamineB5: { icon: Pill, color: 'text-green-700' }, // Vitamine hydrosoluble
    vitamineB6: { icon: Pill, color: 'text-teal-400' }, // Vitamine hydrosoluble
    vitamineB8: { icon: Pill, color: 'text-teal-300' }, // Vitamine hydrosoluble
    vitamineB9: { icon: Pill, color: 'text-teal-500' }, // Vitamine hydrosoluble
    vitamineB12: { icon: Pill, color: 'text-teal-600' }, // Vitamine hydrosoluble
    default: { icon: CircleDot, color: 'text-purple-500' }, // Pour les autres
  },
  
  // Minéraux
  mineraux: {
    calcium: { icon: Milk, color: 'text-blue-400' },
    magnesium: { icon: AtomIcon, color: 'text-blue-500' },
    phosphore: { icon: AtomIcon, color: 'text-indigo-400' },
    potassium: { icon: AtomIcon, color: 'text-blue-600' }, 
    sodium: { icon: AtomIcon, color: 'text-blue-700' },
    default: { icon: CircleDashed, color: 'text-gray-500' },
  },
  
  // Oligo-éléments
  oligoelements: {
    fer: { icon: FlaskConical, color: 'text-red-500' },
    zinc: { icon: FlaskConical, color: 'text-indigo-500' },
    cuivre: { icon: FlaskConical, color: 'text-amber-600' },
    manganese: { icon: FlaskConical, color: 'text-purple-500' },
    selenium: { icon: FlaskConical, color: 'text-indigo-600' },
    iode: { icon: FlaskConical, color: 'text-violet-500' },
    chrome: { icon: FlaskConical, color: 'text-gray-600' },
    molybdene: { icon: FlaskConical, color: 'text-gray-700' },
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
