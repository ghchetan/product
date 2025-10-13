# 🎨 CSS Style Guide & Design System

**Version:** 1.0.0  
**Last Updated:** October 12, 2025  
**Author:** Product Development Team

> Complete reference for CSS classes, design tokens, and component patterns used in the Kitchen Ventilation Systems project.

---

## 📑 Table of Contents

1. [Design Tokens (CSS Variables)](#design-tokens)
2. [Typography System](#typography-system)
3. [Color Palette](#color-palette)
4. [Spacing Scale](#spacing-scale)
5. [Component Classes](#component-classes)
6. [Utility Classes](#utility-classes)
7. [State Classes](#state-classes)
8. [Responsive Breakpoints](#responsive-breakpoints)
9. [Animation & Transitions](#animation--transitions)
10. [Best Practices](#best-practices)

---

## 🎨 Design Tokens

All design tokens are defined as CSS custom properties in `:root`. Use these variables instead of hard-coded values for consistency and easy theming.

### Colors

```css
/* Brand Colors */
--primary-color: #075697;           /* Primary blue */
--primary-hover: rgba(7, 86, 151, 0.9); /* Primary blue hover */
--secondary-color: #1d4ed8;         /* Secondary blue */
--link-color: #999999;              /* Gray links */

/* Text Colors */
--text-primary: #333333;            /* Main text color */
--text-secondary: #999999;          /* Secondary/muted text */
--text-light: #6b7280;              /* Light text for labels */
--text-color: #1f2937;              /* Alternative dark text */

/* Background Colors */
--background-color: #ffffff;        /* White background */
--background-light: #fafafa;        /* Light gray background */
--background-sidebar: #f9fafb;      /* Sidebar background */
--background-overlay: rgba(255, 255, 255, 0.95); /* Modal overlay */
--background-hover: rgba(37, 99, 235, 0.05); /* Hover background */
--background-button-hover: #f0f0f0; /* Button hover background */

/* Border Colors */
--border-color: #e5e7eb;            /* Default border */
--card-border: #e5e5e5;             /* Card borders */
--checkbox-border: #d1d5db;         /* Checkbox borders */
```

**Usage:**
```css
.my-element {
  color: var(--text-primary);
  background-color: var(--background-light);
  border: 1px solid var(--border-color);
}
```

---

## 📝 Typography System

### Font Families

```css
--font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--font-family-heading: 'Helvetica-Bold', -apple-system, sans-serif;
--font-family-body: 'HelveticaNeue-Medium', -apple-system, sans-serif;
```

### Font Sizes

| Variable | Size | Usage |
|----------|------|-------|
| `--font-size-xs` | 11px | Very small text, mobile descriptions |
| `--font-size-sm` | 13px | Small text, breadcrumbs, labels |
| `--font-size-base` | 15px | Body text, paragraphs |
| `--font-size-md` | 18px | Subheadings, buttons |
| `--font-size-lg` | 20px | Section headings |
| `--font-size-xl` | 24px | Page titles (mobile) |
| `--font-size-2xl` | 32px | Page titles (tablet) |
| `--font-size-3xl` | 40px | Page titles (desktop) |

### Line Heights

```css
--line-height-tight: 1.41667;    /* Compact text */
--line-height-base: 1.5;         /* Standard */
--line-height-relaxed: 1.6;      /* Body text */
--line-height-loose: 1.8;        /* Spacious headings */
```

### Font Examples

```html
<!-- Heading Font -->
<h1 style="font-family: var(--font-family-heading);">Product Title</h1>

<!-- Body Font -->
<p style="font-family: var(--font-family-body); font-size: var(--font-size-base);">
  Body text content
</p>

<!-- Small Text -->
<span style="font-size: var(--font-size-sm); color: var(--text-secondary);">
  Metadata or labels
</span>
```

---

## 🎨 Color Palette

### Primary Colors
| Color | Hex | Usage | Example |
|-------|-----|-------|---------|
| Primary | `#075697` | Buttons, links, focus states | <div style="width:40px;height:20px;background:#075697;border:1px solid #ccc;"></div> |
| Primary Hover | `rgba(7, 86, 151, 0.9)` | Hover states | <div style="width:40px;height:20px;background:rgba(7,86,151,0.9);border:1px solid #ccc;"></div> |
| Secondary | `#1d4ed8` | Alternative actions | <div style="width:40px;height:20px;background:#1d4ed8;border:1px solid #ccc;"></div> |

### Text Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Text Primary | `#333333` | Main body text |
| Text Secondary | `#999999` | Muted text, labels |
| Text Light | `#6b7280` | Subtle text |

### Background Colors
| Color | Value | Usage |
|-------|-------|-------|
| White | `#ffffff` | Cards, modals |
| Light Gray | `#fafafa` | Page background |
| Sidebar | `#f9fafb` | Filter sidebar |

---

## 📏 Spacing Scale

Our spacing system uses a **4px base unit** for consistent rhythm.

| Variable | Value | Usage |
|----------|-------|-------|
| `--spacing-1` | 4px | Minimal spacing |
| `--spacing-2` | 8px | Small gaps |
| `--spacing-3` | 12px | Medium spacing |
| `--spacing-4` | 16px | Default spacing |
| `--spacing-5` | 20px | Comfortable spacing |
| `--spacing-6` | 24px | Section spacing |
| `--spacing-8` | 32px | Large spacing |
| `--spacing-10` | 40px | Extra large spacing |
| `--spacing-12` | 48px | Maximum spacing |

### Spacing Examples

```css
/* Padding */
.component {
  padding: var(--spacing-4); /* 16px */
}

/* Margin */
.section {
  margin-bottom: var(--spacing-8); /* 32px */
}

/* Gap */
.grid {
  gap: var(--spacing-6); /* 24px */
}
```

---

## 🧩 Component Classes

### Product Cards

#### `.product-card`
Main product card container.

```html
<article class="product-card">
  <!-- Card content -->
</article>
```

**Properties:**
- Width: 288px (max)
- Height: 354px
- Border: 1px solid `--card-border`
- Shadow: `--shadow-sm` (hover: `--shadow-lg`)

#### `.product-card-front`
Front side of the card (default view).

```html
<div class="product-card-front">
  <h3 class="product-category">Category Name</h3>
  <div class="product-image-container">
    <img class="product-image" src="..." alt="...">
  </div>
  <div class="product-card-footer">
    <button class="product-details-btn">Details</button>
    <a class="quick-view-link" href="#...">Quick View</a>
  </div>
</div>
```

#### `.product-card-back`
Back side showing product overview (appears when flipped).

```html
<div class="product-card-back">
  <p class="product-overview-description">Description...</p>
  <ul class="product-overview-specs">
    <li>Spec 1</li>
    <li>Spec 2</li>
  </ul>
  <div class="product-overview-certifications">
    <h4>Certifications:</h4>
    <ul>
      <li>Cert 1</li>
    </ul>
  </div>
</div>
```

### Product Card Sub-Components

| Class | Purpose | Parent |
|-------|---------|--------|
| `.product-category` | Product title/category | `.product-card-front` |
| `.product-image-container` | Image wrapper | `.product-card-front` |
| `.product-image` | Product image | `.product-image-container` |
| `.product-card-footer` | Button/link container | `.product-card-front` |
| `.product-details-btn` | Primary CTA button | `.product-card-footer` |
| `.quick-view-link` | Quick view toggle | `.product-card-footer` |

### Breadcrumb Navigation

```html
<nav class="breadcrumb" aria-label="Breadcrumb navigation">
  <ol class="breadcrumb-list">
    <li class="breadcrumb-item">
      <a href="/" class="breadcrumb-link">Home</a>
    </li>
    <li class="breadcrumb-item">
      <span class="breadcrumb-arrow">›</span>
    </li>
    <li class="breadcrumb-item">
      <span class="breadcrumb-current" aria-current="page">Current Page</span>
    </li>
  </ol>
</nav>
```

### Page Header

```html
<header class="page-header">
  <h1 class="page-title">Page Title</h1>
  <p class="page-description">Description text...</p>
</header>
```

### Faceted Search Components

#### Filter Sidebar

```html
<aside class="filters-sidebar">
  <section class="filter-section">
    <h3 class="filter-title">Filter Category</h3>
    <div class="filter-options">
      <label class="filter-option">
        <input type="checkbox">
        <span class="checkbox-custom"></span>
        <span class="filter-label">Option Name</span>
      </label>
    </div>
  </section>
</aside>
```

#### Filter Tags

```html
<div class="active-filters">
  <button class="filter-tag">
    Category: Value ×
  </button>
  <button class="clear-filters-btn">Clear All</button>
</div>
```

---

## 🛠 Utility Classes

### Accessibility Utilities

#### `.sr-only`
Screen reader only - visually hidden but accessible to assistive technology.

```html
<h1 class="sr-only">Page Title for Screen Readers</h1>
```

#### `.skip-link`
Skip to main content link for keyboard navigation.

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

### Layout Utilities

#### `.main-container`
Centered container with max-width.

```html
<div class="main-container">
  <!-- Content -->
</div>
```

**Properties:**
- Max-width: 1248px
- Centered with `margin: 0 auto`

---

## ⚡ State Classes

State classes use the `is-` prefix to indicate dynamic states.

### `.is-flipped`
Applied to `.product-card` to show the back side.

```html
<article class="product-card is-flipped">
  <!-- Shows product-card-back -->
</article>
```

**Effects:**
- Hides `.product-card-front`
- Shows `.product-card-back`
- Changes `.quick-view-link` color to primary
- Swaps visibility icons

---

## 📱 Responsive Breakpoints

Our mobile-first approach uses the following breakpoints:

| Breakpoint | Max Width | Target Devices |
|------------|-----------|----------------|
| Mobile | 480px | Small phones |
| Tablet | 768px | Tablets, large phones |
| Desktop | 1024px | Small laptops |
| Large Desktop | 1248px+ | Desktop monitors |

### Responsive Examples

```css
/* Mobile-first approach */
.component {
  padding: var(--spacing-4); /* Mobile */
}

@media (min-width: 768px) {
  .component {
    padding: var(--spacing-6); /* Tablet+ */
  }
}

@media (min-width: 1024px) {
  .component {
    padding: var(--spacing-8); /* Desktop+ */
  }
}
```

### Responsive Grid Changes

```css
/* Product Cards Grid */
.product-cards {
  /* Mobile: 1 column */
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .product-cards {
    /* Tablet+: Auto-fit with min 260px */
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
}
```

---

## 🎬 Animation & Transitions

### Transition Variables

```css
--transition-fast: 0.2s ease;    /* Quick interactions */
--transition: 0.3s ease;          /* Standard transitions */
```

### Usage

```css
.button {
  transition: background-color var(--transition-fast),
              transform var(--transition-fast);
}

.card {
  transition: box-shadow var(--transition);
}
```

### Performance Tip

Use `will-change` only during interaction:

```css
.animated-element:hover {
  will-change: transform;
  transform: translateY(-2px);
}
```

---

## 🎯 Best Practices

### ✅ Do's

1. **Use CSS Variables**
   ```css
   /* ✅ Good */
   color: var(--text-primary);
   
   /* ❌ Bad */
   color: #333333;
   ```

2. **Use Semantic Class Names**
   ```html
   <!-- ✅ Good -->
   <button class="product-details-btn">Details</button>
   
   <!-- ❌ Bad -->
   <button class="blue-btn">Details</button>
   ```

3. **Follow Spacing Scale**
   ```css
   /* ✅ Good */
   padding: var(--spacing-4);
   
   /* ❌ Bad */
   padding: 17px;
   ```

4. **Use State Classes with Prefixes**
   ```html
   <!-- ✅ Good -->
   <div class="card is-active"></div>
   
   <!-- ❌ Bad -->
   <div class="card active"></div>
   ```

### ❌ Don'ts

1. **Don't Use Inline Styles**
   ```html
   <!-- ❌ Bad -->
   <div style="color: red; margin: 10px;"></div>
   
   <!-- ✅ Good -->
   <div class="error-message"></div>
   ```

2. **Don't Use `!important` Unless Necessary**
   ```css
   /* ❌ Bad */
   .element {
     color: red !important;
   }
   
   /* ✅ Good - Increase specificity */
   .parent .element {
     color: red;
   }
   ```

3. **Don't Skip Heading Levels**
   ```html
   <!-- ❌ Bad -->
   <h1>Title</h1>
   <h3>Subtitle</h3> <!-- Skipped h2 -->
   
   <!-- ✅ Good -->
   <h1>Title</h1>
   <h2>Subtitle</h2>
   ```

---

## 📊 Z-Index Scale

Use these predefined z-index values for consistent layering:

```css
--z-base: 1;          /* Default layer */
--z-close-btn: 10;    /* Close buttons on cards */
--z-skip-link: 100;   /* Skip to content link */
--z-scroll-top: 1000; /* Scroll to top button */
```

**Usage:**
```css
.modal {
  z-index: var(--z-modal);
}
```

---

## 🔧 Browser Support

### CSS Features Used

- CSS Custom Properties (CSS Variables)
- CSS Grid Layout
- Flexbox
- `clamp()` for responsive typography
- CSS `contain` for performance
- `:focus-visible` for accessibility

### Fallbacks

For older browsers, fallbacks are provided:

```css
/* Fallback for browsers without CSS variables */
.button {
  background: #075697; /* Fallback */
  background: var(--primary-color); /* Preferred */
}
```

---

## 📦 File Structure

```
css/
├── common.css        # Shared base styles (reset, variables, utilities)
├── styles.css        # Full styles with comments (development)
└── styles.min.css    # Minified production version (66% smaller)
```

### When to Use Each File

- **Development:** Use `styles.css` (readable, commented)
- **Production:** Use `styles.min.css` (optimized, small)
- **Multi-page projects:** Use `common.css` + page-specific CSS

---

## 🎨 Component Gallery

### Button Styles

```html
<!-- Primary Button -->
<button class="product-details-btn">Details</button>

<!-- Link Button -->
<a href="#" class="quick-view-link">
  <svg class="quick-view-icon visibility-on">...</svg>
  <span>Quick View</span>
</a>

<!-- Filter Button -->
<button class="filter-tag">Category ×</button>

<!-- Clear Button -->
<button class="clear-filters-btn">Clear All</button>
```

### Card Variations

```html
<!-- Standard Card -->
<article class="product-card">...</article>

<!-- Flipped Card -->
<article class="product-card is-flipped">...</article>

<!-- Hovered Card (automatic) -->
<article class="product-card">...</article>
```

---

## 🚀 Performance Tips

1. **Use `contain` for isolated components**
   ```css
   .product-card {
     contain: layout style paint;
   }
   ```

2. **Optimize animations with `will-change`**
   ```css
   .element:hover {
     will-change: transform;
   }
   ```

3. **Use `font-display: swap` for custom fonts**
   ```css
   @font-face {
     font-display: swap;
   }
   ```

4. **Lazy load images**
   ```html
   <img loading="lazy" src="..." alt="...">
   ```

---

## 📖 Quick Reference

### Most Used Classes

```
.product-card              - Product card container
.product-card-front        - Card front side
.product-card-back         - Card back side
.product-details-btn       - Primary button
.quick-view-link           - Quick view toggle
.is-flipped                - Card flip state
.breadcrumb                - Breadcrumb navigation
.page-header               - Page header section
.filters-sidebar           - Filter panel
.filter-tag                - Active filter chip
```

### Most Used Variables

```
var(--primary-color)       - Primary brand color
var(--text-primary)        - Main text color
var(--spacing-4)           - Standard spacing (16px)
var(--font-size-base)      - Body font size (15px)
var(--transition-fast)     - Quick transitions (0.2s)
var(--shadow-sm)           - Small shadow
```

---

## 📞 Support

For questions or contributions:
- **Documentation:** See `/docs` folder
- **Issues:** Report via project repository
- **Updates:** Check CHANGELOG.md for version history

---

**Last Updated:** October 12, 2025  
**Version:** 1.0.0  
**Maintained by:** Product Development Team

