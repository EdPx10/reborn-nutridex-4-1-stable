
import { Food } from '@/types';

export const grains: Food[] = [
  {
    id: 'quinoa',
    name: 'Quinoa',
    category: 'cereales',
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
