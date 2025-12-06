import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
      <a href="/" className="flex items-center gap-1 text-[#0052a5] hover:underline">
        <Home size={16} />
        <span className="hidden sm:inline">Strona główna</span>
      </a>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={16} className="text-[#6c757d]" />
          {item.href ? (
            <a href={item.href} className="text-[#0052a5] hover:underline">
              {item.label}
            </a>
          ) : (
            <span className="text-[#333333]">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
