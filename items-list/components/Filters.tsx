import { Card } from "./ui/Card";
import { DatePicker, FormField, Input, Select } from "./ui/FormField";
import { Button } from "./ui/Button";
import { formatToFieldDate } from "@/utils/helpers";
import { IAnnouncementFilters } from "@/types/types";
import { useState } from "react";
import { Menu } from "lucide-react";

interface Props {
  filters: IAnnouncementFilters;
  onFilterChange: (filters: IAnnouncementFilters) => void;
  onClear: () => void;
}

/**
 * Announcement filters
 * @param {IAnnouncementFilters} filters announcement filters
 * @param {(filters: IAnnouncementFilters) => void} onFilterChange setter for filter changes
 * @param {()=>void} onClear reseting filters
 */
export function Filters({ filters, onFilterChange, onClear }: Props) {
  const [show, setShow] = useState(false);

  return (
    <Card>
      <div className="flex flex-row justify-between items-center px-2">
        <span>Filtry</span> 
        <Button onClick={() => setShow(!show)}><Menu/></Button>
      </div>
      <div className={`transition-all ease-in-out duration-500 overflow-hidden ${!show ? "max-h-0" : "max-h-screen"}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <FormField label="Nazwa przedmiotu" id="filter-title">
            <Input
              id="filter-title"
              type="text"
              placeholder="Wpisz nazwę..."
              value={filters.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onFilterChange({ ...filters, title: e.target.value })
              }
            />
          </FormField>

          <FormField label="Typ" id="filter-type">
            <Select
              id="filter-type"
              value={filters.type}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                onFilterChange({ ...filters, type: e.target.value as any })
              }
            >
              <option value="">Wszystkie</option>
              <option value="small">Mały</option>
              <option value="medium">Średni</option>
              <option value="big">Duży</option>
            </Select>
          </FormField>

          <FormField label="Kategoria" id="filter-category">
            <Input
              id="filter-category"
              type="text"
              placeholder="Wpisz kategorię..."
              value={filters.category}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onFilterChange({ ...filters, category: e.target.value })
              }
            />
          </FormField>
          
          <FormField label="Miejsce znalezienia" id="filter-foundLocation">
            <Input
              id="filter-foundLocation"
              type="text"
              placeholder="Wpisz miejsce..."
              value={filters.foundLocation}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onFilterChange({ ...filters, foundLocation: e.target.value })
              }
            />
          </FormField>

          <FormField label="Czas znalezienia" id="filter-foundLocation">
            <DatePicker
              value={formatToFieldDate(filters.foundDate)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onFilterChange({ ...filters, foundDate: new Date(e.target.value) })
              }
            />
          </FormField>

        </div>

        <div className="flex gap-3">
          <Button variant="tertiary" onClick={onClear}>
            Wyczyść
          </Button>
        </div>
      </div>

    </Card>
  );
}
