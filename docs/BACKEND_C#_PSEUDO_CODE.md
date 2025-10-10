# Backend C# Pseudo Code for Product Card Generation

## Overview
This document provides pseudo code and data structure guidance for generating product card HTML server-side in C#.

---

## 1. Data Model Structure

```csharp
// Product Card Data Model
public class ProductCard
{
    // Filter Attributes (for faceted search)
    public string[] Applications { get; set; }        // e.g., ["special-ventilation", "restaurant", "high-temp"]
    public string[] Certifications { get; set; }      // e.g., ["amca-air-sound", "ul-705", "high-wind"]
    public string[] Impeller { get; set; }            // e.g., ["centaxial-wheel", "mixed-flow-wheel", "propeller"]
    public string[] Drive { get; set; }               // e.g., ["belt-drive", "direct-drive"]
    public string[] Housing { get; set; }             // e.g., ["spun-aluminum", "tubular", "fab-h-hood"]
    public string[] Discharge { get; set; }           // e.g., ["downblast", "upblast"]
    
    // Product Information
    public string CategoryName { get; set; }          // e.g., "Exhaust Hoods"
    public string ImagePath { get; set; }             // e.g., "./imgs/prd-1.png"
    public string ImageAlt { get; set; }              // e.g., "Professional exhaust hood system..."
    public int ImageWidth { get; set; }               // e.g., 228
    public int ImageHeight { get; set; }              // e.g., 194
    public string AnchorId { get; set; }              // e.g., "exhaust-hoods" (for URL fragment)
    
    // Product Overview (Back Side)
    public string Description { get; set; }           // Main product description
    public string[] Specifications { get; set; }      // e.g., ["50 to 14,500 cfm", "Up to 2.75 in. wg."]
    public string[] CertificationsList { get; set; }  // e.g., ["High Wind & Hurricane", "Seismic", ...]
}

// Container for all products
public class ProductCatalog
{
    public List<ProductCard> Products { get; set; }
}
```

---

## 2. Helper Functions

```csharp
// Convert array to space-separated data attribute value
public static string ToDataAttribute(string[] values)
{
    if (values == null || values.Length == 0)
        return string.Empty;
    
    return string.Join(" ", values);
}

// Sanitize string for HTML output (prevent XSS)
public static string HtmlEncode(string text)
{
    return System.Web.HttpUtility.HtmlEncode(text);
}

// Generate kebab-case ID from category name
public static string ToKebabCase(string text)
{
    return text.ToLower()
               .Replace(" ", "-")
               .Replace("&", "and");
}
```

---

## 3. Main Generation Logic (Pseudo Code)

```csharp
public string GenerateProductCardsHtml(ProductCatalog catalog)
{
    StringBuilder html = new StringBuilder();
    
    // Start unordered list container
    html.AppendLine("<ul class=\"product-cards\" role=\"list\">");
    
    // Iterate through each product
    foreach (var product in catalog.Products)
    {
        // Start list item
        html.AppendLine("    <li>");
        
        // Generate article with data attributes
        html.AppendLine(GenerateArticleTag(product));
        
        // Generate front side
        html.AppendLine(GenerateFrontSide(product));
        
        // Generate back side
        html.AppendLine(GenerateBackSide(product));
        
        // Close article
        html.AppendLine("            </article>");
        html.AppendLine("        </li>");
        html.AppendLine();
    }
    
    // Close unordered list
    html.AppendLine("                </ul>");
    
    return html.ToString();
}
```

---

## 4. Article Tag Generation

```csharp
private string GenerateArticleTag(ProductCard product)
{
    StringBuilder tag = new StringBuilder();
    
    tag.Append("        <article ");
    
    // Add data attributes for filtering
    if (product.Applications?.Length > 0)
        tag.Append($"data-application=\"{ToDataAttribute(product.Applications)}\" ");
    
    if (product.Certifications?.Length > 0)
        tag.Append($"data-certifications=\"{ToDataAttribute(product.Certifications)}\" ");
    
    if (product.Impeller?.Length > 0)
        tag.Append($"data-impeller=\"{ToDataAttribute(product.Impeller)}\" ");
    
    if (product.Drive?.Length > 0)
        tag.Append($"data-drive=\"{ToDataAttribute(product.Drive)}\" ");
    
    if (product.Housing?.Length > 0)
        tag.Append($"data-housing=\"{ToDataAttribute(product.Housing)}\" ");
    
    if (product.Discharge?.Length > 0)
        tag.Append($"data-discharge=\"{ToDataAttribute(product.Discharge)}\" ");
    
    // Add class and schema.org attributes
    tag.Append("class=\"product-card\" ");
    tag.Append("itemscope itemtype=\"https://schema.org/Product\">");
    
    return tag.ToString();
}
```

