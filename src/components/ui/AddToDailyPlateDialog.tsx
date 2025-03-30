
import React, { useState } from 'react';
import { Food } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type PlateItem = {
  food: Food;
  quantity: number;
  unit: string;
};

interface AddToDailyPlateDialogProps {
  food: Food;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (item: PlateItem) => void;
}

const UNITS = ["g", "ml", "c.à.café", "c.à.soupe"];

export const AddToDailyPlateDialog: React.FC<AddToDailyPlateDialogProps> = ({ 
  food, 
  isOpen, 
  onClose,
  onConfirm 
}) => {
  const [quantity, setQuantity] = useState("100");
  const [unit, setUnit] = useState(UNITS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericQuantity = parseFloat(quantity);
    
    if (isNaN(numericQuantity) || numericQuantity <= 0) {
      // TODO: Add proper form validation
      return;
    }

    onConfirm({
      food,
      quantity: numericQuantity,
      unit
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter {food.name} à mon assiette</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantité</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                step="any"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="col-span-3"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unit">Unité</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger id="unit">
                  <SelectValue placeholder="Unité" />
                </SelectTrigger>
                <SelectContent>
                  {UNITS.map(unit => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Ajouter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddToDailyPlateDialog;
