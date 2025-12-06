# Quick Reference Guide
## Rzeczy znalezione – kreator publikacji danych

Fast lookup for common design patterns and code snippets.

---

## 🎨 Colors

```css
/* Primary */
#0052A5  /* Primary blue (buttons, links, brand) */
#003D7A  /* Primary dark (hover states) */

/* Grey Scale */
#F2F2F2  /* Background */
#E5E5E5  /* Borders */
#CCCCCC  /* Input borders */
#6C757D  /* Secondary text */
#333333  /* Primary text */

/* Semantic */
#28A745  /* Success (green) */
#FFC107  /* Warning (yellow) */
#DC3545  /* Danger (red) */
```

---

## 📏 Spacing Scale

```
2px   = 0.5  = gap-0.5, p-0.5
4px   = 1    = gap-1, p-1
8px   = 2    = gap-2, p-2
12px  = 3    = gap-3, p-3
16px  = 4    = gap-4, p-4
20px  = 5    = gap-5, p-5
24px  = 6    = gap-6, p-6 (standard card padding)
32px  = 8    = gap-8, p-8
```

---

## 🔤 Typography

```typescript
// Headings (DO NOT override with Tailwind)
h1: 32px, weight 700, line-height 1.2
h2: 24px, weight 700, line-height 1.3
h3: 20px, weight 700, line-height 1.4
h4: 18px, weight 700, line-height 1.4

// Body text
p: 16px, weight 400, line-height 1.6

// Small text
small: 14px, weight 400, line-height 1.4

// Labels
label: 14px, weight 700, line-height 1.5
```

---

## 🧩 Component Patterns

### Button
```tsx
import { Button } from './components/ui/Button';

// Variants
<Button variant="primary">Dalej</Button>
<Button variant="secondary">Anuluj</Button>
<Button variant="outline">Wstecz</Button>
<Button variant="danger">Usuń</Button>

// Sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>  {/* default */}
<Button size="large">Large</Button>

// Full width
<Button fullWidth>Full Width Button</Button>

// Disabled
<Button disabled>Cannot Click</Button>
```

### Card
```tsx
import { Card } from './components/ui/Card';

// Basic
<Card>Content here</Card>

// No padding
<Card padding={false}>Content</Card>

// Hover effect
<Card hover>Clickable card</Card>

// Selected state
<Card selected={isSelected}>Selected card</Card>

// With onClick
<Card onClick={() => handleClick()}>Click me</Card>
```

### Form Field
```tsx
import { FormField } from './components/ui/FormField';

// Text input
<FormField
  label="Tytuł"
  id="title"
  value={title}
  onChange={setTitle}
  required
  helperText="Maksymalnie 100 znaków"
/>

// Textarea
<FormField
  label="Opis"
  id="description"
  type="textarea"
  value={description}
  onChange={setDescription}
  rows={6}
/>

// Select
<FormField
  label="Częstotliwość aktualizacji"
  id="frequency"
  type="select"
  value={frequency}
  onChange={setFrequency}
  options={[
    { value: 'daily', label: 'Codziennie' },
    { value: 'weekly', label: 'Co tydzień' }
  ]}
/>

// With error
<FormField
  label="Email"
  id="email"
  type="email"
  value={email}
  onChange={setEmail}
  errorText="Nieprawidłowy adres email"
/>
```

### Alert
```tsx
import { Alert } from './components/ui/Alert';

// Info
<Alert variant="info">
  <p>Informacja dla użytkownika</p>
</Alert>

// Success
<Alert variant="success" title="Sukces!">
  <p>Operacja zakończona pomyślnie</p>
</Alert>

// Warning
<Alert variant="warning">
  <p>Uwaga: sprawdź wprowadzone dane</p>
</Alert>

// Danger
<Alert variant="danger">
  <p>Wystąpił błąd podczas przetwarzania</p>
</Alert>
```

---

## 📱 Responsive Patterns

### Breakpoints
```tsx
// Mobile-first approach
<div className="
  grid
  grid-cols-1        /* mobile: 1 column */
  md:grid-cols-2     /* tablet: 2 columns */
  lg:grid-cols-3     /* desktop: 3 columns */
  gap-6
">
```

### Hide/Show
```tsx
// Hide on mobile, show on desktop
<div className="hidden lg:block">Desktop only</div>

// Show on mobile, hide on desktop
<div className="lg:hidden">Mobile only</div>

// Responsive padding
<div className="p-4 md:p-6 lg:p-8">
```

### Sidebar Toggle
```tsx
// Fixed sidebar with mobile overlay
<aside className={`
  fixed lg:sticky
  ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
  transition-transform
`}>
```

---

## 🎯 Common Layouts

### Two-Column Form Layout
```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">
    {/* Main form */}
  </div>
  <div className="lg:col-span-1">
    {/* Sidebar tips */}
  </div>
</div>
```

### Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</div>
```

### Horizontal Button Group
```tsx
<div className="flex gap-3">
  <Button variant="outline">Cancel</Button>
  <Button variant="primary">Save</Button>
</div>
```

### Stats Grid
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <div className="bg-[#f2f2f2] rounded-[2px] p-4 text-center">
    <p className="text-2xl mb-1">125</p>
    <p className="text-sm text-[#6c757d] mb-0">Rekordów</p>
  </div>
  {/* More stats */}
</div>
```

---

## ✅ Common Validation Patterns

### Email
```typescript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValid = emailRegex.test(email);
```

