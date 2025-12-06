import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FileSpreadsheet, Info } from 'lucide-react';

interface Step1Props {
  onNext: () => void;
}

export function Step1ChooseTemplate({ onNext }: Step1Props) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-3">Dodaj dane o rzeczach znalezionych</h1>
        <div className="flex items-start gap-3 bg-[#e3f2fd] border border-[#90caf9] rounded-[2px] p-4">
          <Info size={20} className="text-[#0052a5] flex-shrink-0 mt-0.5" />
          <div>
            <p className="mb-2">
              Kreator publikacji danych pozwala na szybkie dodanie informacji o rzeczach znalezionych do portalu Otwartych Danych.
            </p>
            <p className="mb-0">
              Proces składa się z 5 kroków: wybór szablonu, wybór metody wprowadzenia danych, walidacja i mapowanie, uzupełnienie metadanych oraz publikacja.
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="mb-4">Krok 1 z 5: Wybierz szablon danych</h2>
        <p className="text-[#6c757d] mb-6">
          Wybierz szablon, który najlepiej odpowiada typowi danych, które chcesz opublikować.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card hover onClick={onNext} className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#e3f2fd] rounded-full flex items-center justify-center">
                <FileSpreadsheet size={32} className="text-[#0052a5]" />
              </div>
            </div>
            <h3 className="mb-2">Rzeczy znalezione – szablon</h3>
            <p className="text-[#6c757d] mb-4">
              Standardowy szablon dla danych o rzeczach znalezionych zawierający pola: data znalezienia, miejsce, opis, kategoria, status.
            </p>
            <div className="text-sm text-[#0052a5]">
              Wybierz szablon →
            </div>
          </Card>
          
          <Card className="p-8 text-center opacity-50 cursor-not-allowed">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#f2f2f2] rounded-full flex items-center justify-center">
                <FileSpreadsheet size={32} className="text-[#6c757d]" />
              </div>
            </div>
            <h3 className="mb-2">Inne szablony</h3>
            <p className="text-[#6c757d] mb-0">
              Dodatkowe szablony będą dostępne wkrótce.
            </p>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-6 border-t border-[#e5e5e5]">
        <div className="text-sm text-[#6c757d]">
          Krok 1 z 5
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => window.history.back()}>
            Anuluj
          </Button>
          <Button onClick={onNext}>
            Dalej
          </Button>
        </div>
      </div>
    </div>
  );
}
