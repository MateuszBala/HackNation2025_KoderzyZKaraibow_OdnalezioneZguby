import { useGenerateXMLMutation, useGetAllQuery } from "@/services/announcements";
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
import Link from "next/link";

/**
 * Admin Announcement Module
 */
export default function AdminAnnouncements(){
    const router = useRouter();
    const [filters, setFilters] = useState<IAnnouncementFilter>(emptyFilters);
    const [xmlReady, setXmlReady] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const {data, isLoading, isError} = useGetAllQuery({count: itemsPerPage, currentPage, filters: {...filters, foundDate: filters.foundDate ? filters.foundDate.toISOString() : ""}});
    const [ generate ] = useGenerateXMLMutation();

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

    /**
     * Tworzenie pliku xml
     */
    const handleXML = () => {
        generate(null).then(()=>setXmlReady(true))
    }

    return (
        <div className="flex flex-col gap-4 mx-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1>Rzeczy znalezione – ogłoszenia</h1>
                <div className="flex flex-row-reverse gap-3 items-center">
                    <Button onClick={() => router.push('admin/add')}>
                        <Plus className="w-4 h-4 mr-2" />
                        Dodaj ogłoszenie
                    </Button>
                    <Button variant="secondary" onClick={handleXML}>
                        Generuj XML
                    </Button>
                    <Link className={!xmlReady ? "pointer-events-none text-gray-500" : ""} href={`${process.env.NEXT_PUBLIC_API_URL}static/${process.env.NEXT_PUBLIC_XML}`} target="_blank">Otwórz XML</Link>
                    {/* <Button terget="_blank" variant="tertiary" disabled={!xmlReady} onClick={()=>router.push()}></Button> */}
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