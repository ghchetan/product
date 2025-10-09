# Backend Integration Guide - Product Card Component

## 📋 Overview

This guide explains how the backend team can generate HTML for the product card component with Quick View modal functionality.

## 🎯 Data Structure

Each product card requires the following data attributes on the Quick View link:

### Required Data Attributes

```html
<a href="#product-id" 
   class="quick-view-link" 
   aria-label="Quick view of Product Name"
   data-desc="Product description as string"
   data-spec='["Spec 1", "Spec 2", "Spec 3"]'
   data-cert='["Certification 1", "Certification 2", "Certification 3"]'>
```

### Data Attribute Details

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `data-desc` | String | Product description | `"The model G is a direct drive..."` |
| `data-spec` | JSON String | Array of specifications | `'["50 to 14,500 cfm", "Up to 2.75 in. wg."]'` |
| `data-cert` | JSON String | Array of certifications | `'["UL/cUL 705", "AMCA licensed"]'` |

---

## 🔧 Backend Implementation Examples

### PHP Example

```php
<?php
function generateProductCard($product) {
    $specsJson = json_encode($product['specs']);
    $certsJson = json_encode($product['certifications']);
    
    return '
    <article class="product-card" itemscope itemtype="https://schema.org/Product">
        <h2 class="product-category" itemprop="category">' . htmlspecialchars($product['category']) . '</h2>
        <div class="product-image-container">
            <img src="' . htmlspecialchars($product['image']) . '" 
                 alt="' . htmlspecialchars($product['alt']) . '" 
                 class="product-image" 
                 itemprop="image" 
                 width="228" 
                 height="194" 
                 loading="lazy">
        </div>
        <meta itemprop="name" content="' . htmlspecialchars($product['name']) . '">
        <meta itemprop="description" content="' . htmlspecialchars($product['description']) . '">
        <button class="product-details-btn" aria-label="View details for ' . htmlspecialchars($product['name']) . '">Details</button>
        <a href="#' . htmlspecialchars($product['id']) . '" 
           class="quick-view-link" 
           aria-label="Quick view of ' . htmlspecialchars($product['name']) . '"
           data-desc="' . htmlspecialchars($product['description']) . '"
           data-spec=\'' . htmlspecialchars($specsJson) . '\'
           data-cert=\'' . htmlspecialchars($certsJson) . '\'>
            <svg class="quick-view-icon" aria-hidden="true" viewBox="0 0 15 10">
                <path d="M7.5 8q1.279 0 2.173-.875A2.86 2.86 0 0 0 10.568 5a2.86 2.86 0 0 0-.895-2.125Q8.78 2 7.5 2t-2.173.875A2.86 2.86 0 0 0 4.432 5q0 1.25.895 2.125Q6.22 8 7.5 8m0-1.2q-.767 0-1.304-.525A1.72 1.72 0 0 1 5.659 5q0-.75.537-1.275T7.5 3.2t1.304.525T9.341 5t-.537 1.275T7.5 6.8m0 3.2a8 8 0 0 1-4.534-1.358A7.76 7.76 0 0 1 0 5a7.76 7.76 0 0 1 2.966-3.642A8 8 0 0 1 7.5 0q2.489 0 4.534 1.358A7.76 7.76 0 0 1 15 5a7.76 7.76 0 0 1-2.966 3.642A8 8 0 0 1 7.5 10m0-1.333q1.926 0 3.537-.992A6.57 6.57 0 0 0 13.5 5a6.57 6.57 0 0 0-2.463-2.675A6.6 6.6 0 0 0 7.5 1.333q-1.926 0-3.537.992A6.57 6.57 0 0 0 1.5 5a6.57 6.57 0 0 0 2.463 2.675 6.6 6.6 0 0 0 3.537.992"/>
            </svg>
            <span>Quick View</span>
        </a>
    </article>';
}

// Example usage
$product = [
    'id' => 'exhaust-hoods',
    'name' => 'Model G Exhaust Hoods',
    'category' => 'Exhaust Hoods',
    'description' => 'The model G is a direct drive, spun aluminum fan, designed for roof mounting on a curb for general, clean air exhaust applications.',
    'image' => './imgs/prd-1.png',
    'alt' => 'Professional exhaust hood system for industrial ventilation',
    'specs' => [
        '50 to 14,500 cfm',
        'Up to 2.75 in. wg.'
    ],
    'certifications' => [
        'High Wind & Hurricane',
        'Seismic',
        'UL/cUL 705',
        'AMCA licensed for FEI & Air Performance'
    ]
];

echo generateProductCard($product);
?>
```

### Node.js/Express Example

