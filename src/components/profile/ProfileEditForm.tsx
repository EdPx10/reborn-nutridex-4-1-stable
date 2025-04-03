
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { UserProfile } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Form,
} from '@/components/ui/form';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import PersonalInfoFields from './PersonalInfoFields';
import MacronutrientFields from './MacronutrientFields';
import MicronutrientFields from './MicronutrientFields';

const createNutrientSchema = () => {
  return z.object({
    goal: z.coerce.number().min(0, { message: 'La valeur doit être positive' }),
  });
};

const formSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  age: z.coerce.number().min(1, { message: 'L\'âge doit être supérieur à 0' }).max(120, { message: 'L\'âge doit être inférieur à 120' }),
  gender: z.enum(['homme', 'femme', 'autre']),
  weight: z.coerce.number().min(1, { message: 'Le poids doit être supérieur à 0' }),
  height: z.coerce.number().min(1, { message: 'La taille doit être supérieure à 0' }),
  goals: z.object({
    glucides: createNutrientSchema(),
    proteines: createNutrientSchema(),
    lipides: z.object({
      goal: z.number(),
    }),
    fibres: createNutrientSchema(),
    lipids: z.object({
      saturated: createNutrientSchema(),
      monoUnsaturated: createNutrientSchema(),
      polyUnsaturated: createNutrientSchema(),
      omega3: createNutrientSchema(),
      omega6: createNutrientSchema(),
    }),
    vitamines: z.record(createNutrientSchema()),
    mineraux: z.record(createNutrientSchema()),
    oligoelements: z.record(createNutrientSchema()),
  }),
});

type ProfileFormValues = z.infer<typeof formSchema>;

