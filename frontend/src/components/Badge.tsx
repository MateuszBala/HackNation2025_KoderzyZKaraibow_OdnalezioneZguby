interface BadgeProps {
  variant: 'success' | 'warning' | 'neutral' | 'info';
  children: React.ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  const variants = {
    success: 'bg-[#d4edda] text-[#155724] border-[#c3e6cb]',
    warning: 'bg-[#fff3cd] text-[#856404] border-[#ffeaa7]',
    neutral: 'bg-[#e2e3e5] text-[#383d41] border-[#d6d8db]',
    info: 'bg-[#d1ecf1] text-[#0c5460] border-[#bee5eb]',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-[2px] border ${variants[variant]}`}>
      {children}
    </span>
  );
}