---

## 5. Front Side Generation

```csharp
private string GenerateFrontSide(ProductCard product)
{
    string anchorId = product.AnchorId ?? ToKebabCase(product.CategoryName);
    string encodedCategory = HtmlEncode(product.CategoryName);
    string encodedAlt = HtmlEncode(product.ImageAlt);
    
    StringBuilder html = new StringBuilder();
    
    html.AppendLine("                <!-- Front side -->");
    html.AppendLine("                <div class=\"product-card-front\">");
    html.AppendLine($"                    <h3 class=\"product-category\" itemprop=\"category\">{encodedCategory}</h3>");
    html.AppendLine("                    <div class=\"product-image-container\">");
    html.AppendLine($"                        <img src=\"{product.ImagePath}\" " +
                    $"alt=\"{encodedAlt}\" " +
                    $"class=\"product-image\" " +
                    $"itemprop=\"image\" " +
                    $"width=\"{product.ImageWidth}\" " +
                    $"height=\"{product.ImageHeight}\" " +
                    $"loading=\"lazy\">");
    html.AppendLine("                    </div>");
    html.AppendLine($"                    <meta itemprop=\"name\" content=\"{encodedCategory}\">");
    html.AppendLine($"                    <meta itemprop=\"description\" content=\"{HtmlEncode(product.Description)}\">");
    html.AppendLine($"                    <button class=\"product-details-btn\" aria-label=\"View details for {encodedCategory}\">Details</button>");
    html.AppendLine($"                    <a href=\"#{anchorId}\" class=\"quick-view-link\" aria-label=\"Quick view of {encodedCategory}\">");
    
    // Add SVG icons (visibility-off and visibility-on)
    html.AppendLine(GetVisibilityOffSvg());
    html.AppendLine(GetVisibilityOnSvg());
    
    html.AppendLine("                        <span>Quick View</span>");
    html.AppendLine("                    </a>");
    html.AppendLine("                </div>");
    
    return html.ToString();
}
```

---

## 6. Back Side Generation

```csharp
private string GenerateBackSide(ProductCard product)
{
    StringBuilder html = new StringBuilder();
    
    html.AppendLine("                <!-- Back side (product overview) -->");
    html.AppendLine("                <div class=\"product-card-back\">");
    
    // Description
    html.AppendLine("                    <p class=\"product-overview-description\">");
    html.AppendLine($"                        {HtmlEncode(product.Description)}");
    html.AppendLine("                    </p>");
    
    // Specifications
    if (product.Specifications?.Length > 0)
    {
        html.AppendLine("                    <ul class=\"product-overview-specs\">");
        foreach (var spec in product.Specifications)
        {
            html.AppendLine($"                        <li>{HtmlEncode(spec)}</li>");
        }
        html.AppendLine("                    </ul>");
    }
    
    // Certifications
    if (product.CertificationsList?.Length > 0)
    {
        html.AppendLine("                    <div class=\"product-overview-certifications\">");
        html.AppendLine("                        <h4>Certifications:</h4>");
        html.AppendLine("                        <ul>");
        foreach (var cert in product.CertificationsList)
        {
            html.AppendLine($"                            <li>{HtmlEncode(cert)}</li>");
        }
        html.AppendLine("                        </ul>");
        html.AppendLine("                    </div>");
    }
    
    html.AppendLine("                </div>");
    
    return html.ToString();
}
```

---

## 7. SVG Icon Generation

