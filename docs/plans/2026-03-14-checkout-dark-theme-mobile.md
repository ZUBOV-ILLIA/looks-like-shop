---

# Checkout, Dark Theme, Mobile Improvements & Enhancements

## Overview
Add a multi-step checkout page (address -> payment -> confirmation) with progress bar, implement dark theme toggle, improve mobile responsiveness, and add several UX enhancements to the existing e-commerce storefront.

## Context
- Files involved: `src/App.tsx`, `src/components/`, `src/redux/`, `src/styles/`, `src/lang/`
- Related patterns: Redux Toolkit slices, SCSS with BEM, MUI components, HashRouter routing, langSetter i18n
- Dependencies: No new external dependencies needed (MUI + existing stack covers everything)

## Development Approach
- **Testing approach**: Regular (code first, then tests)
- Complete each task fully before moving to the next
- Follow existing SCSS + BEM conventions and Redux Toolkit patterns
- Use existing MUI components where possible
- **CRITICAL: every task MUST include new/updated tests**
- **CRITICAL: all tests must pass before starting next task**

## Implementation Steps

### Task 1: Theme System (CSS Custom Properties + Redux)

**Files:**
- Create: `src/redux/themeSlice.ts`
- Create: `src/styles/_themes.scss` (CSS custom properties for light/dark)
- Modify: `src/redux/store.ts` (add theme slice)
- Modify: `src/styles/global.scss` (use CSS variables instead of hardcoded colors)
- Modify: `src/components/Header/Header.tsx` (add theme toggle button)
- Modify: `src/components/Header/Header.scss`
- Modify: `src/App.tsx` (apply theme class to root)

- [x] Create themeSlice with toggle action, persist to localStorage
- [x] Define CSS custom properties for light theme (current colors) and dark theme
- [x] Replace hardcoded colors in global.scss with CSS variables
- [x] Add theme toggle button (sun/moon icon) in Header next to language selector
- [x] Apply `data-theme="light|dark"` attribute to root element from Redux state
- [x] Update component SCSS files to use CSS variables for colors (Header, Footer, Cart, ProductCard, Main, SingleProduct, Search, SortBy)
- [x] Add translations for theme toggle in lang files
- [x] Write tests for themeSlice and theme toggle functionality
- [x] Run project test suite - must pass before task 2

### Task 2: Multi-Step Checkout Page

**Files:**
- Create: `src/components/Checkout/Checkout.tsx`
- Create: `src/components/Checkout/Checkout.scss`
- Create: `src/components/Checkout/steps/AddressStep.tsx`
- Create: `src/components/Checkout/steps/PaymentStep.tsx`
- Create: `src/components/Checkout/steps/ConfirmationStep.tsx`
- Modify: `src/App.tsx` (add /checkout route)
- Modify: `src/components/Cart/Cart.tsx` (add "Checkout" button linking to /checkout)
- Modify: `src/lang/en.ts`, `src/lang/ru.ts`, `src/lang/ua.ts` (checkout translations)

- [ ] Create Checkout component with step state management (steps 1-3)
- [ ] Build progress bar showing current step (Address -> Payment -> Confirmation)
- [ ] AddressStep: form fields for name, email, phone, address, city, zip code with basic validation
- [ ] PaymentStep: card number input (with formatting), expiry date, CVV, cardholder name with basic validation (demo only, no real processing)
- [ ] ConfirmationStep: order summary showing cart items, totals, entered address and masked card number, "Place Order" button
- [ ] Add "Proceed to Checkout" button in Cart drawer that navigates to /checkout
- [ ] Add /checkout route in App.tsx
- [ ] Add all checkout-related translations to lang files (en, ru, ua)
- [ ] Style with SCSS following existing BEM conventions, use CSS variables for theme support
- [ ] Write tests for Checkout component and each step
- [ ] Run project test suite - must pass before task 3

### Task 3: Mobile Responsiveness Improvements

**Files:**
- Modify: `src/components/Header/Header.scss`
- Modify: `src/components/Main/Main.scss`
- Modify: `src/components/ProductCard/ProductCard.scss`
- Modify: `src/components/SingleProduct/SingleProduct.scss`
- Modify: `src/components/Cart/Cart.scss`
- Modify: `src/components/Footer/Footer.scss`
- Modify: `src/components/Checkout/Checkout.scss`
- Modify: `src/styles/global.scss`

- [ ] Header: improve mobile layout - sticky header, compact spacing, better touch targets (min 44px), hamburger menu behavior
- [ ] ProductCard: optimize card layout for small screens - better image sizing, readable text, accessible buttons
- [ ] SingleProduct: improve product detail page on mobile - full-width images, stacked layout, better spacing
- [ ] Cart drawer: full-screen on mobile with better item layout and larger controls
- [ ] Checkout: ensure checkout steps are fully mobile-friendly with large inputs and buttons
- [ ] Footer: stack footer columns vertically on mobile
- [ ] Add consistent breakpoint variables in global.scss ($mobile: 480px, $tablet: 768px, $desktop: 1024px)
- [ ] Ensure all interactive elements have minimum 44px touch targets on mobile
- [ ] Write visual regression tests or snapshot tests for mobile layouts
- [ ] Run project test suite - must pass before task 4

### Task 4: Additional Improvements

**Files:**
- Modify: `src/components/Cart/Cart.tsx` and `Cart.scss` (cart persistence)
- Modify: `src/redux/basketSlice.ts` (localStorage persistence)
- Create: `src/components/ScrollToTop/ScrollToTop.tsx` (scroll to top button)
- Modify: `src/components/Main/Main.tsx` (product loading skeletons)
- Modify: `src/components/Main/Main.scss`
- Modify: `src/components/ProductCard/ProductCard.tsx` (image lazy loading)

- [ ] Cart persistence: save cart to localStorage (like wishlist), restore on page load
- [ ] Product loading skeletons: add MUI Skeleton placeholders while products load instead of blank screen
- [ ] Scroll to top button: floating button that appears on scroll, smooth scroll to top
- [ ] Image lazy loading: add loading="lazy" to product images for better performance
- [ ] Add smooth page transitions between routes
- [ ] Write tests for cart persistence and new components
- [ ] Run project test suite - must pass before task 5

### Task 5: Verify Acceptance Criteria

- [ ] Manual test: toggle dark/light theme, verify all pages look correct in both themes
- [ ] Manual test: complete full checkout flow (address -> payment -> confirmation)
- [ ] Manual test: resize browser to mobile widths, verify all pages are usable
- [ ] Manual test: verify cart persists across page reload
- [ ] Run full test suite (`npm test`)
- [ ] Run linter (`npx eslint src/`)
- [ ] Verify test coverage meets 80%+

### Task 6: Update Documentation

- [ ] Update README.md with new features (checkout, dark theme, improvements)
- [ ] Update CLAUDE.md if internal patterns changed
- [ ] Move this plan to `docs/plans/completed/`
