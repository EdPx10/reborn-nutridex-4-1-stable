
import { Food } from '@/types';

export const grains: Food[] = [
  {
    id: 'quinoa',
    name: 'Quinoa',
    category: 'cereales',
    image: '/lovable-uploads/36f99683-6b3b-4ccc-83c7-2d61374b42e0.png',
    nutrients: {
      glucides: 64,
      proteines: 14,
      lipides: 6,
      fibres: 7,
      mineraux: {
        magnesium: 197
      },
      oligoelements: {
        fer: 4.6
      }
    },
    healthBenefits: ['antiInflammatoire', 'santeIntestinale'],
    seasons: ['printemps', 'ete', 'automne', 'hiver'],
    portion: {
      amount: 100,
      unit: 'g'
    }
  }
];
