# 🔌 API Integration

## Overview

The application uses **Axios** for HTTP communication with the backend REST API. API calls are organized in a **three-layer architecture**: API layer, Service layer, and Component layer.

---

## 🏗️ Architecture

```
Component
    ↓ (uses)
Service Layer
    ↓ (calls)
API Layer
    ↓ (HTTP)
Backend REST API
```

### Layer Responsibilities

| Layer | Location | Responsibility |
|-------|----------|----------------|
| **API Layer** | `/src/api/` | HTTP requests, endpoints |
| **Service Layer** | `/src/services/` | Business logic, data transformation |
| **Component Layer** | `/src/pages/`, `/src/components/` | UI rendering, user interactions |

---

## ⚙️ Axios Configuration

### Axios Client Setup

**File:** `src/utils/axiosClient.ts`

```typescript
import axios from "axios";
import { API_BASE_URL, DEFAULT_HEADERS } from "../config";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: DEFAULT_HEADERS,
  withCredentials: true,
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Add request ID for tracking
    const reqId = generateRequestId();
    config.headers["X-Request-ID"] = reqId.toString();

    // Add auth token
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(`🔹 [${reqId}] Request:`, {
      url: config.url,
      method: config.method?.toUpperCase(),
    });

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => {
    const reqId = response.config.headers["X-Request-ID"];
    console.log(`✅ [${reqId}] Response:`, response.data);
    return response.data;
  },
  async (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      await handleTokenRefresh(error);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
```

### Configuration

**File:** `src/config/index.ts`

```typescript
export const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const BACKEND_BASE_URL = 
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:8080";

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};
```

---

## 📁 API Layer

### Structure

```
src/api/
├── authApi.ts           # Authentication
├── userApi.ts           # User profile
├── productApi.ts        # Products
├── categoryApi.ts       # Categories
├── cartApi.ts           # Shopping cart
├── orderApi.ts          # Orders
├── bookingApi.ts        # Table reservations
├── addressApi.ts        # Address management
├── wishListApi.ts       # Wishlist
├── reviewApi.ts         # Reviews
├── notificationApi.ts   # Notifications
├── bannerApi.ts         # Banners
└── uploadApi.ts         # File uploads
```

### API Module Pattern

**Example:** `src/api/productApi.ts`

```typescript
import axiosClient from "../utils/axiosClient";
import type { ProductResponse } from "../types/responses/product.response";
import type { PageResponse } from "../types/responses/api.response";

const productApi = {
  // Get all products
  getAll: () => 
    axiosClient.get<PageResponse<ProductResponse>>("/products"),

  // Get product by ID
  getById: (id: string) => 
    axiosClient.get<ProductResponse>(`/products/${id}`),

  // Get products by category
  getByCategory: (categoryId: string) => 
    axiosClient.get<PageResponse<ProductResponse>>(
      `/products/category/${categoryId}`
    ),

  // Search products
  search: (params: { keyword: string; page?: number; size?: number }) => 
    axiosClient.get<PageResponse<ProductResponse>>("/products/search", {
      params,
    }),

  // Get featured products
  getFeatured: () => 
    axiosClient.get<ProductResponse[]>("/products/featured"),
};

export default productApi;
```

### Common Patterns

#### GET Request
```typescript
getAll: () => axiosClient.get("/endpoint"),
getById: (id: string) => axiosClient.get(`/endpoint/${id}`),
```

#### POST Request
```typescript
create: (data: RequestType) => 
  axiosClient.post("/endpoint", data),
```

#### PUT Request
```typescript
update: (id: string, data: RequestType) => 
  axiosClient.put(`/endpoint/${id}`, data),
```

#### DELETE Request
```typescript
delete: (id: string) => 
  axiosClient.delete(`/endpoint/${id}`),
```

#### Query Parameters
```typescript
search: (params: { keyword: string; page: number }) => 
  axiosClient.get("/endpoint", { params }),
```

---

## 🔧 Service Layer

### Structure

```
src/services/
├── authService.ts       # Authentication logic
├── cartService.ts       # Cart operations
├── categoryService.ts   # Category logic
└── productService.ts    # Product logic
```

### Service Pattern

**Example:** `src/services/authService.ts`

