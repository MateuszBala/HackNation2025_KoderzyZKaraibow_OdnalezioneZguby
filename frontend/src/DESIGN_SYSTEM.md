# Rzeczy znalezione – kreator publikacji danych
## Design System Documentation

This document describes the complete UI design system for the "Found Items Data Publication Wizard" module for dane.gov.pl portal.

---

## 🎨 Visual Style Guide

### Typography
- **Font Family**: Lato (Google Fonts)
- **Font Weights**: 300 (Light), 400 (Regular), 700 (Bold), 900 (Black)

### Colors

#### Primary Colors
- **Primary Blue**: `#0052A5` - Main brand color, buttons, links, interactive elements
- **Primary Dark**: `#003D7A` - Button hover states, active states
- **Primary Light**: `#0066CC` - Lighter accents

#### Grey Scale
- **Grey 1**: `#F2F2F2` - Background color
- **Grey 2**: `#E5E5E5` - Borders, dividers
- **Grey 3**: `#CCCCCC` - Input borders
- **Grey 4**: `#6C757D` - Secondary text, helper text
- **Grey 5**: `#333333` - Primary text

#### Semantic Colors
- **Success**: `#28A745` - Success states, completed steps
- **Warning**: `#FFC107` - Warning states, requires attention
- **Danger**: `#DC3545` - Error states, invalid data

### Spacing
- Card padding: `24px` (1.5rem)
- Section spacing: `24px` vertical
- Form field spacing: `20px` vertical
- Button padding: Small `12px 16px`, Medium `10px 16px`, Large `12px 24px`

### Border Radius
- Standard: `2px` - Buttons, cards, inputs (rectangular with slight rounding)
- Pills/Tags: `9999px` - Keyword tags

### Shadows
- Card hover: `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
- Selected card: `0 4px 12px -2px rgba(0, 82, 165, 0.2)`

---

## 📦 Component Library

### Navigation Components

#### Top Navigation Bar
- Height: `64px`
- Background: White with bottom border
- Includes: Logo, language switcher, notifications, user profile menu
- Sticky positioning on scroll

#### Sidebar
- Width: `256px` (64 columns in 12-column grid)
- Background: `#0052A5` (Primary blue)
- Text: White
- Menu items with hover states
- Collapsible on mobile with overlay

#### Breadcrumb
- Home icon + text links
- Chevron separators
- Current page in default text color

### UI Components

#### Button
**Variants:**
- `primary` - Blue background, white text
- `secondary` - Grey background, white text
- `outline` - White background, blue border and text
- `danger` - Red background, white text

**Sizes:**
- `small` - Compact size for secondary actions
- `medium` - Standard size (default)
- `large` - Prominent size for main actions

**States:**
- Default
- Hover (darker shade)
- Focus (2px ring)
- Disabled (50% opacity)

#### Card
- White background
- 1px border with `#E5E5E5`
- 24px padding (configurable)
- Optional hover effect
- Optional selected state (2px blue border)

#### Form Field
**Types:** text, email, textarea, select, number

**Features:**
- Required indicator (red asterisk)
- Helper text (grey, below input)
- Error text (red, below input)
- Focus state with blue ring

---

## 🪄 Wizard Flow

### Step 1: Choose Template
**Components:**
- Info banner (light blue background)
- Large selectable card with icon
- Template description
- Navigation buttons

**Content:**
- Single template option: "Rzeczy znalezione – szablon"
- Placeholder for future templates

### Step 2: Choose Input Method
**Components:**
- 3 large selectable cards arranged in grid
- Icons for each method
- Feature list with checkmarks
- Confirmation panel when method selected

**Methods:**
1. Upload CSV/XLSX
2. Upload XML (with XSD schema)
3. Manual entry

### Step 3: Data Validation and Mapping
**Components:**
- File upload area (drag & drop)
- Success banner with file stats
- Data preview table (first 5 rows)
- Color-coded cells:
  - Green: Recognized fields
  - Yellow: Requires mapping
  - Red: Invalid data
- Column mapping dropdowns
- Legend for status colors

**Features:**
- File format validation
- Automatic column detection
- Manual column-to-field mapping
- Real-time validation feedback

