import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { CheckCircle, FileText, Calendar, Shield, User, Mail, Database } from 'lucide-react';

interface Step5Props {
  onPublish: () => void;
  onBack: () => void;
}

export function Step5Summary({ onPublish, onBack }: Step5Props) {
  const metadata = {
    title: 'Rzeczy znalezione w Warszawie - styczeń 2024',
    description: 'Zbiór danych zawierający informacje o rzeczach znalezionych na terenie Warszawy w okresie od 1 do 31 stycznia 2024 roku.',
    keywords: ['rzeczy znalezione', 'warszawa', 'biuro rzeczy znalezionych', 'zgubione przedmioty'],
    organization: 'Urząd m.st. Warszawy',
    updateFrequency: 'Co miesiąc',
    license: 'Creative Commons Uznanie Autorstwa (CC BY)',
    contactName: 'Jan Kowalski',
    contactEmail: 'dane@um.warszawa.pl'
  };
  
  const dataInfo = {
    records: 125,
    columns: 5,
    fileSize: '24.5 KB',
    format: 'CSV',
    fields: [
      'Data znalezienia',
      'Miejsce znalezienia',
      'Opis przedmiotu',
      'Kategoria',
      'Status'
    ]
  };
  
  const sampleRecords = [
    { date: '2024-01-15', place: 'ul. Marszałkowska 1', description: 'Czarny portfel skórzany', category: 'Dokumenty i portfele' },
    { date: '2024-01-16', place: 'Dworzec Centralny', description: 'Telefon komórkowy Samsung', category: 'Elektronika' },
    { date: '2024-01-17', place: 'Park Łazienkowski', description: 'Plecak niebieski z laptopem', category: 'Bagaż' }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-3">Dodaj dane o rzeczach znalezionych</h1>
        <p className="text-[#6c757d]">
          Sprawdź podsumowanie i opublikuj zbiór danych.
        </p>
      </div>
      
      <div>
        <h2 className="mb-4">Krok 5 z 5: Podsumowanie i publikacja</h2>
        
        <div className="bg-[#d4edda] border border-[#c3e6cb] rounded-[2px] p-4 mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle size={20} className="text-[#28a745] flex-shrink-0 mt-0.5" />
            <div>
              <p className="mb-1">Wszystkie dane zostały pomyślnie zweryfikowane</p>
              <p className="text-sm text-[#155724] mb-0">
                Twój zbiór danych jest gotowy do publikacji. Sprawdź poniższe informacje przed opublikowaniem.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Metadata summary */}
          <Card>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#e5e5e5]">
              <div className="w-10 h-10 bg-[#e3f2fd] rounded-[2px] flex items-center justify-center">
                <FileText size={20} className="text-[#0052a5]" />
              </div>
              <h3 className="mb-0">Metadane zbioru</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#6c757d] mb-1">Tytuł</p>
                <p className="mb-0">{metadata.title}</p>
              </div>
              
              <div>
                <p className="text-sm text-[#6c757d] mb-1">Opis</p>
                <p className="text-sm mb-0">{metadata.description}</p>
              </div>
              
              <div>
                <p className="text-sm text-[#6c757d] mb-1">Słowa kluczowe</p>
                <div className="flex flex-wrap gap-2">
                  {metadata.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#e5e5e5] text-[#333333] rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#e5e5e5]">
                <div className="flex items-start gap-2">
                  <Calendar size={16} className="text-[#6c757d] mt-1" />
                  <div>
                    <p className="text-sm text-[#6c757d] mb-0.5">Aktualizacja</p>
                    <p className="text-sm mb-0">{metadata.updateFrequency}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Shield size={16} className="text-[#6c757d] mt-1" />
                  <div>
                    <p className="text-sm text-[#6c757d] mb-0.5">Licencja</p>
                    <p className="text-sm mb-0">CC BY</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-[#e5e5e5]">
                <div className="flex items-start gap-2 mb-2">
                  <User size={16} className="text-[#6c757d] mt-1" />
                  <div>
                    <p className="text-sm text-[#6c757d] mb-0.5">Osoba kontaktowa</p>
                    <p className="text-sm mb-0">{metadata.contactName}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Mail size={16} className="text-[#6c757d] mt-1" />
                  <div>
                    <p className="text-sm text-[#6c757d] mb-0.5">E-mail</p>
                    <p className="text-sm mb-0">{metadata.contactEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Data summary */}
          <Card>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#e5e5e5]">
              <div className="w-10 h-10 bg-[#e3f2fd] rounded-[2px] flex items-center justify-center">
                <Database size={20} className="text-[#0052a5]" />
              </div>
              <h3 className="mb-0">Informacje o danych</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#f2f2f2] rounded-[2px] p-4 text-center">
                <p className="text-2xl mb-1">{dataInfo.records}</p>
                <p className="text-sm text-[#6c757d] mb-0">Rekordów</p>
              </div>
              
              <div className="bg-[#f2f2f2] rounded-[2px] p-4 text-center">
                <p className="text-2xl mb-1">{dataInfo.columns}</p>
                <p className="text-sm text-[#6c757d] mb-0">Kolumn</p>
              </div>
              
              <div className="bg-[#f2f2f2] rounded-[2px] p-4 text-center">
                <p className="text-2xl mb-1">{dataInfo.fileSize}</p>
                <p className="text-sm text-[#6c757d] mb-0">Rozmiar</p>
              </div>
              
              <div className="bg-[#f2f2f2] rounded-[2px] p-4 text-center">
                <p className="text-2xl mb-1">{dataInfo.format}</p>
                <p className="text-sm text-[#6c757d] mb-0">Format</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-[#6c757d] mb-2">Pola w zbiorze danych</p>
              <ul className="space-y-2">
                {dataInfo.fields.map((field, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={16} className="text-[#28a745]" />
                    <span>{field}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <p className="text-sm text-[#6c757d] mb-3">Podgląd przykładowych rekordów</p>
              <div className="bg-[#f2f2f2] rounded-[2px] p-4 space-y-3">
                {sampleRecords.map((record, idx) => (
                  <div key={idx} className="bg-white rounded-[2px] p-3 text-sm">
                    <p className="mb-1">
                      <span className="text-[#6c757d]">Data:</span> {record.date}
                    </p>
                    <p className="mb-1">
                      <span className="text-[#6c757d]">Miejsce:</span> {record.place}
                    </p>
                    <p className="mb-0">
                      <span className="text-[#6c757d]">Opis:</span> {record.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
        
        <Card className="mt-6 bg-[#f8f9fa]">
          <h4 className="mb-4">Przed publikacją upewnij się, że:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <CheckCircle size={18} className="text-[#28a745] flex-shrink-0 mt-0.5" />
              <p className="text-sm mb-0">Dane nie zawierają informacji wrażliwych lub poufnych</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle size={18} className="text-[#28a745] flex-shrink-0 mt-0.5" />
              <p className="text-sm mb-0">Metadane są kompletne i poprawne</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle size={18} className="text-[#28a745] flex-shrink-0 mt-0.5" />
              <p className="text-sm mb-0">Licencja jest zgodna z polityką Twojej instytucji</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle size={18} className="text-[#28a745] flex-shrink-0 mt-0.5" />
              <p className="text-sm mb-0">Dane zostały zwalidowane i są poprawne</p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="flex justify-between items-center pt-6 border-t border-[#e5e5e5]">
        <div className="text-sm text-[#6c757d]">
          Krok 5 z 5
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack}>
            Wróć do edycji
          </Button>
          <Button onClick={onPublish}>
            Opublikuj zbiór danych
          </Button>
        </div>
      </div>
    </div>
  );
}
