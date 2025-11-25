# 🐛 Troubleshooting

## Common Issues & Solutions

---

## 🚨 Installation Issues

### Issue: npm install fails

**Error:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**

1. **Use legacy peer deps:**
```bash
npm install --legacy-peer-deps
```

2. **Clear cache and reinstall:**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

3. **Use correct Node version:**
```bash
node --version  # Should be >= 18.0.0
nvm use 20.19.4  # If using nvm
```

### Issue: Husky hooks not working

**Solution:**
```bash
# Reinstall husky
npm run prepare

# Or manually
npx husky install
chmod +x .husky/pre-commit
```

---

## ⚙️ Build Issues

### Issue: Build fails with TypeScript errors

**Error:**
```
error TS2307: Cannot find module './types'
```

**Solutions:**

1. **Check tsconfig.json paths:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

2. **Restart TypeScript server:**
- VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

3. **Clean and rebuild:**
```bash
rm -rf dist node_modules/.vite
npm run build
```

### Issue: Vite build fails

**Error:**
```
[vite]: Rollup failed to resolve import
```

**Solution:**
```bash
# Check if file exists
# Verify import path is correct
# Use correct file extension (.tsx, .ts)
```

---

## 🎨 Styling Issues

### Issue: Tailwind CSS not working

**Symptoms:** Classes not applying styles

**Solutions:**

1. **Check tailwind.config.ts exists**

2. **Verify @import in index.css:**
```css
@import "tailwindcss";
```

3. **Restart dev server:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

4. **Clear Vite cache:**
```bash
rm -rf node_modules/.vite
```

### Issue: Styles not updating

**Solution:**
```bash
# Hard refresh browser
# Windows/Linux: Ctrl+Shift+R
# Mac: Cmd+Shift+R

# Or clear browser cache
```

---

## 🔌 API Issues

### Issue: API calls failing with CORS error

**Error:**
```
Access to XMLHttpRequest at 'http://localhost:8080' 
has been blocked by CORS policy
```

**Solutions:**

1. **Configure Vite proxy:**
```typescript
// vite.config.ts
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

2. **Check backend CORS configuration**

3. **Verify API_BASE_URL in .env:**
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### Issue: 401 Unauthorized

**Symptoms:** User gets logged out unexpectedly

**Solutions:**

1. **Check token in localStorage:**
```javascript
// Browser console
localStorage.getItem('accessToken')
```

2. **Verify token refresh logic in axiosClient.ts**

3. **Check token expiration:**
```typescript
// Decode JWT token to check expiry
const payload = JSON.parse(atob(token.split('.')[1]));
console.log(new Date(payload.exp * 1000));
```

### Issue: Network timeout

**Error:**
```
Error: timeout of 10000ms exceeded
```

**Solution:**
```typescript
// Increase timeout in axiosClient.ts
const axiosClient = axios.create({
  timeout: 30000, // 30 seconds
});
```

---

## 🌐 i18n Issues

### Issue: Translation keys showing instead of text

**Symptoms:** Displays `navigation.home` instead of "Home"

**Solutions:**

1. **Check key exists in JSON file:**
```json
// locales/en/common.json
{
  "navigation": {
    "home": "Home"
  }
}
```

2. **Verify namespace:**
```typescript
// Wrong namespace
const { t } = useTranslation('wrong');
t('navigation.home'); // Key not found

// Correct namespace
const { t } = useTranslation(); // defaults to 'common'
t('navigation.home'); // Works!
```

3. **Restart dev server:**
```bash
npm run dev
```

### Issue: Language not changing

**Solutions:**

1. **Check localStorage:**
```javascript
// Browser console
localStorage.getItem('i18nextLng')
```

2. **Clear localStorage and refresh:**
```javascript
localStorage.removeItem('i18nextLng')
location.reload()
```

3. **Verify i18n.changeLanguage() is called:**
```typescript
const { i18n } = useTranslation();
i18n.changeLanguage('vi'); // Should work
```

---

## 🔄 State Management Issues

### Issue: Context value undefined

**Error:**
```
TypeError: Cannot read property 'user' of null
```

**Solutions:**

1. **Ensure component is wrapped in provider:**
```tsx
// main.tsx
<GlobalProvider>
  <App />
</GlobalProvider>
```

2. **Check context usage:**
```typescript
const { user } = useGlobal();
// Make sure useGlobal is called inside GlobalProvider
```

### Issue: State not updating

**Solution:**
```typescript
// Wrong - mutating state
state.user.name = 'New Name';

