
import { HealthBenefit } from '@/types';
import { Brain, Heart, Flame, Leaf, Apple, Shield } from 'lucide-react';

export const healthBenefitsInfo: Record<HealthBenefit, {
  name: string;
  description: string;
  icon: typeof Brain;
  color: string;
}> = {
  santeCerebrale: {
    name: 'Santé cérébrale',
    description: 'Favorise les fonctions cognitives et la santé du cerveau',
    icon: Brain,
    color: 'bg-benefit-santeCerebrale text-white'
  },
  santeCardiac: {
    name: 'Santé cardiaque',
    description: 'Contribue à la santé du système cardiovasculaire',
    icon: Heart,
    color: 'bg-benefit-santeCardiac text-white'
  },
  antiInflammatoire: {
    name: 'Anti-inflammatoire',
    description: 'Aide à réduire l\'inflammation dans le corps',
    icon: Flame,
    color: 'bg-benefit-antiInflammatoire text-white'
  },
  santeIntestinale: {
    name: 'Santé intestinale',
    description: 'Favorise la santé du système digestif',
    icon: Leaf,
    color: 'bg-benefit-santeIntestinale text-white'
  },
  antioxydant: {
    name: 'Antioxydant',
    description: 'Aide à neutraliser les radicaux libres',
    icon: Apple,
    color: 'bg-benefit-antioxydant text-white'
  },
  immunitaire: {
    name: 'Système immunitaire',
    description: 'Renforce le système immunitaire',
    icon: Shield,
    color: 'bg-benefit-immunitaire text-white'
  }
};

export const foodCategories = [
  { id: 'fruit', name: 'Fruit', color: 'bg-category-fruit' },
  { id: 'legume', name: 'Légume', color: 'bg-category-legume' },
  { id: 'poisson', name: 'Poisson', color: 'bg-category-poisson' },
  { id: 'viande', name: 'Viande', color: 'bg-category-viande' },
  { id: 'cereales', name: 'Céréales', color: 'bg-category-cereales' },
  { id: 'noix', name: 'Noix', color: 'bg-category-noix' },
  { id: 'legumineuse', name: 'Légumineuse', color: 'bg-category-legumineuse' },
];

export const seasons = [
  { id: 'printemps', name: 'Printemps' },
  { id: 'ete', name: 'Été' },
  { id: 'automne', name: 'Automne' },
  { id: 'hiver', name: 'Hiver' },
];