interface ProfileEditFormProps {
  profile: UserProfile;
  onSubmit: (values: ProfileFormValues) => void;
  onCancel: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ profile, onSubmit, onCancel }) => {
  const [activeTab, setActiveTab] = useState<string>("personal");
  
  // S'assurer que le profil a bien les objectifs de lipides détaillés
  const defaultLipidGoals = {
    saturated: { goal: profile.goals.lipids?.saturated.goal || Math.round(profile.goals.lipides.goal * 0.33) },
    monoUnsaturated: { goal: profile.goals.lipids?.monoUnsaturated.goal || Math.round(profile.goals.lipides.goal * 0.33) },
    polyUnsaturated: { goal: profile.goals.lipids?.polyUnsaturated.goal || Math.round(profile.goals.lipides.goal * 0.33) },
    omega3: { goal: profile.goals.lipids?.omega3.goal || 2 },
    omega6: { goal: profile.goals.lipids?.omega6.goal || 10 },
  };
  
  // Calculate default polyunsaturated fats if needed
  if (defaultLipidGoals.omega3.goal + defaultLipidGoals.omega6.goal > defaultLipidGoals.polyUnsaturated.goal) {
    defaultLipidGoals.polyUnsaturated.goal = defaultLipidGoals.omega3.goal + defaultLipidGoals.omega6.goal;
  }
  
  // Recalculate total lipids based on the components
  const totalLipidsGoal = defaultLipidGoals.saturated.goal + 
                          defaultLipidGoals.monoUnsaturated.goal + 
                          defaultLipidGoals.polyUnsaturated.goal;
  
  const defaultValues = {
    name: profile.name,
    age: profile.age,
    gender: profile.gender,
    weight: profile.weight,
    height: profile.height,
    goals: {
      glucides: { goal: profile.goals.glucides.goal },
      proteines: { goal: profile.goals.proteines.goal },
      lipides: { goal: totalLipidsGoal }, // Set initial total lipids as sum of components
      fibres: { goal: profile.goals.fibres.goal },
      lipids: defaultLipidGoals,
      vitamines: Object.entries(profile.goals.vitamines).reduce((acc, [key, value]) => {
        acc[key] = { goal: value.goal };
        return acc;
      }, {} as Record<string, { goal: number }>),
      mineraux: Object.entries(profile.goals.mineraux).reduce((acc, [key, value]) => {
        acc[key] = { goal: value.goal };
        return acc;
      }, {} as Record<string, { goal: number }>),
      oligoelements: Object.entries(profile.goals.oligoelements).reduce((acc, [key, value]) => {
        acc[key] = { goal: value.goal };
        return acc;
      }, {} as Record<string, { goal: number }>),
    },
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (values: ProfileFormValues) => {
    // Ensure final values adhere to the calculated relationships
    const finalPolyunsaturated = values.goals.lipids.omega3.goal + values.goals.lipids.omega6.goal;
    const finalLipidsTotal = values.goals.lipids.saturated.goal + 
                            values.goals.lipids.monoUnsaturated.goal + 
                            finalPolyunsaturated;
    
    const updatedValues = {
      ...values,
      goals: {
        ...values.goals,
        lipids: {
          ...values.goals.lipids,
          polyUnsaturated: { goal: finalPolyunsaturated }
        },
        lipides: { goal: finalLipidsTotal }
      }
    };
    
    const updatedProfile = {
      ...profile,
      name: updatedValues.name,
      age: updatedValues.age,
      gender: updatedValues.gender,
      weight: updatedValues.weight,
      height: updatedValues.height,
      goals: {
        ...profile.goals,
        glucides: { ...profile.goals.glucides, goal: updatedValues.goals.glucides.goal },
        proteines: { ...profile.goals.proteines, goal: updatedValues.goals.proteines.goal },
        lipides: { ...profile.goals.lipides, goal: updatedValues.goals.lipides.goal },
        fibres: { ...profile.goals.fibres, goal: updatedValues.goals.fibres.goal },
        lipids: {
          saturated: { ...profile.goals.lipids?.saturated || { current: 0, unit: 'g' }, goal: updatedValues.goals.lipids.saturated.goal },
          monoUnsaturated: { ...profile.goals.lipids?.monoUnsaturated || { current: 0, unit: 'g' }, goal: updatedValues.goals.lipids.monoUnsaturated.goal },
          polyUnsaturated: { ...profile.goals.lipids?.polyUnsaturated || { current: 0, unit: 'g' }, goal: updatedValues.goals.lipids.polyUnsaturated.goal },
          omega3: { ...profile.goals.lipids?.omega3 || { current: 0, unit: 'g' }, goal: updatedValues.goals.lipids.omega3.goal },
          omega6: { ...profile.goals.lipids?.omega6 || { current: 0, unit: 'g' }, goal: updatedValues.goals.lipids.omega6.goal },
        },
        vitamines: Object.entries(updatedValues.goals.vitamines).reduce((acc, [key, value]) => {
          acc[key] = { ...profile.goals.vitamines[key], goal: value.goal };
          return acc;
        }, { ...profile.goals.vitamines }),
        mineraux: Object.entries(updatedValues.goals.mineraux).reduce((acc, [key, value]) => {
          acc[key] = { ...profile.goals.mineraux[key], goal: value.goal };
          return acc;
        }, { ...profile.goals.mineraux }),
        oligoelements: Object.entries(updatedValues.goals.oligoelements).reduce((acc, [key, value]) => {
          acc[key] = { ...profile.goals.oligoelements[key], goal: value.goal };
          return acc;
        }, { ...profile.goals.oligoelements }),
      }
    };

    onSubmit(updatedProfile);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <ScrollArea className="h-[500px] w-full pr-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-6">
              <TabsTrigger value="personal">Profil</TabsTrigger>
              <TabsTrigger value="goals">Objectifs Nutritionnels</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-4">
              <PersonalInfoFields form={form} />
            </TabsContent>
            
            <TabsContent value="goals" className="space-y-6">
              <MacronutrientFields form={form} />
              <MicronutrientFields form={form} profile={profile} />
            </TabsContent>
          </Tabs>
        </ScrollArea>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            Enregistrer
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileEditForm;