```javascript
function generateProductCard(product) {
    const specsJson = JSON.stringify(product.specs);
    const certsJson = JSON.stringify(product.certifications);
    
    return `
    <article class="product-card" itemscope itemtype="https://schema.org/Product">
        <h2 class="product-category" itemprop="category">${escapeHtml(product.category)}</h2>
        <div class="product-image-container">
            <img src="${escapeHtml(product.image)}" 
                 alt="${escapeHtml(product.alt)}" 
                 class="product-image" 
                 itemprop="image" 
                 width="228" 
                 height="194" 
                 loading="lazy">
        </div>
        <meta itemprop="name" content="${escapeHtml(product.name)}">
        <meta itemprop="description" content="${escapeHtml(product.description)}">
        <button class="product-details-btn" aria-label="View details for ${escapeHtml(product.name)}">Details</button>
        <a href="#${escapeHtml(product.id)}" 
           class="quick-view-link" 
           aria-label="Quick view of ${escapeHtml(product.name)}"
           data-desc="${escapeHtml(product.description)}"
           data-spec='${escapeHtml(specsJson)}'
           data-cert='${escapeHtml(certsJson)}'>
            <svg class="quick-view-icon" aria-hidden="true" viewBox="0 0 15 10">
                <path d="M7.5 8q1.279 0 2.173-.875A2.86 2.86 0 0 0 10.568 5a2.86 2.86 0 0 0-.895-2.125Q8.78 2 7.5 2t-2.173.875A2.86 2.86 0 0 0 4.432 5q0 1.25.895 2.125Q6.22 8 7.5 8m0-1.2q-.767 0-1.304-.525A1.72 1.72 0 0 1 5.659 5q0-.75.537-1.275T7.5 3.2t1.304.525T9.341 5t-.537 1.275T7.5 6.8m0 3.2a8 8 0 0 1-4.534-1.358A7.76 7.76 0 0 1 0 5a7.76 7.76 0 0 1 2.966-3.642A8 8 0 0 1 7.5 0q2.489 0 4.534 1.358A7.76 7.76 0 0 1 15 5a7.76 7.76 0 0 1-2.966 3.642A8 8 0 0 1 7.5 10m0-1.333q1.926 0 3.537-.992A6.57 6.57 0 0 0 13.5 5a6.57 6.57 0 0 0-2.463-2.675A6.6 6.6 0 0 0 7.5 1.333q-1.926 0-3.537.992A6.57 6.57 0 0 0 1.5 5a6.57 6.57 0 0 0 2.463 2.675 6.6 6.6 0 0 0 3.537.992"/>
            </svg>
            <span>Quick View</span>
        </a>
    </article>`;
}

// Helper function for HTML escaping
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Example usage
const product = {
    id: 'exhaust-hoods',
    name: 'Model G Exhaust Hoods',
    category: 'Exhaust Hoods',
    description: 'The model G is a direct drive, spun aluminum fan, designed for roof mounting on a curb for general, clean air exhaust applications.',
    image: './imgs/prd-1.png',
    alt: 'Professional exhaust hood system for industrial ventilation',
    specs: [
        '50 to 14,500 cfm',
        'Up to 2.75 in. wg.'
    ],
    certifications: [
        'High Wind & Hurricane',
        'Seismic',
        'UL/cUL 705',
        'AMCA licensed for FEI & Air Performance'
    ]
};

console.log(generateProductCard(product));
```

### Python/Django Example

```python
import json
from django.utils.html import escape

def generate_product_card(product):
    specs_json = json.dumps(product['specs'])
    certs_json = json.dumps(product['certifications'])
    
    return f'''
    <article class="product-card" itemscope itemtype="https://schema.org/Product">
        <h2 class="product-category" itemprop="category">{escape(product['category'])}</h2>
        <div class="product-image-container">
            <img src="{escape(product['image'])}" 
                 alt="{escape(product['alt'])}" 
                 class="product-image" 
                 itemprop="image" 
                 width="228" 
                 height="194" 
                 loading="lazy">
        </div>
        <meta itemprop="name" content="{escape(product['name'])}">
        <meta itemprop="description" content="{escape(product['description'])}">
        <button class="product-details-btn" aria-label="View details for {escape(product['name'])}">Details</button>
        <a href="#{escape(product['id'])}" 
           class="quick-view-link" 
           aria-label="Quick view of {escape(product['name'])}"
           data-desc="{escape(product['description'])}"
           data-spec='{escape(specs_json)}'
           data-cert='{escape(certs_json)}'>
            <svg class="quick-view-icon" aria-hidden="true" viewBox="0 0 15 10">
                <path d="M7.5 8q1.279 0 2.173-.875A2.86 2.86 0 0 0 10.568 5a2.86 2.86 0 0 0-.895-2.125Q8.78 2 7.5 2t-2.173.875A2.86 2.86 0 0 0 4.432 5q0 1.25.895 2.125Q6.22 8 7.5 8m0-1.2q-.767 0-1.304-.525A1.72 1.72 0 0 1 5.659 5q0-.75.537-1.275T7.5 3.2t1.304.525T9.341 5t-.537 1.275T7.5 6.8m0 3.2a8 8 0 0 1-4.534-1.358A7.76 7.76 0 0 1 0 5a7.76 7.76 0 0 1 2.966-3.642A8 8 0 0 1 7.5 0q2.489 0 4.534 1.358A7.76 7.76 0 0 1 15 5a7.76 7.76 0 0 1-2.966 3.642A8 8 0 0 1 7.5 10m0-1.333q1.926 0 3.537-.992A6.57 6.57 0 0 0 13.5 5a6.57 6.57 0 0 0-2.463-2.675A6.6 6.6 0 0 0 7.5 1.333q-1.926 0-3.537.992A6.57 6.57 0 0 0 1.5 5a6.57 6.57 0 0 0 2.463 2.675 6.6 6.6 0 0 0 3.537.992"/>
            </svg>
            <span>Quick View</span>
        </a>
    </article>'''

# Example usage
product = {
    'id': 'exhaust-hoods',
    'name': 'Model G Exhaust Hoods',
    'category': 'Exhaust Hoods',
    'description': 'The model G is a direct drive, spun aluminum fan, designed for roof mounting on a curb for general, clean air exhaust applications.',
    'image': './imgs/prd-1.png',
    'alt': 'Professional exhaust hood system for industrial ventilation',
    'specs': [
        '50 to 14,500 cfm',
        'Up to 2.75 in. wg.'
    ],
    'certifications': [
        'High Wind & Hurricane',
        'Seismic',
        'UL/cUL 705',
        'AMCA licensed for FEI & Air Performance'
    ]
}

print(generate_product_card(product))
```

