# Portfolio Backend Integration Contracts

## Overview
Convert the frontend-only portfolio to a full-stack application with backend data storage and API integration.

## Mock Data to Backend Migration

### 1. Personal Information
**Current Mock Location**: `mockData.personal`
**Backend Implementation**: Static data (no API needed, keep in frontend)
**Reason**: Personal contact info rarely changes, no need for database storage

### 2. About Section
**Current Mock Location**: `mockData.about`
**Backend Implementation**: Static data (no API needed, keep in frontend)  
**Reason**: About content is relatively static, admin can update via code

### 3. Skills
**Current Mock Location**: `mockData.skills`
**Backend Implementation**: API endpoint for dynamic skill management
**API**: `GET /api/skills` - Retrieve all skills by category
**Database Model**: Skills collection with categories

### 4. Projects  
**Current Mock Location**: `mockData.projects`
**Backend Implementation**: Full CRUD API for project management
**APIs**: 
- `GET /api/projects` - Retrieve all projects
- `GET /api/projects/:id` - Get specific project details
**Database Model**: Projects collection with full project data

### 5. Experience
**Current Mock Location**: `mockData.experience`  
**Backend Implementation**: API endpoint for experience management
**API**: `GET /api/experience` - Retrieve work experience
**Database Model**: Experience collection with job details

### 6. Education & Certifications
**Current Mock Location**: `mockData.education`, `mockData.certifications`
**Backend Implementation**: API endpoints for education data
**APIs**: 
- `GET /api/education` - Retrieve education history
- `GET /api/certifications` - Retrieve certifications
**Database Models**: Education and Certifications collections

### 7. Contact Form (NEW FUNCTIONALITY)
**Current Mock**: Frontend form with mock submission
**Backend Implementation**: Full contact form processing
**APIs**:
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Admin view of contact submissions (optional)
**Database Model**: Contacts collection for form submissions
**Features**:
- Email validation
- Timestamp tracking
- Optional email notification (if SMTP configured)

## Database Schema

### Skills Collection
```javascript
{
  _id: ObjectId,
  category: String, // "serviceNow", "technical", "emerging"  
  skills: Array[String],
  createdAt: Date,
  updatedAt: Date
}
```

### Projects Collection  
```javascript
{
  _id: ObjectId,
  title: String,
  category: String,
  description: String,
  technologies: Array[String],
  features: Array[String], 
  status: String, // "Production", "In Progress"
  impact: String,
  displayOrder: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Experience Collection
```javascript
{
  _id: ObjectId,
  company: String,
  position: String,
  duration: String,
  location: String,
  achievements: Array[String],
  displayOrder: Number,
  createdAt: Date,
  updatedAt: Date  
}
```

### Education Collection
```javascript
{
  _id: ObjectId,
  institution: String,
  degree: String,
  duration: String,
  location: String,
  status: String, // "Completed", "Planning to Enroll"
  displayOrder: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Certifications Collection
```javascript
{
  _id: ObjectId,
  name: String,
  issuer: String,
  dateObtained: Date,
  displayOrder: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Contacts Collection (NEW)
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  isRead: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Frontend Integration Plan

### Phase 1: Backend API Development
1. Create database models for all collections
2. Implement GET endpoints for data retrieval
3. Create contact form POST endpoint
4. Add basic error handling and validation

### Phase 2: Frontend Integration
1. Replace mock data imports with API calls
2. Add loading states for data fetching
3. Update contact form to submit to backend
4. Add error handling for failed API calls
5. Remove mock.js file

### Phase 3: Data Migration
1. Seed database with current mock data
2. Test all API endpoints
3. Verify frontend displays data correctly
4. Test contact form submission

## API Response Format
All APIs will return standardized JSON responses:

**Success Response:**
```javascript
{
  success: true,
  data: [...] // Actual data
}
```

**Error Response:**  
```javascript
{
  success: false,
  error: "Error message",
  code: "ERROR_CODE"
}
```

## Security Considerations
- Input validation on all POST endpoints
- Rate limiting on contact form submissions
- Email validation and sanitization
- Basic XSS protection for stored data

## Testing Strategy
1. Backend API testing with mock data seeding
2. Frontend integration testing
3. Contact form end-to-end testing
4. Performance testing for data loading