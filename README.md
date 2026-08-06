# 🏠 RentNest — Full Stack Rental Marketplace

RentNest is a modern **Full Stack Rental Marketplace** designed to connect **Tenants** and **Landlords** through a secure, user-friendly platform. Users can browse properties, submit rental requests, make payments, leave reviews, and manage their rental activities.

The platform also includes a powerful **Admin Dashboard** for managing users, properties, categories, rental requests, payments, and overall platform activity.

---

## 🌐 Live Project

### Frontend

https://rent-nest-frontend-xi.vercel.app/

### Backend API

https://rent-nest-backend-fiy9.onrender.com/
### Backend GitHb Link

https://github.com/chayon-chandra-sarker/Rent-Nest-Backend-

---

## 📌 Project Overview

RentNest provides a complete rental management ecosystem with three primary roles:

* 👤 **Tenant**
* 🏠 **Landlord**
* 🛡️ **Admin**

### Tenant

Tenants can:

* Register and login
* Browse available properties
* Search and filter properties
* View property details
* Send rental requests
* Track rental request status
* Make rental payments
* View payment history
* Leave reviews
* Manage their profile

### Landlord

Landlords can:

* Register and login
* Create properties
* Update property information
* Delete their own properties
* Manage rental requests
* Accept or reject rental requests
* View rental payments
* Manage their profile
* Monitor their listed properties

### Admin

Admins can:

* View dashboard statistics
* Manage users
* Manage user roles
* Manage user status
* Manage properties
* Manage categories
* Manage rental requests
* Monitor payments
* View platform revenue
* Manage the overall platform

---

# ✨ Features

## 🔐 Authentication & Authorization

* User registration
* User login
* Secure authentication
* Access token & refresh token
* HTTP-only cookie based authentication
* Protected routes
* Role-based authorization
* Tenant, Landlord and Admin access control
* Logout functionality
* Current user/profile information

---

## 🏠 Property Management

* Create new property
* View all properties
* View single property details
* Update property
* Delete property
* Property image support
* Property categories
* Property location
* Property price
* Bedroom information
* Bathroom information
* Property availability
* Landlord ownership verification

---

## 🔎 Property Search & Filtering

Users can discover properties through:

* Location
* Category
* Property information
* Pagination
* Available properties

---

## 📝 Rental Request System

Tenants can request properties from landlords.

Rental workflow:

```text
Tenant
   ↓
Select Property
   ↓
Send Rental Request
   ↓
Landlord Reviews Request
   ↓
Accept / Reject
   ↓
Rental Status Updated
```

---

## 💳 Payment System

RentNest integrates **Stripe** for secure online payments.

Features include:

* Rental payment
* Stripe payment integration
* Payment status tracking
* Payment history
* Landlord payment history
* Completed payment tracking
* Revenue calculation

Payment statuses include:

```text
PENDING
COMPLETED
FAILED
CANCELLED
```

---

## ⭐ Review System

Tenants can submit reviews for rental properties.

Review functionality includes:

* Rating
* Review comment
* Property-based reviews
* Tenant-based review creation
* Review management

---

## 🛡️ Admin Dashboard

The Admin Dashboard provides a centralized platform management system.

### Dashboard Statistics

Admin can monitor:

* Total users
* Total properties
* Total rental requests
* Total revenue
* Completed payments

### Admin Management

Admin can manage:

* Users
* User roles
* User status
* Properties
* Categories
* Rental requests
* Payments

---

# 🧑‍💻 Technology Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* DaisyUI
* TanStack Query
* Lucide React
* Sonner
* Framer Motion
* Next Image
* Swiper

## Backend

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* Prisma ORM
* JWT
* Cookie-based Authentication
* Stripe

## Deployment

* Vercel — Frontend
* Render — Backend
* PostgreSQL — Database

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │       Tenant         │
                    └──────────┬───────────┘
                               │
                               │
                    ┌──────────▼───────────┐
                    │      Next.js         │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               │
                    ┌──────────▼───────────┐
                    │      Express.js      │
                    │       Backend       │
                    └──────────┬───────────┘
                               │
                 ┌─────────────┼─────────────┐
                 │             │             │
                 ▼             ▼             ▼
          ┌───────────┐ ┌───────────┐ ┌───────────┐
          │ PostgreSQL│ │  Prisma   │ │  Stripe   │
          │ Database  │ │    ORM    │ │  Payment  │
          └───────────┘ └───────────┘ └───────────┘
                               ▲
                               │
                    ┌──────────┴───────────┐
                    │        Admin         │
                    │      Dashboard       │
                    └──────────────────────┘
