
import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  nestedAccordion?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ 
  title, 
  children, 
  defaultOpen = false,
  nestedAccordion = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className={`border-t border-b ${nestedAccordion ? 'border-gray-50' : 'border-gray-100'} py-2 ${nestedAccordion ? 'ml-6' : ''}`}>
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

export default Accordion;
