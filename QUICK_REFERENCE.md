# QUICK REFERENCE GUIDE

Essential commands and URLs for the Outpro India platform.

## 🚀 Getting Started (5 mins)

### Terminal 1: Backend Setup
```bash
cd BACKEND
npm install
cp .env.example .env
# Update .env with MONGODB_URI
npm run seed
npm run dev
```

### Terminal 2: Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

Open: http://localhost:3000

---

## 📍 Key URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | React app |
| Backend | http://localhost:5000 | API server |
| API Base | http://localhost:5000/api | API endpoints |
| MongoDB | mongodb+srv://... | Database |

---

## 🔑 Credentials

| Item | Value |
|------|-------|
| Admin Username | admin |
| Admin Password | admin123 |
| JWT Secret | In .env |
| Admin Secret | In .env |

⚠️ Change in production!

---

## 🔗 Main Endpoints

### Auth
```
POST   /auth/login
POST   /auth/register
GET    /auth/verify
```

### Services
```
GET    /services              # List all
GET    /services/:slug        # Get one
POST   /services              # Create (admin)
PUT    /services/:id          # Update (admin)
DELETE /services/:id          # Delete (admin)
```

### Projects
```
GET    /projects              # List all
GET    /projects/:slug        # Get one
POST   /projects              # Create (admin)
PUT    /projects/:id          # Update (admin)
DELETE /projects/:id          # Delete (admin)
```

### Contacts
```
POST   /contacts              # Submit form (public)
GET    /contacts              # List all (admin)
PATCH  /contacts/:id/mark-read
DELETE /contacts/:id          # Delete (admin)
```

### Other
```
GET    /testimonials
GET    /team
GET    /health
```

---

## 📂 Important Files

| File | Purpose |
|------|---------|
| `.env` | Backend config |
| `frontend/.env` | Frontend config |
| `seed.js` | Sample data script |
| `server.js` | Express app entry |
| `src/App.js` | React entry |

---

## 📦 NPM Scripts

### Backend
```bash
npm run dev        # Dev server with nodemon
npm start          # Production server
npm run seed       # Populate database
npm test           # Run tests
```

### Frontend
```bash
npm start          # Dev server
npm run build      # Production build
npm test           # Run tests
npm run eject      # (Don't use!)
```

---

## 🎨 Pages & Routes

| Route | Component | Status |
|-------|-----------|--------|
| / | Home | ✅ |
| /about | About | ✅ |
| /services | Services | ✅ |
| /services/:slug | ServiceDetail | ✅ |
| /portfolio | Portfolio | ✅ |
| /projects/:slug | ProjectDetail | ✅ |
| /testimonials | Testimonials | ✅ |
| /contact | Contact | ✅ |

---

## 🔧 Configuration

### .env (Backend)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/outpro
JWT_SECRET=your-secret-key
ADMIN_SECRET=admin-secret
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### .env (Frontend)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🧪 Test Data

After `npm run seed`:

**Services**: 4 samples
- Web Development
- Mobile App Development
- UI/UX Design
- Digital Marketing

**Projects**: 3 samples
- E-commerce Platform
- SaaS Analytics Dashboard
- Mobile Fitness App

**Testimonials**: 4 samples
- Rajesh Kumar (CEO)
- Priya Sharma (PM)
- Amit Patel (Founder)
- Neha Gupta (CTO)

**Team**: 4 members
- Arjun Singh (Founder)
- Kavya Mendis (Designer)
- Vikram Desai (Backend Dev)
- Sneha Bansal (Frontend Dev)

---

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Port already in use | Change PORT in .env |
| MongoDB connection error | Check MONGODB_URI |
| API 404 errors | Verify backend is running |
| CORS errors | Check FRONTEND_URL in backend .env |
| Theme not working | Clear localStorage |

---

## 📊 API Testing

### GET Services
```bash
curl http://localhost:5000/api/services
```

### POST Contact
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "message": "Hello"
  }'
```

### GET with Auth
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/contacts
```

---

## 📝 Documentation Files

| File | Topics |
|------|--------|
| README.md | Overview, features, quick start |
| API_DOCUMENTATION.md | All endpoints, examples |
| BACKEND/SETUP.md | Backend installation, config |
| frontend/SETUP.md | Frontend installation, config |
| DEPLOYMENT.md | Production deployment guide |
| PROJECT_SUMMARY.md | Completion status, stats |

---

## 🚢 Deployment

### Quick Deploy (Render)
```bash
git push # Auto-deploys
```

### Quick Deploy (Vercel)
```bash
vercel
```

See DEPLOYMENT.md for details.

---

## 📊 Project Stats

| Metric | Count |
|--------|-------|
| Pages | 8 |
| Components | 13 |
| Routes | 30+ |
| Models | 6 |
| Controllers | 5 |
| Dependencies | 20+ |
| Code Lines | 5000+ |
| Docs | 1500+ lines |

---

## 🎯 Next Features

- [ ] Admin Dashboard
- [ ] Payment Integration
- [ ] Email Notifications
- [ ] Multi-language Support
- [ ] Analytics Dashboard
- [ ] Advanced Search
- [ ] User Comments
- [ ] Social Sharing

---

## 💡 Tips

1. **Hot Reload**: Frontend auto-reloads; backend needs nodemon (included)
2. **Seed Data**: Run seed.js only once; creates duplicates if run again
3. **Dark Mode**: Toggle in navbar; persists in localStorage
4. **Mobile Testing**: Use browser DevTools or yarn build + serve
5. **API Testing**: Use VS Code REST Client or Postman

---

## 🔐 Security Checklist

- [ ] Change admin password
- [ ] Change JWT_SECRET
- [ ] Change ADMIN_SECRET
- [ ] Update FRONTEND_URL
- [ ] Enable HTTPS
- [ ] Setup database backups
- [ ] Configure firewalls
- [ ] Enable rate limiting (done)
- [ ] Setup monitoring
- [ ] Review logs regularly

---

## 📞 Help

- Docs: Start with README.md
- Setup: See BACKEND/SETUP.md or frontend/SETUP.md
- APIs: See API_DOCUMENTATION.md
- Deploy: See DEPLOYMENT.md
- Status: See PROJECT_SUMMARY.md

---

**Version**: 1.0.0
**Status**: Production Ready ✅
**Last Updated**: 2024

---

## Quick Command Reference

```bash
# Setup
npm install                    # Install deps
cp .env.example .env          # Create env file
npm run seed                  # Seed database

# Development
npm run dev                   # Start dev server
npm start                     # Start production
npm test                      # Run tests

# Building
npm run build                 # Build for production
npm run eject                 # Eject from CRA (don't use)

# Database
npm run seed                  # Create sample data
mongo                         # Connect to local DB
```

---

**Happy Coding! 🎉**
