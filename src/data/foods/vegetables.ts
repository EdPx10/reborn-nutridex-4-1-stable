
import { Food } from '@/types';

export const vegetables: Food[] = [
  {
    id: 'epinard',
    name: 'Épinard',
    category: 'legume',
    image: '/lovable-uploads/cae3094c-2b36-49b2-8065-058cb3d08433.png',
    nutrients: {
      glucides: 3.6,
      proteines: 2.9,
      lipides: 0.4,
      fibres: 2.2,
      vitamines: {
        vitamineA: 469,
        vitamineK1: 483
      },
      oligoelements: {
        fer: 2.7
      },
      mineraux: {
        magnesium: 79
      }
    },
    healthBenefits: ['antioxydant', 'antiInflammatoire'],
    seasons: ['printemps', 'automne'],
    portion: {
      amount: 100,
      unit: 'g'
    }
  },
  {
    id: 'brocoli',
    name: 'Brocoli',
    category: 'legume',
    nutrients: {
      glucides: 6.6,
      proteines: 2.8,
      lipides: 0.4,
      fibres: 2.6,
      vitamines: {
        vitamineC: 89.2,
        vitamineK1: 102
      },
      mineraux: {
        potassium: 316
      }
    },
    healthBenefits: ['antioxydant', 'antiInflammatoire'],
    seasons: ['printemps', 'automne', 'hiver'],
    portion: {
      amount: 100,
      unit: 'g'
    }
  }
];
