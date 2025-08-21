# 🍽️ Siupo Restaurant - Frontend

Ứng dụng Frontend cho nhà hàng Siupo được xây dựng với công nghệ hiện đại.

## 🛠️ Công nghệ sử dụng

- **React 19** - Thư viện UI (19.1.10)
- **TypeScript** - Ngôn ngữ lập trình (5.8.3)
- **Vite** - Build tool & dev server (7.1.3)
- **Tailwind CSS v4** - Framework CSS (4.1.12)
- **Material-UI (MUI)** - Component library (7.3.1)
- **React Router Dom** - Routing (7.8.1)
- **Axios** - HTTP client (1.11.0)
- **Framer Motion** - Animation library

## 📋 Yêu cầu hệ thống

- **Node.js** >= 18.0.0 cụ thể cài v20.19.4
- **npm** >= 8.0.0 cụ thể cài 11.5.2

## 🚀 Cài đặt và chạy dự án

### 1. Clone repository

```bash
git clone <repository-url>
cd siupo-restaurant
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:5173`

## 📝 Các lệnh cơ bản

| Lệnh              | Mô tả                    |
| ----------------- | ------------------------ |
| `npm run dev`     | Chạy dev server          |
| `npm run build`   | Build production         |
| `npm run preview` | Preview bản build        |
| `npm run lint`    | Kiểm tra code với ESLint |

## 📁 Cấu trúc thư mục

```
src/
├── api/           # API calls
├── assets/        # Static assets (images, icons)
├── components/    # React components
│   ├── common/    # Shared components
│   └── layout/    # Layout components
├── config/        # Configuration files
├── contexts/      # React contexts
├── features/      # Feature-based components
├── hooks/         # Custom hooks
├── pages/         # Page components
├── services/      # Business logic
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## 🔧 Troubleshooting

### Tailwind CSS không hoạt động:

1. Kiểm tra file `tailwind.config.ts` có tồn tại
2. Kiểm tra `src/index.css` có `@import "tailwindcss"`
3. Restart dev server: `npm run dev`

### Lỗi TypeScript:

1. Restart TypeScript server trong VS Code
2. Kiểm tra `tsconfig.json` và `tsconfig.app.json`

## 🌿 Quy trình làm việc với Git

### Cấu trúc nhánh

```
main              # Nhánh chính (production)
├── dev           # Nhánh phát triển
├── feature/*     # Nhánh tính năng
├── bugfix/*      # Nhánh sửa bug
└── hotfix/*      # Nhánh sửa lỗi khẩn cấp
```

### Quy tắc đặt tên nhánh

- **Feature**: `feature/ten-tinh-nang`
- **Bugfix**: `bugfix/ten-loi`
- **Hotfix**: `hotfix/ten-loi-khan-cap`

Ví dụ:

```bash
feature/user-authentication
feature/menu-management
bugfix/navbar-responsive
hotfix/payment-error
```

### Workflow cơ bản

#### 1. Bắt đầu tính năng mới

```bash
# Checkout nhánh develop
git checkout develop
git pull origin develop

# Tạo nhánh feature mới
git checkout -b feature/ten-tinh-nang

# Làm việc và commit
git add .
git commit -m "feat: thêm tính năng mới"
```

#### 2. Commit message convention

```bash
# Format: <type>: <description>
feat: thêm tính năng đăng nhập
fix: sửa lỗi responsive navbar
docs: cập nhật README
style: format code với prettier
refactor: tối ưu component Header
test: thêm unit test cho utils
```

#### 3. Push và tạo Pull Request

```bash
# Push nhánh lên remote
git push origin feature/ten-tinh-nang

# Tạo Pull Request từ feature -> develop
# Review code → Merge → Xóa nhánh feature
```

#### 4. Sync với nhánh chính

```bash
# Cập nhật develop thường xuyên
git checkout develop
git pull origin develop

# Rebase feature branch (nếu cần)
git checkout feature/ten-tinh-nang
git rebase develop
```

### Các lệnh Git hữu ích

| Lệnh                                | Mô tả                       |
| ----------------------------------- | --------------------------- |
| `git status`                        | Kiểm tra trạng thái file    |
| `git log --oneline`                 | Xem lịch sử commit ngắn gọn |
| `git branch -a`                     | Xem tất cả nhánh            |
| `git checkout -b <branch>`          | Tạo và chuyển nhánh mới     |
| `git branch -d <branch>`            | Xóa nhánh local             |
| `git push origin --delete <branch>` | Xóa nhánh remote            |

### Quy tắc làm việc nhóm

1. **Không push trực tiếp lên main/develop**
2. **Luôn tạo Pull Request để review code**
3. **Commit thường xuyên với message rõ ràng**
4. **Pull develop trước khi tạo feature branch mới**
5. **Xóa feature branch sau khi merge**
6. **Kiểm tra conflict trước khi merge**
