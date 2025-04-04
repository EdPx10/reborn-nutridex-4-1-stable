
import { Food } from '@/types';

export const fruits: Food[] = [
  {
    id: 'bleuet',
    name: 'Bleuet',
    category: 'fruit',
    image: '/lovable-uploads/7926bccf-3e7b-445e-bd76-dcd72549a3f1.png',
    nutrients: {
      glucides: 14.5,
      proteines: 0.7,
      lipides: 0.3,
      fibres: 2.4,
      vitamines: {
        vitamineC: 9.7,
        vitamineK1: 19.3
      },
      oligoelements: {
        manganese: 0.3
      }
    },
    healthBenefits: ['antioxydant', 'santeCerebrale'],
    seasons: ['ete'],
    portion: {
      amount: 100,
      unit: 'g'
    }
  },
  {
    id: 'avocat',
    name: 'Avocat',
    category: 'fruit',
    image: '/lovable-uploads/afc61bf7-a876-4f48-be64-b9483a15b9b4.png',
    nutrients: {
      glucides: 8.5,
      proteines: 2,
      lipides: 15,
      fibres: 6.7,
      vitamines: {
        vitamineE: 2.1,
        vitamineK1: 21
      },
      mineraux: {
        potassium: 485
      }
    },
    healthBenefits: ['santeCardiac', 'antiInflammatoire'],
    seasons: ['printemps', 'ete', 'automne'],
    portion: {
      amount: 100,
      unit: 'g'
    }
  },
  {
    id: 'fraise',
    name: 'Fraise',
    category: 'fruit',
    image: '/lovable-uploads/52e0b8d8-3b0b-4e9b-8c87-f880d7f09641.png',
    nutrients: {
      glucides: 7.7,
      proteines: 0.7,
      lipides: 0.3,
      fibres: 2,
      vitamines: {
        vitamineC: 58.8
      },
      oligoelements: {
        manganese: 0.4
      }
    },
    healthBenefits: ['antioxydant', 'antiInflammatoire'],
    seasons: ['printemps', 'ete'],
    portion: {
      amount: 100,
      unit: 'g'
    }
  }
];
