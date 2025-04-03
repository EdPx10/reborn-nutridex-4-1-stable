
import React, { useState } from 'react';
import { UserProfile } from '@/types';
import { Check, ChevronRight, Edit, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TabButton from './TabButton';
import MacroNutrientSection from './MacroNutrientSection';
import MicroNutrientSection from './MicroNutrientSection';
import ProfileEditForm from './ProfileEditForm';

interface ProfileCardProps {
  profile: UserProfile;
  isActive: boolean;
  onActivate: () => void;
  onUpdate: (updatedProfile: UserProfile) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, isActive, onActivate, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'macros' | 'micros'>('macros');
  const [isEditing, setIsEditing] = useState(false);

  const closeDialog = () => setIsOpen(false);
  
  const handleProfileUpdate = (formValues: any) => {
    const updatedProfile = {
      ...profile,
      ...formValues
    };
    onUpdate(updatedProfile);
    setIsEditing(false);
  };
  
  return (
    <>
      <div 
        className={`mb-4 p-4 rounded-lg border ${isActive ? 'border-nutri-green bg-green-50' : 'border-gray-200'}`}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-nutri-green/10 rounded-full flex items-center justify-center">
              <User size={20} className="text-nutri-green" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{profile.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{profile.age} ans</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{profile.weight} kg</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{profile.height} cm</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isActive && (
              <Badge className="bg-nutri-green">
                <Check size={14} className="mr-1" />
                Actif
              </Badge>
            )}
            <ChevronRight className="text-gray-400" />
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg">
          {isEditing ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Modifier le profil</DialogTitle>
              </DialogHeader>
              <ProfileEditForm 
                profile={profile} 
                onSubmit={handleProfileUpdate} 
                onCancel={() => setIsEditing(false)} 
              />
            </>
          ) : (
            <>
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <DialogTitle className="text-2xl">{profile.name}</DialogTitle>
                  {isActive && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsEditing(true)}
                      className="h-8 w-8"
                    >
                      <Edit size={16} />
                    </Button>
                  )}
                </div>
              </DialogHeader>
              
              <div className="flex justify-center mt-2 mb-6">
                <div className="inline-flex border rounded-lg overflow-hidden">
                  <TabButton 
                    active={activeTab === 'macros'} 
                    onClick={() => setActiveTab('macros')}
                  >
                    Macronutriments
                  </TabButton>
                  <TabButton 
                    active={activeTab === 'micros'} 
                    onClick={() => setActiveTab('micros')}
                  >
                    Micronutriments
                  </TabButton>
                </div>
              </div>
              
              {activeTab === 'macros' && (
                <MacroNutrientSection profile={profile} />
              )}
              
              {activeTab === 'micros' && (
                <MicroNutrientSection profile={profile} />
              )}
              
              <div className="flex justify-between mt-6 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={closeDialog}
                >
                  Fermer
                </Button>
                
                {!isActive && (
                  <Button 
                    onClick={() => {
                      onActivate();
                      closeDialog();
                    }}
                  >
                    Activer ce profil
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileCard;
