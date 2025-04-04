
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
      saturated: { current: 0, goal: 26, unit: 'g' },
      monoUnsaturated: { current: 0, goal: 26, unit: 'g' },
      polyUnsaturated: { current: 0, goal: 26, unit: 'g' },
      omega3: { current: 0, goal: 2, unit: 'g' },
      omega6: { current: 0, goal: 24, unit: 'g' }
    },
    fibres: { current: 0, goal: 30, unit: 'g' },
    vitamines: {
      vitamineA: { current: 0, goal: 900, unit: 'µg' },
      vitamineD: { current: 0, goal: 20, unit: 'µg' },
      vitamineE: { current: 0, goal: 15, unit: 'mg' },
      vitamineK1: { current: 0, goal: 120, unit: 'µg' },
      vitamineC: { current: 0, goal: 90, unit: 'mg' },
      vitamineB1: { current: 0, goal: 1.2, unit: 'mg' },
      vitamineB2: { current: 0, goal: 1.3, unit: 'mg' },
      vitamineB3: { current: 0, goal: 16, unit: 'mg' },
      vitamineB5: { current: 0, goal: 5, unit: 'mg' },
      vitamineB6: { current: 0, goal: 1.7, unit: 'mg' },
      vitamineB8: { current: 0, goal: 30, unit: 'µg' },
      vitamineB9: { current: 0, goal: 400, unit: 'µg' },
      vitamineB12: { current: 0, goal: 2.4, unit: 'µg' },
    },
    mineraux: {
      calcium: { current: 0, goal: 1000, unit: 'mg' },
      magnesium: { current: 0, goal: 420, unit: 'mg' },
      phosphore: { current: 0, goal: 700, unit: 'mg' },
      potassium: { current: 0, goal: 3500, unit: 'mg' },
      sodium: { current: 0, goal: 2300, unit: 'mg' },
    },
    oligoelements: {
      fer: { current: 0, goal: 8, unit: 'mg' },
      zinc: { current: 0, goal: 11, unit: 'mg' },
      cuivre: { current: 0, goal: 900, unit: 'µg' },
      manganese: { current: 0, goal: 2.3, unit: 'mg' },
      selenium: { current: 0, goal: 55, unit: 'µg' },
      iode: { current: 0, goal: 150, unit: 'µg' },
      chrome: { current: 0, goal: 35, unit: 'µg' },
      molybdene: { current: 0, goal: 45, unit: 'µg' },
    }
  }
};

