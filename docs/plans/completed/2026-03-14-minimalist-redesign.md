---

# Redesign looks-like-shop: Minimalist Design + New Features

## Overview
Complete visual overhaul of the e-commerce app to a minimalist Apple Store-inspired design (white backgrounds, clean typography, lots of whitespace). Add more product categories, wishlist functionality, and improved product detail pages. No React/library version upgrades.

## Context
- Files involved: All SCSS files, most components, Redux store, API layer, translation files, categories list
- Related patterns: MUI sx prop styling, Redux Toolkit slices, DummyJSON API, langSetter translations
- Dependencies: No new npm dependencies needed - using existing MUI, Redux Toolkit, SCSS

## Development Approach
- **Testing approach**: Manual testing (project has no test setup currently)
- Complete each task fully before moving to the next
- Preserve all existing functionality (cart, search, sorting, pagination, i18n)
- Work within existing tech stack constraints (React 18, MUI 5, Redux Toolkit)

## Implementation Steps

### Task 1: Global Design Overhaul - Colors and Typography

**Files:**
- Modify: `src/index.scss`
- Modify: `src/components/Header/Header.scss`
- Modify: `src/components/Footer/Footer.scss`

- [x] Replace gradient body background (#bddeff -> #e7d2fc) with clean white/light gray (#fafafa or #fff)
- [x] Set base font to system font stack or clean sans-serif (Inter/SF Pro style via system fonts)
- [x] Update text colors to proper hierarchy: #1d1d1f (primary), #6e6e73 (secondary), #86868b (tertiary) - Apple-inspired palette
- [x] Redesign Header: white background, subtle bottom border, clean logo without neon glow/text-stroke effects
- [x] Redesign Footer: light background instead of black, minimal content, clean layout
- [x] Set accent color to a single clean tone (e.g., #0071e3 blue or #1d1d1f black for buttons)
- [x] Remove all box-shadow glow effects, replace with subtle shadows (0 1px 3px rgba(0,0,0,0.08))

### Task 2: Product Card Redesign

**Files:**
- Modify: `src/components/ProductCard/ProductCard.tsx`
- Modify: `src/components/ProductCard/ProductCard.scss`

- [x] Remove gradient card backgrounds, set to white with very subtle border or shadow
- [x] Clean up card layout: larger product image, more whitespace, simpler typography
- [x] Redesign price display: clean font, discount shown as strikethrough + new price (no gold/neon colors)
- [x] Simplify "Add to Cart" button: clean rounded button with single accent color
- [x] Improve rating display: smaller, more subtle star rating
- [x] Add hover effect: subtle scale or shadow transition instead of colored glow
- [x] Update product grid: consistent spacing, 4 columns on desktop, 2 on tablet, 1 on mobile

### Task 3: Product Detail Page Improvement

**Files:**
- Modify: `src/components/SingleProduct/SingleProduct.tsx`
- Modify: `src/components/SingleProduct/SingleProduct.scss` (create if not exists)

- [x] Redesign layout: large image gallery on left, product info on right (standard e-commerce layout)
- [x] Add image thumbnail selector for browsing product images
- [x] Clean typography for title, price, description, brand, stock info
- [x] Improve comments/reviews section styling
- [x] Add "Back to products" navigation link
- [x] Consistent button styling with rest of app

### Task 4: Cart Drawer Redesign

**Files:**
- Modify: `src/components/Cart/Cart.tsx`
- Modify: `src/components/Cart/Cart.scss`

- [x] Clean white drawer with proper spacing
- [x] Simplify cart item rows: small thumbnail, title, quantity controls, price
- [x] Clean total section at bottom
- [x] Remove heavy colored styling, use minimal borders for separation
- [x] Improve empty cart state with clean message

### Task 5: Add Wishlist Feature

**Files:**
- Create: `src/redux/slices/wishlistSlice.ts`
- Create: `src/components/Wishlist/Wishlist.tsx`
- Create: `src/components/Wishlist/Wishlist.scss`
- Modify: `src/redux/store/store.ts`
- Modify: `src/components/ProductCard/ProductCard.tsx`
- Modify: `src/components/SingleProduct/SingleProduct.tsx`
- Modify: `src/components/Header/Header.tsx`
- Modify: `src/components/Header/Header.scss`
- Modify: `src/lang/en.ts`
- Modify: `src/lang/ru.ts`
- Modify: `src/lang/ua.ts`

- [x] Create wishlistSlice with add/remove/toggle actions, persist to localStorage
- [x] Add heart icon toggle on ProductCard and SingleProduct page
- [x] Add wishlist icon with badge counter in Header (next to cart)
- [x] Create Wishlist drawer (similar to Cart) showing saved products
- [x] Add translations for wishlist-related strings in all 3 languages

### Task 6: Expand Product Categories and Improve Navigation

**Files:**
- Modify: `src/Routes/categories.ts`
- Modify: `src/components/Header/Header.tsx`
- Modify: `src/components/Header/Header.scss`
- Modify: `src/App.tsx`
- Modify: `src/lang/en.ts`
- Modify: `src/lang/ru.ts`
- Modify: `src/lang/ua.ts`

- [x] Fetch categories dynamically from DummyJSON API (/products/categories) instead of hardcoded list - this will include all available categories (the API has more than the 20 currently hardcoded)
- [x] Redesign category navigation: clean horizontal menu or dropdown with category names
- [x] Improve mobile category menu: clean slide-out menu instead of current implementation
- [x] Add category translations for new categories in all 3 languages
- [x] Increase default items per page from 8 to 12 for denser product browsing

### Task 7: Search and Filter UI Improvements

**Files:**
- Modify: `src/components/Search/Search.tsx`
- Modify: `src/components/Search/Search.scss`
- Modify: `src/components/SortBy/SortBy.tsx`
- Modify: `src/components/ItemsPerPageSelector/ItemsPerPageSelector.tsx`
- Modify: `src/components/Main/Main.tsx`
- Modify: `src/components/Main/Main.scss`

- [x] Redesign search bar: clean rounded input with search icon, no heavy borders
- [x] Style sort dropdown and items-per-page selector to match minimalist theme
- [x] Group search + sort + items-per-page in a clean toolbar row
- [x] Add price range display on product cards for context
- [x] Update MUI component color theme from "secondary" (purple) to clean neutral/blue accent

### Task 8: Final Polish and Consistency

**Files:**
- Modify: `src/components/PageNotFound/PageNotFound.tsx`
- Modify: `src/components/BackdropFilter/BackdropFilter.scss`
- Modify: `src/components/LanguageSelector/LanguageSelector.scss`
- Modify: `src/components/SocialLinks/SocialLinks.tsx`

- [x] Update 404 page to match new minimalist design
- [x] Update backdrop filter overlay to match new theme
- [x] Style language selector consistently
- [x] Update social links styling
- [x] Review all components for any remaining old gradient/neon/glow styles
- [x] Verify responsive design works correctly at all breakpoints
- [x] Test all existing functionality still works (cart, search, sorting, pagination, i18n, routing)

### Task 9: Verify acceptance criteria

- [x] Manual test: browse categories, search products, add to cart, use wishlist, change language
- [x] Verify all pages render with new minimalist design (no leftover gradients/glows)
- [x] Verify responsive design on mobile, tablet, desktop viewports
- [x] Test all existing functionality still works (cart, search, sorting, pagination, i18n, routing)

### Task 10: Update documentation

- [x] Update README.md if user-facing changes
- [x] Move this plan to `docs/plans/completed/`
