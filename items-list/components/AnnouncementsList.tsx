import { useEffect, useState } from "react";
import { Filters } from "./Filters";
import { AnnouncementsTable } from "./AnnouncementsTable";
import { IAnnouncement, IAnnouncementFilters } from "@/types/types";

const emptyFilters: IAnnouncementFilters = {
  title: "",
  type: "",
  category: "", 
  foundLocation: "", 
  foundDate: new Date()
};

interface Params {
    office: string;
}

export default function ItemsList({office}: Params) {
    const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);
    const [filters, setFilters] = useState<IAnnouncementFilters>(emptyFilters);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const itemsPerPage = 10;

    useEffect(()=>{
        if(!loading){
            setCurrentPage(1);
            getData();
        }
    }, [filters])

    useEffect(() => {
        if(!loading)
            getData();
    }, [currentPage])

    const handleClearFilters = () => {
        setFilters(emptyFilters);
        setCurrentPage(1);
    };

    const getData = async () => {
        setLoading(true);
        const params = new URLSearchParams({
            title: filters.title, 
            type: filters.type, 
            category: filters.category, 
            foundLocation: filters.foundLocation, 
            foundDate: filters.foundDate.toString(),
            currentPage: currentPage.toString()
        });
        fetch(`${process.env.NEXT_PUBLIC_API_URL}announcements/${office}/${itemsPerPage}?${params.toString()}`, {
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
                    onPageChange={setCurrentPage}
                    error={error}
                    loading={loading}
                />
            </div>
        </div>
    );
}