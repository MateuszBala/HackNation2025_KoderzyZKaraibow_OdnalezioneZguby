import { ItemFilters } from "@/interfaces/ItemFilters";
import { useEffect, useState } from "react";
import { Filters } from "./Filters";
import { ItemsTable } from "./ItemsTable";
import { FoundAnnouncement } from "@/interfaces/FoundAnnouncement";

const emptyFilters: ItemFilters = {
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
    const [items, setItems] = useState<FoundAnnouncement[]>([]);
    const [filters, setFilters] = useState<ItemFilters>(emptyFilters);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const itemsPerPage = 10;

    useEffect(()=>{
        getData()
    }, [filters])

    const handleApplyFilters = () => {
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setFilters(emptyFilters);
        setCurrentPage(1);
    };

    const getData = async () => {
        const params = new URLSearchParams({
            title: filters.title, 
            type: filters.type, 
            category: filters.category, 
            foundLocation: filters.foundLocation, 
            foundDate: filters.foundDate.toString()
        });
        fetch(`${process.env.NEXT_PUBLIC_API_URL}${office}/${itemsPerPage}?${params.toString()}`, {
            method: "GET",
        }).then(async (res)=>{
            if(res.ok){
                setItems(await res.json());
                setLoading(false);
            }
        }).catch(()=>{
            setLoading(false)
            setError(true)
        })
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="space-y-6">
                <Filters
                    filters={filters}
                    onFilterChange={setFilters}
                    onApply={handleApplyFilters}
                    onClear={handleClearFilters}
                />

                <ItemsTable
                    items={items}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={items.length}
                    onPageChange={setCurrentPage}
                    error={error}
                    loading={loading}
                />
            </div>
        </div>
    );
}