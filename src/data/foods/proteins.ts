
import { Food } from '@/types';

export const proteins: Food[] = [
  {
    id: 'saumon',
    name: 'Saumon',
    category: 'poisson',
    nutrients: {
      glucides: 0,
      proteines: 20,
      lipides: 13,
      vitamines: {
        vitamineD: 11,
        vitamineB12: 2.8
      },
      oligoelements: {
        selenium: 31.5
      }
    },
    healthBenefits: ['santeCardiac', 'santeCerebrale'],
    seasons: ['printemps', 'ete', 'automne', 'hiver'],
    portion: {
      amount: 100,
      unit: 'g'
    }
  }
];
