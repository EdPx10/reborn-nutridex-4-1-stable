import React, { useState } from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Plus, Edit } from 'lucide-react';
import { useDailyPlateStore } from '@/store/dailyPlateStore';
import { useEffect } from 'react';
import { calculateTotalNutrients } from '@/components/mon-assiette/NutrientCalculator';
import MacroNutrientSection from '@/components/profile/MacroNutrientSection';
import MicroNutrientSection from '@/components/profile/MicroNutrientSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ProfileEditForm from '@/components/profile/ProfileEditForm';
import { Button } from '@/components/ui/button';

const ProfilUtilisateur: React.FC = () => {
  const { profiles, activeProfile, updateProfile, setActiveProfileById, updateNutrientIntake } = useUserProfile();
  const { items, checkAndResetIfNewDay } = useDailyPlateStore();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  // Vérifier si nous devons réinitialiser l'assiette lors du chargement de la page
  useEffect(() => {
    checkAndResetIfNewDay();
  }, [checkAndResetIfNewDay]);
  
  // Synchroniser les apports nutritionnels avec le profil utilisateur
  useEffect(() => {
    if (!activeProfile) return;

    const totalNutrients = calculateTotalNutrients(items);

    updateNutrientIntake({
      glucides: totalNutrients.glucides || 0,
      proteines: totalNutrients.proteines || 0,
      lipides: totalNutrients.lipides || 0,
      fibres: totalNutrients.fibres || 0,
      lipids: totalNutrients.lipids,
      vitamines: totalNutrients.vitamines || {},
      mineraux: totalNutrients.mineraux || {},
      oligoelements: totalNutrients.oligoelements || {}
    });
  }, [items, activeProfile, updateNutrientIntake]);
  
  const handleProfileUpdate = (formValues: any) => {
    if (!activeProfile) return;
    
    const updatedProfile = {
      ...activeProfile,
      ...formValues
    };
    
    updateProfile(updatedProfile);
    setIsEditDialogOpen(false);
  };
  
  // Si aucun profil actif, afficher un message
  if (!activeProfile) {
    return <div className="text-center py-10">Aucun profil actif trouvé.</div>;
  }
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Votre profil</h1>
        <button className="flex items-center gap-2 py-2 px-4 rounded-full bg-nutri-green text-white">
          <Plus size={18} />
          <span>Nouveau profil</span>
        </button>
      </div>
      
      <div 
        className="p-4 rounded-lg border border-gray-200 mb-6 cursor-pointer hover:border-nutri-green/50 transition-colors"
        onClick={() => setIsEditDialogOpen(true)}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-nutri-green/10 rounded-full flex items-center justify-center">
            <span className="font-semibold text-nutri-green">{activeProfile.name.charAt(0)}</span>
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{activeProfile.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 ml-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditDialogOpen(true);
                }}
              >
                <Edit size={14} />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{activeProfile.age} ans</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{activeProfile.weight} kg</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{activeProfile.height} cm</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Macronutriments</h2>
        <ScrollArea className="h-auto">
          <MacroNutrientSection profile={activeProfile} />
        </ScrollArea>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Micronutriments</h2>
        <ScrollArea className="h-auto">
          <MicroNutrientSection profile={activeProfile} />
        </ScrollArea>
      </div>
      
      {profiles.length > 1 && (
        <div className="mt-8 pt-4 border-t">
          <h3 className="text-lg font-medium mb-3">Autres profils</h3>
          <div className="space-y-2">
            {profiles.filter(p => p.id !== activeProfile.id).map(profile => (
              <div 
                key={profile.id}
                className="p-3 border rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50"
                onClick={() => setActiveProfileById(profile.id)}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span>{profile.name.charAt(0)}</span>
                  </div>
                  <span>{profile.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier votre profil</DialogTitle>
          </DialogHeader>
          {activeProfile && (
            <ProfileEditForm 
              profile={activeProfile} 
              onSubmit={handleProfileUpdate}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilUtilisateur;
