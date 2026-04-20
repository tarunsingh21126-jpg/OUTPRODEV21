# Outpro India - Corporate Digital Presence Platform

A complete, production-ready full-stack web application built with **React.js**, **Node.js/Express**, and **MongoDB**. This platform serves as a comprehensive digital presence solution for **Outpro India**, featuring services, portfolio showcase, testimonials, contact management, and admin capabilities.

## 🎯 Features

### Frontend (React.js)
- ✅ **Responsive Design** - Mobile-first, fully responsive across all devices
- ✅ **Dark/Light Mode** - Theme toggle with persistent storage
- ✅ **Dynamic Pages**:
  - Hero Home page with statistics and featured projects
  - About page with team showcase
  - Services page with detail pages
  - Portfolio/Projects page with filtering
  - Client testimonials carousel
  - Contact form with validation
- ✅ **Animations** - Smooth transitions with Framer Motion
- ✅ **Performance Optimized** - Lazy loading, code splitting, optimized images
- ✅ **SEO-friendly** - Semantic HTML, metadata structure

### Backend (Node.js/Express)
- ✅ **RESTful APIs** - CRUD operations for all entities
- ✅ **Authentication** - JWT-based admin authentication
- ✅ **Authorization** - Protected routes with middleware
- ✅ **Error Handling** - Comprehensive error management
- ✅ **Rate Limiting** - Request throttling for security
- ✅ **Security** - Helmet.js, CORS, input validation
- ✅ **Pagination** - Scalable data retrieval

### Database (MongoDB)
- ✅ **Mongoose Schemas** - Structured data models
- ✅ **Relationships** - Properly designed schema relationships
- ✅ **Seed Data** - Sample data for testing
- ✅ **Indexes** - Optimized for query performance

## 📁 Project Structure

```
PROJECT/
├── BACKEND/
│   ├── config/
│   │   └── database.js          # MongoDB connection config
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   ├── models/
│   │   ├── Contact.js           # Contact form submissions
│   │   ├── Project.js           # Portfolio projects
│   │   ├── Service.js           # Services offered
│   │   ├── Team.js              # Team members
│   │   ├── Testimonial.js       # Client testimonials
│   │   └── User.js              # Admin users
│   ├── controllers/
│   │   ├── serviceController.js
│   │   ├── projectController.js
│   │   ├── testimonialController.js
│   │   ├── contactController.js
│   │   └── teamController.js
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── Services.js          # Service CRUD routes
│   │   ├── projects.js          # Project CRUD routes
│   │   ├── testimonials.js      # Testimonial routes
│   │   ├── contacts.js          # Contact submission routes
│   │   └── team.js              # Team CRUD routes
│   ├── server.js                # Express server entry point
│   ├── seed.js                  # Database seeding script
│   ├── package.json
│   └── .env.example             # Environment variables template
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Navigation bar with theme toggle
│   │   │   ├── Footer.jsx       # Footer component
│   │   │   ├── Hero.jsx         # Hero section
│   │   │   ├── ServiceCard.jsx  # Service card component
│   │   │   ├── ServicesOverview.jsx
│   │   │   ├── Stats.jsx        # Statistics section
│   │   │   ├── Testimonials.jsx # Testimonials carousel
│   │   │   ├── PortfolioGrid.jsx
│   │   │   ├── CTA.jsx          # Call-to-action section
│   │   │   └── Skeleton.jsx     # Loading skeletons
│   │   ├── contexts/
│   │   │   └── ThemeContext.jsx # Dark/Light mode context
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Home page
│   │   │   ├── About.jsx        # About page with team
│   │   │   ├── Services.jsx     # Services listing
│   │   │   ├── ServiceDetail.jsx # Service detail page
│   │   │   ├── Portfolio.jsx    # Portfolio/Projects page
│   │   │   ├── ProjectDetail.jsx # Project detail page
│   │   │   ├── Testimonials.jsx # Testimonials page
│   │   │   └── Contact.jsx      # Contact form page
│   │   ├── App.js               # Main App component
│   │   ├── index.js             # React entry point
│   │   └── index.css            # Global styles
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── postcss.config.js        # PostCSS configuration
│   ├── package.json
│   └── .env.example             # Environment variables template
│
└── README.md (this file)
```

## 🚀 Quick Start

### Prerequisites
- Node.js >= 14.x
- npm or yarn
- MongoDB (local or Atlas connection string)

### 1. Backend Setup

```bash
cd BACKEND

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI and JWT secret
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/outpro
JWT_SECRET=your-super-secret-jwt-key
ADMIN_SECRET=admin-secret-for-registration
PORT=5000
FRONTEND_URL=http://localhost:3000
```

