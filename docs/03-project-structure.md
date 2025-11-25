# 📁 Project Structure

## Overview

The project follows a **feature-based structure** with clear separation of concerns.

```
siupo-restaurant/
├── public/                      # Static assets served directly
├── scripts/                     # Build and utility scripts
├── src/                         # Source code
├── docs/                        # Documentation
├── .husky/                      # Git hooks
├── node_modules/                # Dependencies (git-ignored)
├── dist/                        # Production build (git-ignored)
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── eslint.config.js             # ESLint configuration
├── commitlint.config.ts         # Commitlint configuration
├── .env                         # Environment variables (git-ignored)
├── .gitignore                   # Git ignore rules
└── README.md                    # Project readme
```

---

## 📂 Source Code Structure (`src/`)

### Complete Directory Tree

```
src/
├── api/                         # API integration layer
│   ├── addressApi.ts           # Address management
│   ├── authApi.ts              # Authentication
│   ├── bannerApi.ts            # Banner management
│   ├── bookingApi.ts           # Table reservations
│   ├── cartApi.ts              # Shopping cart
│   ├── categoryApi.ts          # Product categories
│   ├── notificationApi.ts      # User notifications
│   ├── orderApi.ts             # Order management
│   ├── productApi.ts           # Products
│   ├── reviewApi.ts            # Product reviews
│   ├── uploadApi.ts            # File uploads
│   ├── userApi.ts              # User profile
│   └── wishListApi.ts          # Wishlist
│
├── assets/                      # Static assets
│   ├── gallery/                # Image gallery
│   ├── icons/                  # Custom icon components
│   │   └── GoogleColorIcon.tsx
│   └── images/                 # Image files
│
├── components/                  # React components
│   ├── common/                 # Reusable components
│   │   ├── Button.tsx
│   │   ├── LoginRequiredDialog.tsx
│   │   ├── RedirectIfAuth.tsx
│   │   ├── Snackbar.tsx
│   │   └── WatchVideoButton.tsx
│   │
│   └── layout/                 # Layout components
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── Layout.tsx
│       ├── PageHeader.tsx
│       └── components/         # Header sub-components
│           ├── Actions.tsx
│           ├── LanguageSwitcher.tsx
│           ├── Logo.tsx
│           └── NavLink.tsx
│
├── config/                      # Configuration files
│   ├── index.ts                # Environment config
│   ├── menuConfig.ts           # Menu configuration
│   └── routesMeta.ts           # Route metadata
│
├── contexts/                    # React Context providers
│   ├── GlobalContext.tsx       # Global state context interface
│   ├── GlobalProvider.tsx      # Global state provider implementation
│   ├── PreOrderContext.tsx     # Pre-order state
│   └── SnackbarContext.tsx     # Snackbar notifications
│
├── hooks/                       # Custom React hooks
│   ├── useGlobal.ts            # Access global state
│   ├── useRouteMeta.ts         # Route metadata with i18n
│   ├── useSnackbar.ts          # Snackbar notifications
│   └── useTranslation.ts       # Typed i18n hook
│
├── i18n/                        # Internationalization
│   ├── config.ts               # i18next configuration
│   └── i18next.d.ts            # TypeScript definitions
│
├── locales/                     # Translation files
│   ├── en/                     # English translations
│   │   ├── about.json
│   │   ├── account.json
│   │   ├── auth.json
│   │   ├── booking.json
│   │   ├── cart.json
│   │   ├── checkout.json
│   │   ├── chef.json
│   │   ├── common.json
│   │   ├── contact.json
│   │   ├── home.json
│   │   ├── menu.json
│   │   └── product.json
│   │
│   └── vi/                     # Vietnamese translations
│       └── (same structure as en/)
│
├── pages/                       # Page components
│   ├── AboutUs/                # About page
│   │   ├── AboutUsPage.tsx
│   │   └── components/
│   │
│   ├── Account/                # User account
│   │   ├── DashboardPage.tsx
│   │   └── SettingsPage.tsx
│   │
│   ├── Auth/                   # Authentication
│   │   ├── SignInPage.tsx
│   │   ├── SignUpPage.tsx
│   │   ├── ForgotPasswordPage.tsx
│   │   ├── OAuth2CallbackPage.tsx
│   │   └── components/
│   │       ├── RequestForgotPassword.tsx
│   │       └── SetNewPassword.tsx
│   │
│   ├── Cart/                   # Shopping cart
│   │   ├── Cart.tsx
│   │   └── components/
│   │
│   ├── CheckOut/               # Checkout
│   │   ├── CheckoutPage.tsx
│   │   └── Components/
│   │
│   ├── Chef/                   # Chef profiles
│   │   ├── ChefCard.tsx
│   │   └── ChefPage.tsx
│   │
│   ├── Home/                   # Home page
│   │   ├── HomePage.tsx
│   │   └── components/
│   │
│   ├── Menu/                   # Menu page
│   │   ├── MenuItem.tsx
│   │   ├── MenuPage.tsx
│   │   ├── MenuSection.tsx
│   │   ├── PartnersSection.tsx
│   │   └── StatsSection.tsx
│   │
│   ├── MyOrders/               # Order history
│   │   └── MyOrdersPage.tsx
│   │
│   ├── NotFound/               # 404 page
│   │   └── NotFoundPage.tsx
│   │
│   ├── OrderAtTable/           # Order at table
│   │   ├── OrderAtTable.tsx
│   │   └── components/
│   │
│   ├── OrderSuccess/           # Order confirmation
│   │   └── OrderSuccessPage.tsx
│   │
│   ├── PaymentCallback/        # Payment callback
│   │   └── PaymentCallbackPage.tsx
│   │
│   ├── PlaceTableForGuest/     # Table reservation
│   │   ├── PlaceTableForGuest.tsx
│   │   └── components/
│   │
│   ├── ProductDetail/          # Product detail
│   │   ├── ProductDetailPage.tsx
│   │   └── components/
│   │
│   ├── Shop/                   # Shop listing
│   │   ├── OurShopPage.tsx
│   │   └── components/
│   │
│   └── WishList/               # Wishlist
│       └── WishlistPage.tsx
│
├── routers/                     # Routing configuration
│   ├── routes.tsx              # Route definitions
│   ├── PrivateRoute.tsx        # Protected routes
│   └── PublicRoute.tsx         # Public routes (redirect if auth)
│
├── services/                    # Business logic layer
│   ├── authService.ts          # Authentication logic
│   ├── cartService.ts          # Cart operations
│   ├── categoryService.ts      # Category operations
│   └── productService.ts       # Product operations
│
├── types/                       # TypeScript definitions
│   ├── enums/                  # Enum types
│   │   ├── gender.enum.ts
│   │   ├── methodPayment.enum.ts
│   │   ├── order.enum.ts
│   │   └── product.enum.ts
│   │
│   ├── models/                 # Data models
│   │   ├── address.ts
│   │   ├── cart.ts
│   │   ├── cartItem.ts
│   │   ├── image.ts
│   │   ├── notification.ts
│   │   ├── order.ts
│   │   ├── orderItem.ts
│   │   ├── product.ts
│   │   └── user.ts
│   │
│   ├── requests/               # API request types
│   │   ├── auth.request.ts
│   │   ├── book.request.ts
│   │   ├── cart.request.ts
│   │   ├── order.request.ts
│   │   └── product.request.ts
│   │
│   └── responses/              # API response types
│       ├── address.response.ts
│       ├── api.response.ts
│       ├── auth.response.ts
│       ├── book.response.ts
│       ├── cart.response.ts
│       ├── category.response.ts
│       ├── notification.response.ts
│       └── user.response.ts
│
├── utils/                       # Utility functions
│   ├── authUtils.ts            # Auth utilities
│   ├── axiosClient.ts          # Configured Axios instance
│   └── format.ts               # Formatting utilities
│
├── App.tsx                      # Root component
├── main.tsx                     # Entry point
├── Dev.tsx                      # Dev/testing component
├── index.css                    # Global styles
└── vite-env.d.ts                # Vite type definitions
```

