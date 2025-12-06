import { useState, useEffect } from 'react';
import { FoundItem, ItemType } from '../types';
import { Card } from './Card';
import { Button } from './Button';
import { FormField, Input, Textarea, Select } from './FormField';
import { locations } from '../data/mockData';

interface ItemFormProps {
  item?: FoundItem;
  onSave: (item: Partial<FoundItem>) => void;
  onCancel: () => void;
}

export function ItemForm({ item, onSave, onCancel }: ItemFormProps) {
  const isEdit = !!item;

  const [formData, setFormData] = useState({
    title: item?.title || '',
    desc: item?.desc || '',
    type: item?.type || 'small' as ItemType,
    location: item?.location || '',
    createdAt: item?.createdAt ? item.createdAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Nazwa przedmiotu jest wymagana';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Lokalizacja jest wymagana';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSave({
        ...formData,
        createdAt: new Date(formData.createdAt),
      });
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <h1 className="mb-6">{isEdit ? 'Edytuj znaleziony przedmiot' : 'Dodaj znaleziony przedmiot'}</h1>

        <form onSubmit={handleSubmit}>
          <FormField label="Nazwa przedmiotu" required error={errors.title} id="title">
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('title', e.target.value)
              }
              error={errors.title}
              placeholder="np. Portfel skórzany brązowy"
            />
          </FormField>

          <FormField label="Opis" id="desc">
            <Textarea
              id="desc"
              value={formData.desc}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleChange('desc', e.target.value)
              }
              placeholder="Szczegółowy opis przedmiotu i okoliczności znalezienia..."
            />
          </FormField>

          <FormField label="Typ przedmiotu" id="type">
            <Select
              id="type"
              value={formData.type}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleChange('type', e.target.value as ItemType)
              }
            >
              <option value="small">Mały</option>
              <option value="medium">Średni</option>
              <option value="big">Duży</option>
            </Select>
          </FormField>

          <FormField label="Lokalizacja (starostwo)" required error={errors.location} id="location">
            <Select
              id="location"
              value={formData.location}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleChange('location', e.target.value)
              }
              error={errors.location}
            >
              <option value="">Wybierz lokalizację</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Data dodania / znalezienia" id="createdAt">
            <Input
              id="createdAt"
              type="date"
              value={formData.createdAt}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('createdAt', e.target.value)
              }
            />
          </FormField>

          <div className="flex gap-3 mt-8 pt-6 border-t border-[#E5E5E5]">
            <Button type="submit">
              {isEdit ? 'Zapisz zmiany' : 'Zapisz przedmiot'}
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel}>
              Anuluj
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}