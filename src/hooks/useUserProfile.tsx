import { useState, useEffect } from 'react';
import { UserProfile } from '@/types';

const DEFAULT_PROFILE: UserProfile = {
  id: 'default',
  name: 'Edgar',
  gender: 'homme',
  weight: 70,
  height: 175,
  age: 35,
  goals: {
    glucides: { current: 0, goal: 275, unit: 'g' },
    proteines: { current: 0, goal: 55, unit: 'g' },
    lipides: { current: 0, goal: 78, unit: 'g' },
    lipids: {
      saturated: { current: 0, goal: 26, unit: 'g' }, // ~1/3 des lipides totaux
      monoUnsaturated: { current: 0, goal: 26, unit: 'g' }, // ~1/3 des lipides totaux
      polyUnsaturated: { current: 0, goal: 26, unit: 'g' }, // ~1/3 des lipides totaux
      omega3: { current: 0, goal: 2, unit: 'g' }, // Recommandation AHA
      omega6: { current: 0, goal: 10, unit: 'g' } // Recommandation générale
    },
    fibres: { current: 0, goal: 30, unit: 'g' },
    vitamines: {
      c: { current: 0, goal: 90, unit: 'mg' },
      d: { current: 0, goal: 20, unit: 'µg' },
      b12: { current: 0, goal: 2.4, unit: 'µg' },
      a: { current: 0, goal: 900, unit: 'µg' },
    },
    mineraux: {
      calcium: { current: 0, goal: 1000, unit: 'mg' },
      fer: { current: 0, goal: 8, unit: 'mg' },
      magnesium: { current: 0, goal: 420, unit: 'mg' },
    },
    oligoelements: {
      zinc: { current: 0, goal: 11, unit: 'mg' },
      selenium: { current: 0, goal: 55, unit: 'µg' },
    }
  }
};

