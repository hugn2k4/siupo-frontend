# 🍽️ Siupo Restaurant

> Modern restaurant web application with seamless ordering, table reservation, and multi-language support

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.3-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.12-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

---

## ✨ Features

- 🍽️ **Browse Menu** - Explore dishes with categories and filters
- 🛒 **Shopping Cart** - Manage orders with real-time updates
- 📅 **Table Reservation** - Book tables for specific dates
- 👤 **User Authentication** - Sign up, OAuth2 (Google), password recovery
- 💳 **Secure Payments** - Multiple payment methods integration
- 📦 **Order Tracking** - View order history and status
- 🌐 **Multi-language** - English & Vietnamese support
- 📱 **Responsive Design** - Mobile-first approach

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0 (recommended: v20.19.4)
- npm >= 8.0.0 (recommended: v11.5.2)

### Installation

```bash
# Clone repository
git clone https://github.com/hugn2k4/siupo-frontend.git
cd siupo-restaurant

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Start development server
npm run dev
```

Application will run at `http://localhost:5173`

---

## 📦 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Core** | React 19, TypeScript 5.8, Vite 7.1 |
| **Styling** | Tailwind CSS v4, Material-UI 7.3, Framer Motion |
| **Routing** | React Router 7.8 |
| **API** | Axios 1.11 |
| **i18n** | i18next 25.6, react-i18next 16.3 |
| **Forms** | React Hook Form 7.64 |
| **Quality** | ESLint, Prettier, Husky, Commitlint |

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |
| `npm run lint:fix` | Fix linting issues |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Check TypeScript types |

---

## 📁 Project Structure

```
src/
├── api/              # API integration layer
├── assets/           # Static assets (images, icons)
├── components/       # React components
│   ├── common/       # Reusable components
│   └── layout/       # Layout components
├── config/           # App configuration
├── contexts/         # React Context providers
├── hooks/            # Custom React hooks
├── i18n/             # Internationalization config
├── locales/          # Translation files (en, vi)
├── pages/            # Page components
├── routers/          # Routing configuration
├── services/         # Business logic layer
├── types/            # TypeScript definitions
└── utils/            # Utility functions
```

---

## 🌐 Environment Variables

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_BACKEND_BASE_URL=http://localhost:8080
```

---

## 📖 Documentation

**➡️ [View Full Documentation](./docs/README.md)**

Comprehensive guides organized by topic:

| Category | Documents |
|----------|-----------|
| **Getting Started** | [Overview](./docs/01-overview.md) · [Installation](./docs/02-installation.md) · [Structure](./docs/03-project-structure.md) |
| **Development** | [i18n](./docs/09-i18n.md) · [API Integration](./docs/10-api.md) · [Components](./docs/07-components.md) |
| **Workflow** | [Git Workflow](./docs/13-git-workflow.md) · [Code Quality](./docs/14-code-quality.md) |

📚 [Browse All Docs](./docs/)

---

## 🤝 Contributing

Please read [DOCUMENTATION.md](./DOCUMENTATION.md) for details on:
- Git workflow and branching strategy
- Commit message conventions
- Code review process
- Coding standards

---

## 📄 License

This project is proprietary and confidential.

---

## 👥 Team

**Repository:** [siupo-frontend](https://github.com/hugn2k4/siupo-frontend)  
**Branch:** `feature/change-languae`  
**Last Updated:** November 25, 2025

---

**Made with ❤️ by Siupo Development Team**
