
import { Food } from '@/types';

export const fruits: Food[] = [
  {
    id: 'bleuet',
    name: 'Bleuet',
    category: 'fruit',
    image: 'https://media.istockphoto.com/id/1601099150/fr/photo/myrtilles-fra%C3%AEches-m%C3%BBres-avec-des-feuilles-vertes-isol%C3%A9es-sur-blanc.jpg?s=1024x1024&w=is&k=20&c=Wrc8vm6419jHuNDBIYUDOEJ7mCB5Hevx3bQB8MdAdRU=',
    nutrients: {
      glucides: 14.5,
      proteines: 0.7,
      lipides: 0.3,
      fibres: 2.4,
      vitamines: {
        c: 9.7,
        k: 19.3
      },
      mineraux: {
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
        e: 2.1,
        k: 21
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
        c: 58.8
      },
      mineraux: {
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
