import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { CheckCircle, ExternalLink, Eye, Download, Share2 } from 'lucide-react';

export function SuccessScreen() {
  const datasetUrl = 'https://dane.gov.pl/pl/dataset/1234/rzeczy-znalezione-warszawa-styczen-2024';
  
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-[#d4edda] rounded-full flex items-center justify-center">
            <CheckCircle size={56} className="text-[#28a745]" />
          </div>
        </div>
        
        <h1 className="mb-4">Dane zostały opublikowane!</h1>
        <p className="text-lg text-[#6c757d] max-w-2xl mx-auto">
          Twój zbiór danych "Rzeczy znalezione w Warszawie - styczeń 2024" został pomyślnie opublikowany na portalu dane.gov.pl i jest dostępny dla użytkowników.
        </p>
      </div>
      
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6 border-b border-[#e5e5e5]">
          <div className="text-center">
            <p className="text-3xl mb-2">125</p>
            <p className="text-sm text-[#6c757d] mb-0">Opublikowanych rekordów</p>
          </div>
          
          <div className="text-center">
            <p className="text-3xl mb-2">5</p>
            <p className="text-sm text-[#6c757d] mb-0">Pól danych</p>
          </div>
          
          <div className="text-center">
            <p className="text-3xl mb-2">CSV</p>
            <p className="text-sm text-[#6c757d] mb-0">Format danych</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-[#6c757d] mb-2">Adres URL zbioru danych:</p>
          <div className="flex items-center gap-2 bg-[#f2f2f2] rounded-[2px] p-3">
            <code className="flex-1 text-sm break-all">{datasetUrl}</code>
            <button
              onClick={() => navigator.clipboard.writeText(datasetUrl)}
              className="flex-shrink-0 px-3 py-1.5 bg-white border border-[#e5e5e5] rounded-[2px] text-sm hover:bg-[#f8f9fa]"
            >
              Kopiuj
            </button>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Button onClick={() => window.open(datasetUrl, '_blank')} variant="primary" size="large" fullWidth>
          <Eye size={20} className="mr-2" />
          Zobacz opublikowany zbiór
          <ExternalLink size={16} className="ml-2" />
        </Button>
        
        <Button variant="outline" size="large" fullWidth>
          <Download size={20} className="mr-2" />
          Pobierz dane
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card hover padding={false} className="p-5 text-center cursor-pointer">
          <Share2 size={24} className="mx-auto mb-3 text-[#0052a5]" />
          <h4 className="mb-2 text-sm">Udostępnij</h4>
          <p className="text-sm text-[#6c757d] mb-0">
            Podziel się linkiem do zbioru danych
          </p>
        </Card>
        
        <Card hover padding={false} className="p-5 text-center cursor-pointer">
          <Eye size={24} className="mx-auto mb-3 text-[#0052a5]" />
          <h4 className="mb-2 text-sm">Podgląd</h4>
          <p className="text-sm text-[#6c757d] mb-0">
            Zobacz jak użytkownicy widzą Twoje dane
          </p>
        </Card>
        
        <Card hover padding={false} className="p-5 text-center cursor-pointer">
          <Download size={24} className="mx-auto mb-3 text-[#0052a5]" />
          <h4 className="mb-2 text-sm">Eksport API</h4>
          <p className="text-sm text-[#6c757d] mb-0">
            Dokumentacja dostępu przez API
          </p>
        </Card>
      </div>
      
      <div className="mt-8 pt-8 border-t border-[#e5e5e5] text-center">
        <h3 className="mb-4">Co dalej?</h3>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Powrót do pulpitu
          </Button>
          <Button onClick={() => window.location.reload()}>
            Dodaj kolejny zbiór danych
          </Button>
        </div>
      </div>
      
      <div className="mt-8 bg-[#e3f2fd] border border-[#90caf9] rounded-[2px] p-4">
        <h4 className="mb-3">💡 Wskazówka</h4>
        <p className="text-sm mb-2">
          Możesz zaktualizować swój zbiór danych w dowolnym momencie poprzez:
        </p>
        <ul className="text-sm space-y-1 ml-5">
          <li>Przejście do sekcji "Moje zbiory danych"</li>
          <li>Wybranie opublikowanego zbioru</li>
          <li>Kliknięcie przycisku "Aktualizuj dane"</li>
        </ul>
      </div>
    </div>
  );
}
