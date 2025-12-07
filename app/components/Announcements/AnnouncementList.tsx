import { IAnnouncement } from "@/types/types";
import { Badge } from "../ui/Badge";
import { formatDate, getDaysRemaining } from "@/utils/helpers";

interface Props {
  announcements: IAnnouncement[];
}

export function AnnouncementsList({ announcements }: Props) {

    if (!announcements || announcements.length === 0) {
        return (
            <div className="text-center py-12 text-[#666]">
                <p>Brak ogłoszeń do wyświetlenia</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full bg-white border border-[#E5E5E5]">
                <thead className="bg-[#F9F9F9]">
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
                {announcements.map((announcement) => {
                    const daysRemaining = getDaysRemaining(announcement.returnDate);
                    const itemsCount = announcement.items.length;
                    const itemTitles = announcement.items.map(item => item.title).join(', ');
                    const hasDestroyedItems = announcement.items.some(item => item.isDestroyed);
                    
                    return (
                    <tr key={announcement.announcementId} className="border-b border-[#E5E5E5] hover:bg-[#F2F2F2]">
                        <td className="py-3 px-4">
                        <div>
                            <div className="mb-1">
                            {itemTitles.length > 60 ? `${itemTitles.substring(0, 60)}...` : itemTitles}
                            </div>
                            <Badge variant="neutral">{itemsCount} {itemsCount === 1 ? 'przedmiot' : itemsCount < 5 ? 'przedmioty' : 'przedmiotów'}</Badge>
                        </div>
                        </td>
                        <td className="py-3 px-4">{announcement.district}</td>
                        <td className="py-3 px-4">{announcement.foundLocation}</td>
                        <td className="py-3 px-4">{formatDate(announcement.foundDate)}</td>
                        <td className="py-3 px-4">{formatDate(announcement.returnDate)}</td>
                        <td className="py-3 px-4">
                        {hasDestroyedItems || announcement.returned ? (
                            <span className="text-[#999]">—</span>
                        ) : (
                            <span className={daysRemaining < 10 ? 'text-[#dc3545]' : 'text-[#666]'}>
                            {daysRemaining} {daysRemaining === 1 ? 'dzień' : 'dni'}
                            </span>
                        )}
                        </td>
                        <td className="py-3 px-4">
                        {hasDestroyedItems ? (
                            <Badge variant="neutral">Zniszczony</Badge>
                        ) : announcement.returned ? (
                            <Badge variant="success">Odebrany</Badge>
                        ) : (
                            <Badge variant="warning">Czeka na odbiór</Badge>
                        )}
                        </td>
                        <td className="py-3 px-4">
                        <div className="flex gap-2">
                            <button
                            onClick={() => {}}
                            className="text-[#0052A5] hover:underline focus:outline-none focus:ring-2 focus:ring-[#0052A5] rounded px-2 py-1"
                            >
                            Edytuj
                            </button>
                            <button
                            onClick={() => {}}
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
    );
}
