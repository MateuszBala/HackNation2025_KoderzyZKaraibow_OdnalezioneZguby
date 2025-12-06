import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function Card({ children, className = '', title }: CardProps) {
  return (
    <div className={`bg-white border border-[#E5E5E5] rounded-[2px] p-6 ${className}`}>
      {title && <h3 className="mb-4">{title}</h3>}
      {children}
    </div>
  );
}
