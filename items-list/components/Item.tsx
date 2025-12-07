import { FoundAnnouncement } from "@/interfaces/FoundAnnouncement";
import { Badge } from "./ui/Badge";
import { formatDate, getDaysRemaining } from "@/utils/helpers";
import Link from "next/link";

interface Props {
    announcement: FoundAnnouncement
}

export function Item({announcement}: Props){
    const daysRemaining = getDaysRemaining(announcement.returnTermin);
    const itemsCount = announcement.items.length;
    const itemTitles = announcement.items.map(item => item.title).join(', ');
    const hasDestroyedItems = announcement.items.some(item => item.isDestroyed);
            
    return (
        <tr key={announcement.id} className="border-b border-[#E5E5E5] hover:bg-[#F2F2F2]">
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
        <td className="py-3 px-4">{formatDate(announcement.returnTermin)}</td>
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
                <Link
                    href={`${announcement.id}`}
                    className="text-[#0052A5] hover:underline focus:outline-none focus:ring-2 focus:ring-[#0052A5] rounded px-2 py-1"
                >
                    Szczegóły
                </Link>
            </div>
        </td>
        </tr>
    );
}