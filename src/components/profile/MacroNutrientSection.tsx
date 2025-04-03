
import React from 'react';
import { UserProfile } from '@/types';
import MacroNutrient from './MacroNutrient';
import Accordion from '@/components/mon-assiette/Accordion';

interface MacroNutrientSectionProps {
  profile: UserProfile;
}

const MacroNutrientSection: React.FC<MacroNutrientSectionProps> = ({ profile }) => {
  // Vérifier si le profil a des objectifs de lipides détaillés
  const hasDetailedLipids = profile.goals.lipids !== undefined;
  
  return (
    <div className="space-y-8">
      <MacroNutrient
        label="Glucides"
        nutrientKey="glucides"
        goal={profile.goals.glucides}
      />
      <MacroNutrient
        label="Protéines"
        nutrientKey="proteines"
        goal={profile.goals.proteines}
      />
      
      <div className="pt-2">
        <Accordion title="Lipides">
          <MacroNutrient
            label="Lipides (Total)"
            nutrientKey="lipides"
            goal={profile.goals.lipides}
            showIcon={false}
          />
          
          {hasDetailedLipids && (
            <div className="space-y-6 mt-6">
              <MacroNutrient
                label="Acides gras saturés (AGS)"
                nutrientKey="lipides"
                goal={profile.goals.lipids!.saturated}
                showIcon={false}
                indent={true}
              />
              
              <MacroNutrient
                label="Acides gras mono-insaturés (AMS)"
                nutrientKey="lipides"
                goal={profile.goals.lipids!.monoUnsaturated}
                showIcon={false}
                indent={true}
              />
              
              <MacroNutrient
                label="Acides gras poly-insaturés (AGP)"
                nutrientKey="lipides"
                goal={profile.goals.lipids!.polyUnsaturated}
                showIcon={false}
                indent={true}
              />
              
              <div className="ml-6 space-y-6 mt-6">
                <MacroNutrient
                  label="Oméga-3"
                  nutrientKey="lipides"
                  goal={profile.goals.lipids!.omega3}
                  showIcon={false}
                  indent={true}
                />
                
                <MacroNutrient
                  label="Oméga-6"
                  nutrientKey="lipides"
                  goal={profile.goals.lipids!.omega6}
                  showIcon={false}
                  indent={true}
                />
                
                {/* Afficher la relation mathématique */}
                <div className="text-xs text-gray-500 ml-6 mt-2">
                  AGP (Total) = Oméga-3 + Oméga-6 = {profile.goals.lipids!.omega3.current + profile.goals.lipids!.omega6.current} g
                </div>
              </div>
              
              {/* Afficher la relation mathématique */}
              <div className="text-xs text-gray-500 mt-2">
                Lipides (Total) = AGS + AMS + AGP = {
                  profile.goals.lipids!.saturated.current + 
                  profile.goals.lipids!.monoUnsaturated.current + 
                  profile.goals.lipids!.polyUnsaturated.current
                } g
              </div>
            </div>
          )}
        </Accordion>
      </div>
      
      <MacroNutrient
        label="Fibres"
        nutrientKey="fibres"
        goal={profile.goals.fibres}
      />
    </div>
  );
};

export default MacroNutrientSection;