### Required Field
```typescript
const error = value.trim() === '' ? 'To pole jest wymagane' : '';
```

### Min/Max Length
```typescript
if (value.length < 10) {
  error = 'Minimum 10 znaków';
} else if (value.length > 100) {
  error = 'Maksimum 100 znaków';
}
```

### Keywords (comma-separated)
```typescript
const keywords = value.split(',').map(k => k.trim()).filter(k => k);
if (keywords.length < 3) {
  error = 'Wymagane minimum 3 słowa kluczowe';
}
```

---

## 🔄 State Management Patterns

### Wizard Navigation
```typescript
const [currentStep, setCurrentStep] = useState(1);

const handleNext = () => {
  setCurrentStep(prev => Math.min(prev + 1, 5));
};

const handleBack = () => {
  setCurrentStep(prev => Math.max(prev - 1, 1));
};

const goToStep = (step: number) => {
  setCurrentStep(step);
};
```

### Form State
```typescript
const [formData, setFormData] = useState({
  title: '',
  description: '',
  keywords: ''
});

const updateField = (field: string, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};
```

### Loading State
```typescript
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  setIsLoading(true);
  try {
    await api.submit(data);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};
```

---

## 🎭 Animation Classes

### Transitions
```tsx
// Smooth color transition
className="transition-colors duration-200"

// Smooth shadow transition
className="transition-shadow duration-300"

// All properties
className="transition-all duration-200"
```

### Hover Effects
```tsx
// Scale on hover
className="hover:scale-105 transition-transform"

// Shadow on hover
className="hover:shadow-md transition-shadow"

// Background change
className="hover:bg-[#f2f2f2] transition-colors"
```

---

## ♿ Accessibility Patterns

### Focus Styles
```tsx
className="focus:outline-none focus:ring-2 focus:ring-[#0052a5] focus:ring-offset-2"
```

### ARIA Labels
```tsx
<button aria-label="Zamknij menu">
  <X size={24} />
</button>
```

### Required Fields
```tsx
<label htmlFor="title">
  Tytuł
  <span className="text-[#dc3545] ml-1">*</span>
</label>
<input
  id="title"
  required
  aria-required="true"
/>
```

### Error Announcements
```tsx
<input
  aria-invalid={hasError}
  aria-describedby={hasError ? "error-message" : undefined}
/>
{hasError && (
  <p id="error-message" className="error-text" role="alert">
    {errorMessage}
  </p>
)}
```

---

## 📊 Table Patterns

### Responsive Table
```tsx
<div className="overflow-x-auto">
  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-[#f2f2f2]">
        <th className="px-4 py-3 text-left text-sm border border-[#e5e5e5]">
          Header
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-[#f2f2f2]">
        <td className="px-4 py-3 text-sm border border-[#e5e5e5]">
          Data
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### Color-Coded Cells
```tsx
const getCellStyle = (status: 'success' | 'warning' | 'error') => {
  const styles = {
    success: 'bg-[#d4edda] border-[#c3e6cb]',
    warning: 'bg-[#fff3cd] border-[#ffeaa7]',
    error: 'bg-[#f8d7da] border-[#f5c6cb]'
  };
  return styles[status];
};

<td className={getCellStyle(status)}>
  {value}
</td>
```

---

## 🔍 Icon Usage

```tsx
import { 
  CheckCircle,      // Success states
  AlertCircle,      // Error states
  AlertTriangle,    // Warning states
  Info,             // Info messages
  Upload,           // File upload
  Download,         // Download actions
  Edit3,            // Edit actions
  Trash2,           // Delete actions
  Eye,              // View actions
  Share2,           // Share actions
  ChevronRight,     // Navigation arrows
  ChevronDown,      // Dropdown indicators
  X,                // Close actions
  Menu,             // Mobile menu
  Home,             // Breadcrumb home
  FileText,         // Documents
  Database          // Data/storage
} from 'lucide-react';

// Usage
<CheckCircle size={20} className="text-[#28a745]" />
```

---

## 🚀 Performance Tips

### Lazy Loading
```tsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<div>Ładowanie...</div>}>
  <HeavyComponent />
</Suspense>
```

### Memoization
```tsx
import { memo, useMemo, useCallback } from 'react';

// Memoize component
const ExpensiveComponent = memo(({ data }) => {
  return <div>{data}</div>;
});

// Memoize computed value
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.name.localeCompare(b.name));
}, [data]);

// Memoize callback
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
```

---

## 📝 Polish Text Conventions

### Buttons
- "Dalej" (Next)
- "Wstecz" (Back)
- "Anuluj" (Cancel)
- "Zapisz" (Save)
- "Opublikuj" (Publish)
- "Usuń" (Delete)
- "Edytuj" (Edit)
- "Pobierz" (Download)

### Form Labels
- "Tytuł" (Title)
- "Opis" (Description)
- "Słowa kluczowe" (Keywords)
- "Organizacja" (Organization)
- "Częstotliwość aktualizacji" (Update frequency)
- "Licencja" (License)
- "Osoba kontaktowa" (Contact person)
- "Adres e-mail" (Email address)

### Messages
- "Pole wymagane" (Required field)
- "Nieprawidłowy format" (Invalid format)
- "Operacja zakończona sukcesem" (Operation successful)
- "Wystąpił błąd" (An error occurred)

---

**Version**: 1.0  
**Last Updated**: December 2024
