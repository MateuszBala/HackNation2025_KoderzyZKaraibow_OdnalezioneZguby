import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FormField } from '../ui/FormField';
import { Info } from 'lucide-react';

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
}

export function Step4Metadata({ onNext, onBack }: Step4Props) {
  const [formData, setFormData] = useState({
    title: 'Rzeczy znalezione w Warszawie - styczeń 2024',
    description: 'Zbiór danych zawierający informacje o rzeczach znalezionych na terenie Warszawy w okresie od 1 do 31 stycznia 2024 roku. Dane obejmują przedmioty zgłoszone do biura rzeczy znalezionych.',
    keywords: 'rzeczy znalezione, warszawa, biuro rzeczy znalezionych, zgubione przedmioty',
    organization: 'Urząd m.st. Warszawy',
    updateFrequency: 'monthly',
    license: 'cc-by',
    contactEmail: 'dane@um.warszawa.pl',
    contactName: 'Jan Kowalski'
  });
  
  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-3">Dodaj dane o rzeczach znalezionych</h1>
        <p className="text-[#6c757d]">
          Uzupełnij metadane opisujące zbiór danych.
        </p>
      </div>
      
      <div>
        <h2 className="mb-4">Krok 4 z 5: Metadane zbioru danych</h2>
        
        <div className="bg-[#e3f2fd] border border-[#90caf9] rounded-[2px] p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-[#0052a5] flex-shrink-0 mt-0.5" />
            <p className="text-sm mb-0">
              Metadane pomagają użytkownikom portalu lepiej zrozumieć i odnaleźć Twój zbiór danych. Wypełnij wszystkie wymagane pola.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <h3 className="mb-6 pb-4 border-b border-[#e5e5e5]">Podstawowe informacje</h3>
              
              <FormField
                label="Tytuł zbioru danych"
                id="title"
                value={formData.title}
                onChange={(value) => updateField('title', value)}
                required
                helperText="Krótki i opisowy tytuł dla zbioru danych (max. 100 znaków)"
              />
              
              <FormField
                label="Opis zbioru danych"
                id="description"
                type="textarea"
                value={formData.description}
                onChange={(value) => updateField('description', value)}
                required
                rows={6}
                helperText="Szczegółowy opis zawartości, źródła i przeznaczenia danych"
              />
              
              <FormField
                label="Słowa kluczowe"
                id="keywords"
                value={formData.keywords}
                onChange={(value) => updateField('keywords', value)}
                required
                helperText="Oddzielone przecinkami słowa kluczowe ułatwiające wyszukiwanie"
              />
              
              <FormField
                label="Organizacja publikująca"
                id="organization"
                value={formData.organization}
                onChange={(value) => updateField('organization', value)}
                required
                helperText="Nazwa instytucji odpowiedzialnej za publikację danych"
              />
            </Card>
            
            <Card className="mt-6">
              <h3 className="mb-6 pb-4 border-b border-[#e5e5e5]">Aktualizacja i licencja</h3>
              
              <FormField
                label="Częstotliwość aktualizacji"
                id="updateFrequency"
                type="select"
                value={formData.updateFrequency}
                onChange={(value) => updateField('updateFrequency', value)}
                required
                options={[
                  { value: 'daily', label: 'Codziennie' },
                  { value: 'weekly', label: 'Co tydzień' },
                  { value: 'monthly', label: 'Co miesiąc' },
                  { value: 'quarterly', label: 'Co kwartał' },
                  { value: 'yearly', label: 'Co rok' },
                  { value: 'irregular', label: 'Nieregularnie' }
                ]}
                helperText="Jak często dane będą aktualizowane"
              />
              
              <FormField
                label="Licencja"
                id="license"
                type="select"
                value={formData.license}
                onChange={(value) => updateField('license', value)}
                required
                options={[
                  { value: 'cc-by', label: 'Creative Commons Uznanie Autorstwa (CC BY)' },
                  { value: 'cc-by-sa', label: 'Creative Commons Uznanie Autorstwa-Na tych samych warunkach (CC BY-SA)' },
                  { value: 'cc0', label: 'Creative Commons Zero (CC0) - Domena publiczna' },
                  { value: 'odc-odbl', label: 'Open Data Commons Open Database License (ODbL)' }
                ]}
                helperText="Wybierz licencję określającą sposób wykorzystania danych"
              />
            </Card>
            
            <Card className="mt-6">
              <h3 className="mb-6 pb-4 border-b border-[#e5e5e5]">Osoba kontaktowa</h3>
              
              <FormField
                label="Imię i nazwisko"
                id="contactName"
                value={formData.contactName}
                onChange={(value) => updateField('contactName', value)}
                required
                helperText="Osoba odpowiedzialna za zbiór danych"
              />
              
              <FormField
                label="Adres e-mail"
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(value) => updateField('contactEmail', value)}
                required
                helperText="Adres e-mail do kontaktu w sprawie danych"
              />
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <h4 className="mb-4">Wskazówki</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="mb-1">📝 Tytuł</p>
                  <p className="text-[#6c757d] mb-0">
                    Używaj jasnego i zwięzłego języka. Unikaj skrótów i akronimów.
                  </p>
                </div>
                <div>
                  <p className="mb-1">📄 Opis</p>
                  <p className="text-[#6c757d] mb-0">
                    Opisz zawartość, zakres czasowy, obszar geograficzny i metodologię zbierania danych.
                  </p>
                </div>
                <div>
                  <p className="mb-1">🏷️ Słowa kluczowe</p>
                  <p className="text-[#6c757d] mb-0">
                    Dodaj 3-10 słów kluczowych, które pomogą użytkownikom znaleźć Twoje dane.
                  </p>
                </div>
                <div>
                  <p className="mb-1">⚖️ Licencja</p>
                  <p className="text-[#6c757d] mb-0">
                    Wybierz licencję zgodną z polityką otwartych danych Twojej instytucji.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-[#e5e5e5]">
                <p className="text-sm mb-2">Potrzebujesz pomocy?</p>
                <a href="#" className="text-sm text-[#0052a5] hover:underline">
                  Przewodnik po metadanych →
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-6 border-t border-[#e5e5e5]">
        <div className="text-sm text-[#6c757d]">
          Krok 4 z 5
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack}>
            Wstecz
          </Button>
          <Button onClick={onNext}>
            Dalej
          </Button>
        </div>
      </div>
    </div>
  );
}
