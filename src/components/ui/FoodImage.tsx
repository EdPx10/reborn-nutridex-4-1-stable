
import React from 'react';
import { FoodCategory } from '@/types';
import { Apple, Banana, CarrotIcon, Wheat, Fish, Beef, Sandwich } from 'lucide-react';

interface FoodImageProps {
  src?: string;
  alt: string;
  category: FoodCategory;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Couleurs pastels par catégorie pour les images par défaut
const categoryColors: Record<FoodCategory, string> = {
  'fruit': '#FEF7CD',    // Jaune pâle
  'legume': '#F2FCE2',   // Vert pâle
  'poisson': '#D3E4FD',  // Bleu pâle
  'viande': '#FFDEE2',   // Rose pâle
  'cereales': '#FEC6A1', // Orange pâle
  'noix': '#FDE1D3',     // Pêche pâle
  'legumineuse': '#E5DEFF', // Violet pâle
};

// Icônes par catégorie pour les images par défaut
const CategoryIcon: React.FC<{ category: FoodCategory; className?: string }> = ({ category, className }) => {
  const iconProps = { className, size: 36 };
  
  switch (category) {
    case 'fruit':
      return <Apple {...iconProps} />;
    case 'legume':
      return <CarrotIcon {...iconProps} />;
    case 'poisson':
      return <Fish {...iconProps} />;
    case 'viande':
      return <Beef {...iconProps} />;
    case 'cereales':
      return <Wheat {...iconProps} />;
    case 'noix':
      return <Sandwich {...iconProps} />;
    case 'legumineuse':
      return <Wheat {...iconProps} />;
    default:
      return <Apple {...iconProps} />;
  }
};

/**
 * Composant pour afficher l'image d'un aliment avec une image par défaut si nécessaire
 */
export const FoodImage: React.FC<FoodImageProps> = ({ 
  src, 
  alt, 
  category, 
  className = '',
  size = 'md'
}) => {
  // Définir les tailles de base en fonction de l'option size
  let baseClasses = '';
  
  switch (size) {
    case 'sm':
      baseClasses = 'w-16 h-16 rounded-md object-cover';
      break;
    case 'lg':
      baseClasses = 'w-full h-64 object-cover';
      break;
    case 'md':
    default:
      baseClasses = 'w-full h-40 object-cover';
  }
  
  // Si l'image est valide et chargée avec succès
  if (src && !src.includes('/lovable-uploads/')) {
    return (
      <img 
        src={src} 
        alt={alt} 
        className={`${baseClasses} ${className}`}
        onError={(e) => {
          // En cas d'erreur de chargement, remplacer par l'image par défaut
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.classList.add('default-food-image');
        }}
      />
    );
  }
  
  // Si pas d'image ou image invalide, afficher un placeholder stylisé
  const bgColor = categoryColors[category] || '#F1F0FB';
  
  return (
    <div 
      className={`${baseClasses} ${className} flex items-center justify-center`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex flex-col items-center">
        <CategoryIcon category={category} className="text-gray-500 mb-2" />
        <span className="text-sm text-gray-500 font-medium">{alt}</span>
      </div>
    </div>
  );
};

export default FoodImage;
