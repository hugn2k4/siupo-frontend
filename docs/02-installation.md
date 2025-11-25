# 🚀 Installation Guide

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- **Node.js** >= 18.0.0 (recommended: v20.19.4)
- **npm** >= 8.0.0 (recommended: v11.5.2)
- **Git** for version control

### Check Versions

```bash
node --version
npm --version
git --version
```

---

## 📥 Installation Steps

### 1. Clone the Repository

```bash
# Clone via HTTPS
git clone https://github.com/hugn2k4/siupo-frontend.git

# OR clone via SSH
git clone git@github.com:hugn2k4/siupo-frontend.git

# Navigate to project directory
cd siupo-restaurant
```

### 2. Install Dependencies

```bash
# Install all npm packages
npm install

# This will also automatically run husky setup
```

**Note:** If you encounter issues, try:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy from example (if exists)
cp .env.example .env

# OR create new .env file
touch .env
```

Add the following environment variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api
VITE_BACKEND_BASE_URL=http://localhost:8080

# Optional: App Configuration
VITE_APP_NAME=Siupo Restaurant
VITE_APP_VERSION=1.0.0
```

**Important:** Never commit `.env` file to version control!

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at:
- **Local:** http://localhost:5173
- **Network:** http://192.168.x.x:5173 (shown in terminal)

---

## 🔧 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run dev` | Start dev server with hot reload |
| **Build** | `npm run build` | Build for production |
| **Preview** | `npm run preview` | Preview production build locally |
| **Lint** | `npm run lint` | Check code for errors |
| **Lint Fix** | `npm run lint:fix` | Auto-fix linting errors |
| **Format** | `npm run format` | Format code with Prettier |
| **Type Check** | `npm run type-check` | Check TypeScript types without build |
| **Prepare** | `npm run prepare` | Setup Husky git hooks (runs automatically) |

---

## 🌐 Environment Configuration

### Development Environment

**File:** `.env` or `.env.development`

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_BACKEND_BASE_URL=http://localhost:8080
```

### Production Environment

**File:** `.env.production`

```env
VITE_API_BASE_URL=https://api.your-domain.com/api
VITE_BACKEND_BASE_URL=https://api.your-domain.com
```

### Environment Variables Usage

In your code:

```typescript
// src/config/index.ts
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:8080";
```

**Note:** All environment variables must be prefixed with `VITE_` to be accessible in the app.

---

## 📦 Dependencies Breakdown

### Production Dependencies

**Core:**
- `react` (19.1.1) - React library
- `react-dom` (19.1.1) - React DOM
- `react-router-dom` (7.8.1) - Routing

**UI & Styling:**
- `@mui/material` (7.3.2) - Material-UI components
- `@mui/icons-material` (7.3.1) - MUI icons
- `@tailwindcss/vite` (4.1.12) - Tailwind CSS v4
- `framer-motion` (12.23.12) - Animations
- `lucide-react` (0.543.0) - Icon library

**Data & State:**
- `axios` (1.11.0) - HTTP client
- `react-hook-form` (7.64.0) - Form handling
- `lodash` (4.17.21) - Utilities

**i18n:**
- `i18next` (25.6.3) - i18n framework
- `react-i18next` (16.3.5) - React bindings
- `i18next-browser-languagedetector` (8.2.0) - Language detection

**Utilities:**
- `date-fns` (4.1.0) - Date utilities
- `react-datepicker` (8.8.0) - Date picker
- `use-debounce` (10.0.6) - Debounce hooks

### Development Dependencies

**Build Tools:**
- `vite` (7.1.3) - Build tool
- `@vitejs/plugin-react-swc` (4.0.1) - React plugin with SWC

**TypeScript:**
- `typescript` (5.8.3) - TypeScript compiler
- `@types/react` (19.1.10) - React types
- `@types/react-dom` (19.1.7) - React DOM types
- `typescript-eslint` (8.39.1) - TS ESLint

**Code Quality:**
- `eslint` (9.33.0) - Linter
- `prettier` (3.6.2) - Formatter
- `husky` (9.1.7) - Git hooks
- `lint-staged` (16.1.6) - Staged files linting
- `@commitlint/cli` (19.8.1) - Commit linting

---

## 🔍 Verification

After installation, verify everything works:

### 1. Check Dev Server

```bash
npm run dev
```

Should output:
```
VITE v7.1.3  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.x.x:5173/
```

### 2. Check Build

```bash
npm run build
```

Should create `dist/` folder without errors.

### 3. Check Type Checking

```bash
npm run type-check
```

Should complete without type errors.

### 4. Check Linting

```bash
npm run lint
```

Should report no errors.

---

## 🐛 Common Installation Issues

### Issue: npm install fails

**Solution:**
```bash
# Use legacy peer deps
npm install --legacy-peer-deps

# OR use force
npm install --force
```

### Issue: Port 5173 already in use

**Solution:**
```bash
# Kill process on port (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# OR change port in vite.config.ts
export default defineConfig({
  server: {
    port: 3000
  }
})
```

### Issue: Husky hooks not working

**Solution:**
```bash
# Reinstall husky
npm run prepare

# OR manually
npx husky install
```

### Issue: Environment variables not loading

**Solution:**
- Ensure variables are prefixed with `VITE_`
- Restart dev server after changing `.env`
- Check file is in root directory

---

## 🔄 Updating Dependencies

### Check for Updates

```bash
# Check outdated packages
npm outdated

# OR use npm-check-updates
npx npm-check-updates
```

### Update Packages

```bash
# Update all to latest (use with caution)
npx npm-check-updates -u
npm install

# Update specific package
npm install package-name@latest

# Update to safe versions
npm update
```

---

## 🧹 Maintenance Commands

```bash
# Clear node_modules
rm -rf node_modules

# Clear npm cache
npm cache clean --force

# Fresh install
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

---

## ✅ Post-Installation Checklist

- [ ] Dependencies installed successfully
- [ ] `.env` file configured
- [ ] Dev server starts without errors
- [ ] Build completes successfully
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Git hooks working (test with a commit)
- [ ] Backend API accessible

---

**Next:** [Project Structure →](./03-project-structure.md)