// Correct - creating new object
setState(prev => ({
  ...prev,
  user: { ...prev.user, name: 'New Name' }
}));
```

---

## 🚦 Routing Issues

### Issue: 404 on page refresh

**Symptoms:** App works with navigation but 404 on refresh

**Solution:**
```typescript
// Ensure using createBrowserRouter (already configured)
const router = createBrowserRouter([...]);
```

**For deployment:**
- Netlify: Add `_redirects` file with `/* /index.html 200`
- Vercel: Automatically handled

### Issue: Protected route not working

**Solution:**
```typescript
// Check authentication state
const { isLogin } = useGlobal();

if (!isLogin) {
  // Should redirect to login
  return <Navigate to="/signin" />;
}
```

---

## 🖥️ Development Server Issues

### Issue: Port 5173 already in use

**Error:**
```
Port 5173 is in use, trying another one...
```

**Solutions:**

1. **Kill process on port (Windows):**
```powershell
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

2. **Change port in vite.config.ts:**
```typescript
export default defineConfig({
  server: {
    port: 3000,
  },
});
```

### Issue: Hot reload not working

**Solutions:**

1. **Restart dev server**

2. **Check file watching limits (Linux/Mac):**
```bash
# Increase limit
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

3. **Disable browser extensions** that might interfere

---

## 📱 Responsive Design Issues

### Issue: Mobile view broken

**Solutions:**

1. **Add viewport meta tag in index.html:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

2. **Use responsive classes:**
```tsx
<div className="w-full md:w-1/2 lg:w-1/3">
```

3. **Test in browser dev tools:**
- Open DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)

---

## 🔐 Authentication Issues

### Issue: OAuth2 callback not working

**Solutions:**

1. **Check redirect URI in Google Console:**
```
http://localhost:5173/auth/oauth2/callback
```

2. **Verify backend OAuth2 configuration**

3. **Check route is defined:**
```typescript
// routes.tsx
{ path: "auth/oauth2/callback", element: <OAuth2CallbackPage /> }
```

### Issue: Password reset email not received

**Solutions:**

1. **Check spam folder**
2. **Verify email in backend logs**
3. **Check backend email configuration**

---

## 🎨 Material-UI Issues

### Issue: MUI styles not applying

**Solutions:**

1. **Check emotion dependencies installed:**
```bash
npm list @emotion/react @emotion/styled
```

2. **Verify imports:**
```typescript
import { Button } from '@mui/material';
```

3. **Clear node_modules and reinstall:**
```bash
rm -rf node_modules
npm install
```

---

## 💾 localStorage Issues

### Issue: Data not persisting

**Solutions:**

1. **Check browser privacy settings:**
- localStorage disabled in incognito
- Third-party cookies blocked

2. **Check storage limits:**
```javascript
// Check available storage
navigator.storage.estimate().then(estimate => {
  console.log(estimate);
});
```

3. **Use try-catch:**
```typescript
try {
  localStorage.setItem('key', 'value');
} catch (error) {
  console.error('localStorage not available:', error);
}
```

---

## 🖼️ Image Loading Issues

### Issue: Images not loading

**Solutions:**

1. **Check file path:**
```typescript
// Correct - from public/
<img src="/images/logo.png" />

// Correct - from src/assets/
import logo from '../assets/logo.png';
<img src={logo} />
```

2. **Verify file exists in correct location**

3. **Check image URL in network tab**

---

## 🔍 Debugging Tips

### Browser DevTools

1. **Console:** Check for errors
```
Press F12 → Console tab
```

2. **Network:** Monitor API calls
```
F12 → Network tab → Filter by XHR
```

3. **React DevTools:** Inspect components
```
Install React Developer Tools extension
```

### VS Code Debugging

**launch.json:**
```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Launch Chrome",
  "url": "http://localhost:5173",
  "webRoot": "${workspaceFolder}/src"
}
```

### Logging

```typescript
// Development only
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}
```

---

## 📞 Getting Help

### Before Asking for Help

1. **Check console for errors**
2. **Search existing GitHub issues**
3. **Try solutions in this guide**
4. **Verify code follows conventions**

### Creating Good Issue Reports

Include:
- **Problem description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots (if UI issue)**
- **Error messages (full stack trace)**
- **Environment details:**
  - Node version
  - npm version
  - OS
  - Browser

### Stack Overflow

Search/ask with tags:
- `reactjs`
- `typescript`
- `vite`
- `tailwindcss`
- `material-ui`

---

## 🔧 Emergency Fixes

### Complete Reset

```bash
# Nuclear option - fresh start
rm -rf node_modules package-lock.json dist
npm cache clean --force
npm install
npm run dev
```

### Clear All Caches

```bash
# Clear all caches
rm -rf node_modules/.vite
rm -rf node_modules/.cache
rm -rf dist
npm cache clean --force

# Clear browser cache
# Ctrl+Shift+Delete → Clear browsing data
```

---

**Next:** [Deployment →](./16-deployment.md)
