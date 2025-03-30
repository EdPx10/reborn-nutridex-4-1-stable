
import React from 'react';

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

export default TabButton;
