
import { create } from 'zustand';
import { Food } from '@/types';

export type PlateItem = {
  id: string;
  food: Food;
  quantity: number;
  unit: string;
  addedAt: Date;
};

interface DailyPlateState {
  items: PlateItem[];
  addItem: (item: {id: string; food: Food; quantity: number; unit: string}) => void;
  removeItem: (foodId: string) => void;
  updateItem: (foodId: string, quantity: number, unit: string) => void;
  getItem: (foodId: string) => PlateItem | undefined;
  clearPlate: () => void;
}

export const useDailyPlateStore = create<DailyPlateState>((set, get) => ({
  items: [],
  
  addItem: (item: {id: string; food: Food; quantity: number; unit: string}) => {
    set((state) => {
      // Check if food already exists in plate
      const existingItemIndex = state.items.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Replace existing item
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...item,
          addedAt: new Date(),
        };
        return { items: updatedItems };
      } else {
        // Add new item
        return {
          items: [
            ...state.items,
            {
              ...item,
              addedAt: new Date(),
            },
          ],
        };
      }
    });
  },
  
  removeItem: (foodId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== foodId),
    }));
  },
  
  updateItem: (foodId: string, quantity: number, unit: string) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === foodId ? { ...item, quantity, unit } : item
      ),
    }));
  },
  
  getItem: (foodId: string) => {
    return get().items.find((item) => item.id === foodId);
  },
  
  clearPlate: () => set({ items: [] }),
}));
