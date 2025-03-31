
import { Food } from '@/types';
import { fruits } from './fruits';
import { vegetables } from './vegetables';
import { proteins } from './proteins';
import { grains } from './grains';
import { nuts } from './nuts';

// Combine all food categories into a single array
export const foods: Food[] = [
  ...fruits,
  ...vegetables,
  ...proteins,
  ...grains,
  ...nuts,
];

// Re-export the filtering functions
export { getFilteredFoods, getFoodById } from './foodUtils';