```csharp
// Visibility Off Icon (eye with slash)
private string GetVisibilityOffSvg()
{
    return @"                        <svg class=""quick-view-icon visibility-off"" aria-hidden=""true"" viewBox=""0 0 15 14"">
                            <path fill=""var(--primary-color)""
                                d=""M10.295 7.424 9.307 6.4q.153-.83-.46-1.556-.614-.724-1.586-.565l-.988-1.025q.29-.142.588-.213.298-.07.639-.07 1.279 0 2.173.928.895.927.895 2.254 0 .353-.068.662t-.205.61m2.182 2.228-.988-.99a7.6 7.6 0 0 0 1.15-1.123q.503-.61.861-1.387-.853-1.785-2.446-2.838Q9.46 2.264 7.5 2.263q-.494 0-.972.07-.477.07-.937.212L4.534 1.45A7.4 7.4 0 0 1 7.5.85q2.574 0 4.585 1.475A8.37 8.37 0 0 1 15 6.152a8.4 8.4 0 0 1-1.031 1.935 7.7 7.7 0 0 1-1.492 1.565M12.818 14l-2.863-2.934q-.597.195-1.202.291a8 8 0 0 1-1.253.098q-2.574 0-4.585-1.476A8.37 8.37 0 0 1 0 6.152q.359-.937.903-1.742a8 8 0 0 1 1.245-1.44L.273.99 1.227 0l12.546 13.01zM3.102 3.96q-.494.46-.903 1.007T1.5 6.152q.853 1.784 2.446 2.837Q5.54 10.039 7.5 10.04q.34 0 .665-.044.323-.045.665-.097l-.614-.672a3 3 0 0 1-.358.08 2.9 2.9 0 0 1-2.531-.902q-.895-.928-.895-2.253 0-.195.025-.372t.077-.37z"" />
                        </svg>";
}

// Visibility On Icon (eye)
private string GetVisibilityOnSvg()
{
    return @"                        <svg class=""quick-view-icon visibility-on"" aria-hidden=""true"" viewBox=""0 0 15 10"">
                            <path
                                d=""M7.5 8q1.279 0 2.173-.875A2.86 2.86 0 0 0 10.568 5a2.86 2.86 0 0 0-.895-2.125Q8.78 2 7.5 2t-2.173.875A2.86 2.86 0 0 0 4.432 5q0 1.25.895 2.125Q6.22 8 7.5 8m0-1.2q-.767 0-1.304-.525A1.72 1.72 0 0 1 5.659 5q0-.75.537-1.275T7.5 3.2t1.304.525T9.341 5t-.537 1.275T7.5 6.8m0 3.2a8 8 0 0 1-4.534-1.358A7.76 7.76 0 0 1 0 5a7.76 7.76 0 0 1 2.966-3.642A8 8 0 0 1 7.5 0q2.489 0 4.534 1.358A7.76 7.76 0 0 1 15 5a7.76 7.76 0 0 1-2.966 3.642A8 8 0 0 1 7.5 10m0-1.333q1.926 0 3.537-.992A6.57 6.57 0 0 0 13.5 5a6.57 6.57 0 0 0-2.463-2.675A6.6 6.6 0 0 0 7.5 1.333q-1.926 0-3.537.992A6.57 6.57 0 0 0 1.5 5a6.57 6.57 0 0 0 2.463 2.675 6.6 6.6 0 0 0 3.537.992"" />
                        </svg>";
}
```

---

## 8. Complete Usage Example

