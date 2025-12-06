import { FoundItem } from '../types';
import { Badge } from './Badge';
import { Button } from './Button';
import { Card } from './Card';
import { formatDate, getTypeLabel, getDaysRemaining } from '../utils/helpers';
import { ChevronLeft, ChevronRight, Package } from 'lucide-react';

interface ItemsTableProps {
  items: FoundItem[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onEdit: (item: FoundItem) => void;
  onViewDetails: (item: FoundItem) => void;
}

export function ItemsTable({
  items,
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  onEdit,
  onViewDetails,
}: ItemsTableProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  if (items.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-[#CCCCCC] mx-auto mb-4" />
          <p className="text-[#666] mb-2">
            Nie dodano jeszcze żadnych przedmiotów.
          </p>
          <p className="text-[#666]">
            Użyj przycisku „Dodaj przedmiot", aby dodać pierwszy wpis.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-[#E5E5E5]">
              <th className="text-left py-3 px-4">Nazwa przedmiotu</th>
              <th className="text-left py-3 px-4">Typ</th>
              <th className="text-left py-3 px-4">Lokalizacja</th>
              <th className="text-left py-3 px-4">Data dodania</th>
              <th className="text-left py-3 px-4">Pozostały czas</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const daysRemaining = getDaysRemaining(item.createdAt);
              
              return (
                <tr key={item.id} className="border-b border-[#E5E5E5] hover:bg-[#F2F2F2]">
                  <td className="py-3 px-4">{item.title}</td>
                  <td className="py-3 px-4">
                    <Badge variant="neutral">{getTypeLabel(item.type)}</Badge>
                  </td>
                  <td className="py-3 px-4">{item.location}</td>
                  <td className="py-3 px-4">{formatDate(item.createdAt)}</td>
                  <td className="py-3 px-4">
                    {item.isDestroyed ? (
                      <span className="text-[#999]">—</span>
                    ) : (
                      <span className={daysRemaining < 10 ? 'text-[#dc3545]' : 'text-[#666]'}>
                        {daysRemaining} {daysRemaining === 1 ? 'dzień' : 'dni'}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {item.isDestroyed ? (
                      <Badge variant="neutral">Zniszczony</Badge>
                    ) : item.returned ? (
                      <Badge variant="success">Odebrany</Badge>
                    ) : (
                      <Badge variant="warning">Czeka na odbiór</Badge>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="text-[#0052A5] hover:underline focus:outline-none focus:ring-2 focus:ring-[#0052A5] rounded px-2 py-1"
                      >
                        Edytuj
                      </button>
                      <button
                        onClick={() => onViewDetails(item)}
                        className="text-[#0052A5] hover:underline focus:outline-none focus:ring-2 focus:ring-[#0052A5] rounded px-2 py-1"
                      >
                        Szczegóły
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-[#666]">
            Wyświetlanie {startIndex}-{endIndex} z {totalItems} wyników
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="!px-3 !py-2"
              aria-label="Poprzednia strona"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-4 py-2 rounded-[2px] ${
                    page === currentPage
                      ? 'bg-[#0052A5] text-white'
                      : 'bg-white text-[#666] hover:bg-[#F2F2F2] border border-[#E5E5E5]'
                  } focus:outline-none focus:ring-2 focus:ring-[#0052A5]`}
                  aria-label={`Strona ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
            </div>

            <Button
              variant="secondary"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="!px-3 !py-2"
              aria-label="Następna strona"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}