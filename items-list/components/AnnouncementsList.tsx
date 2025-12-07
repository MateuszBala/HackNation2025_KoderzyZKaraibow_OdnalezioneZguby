import { useEffect, useState } from "react";
import { Filters } from "./Filters";
import { AnnouncementsTable } from "./AnnouncementsTable";
import { IAnnouncement, IAnnouncementFilters } from "@/types/types";
import { emptyFilters } from "@/utils/helpers";

interface Params {
    distrinct: string;
}

/**
 * Announcements list page
 * @param distrinct startostwo to look for announcements 
 * @returns 
 */
export default function AnnouncementsList({distrinct}: Params) {
    const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);
    const [filters, setFilters] = useState<IAnnouncementFilters>(emptyFilters);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const itemsPerPage = 10;

    useEffect(()=>{
        setCurrentPage(1);
        getData();
    }, [filters])

    const handleClearFilters = () => {
        setFilters(emptyFilters);
        setCurrentPage(1);
    };

    const hangleChangePage = (page: number) => {
        setCurrentPage(page);
        getData(page);
    }

    const getData = async (page?: number) => {
        setLoading(true);
        const params = new URLSearchParams({
            title: filters.title, 
            type: filters.type, 
            category: filters.category, 
            foundLocation: filters.foundLocation, 
            foundDate: filters.foundDate.toString(),
            currentPage: page ? page.toString() : currentPage.toString()
        });
        fetch(`${process.env.NEXT_PUBLIC_API_URL}announcements/${distrinct}/${itemsPerPage}?${params.toString()}`, {
            method: "GET",
        }).then(async (res)=>{
            if(res.ok)
                setAnnouncements(await res.json());
            
        }).catch(()=>{
            setError(true)
        }).finally(() => {setLoading(false)})
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="space-y-6">
                <Filters
                    filters={filters}
                    onFilterChange={setFilters}
                    onClear={handleClearFilters}
                />

                <AnnouncementsTable
                    announcements={announcements}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={announcements.length}
                    onPageChange={hangleChangePage}
                    error={error}
                    loading={loading}
                />
            </div>
        </div>
    );
}