```csharp
public class ProductCardController
{
    public string RenderProductCards()
    {
        // Step 1: Fetch data from database
        var catalog = GetProductsFromDatabase();
        
        // Step 2: Generate HTML
        var htmlGenerator = new ProductCardHtmlGenerator();
        string productCardsHtml = htmlGenerator.GenerateProductCardsHtml(catalog);
        
        // Step 3: Return or embed in page
        return productCardsHtml;
    }
    
    private ProductCatalog GetProductsFromDatabase()
    {
        // Example data structure
        return new ProductCatalog
        {
            Products = new List<ProductCard>
            {
                new ProductCard
                {
                    // Filter attributes
                    Applications = new[] { "special-ventilation", "restaurant", "high-temp", "smoke-control" },
                    Certifications = new[] { "amca-air-sound", "ul-705", "high-wind" },
                    Impeller = new[] { "centaxial-wheel" },
                    Drive = new[] { "belt-drive" },
                    Housing = new[] { "spun-aluminum" },
                    Discharge = new[] { "downblast" },
                    
                    // Product information
                    CategoryName = "Exhaust Hoods",
                    ImagePath = "./imgs/prd-1.png",
                    ImageAlt = "Professional exhaust hood system for industrial ventilation",
                    ImageWidth = 228,
                    ImageHeight = 194,
                    AnchorId = "exhaust-hoods",
                    
                    // Product overview
                    Description = "The model G is a direct drive, spun aluminum fan, designed for roof mounting on a curb for general, clean air exhaust applications. Units feature a spun aluminum housing.",
                    Specifications = new[]
                    {
                        "50 to 14,500 cfm",
                        "Up to 2.75 in. wg."
                    },
                    CertificationsList = new[]
                    {
                        "High Wind & Hurricane",
                        "Seismic",
                        "UL/cUL 705",
                        "AMCA licensed for FEI & Air Performance",
                        "Additional Bullet",
                        "Additional Bullet",
                        "Additional Bullet"
                    }
                }
                // ... add more products
            }
        };
    }
}
```

---

## 9. Data Attribute Format Requirements

### CRITICAL: Multi-Value Formatting
All filter attributes MUST be formatted as **space-separated values** in lowercase with hyphens:

```csharp
// ✅ CORRECT - Space-separated, kebab-case
data-application="special-ventilation restaurant high-temp smoke-control"
data-certifications="amca-air-sound ul-705 high-wind"

// ❌ WRONG - Comma-separated
data-application="special-ventilation,restaurant,high-temp"

// ❌ WRONG - Array/JSON format
data-application="['special-ventilation', 'restaurant']"
```

### Filter Attribute Values Reference

**Application Values:**
- `special-ventilation`
- `restaurant`
- `high-temp`
- `smoke-control`

**Certification Values:**
- `amca-air-sound`
- `amca-feg-sound-air`
- `ul-705`
- `ul-restaurant-exhaust`
- `ul-smoke-control`
- `high-wind`
- `miami-dade`
- `oshpd`

**Impeller Values:**
- `centaxial-wheel`
- `mixed-flow-wheel`
- `propeller`

**Drive Values:**
- `belt-drive`
- `direct-drive`

**Housing Values:**
- `spun-aluminum`
- `tubular`
- `fab-h-hood`

**Discharge Values:**
- `downblast`
- `upblast`

---

## 10. Database Schema Suggestion

```sql
-- Products table
CREATE TABLE Products (
    ProductId INT PRIMARY KEY IDENTITY(1,1),
    CategoryName NVARCHAR(100) NOT NULL,
    ImagePath NVARCHAR(255) NOT NULL,
    ImageAlt NVARCHAR(500) NOT NULL,
    ImageWidth INT NOT NULL DEFAULT 228,
    ImageHeight INT NOT NULL DEFAULT 194,
    AnchorId NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    CreatedDate DATETIME DEFAULT GETDATE(),
    IsActive BIT DEFAULT 1
);

-- Product Specifications (many-to-many)
CREATE TABLE ProductSpecifications (
    SpecId INT PRIMARY KEY IDENTITY(1,1),
    ProductId INT FOREIGN KEY REFERENCES Products(ProductId),
    SpecificationText NVARCHAR(200) NOT NULL,
    SortOrder INT DEFAULT 0
);

-- Product Certifications (many-to-many)
CREATE TABLE ProductCertifications (
    CertId INT PRIMARY KEY IDENTITY(1,1),
    ProductId INT FOREIGN KEY REFERENCES Products(ProductId),
    CertificationText NVARCHAR(200) NOT NULL,
    SortOrder INT DEFAULT 0
);

-- Filter attributes (many-to-many for each type)
CREATE TABLE ProductApplications (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ProductId INT FOREIGN KEY REFERENCES Products(ProductId),
    ApplicationValue NVARCHAR(50) NOT NULL
);

CREATE TABLE ProductCertificationFilters (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ProductId INT FOREIGN KEY REFERENCES Products(ProductId),
    CertificationValue NVARCHAR(50) NOT NULL
);

-- Similar tables for Impeller, Drive, Housing, Discharge...
```

