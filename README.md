Sure. Copy everything inside the block below directly into your `README.md`.

````markdown
# 🏡 StayNest — Find Your Next Stay

> A full-stack Airbnb-inspired rental marketplace built with React, Express, PostgreSQL, and JWT authentication.

StayNest is a full-stack web application that allows users to discover properties, search and filter listings, view detailed property information, create accounts, securely log in, and save properties to their personal dashboard.

The project uses original StayNest branding, UI, and data rather than copying Airbnb's branding or assets.

---

## ✨ Features

### 🏠 Property Discovery

- Responsive landing page
- Property search by title and location
- Stays / Experiences / Adventures navigation
- Property category filtering
- Curated property sections
- Property cards with images, pricing, ratings, and locations
- Property details page
- Property descriptions and amenities
- Loading states
- Empty search-result states
- Responsive design for desktop and mobile

### 🔍 Search & Filtering

- Search properties by title
- Search properties by location
- Filter properties by type
- Filter properties by category
- Dynamic property results
- Empty state when no matching properties are found

Supported property types:

- Stays
- Experiences
- Adventures

Supported categories include:

- Trending
- Beach
- Mountains
- Cabins
- City
- Luxury
- Pools
- Islands

### 🏡 Property Details

Each property card can be opened to view a dedicated property details page.

The property details page includes:

- Property name
- Property image
- Location
- Rating
- Review count
- Price
- Description
- Amenities
- Category
- Property type
- Save/Favorite functionality

Property URLs use the following format:

```text
/property/:id
````

Example:

```text
/property/12
```

---

# 🔐 Authentication

StayNest includes a complete authentication system.

Features include:

* User registration
* User login
* User logout
* Secure password hashing using bcrypt
* JWT-based authentication
* HTTP-only authentication cookies
* Protected dashboard
* Authentication session restoration after page refresh
* Server-side authentication middleware

Passwords are never stored as plain text.

---

# ❤️ Saved Properties

Users can save properties to their personal favorites.

Features include:

* Save a property
* Remove a saved property
* View saved properties
* Favorites stored in PostgreSQL
* Favorites persist after browser refresh
* Favorite state synchronized with the backend
* Login required for saving properties
* Saved properties displayed in the dashboard

The favorites system uses the existing backend API and PostgreSQL database rather than relying only on browser local storage.

---

# 📊 User Dashboard

Authenticated users have access to a protected dashboard.

The dashboard provides:

* User profile information
* Saved properties
* Favorite property management
* Protected access using authentication

Unauthenticated users cannot access protected dashboard functionality.

---

# 🧱 Technology Stack

| Layer               | Technology   |
| ------------------- | ------------ |
| Frontend            | React        |
| Build Tool          | Vite         |
| Styling             | Tailwind CSS |
| Routing             | React Router |
| Icons               | Lucide React |
| Backend             | Node.js      |
| API Framework       | Express.js   |
| Database            | PostgreSQL   |
| Database Hosting    | Supabase     |
| Authentication      | JWT          |
| Password Hashing    | bcrypt       |
| API Communication   | Fetch API    |
| Development Server  | Nodemon      |
| Frontend Deployment | Vercel       |
| Backend Deployment  | Render       |

---

# 🏗️ Application Architecture

```text
                         ┌──────────────────────┐
                         │       Browser        │
                         │    React + Vite      │
                         └──────────┬───────────┘
                                    │
                                    │ REST API
                                    │ credentials: include
                                    ▼
                         ┌──────────────────────┐
                         │     Express API      │
                         │       Node.js        │
                         └──────────┬───────────┘
                                    │
                                    │ PostgreSQL
                                    ▼
                         ┌──────────────────────┐
                         │       Supabase       │
                         │      PostgreSQL      │
                         └──────────────────────┘
```

---

# 🔑 Authentication Architecture

The authentication flow works as follows:

```text
User
 │
 ├── Sign Up
 │      │
 │      ▼
 │   Express API
 │      │
 │      ▼
 │   Validate Input
 │      │
 │      ▼
 │   bcrypt Password Hash
 │      │
 │      ▼
 │   PostgreSQL
 │      │
 │      ▼
 │   Generate JWT
 │      │
 │      ▼
 │   HTTP-only Cookie
 │
 └── Login
        │
        ▼
     Express API
        │
        ▼
     Verify Password
        │
        ▼
     Generate JWT
        │
        ▼
     HTTP-only Cookie
        │
        ▼
     Protected Requests
