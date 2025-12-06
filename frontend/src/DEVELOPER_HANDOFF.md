# Developer Handoff Documentation
## Rzeczy znalezione – kreator publikacji danych

This document provides technical implementation guidance for developers building the production version of this wizard.

---

## 🎯 Project Overview

A 5-step wizard for publishing "found items" (rzeczy znalezione) data to the Polish Open Data Portal (dane.gov.pl). The design is complete, high-fidelity, and production-ready.

---

## 📦 Component Architecture

### Component Hierarchy

```
App
├── Navigation
│   ├── Language Switcher (Dropdown)
│   ├── Notifications (Badge)
│   └── User Menu (Dropdown)
├── Sidebar
│   └── Menu Items
├── Main Content
│   ├── Breadcrumb
│   ├── WizardProgress
│   └── Wizard Steps
│       ├── Step1ChooseTemplate
│       ├── Step2ChooseMethod
│       ├── Step3DataValidation
│       ├── Step4Metadata
│       ├── Step5Summary
│       └── SuccessScreen
├── Footer
└── ViewportIndicator (dev tool)
```

### Reusable Components

**UI Components** (`/components/ui/`)
- `Button.tsx` - Primary, secondary, outline, danger variants
- `Card.tsx` - Hover and selected states
- `FormField.tsx` - Text, textarea, select with validation
- `Alert.tsx` - Info, success, warning, danger alerts

**Navigation Components** (`/components/`)
- `Navigation.tsx` - Top navigation bar
- `Sidebar.tsx` - Left sidebar menu
- `Breadcrumb.tsx` - Breadcrumb navigation

**Wizard Components** (`/components/wizard/`)
- `WizardProgress.tsx` - Progress indicator
- `Step1ChooseTemplate.tsx` through `Step5Summary.tsx`
- `SuccessScreen.tsx` - Final success page

---

## 🔄 State Management

### Current Implementation (React useState)

```typescript
const [currentStep, setCurrentStep] = useState(1);
const [isPublished, setIsPublished] = useState(false);
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
```

### Recommended Production Implementation

**Option 1: React Context**
```typescript
interface WizardContextType {
  currentStep: number;
  wizardData: {
    template: string;
    inputMethod: 'csv' | 'xml' | 'manual';
    uploadedFile: File | null;
    columnMapping: Record<string, string>;
    metadata: MetadataForm;
  };
  goToStep: (step: number) => void;
  updateWizardData: (data: Partial<WizardData>) => void;
}
```

**Option 2: Redux/Zustand**
- Better for larger applications
- Persist wizard state across page refreshes
- Undo/redo capability
- Dev tools integration

---

## 🔌 Backend Integration Points

### API Endpoints to Implement

#### 1. Template Selection
```typescript
GET /api/templates
Response: {
  templates: Array<{
    id: string;
    name: string;
    description: string;
    fields: Array<FieldDefinition>;
  }>
}
```

#### 2. File Upload
```typescript
POST /api/datasets/upload
Body: FormData {
  file: File;
  templateId: string;
}
Response: {
  uploadId: string;
  rowCount: number;
  columns: Array<string>;
  preview: Array<Record<string, any>>;
}
```

#### 3. Data Validation
```typescript
POST /api/datasets/validate
Body: {
  uploadId: string;
  columnMapping: Record<string, string>;
}
Response: {
  isValid: boolean;
  errors: Array<ValidationError>;
  warnings: Array<ValidationWarning>;
  validRecords: number;
  invalidRecords: number;
}
```

#### 4. Metadata Submission
```typescript
POST /api/datasets/create
Body: {
  uploadId: string;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    organization: string;
    updateFrequency: string;
    license: string;
    contactName: string;
    contactEmail: string;
  }
}
Response: {
  datasetId: string;
  url: string;
  status: 'published';
}
```

#### 5. Dataset Status Check
```typescript
GET /api/datasets/{datasetId}/status
Response: {
  status: 'processing' | 'published' | 'failed';
  progress: number;
  message: string;
}
```

---

## 📝 Form Validation Rules

### Step 2: Input Method
- Required: One method must be selected
- Validation: Enable "Dalej" button only when method is selected

### Step 3: File Upload
- **File Size**: Max 10 MB
- **Formats**: CSV, XLSX, XML
- **CSV Requirements**:
  - UTF-8 encoding
  - Comma or semicolon delimited
  - First row must contain headers
- **XML Requirements**:
  - Valid against XSD schema
  - Root element: `<foundItems>`

