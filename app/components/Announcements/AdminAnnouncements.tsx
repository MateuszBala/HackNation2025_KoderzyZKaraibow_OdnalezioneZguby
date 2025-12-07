import { useGetAllQuery, useGetXMLQuery } from "@/services/announcements";
import { AnnouncementsList } from "./AnnouncementList";
import { useMemo, useState } from "react";
import { Filters } from "./Filters";
import LoadingCard from "../Cards/LoadingCard";
import ErrorCard from "../Cards/ErrorCard";
import { Button } from "../ui/Button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { IAnnouncement, IAnnouncementFilter } from "@/types/types";
import { emptyFilters } from "@/utils/helpers";

/**
 * Admin Announcement Module
 */
export default function AdminAnnouncements(){
    const router = useRouter();
    const [filters, setFilters] = useState<IAnnouncementFilter>(emptyFilters);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const {data, isLoading, isError} = useGetAllQuery({count: itemsPerPage, currentPage, filters: {...filters, foundDate: filters.foundDate ? filters.foundDate.toISOString() : ""}});
    const {data: xml} = useGetXMLQuery({});

    const announcements = useMemo<IAnnouncement[]>(()=>{
        if(data)
            return data.map((announcement: IAnnouncement) => ({...announcement, createdAt: new Date(announcement.createdAt), returnDate: new Date(announcement.returnDate), foundDate: new Date(announcement.foundDate)}))
    }, [data])

    /**
     * Handling clearing filters
     */
    const handleClearFilters = () => {
        setFilters(emptyFilters);
        setCurrentPage(1);
    };

    return (
        <div className="flex flex-col gap-4 mx-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1>Rzeczy znalezione – ogłoszenia</h1>
                <div className="flex flex-row-reverse gap-3">
                    <Button onClick={() => router.push('admin/add')}>
                        <Plus className="w-4 h-4 mr-2" />
                        Dodaj ogłoszenie
                    </Button>
                    <Button disabled={!xml} variant="secondary" onClick={() => router.push(xml)}>
                        Otwórz XML
                    </Button>
                </div>
            </div>

            <Filters
                filters={filters}
                onFilterChange={setFilters}
                onClear={handleClearFilters}
            />

            {isLoading && <LoadingCard/>}
            {isError && <ErrorCard/>}
            {!isLoading && !isError && <AnnouncementsList announcements={announcements}/>}
        </div>
    )
}