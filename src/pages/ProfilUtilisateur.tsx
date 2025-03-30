
import React from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import ProfileCard from '@/components/profile/ProfileCard';
import { Plus } from 'lucide-react';

const ProfilUtilisateur: React.FC = () => {
  const { profiles, activeProfile, createProfile, updateProfile, setActiveProfileById } = useUserProfile();
  
  const handleActivateUser = (profileId: string) => {
    setActiveProfileById(profileId);
  };
  
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
