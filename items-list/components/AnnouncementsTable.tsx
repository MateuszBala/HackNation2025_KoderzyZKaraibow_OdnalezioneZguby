import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/Button';
import { IAnnouncement } from '@/types/types';
import { AnnouncementCard } from './AnnouncementCard';
import { EmptyCard, ErrorCard, LoadingCard } from './cards';

interface Props {
  announcements: IAnnouncement[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  loading: boolean;
  error: boolean;
  onPageChange: (page: number) => void;
}

/**
 * Table of announcements
 * @param {IAnnouncement[]} announcements table of announcements
 * @param {number} currentPage current page
 * @param {number} itemsPerPage number of max shown announcements at one
 * @param {number} totalItems total announcements number
 * @param {boolean} loading is loading
 * @param {boolean} error is error
 * @param {(page: number) => void} onPageChange page change handler
 */
export function AnnouncementsTable({
  announcements,
  currentPage,
  itemsPerPage,
  totalItems,
  loading,
  error,
  onPageChange,
}: Props) {
  /**
   * number of pages
   */
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  /**
   * prevous index
   */
  const startIndex = (currentPage - 1) * itemsPerPage + 1;

  /**
   * next index
   */
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  if (error)
    return <ErrorCard/>

  if (loading)
    return <LoadingCard/>

  if (announcements.length === 0)
    return <EmptyCard/>

  return (
    <div>
      <div className="overflow-x-auto">
        {announcements.map((announcement) => (
          <AnnouncementCard announcement={announcement}/>
        ))}
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
    </div>
  );
}