### Step 4: Metadata
```typescript
interface MetadataValidation {
  title: {
    required: true;
    minLength: 10;
    maxLength: 100;
  };
  description: {
    required: true;
    minLength: 50;
    maxLength: 5000;
  };
  keywords: {
    required: true;
    minLength: 3; // minimum 3 keywords
    pattern: /^[a-ząćęłńóśźż\s,]+$/i;
  };
  organization: {
    required: true;
  };
  updateFrequency: {
    required: true;
    enum: ['daily', 'weekly', 'monthly', 'quarterly', 'yearly', 'irregular'];
  };
  license: {
    required: true;
    enum: ['cc-by', 'cc-by-sa', 'cc0', 'odc-odbl'];
  };
  contactName: {
    required: true;
    minLength: 3;
  };
  contactEmail: {
    required: true;
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  };
}
```

---

## 🎨 Styling Guidelines

### Tailwind Configuration

The project uses **Tailwind CSS v4** with custom theme variables defined in `/styles/globals.css`:

```css
@theme {
  --color-primary: #0052a5;
  --color-primary-dark: #003d7a;
  --color-success: #28a745;
  --color-warning: #ffc107;
  --color-danger: #dc3545;
  /* ... more colors */
}
```

### Typography System

**DO NOT** override these unless user requests:
- Font sizes (h1, h2, p, etc.)
- Font weights
- Line heights

These are defined in `/styles/globals.css` and match dane.gov.pl standards.

### Consistent Spacing

Use these spacing values:
- Card padding: `p-6` (24px)
- Section gaps: `gap-6` (24px)
- Form field spacing: `mb-5` (20px)
- Button groups: `gap-3` (12px)

---

## ♿ Accessibility Checklist

### Keyboard Navigation
- [ ] All interactive elements focusable
- [ ] Logical tab order
- [ ] Escape closes modals/dropdowns
- [ ] Enter/Space activates buttons
- [ ] Arrow keys navigate menus

### Screen Readers
- [ ] All images have alt text
- [ ] Form fields have labels
- [ ] Error messages announced
- [ ] Loading states announced
- [ ] Success messages announced

### ARIA Attributes
```typescript
// Dropdown menu
<button aria-expanded={isOpen} aria-haspopup="menu">

// Step indicator
<div role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={5}>

// Form validation
<input aria-invalid={hasError} aria-describedby="error-message">

// Loading state
<div aria-busy="true" aria-live="polite">
```

---

## 📱 Responsive Breakpoints

```typescript
const breakpoints = {
  sm: '640px',   // Small tablets
  md: '768px',   // Tablets
  lg: '1024px',  // Laptops
  xl: '1280px',  // Desktops
  '2xl': '1536px' // Large desktops
};
```

### Testing Viewports
- Mobile: 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1440px, 1920px

---

## 🔒 Security Considerations

### File Upload Security
1. **Validate file type** on both client and server
2. **Scan for malware** before processing
3. **Limit file size** to prevent DoS
4. **Sanitize file names** to prevent path traversal
5. **Process in sandbox** environment

### Data Validation
1. **Sanitize all user input** to prevent XSS
2. **Validate CSV data** for injection attacks
3. **Limit number of rows** per upload
4. **Rate limit** upload endpoints

### Authentication
1. **Verify user permissions** before allowing dataset creation
2. **Log all actions** for audit trail
3. **Implement CSRF protection**
4. **Use secure session management**

---

## 🧪 Testing Requirements

### Unit Tests
- [ ] All UI components render correctly
- [ ] Button click handlers work
- [ ] Form validation functions correctly
- [ ] State updates as expected

### Integration Tests
- [ ] Wizard navigation flows correctly
- [ ] Form data persists across steps
- [ ] API calls handled properly
- [ ] Error states displayed correctly

### E2E Tests (Recommended: Playwright/Cypress)
```typescript
test('Complete wizard flow', async ({ page }) => {
  // Step 1: Select template
  await page.click('[data-testid="template-card"]');
  await page.click('button:has-text("Dalej")');
  
  // Step 2: Choose method
  await page.click('[data-testid="method-csv"]');
  await page.click('button:has-text("Dalej")');
  
  // Step 3: Upload file
  await page.setInputFiles('input[type="file"]', 'test-data.csv');
  await page.waitForSelector('[data-testid="validation-success"]');
  await page.click('button:has-text("Dalej")');
  
  // Step 4: Fill metadata
  await page.fill('#title', 'Test Dataset');
  await page.fill('#description', 'Test description...');
  // ... fill other fields
  await page.click('button:has-text("Dalej")');
  
  // Step 5: Publish
  await page.click('button:has-text("Opublikuj zbiór danych")');
  await page.waitForSelector('[data-testid="success-screen"]');
});
```

