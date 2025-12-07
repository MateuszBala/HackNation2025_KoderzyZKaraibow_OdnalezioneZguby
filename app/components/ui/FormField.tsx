import { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  helper?: string;
  children: ReactNode;
  id?: string;
}

export function FormField({ label, required, error, helper, children, id }: FormFieldProps) {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block mb-2">
        {label}
        {required && <span className="text-[#dc3545] ml-1">*</span>}
      </label>
      {children}
      {helper && <p className="mt-2 text-[#666]">{helper}</p>}
      {error && (
        <p className="mt-2 text-[#dc3545]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ className = '', error, ...props }: any) {
  return (
    <input
      className={`w-full px-4 py-2 border rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#0052A5] ${
        error ? 'border-[#dc3545]' : 'border-[#CCCCCC]'
      } ${className}`}
      {...props}
    />
  );
}

export function Textarea({ className = '', error, ...props }: any) {
  return (
    <textarea
      className={`w-full px-4 py-2 border rounded-xs focus:outline-none focus:ring-2 focus:ring-[#0052A5] ${
        error ? 'border-[#dc3545]' : 'border-[#CCCCCC]'
      } ${className}`}
      rows={4}
      {...props}
    />
  );
}

export function Select({ className = '', error, children, ...props }: any) {
  return (
    <select
      className={`w-full px-4 py-2 border rounded-xs focus:outline-none focus:ring-2 focus:ring-[#0052A5] bg-white ${
        error ? 'border-[#dc3545]' : 'border-[#CCCCCC]'
      } ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

interface DatePickerProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: string;
  max?: string;
  required?: boolean;
  className?: string;
}

export function DatePicker({ className = '', ...props }: DatePickerProps) {
  return (
    <input
      type="date"
      className={`w-full px-3 py-2 border border-[#CCCCCC] rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#0052A5] focus:border-transparent ${className}`}
      {...props}
    />
  );
}