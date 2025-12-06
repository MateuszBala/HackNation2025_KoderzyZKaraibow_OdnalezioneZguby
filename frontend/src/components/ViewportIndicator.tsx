import React, { useState, useEffect } from 'react';
import { Monitor, Tablet, Smartphone } from 'lucide-react';

export function ViewportIndicator() {
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setViewport('mobile');
      } else if (width < 1024) {
        setViewport('tablet');
      } else {
        setViewport('desktop');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const icons = {
    mobile: Smartphone,
    tablet: Tablet,
    desktop: Monitor
  };
  
  const labels = {
    mobile: 'Mobile',
    tablet: 'Tablet',
    desktop: 'Desktop'
  };
  
  const Icon = icons[viewport];
  
  return (
    <div className="fixed bottom-4 right-4 bg-[#0052a5] text-white px-4 py-2 rounded-[2px] shadow-lg z-50 flex items-center gap-2">
      <Icon size={16} />
      <span className="text-sm">{labels[viewport]}</span>
      <span className="text-xs opacity-80">({window.innerWidth}px)</span>
    </div>
  );
}
