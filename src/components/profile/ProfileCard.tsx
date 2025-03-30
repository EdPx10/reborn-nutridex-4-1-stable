
import React, { useState } from 'react';
import { UserProfile } from '@/types';
import { Edit, User, Plus } from 'lucide-react';
import TabButton from './TabButton';
import MacroNutrientSection from './MacroNutrientSection';
import MicroNutrientSection from './MicroNutrientSection';

interface ProfileCardProps {
  profile: UserProfile;
  isActive: boolean;
  onActivate: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  profile, 
  isActive, 
  onActivate
}) => {
  const [activeTab, setActiveTab] = useState('macronutriments');
  
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
              <MacroNutrientSection profile={profile} />
            )}
            
            {activeTab === 'micronutriments' && (
              <MicroNutrientSection profile={profile} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
