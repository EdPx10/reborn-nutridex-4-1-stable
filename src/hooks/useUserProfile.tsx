
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
        c: 0,
        d: 0,
        b12: 0,
        a: 0,
      },
      mineraux: {
        calcium: 0,
        fer: 0,
        magnesium: 0,
      },
      oligoelements: {
        zinc: 0,
        selenium: 0,
      }
    };
  };

  const updateNutrientIntake = (nutrients) => {
    const empty = getEmptyNutrientIntake();

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

    updatedProfile.goals.glucides.current = merged.glucides;
    updatedProfile.goals.proteines.current = merged.proteines;
    updatedProfile.goals.lipides.current = merged.lipides;
    updatedProfile.goals.fibres.current = merged.fibres;

    if (updatedProfile.goals.lipids) {
      updatedProfile.goals.lipids.saturated.current = merged.lipids.saturated;
      updatedProfile.goals.lipids.monoUnsaturated.current = merged.lipids.monoUnsaturated;
      updatedProfile.goals.lipids.polyUnsaturated.current = merged.lipids.omega3 + merged.lipids.omega6;
      updatedProfile.goals.lipids.omega3.current = merged.lipids.omega3;
      updatedProfile.goals.lipids.omega6.current = merged.lipids.omega6;
    }

    for (const key in merged.vitamines) {
      if (updatedProfile.goals.vitamines[key]) {
        updatedProfile.goals.vitamines[key].current = merged.vitamines[key];
      }
    }

    for (const key in merged.mineraux) {
      if (updatedProfile.goals.mineraux[key]) {
        updatedProfile.goals.mineraux[key].current = merged.mineraux[key];
      }
    }

    for (const key in merged.oligoelements) {
      if (updatedProfile.goals.oligoelements[key]) {
        updatedProfile.goals.oligoelements[key].current = merged.oligoelements[key];
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
