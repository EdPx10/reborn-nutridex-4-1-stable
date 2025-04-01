
import React from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import ProfileCard from '@/components/profile/ProfileCard';
import { Plus } from 'lucide-react';
import { useDailyPlateStore } from '@/store/dailyPlateStore';
import { useEffect } from 'react';
import { calculateTotalNutrients } from '@/components/mon-assiette/NutrientCalculator';

const ProfilUtilisateur: React.FC = () => {
  const { profiles, activeProfile, updateProfile, setActiveProfileById, updateNutrientIntake } = useUserProfile();
  const { items, checkAndResetIfNewDay } = useDailyPlateStore();
  
  const handleActivateUser = (profileId: string) => {
    setActiveProfileById(profileId);
  };
  
  // Vérifier si nous devons réinitialiser l'assiette lors du chargement de la page
  useEffect(() => {
    checkAndResetIfNewDay();
  }, [checkAndResetIfNewDay]);
  
  // Synchroniser les apports nutritionnels avec le profil utilisateur
  useEffect(() => {
    if (activeProfile && items.length > 0) {
      const totalNutrients = calculateTotalNutrients(items);
      updateNutrientIntake({
        glucides: totalNutrients.glucides,
        proteines: totalNutrients.proteines,
        lipides: totalNutrients.lipides,
        fibres: totalNutrients.fibres,
        vitamines: totalNutrients.vitamines,
        mineraux: totalNutrients.mineraux,
        oligoelements: totalNutrients.oligoelements
      });
    }
  }, [items, activeProfile, updateNutrientIntake]);
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Vos profils</h1>
        <button className="flex items-center gap-2 py-2 px-4 rounded-full bg-nutri-green text-white">
          <Plus size={18} />
          <span>Nouveau profil</span>
        </button>
      </div>
      
      {profiles.map(profile => (
        <ProfileCard 
          key={profile.id} 
          profile={profile} 
          isActive={profile.id === activeProfile?.id}
          onActivate={() => handleActivateUser(profile.id)}
        />
      ))}
    </div>
  );
};

export default ProfilUtilisateur;
