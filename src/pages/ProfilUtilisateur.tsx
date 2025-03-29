
import React, { useState } from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserProfile, NutrientGoal } from '@/types';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ChevronDown, ChevronUp, Edit, User, Plus } from 'lucide-react';

const ProfilUtilisateur: React.FC = () => {
  const { profiles, activeProfile, createProfile, updateProfile, setActiveProfileById } = useUserProfile();
  const [activeTab, setActiveTab] = useState('macronutriments');
  
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
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ))}
    </div>
  );
};

interface ProfileCardProps {
  profile: UserProfile;
  isActive: boolean;
  onActivate: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  profile, 
  isActive, 
  onActivate,
  activeTab,
  setActiveTab
}) => {
  return (
    <div className={`border rounded-xl mb-8 ${
      isActive ? 'border-nutri-green' : 'border-gray-200'
    }`}>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-gray-600">
              Sexe : {profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)}
              {profile.weight && ` • Poids : ${profile.weight} kg`}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {isActive ? (
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                Actif
              </div>
            ) : (
              <button 
                onClick={onActivate}
                className="px-3 py-1 border border-nutri-green text-nutri-green rounded-full hover:bg-nutri-light"
              >
                Activer
              </button>
            )}
            <button className="p-2 text-gray-500 hover:text-nutri-green">
              <Edit size={18} />
            </button>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex border-b">
            <TabButton 
              active={activeTab === 'macronutriments'} 
              onClick={() => setActiveTab('macronutriments')}
            >
              Macronutriments
            </TabButton>
            <TabButton 
              active={activeTab === 'micronutriments'} 
              onClick={() => setActiveTab('micronutriments')}
            >
              Micronutriments
            </TabButton>
          </div>
          
          <div className="pt-6">
            {activeTab === 'macronutriments' && (
              <div className="space-y-8">
                <MacroNutrient
                  label="Glucides"
                  icon="🌾"
                  goal={profile.goals.glucides}
                />
                <MacroNutrient
                  label="Protéines"
                  icon="🥩"
                  goal={profile.goals.proteines}
                />
                
                <div className="pt-2">
                  <Accordion title="Lipides">
                    <MacroNutrient
                      label="Lipides (Total)"
                      icon="🧈"
                      goal={profile.goals.lipides}
                      showIcon={false}
                    />
                    
                    <div className="space-y-6 mt-6">
                      <MacroNutrient
                        label="Acides gras saturés"
                        goal={profile.goals.lipides}
                        subGoalPercentage={0.33}
                        showIcon={false}
                        indent={true}
                      />
                      
                      <MacroNutrient
                        label="Acides gras mono-insaturés"
                        goal={profile.goals.lipides}
                        subGoalPercentage={0.33}
                        showIcon={false}
                        indent={true}
                      />
                      
                      <Accordion title="Acides gras poly-insaturés" nestedAccordion={true}>
                        <MacroNutrient
                          label="Acides gras poly-insaturés (Total)"
                          goal={profile.goals.lipides}
                          subGoalPercentage={0.33}
                          showIcon={false}
                          indent={true}
                        />
                        
                        <div className="space-y-6 mt-6">
                          <MacroNutrient
                            label="Oméga-3"
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
                            goal={{
                              current: profile.goals.lipides.current * 0.1,
                              goal: 10,
                              unit: 'g'
                            }}
                            showIcon={false}
                            indent={true}
                          />
                        </div>
                      </Accordion>
                    </div>
                  </Accordion>
                </div>
                
                <MacroNutrient
                  label="Fibres"
                  icon="🥬"
                  goal={profile.goals.fibres}
                />
              </div>
            )}
            
            {activeTab === 'micronutriments' && (
              <div className="space-y-4">
                <Accordion title="Vitamines" defaultOpen={true}>
                  <div className="space-y-6 pt-2">
                    {Object.entries(profile.goals.vitamines).map(([key, goal]) => (
                      <MicroNutrient
                        key={key}
                        label={`Vitamine ${key.toUpperCase()}`}
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
                        goal={goal}
                      />
                    ))}
                  </div>
                </Accordion>
                
                <Accordion title="Oligo-éléments">
                  <p className="text-gray-500 italic">
                    Aucun objectif défini pour les oligo-éléments
                  </p>
                </Accordion>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children }) => {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 font-medium border-b-2 -mb-px transition ${
        active 
          ? 'border-nutri-green text-nutri-green' 
          : 'border-transparent text-gray-600 hover:text-gray-900'
      }`}
    >
      {children}
    </button>
  );
};

interface MacroNutrientProps {
  label: string;
  icon?: string;
  goal: NutrientGoal;
  showIcon?: boolean;
  indent?: boolean;
  subGoalPercentage?: number;
}

const MacroNutrient: React.FC<MacroNutrientProps> = ({ 
  label, 
  icon, 
  goal,
  showIcon = true,
  indent = false,
  subGoalPercentage
}) => {
  const adjustedGoal = subGoalPercentage ? {
    ...goal,
    current: goal.current * subGoalPercentage,
    goal: goal.goal * subGoalPercentage
  } : goal;
  
  const percentage = Math.round((adjustedGoal.current / adjustedGoal.goal) * 100);
  
  return (
    <div className={indent ? "ml-6" : ""}>
      <div className="flex items-center gap-2 mb-1">
        {showIcon && icon && <span className="text-xl">{icon}</span>}
        <span className="font-medium">{label}</span>
      </div>
      
      <ProgressBar 
        value={adjustedGoal.current} 
        max={adjustedGoal.goal}
        height="h-2.5"
        color={label.includes('Lipides') || label.includes('gras') || label.includes('Oméga') ? 'bg-nutri-yellow' : 
               label.includes('Glucides') ? 'bg-nutri-blue' : 
               label.includes('Protéines') ? 'bg-nutri-red' : 'bg-nutri-green'}
      />
      
      <div className="flex justify-between mt-1 text-sm text-gray-600">
        <div>{percentage}% de l'objectif</div>
        <div>
          {adjustedGoal.current} / {adjustedGoal.goal} {adjustedGoal.unit} 
          {adjustedGoal.recommended && ` (recommandé: ${adjustedGoal.recommended} ${adjustedGoal.unit})`}
        </div>
      </div>
    </div>
  );
};

interface MicroNutrientProps {
  label: string;
  goal: NutrientGoal;
}

const MicroNutrient: React.FC<MicroNutrientProps> = ({ label, goal }) => {
  const percentage = Math.round((goal.current / goal.goal) * 100);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span>{label}</span>
        <span className="text-sm text-gray-600">
          {goal.current} / {goal.goal} {goal.unit}
        </span>
      </div>
      
      <ProgressBar 
        value={goal.current} 
        max={goal.goal} 
        height="h-2"
        color="bg-nutri-orange"
      />
      
      <div className="text-right mt-1 text-sm text-gray-500">
        {percentage}% de l'objectif
      </div>
    </div>
  );
};

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  nestedAccordion?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false, nestedAccordion = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className={`border-t border-b ${nestedAccordion ? 'border-gray-50 ml-6' : 'border-gray-100'} py-2`}>
      <button 
        className="flex justify-between items-center w-full py-2 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${nestedAccordion ? '' : 'font-medium'}`}>{title}</span>
        {isOpen ? <ChevronUp size={nestedAccordion ? 16 : 18} /> : <ChevronDown size={nestedAccordion ? 16 : 18} />}
      </button>
      
      {isOpen && (
        <div className="pt-2 pb-3">
          {children}
        </div>
      )}
    </div>
  );
};

export default ProfilUtilisateur;
