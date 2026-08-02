# API Integration Documentation

## Authentication API

This document describes the API integration implemented in the RentNest frontend authentication system.

### Backend Base URL

```text
https://rent-nest-backend-fiy9.onrender.com
```

# API Integration

| Frontend Component             | Method | Backend Endpoint                  | Purpose                                             |
| ------------------------------ | ------ | --------------------------------- | --------------------------------------------------- |
| Login Form                     | POST   | `/api/auth/login`                 | User login                                          |
| Register Form                  | POST   | `/api/auth/register`              | User registration                                   |
| Navbar / Auth                  | GET    | `/api/auth/me`                    | Get logged-in user                                  |
| Authentication / Refresh Token | POST   | `/api/auth/refresh-token`         | Generate a new access token using the refresh token |
| Admin Dashboard                | GET    | `/api/dashboard/admin`            | Get admin dashboard statistics                      |
| Admin Users                    | GET    | `/api/user/admin/all-users`       | Get all users for admin                             |
| Admin User Role Change         | PUT    | `/api/user/admin/update/role/:id` | Change user role by admin                           |
| Admin User Block / Unblock     | PUT    | `/api/user/admin/update/:id`      | Block or unblock user by admin                      |
| Admin User Management          | GET    | `/api/user/admin/all-users`       | Get all users for admin                             |
| Admin Dashboard Statistics     | GET    | `/api/dashboard/admin`            | Get admin dashboard statistics                      |
| Admin View All Users | GET | `/api/user/admin/all-users` | Get all tenants and landlords |
| Admin User Role Change | PUT | `/api/user/admin/update/role/:id` | Change user role by admin |
| Admin User Block / Unblock | PUT | `/api/user/admin/update/:id` | Block or unblock user by admin |
| Admin View All Rental Requests | GET | `/api/rental/admin/rentals` | Get all rental requests |
| Admin View All Payments | GET | `/api/payment/all-payments` | Get all rental payments |
| Admin View All Categories | GET | `/api/category/all-categories` | Get all property categories |
| Landlord View My Properties | GET | `/api/property/my-properties` | Get all properties created by the logged-in landlord |
| Landlord Create Property | POST | `/api/property/create-property` | Create a new rental property |
| Landlord View Single Property | GET | `/api/property/:id` | Get details of a specific property |
| Landlord Update Property | PUT | `/api/property/:id` | Update an existing property |
| Landlord Delete Property | DELETE | `/api/property/:id` | Delete a property |
| Landlord View Rental Requests | GET | `/api/rental/landlord-requests` | Get rental requests received for landlord properties |
| Landlord Update Rental Request | PUT | `/api/rental/:id/status` | Approve or reject a rental request |
| Landlord View Payments | GET | `/api/payment/landlord-payments` | Get payments related to landlord properties |
| Landlord View Dashboard Stats | GET | `/api/dashboard/landlord` | Get landlord dashboard statistics |
| Landlord View Profile | GET | `/api/user/profile` | Get logged-in landlord profile |
| Landlord Update Profile | PUT | `/api/user/profile` | Update landlord profile information |
| Create Checkout Session | POST | `/api/payment/checkout` | Create a Stripe checkout session for an approved rental |
| Stripe Webhook | POST | `/api/payment/webhook` | Handle Stripe payment confirmation and update payment/rental status |
| Get My Payments | GET | `/api/payment/my-payments `| Get logged-in tenant's payment history |
| Get All Payments | GET | `/api/payment/all-payments` | Get all payments for admin |
| Get Landlord Payments | GET | `/api/payment/landlord-payments` | Get payments related to landlord's properties |