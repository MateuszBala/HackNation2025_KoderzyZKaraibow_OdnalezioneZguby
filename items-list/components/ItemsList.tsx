import { ItemFilters } from "@/interfaces/ItemFilters";
import { useMemo, useState } from "react";

type Props = {
    items: []
}

const emptyFilters: ItemFilters = {
    title: '',
    type: '',
    location: '',
    returned: '',
};

export default function ItemsList({items}:Props) {
    
    const [filters, setFilters] = useState<ItemFilters>(emptyFilters);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleApplyFilters = () => {
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setFilters(emptyFilters);
        setCurrentPage(1);
    };

    const handleExport = () => {
        // exportToCSV();
    };

    return <></>
}