```typescript
import authApi from "../api/authApi";
import type { LoginRequest, RegisterRequest } from "../types/requests/auth.request";

export const authService = {
  login: async (credentials: LoginRequest) => {
    const response = await authApi.login(credentials);

    if (response.success && response.data) {
      const { accessToken, user } = response.data;
      
      // Store token
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
      
      // Store user
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    }
    
    return response;
  },

  register: async (data: RegisterRequest) => {
    const response = await authApi.register(data);
    return response;
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    return authApi.logout();
  },
};
```

### Service Responsibilities

1. **Call API layer**
2. **Transform data** (if needed)
3. **Handle side effects** (localStorage, state updates)
4. **Business logic** (validation, calculations)
5. **Error handling**

---

## 📡 Complete API Reference

### Authentication API

**File:** `src/api/authApi.ts`

```typescript
const authApi = {
  login: (data: LoginRequest) => 
    axiosClient.post("/auth/login", data),
    
  register: (data: RegisterRequest) => 
    axiosClient.post("/auth/register", data),
    
  logout: () => 
    axiosClient.post("/auth/logout"),
    
  confirm: (data: { email: string; otp: string }) => 
    axiosClient.post("/auth/confirm", data),
    
  resendOTP: (email: string) => 
    axiosClient.post("/auth/resend-otp", { email }),
    
  requestForgotPassword: (email: string) => 
    axiosClient.post("/auth/forgot-password", { email }),
    
  setNewPassword: (data: ForgotPasswordRequest) => 
    axiosClient.post("/auth/reset-password", data),
    
  refreshToken: () => 
    axiosClient.post("/auth/refresh-token"),
};
```

### Product API

**File:** `src/api/productApi.ts`

```typescript
const productApi = {
  getAll: (params?: { page?: number; size?: number }) => 
    axiosClient.get("/products", { params }),
    
  getById: (id: string) => 
    axiosClient.get(`/products/${id}`),
    
  getByCategory: (categoryId: string, params?: PaginationParams) => 
    axiosClient.get(`/products/category/${categoryId}`, { params }),
    
  search: (params: { keyword: string; page?: number; size?: number }) => 
    axiosClient.get("/products/search", { params }),
    
  getFeatured: () => 
    axiosClient.get("/products/featured"),
    
  getRelated: (productId: string) => 
    axiosClient.get(`/products/${productId}/related`),
};
```

### Cart API

**File:** `src/api/cartApi.ts`

```typescript
const cartApi = {
  getCart: () => 
    axiosClient.get("/cart"),
    
  addItemToCart: (item: AddToCartRequest) => 
    axiosClient.post("/cart/items", item),
    
  updateItemQuantity: (itemId: string, quantity: number) => 
    axiosClient.put(`/cart/items/${itemId}`, { quantity }),
    
  removeCartItem: (itemId: string) => 
    axiosClient.delete(`/cart/items/${itemId}`),
    
  clearCart: () => 
    axiosClient.delete("/cart"),
};
```

### Order API

**File:** `src/api/orderApi.ts`

```typescript
const orderApi = {
  createOrder: (data: CreateOrderRequest) => 
    axiosClient.post("/orders", data),
    
  getOrders: (params?: { page?: number; size?: number }) => 
    axiosClient.get("/orders", { params }),
    
  getOrderById: (id: string) => 
    axiosClient.get(`/orders/${id}`),
    
  cancelOrder: (id: string) => 
    axiosClient.put(`/orders/${id}/cancel`),
    
  getOrderStatus: (id: string) => 
    axiosClient.get(`/orders/${id}/status`),
};
```

### Booking API

**File:** `src/api/bookingApi.ts`

```typescript
const bookingApi = {
  createBooking: (data: BookingRequest) => 
    axiosClient.post("/bookings", data),
    
  getBookings: () => 
    axiosClient.get("/bookings"),
    
  getBookingById: (id: string) => 
    axiosClient.get(`/bookings/${id}`),
    
  cancelBooking: (id: string) => 
    axiosClient.put(`/bookings/${id}/cancel`),
    
  checkAvailability: (data: { date: string; guests: number }) => 
    axiosClient.post("/bookings/check-availability", data),
};
```

### User API

**File:** `src/api/userApi.ts`

