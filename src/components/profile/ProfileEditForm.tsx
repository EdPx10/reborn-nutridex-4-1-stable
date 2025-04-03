import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { renderNutrientField } from './NutrientFieldRenderer';
import { Separator } from '@/components/ui/separator';

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
  
  // Watch lipid component values to update totals automatically
  const saturatedGoal = useWatch({
    control: form.control,
    name: "goals.lipids.saturated.goal",
    defaultValue: defaultLipidGoals.saturated.goal
  });
  
  const monoUnsaturatedGoal = useWatch({
    control: form.control,
    name: "goals.lipids.monoUnsaturated.goal",
    defaultValue: defaultLipidGoals.monoUnsaturated.goal
  });
  
  const omega3Goal = useWatch({
    control: form.control,
    name: "goals.lipids.omega3.goal",
    defaultValue: defaultLipidGoals.omega3.goal
  });
  
  const omega6Goal = useWatch({
    control: form.control,
    name: "goals.lipids.omega6.goal",
    defaultValue: defaultLipidGoals.omega6.goal
  });
  
  // Calculate polyunsaturated automatically from omega3 + omega6
  const polyUnsaturatedGoal = omega3Goal + omega6Goal;
  
  // Update polyunsaturated value when omega3 or omega6 changes
  useEffect(() => {
    form.setValue("goals.lipids.polyUnsaturated.goal", polyUnsaturatedGoal);
  }, [omega3Goal, omega6Goal, form]);
  
  // Calculate total lipids as sum of components
  const totalLipids = saturatedGoal + monoUnsaturatedGoal + polyUnsaturatedGoal;
  
  // Update total lipids value when components change
  useEffect(() => {
    form.setValue("goals.lipides.goal", totalLipids);
  }, [saturatedGoal, monoUnsaturatedGoal, polyUnsaturatedGoal, form]);

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
                
                {renderNutrientField({
                  category: 'macro',
                  nutrientKey: 'glucides',
                  label: 'Glucides',
                  unit: 'g',
                  path: 'goals.glucides.goal',
                  form
                })}
                {renderNutrientField({
                  category: 'macro',
                  nutrientKey: 'proteines',
                  label: 'Protéines',
                  unit: 'g',
                  path: 'goals.proteines.goal',
                  form
                })}
                
                {/* Lipides total - rendu en lecture seule */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Lipides (Total)</label>
                    <span className="text-xs text-gray-500">g</span>
                  </div>
                  <Input
                    value={totalLipids}
                    readOnly
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-xs text-gray-500">
                    Calculé automatiquement comme la somme des acides gras
                  </p>
                </div>
                
                <Separator className="my-3" />
                <h4 className="text-sm text-gray-500 mb-2">Lipides détaillés</h4>
                
                {renderNutrientField({
                  category: 'macro',
                  nutrientKey: 'lipides',
                  label: 'Acides gras saturés (AGS)',
                  unit: 'g',
                  path: 'goals.lipids.saturated.goal',
                  form
                })}
                {renderNutrientField({
                  category: 'macro',
                  nutrientKey: 'lipides',
                  label: 'Acides gras mono-insaturés (AMS)',
                  unit: 'g',
                  path: 'goals.lipids.monoUnsaturated.goal',
                  form
                })}
                
                {/* Poly-insaturés - rendu en lecture seule car calculé automatiquement */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Acides gras poly-insaturés (AGP)</label>
                    <span className="text-xs text-gray-500">g</span>
                  </div>
                  <Input
                    value={polyUnsaturatedGoal}
                    readOnly
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-xs text-gray-500">
                    Calculé automatiquement comme Oméga-3 + Oméga-6
                  </p>
                </div>
                
                {renderNutrientField({
                  category: 'macro',
                  nutrientKey: 'lipides',
                  label: 'Oméga-3',
                  unit: 'g',
                  path: 'goals.lipids.omega3.goal',
                  form
                })}
                {renderNutrientField({
                  category: 'macro',
                  nutrientKey: 'lipides',
                  label: 'Oméga-6',
                  unit: 'g',
                  path: 'goals.lipids.omega6.goal',
                  form
                })}

                {renderNutrientField({
                  category: 'macro',
                  nutrientKey: 'fibres',
                  label: 'Fibres',
                  unit: 'g',
                  path: 'goals.fibres.goal',
                  form
                })}
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Vitamines</h3>
                
                {Object.entries(profile.goals.vitamines).map(([key, value]) => (
                  renderNutrientField({
                    category: 'vitamines',
                    nutrientKey: key,
                    label: `Vitamine ${key.toUpperCase()}`,
                    unit: value.unit,
                    path: `goals.vitamines.${key}.goal`,
                    form
                  })
                ))}
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Minéraux</h3>
                
                {Object.entries(profile.goals.mineraux).map(([key, value]) => (
                  renderNutrientField({
                    category: 'mineraux',
                    nutrientKey: key,
                    label: key.charAt(0).toUpperCase() + key.slice(1),
                    unit: value.unit,
                    path: `goals.mineraux.${key}.goal`,
                    form
                  })
                ))}
              </div>
              
              {Object.keys(profile.goals.oligoelements).length > 0 && (
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Oligo-éléments</h3>
                  
                  {Object.entries(profile.goals.oligoelements).map(([key, value]) => (
                    renderNutrientField({
                      category: 'oligoelements',
                      nutrientKey: key,
                      label: key.charAt(0).toUpperCase() + key.slice(1),
                      unit: value.unit,
                      path: `goals.oligoelements.${key}.goal`,
                      form
                    })
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