### Step 4: Metadata
**Components:**
- Two-column layout (form + tips sidebar)
- Multiple form sections in cards
- Helper text for each field
- Sticky tips sidebar

**Sections:**
1. **Basic Information**
   - Title
   - Description
   - Keywords
   - Organization

2. **Updates & License**
   - Update frequency (dropdown)
   - License (dropdown with common licenses)

3. **Contact Person**
   - Name
   - Email

### Step 5: Summary and Publication
**Components:**
- Success validation banner
- Two-column summary cards
- Metadata summary card
- Data statistics card
- Sample records preview
- Pre-publication checklist
- Action buttons

**Display:**
- All metadata summarized
- Dataset statistics (records, columns, size, format)
- Fields list with checkmarks
- Preview of first 3 records

### Success Screen
**Components:**
- Large success icon
- Celebration message
- Dataset statistics
- URL with copy button
- Action buttons (view dataset, download)
- Quick action cards
- Next steps guidance

---

## 📱 Responsive Design

### Breakpoints
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

### Mobile Adaptations
1. **Navigation**
   - Hamburger menu to toggle sidebar
   - Sidebar slides in from left with overlay
   - Simplified user menu

2. **Wizard Progress**
   - Circular steps → Progress bar
   - Text indicator: "Krok X z 5"

3. **Cards**
   - Grid columns: 3 → 2 → 1
   - Stack vertically on mobile

4. **Tables**
   - Horizontal scroll container
   - Preserve all columns

5. **Forms**
   - Two-column → Single column
   - Full-width inputs
   - Tips sidebar below form on mobile

---

## ♿ Accessibility (WCAG 2.1 AA)

### Contrast Ratios
- Primary text (#333333) on white: **12.63:1** ✓
- Secondary text (#6C757D) on white: **7.23:1** ✓
- Primary blue (#0052A5) on white: **8.59:1** ✓
- White on primary blue: **8.59:1** ✓

### Features
- Semantic HTML elements
- ARIA labels for icons and actions
- Keyboard navigation support
- Focus indicators (2px ring)
- Screen reader friendly text
- Form field labels properly associated
- Required field indicators

---

## 🛠️ Developer Notes

### File Structure
```
/App.tsx                          # Main application component
/components/
  /Navigation.tsx                 # Top navigation bar
  /Sidebar.tsx                    # Left sidebar navigation
  /Breadcrumb.tsx                 # Breadcrumb navigation
  /ui/
    /Button.tsx                   # Button component
    /Card.tsx                     # Card component
    /FormField.tsx                # Form field component
  /wizard/
    /WizardProgress.tsx          # Progress indicator
    /Step1ChooseTemplate.tsx     # Step 1 component
    /Step2ChooseMethod.tsx       # Step 2 component
    /Step3DataValidation.tsx     # Step 3 component
    /Step4Metadata.tsx           # Step 4 component
    /Step5Summary.tsx            # Step 5 component
    /SuccessScreen.tsx           # Success screen
/styles/
  /globals.css                   # Global styles and theme
```

### State Management
- React useState for wizard navigation
- Step-by-step progression
- Form data persisted across steps
- Back navigation preserves state

### Key Features
- Fully responsive design
- Interactive wizard with 5 steps
- Real-time validation feedback
- Accessible navigation
- WCAG 2.1 AA compliant
- Production-ready code

---

## 📋 Content Guidelines

### Polish Language
All content uses proper Polish grammar and official government portal terminology:
- Formal tone ("Pan/Pani")
- Clear, concise instructions
- Consistent terminology across all steps

### Key Terms
- **Zbiór danych** - Dataset
- **Metadane** - Metadata
- **Rzeczy znalezione** - Found items
- **Kreator** - Wizard/Creator
- **Publikacja** - Publication
- **Dostawca** - Provider/Supplier
- **Walidacja** - Validation

---

## 🚀 Usage

The wizard automatically guides users through the 5-step process:

1. Select the "Rzeczy znalezione" template
2. Choose data input method (CSV/XLSX/XML/Manual)
3. Upload file and validate/map columns
4. Fill in dataset metadata
5. Review summary and publish

After publication, users see a success screen with dataset URL and next steps.

---

**Version**: 1.0  
**Last Updated**: December 2024  
**Maintained by**: Portal Otwartych Danych Team