```

The JWT is stored in an HTTP-only cookie rather than localStorage.

---

# 📁 Project Structure

```text
StayNest/
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Categories.jsx
│   │   ├── PropertyCard.jsx
│   │   ├── PropertySection.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── AuthLayout.jsx
│   │   ├── FormField.jsx
│   │   ├── Footer.jsx
│   │   └── GoogleMark.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── FavoritesContext.jsx
│   │   └── ToastContext.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── PropertyDetails.jsx
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── propertyService.js
│   │   └── favoriteService.js
│   │
│   └── data/
│       ├── properties.js
│       └── categories.js
│
├── backend/
│   ├── server.js
│   ├── package.json
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── propertyRoutes.js
│   │   └── favoriteRoutes.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── propertyController.js
│   │   └── favoriteController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── db/
│   │   ├── database.js
│   │   ├── schema.sql
│   │   └── migrate.js
│   │
│   ├── seed/
│   │   ├── propertiesData.js
│   │   ├── seedProperties.js
│   │   └── seedExperiences.js
│   │
│   └── utils/
│       └── generateToken.js
│
├── public/
│
├── package.json
│
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js 18 or later
* npm
* Git
* A Supabase account
* PostgreSQL-compatible database

---

# 1. Clone the Repository

Clone the project from GitHub:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Move into the project directory:

```bash
cd "Hack The Box"
```

---

# 2. Database Setup

StayNest uses PostgreSQL hosted through Supabase.

Create a Supabase project and obtain the PostgreSQL connection string from:

```text
Supabase
    ↓
Project Settings
    ↓
Database
    ↓
Connection String
```

The backend connects directly to PostgreSQL using the `pg` package.

For hosted environments, the Supabase pooler connection can be used.

---

# 3. Backend Setup

Open a terminal and navigate to the backend:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

---

# 4. Configure Backend Environment Variables

Create a file named:

```text
backend/.env
```

Add:

