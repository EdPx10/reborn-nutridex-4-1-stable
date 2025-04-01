
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
import { toast } from "@/hooks/use-toast";
import { useDailyPlateStore } from '@/store/dailyPlateStore';

interface AddToDailyPlateDialogProps {
  food: Food;
  isOpen: boolean;
  onClose: () => void;
}

const UNITS = ["g", "ml", "c.à.café", "c.à.soupe"];

export const AddToDailyPlateDialog: React.FC<AddToDailyPlateDialogProps> = ({ 
  food, 
  isOpen, 
  onClose,
}) => {
  const [quantity, setQuantity] = useState("100");
  const [unit, setUnit] = useState(UNITS[0]);
  const { addItem } = useDailyPlateStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericQuantity = parseFloat(quantity);
    
    if (isNaN(numericQuantity) || numericQuantity <= 0) {
      toast({
        title: "Quantité invalide",
        description: "Veuillez entrer une quantité valide",
        variant: "destructive",
      });
      return;
    }

    addItem({
      id: food.id,
      food,
      quantity: numericQuantity,
      unit
    });
    
    toast({
      title: "Aliment ajouté",
      description: `${food.name} a été ajouté à votre assiette du jour`,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter {food.name} à mon assiette</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <QuantityForm 
            quantity={quantity} 
            setQuantity={setQuantity}
            unit={unit}
            setUnit={setUnit}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface QuantityFormProps {
  quantity: string;
  setQuantity: (value: string) => void;
  unit: string;
  setUnit: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const QuantityForm: React.FC<QuantityFormProps> = ({
  quantity,
  setQuantity,
  unit,
  setUnit,
  onSubmit,
  onCancel
}) => {
  return (
    <form onSubmit={onSubmit} className="grid gap-4">
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
        <Button variant="outline" type="button" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">
          Ajouter
        </Button>
      </DialogFooter>
    </form>
  );
};

export default AddToDailyPlateDialog;
