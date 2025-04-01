
import React from 'react';
import { UserProfile } from '@/types';
import MicroNutrient from './MicroNutrient';
import Accordion from '@/components/mon-assiette/Accordion';

interface MicroNutrientSectionProps {
  profile: UserProfile;
}

const MicroNutrientSection: React.FC<MicroNutrientSectionProps> = ({ profile }) => {
  return (
    <div className="space-y-4">
      <Accordion title="Vitamines" defaultOpen={true}>
        <div className="space-y-6 pt-2">
          {Object.entries(profile.goals.vitamines).map(([key, goal]) => (
            <MicroNutrient
              key={key}
              label={`Vitamine ${key.toUpperCase()}`}
              category="vitamines"
              nutrientKey={key}
              goal={goal}
            />
          ))}
        </div>
      </Accordion>
      
      <Accordion title="Minéraux">
        <div className="space-y-6 pt-2">
          {Object.entries(profile.goals.mineraux).map(([key, goal]) => (
            <MicroNutrient
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              category="mineraux"
              nutrientKey={key}
              goal={goal}
            />
          ))}
        </div>
      </Accordion>
      
      <Accordion title="Oligo-éléments">
        {profile.goals.oligoelements && Object.keys(profile.goals.oligoelements).length > 0 ? (
          <div className="space-y-6 pt-2">
            {Object.entries(profile.goals.oligoelements).map(([key, goal]) => (
              <MicroNutrient
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                category="oligoelements"
                nutrientKey={key}
                goal={goal}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">
            Aucun objectif défini pour les oligo-éléments
          </p>
        )}
      </Accordion>
    </div>
  );
};

export default MicroNutrientSection;
