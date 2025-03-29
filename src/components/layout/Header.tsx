
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, UtensilsCrossed, List, User, Search } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-nutri-green text-xl font-bold">
            NutriDex
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" active={isActive('/')} icon={<Home size={18} />}>
              Explorateur
            </NavLink>
            <NavLink to="/mon-assiette" active={isActive('/mon-assiette')} icon={<UtensilsCrossed size={18} />}>
              Mon assiette
            </NavLink>
            <NavLink to="/aliments" active={isActive('/aliments')} icon={<List size={18} />}>
              Tous les aliments
            </NavLink>
            <NavLink to="/profil" active={isActive('/profil')} icon={<User size={18} />}>
              Profil
            </NavLink>
          </div>
          
          <button className="md:hidden p-2">
            <Search size={20} />
          </button>
        </div>
      </div>
      
      {/* Navigation mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="grid grid-cols-4 h-16">
          <NavButton to="/" active={isActive('/')} icon={<Home size={20} />} label="Explorateur" />
          <NavButton to="/mon-assiette" active={isActive('/mon-assiette')} icon={<UtensilsCrossed size={20} />} label="Assiette" />
          <NavButton to="/aliments" active={isActive('/aliments')} icon={<List size={20} />} label="Aliments" />
          <NavButton to="/profil" active={isActive('/profil')} icon={<User size={20} />} label="Profil" />
        </div>
      </nav>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, icon, children }) => (
  <Link
    to={to}
    className={`flex items-center space-x-1 px-3 py-2 rounded-md transition ${
      active 
        ? 'text-nutri-green font-medium' 
        : 'text-gray-600 hover:text-nutri-green'
    }`}
  >
    {icon}
    <span>{children}</span>
  </Link>
);

interface NavButtonProps {
  to: string;
  active: boolean;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ to, active, icon, label }) => (
  <Link
    to={to}
    className={`flex flex-col items-center justify-center ${
      active ? 'text-nutri-green' : 'text-gray-500'
    }`}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </Link>
);

export default Header;
