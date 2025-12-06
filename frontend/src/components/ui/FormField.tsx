import React from 'react';

interface FormFieldProps {
  label: string;
  id: string;
  type?: 'text' | 'email' | 'textarea' | 'select' | 'number';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  options?: { value: string; label: string }[];
  rows?: number;
}

export function FormField({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  helperText,
  errorText,
  options = [],
  rows = 4
}: FormFieldProps) {
  const inputBaseStyles = 'w-full px-4 py-2.5 border border-[#cccccc] rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#0052a5] focus:border-transparent transition-colors';
  const errorStyles = errorText ? 'border-[#dc3545] focus:ring-[#dc3545]' : '';
  
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block mb-2 text-[#333333]">
        {label}
        {required && <span className="text-[#dc3545] ml-1">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`${inputBaseStyles} ${errorStyles}`}
        />
      ) : type === 'select' ? (
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`${inputBaseStyles} ${errorStyles}`}
        >
          <option value="">Wybierz opcję</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={`${inputBaseStyles} ${errorStyles}`}
        />
      )}
      
      {helperText && !errorText && (
        <p className="helper-text mt-1.5 text-[#6c757d]">{helperText}</p>
      )}
      
      {errorText && (
        <p className="error-text mt-1.5 text-[#dc3545]">{errorText}</p>
      )}
    </div>
  );
}