---

## 📊 Database Schema Example

### Products Table

```sql
CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255) NOT NULL,
    specs JSON NOT NULL,
    certifications JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Example insert
INSERT INTO products (id, name, category, description, image_url, alt_text, specs, certifications) VALUES 
('exhaust-hoods', 'Model G Exhaust Hoods', 'Exhaust Hoods', 
 'The model G is a direct drive, spun aluminum fan, designed for roof mounting on a curb for general, clean air exhaust applications.',
 './imgs/prd-1.png', 'Professional exhaust hood system for industrial ventilation',
 '["50 to 14,500 cfm", "Up to 2.75 in. wg."]',
 '["High Wind & Hurricane", "Seismic", "UL/cUL 705", "AMCA licensed for FEI & Air Performance"]');
```

---

## ✅ Implementation Checklist

### Backend Requirements
- [ ] **Data Structure**: Ensure product data includes description, specs array, certifications array
- [ ] **JSON Encoding**: Convert arrays to JSON strings for data attributes
- [ ] **HTML Escaping**: Escape all user data to prevent XSS
- [ ] **Schema.org**: Include proper microdata attributes
- [ ] **Accessibility**: Include proper ARIA labels and alt text

### Frontend Integration
- [ ] **CSS**: Include modal styles (already in card.html)
- [ ] **JavaScript**: Include modal functionality (already in card.html)
- [ ] **SVG Icon**: Include the visibility SVG icon (already in card.html)
- [ ] **Testing**: Test modal functionality with generated HTML

---

## 🔧 Testing

### Manual Testing
1. Generate HTML using your backend code
2. Include the CSS and JavaScript from card.html
3. Click "Quick View" links
4. Verify modal opens with correct data
5. Test closing modal (X button, ESC key, click outside)

### Automated Testing
```javascript
// Example test for data attributes
function testProductCard(productElement) {
    const link = productElement.querySelector('.quick-view-link');
    
    // Test data attributes exist
    assert(link.hasAttribute('data-desc'), 'data-desc attribute missing');
    assert(link.hasAttribute('data-spec'), 'data-spec attribute missing');
    assert(link.hasAttribute('data-cert'), 'data-cert attribute missing');
    
    // Test JSON parsing
    try {
        JSON.parse(link.getAttribute('data-spec'));
        JSON.parse(link.getAttribute('data-cert'));
    } catch (e) {
        assert(false, 'Invalid JSON in data attributes');
    }
}
```

---

## 🎯 Key Benefits

### For Backend Team
- ✅ **Simple Integration**: Just add 3 data attributes
- ✅ **No JavaScript Changes**: Frontend handles all modal logic
- ✅ **Flexible Data**: Easy to add/remove specs and certifications
- ✅ **Database Friendly**: JSON columns for arrays
- ✅ **SEO Friendly**: Schema.org microdata included

### For Frontend Team
- ✅ **No Backend Dependencies**: Works with any HTML structure
- ✅ **Maintainable**: Clear separation of data and presentation
- ✅ **Extensible**: Easy to add new data attributes
- ✅ **Performance**: No external API calls needed

---

## 🚀 Quick Start

1. **Copy the modal CSS and JavaScript** from card.html
2. **Generate product cards** with the 3 required data attributes
3. **Test the modal functionality**
4. **Customize styling** as needed for your brand

---

## 📞 Support

For questions about implementation:
- Check the working example in `card.html`
- Test with the provided server: `node test-server.js`
- Verify data attribute format matches examples above

**The component is ready for production use! 🎉**