```env
DATABASE_URL=your_supabase_database_url

JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=30d

PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Replace:

```text
your_supabase_database_url
```

with your actual Supabase PostgreSQL connection string.

Replace:

```text
your_long_random_secret
```

with a secure random secret.

---

# 🔐 Generate a JWT Secret

A secure JWT secret can be generated using Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Copy the generated value into:

```env
JWT_SECRET=your_generated_secret
```

Never commit your `.env` file to GitHub.

---

# 5. Run Database Migration

From the `backend` directory:

```bash
npm run migrate
```

Expected output:

```text
[migrate] schema applied successfully
```

The migration creates or updates the required database structure.

---

# 6. Seed Property Data

For a fresh database, run:

```bash
npm run seed
```

This adds the main StayNest property dataset.

---

# 7. Add Experiences and Adventures

To add the additional discovery properties:

```bash
npm run seed:discovery
```

This adds:

* Experiences
* Adventures

The discovery seed is designed to be additive and does not intentionally remove the existing StayNest properties or favorites.

---

## ⚠️ Important Database Warning

The main seed script may reset/truncate property data depending on the current implementation.

Therefore, do not repeatedly run:

```bash
npm run seed
```

against a database containing data that must be preserved.

For adding the additional Experiences and Adventures to an existing database, use:

```bash
npm run seed:discovery
```

---

# 8. Start the Backend

From the `backend` directory:

```bash
npm run dev
```

The backend normally runs at:

```text
http://localhost:5000
```

You should see:

```text
[server] StayNest API listening on http://localhost:5000
```

Keep this terminal running.

---

# 9. Frontend Setup

Open a second terminal in the project root:

```bash
cd "Hack The Box"
```

Install frontend dependencies:

```bash
npm install
```

---

# 10. Configure Frontend Environment Variables

Create:

```text
.env
```

in the project root.

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 11. Start the Frontend

Run:

```bash
npm run dev
```

The frontend normally runs at:

```text
http://localhost:5173
```

Open the URL in your browser.

---

# 🌐 Application Routes

The main frontend routes are:

```text
/
```

Home page.

```text
/signup
```

User registration.

```text
/login
```

User login.

```text
/dashboard
```

Protected user dashboard.

```text
/property/:id
```

Property details.

Example:

```text
/property/1
```

---

# 🔍 Search and Filtering

The property discovery system supports query parameters.

### Search

```text
/?search=Goa
```

Searches property information such as title and location.

### Property Type

```text
/?type=stay
```

```text
/?type=experience
```

```text
/?type=adventure
```

### Category

```text
/?category=Beach
```

The frontend uses these parameters to request and display the appropriate property data.

---

# 🏠 Property Discovery

StayNest supports three main property types:

## Stays

Traditional accommodation listings.

```text
type=stay
```

## Experiences

Activities and experiences.

```text
type=experience
```

## Adventures

Adventure-focused activities.

```text
type=adventure
```

---

# ❤️ Favorites API

Authenticated users can save properties.

## Get Favorites

```http
GET /api/favorites
```

Authentication required.

---

## Save Property

```http
POST /api/favorites/:propertyId
```

Authentication required.

---

## Remove Property

```http
DELETE /api/favorites/:propertyId
```

Authentication required.

---

# 📡 API Reference

## Authentication API

| Method | Endpoint           | Authentication | Description                    |
| ------ | ------------------ | -------------- | ------------------------------ |
| POST   | `/api/auth/signup` | No             | Create a new account           |
| POST   | `/api/auth/login`  | No             | Log in                         |
| POST   | `/api/auth/logout` | No             | Log out                        |
| GET    | `/api/auth/me`     | Yes            | Get current authenticated user |

---

## Property API

| Method | Endpoint              | Authentication | Description             |
| ------ | --------------------- | -------------- | ----------------------- |
| GET    | `/api/properties`     | No             | Get properties          |
| GET    | `/api/properties/:id` | No             | Get a specific property |

Supported query parameters:

```text
type
category
location
search
```

Example:

```text
/api/properties?type=stay
```

Example:

```text
/api/properties?type=experience
```

Example:

```text
/api/properties?type=adventure
```

Example:

```text
/api/properties?search=Goa
```

Example:

```text
/api/properties?category=Beach
```

Multiple filters can be combined where supported.

---

## Favorites API

| Method | Endpoint                     | Authentication | Description          |
| ------ | ---------------------------- | -------------- | -------------------- |
| GET    | `/api/favorites`             | Yes            | Get saved properties |
| POST   | `/api/favorites/:propertyId` | Yes            | Save a property      |
| DELETE | `/api/favorites/:propertyId` | Yes            | Remove a property    |

---

# 🗄️ Database Structure

StayNest primarily uses three database tables:

```text
users
properties
favorites
```

---

## Users Table

```text
users
├── id
├── name
├── email
├── password_hash
├── phone
└── created_at
```

The email field is unique.

Passwords are stored as bcrypt hashes.

---

## Properties Table

```text
properties
├── id
├── title
├── location
├── description
├── price_per_night
├── rating
├── review_count
├── image_url
├── category
├── property_type
├── dates
└── note
```

The `property_type` field supports:

```text
stay
experience
adventure
```

---

## Favorites Table

```text
favorites
├── id
├── user_id
└── property_id
```

A unique constraint prevents the same user from saving the same property more than once.

---

# 🔒 Security

StayNest uses several security mechanisms.

### Password Security

Passwords are hashed using bcrypt before being stored in the database.

Plain-text passwords are never stored.

### JWT Authentication

JWT tokens are used to authenticate protected API requests.

### HTTP-only Cookies

Authentication tokens are stored in HTTP-only cookies rather than localStorage.

This prevents JavaScript from directly accessing the authentication cookie.

### Protected Routes

The dashboard and favorites API require authentication.

### Database Constraints

Database constraints help prevent duplicate favorites and maintain relationships between users and properties.

### Environment Variables

Database credentials and authentication secrets are stored in environment variables.

Sensitive `.env` files should never be committed to GitHub.

---

# 🔧 Environment Variables

## Frontend

Create:

```text
.env
```

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Backend

Create:

```text
backend/.env
```

Example:

```env
DATABASE_URL=postgresql://user:password@host:port/postgres

JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=30d

PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Do not replace your actual credentials with these example values.

---

# 🧪 Testing Checklist

Before deployment, verify the following.

## Authentication

* [x] Sign Up works
* [x] User is stored in PostgreSQL
* [x] Login works
* [x] Logout works
* [x] Dashboard is protected
* [x] Authentication persists after refresh

## Favorites

* [x] Save property works
* [x] Remove property works
* [x] Saved property appears in dashboard
* [x] Favorite persists after browser refresh

