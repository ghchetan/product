# Faceted Search Implementation

This implementation provides a fully functional faceted search page for GREENHECK Roof products, matching the design and functionality shown in the provided screenshots.

## Files Created

### 1. `roof-products.html`
- Complete HTML page with faceted search layout
- Product cards with data attributes for filtering
- Responsive design matching the screenshots
- SEO-optimized with proper meta tags and structured data

### 2. `faceted-search.js`
- Vanilla JavaScript implementation
- URL parameter support for bookmarkable filters
- localStorage persistence for filter state
- Real-time filtering and result updates
- Quick view popover functionality

### 3. Updated `styles.css`
- Added comprehensive styling for faceted search components
- Responsive design for mobile, tablet, and desktop
- Custom checkbox styling and filter tags
- Quick view popover positioning and animations
- Accessibility features and performance optimizations

## Features Implemented

### ✅ Filtering System
- **Application**: Special Ventilation, Restaurant, High Temp, Smoke Control
- **Certifications**: AMCA Air & Sound, AMCA FEG Sound & Air, UL/CUL 705, etc.
- **Impeller Type**: CentAxial Wheel, Mixed-Flow Wheel, Propeller
- **Drive Type**: Belt Drive, Direct Drive
- **Housing Style**: Spun Aluminum, Fab-H-Hood, Tubular
- **Discharge**: Downblast, Upblast

### ✅ State Management
- URL parameters for bookmarkable filter states
- localStorage persistence when no URL parameters present
- Browser back/forward navigation support
- Real-time filter count updates

### ✅ Quick View Popover
- Inline positioning next to product cards
- Product details, specifications, and certifications
- Smooth animations and transitions
- Click outside or ESC key to close

### ✅ Product Data
- 17 product cards with realistic data attributes
- Multiple product models: G, GB, CUE, CUBE
- Comprehensive filter combinations for testing

### ✅ Responsive Design
- Desktop: 3-column product grid with sidebar
- Tablet: 2-column grid with responsive sidebar
- Mobile: Single column with collapsible sidebar

## Usage

1. Open `roof-products.html` in a web browser
2. Use the left sidebar to apply filters
3. Watch products filter in real-time
4. Click "Quick View" on any product for detailed information
5. Filter states are saved to URL and localStorage
6. Share URLs with applied filters for bookmarking

## Technical Implementation

### Data Attributes
Each product card includes data attributes for filtering:
```html
data-application="restaurant high-temp"
data-certifications="ul-restaurant-exhaust amca-air-sound"
data-impeller="centaxial-wheel"
data-drive="belt-drive"
data-housing="spun-aluminum"
data-discharge="downblast"
data-quickview='{"model":"G","description":"...","specs":["..."],"certifications":["..."]}'
```

### JavaScript Class Structure
- `FacetedSearch` class handles all functionality
- Event delegation for performance
- Modular methods for each feature
- Error handling for localStorage and URL parsing

### CSS Architecture
- CSS custom properties for theming
- Mobile-first responsive design
- Accessibility features (high contrast, reduced motion)
- Performance optimizations (will-change, backface-visibility)

## Browser Compatibility

- Modern browsers with ES6+ support
- CSS Grid and Flexbox support required
- localStorage API support
- URLSearchParams API support

## Performance Features

- Lazy loading for images
- Event delegation for efficient event handling
- CSS animations with GPU acceleration
- Optimized DOM updates for filtering
- Minimal reflows and repaints

## Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences

This implementation provides a production-ready faceted search solution that matches the design requirements while maintaining excellent performance and accessibility standards.
