import React, { useState } from 'react';
import { Menu, Bell, User, ChevronDown, Globe } from 'lucide-react';

interface NavigationProps {
  onMenuToggle?: () => void;
}

export function Navigation({ onMenuToggle }: NavigationProps) {
  const [langDropdown, setLangDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  
  return (
    <nav className="bg-white border-b border-[#e5e5e5] sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 text-[#333333] hover:bg-[#f2f2f2] rounded-[2px]"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0052a5] rounded-[2px] flex items-center justify-center">
                <span className="text-white">OD</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg mb-0">Otwarte Dane</h1>
                <p className="text-xs text-[#6c757d] mb-0">dane.gov.pl</p>
              </div>
            </div>
          </div>
          
          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdown(!langDropdown)}
                className="flex items-center gap-1 px-3 py-2 text-[#333333] hover:bg-[#f2f2f2] rounded-[2px]"
              >
                <Globe size={18} />
                <span className="hidden sm:inline">PL</span>
                <ChevronDown size={16} />
              </button>
              
              {langDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-[#e5e5e5] rounded-[2px] shadow-lg">
                  <button className="w-full px-4 py-2 text-left hover:bg-[#f2f2f2] text-[#333333]">
                    Polski
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-[#f2f2f2] text-[#333333]">
                    English
                  </button>
                </div>
              )}
            </div>
            
            {/* Notifications */}
            <button className="relative p-2 text-[#333333] hover:bg-[#f2f2f2] rounded-[2px]">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#dc3545] rounded-full"></span>
            </button>
            
            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 px-3 py-2 text-[#333333] hover:bg-[#f2f2f2] rounded-[2px]"
              >
                <User size={20} />
                <span className="hidden md:inline">Jan Kowalski</span>
                <ChevronDown size={16} />
              </button>
              
              {userDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#e5e5e5] rounded-[2px] shadow-lg">
                  <div className="px-4 py-3 border-b border-[#e5e5e5]">
                    <p className="mb-0">Jan Kowalski</p>
                    <p className="text-sm text-[#6c757d] mb-0">j.kowalski@example.pl</p>
                  </div>
                  <button className="w-full px-4 py-2 text-left hover:bg-[#f2f2f2] text-[#333333]">
                    Mój profil
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-[#f2f2f2] text-[#333333]">
                    Ustawienia
                  </button>
                  <div className="border-t border-[#e5e5e5]">
                    <button className="w-full px-4 py-2 text-left hover:bg-[#f2f2f2] text-[#333333]">
                      Wyloguj
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
