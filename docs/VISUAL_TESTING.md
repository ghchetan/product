# 👁️ Visual Testing & QA Guide

**Version:** 1.0.0  
**Last Updated:** October 12, 2025

> Comprehensive testing checklist and visual regression testing guide for the Kitchen Ventilation Systems project.

---

## 📑 Table of Contents

1. [Pre-Flight Checklist](#pre-flight-checklist)
2. [Browser Testing](#browser-testing)
3. [Device Testing](#device-testing)
4. [Lighthouse Testing](#lighthouse-testing)
5. [Accessibility Testing](#accessibility-testing)
6. [Visual Regression Testing](#visual-regression-testing)
7. [Manual Testing Scenarios](#manual-testing-scenarios)
8. [Common Issues & Solutions](#common-issues--solutions)

---

## ✅ Pre-Flight Checklist

Before deploying or submitting, verify:

### Code Quality
- [ ] HTML validates (W3C validator: https://validator.w3.org/)
- [ ] CSS validates (W3C CSS validator: https://jigsaw.w3.org/css-validator/)
- [ ] No console errors in browser DevTools
- [ ] No console warnings related to your code
- [ ] All links work and go to correct destinations
- [ ] All images load and have proper alt text
- [ ] No broken or missing assets

### Performance
- [ ] Images are optimized (WebP format preferred)
- [ ] Images have width/height attributes to prevent layout shift
- [ ] CSS is minified for production (`styles.min.css`)
- [ ] No render-blocking resources
- [ ] Fonts load with `font-display: swap`
- [ ] Total page size < 1MB
- [ ] First Contentful Paint < 1.8s

### SEO
- [ ] All pages have unique `<title>` tags
- [ ] Meta descriptions are present and descriptive
- [ ] Heading hierarchy is correct (one h1, proper nesting)
- [ ] Schema.org markup is valid
- [ ] Open Graph tags are present
- [ ] Canonical URLs are set
- [ ] Sitemap exists (if multi-page)

### Accessibility
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA (4.5:1 for normal text)
- [ ] All images have descriptive alt text
- [ ] ARIA labels present where needed
- [ ] Skip to main content link works
- [ ] No keyboard traps
- [ ] Screen reader tested (VoiceOver/NVDA)

---

## 🌐 Browser Testing

### Required Browsers (Desktop)

Test in the following browsers:

#### Chrome (Latest)
- [ ] Layout renders correctly
- [ ] All interactions work (clicks, hovers)
- [ ] Product card flip works
- [ ] Quick view toggle functions
- [ ] ESC key closes flipped cards
- [ ] CSS Grid renders properly
- [ ] Fonts load correctly

#### Firefox (Latest)
- [ ] Same as Chrome checklist above
- [ ] SVG icons render correctly
- [ ] Focus outlines are visible

#### Safari (Latest)
- [ ] Same as Chrome checklist above
- [ ] Webkit-specific prefixes work
- [ ] Font smoothing looks good
- [ ] Scrolling is smooth

#### Edge (Latest - Chromium)
- [ ] Same as Chrome checklist above
- [ ] No Edge-specific rendering issues

### Optional Browsers

#### Safari (iOS)
- [ ] Touch interactions work
- [ ] Tap highlights are appropriate
- [ ] Cards flip on tap

#### Samsung Internet
- [ ] Renders correctly on Samsung devices

### How to Test Multiple Browsers

1. **Use Browser DevTools**
   - Open DevTools (F12)
   - Check Console for errors
   - Check Network tab for failed requests
   - Use Device Mode for responsive testing

2. **Use BrowserStack** (recommended for comprehensive testing)
   - URL: https://www.browserstack.com/
   - Test across multiple browsers/OS combinations

3. **Use Browser Sync** for local testing
   ```bash
   npm install -g browser-sync
   cd /path/to/project
   browser-sync start --server --files "**/*.html, **/*.css, **/*.js"
   ```

---

## 📱 Device Testing

### Responsive Breakpoints

Test at these specific viewport sizes:

| Device Class | Width | Height | Breakpoint |
|--------------|-------|--------|------------|
| Mobile (Small) | 320px | 568px | `max-width: 480px` |
| Mobile (Standard) | 375px | 667px | `max-width: 480px` |
| Mobile (Large) | 414px | 896px | `max-width: 480px` |
| Tablet (Portrait) | 768px | 1024px | `max-width: 768px` |
| Tablet (Landscape) | 1024px | 768px | `max-width: 1024px` |
| Desktop (Small) | 1280px | 720px | Normal |
| Desktop (Standard) | 1920px | 1080px | Normal |
| Desktop (Large) | 2560px | 1440px | Normal |

### Device Testing Checklist

#### Mobile (320px - 480px)
- [ ] Product cards stack in single column
- [ ] Text is readable (not too small)
- [ ] Buttons are tappable (min 44x44px)
- [ ] Images scale properly
- [ ] No horizontal scrolling
- [ ] Product card fits on screen
- [ ] Touch targets have adequate spacing
- [ ] Card flip works on touch

#### Tablet (768px - 1024px)
- [ ] Product cards display 2-3 per row
- [ ] Sidebar is accessible
- [ ] Filters work correctly
- [ ] Layout doesn't look cramped
- [ ] Landscape orientation works

#### Desktop (1024px+)
- [ ] Product cards display 3-4 per row
- [ ] Content is centered (max 1248px)
- [ ] No excessive whitespace
- [ ] Hover states work
- [ ] All features accessible

### How to Test Devices

1. **Chrome DevTools Device Mode**
   ```
   1. Open DevTools (F12)
   2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
   3. Select device from dropdown
   4. Test responsive at different sizes
   ```

2. **Real Devices** (preferred)
   - Test on actual iPhone, iPad, Android devices
   - Use ngrok to expose local server to devices
   ```bash
   npm install -g ngrok
   ngrok http 8080
   ```

3. **Firefox Responsive Design Mode**
   ```
   Ctrl+Shift+M (Windows/Linux)
   Cmd+Opt+M (Mac)
   ```

---

## 🚀 Lighthouse Testing

### Running Lighthouse

1. **Via Chrome DevTools**
   ```
   1. Open DevTools (F12)
   2. Go to "Lighthouse" tab
   3. Select categories: Performance, Accessibility, Best Practices, SEO
   4. Click "Analyze page load"
   ```

2. **Via Command Line**
   ```bash
   npm install -g lighthouse
   lighthouse https://your-site.com --view
   ```

3. **Via PageSpeed Insights**
   - URL: https://pagespeed.web.dev/
   - Enter your URL
   - Get both mobile and desktop scores

### Target Scores

| Category | Target | Acceptable |
|----------|--------|------------|
| Performance | 100 | 90+ |
| Accessibility | 100 | 95+ |
| Best Practices | 100 | 95+ |
| SEO | 100 | 95+ |

### Lighthouse Checklist

#### Performance (100/100)
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Total Blocking Time < 200ms
- [ ] Cumulative Layout Shift < 0.1
- [ ] Speed Index < 3.4s
- [ ] Time to Interactive < 3.8s
- [ ] No render-blocking resources
- [ ] Images properly sized
- [ ] Images use modern formats (WebP)
- [ ] Text remains visible during webfont load

#### Accessibility (100/100)
- [ ] All images have alt attributes
- [ ] Color contrast is sufficient
- [ ] Elements have discernible names
- [ ] HTML has lang attribute
- [ ] Links have discernible names
- [ ] Buttons have accessible names
- [ ] No ARIA errors
- [ ] Form elements have labels

#### Best Practices (100/100)
- [ ] Uses HTTPS
- [ ] No browser errors in console
- [ ] Images have correct aspect ratio
- [ ] No deprecated APIs
- [ ] Document has viewport meta tag
- [ ] No geolocation on page load
- [ ] No notification on page load

#### SEO (100/100)
- [ ] Document has meta description
- [ ] Page has successful HTTP status code
- [ ] Links have descriptive text
- [ ] Document has valid title
- [ ] Hreflang is valid (if present)
- [ ] Font sizes are legible
- [ ] Tap targets are sized appropriately

---

## ♿ Accessibility Testing

### Automated Testing Tools

1. **axe DevTools** (Chrome Extension)
   - URL: https://www.deque.com/axe/devtools/
   - Run automated accessibility audit
   - Review and fix issues

2. **WAVE** (Web Accessibility Evaluation Tool)
   - URL: https://wave.webaim.org/
   - Enter your URL
   - Review visual feedback

3. **Lighthouse Accessibility Audit**
   - See Lighthouse section above

### Manual Keyboard Testing

Test all functionality with keyboard only (no mouse):

- [ ] **Tab**: Navigate through all interactive elements
- [ ] **Shift+Tab**: Navigate backwards
- [ ] **Enter**: Activate buttons and links
- [ ] **Space**: Toggle checkboxes, activate buttons
- [ ] **Escape**: Close flipped product cards
- [ ] **Arrow Keys**: Navigate within components (if applicable)

### Keyboard Navigation Checklist

- [ ] Tab order is logical (left to right, top to bottom)
- [ ] Focus indicator is clearly visible
- [ ] No keyboard traps (can always escape)
- [ ] Skip to main content link works
- [ ] All interactive elements are reachable
- [ ] Card flip toggle is keyboard accessible
- [ ] Filters are keyboard accessible
- [ ] Breadcrumb navigation works with keyboard

### Screen Reader Testing

#### macOS (VoiceOver)
```
Turn On: Cmd + F5
Navigate: Control + Option + Arrow Keys
Interact: Control + Option + Space
```

**Test Checklist:**
- [ ] Page title is announced
- [ ] Headings are announced with correct levels
- [ ] Landmarks are identified (main, nav, etc.)
- [ ] Images are described with alt text
- [ ] Buttons are identified as buttons
- [ ] Links are identified as links
- [ ] Form labels are associated correctly
- [ ] ARIA labels are announced
- [ ] Card state changes are announced

#### Windows (NVDA)
```
Download: https://www.nvaccess.org/
Turn On: Control + Alt + N
Navigate: Arrow Keys
Interact: Enter/Space
```

**Same checklist as VoiceOver above**

### Color Contrast Testing

Use **WebAIM Contrast Checker**:
- URL: https://webaim.org/resources/contrastchecker/

**Test these combinations:**
- [ ] Body text (#333333) on white (#ffffff) = 12.63:1 ✓
- [ ] Secondary text (#999999) on white = 2.85:1 ✗ (use for large text only)
- [ ] Primary button text (white) on blue (#075697) = 5.48:1 ✓
- [ ] Links on white background
- [ ] All text/background combinations

**Minimum Requirements:**
- Normal text (< 18px): 4.5:1
- Large text (≥ 18px or ≥ 14px bold): 3:1

---

## 🎨 Visual Regression Testing

### Manual Visual Comparison

1. **Take Baseline Screenshots**
   ```bash
   # Using Chrome DevTools
   1. Open DevTools (F12)
   2. Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
   3. Type "screenshot"
   4. Select "Capture full size screenshot"
   ```

2. **Compare Before/After**
   - Save screenshots with meaningful names
   - Compare side-by-side in image viewer
   - Look for unintended changes

### Automated Visual Testing (Optional)

#### Using Percy (Recommended)
```bash
npm install --save-dev @percy/cli
npx percy snapshot snapshots/
```

#### Using BackstopJS
```bash
npm install -g backstopjs
backstop init
backstop reference  # Take reference screenshots
backstop test      # Compare current with reference
```

### What to Look For

- [ ] Layout shifts or jumps
- [ ] Broken images
- [ ] Misaligned elements
- [ ] Overlapping text
- [ ] Cut-off content
- [ ] Incorrect colors
- [ ] Missing styles
- [ ] Broken responsive behavior
- [ ] Font rendering issues

---

## 🧪 Manual Testing Scenarios

### Product Card Interactions

#### Scenario 1: View Product Details
1. Navigate to homepage
2. Locate a product card
3. Click "Details" button
4. **Expected**: Navigate to product details page (or modal opens)

#### Scenario 2: Quick View Toggle
1. Locate a product card
2. Click "Quick View" link
3. **Expected**: Card flips to show product overview
4. Click anywhere on the back side
5. **Expected**: Card flips back to front

#### Scenario 3: Quick View Keyboard
1. Tab to "Quick View" link
2. Press Enter
3. **Expected**: Card flips to show overview
4. Press Escape
5. **Expected**: Card flips back to front

#### Scenario 4: Hover States
1. Hover over product card
2. **Expected**: Shadow increases (smooth transition)
3. Hover over "Details" button
4. **Expected**: Button background darkens, slight scale up
5. Hover over "Quick View" link
6. **Expected**: Text and icon change to primary color

### Filter Interactions (if applicable)

#### Scenario 5: Apply Filter
1. Navigate to filtration page
2. Click a checkbox filter
3. **Expected**: Filter tag appears, product count updates
4. **Expected**: Products filter in real-time

#### Scenario 6: Remove Filter
1. With active filter(s)
2. Click "×" on filter tag
3. **Expected**: Filter removed, products update
4. **Expected**: Checkbox unchecks

#### Scenario 7: Clear All Filters
1. Apply multiple filters
2. Click "Clear All" button
3. **Expected**: All filters removed
4. **Expected**: All products shown

### Breadcrumb Navigation

#### Scenario 8: Breadcrumb Links
1. Click each breadcrumb link
2. **Expected**: Navigate to correct page
3. Verify current page has no link (just text)

### Responsive Behavior

#### Scenario 9: Mobile Menu
1. Resize to 480px width
2. **Expected**: Cards stack in single column
3. **Expected**: All content readable and accessible

#### Scenario 10: Tablet Layout
1. Resize to 768px width
2. **Expected**: Cards display 2-3 per row
3. **Expected**: Filters accessible

---

## 🐛 Common Issues & Solutions

### Issue: Layout Shift on Load

**Symptoms:** Content jumps when page loads

**Solutions:**
- Add `width` and `height` to all images
- Use `aspect-ratio` CSS for containers
- Reserve space for dynamically loaded content
- Preload critical fonts

### Issue: Cards Not Flipping

**Symptoms:** Quick View doesn't toggle card

**Solutions:**
- Check JavaScript errors in console
- Verify `.is-flipped` class is added/removed
- Ensure event listeners are attached
- Test with `DOMContentLoaded` wrapped

### Issue: Focus Outline Missing

**Symptoms:** Can't see where keyboard focus is

**Solutions:**
- Don't use `outline: none` without replacement
- Use `:focus-visible` for better UX
- Test with Tab key
- Ensure focus styles are visible

### Issue: Images Not Loading

**Symptoms:** Broken image icons

**Solutions:**
- Check file paths (case-sensitive)
- Verify images exist in `imgs/` folder
- Check browser Network tab for 404 errors
- Ensure correct file extensions

### Issue: Fonts Not Loading

**Symptoms:** Fallback fonts showing

**Solutions:**
- Verify font file paths in CSS
- Check fonts exist in `fonts/` folder
- Use `font-display: swap` for FOUT
- Check browser Network tab

### Issue: CSS Not Applied

**Symptoms:** Unstyled or partially styled page

**Solutions:**
- Check CSS file path in HTML
- Verify CSS file exists
- Clear browser cache (Ctrl+Shift+R)
- Check for CSS syntax errors

### Issue: JavaScript Not Working

**Symptoms:** Interactive features broken

**Solutions:**
- Check browser console for errors
- Verify script loads (Network tab)
- Ensure script runs after DOM loads
- Check for typos in selectors

---

## 📊 Testing Report Template

Use this template to document your testing:

```markdown
## Testing Report

**Date:** YYYY-MM-DD
**Tester:** Your Name
**Environment:** Browser/Device

### Lighthouse Scores
- Performance: __/100
- Accessibility: __/100
- Best Practices: __/100
- SEO: __/100

### Browser Testing
- [ ] Chrome (v__)
- [ ] Firefox (v__)
- [ ] Safari (v__)
- [ ] Edge (v__)

### Device Testing
- [ ] Mobile (320px)
- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1920px)

### Issues Found
1. **Issue:** Description
   - **Severity:** Critical/High/Medium/Low
   - **Steps to Reproduce:** ...
   - **Expected:** ...
   - **Actual:** ...
   - **Screenshot:** [Link]

### Status
- [ ] Ready for Production
- [ ] Needs Fixes (see issues above)
```

---

## 🎯 Final Checklist Before Launch

- [ ] All Lighthouse scores are 95+ (target 100)
- [ ] Tested in Chrome, Firefox, Safari
- [ ] Tested on mobile, tablet, desktop
- [ ] All links work
- [ ] All images load
- [ ] No console errors
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Color contrast passes
- [ ] HTML validates
- [ ] CSS validates
- [ ] Production files minified
- [ ] Documentation updated
- [ ] Testing report completed

---

## 📚 Resources

### Testing Tools
- **W3C HTML Validator:** https://validator.w3.org/
- **W3C CSS Validator:** https://jigsaw.w3.org/css-validator/
- **Lighthouse:** Built into Chrome DevTools
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **WAVE:** https://wave.webaim.org/
- **axe DevTools:** https://www.deque.com/axe/devtools/
- **Contrast Checker:** https://webaim.org/resources/contrastchecker/

### Documentation
- **WCAG 2.1 Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **MDN Web Docs:** https://developer.mozilla.org/
- **Can I Use:** https://caniuse.com/

---

**Last Updated:** October 12, 2025  
**Version:** 1.0.0  
**Maintained by:** Product Development Team

