import { useState, useMemo } from 'react';
import { FoundItem, ItemFilters } from '../types';
import { Button } from './Button';
import { FilterCard } from './FilterCard';
import { ItemsTable } from './ItemsTable';
import { Download, Plus } from 'lucide-react';
import { exportToCSV } from '../utils/helpers';

interface MainPanelProps {
  items: FoundItem[];
  onAddItem: () => void;
  onEditItem: (item: FoundItem) => void;
  onViewDetails: (item: FoundItem) => void;
}

export function MainPanel({ items, onAddItem, onEditItem, onViewDetails }: MainPanelProps) {
  const [filters, setFilters] = useState<ItemFilters>({
    title: '',
    type: '',
    location: '',
    returned: '',
  });

  const [appliedFilters, setAppliedFilters] = useState<ItemFilters>(filters);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (appliedFilters.title && !item.title.toLowerCase().includes(appliedFilters.title.toLowerCase())) {
        return false;
      }
      if (appliedFilters.type && item.type !== appliedFilters.type) {
        return false;
      }
      if (appliedFilters.location && item.location !== appliedFilters.location) {
        return false;
      }
      if (appliedFilters.returned !== '' && item.returned !== appliedFilters.returned) {
        return false;
      }
      return true;
    });
  }, [items, appliedFilters]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage]);

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    const emptyFilters: ItemFilters = {
      title: '',
      type: '',
      location: '',
      returned: '',
    };
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setCurrentPage(1);
  };

  const handleExport = () => {
    exportToCSV(filteredItems);
  };

  return <iframe src="http://localhost:3001/county" className="w-full min-h-screen"/>

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h1>Rzeczy znalezione – rejestr</h1>
          <p className="text-[#666] mt-2">
            Dodawaj i zarządzaj zgłoszonymi rzeczami znalezionymi.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={onAddItem} className="flex items-center gap-2 justify-center">
            <Plus className="w-5 h-5" />
            Dodaj przedmiot
          </Button>
          <Button variant="secondary" onClick={handleExport} className="flex items-center gap-2 justify-center">
            <Download className="w-5 h-5" />
            Eksportuj listę do CSV
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <FilterCard
          filters={filters}
          onFilterChange={setFilters}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />

        <ItemsTable
          items={paginatedItems}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredItems.length}
          onPageChange={setCurrentPage}
          onEdit={onEditItem}
          onViewDetails={onViewDetails}
        />
      </div>
    </div>
  );
}
