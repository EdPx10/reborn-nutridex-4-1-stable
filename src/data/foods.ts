
import { Food } from '@/types';

export const foods: Food[] = [
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
  },
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
        a: 469,
        k: 483
      },
      mineraux: {
        fer: 2.7,
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
        c: 89.2,
        k: 102
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
  },
  {
    id: 'saumon',
    name: 'Saumon',
    category: 'poisson',
    nutrients: {
      glucides: 0,
      proteines: 20,
      lipides: 13,
      vitamines: {
        d: 11,
        b12: 2.8
      },
      mineraux: {
        selenium: 31.5
      }
    },
    healthBenefits: ['santeCardiac', 'santeCerebrale'],
    seasons: ['printemps', 'ete', 'automne', 'hiver'],
    portion: {
      amount: 100,
      unit: 'g'
    }
  },
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
        magnesium: 197,
        fer: 4.6
      }
    },
    healthBenefits: ['antiInflammatoire', 'santeIntestinale'],
    seasons: ['printemps', 'ete', 'automne', 'hiver'],
    portion: {
      amount: 100,
      unit: 'g'
    }
  },
  {
    id: 'amandes',
    name: 'Amandes',
    category: 'noix',
    nutrients: {
      glucides: 21.6,
      proteines: 21.2,
      lipides: 49.9,
      fibres: 12.2,
      vitamines: {
        e: 25.6
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
  },
];

export const getFilteredFoods = (
  search: string = '',
  category?: string,
  benefit?: string,
  season?: string
) => {
  return foods.filter(food => {
    const matchesSearch = search === '' || 
      food.name.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = !category || food.category === category;
    
    const matchesBenefit = !benefit || 
      food.healthBenefits.includes(benefit as any);
    
    const matchesSeason = !season || 
      food.seasons?.includes(season as any);
    
    return matchesSearch && matchesCategory && matchesBenefit && matchesSeason;
  });
};

export const getFoodById = (id: string) => {
  return foods.find(food => food.id === id);
};