export const useUserProfile = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([DEFAULT_PROFILE]);
  const [activeProfileId, setActiveProfileId] = useState<string>(DEFAULT_PROFILE.id);

  // Load profiles from localStorage on initial render
  useEffect(() => {
    const savedProfiles = localStorage.getItem('userProfiles');
    const savedActiveProfileId = localStorage.getItem('activeProfileId');
    
    if (savedProfiles) {
      try {
        const parsedProfiles = JSON.parse(savedProfiles);
        // Assurer la rétrocompatibilité avec les profils sans objectifs détaillés de lipides
        const updatedProfiles = parsedProfiles.map((profile: UserProfile) => {
          if (!profile.goals.lipids) {
            // Calculer les valeurs par défaut basées sur les lipides totaux
            const totalLipids = profile.goals.lipides.goal;
            profile.goals.lipids = {
              saturated: { current: 0, goal: Math.round(totalLipids * 0.33), unit: 'g' },
              monoUnsaturated: { current: 0, goal: Math.round(totalLipids * 0.33), unit: 'g' },
              polyUnsaturated: { current: 0, goal: Math.round(totalLipids * 0.33), unit: 'g' },
              omega3: { current: 0, goal: 2, unit: 'g' },
              omega6: { current: 0, goal: 10, unit: 'g' }
            };
          }
          return profile;
        });
        setProfiles(updatedProfiles);
      } catch (error) {
        console.error('Error parsing saved profiles:', error);
        setProfiles([DEFAULT_PROFILE]);
      }
    }
    
    if (savedActiveProfileId) {
      setActiveProfileId(savedActiveProfileId);
    }
  }, []);

  // Save profiles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userProfiles', JSON.stringify(profiles));
    localStorage.setItem('activeProfileId', activeProfileId);
  }, [profiles, activeProfileId]);

  const getActiveProfile = (): UserProfile => {
    return profiles.find(profile => profile.id === activeProfileId) || DEFAULT_PROFILE;
  };

  // Added getter for active profile to match usage in components
  const activeProfile = getActiveProfile();

  const updateProfile = (updatedProfile: UserProfile) => {
    setProfiles(profiles.map(profile => 
      profile.id === updatedProfile.id ? updatedProfile : profile
    ));
  };

  const addProfile = (newProfile: Omit<UserProfile, 'id'>) => {
    const profileWithId = {
      ...newProfile,
      id: `profile-${new Date().getTime()}`
    };
    setProfiles([...profiles, profileWithId as UserProfile]);
    return profileWithId.id;
  };

  const removeProfile = (profileId: string) => {
    if (profiles.length <= 1) {
      return false;
    }
    
    const newProfiles = profiles.filter(profile => profile.id !== profileId);
    setProfiles(newProfiles);
    
    if (activeProfileId === profileId) {
      setActiveProfileId(newProfiles[0].id);
    }
    
    return true;
  };

  const setActiveProfile = (profileId: string) => {
    if (profiles.some(profile => profile.id === profileId)) {
      setActiveProfileId(profileId);
      return true;
    }
    return false;
  };

  // Fix the updateNutrientIntake function to correctly handle the lipides vs lipids naming
  const updateNutrientIntake = (nutrients: {
    glucides: number;
    proteines: number;
    lipides: number;
    fibres: number;
    lipids?: {
      saturated: number;
      monoUnsaturated: number;
      polyUnsaturated: number;
      omega3: number;
      omega6: number;
    };
    vitamines: {
      [key: string]: number;
    };
    mineraux: {
      [key: string]: number;
    };
    oligoelements: {
      [key: string]: number;
    };
  }) => {
    const updatedProfile = { ...activeProfile };
    
    // Update macronutrient values
    updatedProfile.goals.glucides.current = nutrients.glucides;
    updatedProfile.goals.proteines.current = nutrients.proteines;
    updatedProfile.goals.lipides.current = nutrients.lipides;
    updatedProfile.goals.fibres.current = nutrients.fibres;
    
    // Update detailed lipid values if the data is available
    if (nutrients.lipids) {
      updatedProfile.goals.lipids = {
        saturated: { 
          ...updatedProfile.goals.lipids!.saturated, 
          current: nutrients.lipids.saturated 
        },
        monoUnsaturated: { 
          ...updatedProfile.goals.lipids!.monoUnsaturated, 
          current: nutrients.lipids.monoUnsaturated 
        },
        polyUnsaturated: { 
          ...updatedProfile.goals.lipids!.polyUnsaturated, 
          current: nutrients.lipids.polyUnsaturated 
        },
        omega3: { 
          ...updatedProfile.goals.lipids!.omega3, 
          current: nutrients.lipids.omega3 
        },
        omega6: { 
          ...updatedProfile.goals.lipids!.omega6, 
          current: nutrients.lipids.omega6 
        },
      };
    }
    
    // Update micronutrient values
    Object.keys(nutrients.vitamines).forEach(key => {
      if (updatedProfile.goals.vitamines[key]) {
        updatedProfile.goals.vitamines[key].current = nutrients.vitamines[key];
      }
    });
    
    Object.keys(nutrients.mineraux).forEach(key => {
      if (updatedProfile.goals.mineraux[key]) {
        updatedProfile.goals.mineraux[key].current = nutrients.mineraux[key];
      }
    });
    
    Object.keys(nutrients.oligoelements).forEach(key => {
      if (updatedProfile.goals.oligoelements[key]) {
        updatedProfile.goals.oligoelements[key].current = nutrients.oligoelements[key];
      }
    });
    
    updateProfile(updatedProfile);
  };

  // Added alias for setActiveProfile to match usage in ProfilUtilisateur.tsx
  const setActiveProfileById = setActiveProfile;

  return {
    profiles,
    activeProfileId,
    activeProfile,
    getActiveProfile,
    updateProfile,
    addProfile,
    removeProfile,
    setActiveProfile,
    setActiveProfileById,
    updateNutrientIntake,
  };
};

export default useUserProfile;
