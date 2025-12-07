import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  children: ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-[2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex flex-row items-center justify-center';
  
  const variants = {
    primary: 'bg-[#0052A5] text-white hover:bg-[#003d7a] focus:ring-2 focus:ring-[#0052A5] focus:ring-offset-2',
    secondary: 'bg-[#E5E5E5] text-[#333] hover:bg-[#CCCCCC] focus:ring-2 focus:ring-[#CCCCCC] focus:ring-offset-2',
    tertiary: 'bg-transparent text-[#0052A5] hover:bg-[#F2F2F2] focus:ring-2 focus:ring-[#0052A5] focus:ring-offset-2',
    danger: 'bg-red-500 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-white focus:ring-offset-2'
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