---

## 📦 Detailed Directory Descriptions

### `/api` - API Integration Layer

Contains all API endpoint definitions using Axios.

**Naming Convention:** `{resource}Api.ts`

**Pattern:**
```typescript
// api/productApi.ts
import axiosClient from '../utils/axiosClient';

const productApi = {
  getAll: () => axiosClient.get('/products'),
  getById: (id: string) => axiosClient.get(`/products/${id}`),
  create: (data) => axiosClient.post('/products', data),
};

export default productApi;
```

### `/assets` - Static Assets

- `gallery/` - Restaurant images, food photos
- `icons/` - Custom SVG icon components
- `images/` - Other static images

### `/components` - React Components

#### `/components/common`
Reusable components used across the application:
- `Button.tsx` - Custom button component
- `LoginRequiredDialog.tsx` - Auth prompt dialog
- `Snackbar.tsx` - Notification toast
- etc.

#### `/components/layout`
Layout structure components:
- `Header.tsx` - Top navigation
- `Footer.tsx` - Bottom footer
- `Layout.tsx` - Main layout wrapper
- `PageHeader.tsx` - Page title and breadcrumbs

### `/config` - Configuration

- `index.ts` - Environment variables and constants
- `menuConfig.ts` - Navigation menu structure
- `routesMeta.ts` - Route metadata (titles, breadcrumbs)

