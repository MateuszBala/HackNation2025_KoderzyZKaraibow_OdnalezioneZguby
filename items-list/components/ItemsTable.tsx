import { AlertCircle, ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { Card } from './ui/Card';
import { FoundAnnouncement } from '@/interfaces/FoundAnnouncement';
import { Item } from './Item';
import { Button } from './ui/Button';
import LoadingCard from './LoadingCard';
import ErrorCard from './ErrorCard';

interface ItemsTableProps {
  announcements: FoundAnnouncement[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  loading: boolean;
  error: boolean;
}

export function ItemsTable({
  announcements,
  currentPage,
  itemsPerPage,
  totalItems,
  loading,
  error,
  onPageChange,
}: ItemsTableProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  if (error)
    return <ErrorCard/>

  if (loading)
    return <LoadingCard/>

  if (announcements.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-[#CCCCCC] mx-auto mb-4" />
          <p className="text-[#666] mb-2">
            Nie dodano jeszcze żadnych przedmiotów.
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
            <tr className="border-b border-[#E5E5E5]">
              <th className="py-3 px-4 text-left">Przedmioty</th>
              <th className="py-3 px-4 text-left">Powiat</th>
              <th className="py-3 px-4 text-left">Miejsce znalezienia</th>
              <th className="py-3 px-4 text-left">Data znalezienia</th>
              <th className="py-3 px-4 text-left">Termin odbioru</th>
              <th className="py-3 px-4 text-left">Pozostało dni</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <Item announcement={announcement}/>
            ))}
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
              className="px-3! py-2!"
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
              className="px-3! py-2!"
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