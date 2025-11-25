# 📚 Siupo Restaurant - Technical Documentation

> Complete technical documentation for the Siupo Restaurant frontend application

**Version:** 1.0.0  
**Last Updated:** November 25, 2025  
**Repository:** [siupo-frontend](https://github.com/hugn2k4/siupo-frontend)

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Architecture](#architecture)
5. [Installation & Setup](#installation--setup)
6. [Development Guide](#development-guide)
7. [Internationalization (i18n)](#internationalization-i18n)
8. [State Management](#state-management)
9. [API Integration](#api-integration)
10. [Routing System](#routing-system)
11. [Authentication](#authentication)
12. [Component Library](#component-library)
13. [Styling Guide](#styling-guide)
14. [Build & Deployment](#build--deployment)
15. [Testing](#testing)
16. [Code Quality](#code-quality)
17. [Performance Optimization](#performance-optimization)
18. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**Siupo Restaurant** is a modern, full-featured restaurant web application built with React 19 and TypeScript. The application provides a seamless user experience for browsing menus, placing orders, table reservations, and managing user accounts.

### Key Features

- 🍽️ **Menu Browsing** - Browse restaurant menu with categories, filters, and detailed product views
- 🛒 **Shopping Cart** - Add items to cart, manage quantities, and checkout
- 📅 **Table Reservation** - Book tables for specific dates and times
- 👤 **User Authentication** - Sign up, sign in, OAuth2 (Google), password recovery
- 💳 **Payment Integration** - Secure payment processing with multiple methods
- 📦 **Order Management** - Track order history and status
- ❤️ **Wishlist** - Save favorite items for later
- 🌐 **Multi-language** - Support for English and Vietnamese
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🎨 **Modern UI/UX** - Material-UI components with custom styling

### Target Audience

- Restaurant customers looking to order food online
- Diners wanting to reserve tables
- Users seeking a seamless food ordering experience

---

## 🛠️ Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.1 | UI library for building interactive interfaces |
| **TypeScript** | 5.8.3 | Type-safe JavaScript superset |
| **Vite** | 7.1.3 | Fast build tool and dev server |
| **React Router** | 7.8.1 | Client-side routing |

### UI & Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 4.1.12 | Utility-first CSS framework |
| **Material-UI (MUI)** | 7.3.2 | React component library |
| **Framer Motion** | 12.23.12 | Animation library |
| **Lucide React** | 0.543.0 | Icon library |

### State & Data Management

| Technology | Version | Purpose |
|------------|---------|---------|
| **Axios** | 1.11.0 | HTTP client for API calls |
| **React Hook Form** | 7.64.0 | Form validation and management |
| **Lodash** | 4.17.21 | Utility functions |

### Internationalization

| Technology | Version | Purpose |
|------------|---------|---------|
| **i18next** | 25.6.3 | Internationalization framework |
| **react-i18next** | 16.3.5 | React bindings for i18next |
| **i18next-browser-languagedetector** | 8.2.0 | Language detection |

### Development Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | 9.33.0 | JavaScript/TypeScript linter |
| **Prettier** | 3.6.2 | Code formatter |
| **Husky** | 9.1.7 | Git hooks |
| **Lint-staged** | 16.1.6 | Run linters on staged files |
| **Commitlint** | 19.8.1 | Commit message linting |

### Additional Libraries

- **date-fns** (4.1.0) - Date manipulation
- **react-datepicker** (8.8.0) - Date picker component
- **use-debounce** (10.0.6) - Debounce hook
- **react-icons** (5.5.0) - Additional icons

---

## 📁 Project Structure

```
siupo-restaurant/
├── public/                      # Static assets
├── scripts/                     # Build and utility scripts
├── src/                        # Source code
│   ├── api/                    # API integration layer
│   │   ├── authApi.ts         # Authentication endpoints
│   │   ├── cartApi.ts         # Shopping cart endpoints
│   │   ├── productApi.ts      # Product endpoints
│   │   ├── orderApi.ts        # Order endpoints
│   │   ├── bookingApi.ts      # Table booking endpoints
│   │   ├── categoryApi.ts     # Category endpoints
│   │   ├── userApi.ts         # User profile endpoints
│   │   ├── addressApi.ts      # Address management
│   │   ├── wishListApi.ts     # Wishlist endpoints
│   │   ├── reviewApi.ts       # Review endpoints
│   │   ├── notificationApi.ts # Notifications
│   │   ├── bannerApi.ts       # Banner management
│   │   └── uploadApi.ts       # File upload
│   │
│   ├── assets/                # Static assets
│   │   ├── gallery/           # Image gallery
│   │   ├── icons/             # Custom icons
│   │   └── images/            # Images
│   │
│   ├── components/            # Reusable components
│   │   ├── common/            # Shared components
│   │   │   ├── Button.tsx
│   │   │   ├── LoginRequiredDialog.tsx
│   │   │   ├── RedirectIfAuth.tsx
│   │   │   ├── Snackbar.tsx
│   │   │   └── WatchVideoButton.tsx
│   │   └── layout/            # Layout components
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       ├── Layout.tsx
│   │       ├── PageHeader.tsx
│   │       └── components/
│   │           ├── Actions.tsx
│   │           ├── LanguageSwitcher.tsx
│   │           ├── Logo.tsx
│   │           └── NavLink.tsx
│   │
│   ├── config/                # Configuration files
│   │   ├── index.ts           # Environment config
│   │   ├── menuConfig.ts      # Menu configuration
│   │   └── routesMeta.ts      # Route metadata
│   │
│   ├── contexts/              # React Context providers
│   │   ├── GlobalContext.tsx  # Global state context
│   │   ├── GlobalProvider.tsx # Global state provider
│   │   ├── PreOrderContext.tsx # Pre-order state
│   │   └── SnackbarContext.tsx # Snackbar notifications
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useGlobal.ts       # Global state hook
│   │   ├── useSnackbar.ts     # Snackbar hook
│   │   ├── useTranslation.ts  # i18n hook
│   │   └── useRouteMeta.ts    # Route metadata hook
│   │
│   ├── i18n/                  # Internationalization
│   │   ├── config.ts          # i18next configuration
│   │   └── i18next.d.ts       # TypeScript definitions
│   │
│   ├── locales/               # Translation files
│   │   ├── en/                # English translations
│   │   │   ├── common.json
│   │   │   ├── home.json
│   │   │   ├── auth.json
│   │   │   ├── checkout.json
│   │   │   ├── cart.json
│   │   │   ├── product.json
│   │   │   ├── booking.json
│   │   │   ├── account.json
│   │   │   ├── about.json
│   │   │   ├── menu.json
│   │   │   ├── contact.json
│   │   │   └── chef.json
│   │   └── vi/                # Vietnamese translations
│   │       └── (same structure as en/)
│   │
│   ├── pages/                 # Page components
│   │   ├── Home/              # Home page
│   │   ├── Auth/              # Authentication pages
│   │   │   ├── SignInPage.tsx
│   │   │   ├── SignUpPage.tsx
│   │   │   ├── ForgotPasswordPage.tsx
│   │   │   └── OAuth2CallbackPage.tsx
│   │   ├── Menu/              # Menu page
│   │   ├── Shop/              # Shop listing
│   │   ├── ProductDetail/     # Product detail
│   │   ├── Cart/              # Shopping cart
│   │   ├── CheckOut/          # Checkout process
│   │   ├── PlaceTableForGuest/ # Table reservation
│   │   ├── OrderAtTable/      # Order at table
│   │   ├── Account/           # User account
│   │   │   ├── DashboardPage.tsx
│   │   │   └── SettingsPage.tsx
│   │   ├── MyOrders/          # Order history
│   │   ├── WishList/          # Wishlist
│   │   ├── AboutUs/           # About page
│   │   ├── Chef/              # Chef profiles
│   │   ├── OrderSuccess/      # Order confirmation
│   │   ├── PaymentCallback/   # Payment callback
│   │   └── NotFound/          # 404 page
│   │
│   ├── routers/               # Routing configuration
│   │   ├── routes.tsx         # Route definitions
│   │   ├── PrivateRoute.tsx   # Protected routes
│   │   └── PublicRoute.tsx    # Public routes
│   │
│   ├── services/              # Business logic layer
│   │   ├── authService.ts     # Authentication logic
│   │   ├── cartService.ts     # Cart logic
│   │   ├── categoryService.ts # Category logic
│   │   └── productService.ts  # Product logic
│   │
│   ├── types/                 # TypeScript type definitions
│   │   ├── enums/             # Enum types
│   │   │   ├── gender.enum.ts
│   │   │   ├── methodPayment.enum.ts
│   │   │   ├── order.enum.ts
│   │   │   └── product.enum.ts
│   │   ├── models/            # Data models
│   │   │   ├── user.ts
│   │   │   ├── product.ts
│   │   │   ├── cart.ts
│   │   │   ├── cartItem.ts
│   │   │   ├── order.ts
│   │   │   ├── orderItem.ts
│   │   │   ├── address.ts
│   │   │   └── image.ts
│   │   ├── requests/          # API request types
│   │   │   ├── auth.request.ts
│   │   │   ├── cart.request.ts
│   │   │   ├── order.request.ts
│   │   │   └── product.request.ts
│   │   └── responses/         # API response types
│   │       ├── api.response.ts
│   │       ├── auth.response.ts
│   │       ├── cart.response.ts
│   │       └── ...
│   │
│   ├── utils/                 # Utility functions
│   │   ├── axiosClient.ts     # Axios instance
│   │   ├── authUtils.ts       # Auth utilities
│   │   └── format.ts          # Formatting utilities
│   │
│   ├── App.tsx                # Root component
│   ├── main.tsx               # Entry point
│   ├── index.css              # Global styles
│   └── vite-env.d.ts          # Vite type definitions
│
├── .husky/                     # Git hooks
├── commitlint.config.ts        # Commitlint configuration
├── eslint.config.js            # ESLint configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── tsconfig.app.json           # App TypeScript config
├── tsconfig.node.json          # Node TypeScript config
├── vite.config.ts              # Vite configuration
├── package.json                # Dependencies and scripts
├── README.md                   # Project readme
└── DOCUMENTATION.md            # This file
```

---

## 🏗️ Architecture

### Application Architecture

The application follows a **layered architecture** pattern:

```
┌─────────────────────────────────────────┐
│           Presentation Layer            │
│  (Pages, Components, Hooks, Contexts)   │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│          Business Logic Layer           │
│         (Services, Utilities)           │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│          Data Access Layer              │
│        (API, Axios Client)              │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│            Backend API                  │
│      (REST API - External)              │
└─────────────────────────────────────────┘
```

### Component Architecture

Components are organized into three categories:

1. **Pages** - Route-level components
2. **Layout Components** - Header, Footer, Layout wrappers
3. **Common Components** - Reusable UI components

### Data Flow

```
User Action → Component → Hook/Context → Service → API → Backend
                ↓                                    ↓
            UI Update ← State Update ← Response ← Backend
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** >= 18.0.0 (recommended: v20.19.4)
- **npm** >= 8.0.0 (recommended: v11.5.2)
- **Git** for version control

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api
VITE_BACKEND_BASE_URL=http://localhost:8080

# Optional configurations
VITE_APP_NAME=Siupo Restaurant
VITE_APP_VERSION=1.0.0
```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/hugn2k4/siupo-frontend.git
   cd siupo-restaurant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open browser at `http://localhost:5173`

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run dev` | Start dev server with HMR |
| **Build** | `npm run build` | Build for production |
| **Preview** | `npm run preview` | Preview production build |
| **Lint** | `npm run lint` | Check code for errors |
| **Lint Fix** | `npm run lint:fix` | Fix linting errors |
| **Format** | `npm run format` | Format code with Prettier |
| **Type Check** | `npm run type-check` | Check TypeScript types |
| **Prepare** | `npm run prepare` | Setup Husky hooks |

---

## 🌐 Internationalization (i18n)

### Overview

The application supports **English** and **Vietnamese** using **i18next**.

### Namespace Structure

12 translation namespaces for organized translations:

| Namespace | Purpose | Files |
|-----------|---------|-------|
| `common` | Global UI elements, navigation, actions | common.json |
| `home` | Home page content | home.json |
| `auth` | Authentication pages | auth.json |
| `checkout` | Checkout process | checkout.json |
| `cart` | Shopping cart | cart.json |
| `product` | Product pages | product.json |
| `booking` | Table reservations | booking.json |
| `account` | User account pages | account.json |
| `about` | About us page | about.json |
| `menu` | Menu page | menu.json |
| `contact` | Contact page | contact.json |
| `chef` | Chef profiles | chef.json |

### Usage Examples

#### Basic Usage
```tsx
import { useTranslation } from '../../hooks/useTranslation';

function MyComponent() {
  // Default namespace is 'common'
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('navigation.home')}</h1>
      <button>{t('actions.submit')}</button>
    </div>
  );
}
```

#### Specific Namespace
```tsx
import { useTranslation } from '../../hooks/useTranslation';

function CheckoutPage() {
  const { t } = useTranslation('checkout');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <form>
        <input placeholder={t('address.fullName')} />
        <input placeholder={t('address.phone')} />
      </form>
    </div>
  );
}
```

#### Change Language
```tsx
import { useTranslation } from '../../hooks/useTranslation';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  
  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('vi')}>Tiếng Việt</button>
    </div>
  );
}
```

### Translation File Structure

**Example: `locales/en/checkout.json`**
```json
{
  "title": "Checkout",
  "steps": {
    "address": "Address",
    "payment": "Payment",
    "review": "Review"
  },
  "address": {
    "fullName": "Full Name",
    "phone": "Phone Number",
    "street": "Street Address",
    "city": "City"
  }
}
```

### Adding New Translations

1. Add keys to both `en/` and `vi/` JSON files
2. Use dot notation for nested keys: `t('section.key')`
3. Keep translations consistent across languages
4. Use meaningful key names

---

## 🔄 State Management

### Global State (Context API)

#### GlobalContext

Manages authentication and user state:

```tsx
interface GlobalState {
  user: User | null;
  accessToken: string | null;
  isLogin: boolean;
}
```

**Usage:**
```tsx
import { useGlobal } from '../hooks/useGlobal';

function MyComponent() {
  const { user, isLogin, setGlobal, logout } = useGlobal();
  
  if (!isLogin) return <LoginPrompt />;
  
  return <div>Welcome, {user?.fullName}</div>;
}
```

#### SnackbarContext

Manages notification messages:

```tsx
const { showSnackbar } = useSnackbar();

// Show success message
showSnackbar('Item added to cart', 'success');

// Show error message
showSnackbar('Failed to load data', 'error');
```

#### PreOrderContext

Manages pre-order state for table bookings:

```tsx
const { preOrderItems, addPreOrderItem, clearPreOrder } = usePreOrderContext();
```

### Local State

Components use React hooks for local state:
- `useState` - Component state
- `useReducer` - Complex state logic
- `useRef` - DOM references and mutable values

### Form State

Forms use **React Hook Form** for validation:

```tsx
import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} />
      {errors.email && <span>Email is required</span>}
    </form>
  );
}
```

---

## 🔌 API Integration

### Axios Configuration

**File: `src/utils/axiosClient.ts`**

Features:
- Automatic token injection
- Request/response interceptors
- Token refresh mechanism
- Session expiration handling
- Request ID tracking
- Error handling

### API Structure

All API calls are organized in `src/api/` directory:

```typescript
// Example: src/api/productApi.ts
import axiosClient from '../utils/axiosClient';
import type { ProductResponse } from '../types/responses/product.response';

const productApi = {
  getAll: () => axiosClient.get<ProductResponse[]>('/products'),
  getById: (id: string) => axiosClient.get<ProductResponse>(`/products/${id}`),
  create: (data: ProductRequest) => axiosClient.post('/products', data),
};

export default productApi;
```

### Service Layer

Services wrap API calls with business logic:

```typescript
// Example: src/services/productService.ts
import productApi from '../api/productApi';

const productService = {
  getAllProducts: async () => {
    const response = await productApi.getAll();
    return response.data;
  },
  
  getProductById: async (id: string) => {
    const response = await productApi.getById(id);
    return response.data;
  },
};

export default productService;
```

### Available APIs

| API | File | Purpose |
|-----|------|---------|
| Auth | `authApi.ts` | Login, register, logout, password recovery |
| Cart | `cartApi.ts` | Add/remove items, update quantities |
| Product | `productApi.ts` | Product listing, details, search |
| Order | `orderApi.ts` | Create orders, order history |
| Booking | `bookingApi.ts` | Table reservations |
| Category | `categoryApi.ts` | Product categories |
| User | `userApi.ts` | User profile, settings |
| Address | `addressApi.ts` | Address management |
| Wishlist | `wishListApi.ts` | Favorite items |
| Review | `reviewApi.ts` | Product reviews |
| Notification | `notificationApi.ts` | User notifications |
| Upload | `uploadApi.ts` | File uploads |

---

## 🛣️ Routing System

### Route Configuration

**File: `src/routers/routes.tsx`**

The application uses **React Router v7** with:
- Nested routes
- Protected routes (authentication required)
- Public routes (redirect if authenticated)
- Dynamic routes with parameters
- Route metadata for breadcrumbs and titles

### Route Structure

```
/                           → Home
/menu                       → Menu listing
/shop                       → Shop listing
/shop/:productId            → Product detail
/cart                       → Cart (protected)
/checkout                   → Checkout (protected)
/placetable                 → Table reservation
/orderattable               → Order at table
/about                      → About us
/chef                       → Chef profiles
/signin                     → Sign in (public)
/signup                     → Sign up (public)
/forgot-password            → Password recovery (public)
/forgot-password/set-new-password → Reset password (public)
/account/dashboard          → User dashboard (protected)
/account/settings           → User settings (protected)
/account/wishlist           → Wishlist (protected)
/orders                     → Order history (protected)
/order-success              → Order confirmation
/payment-callback           → Payment callback
/auth/oauth2/callback       → OAuth2 callback
```

### Protected Routes

Routes requiring authentication:

```tsx
import PrivateRoute from './PrivateRoute';

{
  element: <PrivateRoute />,
  children: [
    { path: 'cart', element: <Cart /> },
    { path: 'account/dashboard', element: <DashboardPage /> },
    // ... more protected routes
  ]
}
```

### Public Routes

Routes that redirect authenticated users:

```tsx
import PublicRoute from './PublicRoute';

{
  element: <PublicRoute />,
  children: [
    { path: 'signin', element: <SignInPage /> },
    { path: 'signup', element: <SignUpPage /> },
    // ... more public routes
  ]
}
```

### Route Metadata

Routes can have metadata for breadcrumbs and page titles:

```typescript
// src/config/routesMeta.ts
export const ROUTES_META = {
  '/menu': {
    titleKey: 'navigation.menu',
    breadcrumb: [
      { labelKey: 'navigation.home', path: '/' },
      { labelKey: 'navigation.menu', path: '/menu' }
    ]
  }
};
```

### Navigation

```tsx
import { Link, useNavigate } from 'react-router-dom';

// Using Link
<Link to="/menu">Go to Menu</Link>

// Using navigate
const navigate = useNavigate();
navigate('/cart');
```

---

## 🔐 Authentication

### Authentication Flow

1. **Login**
   - User submits credentials
   - API returns access token and user data
   - Token stored in localStorage
   - User redirected to dashboard

2. **Token Management**
   - Token automatically attached to requests
   - Refresh token on expiration
   - Session expiration handling

3. **Logout**
   - Clear localStorage
   - Revoke token on backend
   - Redirect to home page

### OAuth2 Authentication

Supports Google OAuth2:

```tsx
// Initiate OAuth2 flow
const handleGoogleLogin = () => {
  window.location.href = `${BACKEND_BASE_URL}/oauth2/authorize/google`;
};

// Handle callback
// Route: /auth/oauth2/callback
```

### Protected Routes

Components requiring authentication:

```tsx
import PrivateRoute from './PrivateRoute';

// Checks authentication before rendering
<Route element={<PrivateRoute />}>
  <Route path="cart" element={<Cart />} />
</Route>
```

### Login Required Dialog

Shows login prompt for unauthenticated users:

```tsx
import LoginRequiredDialog from '../components/common/LoginRequiredDialog';

<LoginRequiredDialog
  open={!isLogin}
  message="You need to login to view your cart"
/>
```

### Password Recovery

Multi-step password recovery:

1. Request reset (enter email)
2. Verify OTP
3. Set new password

---

## 🎨 Component Library

### Common Components

#### Button
```tsx
import Button from '../components/common/Button';

<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>
```

#### Snackbar
```tsx
import { useSnackbar } from '../hooks/useSnackbar';

const { showSnackbar } = useSnackbar();
showSnackbar('Success!', 'success');
```

#### LoginRequiredDialog
```tsx
<LoginRequiredDialog
  open={showDialog}
  onClose={() => setShowDialog(false)}
  message="Please login to continue"
/>
```

### Layout Components

#### Header
- Navigation menu
- User account actions
- Cart icon with count
- Language switcher

#### Footer
- Restaurant information
- Quick links
- Social media links
- Newsletter signup

#### PageHeader
- Page title
- Breadcrumb navigation
- Background image

### Material-UI Components

The application uses MUI components:
- `Button`, `TextField`, `Select`
- `Dialog`, `Modal`, `Drawer`
- `Table`, `Pagination`
- `Tabs`, `Accordion`
- `Snackbar`, `Alert`

### Custom Styling

Components use a mix of:
- Tailwind utility classes
- MUI theme customization
- CSS modules (where needed)

---

## 🎨 Styling Guide

### Tailwind CSS v4

The application uses **Tailwind CSS v4** with custom configuration.

#### Configuration

**File: `tailwind.config.ts`**

```typescript
export default {
  theme: {
    extend: {
      fontFamily: {
        miniver: ["Miniver", "cursive"],
      },
    },
  },
};
```

#### Usage Examples

```tsx
// Utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-800">Title</h2>
  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Click Me
  </button>
</div>

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Grid items */}
</div>
```

### Material-UI Theming

MUI components use default theme with custom overrides:

```tsx
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#your-color',
    },
  },
});
```

### Custom Fonts

- **Miniver** - Decorative font for headings
- **Roboto** - Default Material-UI font

### Color Palette

Use semantic color classes:
- Primary: Blue tones
- Success: Green
- Warning: Yellow
- Error: Red
- Neutral: Gray scale

### Best Practices

1. Use Tailwind utilities first
2. Use MUI components for complex widgets
3. Keep custom CSS minimal
4. Use responsive classes (`sm:`, `md:`, `lg:`)
5. Maintain consistent spacing scale

---

## 📦 Build & Deployment

### Production Build

```bash
npm run build
```

Output directory: `dist/`

### Build Optimization

Vite automatically:
- Minifies code
- Tree-shakes unused code
- Code splits for optimal loading
- Optimizes images and assets

### Preview Build

Test production build locally:

```bash
npm run preview
```

### Environment Configuration

**Production `.env`:**
```env
VITE_API_BASE_URL=https://api.your-domain.com/api
VITE_BACKEND_BASE_URL=https://api.your-domain.com
```

### Deployment Platforms

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

### Performance Considerations

- Enable gzip/brotli compression
- Configure CDN for static assets
- Set appropriate cache headers
- Monitor bundle size

---

## 🧪 Testing

### Testing Strategy

While formal tests are not yet implemented, the application can be tested through:

1. **Manual Testing**
   - Test all user flows
   - Verify responsive design
   - Check browser compatibility

2. **Integration Testing**
   - Test API integration
   - Verify authentication flows
   - Test payment processing

3. **E2E Testing** (Recommended)
   - Use Cypress or Playwright
   - Test critical user journeys
   - Automate regression tests

### Recommended Testing Tools

```bash
# Install Vitest (recommended)
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Install Cypress (for E2E)
npm install -D cypress
```

### Example Test Structure

```typescript
// Example: ProductCard.test.tsx
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  it('renders product name', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Product Name')).toBeInTheDocument();
  });
});
```

---

## ✅ Code Quality

### ESLint Configuration

**File: `eslint.config.js`**

Linting rules:
- TypeScript recommended rules
- React hooks rules
- React refresh plugin

Run linting:
```bash
npm run lint        # Check for errors
npm run lint:fix    # Fix automatically
```

### Prettier Configuration

Code formatting with Prettier:

```bash
npm run format
```

### Husky Git Hooks

Pre-commit hooks ensure code quality:

1. **lint-staged** - Lint staged files
2. **commitlint** - Validate commit messages

### Commit Message Convention

Follow **Conventional Commits**:

```
feat: add new feature
fix: fix bug
docs: update documentation
style: format code
refactor: refactor code
test: add tests
chore: update dependencies
```

Examples:
```bash
git commit -m "feat: add product filter component"
git commit -m "fix: resolve cart quantity update issue"
git commit -m "docs: update API documentation"
```

### Code Review Checklist

- [ ] TypeScript types are properly defined
- [ ] No console.log in production code
- [ ] Components are properly typed
- [ ] Translation keys are added
- [ ] Code follows project structure
- [ ] No unused imports or variables
- [ ] Responsive design is tested
- [ ] Error handling is implemented

---

## 🌿 Git Workflow & Best Practices

### Branch Structure

The project follows a structured branching strategy:

```
main                    # Production branch (stable releases)
├── dev                 # Development branch (integration)
├── feature/*           # Feature development branches
├── bugfix/*            # Bug fix branches
└── hotfix/*            # Emergency hotfix branches
```

### Branch Naming Convention

**Format:** `<type>/<short-description>`

| Type | Format | Example | Purpose |
|------|--------|---------|----------|
| **Feature** | `feature/feature-name` | `feature/user-authentication` | New features |
| **Bugfix** | `bugfix/bug-description` | `bugfix/navbar-responsive` | Bug fixes |
| **Hotfix** | `hotfix/critical-issue` | `hotfix/payment-error` | Critical fixes |
| **Refactor** | `refactor/component-name` | `refactor/header-component` | Code improvements |

**Examples:**
```bash
feature/google-oauth
feature/multi-language-support
bugfix/cart-quantity-update
bugfix/responsive-menu
hotfix/checkout-crash
refactor/api-service-layer
```

### Commit Message Convention

The project uses **Conventional Commits** enforced by **Husky + Commitlint**.

#### Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

#### Commit Types

| Type | Description | Example |
|------|-------------|----------|
| `feat` | New feature | `feat: add Google OAuth authentication` |
| `fix` | Bug fix | `fix: resolve cart quantity update issue` |
| `docs` | Documentation only | `docs: update API integration guide` |
| `style` | Code formatting (no logic change) | `style: format code with Prettier` |
| `refactor` | Code refactoring | `refactor: optimize Header component` |
| `perf` | Performance improvement | `perf: lazy load product images` |
| `test` | Add or update tests | `test: add unit tests for authService` |
| `build` | Build system changes | `build: update Vite configuration` |
| `ci` | CI/CD changes | `ci: add GitHub Actions workflow` |
| `chore` | Maintenance tasks | `chore: upgrade dependencies` |
| `revert` | Revert previous commit | `revert: revert feat: add feature X` |

#### Commit Scope (Optional)

Scope indicates the area of codebase affected:

```bash
feat(auth): add forgot password flow
fix(cart): resolve quantity increment bug
docs(readme): update installation steps
style(header): improve navigation spacing
refactor(api): restructure service layer
```

#### Valid Commit Examples

```bash
# Simple commits
feat: add user profile page
fix: correct login redirect
docs: update README

# With scope
feat(checkout): add payment method selection
fix(menu): resolve filter not working
style(footer): update social media icons

# With body
feat: implement multi-language support

Added i18next integration with English and Vietnamese translations.
Created 12 namespace structure for better organization.

# With breaking change
feat!: migrate to React Router v7

BREAKING CHANGE: Updated routing syntax requires code changes in all route definitions.
```

#### Invalid Commits (Will Be Rejected)

```bash
❌ "update code"              # Too vague
❌ "WIP"                      # Not descriptive
❌ "fixed bug"                # Missing type prefix
❌ "Feat: Add feature"        # Capital letter after colon
❌ "feat:add feature"         # Missing space after colon
```

### Git Workflow

#### 1. Starting a New Feature

```bash
# Ensure you're on dev branch and it's up to date
git checkout dev
git pull origin dev

# Create a new feature branch
git checkout -b feature/your-feature-name

# Verify you're on the correct branch
git branch
```

#### 2. Making Changes

```bash
# Make your code changes...

# Check status
git status

# Stage changes
git add .
# Or stage specific files
git add src/components/Header.tsx

# Commit with proper message (Commitlint will validate)
git commit -m "feat: add new navigation menu"

# If commit is rejected, fix the message format
git commit -m "feat(header): add new navigation menu"
```

#### 3. Pushing Changes

```bash
# Push branch to remote
git push origin feature/your-feature-name

# If this is your first push
git push -u origin feature/your-feature-name
```

#### 4. Creating Pull Request

1. Go to GitHub repository
2. Click "Compare & pull request"
3. **Base branch:** `dev` (not `main`)
4. **Compare branch:** your feature branch
5. Fill in PR template:
   - **Title:** Clear description of changes
   - **Description:** What, why, and how
   - **Screenshots:** If UI changes
   - **Testing:** How to test
6. Request reviewers
7. Link related issues
8. Submit PR

#### 5. Code Review Process

**For Author:**
- Respond to review comments
- Make requested changes
- Push updates to same branch
- Re-request review when ready

**For Reviewer:**
- Check code quality
- Test functionality
- Verify no breaking changes
- Approve or request changes

#### 6. Merging Pull Request

```bash
# After PR approval
# Merge using GitHub UI (Squash and Merge recommended)

# Delete remote branch (via GitHub)

# Update local dev branch
git checkout dev
git pull origin dev

# Delete local feature branch
git branch -d feature/your-feature-name
```

#### 7. Keeping Feature Branch Updated

If your feature branch is long-lived:

```bash
# Option 1: Merge dev into feature branch
git checkout feature/your-feature
git merge dev
git push origin feature/your-feature

# Option 2: Rebase (cleaner history, use with caution)
git checkout feature/your-feature
git rebase dev
git push origin feature/your-feature --force-with-lease
```

### Useful Git Commands

#### Status & Information

```bash
# Check current status
git status

# View commit history
git log --oneline
git log --graph --oneline --all

# View changes
git diff
git diff --staged

# List branches
git branch -a              # All branches
git branch -r              # Remote branches
```

#### Branch Management

```bash
# Create and switch to new branch
git checkout -b feature/new-feature

# Switch branches
git checkout dev

# Delete local branch
git branch -d feature/old-feature     # Safe delete
git branch -D feature/old-feature     # Force delete

# Delete remote branch
git push origin --delete feature/old-feature

# Rename current branch
git branch -m new-name
```

#### Undoing Changes

```bash
# Discard unstaged changes
git restore file.txt
git checkout -- file.txt

# Unstage files
git restore --staged file.txt
git reset HEAD file.txt

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert a commit (create new commit)
git revert <commit-hash>
```

#### Stashing

```bash
# Save work in progress
git stash
git stash save "description"

# List stashes
git stash list

# Apply stash
git stash apply
git stash apply stash@{0}

# Apply and remove stash
git stash pop

# Clear all stashes
git stash clear
```

### Team Collaboration Rules

#### DO ✅

1. **Always create feature branches** from `dev`
2. **Write descriptive commit messages** following conventions
3. **Pull latest changes** before creating new branch
4. **Create Pull Requests** for all changes (even small ones)
5. **Request code reviews** from team members
6. **Test your changes** before pushing
7. **Resolve merge conflicts** before requesting review
8. **Delete branches** after merging
9. **Keep commits atomic** (one logical change per commit)
10. **Update documentation** when changing features

#### DON'T ❌

1. **Never push directly to `main` or `dev`**
2. **Never force push to shared branches**
3. **Never commit sensitive data** (API keys, passwords)
4. **Never commit node_modules or dist folders**
5. **Never use vague commit messages** ("fix", "update", "WIP")
6. **Never merge your own PRs** without review
7. **Never commit commented-out code** (delete instead)
8. **Never commit console.logs** in production code
9. **Never work directly on `dev` branch**
10. **Never rebase public/shared branches**

### Merge Conflict Resolution

```bash
# When conflicts occur during merge/rebase

# 1. Check which files have conflicts
git status

# 2. Open conflicted files and resolve
# Look for conflict markers:
<<<<<<< HEAD
Your changes
=======
Incoming changes
>>>>>>> branch-name

# 3. Choose which code to keep or merge both

# 4. Stage resolved files
git add resolved-file.tsx

# 5. Complete the merge
git commit  # If merging
git rebase --continue  # If rebasing

# To abort merge/rebase
git merge --abort
git rebase --abort
```

### Git Aliases (Optional)

Add to `.gitconfig` for faster commands:

```bash
[alias]
  st = status
  co = checkout
  br = branch
  ci = commit
  unstage = reset HEAD --
  last = log -1 HEAD
  visual = log --graph --oneline --all
  amend = commit --amend --no-edit
```

Usage:
```bash
git st              # git status
git co dev          # git checkout dev
git br              # git branch
git visual          # pretty log
```

### Emergency Procedures

#### Accidentally Committed to Wrong Branch

```bash
# If not pushed yet
git reset HEAD~1              # Undo commit, keep changes
git stash                     # Save changes
git checkout correct-branch   # Switch to correct branch
git stash pop                 # Apply changes
git add .
git commit -m "correct message"
```

#### Accidentally Pushed Sensitive Data

```bash
# 1. Remove from history (use with extreme caution)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/file" \
  --prune-empty --tag-name-filter cat -- --all

# 2. Force push
git push origin --force --all

# 3. Notify team to re-clone repository
# 4. Rotate compromised credentials immediately
```

#### Recover Deleted Branch

```bash
# Find commit hash
git reflog

# Recreate branch
git checkout -b recovered-branch <commit-hash>
```

---

## ⚡ Performance Optimization

### Current Optimizations

1. **Code Splitting**
   - Route-based code splitting
   - Dynamic imports for heavy components

2. **Asset Optimization**
   - Image lazy loading
   - Optimized image formats

3. **Caching**
   - API response caching
   - localStorage for auth state

4. **Rendering Optimization**
   - React.memo for expensive components
   - useMemo and useCallback hooks
   - Virtualized lists for long data

### Recommended Optimizations

1. **Image Optimization**
   ```tsx
   // Use next-gen formats
   <img src="image.webp" alt="..." loading="lazy" />
   ```

2. **Bundle Analysis**
   ```bash
   npm install -D rollup-plugin-visualizer
   ```

3. **React Query** (recommended)
   ```bash
   npm install @tanstack/react-query
   ```

4. **Lighthouse Audits**
   - Run regular performance audits
   - Target 90+ performance score

### Performance Monitoring

Track key metrics:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Cumulative Layout Shift (CLS)

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Build Fails

**Error:** `Type error: Cannot find module...`

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 2. API Connection Issues

**Error:** `Network Error` or `CORS Error`

**Solution:**
- Check API_BASE_URL in `.env`
- Verify backend is running
- Check CORS configuration on backend

#### 3. Translation Not Working

**Error:** Translation keys showing instead of text

**Solution:**
- Verify JSON files in `locales/`
- Check namespace import
- Clear browser cache

#### 4. Authentication Issues

**Error:** User logged out unexpectedly

**Solution:**
- Check token expiration
- Verify refresh token logic
- Check localStorage permissions

#### 5. Hot Module Replacement (HMR) Not Working

**Solution:**
```bash
# Restart dev server
npm run dev
```

### Development Tips

1. **Use React DevTools** - Debug component state
2. **Use Redux DevTools** - If using Redux later
3. **Network Tab** - Monitor API calls
4. **Console Logs** - Check for errors
5. **Lighthouse** - Performance auditing

### Getting Help

- Check existing GitHub issues
- Create new issue with:
  - Problem description
  - Steps to reproduce
  - Expected vs actual behavior
  - Environment details

---

## 📚 Additional Resources

### Official Documentation

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Material-UI](https://mui.com/material-ui/)
- [React Router](https://reactrouter.com/)
- [i18next](https://www.i18next.com/)

### Learning Resources

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Tailwind CSS Cheatsheet](https://nerdcave.com/tailwind-cheat-sheet)
- [JavaScript.info](https://javascript.info/)

### Community

- Stack Overflow - Tag: `reactjs`, `typescript`
- Reddit: r/reactjs
- Discord: Reactiflux

---

## 📝 License

This project is proprietary and confidential.

---

## 👥 Contributors

- **Development Team** - Siupo Restaurant Development
- **Repository Owner** - [hugn2k4](https://github.com/hugn2k4)

---

## 📞 Contact & Support

For questions or support:
- Repository: [siupo-frontend](https://github.com/hugn2k4/siupo-frontend)
- Branch: `feature/change-languae`

---

**Last Updated:** November 25, 2025  
**Documentation Version:** 1.0.0
