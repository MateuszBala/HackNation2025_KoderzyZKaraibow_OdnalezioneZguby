import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Upload, FileText, Edit3 } from 'lucide-react';

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

export function Step2ChooseMethod({ onNext, onBack }: Step2Props) {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  
  const methods = [
    {
      id: 'csv',
      icon: Upload,
      title: 'Wgraj plik CSV/XLSX',
      description: 'Importuj dane z pliku CSV lub Excel. Plik powinien zawierać nagłówki kolumn zgodne z szablonem.',
      features: ['Obsługa CSV i XLSX', 'Automatyczne mapowanie kolumn', 'Import wielu rekordów']
    },
    {
      id: 'xml',
      icon: FileText,
      title: 'Wgraj plik XML (zgodny ze schematem XSD)',
      description: 'Importuj dane z pliku XML zgodnego ze schematem XSD dla rzeczy znalezionych.',
      features: ['Walidacja względem schematu', 'Obsługa strukturalnych danych', 'Import metadanych']
    },
    {
      id: 'manual',
      icon: Edit3,
      title: 'Wprowadź dane ręcznie',
      description: 'Uzupełnij formularz i wprowadź dane o rzeczach znalezionych ręcznie przez interfejs.',
      features: ['Intuicyjny formularz', 'Walidacja na bieżąco', 'Dodawanie pojedynczych rekordów']
    }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-3">Dodaj dane o rzeczach znalezionych</h1>
        <p className="text-[#6c757d]">
          Wybierz metodę wprowadzenia danych do systemu.
        </p>
      </div>
      
      <div>
        <h2 className="mb-4">Krok 2 z 5: Wybierz metodę wprowadzenia danych</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {methods.map((method) => {
            const Icon = method.icon;
            return (
              <Card
                key={method.id}
                hover
                selected={selectedMethod === method.id}
                onClick={() => setSelectedMethod(method.id)}
                className="relative"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-[2px] flex items-center justify-center flex-shrink-0 ${
                      selectedMethod === method.id ? 'bg-[#0052a5]' : 'bg-[#e3f2fd]'
                    }`}>
                      <Icon size={24} className={selectedMethod === method.id ? 'text-white' : 'text-[#0052a5]'} />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2">{method.title}</h3>
                      <p className="text-[#6c757d] text-sm mb-0">{method.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-[#e5e5e5]">
                    <ul className="space-y-2">
                      {method.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[#333333]">
                          <span className="text-[#28a745] mt-0.5">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        
        {selectedMethod && (
          <div className="mt-6 bg-[#f2f2f2] border border-[#e5e5e5] rounded-[2px] p-4">
            <h4 className="mb-2">Wybrano: {methods.find(m => m.id === selectedMethod)?.title}</h4>
            <p className="text-sm text-[#6c757d] mb-0">
              W kolejnym kroku będziesz mógł przesłać plik lub wypełnić formularz.
            </p>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center pt-6 border-t border-[#e5e5e5]">
        <div className="text-sm text-[#6c757d]">
          Krok 2 z 5
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack}>
            Wstecz
          </Button>
          <Button onClick={onNext} disabled={!selectedMethod}>
            Dalej
          </Button>
        </div>
      </div>
    </div>
  );
}