### `/contexts` - State Management

React Context providers for global state:
- `GlobalContext.tsx` - Context interface
- `GlobalProvider.tsx` - Provider implementation
- `PreOrderContext.tsx` - Pre-order state
- `SnackbarContext.tsx` - Notification state

### `/hooks` - Custom Hooks

Reusable React hooks:
- `useGlobal.ts` - Access global state
- `useSnackbar.ts` - Show notifications
- `useTranslation.ts` - Type-safe i18n
- `useRouteMeta.ts` - Route metadata with translations

### `/i18n` - Internationalization

i18next configuration and setup.

### `/locales` - Translations

Translation files organized by language and namespace:
- `en/` - English translations
- `vi/` - Vietnamese translations

Each language has 12 namespace files (common, home, auth, etc.)

### `/pages` - Page Components

Each page is a folder containing:
- Main page component
- Sub-components in `components/` folder
- Page-specific logic

**Naming Convention:** `{Name}Page.tsx`

### `/routers` - Routing

- `routes.tsx` - All route definitions
- `PrivateRoute.tsx` - Auth-protected wrapper
- `PublicRoute.tsx` - Public route wrapper (redirects if authenticated)

### `/services` - Business Logic

Service layer between components and API:
- Handle complex business logic
- Data transformation
- Error handling
- Caching (if needed)

**Pattern:**
```typescript
// services/authService.ts
import authApi from '../api/authApi';

export const authService = {
  login: async (credentials) => {
    const response = await authApi.login(credentials);
    // Save token, update state, etc.
    return response;
  },
};
```

### `/types` - TypeScript Definitions

#### `/types/enums`
Enum type definitions for constants.

#### `/types/models`
Data model interfaces matching backend entities.

#### `/types/requests`
API request payload types.

#### `/types/responses`
API response types.

### `/utils` - Utilities

Helper functions and utilities:
- `axiosClient.ts` - Configured Axios instance with interceptors
- `authUtils.ts` - Auth-related helpers
- `format.ts` - Formatting functions (date, currency, etc.)

---

## 📋 Naming Conventions

### Files

| Type | Convention | Example |
|------|------------|---------|
| Component | PascalCase | `ProductCard.tsx` |
| Page | PascalCase + Page suffix | `HomePage.tsx` |
| Hook | camelCase + use prefix | `useGlobal.ts` |
| API | camelCase + Api suffix | `productApi.ts` |
| Service | camelCase + Service suffix | `authService.ts` |
| Type | PascalCase | `User.ts` |
| Util | camelCase | `format.ts` |
| Config | camelCase | `menuConfig.ts` |

### Folders

| Type | Convention | Example |
|------|------------|---------|
| Feature folder | PascalCase | `ProductDetail/` |
| Util folder | camelCase | `utils/` |
| Plural for collections | lowercase | `pages/`, `components/` |

---

## 🎯 File Organization Principles

### 1. Feature-Based Structure
Group related files by feature, not by type.

✅ **Good:**
```
pages/
  ProductDetail/
    ProductDetailPage.tsx
    components/
      ProductInfo.tsx
      ProductReviews.tsx
```

❌ **Bad:**
```
pages/
  ProductDetailPage.tsx
components/
  ProductInfo.tsx
  ProductReviews.tsx
```

### 2. Colocation
Keep related files close together.

### 3. Separation of Concerns
- Components - UI rendering
- Services - Business logic
- API - HTTP requests
- Utils - Pure functions

### 4. Single Responsibility
Each file should have one primary responsibility.

---

## 📄 Configuration Files

### `package.json`
- Dependencies
- Scripts
- Project metadata

### `tsconfig.json`
- TypeScript compiler options
- Path aliases
- Include/exclude patterns

### `vite.config.ts`
- Vite build configuration
- Plugins
- Dev server settings

### `tailwind.config.ts`
- Tailwind customization
- Theme extensions
- Plugins

### `eslint.config.js`
- Linting rules
- Parser options
- Plugins

### `commitlint.config.ts`
- Commit message rules
- Custom validation

---

## 🔍 Finding Files

### By Feature
1. Go to `pages/{Feature}/`
2. Find main page component
3. Check `components/` subfolder for related components

### By Type
- API calls → `/api`
- Types → `/types`
- Hooks → `/hooks`
- Utils → `/utils`
- Global components → `/components/common`

### By Route
1. Check `routers/routes.tsx`
2. Find route path
3. See component import

---

**Next:** [Architecture →](./04-architecture.md)