```bash
# Seed the database with sample data
npm run seed

# Start development server
npm run dev

# Server runs on http://localhost:5000
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# .env should contain:
# REACT_APP_API_URL=http://localhost:5000/api

# Start development server
npm start

# App runs on http://localhost:3000
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register Admin
```
POST /auth/register
Body: {
  "username": "admin",
  "password": "password",
  "adminSecret": "admin-secret-key"
}
Response: { token, user }
```

#### Login
```
POST /auth/login
Body: { "username": "admin", "password": "password" }
Response: { token, user }
```

#### Verify Token
```
GET /auth/verify
Headers: { "Authorization": "Bearer <token>" }
Response: { user }
```

### Services Endpoints

#### Get All Services
```
GET /services
Query: ?page=1&limit=10&featured=true
Response: { services, pagination }
```

#### Get Service by Slug
```
GET /services/:slug
Response: { service }
```

#### Create Service (Admin)
```
POST /services
Headers: { "Authorization": "Bearer <token>" }
Body: {
  "title": "Web Development",
  "slug": "web-development",
  "description": "...",
  "shortDescription": "...",
  "icon": "globe",
  "features": [...],
  "isFeatured": true
}
```

#### Update Service (Admin)
```
PUT /services/:id
Headers: { "Authorization": "Bearer <token>" }
Body: { ...same as POST }
```

#### Delete Service (Admin)
```
DELETE /services/:id
Headers: { "Authorization": "Bearer <token>" }
```

### Projects Endpoints

#### Get All Projects
```
GET /projects
Query: ?page=1&limit=10&featured=true&category=Web
Response: { projects, pagination }
```

#### Get Project by Slug
```
GET /projects/:slug
Response: { project }
```

#### CRUD Operations (Admin)
```
POST /projects (Create)
PUT /projects/:id (Update)
DELETE /projects/:id (Delete)
Headers: { "Authorization": "Bearer <token>" }
```

### Testimonials Endpoints

#### Get All Testimonials
```
GET /testimonials
Query: ?page=1&limit=10&featured=true
Response: { testimonials, pagination }
```

#### Get Testimonial by ID
```
GET /testimonials/:id
Response: { testimonial }
```

#### CRUD Operations (Admin)
```
POST /testimonials (Create)
PUT /testimonials/:id (Update)
DELETE /testimonials/:id (Delete)
Headers: { "Authorization": "Bearer <token>" }
```

### Team Endpoints

#### Get Team Members
```
GET /team
Query: ?page=1&limit=10&featured=true
Response: { members, pagination }
```

### Contacts Endpoints

#### Submit Contact Form (Public)
```
POST /contacts
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "subject": "Project Inquiry",
  "message": "..."
}
Response: { contact }
```

#### Get All Contacts (Admin)
```
GET /contacts
Headers: { "Authorization": "Bearer <token>" }
Query: ?page=1&limit=10&isRead=false
Response: { contacts, pagination }
```

#### Mark Contact as Read (Admin)
```
PATCH /contacts/:id/mark-read
Headers: { "Authorization": "Bearer <token>" }
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/outpro
JWT_SECRET=your-super-secret-jwt-key-change-in-production
ADMIN_SECRET=admin-secret-key-for-registration
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

#### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ CORS protection
- ✅ Helmet.js security headers
- ✅ Rate limiting on API endpoints
- ✅ Input validation on all routes
- ✅ Protected admin routes
- ✅ Secure password requirements

## 🎨 Customization

### Theme Colors
Edit `frontend/tailwind.config.js` to customize primary colors:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    900: '#1e3a8a'
  }
}
```

### Fonts
Update font imports in `frontend/src/index.css`

### API URLs
Change `REACT_APP_API_URL` in frontend .env file

## 📦 Dependencies

### Backend
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `cors` - Cross-origin support
- `dotenv` - Environment variables
- `helmet` - Security headers
- `express-rate-limit` - Rate limiting

### Frontend
- `react` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP client
- `framer-motion` - Animations
- `react-hook-form` - Form handling
- `react-icons` - Icon library
- `tailwindcss` - Utility CSS
- `react-countup` - Number animations

## 🚢 Deployment

### Backend Deployment (Render/Heroku)

1. Create account on [Render.com](https://render.com) or [Heroku](https://heroku.com)
2. Connect your GitHub repository
3. Set environment variables in dashboard
4. Deploy with:
   ```bash
   git push
   ```

### Frontend Deployment (Vercel)

1. Deploy to [Vercel](https://vercel.com):
   ```bash
   npm install -g vercel
   vercel
   ```
2. Set `REACT_APP_API_URL` environment variable in Vercel dashboard
3. Automatic deployments on git push

## 📝 Default Admin Credentials

After running `npm run seed` in the backend:
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Change these immediately in production!**

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify MongoDB URI in .env
- Check MongoDB Atlas IP whitelist
- Ensure network connection is stable

### CORS Errors
- Verify `FRONTEND_URL` in backend .env matches your frontend URL
- Check frontend `REACT_APP_API_URL` matches backend URL

### API Calls Returns 404
- Verify backend is running on correct port
- Check route paths in API calls
- Verify API URLs don't have `/api` duplicated

### Theme not persisting
- Clear browser localStorage
- Check browser console for errors
- Verify ThemeContext is wrapped around App

## 📞 Support

For issues or questions:
- Check existing GitHub issues
- Create detailed bug reports with reproduction steps
- Include error logs and environment info

## 📄 License

MIT License - feel free to use for personal and commercial projects

## 🎉 What's Next?

- [ ] Add payment gateway integration
- [ ] Implement email notifications
- [ ] Add analytics dashboard
- [ ] Multi-language support
- [ ] Advanced admin dashboard
- [ ] SEO optimization enhancements
- [ ] Performance monitoring
- [ ] CDN integration

---

**Built with ❤️ using React, Node.js, and MongoDB**