### Accessibility Tests
- [ ] Run Lighthouse audit (score > 90)
- [ ] Test with screen reader (NVDA/JAWS)
- [ ] Test keyboard-only navigation
- [ ] Verify color contrast ratios

---

## 🚀 Performance Optimization

### Code Splitting
```typescript
// Lazy load wizard steps
const Step1 = lazy(() => import('./components/wizard/Step1ChooseTemplate'));
const Step2 = lazy(() => import('./components/wizard/Step2ChooseMethod'));
// ... etc

// In App.tsx
<Suspense fallback={<LoadingSpinner />}>
  {currentStep === 1 && <Step1 onNext={handleNext} />}
</Suspense>
```

### Image Optimization
- Use WebP format with fallbacks
- Implement lazy loading for preview images
- Compress all assets

### Bundle Size
- Tree-shake unused Lucide icons
- Minimize Tailwind CSS output
- Use production build settings

---

## 📊 Analytics & Monitoring

### Events to Track
```typescript
// Wizard progress
analytics.track('wizard_step_completed', {
  step: number,
  stepName: string,
  timeSpent: number
});

// File upload
analytics.track('file_uploaded', {
  fileSize: number,
  fileType: string,
  rowCount: number
});

// Dataset published
analytics.track('dataset_published', {
  datasetId: string,
  recordCount: number,
  publishTime: number
});

// Errors
analytics.track('validation_error', {
  step: number,
  errorType: string,
  errorMessage: string
});
```

---

## 🐛 Error Handling

### Error States

**Network Errors**
```typescript
if (error.code === 'NETWORK_ERROR') {
  showAlert({
    variant: 'danger',
    title: 'Błąd połączenia',
    message: 'Nie udało się połączyć z serwerem. Sprawdź połączenie internetowe.'
  });
}
```

**Validation Errors**
```typescript
if (error.code === 'VALIDATION_ERROR') {
  setFieldError(error.field, error.message);
}
```

**File Upload Errors**
```typescript
const uploadErrors = {
  'FILE_TOO_LARGE': 'Plik jest zbyt duży. Maksymalny rozmiar to 10 MB.',
  'INVALID_FORMAT': 'Nieprawidłowy format pliku. Obsługiwane formaty: CSV, XLSX, XML.',
  'CORRUPTED_FILE': 'Plik jest uszkodzony i nie może być przetworzony.',
  'ENCODING_ERROR': 'Błąd kodowania. Upewnij się, że plik jest w formacie UTF-8.'
};
```

---

## 🌍 Internationalization (i18n)

Currently only Polish is implemented, but structure supports i18n:

```typescript
// Example i18n structure
const translations = {
  pl: {
    wizard: {
      step1: {
        title: 'Dodaj dane o rzeczach znalezionych',
        description: 'Kreator publikacji danych...'
      },
      buttons: {
        next: 'Dalej',
        back: 'Wstecz',
        cancel: 'Anuluj',
        publish: 'Opublikuj'
      }
    }
  },
  en: {
    wizard: {
      step1: {
        title: 'Add found items data',
        description: 'Data publication wizard...'
      },
      buttons: {
        next: 'Next',
        back: 'Back',
        cancel: 'Cancel',
        publish: 'Publish'
      }
    }
  }
};
```

---

## 📋 Deployment Checklist

### Pre-deployment
- [ ] All environment variables configured
- [ ] API endpoints tested and working
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Analytics tracking configured
- [ ] Accessibility audit passed
- [ ] Performance audit passed (Lighthouse > 90)
- [ ] All tests passing
- [ ] Security audit completed

### Post-deployment
- [ ] Monitor error rates
- [ ] Track user completion rates
- [ ] Collect user feedback
- [ ] Monitor performance metrics
- [ ] Set up alerts for errors

---

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run linter
npm run lint

# Run type check
npm run type-check

# Run accessibility audit
npm run a11y
```

---

## 📞 Support & Contacts

**Design System**: See `/DESIGN_SYSTEM.md`  
**README**: See `/README.md`  
**Issues**: Report via project issue tracker  

---

## 📝 Additional Notes

### Browser Support
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile Safari: iOS 14+
- Chrome Mobile: Latest

### Known Limitations (Current Demo)
- File upload is simulated (no actual processing)
- API calls are mocked
- No authentication/authorization
- No data persistence
- No error recovery mechanism

### Future Enhancements
- Draft saving capability
- Bulk upload support
- Template customization
- Advanced validation rules
- Dataset versioning
- Collaboration features
- Scheduled publishing

---

**Version**: 1.0  
**Last Updated**: December 2024  
**Status**: Ready for development handoff