```

---

# 📂 Project Structure

## Frontend

```text
rent-nest-frontend/
│
├── app/
│   ├── (dashboard-group)/
│   │   ├── admin-dashboard/
│   │   ├── dashboard/
│   │   ├── land-lord-dashboard/
│   │   └── layout.tsx
│   │
│   ├── api/
│   ├── login/
│   ├── register/
│   ├── properties/
│   └── ...
│
├── components/
│   ├── AdminDashboard/
│   ├── LandlordDashboard/
│   ├── Property/
│   └── ...
│
├── service/
│   ├── auth.service.ts
│   ├── property.service.ts
│   ├── payment.service.ts
│   ├── rental.service.ts
│   └── admin.service.ts
│
├── hooks/
├── lib/
├── types/
├── public/
│
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## Backend

```text
rent-nest-backend/
│
├── src/
│   ├── app/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.ts
│
├── prisma/
│   ├── schema/
│   │   └── schema.prisma
│   └── migrations/
│
├── package.json
├── tsconfig.json
└── README.md
```

---

# 🗄️ Database Models

RentNest uses **PostgreSQL** with **Prisma ORM**.

Main models include:

```text
User
Category
Property
RentalRequest
Payment
Review
```

### Relationship Overview

```text
User
 ├── Tenant
 │    ├── RentalRequest
 │    ├── Payment
 │    └── Review
 │
 ├── Landlord
 │    ├── Property
 │    └── RentalRequest
 │
 └── Admin


Category
   │
   └── Property


Property
 ├── RentalRequest
 ├── Payment
 └── Review
```

---

# 🔌 API Integration

| Frontend Component | Method | Backend Endpoint                | Purpose               |
| ------------------ | ------ | ------------------------------- | --------------------- |
| Login Form         | POST   | `/api/auth/login`               | User login            |
| Register Form      | POST   | `/api/auth/register`            | User registration     |
| Navbar / Auth      | GET    | `/api/auth/me`                  | Get current user      |
| Authentication     | POST   | `/api/auth/refresh-token`       | Refresh access token  |
| Admin Dashboard    | GET    | `/api/dashboard/admin`          | Dashboard statistics  |
| Admin Users        | GET    | `/api/user/admin/all-users`     | Get all users         |
| Properties         | GET    | `/api/property/all-properties`  | Get all properties    |
| Property Details   | GET    | `/api/property/:id`             | Get property details  |
| Property Create    | POST   | `/api/property/create-property` | Create property       |
| Property Update    | PUT    | `/api/property/:id`             | Update property       |
| Property Delete    | DELETE | `/api/property/:id`             | Delete property       |
| Rental Request     | POST   | `/api/rental/...`               | Create rental request |
| Payments           | GET    | `/api/payment/...`              | Payment information   |
| Reviews            | POST   | `/api/review/...`               | Create review         |

> Note: Some endpoint paths may vary depending on the latest backend route implementation.

---

# 🔐 Security

RentNest implements several security mechanisms:

* JWT authentication
* Access token
* Refresh token
* HTTP-only cookies
* Protected routes
* Role-based authorization
* Landlord ownership verification
* Admin-only operations
* Authenticated API requests
* Server-side authorization checks
* Environment variables for sensitive credentials


# 🚀 Installation & Setup

## 1. Clone the Frontend

```bash
git clone https://github.com/your-username/rent-nest-frontend.git

cd rent-nest-frontend
```

Install dependencies:

```bash
npm install
```

or

```bash
pnpm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start development server:

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:3000
```

---

## 2. Clone the Backend

```bash
git clone https://github.com/your-username/rent-nest-backend.git

cd rent-nest-backend
```

Install dependencies:

```bash
npm install
```

or

```bash
pnpm install
```

---

## 3. Prisma Setup

Generate Prisma Client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Start backend:

```bash
npm run dev
```

