# ✅ Code Quality

## Overview

The project uses automated tools to maintain high code quality standards.

---

## 🔧 Tools

### ESLint

**Version:** 9.33.0

JavaScript/TypeScript linter for identifying and fixing code problems.

**Configuration:** `eslint.config.js`

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config([
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
])
```

### Prettier

**Version:** 3.6.2

Code formatter for consistent code style.

**Configuration:** `.prettierrc` (if exists) or package.json

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### Husky

**Version:** 9.1.7

Git hooks for running checks before commits and pushes.

**Setup:**
```bash
npm run prepare  # Sets up git hooks
```

**Hooks:**
- `pre-commit` - Runs lint-staged
- `commit-msg` - Validates commit message with commitlint

### Lint-staged

**Version:** 16.1.6

Runs linters on staged files only.

**Configuration:** `package.json`

```json
{
  "lint-staged": {
    "*.{json,md,css,scss}": [
      "prettier --write"
    ],
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

### Commitlint

**Version:** 19.8.1

Enforces commit message conventions.

**Configuration:** `commitlint.config.ts`

```typescript
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
  },
};
```

---

## 📝 Scripts

### Linting

```bash
# Check for linting errors
npm run lint

# Fix auto-fixable errors
npm run lint:fix
```

### Formatting

```bash
# Format all files
npm run format

# Check formatting without fixing
npx prettier --check "src/**/*.{ts,tsx,json,css,md}"
```

### Type Checking

```bash
# Check TypeScript types
npm run type-check

# Watch mode
npx tsc --noEmit --watch
```

---

## 🎯 Code Standards

### TypeScript

#### 1. Always Use Types

✅ **Good:**
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  return api.getUser(id);
}
```

❌ **Bad:**
```typescript
function getUser(id: any): Promise<any> {
  return api.getUser(id);
}
```

#### 2. Avoid `any` Type

✅ **Good:**
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
}

const products: Product[] = [];
```

❌ **Bad:**
```typescript
const products: any[] = [];
```

#### 3. Use Interfaces for Objects

✅ **Good:**
```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
};
```

#### 4. Use Type for Unions/Intersections

```typescript
type Status = 'pending' | 'success' | 'error';
type Result = SuccessResult | ErrorResult;
```

### React

#### 1. Functional Components

✅ **Good:**
```typescript
function ProductCard({ product }: { product: Product }) {
  return <div>{product.name}</div>;
}
```

❌ **Bad:**
```typescript
class ProductCard extends React.Component {
  render() {
    return <div>{this.props.product.name}</div>;
  }
}
```

#### 2. Named Exports

✅ **Good:**
```typescript
export function ProductCard() { }
export default ProductCard;
```

#### 3. Props Interface

```typescript
interface ProductCardProps {
  product: Product;
  onAddToCart: (id: string) => void;
  featured?: boolean;
}

function ProductCard({ product, onAddToCart, featured = false }: ProductCardProps) {
  // ...
}
```

#### 4. Hooks Rules

```typescript
// ✅ Call hooks at top level
function Component() {
  const [state, setState] = useState('');
  const data = useQuery(['key'], fetcher);
  
  // Component logic
}

// ❌ Don't call hooks conditionally
function Component() {
  if (condition) {
    const [state, setState] = useState(''); // Wrong!
  }
}
```

### File Organization

#### 1. Import Order

```typescript
// 1. External libraries
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Internal modules
import { useGlobal } from '../hooks/useGlobal';
import { Button } from '../components/common/Button';

// 3. Types
import type { Product } from '../types/models/product';

// 4. Styles (if any)
import './ProductCard.css';
```

#### 2. Component Structure

```typescript
// 1. Imports
import { useState } from 'react';

// 2. Types/Interfaces
interface Props {
  // ...
}

// 3. Component
function Component({ prop }: Props) {
  // 3.1. Hooks
  const [state, setState] = useState();
  
  // 3.2. Effects
  useEffect(() => {
    // ...
  }, []);
  
  // 3.3. Handlers
  const handleClick = () => {
    // ...
  };
  
  // 3.4. Render
  return <div>...</div>;
}

// 4. Export
export default Component;
```

### Naming Conventions

#### 1. Components

```typescript
// PascalCase for components
function ProductCard() { }
function UserProfile() { }
```

#### 2. Hooks

```typescript
// camelCase with 'use' prefix
function useGlobal() { }
function useProductList() { }
```

#### 3. Constants

```typescript
// UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_COUNT = 3;
```

#### 4. Variables/Functions

```typescript
// camelCase
const userName = 'John';
function getUserById(id: string) { }
```

#### 5. Types/Interfaces

```typescript
// PascalCase
interface User { }
type Status = 'active' | 'inactive';
```

---

## 🚫 Common Mistakes to Avoid

### 1. Console Logs in Production

❌ **Bad:**
```typescript
console.log('User data:', user);
```

✅ **Good:**
```typescript
// Use proper logging in development only
if (import.meta.env.DEV) {
  console.log('User data:', user);
}
```

### 2. Unused Variables

❌ **Bad:**
```typescript
function Component() {
  const [unused, setUnused] = useState();
  return <div>Hello</div>;
}
```

✅ **Good:**
```typescript
function Component() {
  return <div>Hello</div>;
}
```

### 3. Missing Error Handling

❌ **Bad:**
```typescript
async function fetchData() {
  const data = await api.getData();
  return data;
}
```

✅ **Good:**
```typescript
async function fetchData() {
  try {
    const data = await api.getData();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}
```

### 4. Hardcoded Values

❌ **Bad:**
```typescript
if (user.role === 'admin') { }
```

✅ **Good:**
```typescript
enum UserRole {
  Admin = 'admin',
  User = 'user',
}

if (user.role === UserRole.Admin) { }
```

### 5. Ignoring TypeScript Errors

❌ **Bad:**
```typescript
// @ts-ignore
const result = dangerousFunction();
```

✅ **Good:**
```typescript
// Fix the actual type issue
const result: ExpectedType = dangerousFunction();
```

---

## ✅ Pre-commit Checklist

Before committing code:

- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No linting errors (`npm run lint`)
- [ ] Code is formatted (`npm run format`)
- [ ] No console.logs in production code
- [ ] No unused imports or variables
- [ ] All new functions have proper types
- [ ] Error handling is implemented
- [ ] Commit message follows convention
- [ ] Changes are tested locally

---

## 🔍 Code Review Checklist

### Functionality
- [ ] Code works as intended
- [ ] No breaking changes
- [ ] Edge cases handled
- [ ] Error states handled

### Code Quality
- [ ] TypeScript types are proper
- [ ] No `any` types used
- [ ] Functions are small and focused
- [ ] Code is readable and maintainable
- [ ] No duplicate code

### Performance
- [ ] No unnecessary re-renders
- [ ] Large lists are virtualized
- [ ] Images are optimized
- [ ] No memory leaks

### Testing
- [ ] Tested on multiple browsers
- [ ] Responsive design works
- [ ] No console errors
- [ ] Functionality verified

### Documentation
- [ ] Complex logic is commented
- [ ] README updated (if needed)
- [ ] API changes documented

---

## 🛠️ IDE Configuration

### VS Code Settings

**File:** `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

### Recommended Extensions

- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- GitLens

---

## 📊 Quality Metrics

### Target Metrics

- **TypeScript Coverage:** 100%
- **Linting Errors:** 0
- **Console Logs:** 0 in production
- **Build Warnings:** 0
- **Unused Dependencies:** 0

### Check Metrics

```bash
# Type coverage
npm run type-check

# Linting issues
npm run lint

# Unused dependencies
npx depcheck

# Bundle size
npm run build
```

---

**Next:** [Testing Guide →](./15-testing.md)
