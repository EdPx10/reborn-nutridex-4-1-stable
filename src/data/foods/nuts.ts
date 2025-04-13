
import { Food } from '@/types';

export const nuts: Food[] = [
  {
    id: 'amandes',
    name: 'Amandes',
    category: 'noix',
    image: '/lovable-uploads/4e6a0ba3-70f4-4277-8c34-3b9f8e5c9f3e.png',
    nutrients: {
      glucides: 21.6,
      proteines: 21.2,
      lipides: 49.9,
      fibres: 12.2,
      vitamines: {
        vitamineE: 25.6
      },
      mineraux: {
        magnesium: 270
      }
    },
    healthBenefits: ['santeCardiac', 'antiInflammatoire'],
    seasons: ['printemps', 'ete', 'automne', 'hiver'],
    portion: {
      amount: 100,
      unit: 'g'
    }
  }
];
