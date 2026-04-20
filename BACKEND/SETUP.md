## Backend Setup Guide

Complete setup instructions for the Outpro India backend.

### Prerequisites
- Node.js >= 14.x
- npm or yarn
- MongoDB (Atlas or Local)
- Git

### Installation Steps

#### 1. Clone the Repository/Access Project
```bash
cd BACKEND
```

#### 2. Install Dependencies
```bash
npm install
```

Dependencies installed:
- **express** v4.18.2 - Web framework
- **mongoose** v8.0.0 - MongoDB ODM
- **bcryptjs** v2.4.3 - Password encryption
- **jsonwebtoken** v9.0.2 - JWT authentication
- **cors** v2.8.5 - Cross-Origin Support
- **helmet** v7.0.0 - Security headers
- **express-rate-limit** v7.0.0 - Rate limiting
- **dotenv** v17.4.2 - Environment variables
- **nodemon** v3.0.1 (dev) - Auto-restart on changes

#### 3. Configure Environment Variables

Create `.env` file in the BACKEND folder:

```bash
cp .env.example .env
```

Edit the `.env` file with your settings:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/outpro-db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d

# Admin Registration Secret
ADMIN_SECRET=admin-secret-key-for-registration

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

**Environment Variables Explanation:**
- `MONGODB_URI`: Your MongoDB connection string (create free cluster on MongoDB Atlas)
- `JWT_SECRET`: Secret key for signing JWT tokens (use a strong random string)
- `ADMIN_SECRET`: Secret key needed to register new admin users
- `PORT`: Port number for the backend server
- `NODE_ENV`: Environment mode (development/production)
- `FRONTEND_URL`: Frontend URL for CORS configuration

#### 4. MongoDB Setup

**Option A: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env`

**Option B: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/outpro`
4. Update `MONGODB_URI` in `.env`

#### 5. Seed the Database

Create sample data:

```bash
npm run seed
```

This will create:
- 4 Services
- 3 Projects
- 4 Testimonials
- 4 Team Members
- Default admin user (username: `admin`, password: `admin123`)

⚠️ **Change admin password immediately in production!**

#### 6. Start Development Server

```bash
npm run dev
```

Expected output:
```
🔗 Connected to MongoDB
✅ Services seeded
✅ Projects seeded
✅ Testimonials seeded
✅ Team members seeded
✅ Default admin user created
🎉 Database seeding completed successfully!
🚀 Server running on port 5000
```

Server is now running at: `http://localhost:5000`

### Verify Installation

Test the API:

```bash
# Check server health
curl http://localhost:5000/api/health

# Get services
curl http://localhost:5000/api/services

# Get projects
curl http://localhost:5000/api/projects
```

### Directory Structure

```
BACKEND/
├── config/
│   └── database.js              # MongoDB connection
├── middleware/
│   └── auth.js                  # JWT authentication middleware
├── models/
│   ├── Contact.js               # Contact form schema
│   ├── Project.js               # Portfolio project schema
│   ├── Service.js               # Service schema
│   ├── Team.js                  # Team member schema
│   ├── Testimonial.js           # Testimonial schema
│   └── User.js                  # Admin user schema
├── controllers/
│   ├── serviceController.js     # Service CRUD logic
│   ├── projectController.js     # Project CRUD logic
│   ├── testimonialController.js # Testimonial CRUD logic
│   ├── contactController.js     # Contact form logic
│   └── teamController.js        # Team CRUD logic
├── routes/
│   ├── auth.js                  # Auth endpoints
│   ├── Services.js              # Service endpoints
│   ├── projects.js              # Project endpoints
│   ├── testimonials.js          # Testimonial endpoints
│   ├── contacts.js              # Contact endpoints
│   └── team.js                  # Team endpoints
├── server.js                    # Express server setup
├── seed.js                      # Database seeding script
├── package.json                 # Dependencies
├── .env.example                 # Environment template
├── .env                         # Environment config (create this)
└── README.md                    # This file
```

### Common Commands

```bash
# Install dependencies
npm install

# Run development server with auto-reload
npm run dev

# Start production server
npm start

# Seed database with sample data
npm run seed

# Run tests
npm test
```

### API Endpoints

All endpoints are prefixed with `/api`:

**Authentication:**
- `POST /auth/register` - Create admin account
- `POST /auth/login` - Login
- `GET /auth/verify` - Verify token

**Services:**
- `GET /services` - Get all services
- `GET /services/:slug` - Get service by slug
- `POST /services` - Create service (admin)
- `PUT /services/:id` - Update service (admin)
- `DELETE /services/:id` - Delete service (admin)

**Projects:**
- `GET /projects` - Get all projects
- `GET /projects/:slug` - Get project by slug
- `POST /projects` - Create project (admin)
- `PUT /projects/:id` - Update project (admin)
- `DELETE /projects/:id` - Delete project (admin)

**Testimonials:**
- `GET /testimonials` - Get testimonials
- `POST /testimonials` - Create (admin)
- `PUT /testimonials/:id` - Update (admin)
- `DELETE /testimonials/:id` - Delete (admin)

**Team:**
- `GET /team` - Get team members
- `POST /team` - Create (admin)
- `PUT /team/:id` - Update (admin)
- `DELETE /team/:id` - Delete (admin)

**Contacts:**
- `POST /contacts` - Submit contact form (public)
- `GET /contacts` - Get contacts (admin)
- `PATCH /contacts/:id/mark-read` - Mark read (admin)
- `DELETE /contacts/:id` - Delete (admin)

### Authentication

To access admin endpoints, include JWT token in Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Troubleshooting

**MongoDB Connection Error**
```
❌ MongoDB connection error: connect ECONNREFUSED
```
- Verify MongoDB is running
- Check MongoDB URI in .env
- If using Atlas, verify IP whitelist

**Port Already in Use**
```
Error: listen EADDRINUSE :::5000
```
- Change PORT in .env to different port
- Or kill process: `lsof -ti:5000 | xargs kill -9`

**Module Not Found**
```
Cannot find module 'express'
```
- Run: `npm install`
- Delete node_modules and package-lock.json, then `npm install`

**Seed Script Fails**
```
Cannot connect to database
```
- Ensure MongoDB is running
- Check MONGODB_URI is valid
- Verify internet connection if using Atlas

### Production Deployment

**Before Deploying:**
1. Change `JWT_SECRET` to a strong random string
2. Change `ADMIN_SECRET` to a secure value
3. Change admin password
4. Set `NODE_ENV=production`
5. Use MongoDB Atlas or managed database
6. Enable all security features

**Deploy to Render:**
```
1. Push code to GitHub
2. Create account on render.com
3. Connect GitHub repository
4. Set environment variables
5. Deploy
```

**Deploy to Heroku:**
```
1. Install Heroku CLI
2. heroku login
3. heroku create app-name
4. git push heroku main
5. heroku config:set MONGODB_URI=...
```

### Support & Documentation

- See [README.md](../README.md) for complete project documentation
- See [API_DOCUMENTATION.md](../API_DOCUMENTATION.md) for detailed API reference
- Check [Frontend Setup Guide](../frontend/SETUP.md)
