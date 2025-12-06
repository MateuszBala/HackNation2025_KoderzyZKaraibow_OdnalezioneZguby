import { Card } from './Card';
import { Button } from './Button';
import { FormField, Input, Select } from './FormField';
import { ItemFilters } from '../types';
import { locations } from '../data/mockData';

interface FilterCardProps {
  filters: ItemFilters;
  onFilterChange: (filters: ItemFilters) => void;
  onApply: () => void;
  onClear: () => void;
}

export function FilterCard({ filters, onFilterChange, onApply, onClear }: FilterCardProps) {
  return (
    <Card title="Filtry">
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

        <FormField label="Lokalizacja (starostwo)" id="filter-location">
          <Select
            id="filter-location"
            value={filters.location}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onFilterChange({ ...filters, location: e.target.value })
            }
          >
            <option value="">Wszystkie</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Status" id="filter-status">
          <Select
            id="filter-status"
            value={filters.returned === '' ? '' : filters.returned ? 'true' : 'false'}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onFilterChange({
                ...filters,
                returned: e.target.value === '' ? '' : e.target.value === 'true',
              })
            }
          >
            <option value="">Wszystkie</option>
            <option value="false">Czeka na odbiór</option>
            <option value="true">Odebrany</option>
          </Select>
        </FormField>
      </div>

      <div className="flex gap-3">
        <Button onClick={onApply}>Zastosuj filtry</Button>
        <Button variant="tertiary" onClick={onClear}>
          Wyczyść
        </Button>
      </div>
    </Card>
  );
}
