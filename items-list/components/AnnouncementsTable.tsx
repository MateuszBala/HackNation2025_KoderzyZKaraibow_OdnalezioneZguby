import { ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { IAnnouncement } from '@/types/types';
import { AnnouncementItem } from './AnnouncementItem';
import { EmptyCard, ErrorCard, LoadingCard } from './cards';

interface Props {
  announcements: IAnnouncement[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  loading: boolean;
  error: boolean;
}

export function AnnouncementsTable({
  announcements,
  currentPage,
  itemsPerPage,
  totalItems,
  loading,
  error,
  onPageChange,
}: Props) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  if (error)
    return <ErrorCard/>

  if (loading)
    return <LoadingCard/>

  if (announcements.length === 0)
    return <EmptyCard/>

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E5E5]">
              <th className="py-3 px-4 text-left">Przedmioty</th>
              <th className="py-3 px-4 text-left">Miejsce znalezienia</th>
              <th className="py-3 px-4 text-left">Data znalezienia</th>
              <th className="py-3 px-4 text-left">Termin odbioru</th>
              <th className="py-3 px-4 text-left">Pozostało dni</th>
              <th className="py-3 px-4 text-left">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <AnnouncementItem announcement={announcement}/>
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