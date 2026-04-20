# API Routes Documentation

Complete API documentation for Outpro India backend.

## Base URL
```
http://localhost:5000/api
```

## Response Format

All responses follow this format:

### Success Response
```json
{
  "data": { /* response data */ },
  "pagination": {
    "current": 1,
    "pages": 5,
    "total": 50
  }
}
```

### Error Response
```json
{
  "message": "Error description"
}
```

## Authentication

All admin routes require JWT token in header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### 1. Authentication (`/auth`)

#### Register Admin
```http
POST /auth/register
Content-Type: application/json

{
  "username": "admin",
  "password": "secure-password",
  "adminSecret": "your-admin-secret"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "admin"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "admin"
  }
}
```

#### Verify Token
```http
GET /auth/verify
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "username": "admin",
  "role": "admin"
}
```

---

### 2. Services (`/services`)

#### Get All Services
```http
GET /services?page=1&limit=10&featured=true
```

**Query Parameters:**
- `page` (number) - Page number (default: 1)
- `limit` (number) - Items per page (default: 10)
- `featured` (boolean) - Get only featured services

**Response:**
```json
{
  "services": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Web Development",
      "slug": "web-development",
      "description": "Custom web applications...",
      "shortDescription": "Web apps and websites",
      "icon": "globe",
      "features": [
        {
          "title": "React Applications",
          "description": "Modern SPA development"
        }
      ],
      "isFeatured": true,
      "order": 1,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "current": 1,
    "pages": 5,
    "total": 50
  }
}
```

#### Get Service by Slug
```http
GET /services/web-development
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Web Development",
  "slug": "web-development",
  "description": "...",
  "shortDescription": "...",
  "icon": "globe",
  "features": [...],
  "isFeatured": true,
  "order": 1
}
```

#### Create Service (Admin)
```http
POST /services
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Service",
  "slug": "new-service",
  "description": "Detailed description...",
  "shortDescription": "Short desc",
  "icon": "icon-name",
  "features": [
    {
      "title": "Feature 1",
      "description": "Feature description"
    }
  ],
  "isFeatured": true,
  "order": 1
}
```

#### Update Service (Admin)
```http
PUT /services/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Service",
  /* other fields to update */
}
```

#### Delete Service (Admin)
```http
DELETE /services/:id
Authorization: Bearer <token>
```

---

### 3. Projects (`/projects`)

#### Get All Projects
```http
GET /projects?page=1&limit=10&featured=true&category=Web
```

**Query Parameters:**
- `page` (number)
- `limit` (number)
- `featured` (boolean)
- `category` (string)

**Response:**
```json
{
  "projects": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "E-commerce Platform",
      "slug": "ecommerce-platform",
      "description": "Full-featured online store...",
      "shortDescription": "Online store",
      "image": "https://...",
      "category": "Web Application",
      "technologies": ["React", "Node.js", "MongoDB"],
      "kpiResults": [
        {
          "metric": "Sales Growth",
          "value": "300%",
          "description": "Year-over-year increase"
        }
      ],
      "isFeatured": true,
      "client": "TechRetail Co.",
      "liveUrl": "https://...",
      "caseStudyUrl": "/case-studies/..."
    }
  ],
  "pagination": { /* ... */ }
}
```

#### Get Project by Slug
```http
GET /projects/ecommerce-platform
```

#### Create Project (Admin)
```http
POST /projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Project",
  "slug": "new-project",
  "description": "...",
  "shortDescription": "...",
  "image": "https://...",
  "category": "Web Application",
  "technologies": ["React", "Node.js"],
  "kpiResults": [
    {
      "metric": "Metric",
      "value": "100",
      "description": "Description"
    }
  ],
  "isFeatured": true,
  "client": "Client Name"
}
```

#### Update Project (Admin)
```http
PUT /projects/:id
Authorization: Bearer <token>
Content-Type: application/json
```

#### Delete Project (Admin)
```http
DELETE /projects/:id
Authorization: Bearer <token>
```

---

### 4. Testimonials (`/testimonials`)

#### Get All Testimonials
```http
GET /testimonials?page=1&limit=10&featured=true
```

**Response:**
```json
{
  "testimonials": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "John Doe",
      "position": "CEO",
      "company": "Tech Company",
      "content": "Great work...",
      "rating": 5,
      "image": "https://...",
      "isVideo": false,
      "videoUrl": null,
      "isFeatured": true
    }
  ],
  "pagination": { /* ... */ }
}
```

#### Get Testimonial by ID
```http
GET /testimonials/:id
```

#### Create Testimonial (Admin)
```http
POST /testimonials
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Name",
  "position": "Position",
  "company": "Company",
  "content": "Testimonial text...",
  "rating": 5,
  "image": "https://...",
  "isVideo": false,
  "videoUrl": null,
  "isFeatured": true
}
```

#### Update Testimonial (Admin)
```http
PUT /testimonials/:id
Authorization: Bearer <token>
```

#### Delete Testimonial (Admin)
```http
DELETE /testimonials/:id
Authorization: Bearer <token>
```

---

### 5. Team (`/team`)

#### Get Team Members
```http
GET /team?page=1&limit=10&featured=true
```

**Response:**
```json
{
  "members": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "name": "Arjun Singh",
      "position": "Founder & Lead Developer",
      "image": "https://...",
      "bio": "Full-stack developer...",
      "linkedin": "https://linkedin.com/in/...",
      "twitter": "https://twitter.com/...",
      "isFeatured": true
    }
  ],
  "pagination": { /* ... */ }
}
```

#### Get Team Member by ID
```http
GET /team/:id
```

#### Create Team Member (Admin)
```http
POST /team
Authorization: Bearer <token>

{
  "name": "Name",
  "position": "Position",
  "image": "https://...",
  "bio": "Biography...",
  "linkedin": "https://...",
  "twitter": "https://...",
  "isFeatured": true
}
```

#### Update Team Member (Admin)
```http
PUT /team/:id
Authorization: Bearer <token>
```

#### Delete Team Member (Admin)
```http
DELETE /team/:id
Authorization: Bearer <token>
```

---

### 6. Contacts (`/contacts`)

#### Submit Contact Form (Public)
```http
POST /contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "subject": "Project Inquiry",
  "message": "I'm interested in your services..."
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "subject": "Project Inquiry",
  "message": "...",
  "isRead": false,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Get All Contacts (Admin)
```http
GET /contacts
Authorization: Bearer <token>
Query: ?page=1&limit=10&isRead=false
```

#### Get Contact by ID (Admin)
```http
GET /contacts/:id
Authorization: Bearer <token>
```

#### Update Contact (Admin)
```http
PUT /contacts/:id
Authorization: Bearer <token>
```

#### Mark Contact as Read (Admin)
```http
PATCH /contacts/:id/mark-read
Authorization: Bearer <token>
```

#### Delete Contact (Admin)
```http
DELETE /contacts/:id
Authorization: Bearer <token>
```

---

### 7. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

---

## Error Codes

| Code | Message | Meaning |
|------|---------|---------|
| 200 | OK | Success |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Invalid credentials |
| 404 | Not Found | Resource not found |
| 500 | Internal Error | Server error |

---

## Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 100 per IP address
- **Header Response**: `X-RateLimit-*` headers included

---

## Best Practices

1. Always include `Authorization` header for admin routes
2. Use pagination for large datasets
3. Filter by `featured: true` for homepage content
4. Validate input before sending
5. Handle errors gracefully in frontend
