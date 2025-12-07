import { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { IAnnouncement, IItem, IItemType } from '@/types/types';
import { Card } from '../ui/Card';
import { FormField, Input, Select } from '../ui/FormField';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';
import { categories, districts } from '@/utils/helpers';
import { useAddMutation, useEditMutation } from '@/services/announcements';

interface AnnouncementFormProps {
  announcement?: IAnnouncement;
}

/**
 * Add / Edit announcement form
 * @param announcement optional announcement to edit 
 */
export function AddEditForm({ announcement }: AnnouncementFormProps) {
  const isEdit = !!announcement;
  const router = useRouter();
  const [create] = useAddMutation();
  const [edit] = useEditMutation()

  const [formData, setFormData] = useState({
    district: announcement?.district || '',
    foundLocation: announcement?.foundLocation || '',
    owner: announcement?.owner || undefined,
    returnLocation: announcement?.returnLocation || '',
    foundDate: announcement?.foundDate ? announcement.foundDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    returnTermin: announcement?.returnDate ? announcement.returnDate.toISOString().split('T')[0] : '',
  });

  const [items, setItems] = useState<Omit<IItem, 'itemId'>[]>(
    announcement?.items.map(item => ({
      title: item.title,
      type: item.type,
      category: item.category,
      isDestroyed: item.isDestroyed,
    })) || [
      {
        title: '',
        type: 'small' as IItemType,
        category: '',
        isDestroyed: false,
      }
    ]
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Validation
   * @returns {boolean} true if no errors, false if errors
   */
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.district.trim()) {
      newErrors.district = 'Powiat jest wymagany';
    }

    if (!formData.foundLocation.trim()) {
      newErrors.foundLocation = 'Miejsce znalezienia jest wymagane';
    }

    if (!formData.returnLocation.trim()) {
      newErrors.returnLocation = 'Miejsce odbioru jest wymagane';
    }

    if (!formData.returnTermin) {
      newErrors.returnTermin = 'Termin odbioru jest wymagany';
    }

    // Validate items
    items.forEach((item, index) => {
      if (!item.title.trim()) {
        newErrors[`item_${index}_title`] = 'Nazwa przedmiotu jest wymagana';
      }
      if (!item.category.trim()) {
        newErrors[`item_${index}_category`] = 'Kategoria jest wymagana';
      }
    });

    if (items.length === 0) {
      newErrors.items = 'Dodaj przynajmniej jeden przedmiot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Submit Handler
   * @param e form event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      const itemsWithIds: IItem[] = items.map((item, index) => ({
        itemId: announcement?.items[index]?.itemId || Date.now() + index,
        ...item,
      }));

      if(isEdit)
        edit({id: announcement.announcementId, ...formData, items: itemsWithIds}).then(() => router.push("/admin"));
      else
        create({...formData, items: itemsWithIds}).then(() => router.push("/admin"))
    }
  };

  /**
   * change inut handler
   * @param field name of field
   * @param value new value for field
   */
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  /**
   * handler for change of item
   * @param index index of item to change
   * @param field changed field
   * @param value new field value
   */
  const handleItemChange = (index: number, field: keyof Omit<IItem, 'id'>, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
    
    const errorKey = `item_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors((prev) => ({ ...prev, [errorKey]: '' }));
    }
  };

  /**
   * Adding new item
   */
  const handleAddItem = () => {
    setItems([
      ...items,
      {
        title: '',
        type: 'small' as IItemType,
        category: '',
        isDestroyed: false,
      }
    ]);
  };

  /**
   * Removing item
   * @param index - index of removed item
   */
  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <h1 className="mb-6">{isEdit ? 'Edytuj ogłoszenie' : 'Dodaj nowe ogłoszenie'}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="mb-4 pb-2 border-b border-[#E5E5E5]">Informacje o miejscu</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Powiat"
                required
                error={errors.district}
              >
                <Select
                  value={formData.district}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('district', e.target.value)}
                  required
                >
                  <option value="">Wybierz powiat</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </Select>
              </FormField>

              <FormField
                label="Data znalezienia"
                required
                error={errors.foundDate}
              >
                <Input
                  type="date"
                  value={formData.foundDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('foundDate', e.target.value)}
                  required
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <FormField
                label="Miejsce znalezienia"
                required
                error={errors.foundLocation}
              >
                <Input
                  type="text"
                  value={formData.foundLocation}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('foundLocation', e.target.value)}
                  placeholder="Wpisz miejsce znalezienia"
                  required
                />
              </FormField>

              <FormField
                label="Miejsce odbioru"
                required
                error={errors.returnLocation}
              >
                <Input
                  type="text"
                  value={formData.returnLocation}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('returnLocation', e.target.value)}
                  placeholder="Wpisz miejsce odbioru"
                  required
                />
              </FormField>
            </div>

            <div className="mt-4">
              <FormField
                label="Termin odbioru"
                required
                error={errors.returnTermin}
              >
                <Input
                  type="date"
                  value={formData.returnTermin}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('returnTermin', e.target.value)}
                  required
                  className="md:w-1/2"
                />
              </FormField>
            </div>
          </div>

          <div>
            <h2 className="mb-4 pb-2 border-b border-[#E5E5E5]">Informacje o Osobie</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Znane dane o właścicielu"
                error={errors.owner}
              >
                <Input
                  type="text"
                  value={formData.owner}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('owner', e.target.value)}
                  required
                />
              </FormField>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E5E5E5]">
              <h2>Przedmioty</h2>
              <Button type="button" onClick={handleAddItem}>
                    <Plus className="w-4 h-4 mr-1" />
                    Dodaj przedmiot
              </Button>
            </div>

            {errors.items && (
              <div className="mb-4 p-3 bg-[#f8d7da] border border-[#f5c6cb] rounded-[2px] text-[#721c24]">
                {errors.items}
              </div>
            )}

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="p-4 bg-[#F9F9F9] rounded-[2px] border border-[#E5E5E5]">
                  <div className="flex items-center justify-between mb-3">
                    <h3>Przedmiot {index + 1}</h3>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="text-[#dc3545] hover:text-[#c82333] focus:outline-none focus:ring-2 focus:ring-[#dc3545] rounded p-1"
                        aria-label="Usuń przedmiot"
                        disabled={isEdit}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="Nazwa przedmiotu"
                      required
                      error={errors[`item_${index}_title`]}
                    >
                      <Input
                        type="text"
                        value={item.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleItemChange(index, 'title', e.target.value)}
                        placeholder="np. Portfel skórzany brązowy"
                        required
                      />
                    </FormField>

                    <FormField
                      label="Kategoria"
                      required
                      error={errors[`item_${index}_category`]}
                    >
                      <Select
                        value={item.category}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleItemChange(index, 'category', e.target.value)}
                        required
                      >
                        <option value="">Wybierz kategorię</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </Select>
                    </FormField>

                    <FormField
                      label="Rozmiar"
                      required
                    >
                      <Select
                        value={item.type}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleItemChange(index, 'type', e.target.value)}
                        required
                      >
                        <option value="small">Mały</option>
                        <option value="medium">Średni</option>
                        <option value="big">Duży</option>
                      </Select>
                    </FormField>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-[#E5E5E5]">
            <Button type="submit">
              {isEdit ? 'Zapisz zmiany' : 'Dodaj ogłoszenie'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => router.back()}>
              Anuluj
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
