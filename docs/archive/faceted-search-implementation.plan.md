<!-- 52403dfd-f617-4ed0-9283-5b4ac0fca92f 5329a887-079b-4f32-b760-89aa22412bd0 -->
# Simplify Quick View Card Back

## Changes Required

### 1. Update HTML Structure (roof-products.html) ✅ COMPLETE

**Status**: All 15 product cards have been updated with simplified structure.

Removed from `.product-card-back` section:

- ✅ Removed `.quick-view-header` with title and close button
- ✅ Removed `.quick-view-image` wrapper and image
- ✅ Removed `.quick-view-body` wrapper div
- ✅ Removed `.quick-view-details` wrapper div
- ✅ Removed `.quick-view-footer` with back button
- ✅ Keep only: description paragraph, specifications div, certifications div

New simplified structure (implemented):

```html
<div class="product-card-back">
    <div class="quick-view-content">
        <p class="quick-view-description">...</p>
        <div class="quick-view-specs">
            <h4>Performance</h4>
            <ul class="quick-view-list">
                <li>...</li>
            </ul>
        </div>
        <div class="quick-view-certifications">
            <h4>Certifications</h4>
            <ul class="quick-view-list">
                <li>...</li>
            </ul>
        </div>
    </div>
</div>
```

#### Data Attribute Structure

Each product card now uses separate data attributes for **filtering** vs **display**:

**Filter Attributes** (for faceted search - space-separated values):
```html
data-application="special-ventilation restaurant high-temp smoke-control"
data-certifications="amca-air-sound ul-705 high-wind"
data-impeller="centaxial-wheel"
data-drive="belt-drive"
data-housing="spun-aluminum"
data-discharge="downblast"
```

**Display Attributes** (for Quick View - JSON/string values):
```html
data-display-model="G"
data-display-description="GREENHECK G Series roof mounted fans provide reliable performance for various commercial and industrial applications."
data-display-specifications='["50 to 14,500 cfm","Up to 2.75 in. wg"]'
data-display-certifications='["High Wind & Hurricane","Seismic","UL/CUL 705","AMCA licensed for FEI & Air Performance"]'
```

**Key Design Decision**: Filter attributes use slugified, space-separated values for efficient filtering. Display attributes use full names/descriptions for user-facing content. The `data-display-certifications` array contains different values than `data-certifications` to show full certification names vs filter slugs.

### 2. Update CSS Styles (styles.css)

Modify `.quick-view-content` to fill full card:

- Remove flexbox column layout constraints
- Add padding for spacing from edges
- Ensure full height and width usage
- Update text sizing for better readability in full card space

Remove or simplify styles for:

- `.quick-view-header` (no longer needed)
- `.quick-view-title` (no longer needed)
- `.quick-view-close` (no longer needed)
- `.quick-view-image` (no longer needed)
- `.quick-view-footer` (no longer needed)
- `.quick-view-flip-btn` (no longer needed)

Update `.quick-view-description` to remove or increase line clamping since more space is available.

### 3. Update JavaScript (faceted-search.js)

Simplify `populateQuickViewCard` method:

- Remove title element population (no `.quick-view-title` element)
- Remove image element population (no `.quick-view-image` element)
- Keep description, specifications, and certifications population
- Remove event listener for `.quick-view-close` button (no longer exists)
- Remove event listener for `.quick-view-flip-btn` button (no longer exists)
- **Update to use new data attributes**: 
  - Use `data-display-model` instead of parsing JSON
  - Use `data-display-description` for description text
  - Parse `data-display-specifications` JSON array for specs list
  - Parse `data-display-certifications` JSON array for certifications list

Update `hideQuickView` to only be triggered by clicking outside the card or ESC key (remove close button handler).

### 4. Key Files to Modify

- ✅ `/Users/chetan/Documents/CodeProjects/chetan-viamagus-git-repos/product/roof-products.html` - Updated all 15 product cards with simplified structure and data attributes
- `/Users/chetan/Documents/CodeProjects/chetan-viamagus-git-repos/product/styles.css` - Simplify quick-view styles (pending)
- `/Users/chetan/Documents/CodeProjects/chetan-viamagus-git-repos/product/faceted-search.js` - Update populate and event handlers (pending)

## Implementation Status

### Completed ✅

- [x] HTML structure simplification for all 15 product cards
- [x] Data attribute separation (filter vs display attributes)
- [x] Removed `.quick-view-header`, `.quick-view-body`, `.quick-view-details`, `.quick-view-footer` wrappers
- [x] Removed close button and back button from quick view
- [x] Removed image display from quick view back

### Pending ⏳

- [ ] Update CSS styles for simplified quick view layout
  - [ ] Remove/update styles for removed elements (header, image, footer, buttons)
  - [ ] Update `.quick-view-content` to fill full card space
  - [ ] Increase/remove line clamping on `.quick-view-description`
  
- [ ] Update JavaScript `populateQuickViewCard` method
  - [ ] Remove title and image population code
  - [ ] Update to use `data-display-*` attributes instead of JSON parsing
  - [ ] Remove event listeners for `.quick-view-close` and `.quick-view-flip-btn`
  - [ ] Ensure card flip animation still works with simplified structure
  
- [ ] Update JavaScript `hideQuickView` method
  - [ ] Remove close button handler
  - [ ] Keep ESC key and click-outside-card handlers

### Notes

- Total product cards: 15 (4 unique models: G, GB, CUE, CUBE + 11 G variants for demonstration)
- All cards share the same simplified quick view structure
- Filter attributes use slugified values; display attributes use full names
