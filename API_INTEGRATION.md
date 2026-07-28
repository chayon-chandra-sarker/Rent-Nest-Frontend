# API Integration

| Frontend Component | Method | Backend Endpoint | Purpose |
|---|---|---|---|
| Login Form | POST | /api/auth/login | User login |
| Register Form | POST | /api/auth/register | User registration |
| Navbar | GET | /api/auth/me | Get logged-in user |
| Property List | GET | /api/properties | Get properties |
| Property Details | GET | /api/properties/:id | Get property |
| Rental Request | POST | /api/rentals | Create rental request |
| Payment | POST | /api/payments/create-checkout | Stripe checkout |