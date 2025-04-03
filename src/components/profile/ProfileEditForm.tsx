import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { UserProfile } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { getNutrientIcon } from '@/components/ui/NutrientIcons';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    lipides: createNutrientSchema(),
    fibres: createNutrientSchema(),
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
  
  const defaultValues = {
    name: profile.name,
    age: profile.age,
    gender: profile.gender,
    weight: profile.weight,
    height: profile.height,
    goals: {
      glucides: { goal: profile.goals.glucides.goal },
      proteines: { goal: profile.goals.proteines.goal },
      lipides: { goal: profile.goals.lipides.goal },
      fibres: { goal: profile.goals.fibres.goal },
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
    const updatedProfile = {
      ...profile,
      name: values.name,
      age: values.age,
      gender: values.gender,
      weight: values.weight,
      height: values.height,
      goals: {
        ...profile.goals,
        glucides: { ...profile.goals.glucides, goal: values.goals.glucides.goal },
        proteines: { ...profile.goals.proteines, goal: values.goals.proteines.goal },
        lipides: { ...profile.goals.lipides, goal: values.goals.lipides.goal },
        fibres: { ...profile.goals.fibres, goal: values.goals.fibres.goal },
        vitamines: Object.entries(values.goals.vitamines).reduce((acc, [key, value]) => {
          acc[key] = { ...profile.goals.vitamines[key], goal: value.goal };
          return acc;
        }, { ...profile.goals.vitamines }),
        mineraux: Object.entries(values.goals.mineraux).reduce((acc, [key, value]) => {
          acc[key] = { ...profile.goals.mineraux[key], goal: value.goal };
          return acc;
        }, { ...profile.goals.mineraux }),
        oligoelements: Object.entries(values.goals.oligoelements).reduce((acc, [key, value]) => {
          acc[key] = { ...profile.goals.oligoelements[key], goal: value.goal };
          return acc;
        }, { ...profile.goals.oligoelements }),
      }
    };

    onSubmit(updatedProfile);
  };

  const renderNutrientField = (
    category: 'macro' | 'vitamines' | 'mineraux' | 'oligoelements',
    nutrientKey: string,
    label: string,
    unit: string,
    path: string
  ) => {
    return (
      <div className="flex items-center gap-3 my-3">
        <div className="flex items-center gap-2 flex-1">
          {getNutrientIcon(category, nutrientKey, 16)}
          <span className="text-sm">{label}</span>
        </div>
        <FormField
          control={form.control}
          name={path as any}
          render={({ field }) => (
            <FormItem className="flex-none w-28">
              <div className="flex items-center">
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Valeur"
                    className="w-20 text-right"
                    {...field}
                  />
                </FormControl>
                <span className="ml-1 text-sm text-gray-500">{unit}</span>
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
    );
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
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input placeholder="Prénom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Âge (ans)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Âge" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Poids (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Poids" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Taille (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Taille" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Sexe</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="homme" />
                          </FormControl>
                          <FormLabel className="font-normal">Homme</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="femme" />
                          </FormControl>
                          <FormLabel className="font-normal">Femme</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="autre" />
                          </FormControl>
                          <FormLabel className="font-normal">Autre</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            
            <TabsContent value="goals" className="space-y-6">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Macronutriments</h3>
                
                {renderNutrientField('macro', 'glucides', 'Glucides', 'g', 'goals.glucides.goal')}
                {renderNutrientField('macro', 'proteines', 'Protéines', 'g', 'goals.proteines.goal')}
                {renderNutrientField('macro', 'lipides', 'Lipides', 'g', 'goals.lipides.goal')}
                {renderNutrientField('macro', 'fibres', 'Fibres', 'g', 'goals.fibres.goal')}
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Vitamines</h3>
                
                {Object.entries(profile.goals.vitamines).map(([key, value]) => (
                  renderNutrientField(
                    'vitamines', 
                    key, 
                    `Vitamine ${key.toUpperCase()}`, 
                    value.unit, 
                    `goals.vitamines.${key}.goal`
                  )
                ))}
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Minéraux</h3>
                
                {Object.entries(profile.goals.mineraux).map(([key, value]) => (
                  renderNutrientField(
                    'mineraux', 
                    key, 
                    key.charAt(0).toUpperCase() + key.slice(1), 
                    value.unit, 
                    `goals.mineraux.${key}.goal`
                  )
                ))}
              </div>
              
              {Object.keys(profile.goals.oligoelements).length > 0 && (
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Oligo-éléments</h3>
                  
                  {Object.entries(profile.goals.oligoelements).map(([key, value]) => (
                    renderNutrientField(
                      'oligoelements', 
                      key, 
                      key.charAt(0).toUpperCase() + key.slice(1), 
                      value.unit, 
                      `goals.oligoelements.${key}.goal`
                    )
                  ))}
                </div>
              )}
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