```typescript
const userApi = {
  getProfile: () => 
    axiosClient.get("/users/profile"),
    
  updateProfile: (data: UpdateProfileRequest) => 
    axiosClient.put("/users/profile", data),
    
  changePassword: (data: ChangePasswordRequest) => 
    axiosClient.put("/users/password", data),
    
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return axiosClient.post("/users/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
```

### Category API

**File:** `src/api/categoryApi.ts`

```typescript
const categoryApi = {
  getAll: () => 
    axiosClient.get("/categories"),
    
  getById: (id: string) => 
    axiosClient.get(`/categories/${id}`),
    
  getProducts: (id: string, params?: PaginationParams) => 
    axiosClient.get(`/categories/${id}/products`, { params }),
};
```

### Wishlist API

**File:** `src/api/wishListApi.ts`

```typescript
const wishListApi = {
  getWishlist: () => 
    axiosClient.get("/wishlist"),
    
  addToWishlist: (productId: string) => 
    axiosClient.post("/wishlist", { productId }),
    
  removeFromWishlist: (productId: string) => 
    axiosClient.delete(`/wishlist/${productId}`),
    
  checkInWishlist: (productId: string) => 
    axiosClient.get(`/wishlist/check/${productId}`),
};
```

---

## 💻 Usage in Components

### Basic Usage

```tsx
import { useState, useEffect } from 'react';
import productApi from '../api/productApi';
import type { Product } from '../types/models/product';

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productApi.getAll();
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### With Service Layer

```tsx
import { useState } from 'react';
import { authService } from '../services/authService';
import { useGlobal } from '../hooks/useGlobal';

function LoginForm() {
  const { setGlobal } = useGlobal();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: LoginRequest) => {
    try {
      setLoading(true);
      const response = await authService.login(data);
      
      if (response.success) {
        setGlobal({
          user: response.data.user,
          accessToken: response.data.accessToken,
          isLogin: true,
        });
        // Navigate to dashboard
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### With React Query (Recommended)

```tsx
import { useQuery } from '@tanstack/react-query';
import productApi from '../api/productApi';

function ProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => productApi.getAll(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      {data?.data.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

---

## 🔐 Authentication Flow

### Token Management

```typescript
// Store token after login
localStorage.setItem("accessToken", token);

// Axios automatically adds token to requests
// via interceptor in axiosClient.ts

// Remove token on logout
localStorage.removeItem("accessToken");
```

### Token Refresh

```typescript
// In axiosClient.ts response interceptor
if (error.response?.status === 401) {
  try {
    const { accessToken } = await authApi.refreshToken();
    localStorage.setItem("accessToken", accessToken);
    
    // Retry original request
    return axiosClient(error.config);
  } catch (refreshError) {
    // Refresh failed, logout user
    handleSessionExpired();
  }
}
```

---

## 🎯 Best Practices

### 1. Type Safety

Always define types for requests and responses:

```typescript
import type { ApiResponse } from '../types/responses/api.response';
import type { Product } from '../types/models/product';

const productApi = {
  getAll: (): Promise<ApiResponse<Product[]>> => 
    axiosClient.get("/products"),
};
```

### 2. Error Handling

```typescript
try {
  const response = await productApi.getAll();
  return response.data;
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error('API Error:', error.response?.data);
  }
  throw error;
}
```

### 3. Loading States

```typescript
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const data = await api.getData();
    setData(data);
  } finally {
    setLoading(false);
  }
};
```

### 4. Abort Controllers

```typescript
useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      const data = await axiosClient.get("/endpoint", {
        signal: controller.signal,
      });
      setData(data);
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error(error);
      }
    }
  };

  fetchData();

  return () => controller.abort();
}, []);
```

### 5. Pagination

```typescript
const fetchProducts = async (page: number, size: number = 10) => {
  const response = await productApi.getAll({ page, size });
  return response;
};
```

---

## 🐛 Troubleshooting

### CORS Errors

**Problem:** `Access-Control-Allow-Origin` error

**Solution:**
```typescript
// In vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
```

### 401 Unauthorized

**Problem:** Token expired or invalid

**Solution:** Check token refresh logic in interceptor

### Network Errors

**Problem:** Request timeout

**Solution:**
```typescript
const axiosClient = axios.create({
  timeout: 10000, // 10 seconds
});
```

---

**Next:** [Authentication →](./11-authentication.md)