## Database

* [x] Supabase connection works
* [x] Database migration works
* [x] Main properties are seeded
* [x] Experiences are seeded
* [x] Adventures are seeded

## Property Discovery

* [ ] Stays navigation works
* [ ] Experiences navigation works
* [ ] Adventures navigation works
* [ ] Search works
* [ ] Category filtering works
* [ ] Property cards open details
* [ ] Property details load correctly

## UI

* [ ] Desktop layout verified
* [ ] Mobile layout verified
* [ ] Loading states verified
* [ ] Empty search states verified
* [ ] Navigation verified

---

# 📦 Available Scripts

## Frontend

Start development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Backend

Start development server:

```bash
npm run dev
```

Start production server:

```bash
npm start
```

Run database migration:

```bash
npm run migrate
```

Seed main properties:

```bash
npm run seed
```

Seed Experiences and Adventures:

```bash
npm run seed:discovery
```

---

# 🏗️ Development Workflow

For local development, two terminals are used.

### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

Backend:

```text
http://localhost:5000
```

### Terminal 2 — Frontend

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

The frontend communicates with the backend through:

```text
http://localhost:5000/api
```

---

# ☁️ Deployment

The planned production architecture is:

```text
                 ┌─────────────────────┐
                 │       Vercel        │
                 │      Frontend       │
                 └──────────┬──────────┘
                            │
                            │ HTTPS
                            ▼
                 ┌─────────────────────┐
                 │       Render        │
                 │       Backend       │
                 └──────────┬──────────┘
                            │
                            │ PostgreSQL
                            ▼
                 ┌─────────────────────┐
                 │      Supabase       │
                 │     PostgreSQL      │
                 └─────────────────────┘
```

---

# 🚀 Frontend Deployment — Vercel

The React/Vite frontend can be deployed to Vercel.

Configure:

```env
VITE_API_URL=https://your-backend-url/api
```

Replace:

```text
your-backend-url
```

with the deployed backend URL.

---

# 🚀 Backend Deployment — Render

The backend can be deployed to Render.

Backend root directory:

```text
backend
```

Build command:

```bash
npm install
```

Start command:

```bash
npm start
```

Production environment variables:

```env
DATABASE_URL=your_production_database_url
JWT_SECRET=your_production_secret
JWT_EXPIRES_IN=30d
PORT=5000
CLIENT_URL=https://your-frontend-url
NODE_ENV=production
```

Generate a new production JWT secret rather than reusing a development secret.

---

# 🌐 Production CORS

When deployed, the backend must allow requests from the deployed frontend.

Example:

```env
CLIENT_URL=https://your-frontend.vercel.app
```

The backend uses credentials-enabled CORS so the authentication cookie can be sent with API requests.

---

# 🛣️ Future Improvements

The following features can be added in future versions:

* [ ] Real booking system
* [ ] Availability calendar
* [ ] Host property creation
* [ ] Property image uploads
* [ ] Reviews and ratings
* [ ] Pagination
* [ ] Price filtering
* [ ] Date filtering
* [ ] Google OAuth
* [ ] Forgot-password flow
* [ ] Host dashboard
* [ ] Booking history
* [ ] Payment integration
* [ ] Email notifications
* [ ] Advanced recommendation system

---

# 📸 Project Highlights

StayNest currently demonstrates:

```text
Full-Stack Development
        │
        ├── React Frontend
        │
        ├── Responsive UI
        │
        ├── REST API
        │
        ├── Express Backend
        │
        ├── PostgreSQL Database
        │
        ├── Supabase
        │
        ├── JWT Authentication
        │
        ├── bcrypt Password Security
        │
        ├── Protected Routes
        │
        └── Database-backed Favorites
```

---

# 🎓 Project Purpose

StayNest was developed as a full-stack web development project to demonstrate practical implementation of:

* Frontend development
* Backend development
* REST API design
* Database integration
* Authentication
* Authorization
* Password security
* State management
* Protected routes
* CRUD operations
* Responsive UI development
* Cloud database integration
* Application deployment

---

# 📄 License

This project is intended for educational and development purposes.

Property images used in the project are sourced from Unsplash.

---

# 👨‍💻 StayNest

**StayNest — Find a place that feels like yours.**

Built using:

**React • Vite • Tailwind CSS • Node.js • Express.js • PostgreSQL • Supabase • JWT • bcrypt**

---

```