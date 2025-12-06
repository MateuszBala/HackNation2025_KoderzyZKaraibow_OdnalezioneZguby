import React from 'react';
import { CheckCircle } from 'lucide-react';

interface WizardProgressProps {
  currentStep: number;
}

export function WizardProgress({ currentStep }: WizardProgressProps) {
  const steps = [
    { number: 1, title: 'Szablon' },
    { number: 2, title: 'Metoda' },
    { number: 3, title: 'Walidacja' },
    { number: 4, title: 'Metadane' },
    { number: 5, title: 'Podsumowanie' }
  ];
  
  return (
    <div className="mb-8">
      <div className="hidden md:flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors mb-2 ${
                  step.number < currentStep
                    ? 'bg-[#28a745] text-white'
                    : step.number === currentStep
                    ? 'bg-[#0052a5] text-white'
                    : 'bg-[#e5e5e5] text-[#6c757d]'
                }`}
              >
                {step.number < currentStep ? (
                  <CheckCircle size={24} />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              <p
                className={`text-sm text-center ${
                  step.number === currentStep ? 'text-[#0052a5]' : 'text-[#6c757d]'
                }`}
              >
                {step.title}
              </p>
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4 mb-8">
                <div
                  className={`h-full transition-colors ${
                    step.number < currentStep ? 'bg-[#28a745]' : 'bg-[#e5e5e5]'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Mobile progress */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">Krok {currentStep} z 5</span>
          <span className="text-sm text-[#6c757d]">{steps[currentStep - 1].title}</span>
        </div>
        <div className="w-full h-2 bg-[#e5e5e5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0052a5] transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
