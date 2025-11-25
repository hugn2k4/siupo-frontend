# 🚀 Build & Deployment

## Production Build

### Build Command

```bash
npm run build
```

This command:
1. Runs TypeScript compiler (`tsc -b`)
2. Builds optimized production bundle with Vite
3. Outputs to `dist/` directory

### Build Output

```
dist/
├── index.html           # Entry HTML
├── assets/             # Bundled assets
│   ├── index-[hash].js    # Main JS bundle
│   ├── index-[hash].css   # Main CSS bundle
│   └── *.{js,css}         # Chunk files
└── images/             # Optimized images
```

### Build Optimization

Vite automatically:
- ✅ Minifies JavaScript and CSS
- ✅ Tree-shakes unused code
- ✅ Code splits for optimal loading
- ✅ Generates source maps
- ✅ Optimizes images
- ✅ Adds cache-busting hashes

---

## Environment Configuration

### Development

**File:** `.env` or `.env.development`

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_BACKEND_BASE_URL=http://localhost:8080
```

### Production

**File:** `.env.production`

```env
VITE_API_BASE_URL=https://api.siuporestaurant.com/api
VITE_BACKEND_BASE_URL=https://api.siuporestaurant.com
```

### Staging

**File:** `.env.staging`

```env
VITE_API_BASE_URL=https://api-staging.siuporestaurant.com/api
VITE_BACKEND_BASE_URL=https://api-staging.siuporestaurant.com
```

---

## Deployment Platforms

### Vercel (Recommended)

#### Prerequisites
- GitHub repository
- Vercel account

#### Steps

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Production deployment:**
```bash
vercel --prod
```

#### Configuration

**File:** `vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "env": {
    "VITE_API_BASE_URL": "@api_base_url",
    "VITE_BACKEND_BASE_URL": "@backend_base_url"
  }
}
```

#### GitHub Integration

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select GitHub repository
4. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add environment variables
6. Deploy

**Auto-deploy:** Vercel automatically deploys on git push to main

---

### Netlify

#### Using Netlify CLI

1. **Install:**
```bash
npm install -g netlify-cli
```

2. **Login:**
```bash
netlify login
```

3. **Deploy:**
```bash
netlify deploy --prod
```

#### Configuration

**File:** `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20.19.4"
```

#### GitHub Integration

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site"
3. Import from GitHub
4. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Add environment variables
6. Deploy

---

### Docker

#### Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf

```nginx
server {
    listen 80;
    server_name _;
    
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Build & Run

```bash
# Build image
docker build -t siupo-restaurant .

# Run container
docker run -p 80:80 siupo-restaurant

# Or with environment variables
docker run -p 80:80 \
  -e VITE_API_BASE_URL=https://api.example.com \
  siupo-restaurant
```

#### Docker Compose

**File:** `docker-compose.yml`

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "80:80"
    environment:
      - VITE_API_BASE_URL=https://api.example.com
      - VITE_BACKEND_BASE_URL=https://api.example.com
    restart: unless-stopped
```

```bash
docker-compose up -d
```

---

### GitHub Pages

#### Using gh-pages

1. **Install:**
```bash
npm install -D gh-pages
```

2. **Add scripts to package.json:**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Configure base URL in vite.config.ts:**
```typescript
export default defineConfig({
  base: '/repository-name/',
});
```

4. **Deploy:**
```bash
npm run deploy
```

5. **Enable GitHub Pages:**
   - Repository Settings → Pages
   - Source: `gh-pages` branch

---

## CI/CD Pipelines

### GitHub Actions

**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build
        env:
          VITE_API_BASE_URL: ${{ secrets.API_BASE_URL }}
          VITE_BACKEND_BASE_URL: ${{ secrets.BACKEND_BASE_URL }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Performance Optimization

### Bundle Analysis

```bash
# Install
npm install -D rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ],
});

# Build to see analysis
npm run build
```

### Code Splitting

```typescript
// Lazy load routes
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

// Use Suspense
<Suspense fallback={<Loading />}>
  <ProductDetail />
</Suspense>
```

### Image Optimization

```typescript
// Use WebP format
<img src="image.webp" alt="..." />

// Lazy loading
<img src="image.jpg" loading="lazy" alt="..." />

// Responsive images
<img 
  srcSet="image-small.jpg 480w, image-large.jpg 1080w"
  sizes="(max-width: 600px) 480px, 1080px"
  src="image.jpg"
  alt="..."
/>
```

---

## Monitoring & Analytics

### Google Analytics

```typescript
// main.tsx
import ReactGA from 'react-ga4';

ReactGA.initialize('G-XXXXXXXXXX');
```

### Error Tracking (Sentry)

```bash
npm install @sentry/react
```

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-dsn",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

---

## Post-Deployment Checklist

### Verification

- [ ] Site is accessible
- [ ] All pages load correctly
- [ ] API calls work
- [ ] Authentication works
- [ ] Images load
- [ ] Translations work
- [ ] Mobile responsive
- [ ] No console errors
- [ ] SSL certificate valid
- [ ] Performance score > 90 (Lighthouse)

### SEO

- [ ] Meta tags configured
- [ ] Open Graph tags
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Analytics tracking

### Security

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] API keys secured
- [ ] CORS configured correctly
- [ ] CSP headers set

---

## Rollback Strategy

### Vercel

```bash
# List deployments
vercel ls

# Promote previous deployment
vercel promote [deployment-url]
```

### Docker

```bash
# Tag previous version
docker tag siupo-restaurant:latest siupo-restaurant:backup

# Rollback
docker run -p 80:80 siupo-restaurant:backup
```

### Git

```bash
# Revert to previous commit
git revert HEAD
git push

# Or reset (use with caution)
git reset --hard HEAD~1
git push --force
```

---

**Next:** [Performance →](./17-performance.md)
