import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Upload, CheckCircle, AlertCircle, AlertTriangle, FileUp } from 'lucide-react';

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
}

export function Step3DataValidation({ onNext, onBack }: Step3Props) {
  const [fileUploaded, setFileUploaded] = useState(false);
  
  const sampleData = [
    {
      id: 1,
      dataZnalezienia: '2024-01-15',
      miejsce: 'ul. Marszałkowska 1, Warszawa',
      opis: 'Czarny portfel skórzany',
      kategoria: 'Dokumenty i portfele',
      status: 'W magazynie',
      mappingStatus: { dataZnalezienia: 'success', miejsce: 'success', opis: 'success', kategoria: 'warning', status: 'success' }
    },
    {
      id: 2,
      dataZnalezienia: '2024-01-16',
      miejsce: 'Dworzec Centralny, Warszawa',
      opis: 'Telefon komórkowy Samsung',
      kategoria: 'Elektronika',
      status: 'W magazynie',
      mappingStatus: { dataZnalezienia: 'success', miejsce: 'success', opis: 'success', kategoria: 'success', status: 'success' }
    },
    {
      id: 3,
      dataZnalezienia: '2024-01-17',
      miejsce: 'Park Łazienkowski',
      opis: 'Plecak niebieski z laptopem',
      kategoria: 'Bagaż',
      status: 'Odebrane',
      mappingStatus: { dataZnalezienia: 'success', miejsce: 'success', opis: 'success', kategoria: 'success', status: 'success' }
    },
    {
      id: 4,
      dataZnalezienia: '2024-01-18',
      miejsce: 'ul. Nowy Świat 20',
      opis: 'Klucze z brelokiem',
      kategoria: 'Inne',
      status: 'W magazynie',
      mappingStatus: { dataZnalezienia: 'success', miejsce: 'success', opis: 'success', kategoria: 'warning', status: 'success' }
    },
    {
      id: 5,
      dataZnalezienia: '2024-01-19',
      miejsce: 'Metro Centrum',
      opis: 'Okulary przeciwsłoneczne',
      kategoria: 'Akcesoria osobiste',
      status: 'W magazynie',
      mappingStatus: { dataZnalezienia: 'success', miejsce: 'success', opis: 'success', kategoria: 'success', status: 'success' }
    }
  ];
  
  const columns = [
    { key: 'dataZnalezienia', label: 'Data znalezienia', required: true },
    { key: 'miejsce', label: 'Miejsce znalezienia', required: true },
    { key: 'opis', label: 'Opis przedmiotu', required: true },
    { key: 'kategoria', label: 'Kategoria', required: true },
    { key: 'status', label: 'Status', required: true }
  ];
  
  const getCellStyle = (status: string) => {
    if (status === 'success') return 'bg-[#d4edda] border-[#c3e6cb]';
    if (status === 'warning') return 'bg-[#fff3cd] border-[#ffeaa7]';
    if (status === 'error') return 'bg-[#f8d7da] border-[#f5c6cb]';
    return '';
  };
  
  const handleFileUpload = () => {
    setFileUploaded(true);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-3">Dodaj dane o rzeczach znalezionych</h1>
        <p className="text-[#6c757d]">
          Prześlij plik z danymi i sprawdź poprawność mapowania kolumn.
        </p>
      </div>
      
      <div>
        <h2 className="mb-4">Krok 3 z 5: Walidacja i mapowanie danych</h2>
        
        {!fileUploaded ? (
          <Card className="text-center p-12">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-[#e3f2fd] rounded-full flex items-center justify-center">
                <Upload size={40} className="text-[#0052a5]" />
              </div>
            </div>
            <h3 className="mb-3">Prześlij plik z danymi</h3>
            <p className="text-[#6c757d] mb-6 max-w-md mx-auto">
              Przeciągnij i upuść plik CSV lub XLSX lub kliknij poniżej, aby wybrać plik z dysku.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={handleFileUpload}>
                <FileUp size={20} className="mr-2" />
                Wybierz plik
              </Button>
              <Button variant="outline">
                Pobierz przykładowy plik
              </Button>
            </div>
            <p className="text-sm text-[#6c757d] mt-6">
              Obsługiwane formaty: CSV, XLSX (max. 10 MB)
            </p>
          </Card>
        ) : (
          <>
            <Card className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <CheckCircle size={24} className="text-[#28a745]" />
                  <div>
                    <h4 className="mb-1">Plik załadowany pomyślnie</h4>
                    <p className="text-sm text-[#6c757d] mb-0">rzeczy_znalezione_2024.csv • 125 rekordów</p>
                  </div>
                </div>
                <Button variant="outline" size="small" onClick={() => setFileUploaded(false)}>
                  Zmień plik
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-[#e5e5e5]">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-[#28a745]" />
                  <div>
                    <p className="text-sm mb-0">Rozpoznane kolumny</p>
                    <p className="mb-0">115 (92%)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <AlertTriangle size={20} className="text-[#ffc107]" />
                  <div>
                    <p className="text-sm mb-0">Wymaga dopasowania</p>
                    <p className="mb-0">8 (6%)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <AlertCircle size={20} className="text-[#dc3545]" />
                  <div>
                    <p className="text-sm mb-0">Nieprawidłowe</p>
                    <p className="mb-0">2 (2%)</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="mb-0">Podgląd danych (pierwsze 5 wierszy)</h3>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 bg-[#d4edda] border border-[#c3e6cb] rounded-sm"></div>
                    <span className="text-[#6c757d]">Rozpoznane</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 bg-[#fff3cd] border border-[#ffeaa7] rounded-sm"></div>
                    <span className="text-[#6c757d]">Wymaga dopasowania</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 bg-[#f8d7da] border border-[#f5c6cb] rounded-sm"></div>
                    <span className="text-[#6c757d]">Nieprawidłowe</span>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#f2f2f2]">
                      <th className="px-4 py-3 text-left text-sm border border-[#e5e5e5]">#</th>
                      {columns.map((col) => (
                        <th key={col.key} className="px-4 py-3 text-left text-sm border border-[#e5e5e5]">
                          {col.label}
                          {col.required && <span className="text-[#dc3545] ml-1">*</span>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sampleData.map((row) => (
                      <tr key={row.id} className="hover:bg-[#f2f2f2]">
                        <td className="px-4 py-3 text-sm border border-[#e5e5e5]">{row.id}</td>
                        <td className={`px-4 py-3 text-sm border ${getCellStyle(row.mappingStatus.dataZnalezienia)}`}>
                          {row.dataZnalezienia}
                        </td>
                        <td className={`px-4 py-3 text-sm border ${getCellStyle(row.mappingStatus.miejsce)}`}>
                          {row.miejsce}
                        </td>
                        <td className={`px-4 py-3 text-sm border ${getCellStyle(row.mappingStatus.opis)}`}>
                          {row.opis}
                        </td>
                        <td className={`px-4 py-3 text-sm border ${getCellStyle(row.mappingStatus.kategoria)}`}>
                          {row.kategoria}
                        </td>
                        <td className={`px-4 py-3 text-sm border ${getCellStyle(row.mappingStatus.status)}`}>
                          {row.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 pt-6 border-t border-[#e5e5e5]">
                <h4 className="mb-4">Dopasowanie kolumn do schematu</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Kolumna "kategoria" w pliku</label>
                    <select className="w-full px-4 py-2.5 border border-[#cccccc] rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#0052a5]">
                      <option>kategoria → Kategoria przedmiotu</option>
                      <option>typ → Kategoria przedmiotu</option>
                      <option>rodzaj → Kategoria przedmiotu</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Kolumna "status" w pliku</label>
                    <select className="w-full px-4 py-2.5 border border-[#cccccc] rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#0052a5]">
                      <option>status → Status przedmiotu</option>
                      <option>stan → Status przedmiotu</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
      
      <div className="flex justify-between items-center pt-6 border-t border-[#e5e5e5]">
        <div className="text-sm text-[#6c757d]">
          Krok 3 z 5
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack}>
            Wstecz
          </Button>
          <Button onClick={onNext} disabled={!fileUploaded}>
            Dalej
          </Button>
        </div>
      </div>
    </div>
  );
}