Backend API:

```text
http://localhost:5000
```

---

# 🔄 Authentication Flow

```text
User Registration
       ↓
POST /api/auth/register
       ↓
User Created
       ↓
User Login
       ↓
POST /api/auth/login
       ↓
Access Token + Refresh Token
       ↓
Secure Cookie
       ↓
Protected API Request
       ↓
Authentication Middleware
       ↓
Role Authorization
       ↓
Access Granted
```

---

# 💰 Payment Flow

```text
Tenant
   ↓
Select Property
   ↓
Rental Request Accepted
   ↓
Payment Page
   ↓
Stripe Checkout
   ↓
Payment Processing
   ↓
Payment Successful
   ↓
Payment Status = COMPLETED
   ↓
Landlord Payment History Updated
```

---

# 👥 User Roles

| Role     | Permissions                                           |
| -------- | ----------------------------------------------------- |
| Tenant   | Browse properties, rental requests, payments, reviews |
| Landlord | Manage properties, rental requests and payments       |
| Admin    | Full platform management                              |

---

# 📊 Admin Dashboard Modules

```text
Admin Dashboard
│
├── Dashboard
├── Users
├── Properties
├── Categories
├── Rentals
├── Payments
└── Settings
```

---

# 🧪 Development

Run frontend:

```bash
npm run dev
```

Run backend:

```bash
npm run dev
```

Build frontend:

```bash
npm run build
```

Start production frontend:

```bash
npm run start
```

Build backend:

```bash
npm run build
```

Start production backend:

```bash
npm run start
```

---

# 🌍 Deployment

## Frontend

The frontend is deployed using **Vercel**.

```text
https://rent-nest-frontend-xi.vercel.app/
```

## Backend

The backend is deployed using **Render**.

```text
https://rent-nest-backend-fiy9.onrender.com/
```

## Production Architecture

```text
                    Vercel
                      │
                      ▼
             Next.js Frontend
                      │
                      │ HTTPS REST API
                      ▼
                    Render
                      │
                      ▼
             Express Backend
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
      PostgreSQL               Stripe
       Database                Payment
```

---

# 🛠️ Challenges & Solutions

### CORS Configuration

During deployment, the frontend and backend were hosted on different domains. CORS configuration was required to allow requests from the production frontend.

### Authentication

Implemented access token and refresh token based authentication with secure cookie handling and protected routes.

### Role-Based Access

Different permissions were implemented for Tenant, Landlord and Admin users.

### Property Ownership

Landlords can only update or delete properties that belong to them.

### Payment Management

Stripe was integrated to process rental payments and track payment status.

### Server & Client Components

Next.js App Router server/client boundaries were handled carefully to separate server-side cookie operations from client-side UI logic.

---

# 🎯 Future Improvements

Possible future improvements include:

* Real-time chat between Tenant and Landlord
* Property map integration
* Advanced property filtering
* Email notifications
* Push notifications
* Wishlist / favorite properties
* Property image optimization
* Advanced analytics
* Automated payment reminders
* Rental agreement generation
* Multi-language support
* Mobile application
* Automated testing
* CI/CD pipeline

---


# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/new-feature
```

3. Make your changes
4. Commit your changes

```bash
git commit -m "feat: add new feature"
```

5. Push your branch

```bash
git push origin feature/new-feature
```

6. Open a Pull Request

---

# 📄 License

This project is developed for educational and portfolio purposes.

---

# 👨‍💻 Developer

## Chayon Chandra Sarker

**Full Stack Developer**

I am passionate about building modern, scalable and user-friendly web applications using JavaScript, TypeScript, React, Next.js, Node.js and PostgreSQL.

### Tech Interests

* Full Stack Web Development
* React & Next.js
* Node.js & Express
* TypeScript
* PostgreSQL
* Prisma ORM
* REST API
* Authentication & Authorization
* Payment Integration

---

## 🔗 Connect With Me

* Portfolio: https://chayonsarker.vercel.app/
* GitHub: https://github.com/chayon-chandra-sarker
* LinkedIn: https://www.linkedin.com/in/chayon11/
* Facebook: https://www.facebook.com/chayonsarkerns


---

# ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

Thank you for checking out **RentNest**! 🏠