---

## 11. Important Notes for Backend Team

### ✅ DO:
1. **Always HTML encode** user-generated content to prevent XSS attacks
2. **Use space-separated values** for data attributes (not commas or JSON)
3. **Use kebab-case** for all data attribute values (lowercase with hyphens)
4. **Include all schema.org microdata** attributes (`itemprop`, `itemscope`, `itemtype`)
5. **Set image dimensions** (`width` and `height`) to prevent layout shift
6. **Use `loading="lazy"`** on all product images
7. **Generate descriptive `alt` text** for all images
8. **Include `aria-label`** on buttons and links for accessibility
9. **Maintain consistent indentation** (4 spaces) for readability

### ❌ DON'T:
1. Don't forget to encode HTML special characters
2. Don't use inline styles (all styling is in external CSS)
3. Don't skip accessibility attributes (`aria-label`, `alt`, `role`)
4. Don't hard-code SVG `fill` colors (use CSS variables or `var(--primary-color)`)
5. Don't change the HTML structure or class names (frontend JavaScript depends on them)
6. Don't add extra wrapper divs (structure is optimized)

### 🔍 Testing Checklist:
- [ ] HTML validates (no syntax errors)
- [ ] All data attributes are space-separated
- [ ] All images have width, height, alt attributes
- [ ] All buttons have aria-label
- [ ] Schema.org microdata is complete
- [ ] HTML is properly indented
- [ ] No XSS vulnerabilities (all content encoded)

---

## 12. Output Example

The final HTML output should look exactly like this:

```html
<ul class="product-cards" role="list">
    <li>
        <article data-application="special-ventilation restaurant high-temp smoke-control" 
                 data-certifications="amca-air-sound ul-705 high-wind" 
                 data-impeller="centaxial-wheel" 
                 data-drive="belt-drive" 
                 data-housing="spun-aluminum" 
                 data-discharge="downblast" 
                 class="product-card" 
                 itemscope 
                 itemtype="https://schema.org/Product">
            <!-- Front side -->
            <div class="product-card-front">
                <h3 class="product-category" itemprop="category">Exhaust Hoods</h3>
                <div class="product-image-container">
                    <img src="./imgs/prd-1.png" 
                         alt="Professional exhaust hood system for industrial ventilation" 
                         class="product-image" 
                         itemprop="image" 
                         width="228" 
                         height="194" 
                         loading="lazy">
                </div>
                <meta itemprop="name" content="Exhaust Hoods">
                <meta itemprop="description" content="Professional exhaust hood systems for industrial ventilation">
                <button class="product-details-btn" aria-label="View details for Exhaust Hoods">Details</button>
                <a href="#exhaust-hoods" class="quick-view-link" aria-label="Quick view of Exhaust Hoods">
                    <!-- SVG icons here -->
                    <span>Quick View</span>
                </a>
            </div>
            <!-- Back side -->
            <div class="product-card-back">
                <p class="product-overview-description">
                    The model G is a direct drive, spun aluminum fan, designed for roof mounting...
                </p>
                <ul class="product-overview-specs">
                    <li>50 to 14,500 cfm</li>
                    <li>Up to 2.75 in. wg.</li>
                </ul>
                <div class="product-overview-certifications">
                    <h4>Certifications:</h4>
                    <ul>
                        <li>High Wind & Hurricane</li>
                        <li>Seismic</li>
                        <li>UL/cUL 705</li>
                    </ul>
                </div>
            </div>
        </article>
    </li>
    <!-- More product cards... -->
</ul>
```

---

## 13. Contact & Questions

If the backend team has questions about:
- **HTML structure**: Refer to `roof-products.html` for complete examples
- **CSS classes**: Refer to `.cursorrules` for class naming conventions
- **JavaScript integration**: Refer to `js/faceted-search.js` for how filters work
- **Data attributes**: See section 9 above for complete list of valid values

---

**Document Version:** 1.0  
**Last Updated:** October 10, 2025  
**Author:** Frontend Team