export const useUserProfile = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([DEFAULT_PROFILE]);
  const [activeProfileId, setActiveProfileId] = useState<string>(DEFAULT_PROFILE.id);

  useEffect(() => {
    const savedProfiles = localStorage.getItem('userProfiles');
    const savedActiveProfileId = localStorage.getItem('activeProfileId');
    
    if (savedProfiles) {
      try {
        const parsedProfiles = JSON.parse(savedProfiles);
        const updatedProfiles = parsedProfiles.map((profile: UserProfile) => {
          if (!profile.goals.lipids) {
            const totalLipids = profile.goals.lipides.goal;
            profile.goals.lipids = {
              saturated: { current: 0, goal: Math.round(totalLipids * 0.33), unit: 'g' },
              monoUnsaturated: { current: 0, goal: Math.round(totalLipids * 0.33), unit: 'g' },
              polyUnsaturated: { current: 0, goal: Math.round(totalLipids * 0.34), unit: 'g' },
              omega3: { current: 0, goal: 2, unit: 'g' },
              omega6: { current: 0, goal: Math.round(totalLipids * 0.34) - 2, unit: 'g' }
            };
          }
          
          // Ensure all vitamin fields exist
          if (!profile.goals.vitamines) {
            profile.goals.vitamines = DEFAULT_PROFILE.goals.vitamines;
          } else {
            // Add any missing vitamin fields
            for (const key in DEFAULT_PROFILE.goals.vitamines) {
              if (!profile.goals.vitamines[key as keyof typeof DEFAULT_PROFILE.goals.vitamines]) {
                profile.goals.vitamines[key as keyof typeof DEFAULT_PROFILE.goals.vitamines] = 
                  DEFAULT_PROFILE.goals.vitamines[key as keyof typeof DEFAULT_PROFILE.goals.vitamines];
              }
            }
          }
          
          // Ensure all mineral fields exist
          if (!profile.goals.mineraux) {
            profile.goals.mineraux = DEFAULT_PROFILE.goals.mineraux;
          } else {
            // Add any missing mineral fields
            for (const key in DEFAULT_PROFILE.goals.mineraux) {
              if (!profile.goals.mineraux[key as keyof typeof DEFAULT_PROFILE.goals.mineraux]) {
                profile.goals.mineraux[key as keyof typeof DEFAULT_PROFILE.goals.mineraux] = 
                  DEFAULT_PROFILE.goals.mineraux[key as keyof typeof DEFAULT_PROFILE.goals.mineraux];
              }
            }
          }
          
          // Ensure all oligoelement fields exist
          if (!profile.goals.oligoelements) {
            profile.goals.oligoelements = DEFAULT_PROFILE.goals.oligoelements;
          } else {
            // Add any missing oligoelement fields
            for (const key in DEFAULT_PROFILE.goals.oligoelements) {
              if (!profile.goals.oligoelements[key as keyof typeof DEFAULT_PROFILE.goals.oligoelements]) {
                profile.goals.oligoelements[key as keyof typeof DEFAULT_PROFILE.goals.oligoelements] = 
                  DEFAULT_PROFILE.goals.oligoelements[key as keyof typeof DEFAULT_PROFILE.goals.oligoelements];
              }
            }
          }
          
          const omega3Goal = profile.goals.lipids.omega3.goal;
          const omega6Goal = profile.goals.lipids.omega6.goal;
          profile.goals.lipids.polyUnsaturated.goal = omega3Goal + omega6Goal;
          
          profile.goals.lipides.goal = 
            profile.goals.lipids.saturated.goal + 
            profile.goals.lipids.monoUnsaturated.goal + 
            profile.goals.lipids.polyUnsaturated.goal;
            
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

  useEffect(() => {
    localStorage.setItem('userProfiles', JSON.stringify(profiles));
    localStorage.setItem('activeProfileId', activeProfileId);
  }, [profiles, activeProfileId]);

  const getActiveProfile = (): UserProfile => {
    return profiles.find(profile => profile.id === activeProfileId) || DEFAULT_PROFILE;
  };

  const activeProfile = getActiveProfile();

  const updateProfile = (updatedProfile: UserProfile) => {
    if (updatedProfile.goals.lipids) {
      updatedProfile.goals.lipids.polyUnsaturated.goal = 
        updatedProfile.goals.lipids.omega3.goal + 
        updatedProfile.goals.lipids.omega6.goal;
      
      updatedProfile.goals.lipides.goal = 
        updatedProfile.goals.lipids.saturated.goal + 
        updatedProfile.goals.lipids.monoUnsaturated.goal + 
        updatedProfile.goals.lipids.polyUnsaturated.goal;
    }
    
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

  const getEmptyNutrientIntake = () => {
    return {
      glucides: 0,
      proteines: 0,
      lipides: 0,
      fibres: 0,
      lipids: {
        saturated: 0,
        monoUnsaturated: 0,
        polyUnsaturated: 0,
        omega3: 0,
        omega6: 0
      },
      vitamines: {
        vitamineA: 0,
        vitamineD: 0,
        vitamineE: 0,
        vitamineK1: 0,
        vitamineC: 0,
        vitamineB1: 0,
        vitamineB2: 0,
        vitamineB3: 0,
        vitamineB5: 0,
        vitamineB6: 0,
        vitamineB8: 0,
        vitamineB9: 0,
        vitamineB12: 0
      },
      mineraux: {
        calcium: 0,
        magnesium: 0,
        phosphore: 0,
        potassium: 0,
        sodium: 0
      },
      oligoelements: {
        fer: 0,
        zinc: 0,
        cuivre: 0,
        manganese: 0,
        selenium: 0,
        iode: 0,
        chrome: 0,
        molybdene: 0
      }
    };
  };

  const updateNutrientIntake = (nutrients: any) => {
    const empty = getEmptyNutrientIntake();

    // Create a deep merged object with all fields
    const merged = {
      ...empty,
      ...nutrients,
      lipids: {
        ...empty.lipids,
        ...nutrients.lipids,
      },
      vitamines: {
        ...empty.vitamines,
        ...nutrients.vitamines,
      },
      mineraux: {
        ...empty.mineraux,
        ...nutrients.mineraux,
      },
      oligoelements: {
        ...empty.oligoelements,
        ...nutrients.oligoelements,
      },
    };

    const updatedProfile = { ...activeProfile };

    // Update macro-nutrient values
    updatedProfile.goals.glucides.current = merged.glucides;
    updatedProfile.goals.proteines.current = merged.proteines;
    updatedProfile.goals.lipides.current = merged.lipides;
    updatedProfile.goals.fibres.current = merged.fibres;

    // Update lipid details
    if (updatedProfile.goals.lipids) {
      updatedProfile.goals.lipids.saturated.current = merged.lipids.saturated;
      updatedProfile.goals.lipids.monoUnsaturated.current = merged.lipids.monoUnsaturated;
      updatedProfile.goals.lipids.polyUnsaturated.current = merged.lipids.omega3 + merged.lipids.omega6;
      updatedProfile.goals.lipids.omega3.current = merged.lipids.omega3;
      updatedProfile.goals.lipids.omega6.current = merged.lipids.omega6;
    }

    // Update all vitamin values
    for (const key in merged.vitamines) {
      if (updatedProfile.goals.vitamines[key as keyof typeof updatedProfile.goals.vitamines]) {
        updatedProfile.goals.vitamines[key as keyof typeof updatedProfile.goals.vitamines].current = 
          merged.vitamines[key as keyof typeof merged.vitamines];
      }
    }

    // Update all mineral values
    for (const key in merged.mineraux) {
      if (updatedProfile.goals.mineraux[key as keyof typeof updatedProfile.goals.mineraux]) {
        updatedProfile.goals.mineraux[key as keyof typeof updatedProfile.goals.mineraux].current = 
          merged.mineraux[key as keyof typeof merged.mineraux];
      }
    }

    // Update all oligoelement values
    for (const key in merged.oligoelements) {
      if (updatedProfile.goals.oligoelements[key as keyof typeof updatedProfile.goals.oligoelements]) {
        updatedProfile.goals.oligoelements[key as keyof typeof updatedProfile.goals.oligoelements].current = 
          merged.oligoelements[key as keyof typeof merged.oligoelements];
      }
    }

    updateProfile(updatedProfile);
  };

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
    getEmptyNutrientIntake,
  };
};

export default useUserProfile;
