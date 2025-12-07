import { useGetAllQuery } from "@/services/announcements";
import { AnnouncementsList } from "./AnnouncementList";
import { useMemo, useState } from "react";
import { Filters } from "./Filters";
import { AnnouncementFilter } from "@/types/types";
import LoadingCard from "../Cards/LoadingCard";
import ErrorCard from "../Cards/ErrorCard";
import { Button } from "../ui/Button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const emptyFilters: AnnouncementFilter = {
    title: "",
    type: "",
    category: "",
    foundLocation: "",
    foundDate: new Date(),
    documentIdent: "",
    district: ""
};

export default function AdminAnnouncements(){
    const router = useRouter();
    const [filters, setFilters] = useState<AnnouncementFilter>(emptyFilters);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const {data, isLoading, isError} = useGetAllQuery({count: itemsPerPage, currentPage, filters: {...filters, foundDate: filters.foundDate.toISOString()}});
    const announcements = useMemo(()=>{
        if(data?.data)
            return data.data
    }, [data])

    const handleApplyFilters = () => {
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setFilters(emptyFilters);
        setCurrentPage(1);
    };

    return (
        <div className="flex flex-col gap-4 mx-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1>Rzeczy znalezione – ogłoszenia</h1>
                <div className="flex gap-3">
                    <Button onClick={() => router.push('admin/add')}>
                        <Plus className="w-4 h-4 mr-2" />
                        Dodaj ogłoszenie
                    </Button>
                </div>
            </div>

            <Filters
                filters={filters}
                onFilterChange={setFilters}
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
            />

            {isLoading && <LoadingCard/>}
            {isError && <ErrorCard/>}
            {!isLoading && !isError && <AnnouncementsList announcements={announcements}/>}
        </div>
    )
}