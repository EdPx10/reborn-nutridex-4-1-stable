
import React from 'react';
import { UserProfile } from '@/types';
import MacroNutrient from './MacroNutrient';
import Accordion from '@/components/mon-assiette/Accordion';  // Updated to use our custom Accordion

interface MacroNutrientSectionProps {
  profile: UserProfile;
}

const MacroNutrientSection: React.FC<MacroNutrientSectionProps> = ({ profile }) => {
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
          
          <div className="space-y-6 mt-6">
            <MacroNutrient
              label="Acides gras saturés"
              nutrientKey="lipides"
              goal={profile.goals.lipides}
              subGoalPercentage={0.33}
              showIcon={false}
              indent={true}
            />
            
            <MacroNutrient
              label="Acides gras mono-insaturés"
              nutrientKey="lipides"
              goal={profile.goals.lipides}
              subGoalPercentage={0.33}
              showIcon={false}
              indent={true}
            />
            
            <MacroNutrient
              label="Acides gras poly-insaturés (Total)"
              nutrientKey="lipides"
              goal={profile.goals.lipides}
              subGoalPercentage={0.33}
              showIcon={false}
              indent={true}
            />
            
            <div className="ml-6 space-y-6 mt-6">
              <MacroNutrient
                label="Oméga-3"
                nutrientKey="lipides"
                goal={{
                  current: profile.goals.lipides.current * 0.05,
                  goal: 2,
                  unit: 'g'
                }}
                showIcon={false}
                indent={true}
              />
              
              <MacroNutrient
                label="Oméga-6"
                nutrientKey="lipides"
                goal={{
                  current: profile.goals.lipides.current * 0.1,
                  goal: 10,
                  unit: 'g'
                }}
                showIcon={false}
                indent={true}
              />
            </div>
          </div>
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
