## Frontend Setup Guide

Complete setup instructions for the Outpro India React frontend.

### Prerequisites
- Node.js >= 14.x
- npm or yarn
- Git
- Backend running on `http://localhost:5000`

### Installation Steps

#### 1. Navigate to Frontend Directory
```bash
cd frontend
```

#### 2. Install Dependencies
```bash
npm install
```

This installs all required packages:
- **react** v19.2.5 - UI library
- **react-router-dom** v7.14.1 - Client-side routing
- **axios** v1.15.0 - HTTP client
- **framer-motion** v12.38.0 - Animations
- **react-hook-form** v7.72.1 - Form handling
- **react-icons** v5.6.0 - Icon library
- **react-countup** v6.4.3 - Number animations
- **tailwindcss** v3.4.19 - CSS framework
- **react-scripts** v5.0.1 - CRA build tools

#### 3. Configure Environment Variables

Create `.env` file in the frontend folder:

```bash
cp .env.example .env
```

Edit the `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Important Notes:**
- Must start with `REACT_APP_` prefix (CRA requirement)
- Don't include `/api` in URL - it's added by the application
- Backend must be running before starting frontend

#### 4. Start Development Server

```bash
npm start
```

Expected output:
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

The application opens automatically at: `http://localhost:3000`

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from create-react-app (irreversible!)
npm run eject
```

### Project Structure

```
frontend/
├── public/
│   ├── index.html               # HTML entry point
│   ├── manifest.json            # PWA manifest
│   └── robots.txt               # SEO robots file
├── src/
│   ├── components/              # Reusable React components
│   │   ├── Hero.jsx             # Hero section
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── Footer.jsx           # Footer
│   │   ├── ServiceCard.jsx      # Service card component
│   │   ├── ServicesOverview.jsx # Services section
│   │   ├── Stats.jsx            # Statistics display
│   │   ├── Testimonials.jsx     # Testimonials carousel
│   │   ├── PortfolioGrid.jsx    # Portfolio grid
│   │   ├── CTA.jsx              # Call-to-action section
│   │   └── Skeleton.jsx         # Loading skeletons
│   ├── contexts/                # React contexts
│   │   └── ThemeContext.jsx     # Dark/Light mode context
│   ├── pages/                   # Page components
│   │   ├── Home.jsx             # Home page
│   │   ├── About.jsx            # About page
│   │   ├── Services.jsx         # Services listing
│   │   ├── ServiceDetail.jsx    # Service detail page
│   │   ├── Portfolio.jsx        # Portfolio/Projects
│   │   ├── ProjectDetail.jsx    # Project detail page
│   │   ├── Testimonials.jsx     # Testimonials page
│   │   └── Contact.jsx          # Contact form page
│   ├── App.js                   # Main app component
│   ├── index.js                 # React entry point
│   ├── index.css                # Global styles
│   └── reportWebVitals.js       # Performance metrics
├── tailwind.config.js           # Tailwind CSS config
├── postcss.config.js            # PostCSS config
├── package.json                 # Dependencies
├── .env.example                 # Environment template
├── .env                         # Environment config
└── README.md                    # CRA readme
```

### Key Features

#### 1. Responsive Design
- Mobile-first approach
- Tailwind CSS utilities
- Media queries for all breakpoints

#### 2. Dark Mode
- Toggle in Navbar
- Persisted to localStorage
- Applied to all components

#### 3. Routing
- React Router v7
- Dynamic routing with slugs
- Nested routes supported

#### 4. Form Handling
- React Hook Form
- Built-in validation
- Error messages

#### 5. Animations
- Framer Motion
- Page transitions
- Hover effects
- Scroll animations

#### 6. Data Fetching
- Axios HTTP client
- Error handling
- Loading states
- Pagination support

### Configuration

#### Tailwind CSS

Customize `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        900: '#1e3a8a'
      }
    },
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif']
    }
  }
}
```

#### Environment Variables

**Development:**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Production:**
```env
REACT_APP_API_URL=https://your-api-domain.com/api
```

### API Integration

All API calls use axios with base URL from environment:

```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Get data
const response = await axios.get(`${API_URL}/services`);

// Post data
await axios.post(`${API_URL}/contacts`, formData);
```

### Theming

The application uses Tailwind's dark mode support:

```javascript
// Toggle theme (from ThemeContext)
const { theme, toggleTheme } = useTheme();

// Apply theme-aware classes
<div className="text-gray-900 dark:text-white">
  Content
</div>
```

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Deployment Options

#### Option 1: Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

#### Option 2: Netlify
```bash
npm run build
# Drag build folder to Netlify
```

#### Option 3: GitHub Pages
```bash
npm install gh-pages
# Update package.json with homepage: "https://username.github.io/repo"
npm run build
npm run deploy
```

#### Option 4: Traditional Hosting
```bash
npm run build
# Upload build/ folder to your server
# Configure web server for SPA (route all requests to index.html)
```

### Common Issues & Solutions

**"Cannot GET /"**
- Ensure backend is running
- Check `REACT_APP_API_URL` in .env
- Verify backend is accessible

**API calls return 404**
- Check backend is running on correct port
- Verify API endpoint names
- Check for `/api` duplication in URLs

**Theme not persisting**
- Clear browser localStorage: `localStorage.clear()`
- Check browser console for errors
- Verify ThemeContext is properly imported

**Images not loading**
- Use full URLs (https://)
- Check image links are valid
- Use placeholder service if needed

**Slow performance**
- Run: `npm run build` to optimize
- Check Network tab in DevTools
- Consider image optimization

### Performance Optimization

**Code Splitting:**
```javascript
import { lazy, Suspense } from 'react';

const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));

<Suspense fallback={<Skeleton />}>
  <ServiceDetail />
</Suspense>
```

**Image Optimization:**
- Use JPEG for photos
- Use PNG for graphics
- Compress images before use
- Use responsive images

**Bundle Size:**
```bash
npm install webpack-bundle-analyzer
# Analyze bundle in build process
```

### Development Workflow

1. **Create Feature Branch:**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make Changes:**
   - Edit components
   - Test locally
   - Verify with backend

3. **Test:**
   ```bash
   npm test
   ```

4. **Build:**
   ```bash
   npm run build
   ```

5. **Commit & Push:**
   ```bash
   git add .
   git commit -m "Add new feature"
   git push origin feature/new-feature
   ```

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

### Debugging

**React DevTools:**
1. Install React DevTools extension
2. Open Chrome DevTools (F12)
3. Go to "Components" tab
4. Inspect component tree

**Network Debugging:**
1. Open Network tab in DevTools
2. Monitor API calls
3. Check response bodies
4. Verify status codes

**Console Errors:**
1. Open Console tab
2. Look for red error messages
3. Check network XHR requests
4. Use debugger statement

### Support & Documentation

- See [README.md](../README.md) for complete project documentation
- See [API_DOCUMENTATION.md](../API_DOCUMENTATION.md) for backend API reference
- Check [Backend Setup Guide](../BACKEND/SETUP.md)
- React documentation: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion
