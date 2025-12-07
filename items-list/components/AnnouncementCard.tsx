import { IAnnouncement } from "@/types/types";
import { formatDate } from "@/utils/helpers";
import Link from "next/link";
import { Card } from "./ui/Card";

interface Props {
    announcement: IAnnouncement
}

/**
 * Single announcement card
 * @param {IAnnouncement} announcement announcement data
 */
export function AnnouncementCard({announcement}: Props){
    /**
     * Merged items titles
     */
    const itemTitles = announcement.items.map(item => item.title).join(', ');
            
    return (
        <Card key={announcement.id} title={itemTitles.length > 60 ? `${itemTitles.substring(0, 60)}...` : itemTitles} className="rounded-md bg-background border-b border-[#E5E5E5] hover:bg-[#F2F2F2]">
            <div className="flex flex-col gap-3">
                <span>Miejsce znalezienia: {announcement.foundLocation}</span>
                <span>Data znalezienia: {formatDate(announcement.foundDate)}</span>
                <span>Termin odbioru: {formatDate(announcement.returnTermin)}</span>
                <div className="w-full justify-end">
                    <Link
                        href={`${announcement.id}`}
                        className="text-[#0052A5] hover:underline focus:outline-none focus:ring-2 focus:ring-[#0052A5] rounded px-2 py-1"
                    >
                        Szczegóły
                    </Link>
                </div>
            </div>
        </Card>
    );
}