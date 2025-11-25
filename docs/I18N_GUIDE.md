# 🌍 Internationalization (i18n) Guide

## 📁 Cấu trúc

```
src/
├── i18n/
│   ├── config.ts           # i18n configuration
│   └── i18next.d.ts        # TypeScript type definitions
├── locales/
│   ├── en/
│   │   ├── common.json     # Common translations (navigation, actions, messages)
│   │   ├── home.json       # Home page specific
│   │   └── auth.json       # Authentication pages
│   └── vi/
│       ├── common.json
│       ├── home.json
│       └── auth.json
├── hooks/
│   └── useTypedTranslation.ts  # Custom typed hook
└── components/
    └── common/
        └── LanguageSwitcher.tsx  # Language switcher component
```

## 🚀 Sử dụng

### 1. Basic Usage trong Component

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('navigation.home')}</h1>
      <button>{t('actions.submit')}</button>
    </div>
  );
}
```

### 2. Sử dụng với namespace cụ thể

```tsx
import { useTranslation } from 'react-i18next';

function HomePage() {
  // Use 'home' namespace
  const { t } = useTranslation('home');
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  );
}
```

### 3. Sử dụng với interpolation (biến động)

```tsx
// In translation file: "minutesAgo": "{{count}} minutes ago"

const { t } = useTranslation();
const message = t('time.minutesAgo', { count: 5 }); // "5 minutes ago"
```

### 4. Sử dụng với pluralization

```tsx
// In translation file:
// "items": "{{count}} item",
// "items_plural": "{{count}} items"

const { t } = useTranslation();
const text1 = t('items', { count: 1 }); // "1 item"
const text2 = t('items', { count: 5 }); // "5 items"
```

### 5. Thay đổi ngôn ngữ programmatically

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { i18n } = useTranslation();
  
  const changeToVietnamese = () => {
    i18n.changeLanguage('vi');
  };
  
  const changeToEnglish = () => {
    i18n.changeLanguage('en');
  };
  
  return (
    <div>
      <button onClick={changeToVietnamese}>Tiếng Việt</button>
      <button onClick={changeToEnglish}>English</button>
    </div>
  );
}
```

### 6. Lấy ngôn ngữ hiện tại

```tsx
const { i18n } = useTranslation();
const currentLanguage = i18n.language; // 'vi' or 'en'
```

## 📝 Thêm translations mới

### Available Namespaces

- **common**: Navigation, actions, messages, footer, validation, time
- **home**: Home page specific content
- **auth**: Authentication pages (SignIn, SignUp, ForgotPassword, OTP)
- **pages**: All other pages (Checkout, Cart, Product, Account, Booking, AboutUs, Chef, Contact, Menu, Shop)

### 1. Thêm key mới vào namespace có sẵn

**src/locales/vi/common.json:**
```json
{
  "myNewSection": {
    "title": "Tiêu đề mới",
    "description": "Mô tả mới"
  }
}
```

**src/locales/en/common.json:**
```json
{
  "myNewSection": {
    "title": "New Title",
    "description": "New Description"
  }
}
```

### 2. Tạo namespace mới (nếu cần)

Nếu cần tạo namespace mới cho một feature lớn:

**2.1. Tạo file JSON:**
- `src/locales/en/myfeature.json`
- `src/locales/vi/myfeature.json`

**2.2. Import vào config.ts:**
```ts
// src/i18n/config.ts
import myfeatureEn from "../locales/en/myfeature.json";
import myfeatureVi from "../locales/vi/myfeature.json";

export const resources = {
  en: {
    common: commonEn,
    myfeature: myfeatureEn,  // Add here
  },
  vi: {
    common: commonVi,
    myfeature: myfeatureVi,  // Add here
  },
} as const;
```

**2.3. Cập nhật namespace list:**
```ts
i18n.init({
  // ...
  ns: ["common", "home", "auth", "pages", "myfeature"],  // Add here
});
```

## 🎯 Best Practices

### ✅ DO

- **Tổ chức theo namespace**: Tạo file riêng cho mỗi feature/page
- **Đặt tên key rõ ràng**: `navigation.home`, `actions.submit`
- **Sử dụng nested objects**: Group related translations
- **Kiểm tra translation missing**: Check console trong dev mode
- **Sync cả 2 ngôn ngữ**: Đảm bảo EN và VI có cùng cấu trúc keys

### ❌ DON'T

- Hardcode text trong component
- Đặt tên key không rõ nghĩa: `text1`, `label2`
- Quên cập nhật cả 2 ngôn ngữ
- Lồng quá nhiều cấp (> 3 levels)

## 🔧 Configuration Options

### Thay đổi ngôn ngữ mặc định

```ts
// src/i18n/config.ts
i18n.init({
  fallbackLng: "vi",  // Change here
});
```

### Thêm language detector options

```ts
detection: {
  order: ['localStorage', 'navigator', 'cookie'],
  lookupLocalStorage: 'i18nextLng',
  lookupCookie: 'i18next',
  caches: ['localStorage', 'cookie'],
}
```

## 📚 Resources

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Translation Functions](https://www.i18next.com/translation-function/essentials)

## 🐛 Debugging

### Check current language:
```tsx
console.log(i18n.language);
```

### Check loaded resources:
```tsx
console.log(i18n.store.data);
```

### Enable debug mode:
```ts
// src/i18n/config.ts
i18n.init({
  debug: true,  // Will log missing keys, loaded resources, etc.
});
```

## 💡 Tips

1. **IntelliSense**: TypeScript sẽ tự động suggest translation keys nhờ type definitions
2. **Hot reload**: Thay đổi translation files sẽ tự động reload trong dev mode
3. **Missing translations**: Console sẽ warning khi key không tồn tại
4. **Performance**: i18next cache translations, không lo performance
