import { FoundItem } from '../types';
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';
import { formatDate, getTypeLabel, getDaysRemaining } from '../utils/helpers';
import { Calendar, MapPin, Package, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';

interface ItemDetailProps {
  item: FoundItem;
  onEdit: () => void;
  onBack: () => void;
  onMarkAsReturned: (id: number) => void;
  onMarkAsDestroyed: (id: number) => void;
}

export function ItemDetail({ item, onEdit, onBack, onMarkAsReturned, onMarkAsDestroyed }: ItemDetailProps) {
  const daysRemaining = getDaysRemaining(item.createdAt);

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="mb-2">{item.title}</h1>
            <div className="flex items-center gap-2">
              {item.isDestroyed ? (
                <Badge variant="neutral">Zniszczony</Badge>
              ) : item.returned ? (
                <Badge variant="success">Odebrany</Badge>
              ) : (
                <Badge variant="warning">Czeka na odbiór</Badge>
              )}
              <Badge variant="neutral">{getTypeLabel(item.type)}</Badge>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={onEdit}>Edytuj</Button>
            <Button variant="secondary" onClick={onBack}>
              Wróć do listy
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {!item.isDestroyed && !item.returned && (
            <div className="bg-[#F2F2F2] p-4 rounded-[2px] border border-[#E5E5E5] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-[#0052A5]" />
                  <h3>Pozostały czas na odbiór</h3>
                </div>
                <p className={`ml-7 ${daysRemaining < 10 ? 'text-[#dc3545]' : 'text-[#666]'}`}>
                  {daysRemaining} {daysRemaining === 1 ? 'dzień' : 'dni'}
                  {daysRemaining < 10 && ' (termin zbliża się do końca)'}
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => onMarkAsReturned(item.id)}>
                  Oznacz jako odebrany
                </Button>
                <Button variant="secondary" onClick={() => onMarkAsDestroyed(item.id)}>
                  Oznacz jako zniszczony
                </Button>
              </div>
            </div>
          )}

          {item.returned && (
            <div className="bg-[#d4edda] p-4 rounded-[2px] border border-[#c3e6cb]">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-[#155724]" />
                <h3>Przedmiot odebrany</h3>
              </div>
              <p className="ml-7 text-[#155724]">
                Przedmiot został odebrany przez właściciela.
              </p>
            </div>
          )}

          {item.isDestroyed && (
            <div className="bg-[#e2e3e5] p-4 rounded-[2px] border border-[#d6d8db]">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-[#383d41]" />
                <h3>Przedmiot zniszczony</h3>
              </div>
              <p className="ml-7 text-[#383d41]">
                Przedmiot został zniszczony po upływie terminu odbioru (90 dni).
              </p>
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-[#0052A5]" />
              <h3>Opis</h3>
            </div>
            <p className="ml-7 text-[#666]">{item.desc || 'Brak opisu'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-5 h-5 text-[#0052A5]" />
                <h4>Typ przedmiotu</h4>
              </div>
              <p className="ml-7 text-[#666]">{getTypeLabel(item.type)}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-[#0052A5]" />
                <h4>Lokalizacja</h4>
              </div>
              <p className="ml-7 text-[#666]">{item.location}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-[#0052A5]" />
                <h4>Data dodania / znalezienia</h4>
              </div>
              <p className="ml-7 text-[#666]">{formatDate(item.createdAt)}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-[#0052A5]" />
                <h4>Status</h4>
              </div>
              <p className="ml-7 text-[#666]">
                {item.isDestroyed ? 'Przedmiot zniszczony' : item.returned ? 'Przedmiot odebrany' : 'Czeka na odbiór'}
              </p>
            </div>
          </div>

          <div className="text-[#999] border-t border-[#E5E5E5] pt-4">
            <p>ID przedmiotu: #{item.id}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}