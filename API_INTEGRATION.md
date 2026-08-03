# API Integration Documentation

## Authentication API

This document describes the API integration implemented in the RentNest frontend authentication system.

### Backend Base URL

```text
https://rent-nest-backend-fiy9.onrender.com
```
🔴 Admin API Integration

| Feature                  | Method | Endpoint                          | Purpose                        |
| ------------------------ | ------ | --------------------------------- | ------------------------------ |
| Admin Dashboard          | GET    | `/api/dashboard/admin`            | Get admin dashboard statistics |
| View All Users           | GET    | `/api/user/admin/all-users`       | Get all tenants and landlords  |
| Change User Role         | PUT    | `/api/user/admin/update/role/:id` | Change user role by admin      |
| Block / Unblock User     | PUT    | `/api/user/admin/update/:id`      | Block or unblock user          |
| View All Rental Requests | GET    | `/api/rental/admin/rentals`       | Get all rental requests        |
| View All Payments        | GET    | `/api/payment/all-payments`       | Get all rental payments        |
| View All Categories      | GET    | `/api/category/all-categories`    | Get all property categories    |
| View All Reviews         | GET    | `/api/review/admin/all-reviews`   | Get all reviews for admin      |

🟢 Landlord API Integration

| Feature               | Method | Endpoint                         | Purpose                                              |
| --------------------- | ------ | -------------------------------- | ---------------------------------------------------- |
| View My Properties    | GET    | `/api/property/my-properties`    | Get properties created by logged-in landlord         |
| Create Property       | POST   | `/api/property/create-property`  | Create a new rental property                         |
| View Single Property  | GET    | `/api/property/:id`              | Get property details                                 |
| Update Property       | PUT    | `/api/property/:id`              | Update an existing property                          |
| Delete Property       | DELETE | `/api/property/:id`              | Delete a property                                    |
| View Rental Requests  | GET    | `/api/rental/landlord-requests`  | Get rental requests received for landlord properties |
| Update Rental Request | PUT    | `/api/rental/:id/status`         | Approve or reject a rental request                   |
| View Payments         | GET    | `/api/payment/landlord-payments` | Get payments related to landlord properties          |
| Dashboard Statistics  | GET    | `/api/dashboard/landlord`        | Get landlord dashboard statistics                    |
| View Profile          | GET    | `/api/user/profile`              | Get logged-in landlord profile                       |
| Update Profile        | PUT    | `/api/user/profile`              | Update landlord profile information                  |

🔵 Tenant / User API Integration

| Feature                 | Method | Endpoint                   | Purpose                                 |
| ----------------------- | ------ | -------------------------- | --------------------------------------- |
| User Login              | POST   | `/api/auth/login`          | User login                              |
| User Registration       | POST   | `/api/auth/register`       | User registration                       |
| Get Logged-in User      | GET    | `/api/auth/me`             | Get current authenticated user          |
| Refresh Token           | POST   | `/api/auth/refresh-token`  | Generate a new access token             |
| View My Payments        | GET    | `/api/payment/my-payments` | Get logged-in tenant's payment history  |
| Create Checkout Session | POST   | `/api/payment/checkout`    | Create Stripe checkout session          |
| View All Reviews        | GET    | `/api/review/all-reviews`  | Get all reviews                         |
| View My Reviews         | GET    | `/api/review/my-reviews`   | Get reviews created by logged-in tenant |
| Create Review           | POST   | `/api/review/create`       | Create a new review                     |
| Update Review           | PATCH  | `/api/review/user/:id`     | Update an existing review               |
| Delete Review           | DELETE | `/api/review/user/:id`     | Delete an existing review               |

💳 Payment / Stripe API

| Feature                 | Method | Endpoint                | Purpose                                                             |
| ----------------------- | ------ | ----------------------- | ------------------------------------------------------------------- |
| Create Checkout Session | POST   | `/api/payment/checkout` | Create Stripe checkout session                                      |
| Stripe Webhook          | POST   | `/api/payment/webhook`  | Handle Stripe payment confirmation and update payment/rental status |
